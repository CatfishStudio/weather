'use strict';

function myGeolocation(){
    if(!navigator.geolocation) return;
    
    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
    }

    function error(err) {
        alert("ERROR(" + err.code + ") : " + err.message);
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

myGeolocation();