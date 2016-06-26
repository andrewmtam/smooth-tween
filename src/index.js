import $ from 'jquery';
import _ from 'lodash';
import Velocity from 'velocity-animate';
import {
    getWindowHeight
    , getWindowWidth
} from './windowManager';

import {
    getSelector__withDataJs
} from './utilities';

import {
    getFinishedAnimations__withTweenValue
    , getFutureAnimations__withTweenValue
    , constructStaticJson
    , getAnimation__withScrollTop
    , getTweenValue_forProperty_atPercent
    , insertUniqueIdentifierToAnimation
} from './tweenHelpers';

import directionDetection from 'direction-detection';

import {
    getAnimationCache
    , clearAnimationCache
    , updateAnimationCache
} from './tweenCache';


export default function(animationData) {
    let augmentedAnimationData = insertUniqueIdentifierToAnimation(animationData);

    let staticAnimation = constructStaticJson(augmentedAnimationData);

    let valueManager = directionDetection({
        onIncrease(scrollTop) {
            handleScrollDown(scrollTop, true);
            doAnimation(scrollTop);
        }
        , onDecrease(scrollTop) {
            handleScrollUp(scrollTop, true);
            doAnimation(scrollTop);
        }
        , onDirectionChange(scrollTop, direction) {
            handleDirectionChange(scrollTop, direction);
            doAnimation(scrollTop);
        }
    })


    // Warm the cache on load
    handleScrollUp(0);

    return {
        updateTween: function(value) {
            if ( window.requestAnimationFrame ) {
                window.requestAnimationFrame( () => valueManager.update(value) );
            }
            else {
                valueManager.update(value);
            }
        }
        , recalculateStaticJson: () => {
            return setStaticJson(constructStaticJson(augmentedAnimationData));
        }
    }


    function handleScrollUp(scrollTop, useCache) {
        let futureAnimations = getFutureAnimations__withTweenValue(staticAnimation, scrollTop)

        if ( useCache ) {
            futureAnimations = filterAnimations__usingCacheKeys(futureAnimations, _.keys(getAnimationCache()));
        }

        //console.log('futureAnimations', futureAnimations);

        _.forEach(futureAnimations.reverse(), (animation) => {
            teleportProperties(animation, scrollTop, 0);

            if ( useCache ) {
                updateAnimationCache(animation.id, true);
            }

        });
    }

    function handleScrollDown(scrollTop, useCache) {
        let finishedAnimations = getFinishedAnimations__withTweenValue(staticAnimation, scrollTop);

        if ( useCache ) {
            finishedAnimations = filterAnimations__usingCacheKeys(finishedAnimations, _.keys(getAnimationCache()));
        }

        //console.log('finishedAnimations', finishedAnimations);

        _.forEach(finishedAnimations, (animation) => {
            teleportProperties(animation, scrollTop, 1);

            if ( useCache ) {
                updateAnimationCache(animation.id, true);
            }

        });
    }

    function filterAnimations__usingCacheKeys(animations, cacheKeys) {
        return _.filter( animations, animation => {
            return !( _.indexOf(cacheKeys, animation.id) > -1 )
        });
    }

    function handleDirectionChange(scrollTop, direction) {
        // Clear the cache
        clearAnimationCache();

        if ( direction === 'down' ) {
            handleScrollUp(scrollTop);
        }
    }



    function doAnimation(scrollTop) {

        let currentAnimations = getAnimation__withScrollTop(staticAnimation, scrollTop);
        //console.log('currentAnimations', currentAnimations);
        _.forEach(currentAnimations, (animation) => setProperties(animation, scrollTop));
    }


    function teleportProperties(animationSet, scrollTop, percent) {
        setProperties(animationSet, scrollTop, percent);
    }

    function setProperties(animationSet, scrollTop, percent) {

        let {
            animations
            , start
            , end
        } = animationSet;

        let range = end - start;

        // Loop through each animation in the set
        _.forEach(animations, (animation) => {

            let {
                selector
                , properties
            } = animation;

            // Assuem we specified a jquery object
            // as the selector
            let element = selector;

            // If not, then construct it
            if ( !selector.jquery ) {
                element = $( getSelector__withDataJs(selector) );
            }

            // Allows us to override the percent to 100%
            if ( _.isUndefined(percent)) {
                percent = ( ( scrollTop - start )  /  ( end - start ) );
            }

            _.forEach(properties, (propertyDetails, prop) => {
                Velocity.hook(element, prop, getTweenValue_forProperty_atPercent(propertyDetails, percent, start, end));
                Velocity.hook(element, 'translateZ', '1px');
            });

        });

    };

    function setStaticJson(staticJson) {
        staticAnimation = staticJson;
        return staticAnimation;
    }

}



