var animationData = [
    {
        start: percentOfWindowHeightToPx(0)
        , end: percentOfWindowHeightToPx(1)
        , animations: [
            {
                selector: $('.enter-left')
                , properties: {
                    translateX: {
                        start: percentOfWindowWidthToPx(-1)
                        , end: 0
                        , unit: 'px'
                    }
                    , opacity: {
                        start: 0
                        , end: 1
                    }
                }
            }
            , {
                selector: $('.intro')
                , properties: {
                    translateX: {
                        start: 0
                        , end: percentOfWindowWidthToPx(1)
                        , unit: 'px'
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(.2)
        , end: percentOfWindowHeightToPx(1.2)
        , animations: [
            {
                selector: $('.enter-top')
                , properties: {
                    translateY: {
                        start: percentOfWindowHeightToPx(-1)
                        , end: 0
                        , unit: 'px'
                    }
                    , opacity: {
                        start: 0
                        , end: 1
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(.4)
        , end: percentOfWindowHeightToPx(1.4)
        , animations: [
            {
                selector: $('.enter-right')
                , properties: {
                    translateX: {
                        start: percentOfWindowWidthToPx(1)
                        , end: 0
                        , unit: 'px'
                    }
                    , opacity: {
                        start: 0
                        , end: 1
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(.6)
        , end: percentOfWindowHeightToPx(1.6)
        , animations: [
            {
                selector: $('.enter-bottom')
                , properties: {
                    translateY: {
                        start: percentOfWindowHeightToPx(1)
                        , end: 0
                        , unit: 'px'
                    }
                    , opacity: {
                        start: 0
                        , end: 1
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(1.6)
        , end: percentOfWindowHeightToPx(2.6)
        , animations: [
            {
                selector: $('.circle')
                , properties: {
                    translateY: {
                        start: percentOfWindowHeightToPx(1)
                        , end: 0
                        , unit: 'px'
                    }
                    , opacity: {
                        start: 0
                        , end: 1
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(2.6)
        , end: percentOfWindowHeightToPx(3.6)
        , animations: [
            {
                selector: $('.circle__text--1')
                , properties: {
                    rotateZ: {
                        start: 0
                        , end: 360
                        , unit: 'deg'
                    }
                    , opacity: {
                        start: 0
                        , end: 1
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(2.6)
        , end: percentOfWindowHeightToPx(3.6)
        , animations: [
            {
                selector: $('.circle__text--1')
                , properties: {
                    rotateZ: {
                        start: 0
                        , end: 360
                        , unit: 'deg'
                    }
                    , opacity: {
                        start: 0
                        , end: 1
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(3.6)
        , end: percentOfWindowHeightToPx(4.6)
        , animations: [
            {
                selector: $('.slide--1')
                , properties: {
                    translateX: {
                        start: 0
                        , end: percentOfWindowWidthToPx(-1)
                        , unit: 'px'
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(3.6)
        , end: percentOfWindowHeightToPx(4.6)
        , animations: [
            {
                selector: $('.slide--1')
                , properties: {
                    translateX: {
                        start: 0
                        , end: percentOfWindowWidthToPx(-1)
                        , unit: 'px'
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(3.6)
        , end: percentOfWindowHeightToPx(4.6)
        , animations: [
            {
                selector: $('.slide--2')
                , properties: {
                    translateX: {
                        start: percentOfWindowWidthToPx(1)
                        , end: 0
                        , unit: 'px'
                    }
                    , scale: {
                        start: 0
                        , end: 1
                    }
                    , rotateZ: {
                        start: 0
                        , end: 360
                        , unit: 'deg'
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(4.6)
        , end: percentOfWindowHeightToPx(5.6)
        , animations: [
            {
                selector: $('.slide--2-text')
                , properties: {
                    scale: {
                        start: 1
                        , end: 3
                    }
                    , opacity: {
                        start: 0
                        , end: 1
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(5.6)
        , end: percentOfWindowHeightToPx(6.6)
        , animations: [
            {
                selector: $('.slide--2-text')
                , properties: {
                    scale: {
                        start: 3
                        , end: 2
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(6.6)
        , end: percentOfWindowHeightToPx(7.6)
        , animations: [
            {
                selector: $('.parallax')
                , properties: {
                    scale: {
                        start: 1
                        , end: .5
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(7.6)
        , end: percentOfWindowHeightToPx(8.6)
        , animations: [
            {
                selector: $('.parallax')
                , properties: {
                    translateX: {
                        start: 0
                        , end: percentOfWindowWidthToPx(1)
                        , unit: 'px'
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(8.6)
        , end: percentOfWindowHeightToPx(9.6)
        , animations: [
            {
                selector: $('.parallax')
                , properties: {
                    scale: {
                        start: .5
                        , end: 1
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(9.6)
        , end: percentOfWindowHeightToPx(10.6)
        , animations: [
            {
                selector: $('.enter-left, .enter-right')
                , properties: {
                    translateY: {
                        start: 0
                        , end: percentOfWindowHeightToPx(-.7)
                        , unit: 'px'
                    }
                }
            }
            , {
                selector: $('.enter-top')
                , properties: {
                    translateY: {
                        start: 0
                        , end: percentOfWindowHeightToPx(-.4)
                        , unit: 'px'
                    }
                }
            }
            , {
                selector: $('.enter-bottom')
                , properties: {
                    translateY: {
                        start: 0
                        , end: percentOfWindowHeightToPx(-1)
                        , unit: 'px'
                    }
                }
            }
        ]
    }
    , {
        start: percentOfWindowHeightToPx(10.6)
        , end: percentOfWindowHeightToPx(11.6)
        , animations: [
            {
                selector: $('.circle__text--1')
                , properties: {
                    opacity: {
                        start: 1
                        , end: 0
                    }
                    , translateY: {
                        start: 0
                        , end: -.5
                        , unit: 'em'
                    }
                }
            }
            , {
                selector: $('.circle__text--2')
                , properties: {
                    opacity: {
                        start: 0
                        , end: 1
                    }
                    , translateY: {
                        start: .5
                        , end: 0
                        , unit: 'em'
                    }
                }
            }
        ]
    }
];



var tweenInstance = tweenMachine.default(animationData);

var scroller = $('.scroller');
scroller.on('scroll', function() {
    var scrollHeight = scroller.scrollTop();
    tweenInstance.updateTween(scrollHeight);
});










function percentOfWindowWidthToPx(percent) {
    return function() {
        return percent * $(window).width();
    }
}

function percentOfWindowHeightToPx(percent) {
    return function() {
        return percent * $(window).height();
    }
}
