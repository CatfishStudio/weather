'use strict';

var React = require('react');
var InputCity = require('./inputCity');
var ListCity = require('./listCity');

var Home = React.createClass({
    render: function() {
        return (
            <div className='container main'>
                <h1>React+Redux Weather App</h1>
                <InputCity />
                <ListCity />
            </div>
        );
    },

    handleChange: function (event) {
        window.console.log(event.target.value);
    },

    handleClick: function (event) {
        window.console.log("CLICK");
    }
});

module.exports = Home;