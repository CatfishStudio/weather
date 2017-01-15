'use strict';

var Redux = require('redux');
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var counterReducer = require('./reducers/counter');
var citiesReducer = require('./reducers/cities');

var cities = [];

/* React ============================================================ */
Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
/* ================================================================== */

/* Redux ============================================================ */
var store = Redux.createStore(reducer, {
    counter: 0,
    cities: []
});

function reducer(state, action) {
    return {
        counter: counterReducer(state.counter, action),
        cities: citiesReducer(state.cities, action)
    };
}

store.subscribe(function(){
    window.console.log(store.getState());
});
/* ================================================================== */

/* Open Weather Map ================================================= */
var OPENWEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';
var APPID = 'da06cf8106afb34ae1142a4beb9ed1aa';

function getWeatherByLatLon(lat, lon){
    var requestString  = OPENWEATHER_URL + '?lat=' + lat + '&lon=' + lon + '&APPID=' + APPID;
    var request = new XMLHttpRequest();
    request.onload = onLoadWeatherRequest;
    request.open("get", requestString, true);
    request.send();
}

function getWeatherByName(cityName){
    var requestString  = OPENWEATHER_URL + '?q=' + cityName + '&APPID=' + APPID;
    var request = new XMLHttpRequest();
    request.onload = onLoadWeatherRequest;
    request.open("get", requestString, true);
    request.send();
}

function onLoadWeatherRequest(){
    var results = JSON.parse(this.responseText);
    if(results.name != '' && results.name != null && results.name != undefined){
        //window.console.log("results:", results)
        //window.console.log("name:", results.name);
        //window.console.log("country:", results.sys.country);
        
        cities.push({
            id: cities.length, 
            name: results.name, 
            country: results.sys.country, 
            temp: convertToCelsius(results.main.temp),
            pressure: results.main.pressure,
            humidity: results.main.humidity
        });

        store.dispatch({
            type: 'ADD_CITY',
            payload: [cities]
        });
        //window.console.log("cities:", store.getState().cities);
    }
}

function convertToCelsius(degK) {
    return Math.round(degK - 273.15);
}
/* ================================================================== */

/* Geolocation ====================================================== */
function myGeolocation(){
    if(!navigator.geolocation) return;
    
    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        getWeatherByLatLon(latitude, longitude);
    }

    function error(err) {
        alert("ERROR(" + err.code + ") : " + err.message);
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

myGeolocation();
/* ================================================================== */