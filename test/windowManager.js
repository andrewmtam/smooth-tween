import windowManager from '../windowManager';
import mockBrowser from 'mock-browser';
import test from 'tape';
import $ from 'jquery';

var window = mockBrowser.mocks.MockBrowser.createWindow();

console.log(window);

window.height = function() {
    return 100;
}

window.width = function() {
    return 100;
}


const {
    percentWidthToPx
    , percentHeightToPx
    , getWindowHeight
    , getWindowWidth
} = windowManager(window);

test('WindowManager', function(t) {

    t.plan(1);
    console.log("here");

    t.deepEqual({}, {});

});
