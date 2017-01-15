'use strict';

var cities = [];
var ids = 0;

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
        cities[results.id] = {
            id: results.id, 
            name: results.name, 
            country: results.sys.country, 
            temp: convertToCelsius(results.main.temp),
            pressure: results.main.pressure,
            humidity: results.main.humidity
        };
        updateListCities();
        window.console.log("[cities]:", cities);
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
/* ================================================================== */

function updateListCities() {
    var listCities = document.getElementById('listCities');
    listCities.innerHTML = "";

    var city;
    cities.forEach(function(element) {
        city = document.createElement("li");
        city.innerHTML = '<p>' + element.name + '</p>';
        city.setAttribute("id", element.id);
        listCities.appendChild(city);
    }, this);
}

function removeCity(id) {
    delete cities[id];
    updateListCities();
}

function onButtonClick() {
    var inputText = document.getElementById('inputText');
    if(inputText.value != ""){
        getWeatherByName(inputText.value);
        inputText.value = "";
    }
}

function onLoad() {
    cities = [];
    ids = 0;
    myGeolocation();
}