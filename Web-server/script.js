'use strict';

//User action methods ---------------------------------------

this.onRightClick = function(event){
	if(userReportMarker != null) { map.removeLayer(userReportMarker); } //Remove old marker

	console.log(event);
	
	userReportMarker = L.marker(event.latlng, {"draggable": true, "icon": newPokestopIcon}).bindPopup("Report here?").openPopup();

	userReportMarker.addTo(map).openPopup();

	//Handle marker out of bounds
}

this.submitPokestop = function() {
	postPokestop({
	"name": document.getElementById("pokestopForm").elements["name"].value,
	"lat": userReportMarker.getLatLng().lat,
	"lng": userReportMarker.getLatLng().lng,
	"reporter": "Web-client" //TODO: Get this from Auth API.
	}, function(response){
		var marker = new pokestopMarker([response.lat, response.lng], {"icon": pokestopIcon, "_id": response._id}).bindPopup(createPokestopPopup(response));

		userReportMarker.removeFrom(map);
		marker.addTo(map);
	}, function(response) {
		alert(JSON.stringify(response.responseJSON.error));
	})
}

//Map methods -----------------------------------------------

this.setUpMap = function(CONFIG) {
	var boundaries = [CONFIG.boundaryMin, CONFIG.boundaryMax];

	map = L.map('mapid').setMaxBounds(boundaries)
    .setView(CONFIG.startingPoint, CONFIG.startingPointZoomLevel);

    L.rectangle(boundaries, {color: "#ff7800", weight: 1, interactive: false, fill: false}).addTo(map);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 13, //TODO: Add to config
        maxBoundsViscosity: 2.0,
        id: 'mapbox.streets',
		accessToken: CONFIG.accessToken,
		bounds: boundaries
    }).addTo(map);

    map.on('contextmenu', onRightClick);
}

this.createPokestopPopup = function(pokestop) {
	return "<b>Name: </b>" + pokestop.name +
		/*"<br><b>Task: </b>" + pokestop.research.task +
		"<br><b>Reward: </b>" + pokestop.research.reward +*/
		"<br><br>Reported by " + pokestop.reporter + ".";
}

this.setUpPokestops = function(pokestops) {
	pokestopList = pokestops;

	pokestops.forEach(pokestop =>{
		var marker = new pokestopMarker([pokestop.lat, pokestop.lng], {"icon": pokestopIcon, "_id": pokestop._id})
		.bindPopup(createPokestopPopup(pokestop));

		marker.addTo(map);
	});
}

//Main flow-------------------------------------------------

var userReportMarker;
var pokestopList;
var map;

var pokestopMarker = L.Marker.extend({
	options: { 
	   _id: ""
	}
 });

var pokestopIcon = new L.Icon({
	iconUrl: "/icons/pokestop.svg", //Replace with something appropriate
	iconSize: [50, 50],
	iconAnchor: [25, 50],
	popupAnchor: [0, -50],
	shadowSize: [25, 45]
});

var newPokestopIcon = new L.Icon({
	iconUrl: "/icons/pokestopNew.svg", //Replace with something appropriate
	iconSize: [50, 50],
	iconAnchor: [25, 50],
	popupAnchor: [0, -50],
	shadowSize: [25, 45]
});

getConfig(function(resp) {setUpMap(resp)}, function() { alert(resp); });
getPokestops(function(resp) {setUpPokestops(resp)}, function() { alert('Connection failed to reports API'); });