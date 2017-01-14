'use strict';
/* ПОГОДА ============================================================ */
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
    request.onload = proccessWeatherResults;
    request.open("get", requestString, true);
    request.send();
}

function onLoadWeatherRequest(){
    var results = JSON.parse(this.responseText);
    if(results.name != '' && results.name != null && results.name != undefined){
        console.log(results.name);
        console.log(results);
    }
}
/* ================================================================== */

/* ГЕОПОЛОЖЕНИЕ ===================================================== */
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





/* ================================================================== */