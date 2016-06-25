import test from 'tape';
import * as tweenHelpers from '../tweenHelpers';

const dummyAnimation = [
    {
        start: 0
        , end: 10
    }
    , {
        start: 5
        , end: 20
    }
    , {
        start: 20
        , end: 30
    }
    , {
        start: 15
        , end: 30
    }
    , {
        start: 15
        , end: 45
    }
    , {
        start: 30
        , end: 40
    }
];


    /*
constructStaticJson: [Getter],
getTweenValue_forProperty_atPercent_withAnimationStart_withAnimationEnd: [Getter] }
*/
test('Select all animations that should be finished', function(t) {
    t.plan(3);

    let finishedAnimations = tweenHelpers.getFinishedAnimations__withTweenValue(dummyAnimation, 30);
    t.deepEqual(finishedAnimations, [
        {
            start: 0
            , end: 10
        }
        , {
            start: 5
            , end: 20
        }
        , {
            start: 20
            , end: 30
        }
        , {
            start: 15
            , end: 30
        }
    ], 'Inclusive of end range');

    finishedAnimations = tweenHelpers.getFinishedAnimations__withTweenValue(dummyAnimation, 29);
    t.deepEqual(finishedAnimations, [
        {
            start: 0
            , end: 10
        }
        , {
            start: 5
            , end: 20
        }
    ]);

    finishedAnimations = tweenHelpers.getFinishedAnimations__withTweenValue(dummyAnimation, 0);
    t.deepEqual(finishedAnimations, [
    ]);

});

test('Select all animations that have not started', function(t) {
    t.plan(3);

    let futureAnimations = tweenHelpers.getFutureAnimations__withTweenValue(dummyAnimation, 10);
    t.deepEqual(futureAnimations, [
        {
            start: 20
            , end: 30
        }
        , {
            start: 15
            , end: 30
        }
        , {
            start: 15
            , end: 45
        }
        , {
            start: 30
            , end: 40
        }
    ], 'Not inclusive of end range');


    futureAnimations = tweenHelpers.getFutureAnimations__withTweenValue(dummyAnimation, 30);
    t.deepEqual(futureAnimations, [
        {
            start: 30
            , end: 40
        }
    ], 'Inclusive of start range');

    futureAnimations = tweenHelpers.getFutureAnimations__withTweenValue(dummyAnimation, 17);
    t.deepEqual(futureAnimations, [
        {
            start: 20
            , end: 30
        }
        , {
            start: 30
            , end: 40
        }
    ]);
});

test('Select all animations that are currently in range', function(t) {
    t.plan(4);
    let currentAnimations = tweenHelpers.getAnimation__withScrollTop(dummyAnimation, 7);
    t.deepEqual(currentAnimations, [
        {
            start: 0
            , end: 10
        }
        , {
            start: 5
            , end: 20
        }
    ]);

    currentAnimations = tweenHelpers.getAnimation__withScrollTop(dummyAnimation, 10);
    t.deepEqual(currentAnimations, [
        {
            start: 0
            , end: 10
        }
        , {
            start: 5
            , end: 20
        }
    ], 'Inclusive of end range');

    currentAnimations = tweenHelpers.getAnimation__withScrollTop(dummyAnimation, 5);
    t.deepEqual(currentAnimations, [
        {
            start: 0
            , end: 10
        }
        , {
            start: 5
            , end: 20
        }
    ], 'Inclusive of start range');

    currentAnimations = tweenHelpers.getAnimation__withScrollTop(dummyAnimation, 23);
    t.deepEqual(currentAnimations, [
        {
            start: 20
            , end: 30
        }
        , {
            start: 15
            , end: 30
        }
        , {
            start: 15
            , end: 45
        }
    ]);
});


test('Get animation tween for tween value', function(t) {
    t.plan(4);

    let animationTweenValue = tweenHelpers.getTweenValue_forProperty_atPercent_withAnimationStart_withAnimationEnd({
        start: 50
        , end: 100
        , unit: '%'
    }, .5);
    t.equal(animationTweenValue, '75%', 'Linear interpolation');

    animationTweenValue = tweenHelpers.getTweenValue_forProperty_atPercent_withAnimationStart_withAnimationEnd({
        start: 50
        , end: 100
        , unit: 'px'
    }, .5);
    t.equal(animationTweenValue, '75px', 'Check units');

    animationTweenValue = tweenHelpers.getTweenValue_forProperty_atPercent_withAnimationStart_withAnimationEnd({
        start: 50
        , end: 100
    }, .5);
    t.equal(animationTweenValue, 75, 'Unitless tweening');

    animationTweenValue = tweenHelpers.getTweenValue_forProperty_atPercent_withAnimationStart_withAnimationEnd({
        start: 50
        , end: 100
        , easing: 'bounceIn'
    }, .5);
    t.ok( animationTweenValue > 50 && animationTweenValue < 100 && animationTweenValue != 75, 'Simple easing test');

});
