'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAnimationCache = getAnimationCache;
exports.clearAnimationCache = clearAnimationCache;
exports.updateAnimationCache = updateAnimationCache;
exports.deleteAnimationCacheKey = deleteAnimationCacheKey;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animationCache = {};

function getAnimationCache() {
    return animationCache;
}

function clearAnimationCache() {
    animationCache = {};
}

function updateAnimationCache(key, value) {
    animationCache[key] = value;
}

function deleteAnimationCacheKey(key) {
    delete animationCache[key];
}