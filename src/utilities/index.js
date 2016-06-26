import _ from 'lodash';

export function getSelector__withDataJs(dataJs) {
    if ( _.isArray(dataJs) ) {
        return _.map(dataJs, selector =>  _addDataJs(selector)).join(',');
    }
    else {
        return _addDataJs(dataJs);
    }
}

function _addDataJs(selector) {
    return `[data-js="${selector}"]`;
}
