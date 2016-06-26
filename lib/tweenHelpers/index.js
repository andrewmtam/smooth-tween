'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFinishedAnimations__withTweenValue = getFinishedAnimations__withTweenValue;
exports.getFutureAnimations__withTweenValue = getFutureAnimations__withTweenValue;
exports.constructStaticJson = constructStaticJson;
exports.getAnimation__withScrollTop = getAnimation__withScrollTop;
exports.getTweenValue_forProperty_atPercent = getTweenValue_forProperty_atPercent;
exports.insertUniqueIdentifierToAnimation = insertUniqueIdentifierToAnimation;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _eases = require('eases');

var _eases2 = _interopRequireDefault(_eases);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFinishedAnimations__withTweenValue(animation, scrollTop) {
    return _lodash2.default.filter(animation, function (o) {
        var end = o.end;

        if (scrollTop >= end) {
            return true;
        }
    });
}

function getFutureAnimations__withTweenValue(animation, scrollTop) {
    return _lodash2.default.filter(animation, function (o) {
        var start = o.start;

        if (scrollTop <= start) {
            return true;
        }
    });
}

// Evaluate all the functions in the json
// ( since most of htem have to do with the window size )
function constructStaticJson(animation) {
    return _lodash2.default.map(animation, function (currSet) {

        var start = getValFromFunction(currSet.start);
        var end = getValFromFunction(currSet.end);
        var animations = _lodash2.default.map(currSet.animations, function (currAnimation) {

            var properties = _lodash2.default.mapValues(currAnimation.properties, function (prop) {
                return _lodash2.default.mapValues(prop, getValFromFunction);
            });

            return Object.assign({}, currAnimation, { properties: properties });
        });

        return Object.assign({}, currSet, { start: start, end: end, animations: animations });
    });

    function getValFromFunction(val) {
        if (_lodash2.default.isFunction(val)) {
            return val();
        } else {
            return val;
        }
    }
}

function getAnimation__withScrollTop(animation, scrollTop) {
    return _lodash2.default.filter(animation, function (o) {
        var start = o.start;
        var end = o.end;


        if (scrollTop >= start && scrollTop <= end) {
            return true;
        }
    });
}

function getTweenValue_forProperty_atPercent(property, percent) {
    var propStart = property.start;
    var propEnd = property.end;
    var unit = property.unit;
    var immediate = property.immediate;
    var easing = property.easing;

    //TODO : Do we need an immediate block?

    if (immediate) {
        if (percent < 1) {
            return propStart;
            //Velocity.hook(element, prop, propStart);
        } else {
            return propEnd;
            //Velocity.hook(element, prop, propEnd);
        }
    } else {
        var finalValue = void 0,
            interpolation = void 0;

        if (easing) {
            if (!_eases2.default[easing]) {
                console.error("Easing is not support:", easing);
            } else {
                percent = _eases2.default[easing](percent);
            }
        }

        interpolation = (propEnd - propStart) * percent;
        finalValue = interpolation + propStart;

        //let tolerance = ( propEnd - propStart ) / 5000;
        //finalValue = getNearest__byTolerance(finalValue, tolerance)

        if (unit) finalValue += unit;

        return finalValue;
        //console.log(propStart, propEnd, percent, interpolation, prop, finalValue);
        //Velocity.hook(element, prop, finalValue);

        //if ( prop.indexOf('scale') === -1 ) {
        //Velocity.hook(element, 'translateZ', '1px');
        //}
    }
}

function insertUniqueIdentifierToAnimation(animations) {
    return _lodash2.default.map(animations, function (animation) {
        return Object.assign({}, animation, { id: _nodeUuid2.default.v4() });
    });
}

/*
function getNearest__byTolerance(num, tolerance = .5) {
    tolerance = 1 / tolerance
    return Math.round(num*tolerance)/tolerance;
};
*/