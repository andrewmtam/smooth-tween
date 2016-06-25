import _ from 'lodash';
import uuid from 'node-uuid';
import easingFunctions from 'eases';

export function getFinishedAnimations__withTweenValue(animation, scrollTop) {
    return _.filter(animation, (o) => {
        let end = o.end;

        if ( scrollTop >= end ) {
            return true
        }
    });
}

export function getFutureAnimations__withTweenValue(animation, scrollTop) {
    return _.filter(animation, (o) => {
        let start = o.start;

        if ( scrollTop <= start ) {
            return true
        }
    });
}


// Evaluate all the functions in the json
// ( since most of htem have to do with the window size )
export function constructStaticJson(animation) {
    return _.map(animation, currSet => {

        let start = getValFromFunction(currSet.start);
        let end = getValFromFunction(currSet.end);
        let id = uuid.v4();
        let animations = _.map(currSet.animations, currAnimation => {

            let properties = _.mapValues( currAnimation.properties, prop => {
                return _.mapValues( prop, getValFromFunction);
            })

            return Object.assign({}, currAnimation, {properties});
        })

        return Object.assign({}, currSet, {start, end, animations, id});
    })

    function getValFromFunction(val) {
        if ( _.isFunction(val)) {
            return val();
        }
        else {
            return val;
        }
    }

}

export function getAnimation__withScrollTop(animation, scrollTop) {
    return _.filter(animation, (o) => {
        let {
            start
            , end
        } = o;

        if ( scrollTop >= start && scrollTop <= end ) {
            return true
        }

    });
}

export function getTweenValue_forProperty_atPercent_withAnimationStart_withAnimationEnd(property, percent, animationStart, animationEnd) {

    let {
        start: propStart
        , end: propEnd
        , unit
        , immediate
        , easing
    } = property;

    //TODO : Do we need an immediate block?
    if ( immediate ) {
        if ( percent < 1 ) {
            return propStart;
            //Velocity.hook(element, prop, propStart);
        }
        else {
            return propEnd;
            //Velocity.hook(element, prop, propEnd);
        }
    }
    else {
        let finalValue, interpolation;

        if ( easing ) {
            if ( !easingFunctions[easing] ) {
                console.error("Easing is not support:", easing);
            }
            else {
                percent = easingFunctions[easing](percent);
            }
        }

        interpolation = ( propEnd - propStart ) * percent;
        finalValue = interpolation + propStart;


        //let tolerance = ( propEnd - propStart ) / 5000;
        //finalValue = getNearest__byTolerance(finalValue, tolerance)

        if ( unit ) finalValue += unit;

        return finalValue;
        //console.log(propStart, propEnd, percent, interpolation, prop, finalValue);
        //Velocity.hook(element, prop, finalValue);

        //if ( prop.indexOf('scale') === -1 ) {
            //Velocity.hook(element, 'translateZ', '1px');
        //}
    }

}


/*
function getNearest__byTolerance(num, tolerance = .5) {
    tolerance = 1 / tolerance
    return Math.round(num*tolerance)/tolerance;
};
*/

