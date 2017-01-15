'use strict';

var CitiesReducer = function(state, action) {
    switch(action.type) {
        case 'ADD_CITY':
            return action.payload;
        default:
            return state;
    }
}

module.exports = CitiesReducer;