'use strict';

var React = require('react');

var InputCity = React.createClass({
    render: function() {
        return (
            <div className='div-input-city'>
                <form className='form-input-city'>
                    <input
                        className = 'input-text' 
                        type='text'
                        placeholder='Enter city name'
                        onChange = {this.handleChange}
                    />
                    <input
                        className = 'input-submit'
                        type = 'submit'
                        value = 'Add city'
                        onClick = {this.handleClick}
                    />
                </form>
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

module.exports = InputCity;