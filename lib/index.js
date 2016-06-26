'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (animationData) {
    var augmentedAnimationData = (0, _tweenHelpers.insertUniqueIdentifierToAnimation)(animationData);

    var staticAnimation = (0, _tweenHelpers.constructStaticJson)(augmentedAnimationData);

    var valueManager = (0, _directionDetection2.default)({
        onIncrease: function onIncrease(scrollTop) {
            handleScrollDown(scrollTop, true);
            doAnimation(scrollTop);
        },
        onDecrease: function onDecrease(scrollTop) {
            handleScrollUp(scrollTop, true);
            doAnimation(scrollTop);
        },
        onDirectionChange: function onDirectionChange(scrollTop, direction) {
            handleDirectionChange(scrollTop, direction);
            doAnimation(scrollTop);
        }
    });

    // Warm the cache on load
    handleScrollUp(0);

    return {
        updateTween: function updateTween(value) {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(function () {
                    return valueManager.update(value);
                });
            } else {
                valueManager.update(value);
            }
        },
        recalculateStaticJson: function recalculateStaticJson() {
            return setStaticJson((0, _tweenHelpers.constructStaticJson)(augmentedAnimationData));
        }
    };

    function handleScrollUp(scrollTop, useCache) {
        var futureAnimations = (0, _tweenHelpers.getFutureAnimations__withTweenValue)(staticAnimation, scrollTop);

        if (useCache) {
            futureAnimations = filterAnimations__usingCacheKeys(futureAnimations, _lodash2.default.keys((0, _tweenCache.getAnimationCache)()));
        }

        //console.log('futureAnimations', futureAnimations);

        _lodash2.default.forEach(futureAnimations.reverse(), function (animation) {
            teleportProperties(animation, scrollTop, 0);

            if (useCache) {
                (0, _tweenCache.updateAnimationCache)(animation.id, true);
            }
        });
    }

    function handleScrollDown(scrollTop, useCache) {
        var finishedAnimations = (0, _tweenHelpers.getFinishedAnimations__withTweenValue)(staticAnimation, scrollTop);

        if (useCache) {
            finishedAnimations = filterAnimations__usingCacheKeys(finishedAnimations, _lodash2.default.keys((0, _tweenCache.getAnimationCache)()));
        }

        //console.log('finishedAnimations', finishedAnimations);

        _lodash2.default.forEach(finishedAnimations, function (animation) {
            teleportProperties(animation, scrollTop, 1);

            if (useCache) {
                (0, _tweenCache.updateAnimationCache)(animation.id, true);
            }
        });
    }

    function filterAnimations__usingCacheKeys(animations, cacheKeys) {
        return _lodash2.default.filter(animations, function (animation) {
            return !(_lodash2.default.indexOf(cacheKeys, animation.id) > -1);
        });
    }

    function handleDirectionChange(scrollTop, direction) {
        // Clear the cache
        (0, _tweenCache.clearAnimationCache)();

        if (direction === 'down') {
            handleScrollUp(scrollTop);
        }
    }

    function doAnimation(scrollTop) {

        var currentAnimations = (0, _tweenHelpers.getAnimation__withScrollTop)(staticAnimation, scrollTop);
        //console.log('currentAnimations', currentAnimations);
        _lodash2.default.forEach(currentAnimations, function (animation) {
            return setProperties(animation, scrollTop);
        });
    }

    function teleportProperties(animationSet, scrollTop, percent) {
        setProperties(animationSet, scrollTop, percent);
    }

    function setProperties(animationSet, scrollTop, percent) {
        var animations = animationSet.animations;
        var start = animationSet.start;
        var end = animationSet.end;


        var range = end - start;

        // Loop through each animation in the set
        _lodash2.default.forEach(animations, function (animation) {
            var selector = animation.selector;
            var properties = animation.properties;

            // Assuem we specified a jquery object
            // as the selector

            var element = selector;

            // If not, then construct it
            if (!selector.jquery) {
                element = $(getSelectorWithDataJs(selector));
            }

            // Allows us to override the percent to 100%
            if (_lodash2.default.isUndefined(percent)) {
                percent = (scrollTop - start) / (end - start);
            }

            _lodash2.default.forEach(properties, function (propertyDetails, prop) {
                _velocityAnimate2.default.hook(element, prop, (0, _tweenHelpers.getTweenValue_forProperty_atPercent)(propertyDetails, percent, start, end));
                _velocityAnimate2.default.hook(element, 'translateZ', '1px');
            });
        });
    };

    function setStaticJson(staticJson) {
        staticAnimation = staticJson;
        return staticAnimation;
    }

    function getSelectorWithDataJs(dataJs) {
        if (_lodash2.default.isArray(dataJs)) {
            return _lodash2.default.map(dataJs, function (selector) {
                return _addDataJs(selector);
            }).join(',');
        } else {
            return _addDataJs(dataJs);
        }

        function _addDataJs(selector) {
            return '[data-js="' + selector + '"]';
        }
    }
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _velocityAnimate = require('velocity-animate');

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

var _tweenHelpers = require('./tweenHelpers');

var _directionDetection = require('direction-detection');

var _directionDetection2 = _interopRequireDefault(_directionDetection);

var _tweenCache = require('./tweenCache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }