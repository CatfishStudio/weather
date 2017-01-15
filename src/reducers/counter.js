'use strict';

var CounterReducer = function(state, action) {
    switch(action.type) {
        case 'INC_COUNTER':
            return state + 1;
        default:
            return state;
    }
}

module.exports = CounterReducer;