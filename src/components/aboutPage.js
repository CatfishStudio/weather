'use strict';

var React = require('react');

var About = React.createClass({
    render: function() {
        return (
            <div className='container about'>
                <h1>About</h1>
                <p>React+Redux Weather App</p>
                <p>created by Somov Evgeniy</p>
            </div>
        );
    }
});

module.exports = About;