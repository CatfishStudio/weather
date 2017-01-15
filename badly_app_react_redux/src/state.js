/*
'use strict';
var Redux = require('redux');
var counterReducer = require('./reducers/counter');

const store = Redux.createStore(reducer, {
    counter: 0
});

function reducer(state, action) {
    return {
        counter: counterReducer(state.counter, action)
    };
}

export default store;
//module.exports = store;
*/