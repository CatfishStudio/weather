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
        city.innerHTML = 
        '<p>' +
            '<h4>'+ element.name + ', ' + element.country + '</h4>' +
            '<ul>' + 
                '<li>temp: ' + element.temp + '</li>' +
                '<li>pressure: ' + element.pressure + '</li>' +
                '<li>humidity: ' + element.humidity + '</li>' +
            '</ul>' +
            '<button class="buttonDelete" onclick="removeCity(' + element.id + ')">Delete</button>' +
        '</p>';
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

function onResize() {
    var header = document.getElementsByTagName('header')[0];
    header.style.marginTop = 2 + '%';
    header.style.marginLeft = (window.innerWidth / 100 * 1.5) + '%';
    header.style.marginRight = (window.innerWidth / 100 * 1.5) + '%';

    var section = document.getElementsByTagName('section')[0];
    section.style.marginTop = 2 + '%';
    section.style.marginLeft = (window.innerWidth / 100 * 1.8) + '%';
    section.style.marginRight = (window.innerWidth / 100 * 1.8) + '%';


    var listCities = document.getElementById('listCities');
    listCities.style.height = (window.innerHeight / 2) + 'px';
}

function onLoad() {
    cities = [];
    ids = 0;
    onResize();
    myGeolocation();
}