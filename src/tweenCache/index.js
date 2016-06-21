import _ from 'lodash';

let animationCache = {};


export function getAnimationCache() {
    return animationCache;
}

export function clearAnimationCache() {
    animationCache = {};
}

export function updateAnimationCache(key, value) {
    animationCache[key] = value;
}

export function deleteAnimationCacheKey(key) {
    delete animationCache[key];
}
