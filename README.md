# tween-machine

A JSON powered, functional parallax scrolling library that uses native scrolling (no iscroll, or custom scrolling required)!

As a consequence, 60fps animations are achievable in both desktop browsers and mobile devices.

## Use Cases

### Parallax Scrolling

Bind animations to the mouse scroll event to create stunning parallax effect and full scroll-based websites.

### Functional Animations

While the primary use case for this is most likely for parallax scrolling, tween-machine has been built in a functional way.  The user can choose what tool will 'drive' their animations, whether it be scrolling, mouse movement, clicking, etc...

## Theory

There seem to exist many parallax scrolling libraries out there, but few are optimized for mobile devices.  By utilizing the browser's native scrolling, 'tween-machine' aims to produce performant scroll based animations.


In order to achieve this, 'tween-machine' relies on the following DOM structure:


```
<body>
    <div class='content'>
        All animation content goes here
    </div>
    <div class='scrollable' >
        This div will actually be empty!
        But it will be scrollable and have a calculated height
    </div>
</body>
```

In the markup above, the 'content' div will hold all the html for elements that are going to be moving and transitioning.  The 'scrollable' div will be an empty div whose main purpose is to listen for scroll events.  The height of this div should explicitly be set with javascript.

You might have noticed something with this approach -- if we are really scrolling the 'scrollable' div, it must be positioned on top of the 'content' div; this means that we cannot readily click on items inside of the 'content' div.

The solution I have implemented is based on these responses:

* http://stackoverflow.com/a/10623558
* http://www.vinylfox.com/forwarding-mouse-events-through-layers/

Essentially, it leverages the 'document.elementFromPoint' property to forward events to DOM objects below the current layer.

Lastly, keep in mind that this approach / setup is valid only for usage with a full-site parallax experience.

TODO: Make this a separate npm package.


## Installation

Download the twean machine library by doing the following:

```
npm install --save tween-machine
```

TODO: Build a stand-alone minified version of this library.

### JSON Definition

The tweenMachine is driven by a JSON file.

This file should describe all the animations that should happen, and when.

#### Annotated Example
```
[
    // The JSON file should be an array of different tween durations

    {
        // Describes the duration of this animation
        // 'start' and 'end' could refer to the scrollTop of the page
        // or whatever you want -- this is directly related to what
        // is passed to the updateTween method described in the API section
        start: 0
        , end: 800

        // There may be cases where we want the start
        // and end values to be determined lazily.
        // For instance, if we want these values to be
        // dependent on the window height, then we could pass
        // in a function to return the window height
        // , start: function() { return $(window).height()}
        // , end: function() { return $(window).height()}


        // The list of animations to execute
        // for the duration described above
        // As its an array, you can have multiple
        // different animations happening over
        // the same duration
        , animations: [
            {

                // The selector accepts a variety of arguments
                // The suggested usage is to give your DOM elements a
                // "data-js" attribute, and then use this value as
                // the 'selector'.  By default, the parser
                // will assume that any string passed in is
                // a 'data-js' value.
                selector: 'landing__circle-right'

                // It also supports an array of 'data-js' values
                // as well as support of directly passing in
                // jQuery elements and native DOM elements
                // , selector: jQueryElement
                // , selector: DOMElement
                // , selector: ['dataJSDescriptor1', 'dataJSDescriptor2']

                // These are the actual properties
                // that will get tweened during the
                // tween duration
                // You can specify as many properties
                // as you like here
                , properties: {

                    // IMPORTANT: Because the underlying animation handler
                    // is Velocity.js, property names must match the
                    // Velocity.js spec: http://velocityjs.org/#cssSupport
                    translateX: {

                        // 'start' and 'end' refer to the
                        // tween values for the property
                        start: 0
                        , end: 1.3

                        // As with the tween duration, you can also specify
                        // functions for the start/end value of property tweens
                        // , start: function() { return $(window).height() }
                        // , end: function() { return $(window).height() }

                        // By default, all tween values will have
                        // no unit.  You must explicitly pass the unit
                        // ( 'px', '%', 'em', etc... )
                        , unit: 'em'
                    }
                }
            }
        ]
    }
]
```


### Clean Example ( no annotations )
```
[
    {
        start: () => percentHeightToPx(0)
        , end: () => percentHeightToPx(25)
        , animations: [
            {
                selector: 'landing__circle-left'
                , properties: {
                    opacity: {
                        start: 1
                        , end: 0
                    }
                }
            }
            , {
                selector: 'landing__circle-right'
                , properties: {
                    opacity: {
                        start: 1
                        , end: 0
                    }
                }
            }
            , {
                selector: 'background__slide--title'
                , properties: {
                    zIndex: {
                        start: 4
                        , end: 1
                    }
                }
            }
        ]
    }
    , {
        start: () => percentHeightToPx(0)
        , end: () => percentHeightToPx(CIRCLE_START)
        , animations: [
            {
                selector: [
                    'landing__background-left-name'
                    , 'landing__background-right-name'
                    , 'landing__left-name'
                    , 'landing__right-name'
                ]
                , properties: {
                    translateX: {
                        start: 0
                        , end: -.75
                        , unit: 'em'
                    }
                }
            }
            , {
                selector: [
                    'landing__background-left-developer'
                    , 'landing__background-right-developer'
                    , 'landing__left-developer'
                    , 'landing__right-developer'
                ]
                , properties: {
                    translateX: {
                        start: 0
                        , end: 1.3
                        , unit: 'em'
                    }
                }
            }
        ]
    }
]
```



## API

### TweenMachine(animationData [ Object ])

The Tweener constructor that gets loaded in accepts only one argument -- your JSON definition.

```
import TweenMachine from 'tween-machine';
let tweenInstance = TweenMachine(animationData);
```

#### TweenMachine.updateTween(tweenValue [ Number | String ])


'updateTween' must be called in order to tell 'tweenMachine' what the next value to tween is.


```
scrollLayer.on('scroll', (e) => {
    let scrollTop = scrollLayer.scrollTop();
    tweenInstance.updateTween(scrollTop);
})
```


#### TweenMachine.recalculateStaticJson()

Users can specify JSON definitions with lazily evaluated functions.

This method evaluates those functions and constructs the static JSON.

This is helpful if the functions are dependent on window size ( sometimes we like to translate things '100%' but the pixel of that will change when the window is resized  )

```
$(window).on('resize', () => {
    var staticJson = tweenInstance.recalculateStaticJson();
    var maxHeight = getMaxHeight_withAnimation_withWindowHeight( staticJson, $(window).height());
    scrollHeight.height( maxHeight );

    function getMaxHeight_withAnimation_withWindowHeight(staticAnimation, windowHeight) {
        // Pull out the 'end' values
        let end = _.map(staticAnimation, anim => anim.end);

        // We need to add on one more screen height
        let max = Math.max.apply(Math, end);

        return max + windowHeight;
    }

});
```


## Example Usage

### Parallax Site

```
import tweenerMachine from 'tween-machine';

// This div will be resopnsible for holding
// all the parallax content of the site
let scrollLayer = $("[data-js='scroll-layer]");

// This div will solely be responsible for keeping track
// of the scroll height.

// When the user scrolls, the will really be scrolling
// on this div
let scrollHeight = $("[data-js='scroll-height]");

// Using our JSON definition, construct the actual tweenMachine instance
let tweenInstance = tweenerMachine(animationData);

// On resize, also, recalculate teh static json
// so that we can properly set the height
// of the scrollable div
$(window).on('resize', resizeScrollerOnWindowResize)
resizeScrollerOnWindowResize();

function resizeScrollerOnWindowResize() {
    var staticJson = tweenInstance.recalculateStaticJson();
    var maxHeight = getMaxHeight_withAnimation_withWindowHeight( staticJson, $(window).height());
    scrollHeight.height( maxHeight );
}

// Pass the tween value to the tweenMachine instance so that it can render the next animation
scrollLayer.on('scroll', (e) => {
    let scrollTop = scrollLayer.scrollTop();
    tweenInstance.updateTween(scrollTop);
})

// Parse through the JSON definition to find the maximum height
// the window should be so that all animations get completed
function getMaxHeight_withAnimation_withWindowHeight(staticAnimation, windowHeight) {
    // Pull out the 'end' values
    let end = _.map(staticAnimation, anim => anim.end);

    // We need to add on one more screen height
    let max = Math.max.apply(Math, end);

    return max + windowHeight;
}
```
