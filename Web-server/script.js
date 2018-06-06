'use strict';

getConfig(function(resp) {
	setUpMap(resp) },
    function() { alert('Connection failed to config API'); 
});

this.setUpMap = function(CONFIG) {
    var map = L.map('mapid').setView([CONFIG.startingPointX, CONFIG.startingPointY], CONFIG.startingPointZoomLevel);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: CONFIG.accessToken
    }).addTo(map);
}

this.getConfig = function(successCallback, errorCallback) {
    $.ajax({
        url: 'http://localhost:3000/config',
        datatype: "json",
        success: successCallback
    })
}