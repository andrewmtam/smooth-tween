import $ from 'jquery';
import test from 'tape';
import * as utilities from '../utilities';
import jsdom from 'jsdom';

test('Convert string to data-js selector', function(t) {
    t.plan(2);

    t.equal(
        utilities.getSelector__withDataJs('hello')
        , "[data-js=\"hello\"]"
        , "Test supplying a string"
    );

    t.equal(
        utilities.getSelector__withDataJs(['hello', 'bye', 'greetings'])
        , "[data-js=\"hello\"],[data-js=\"bye\"],[data-js=\"greetings\"]"
        , "Test supplying an array"
    );


});
