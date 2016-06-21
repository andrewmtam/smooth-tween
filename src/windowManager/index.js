import $ from 'jquery';

let windowHeight = $(window).height();
let windowWidth = $(window).width();

// On resize, set our window width
// Also, recalculate teh static json
$(window).on('resize', () => {
    setWindowHeight( $(window).height() );
    setWindowWidth( $(window).width() );
});

function setWindowHeight(height) {
    windowHeight = height;
    return windowHeight;
}

function setWindowWidth(width) {
    windowWidth = width;
    return windowWidth;
}



// Given a percent down the screen, convert to window height
export function percentHeightToPx(percent) {
    let windowHeight = getWindowHeight();
    return ( percent / 100 ) * windowHeight;
}

// Given a percent down the screen, convert to window height
export function percentWidthToPx(percent) {
    let windowWidth = getWindowWidth();
    return ( percent / 100 ) * windowWidth;
}

export function getWindowHeight() {
    return windowHeight;
}

export function getWindowWidth() {
    return windowWidth;
}
