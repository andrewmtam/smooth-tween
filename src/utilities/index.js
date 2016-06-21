import _ from 'lodash';
import $ from 'jquery';


export function getSelector__withDataJs(dataJs) {
    return `[data-js="${dataJs}"]`;
}

export function getRandomNumber(min, max) {
    return (Math.random() * (max - min + 1)) + min;
}

export function splitWordIntoSpans(selector) {
    let wordWrapper = $(selector);

    $(selector).each( (idx, eachWrapper ) => {
        eachWrapper = $(eachWrapper);
        if ( !eachWrapper.find('.letter').length ) {
            let word = eachWrapper.html().trim();
            let newWord = $();
            _.each(word, ( letter, idx )  => {
                let wrappedLetter = $('<span/>')
                    .addClass('letter')
                    .text(letter)
                ;

                newWord = newWord.add(wrappedLetter);
            })

            eachWrapper.empty();
            eachWrapper.append(newWord);
        }
    })

}

export function getJqueryObjectFromSelector(selector) {
    let element;

    // If its not a jquery object
    if ( !selector.jquery ) {
        if ( !_.isArray(selector) ) {
            selector = [selector];
        }

        let joinedSelector;

        // Select multiple jqueyr objects if an array is supplied
        joinedSelector = _.map(selector, str =>  getSelector__withDataJs(str)).join(',');
        element = $( joinedSelector );

    }
    // If it is a jqueyr object, just return
    else {
        element = selector;
    }

    return element;
}


export function easingHelper(easing, startTime, startValue, endValue, endTime, percentComplete) {
    let duration = endTime - startTime;
    let changeInValue = endValue - startValue;

    let val = easing(null, duration*percentComplete, startValue, changeInValue, duration)
    //console.log(startTime, startValue, endValue, duration, val);

    return val;
}
