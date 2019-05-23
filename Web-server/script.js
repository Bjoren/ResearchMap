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
		userReportMarker.removeFrom(map);
		var newPokestopMarker = setUpPokestopMarker(response)
		newPokestopMarker.openPopup();
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

this.setUpPokestops = function(pokestops) {
	pokestopList = pokestops;

	pokestops.forEach(pokestop =>{
		setUpPokestopMarker(pokestop);
	});
}

this.setUpPokestopMarker = function(pokestop) {
	var marker = new pokestopMarker([pokestop.lat, pokestop.lng], {"icon": pokestopIcon, "opacity": 0.4, "_id": pokestop._id})
	.bindPopup(createPokestopPopup(pokestop));

	setOpacityEvents(marker);
	marker.addTo(map);
	return marker;
}

this.setOpacityEvents = function(marker) {
	marker.on('mouseover', function (e) {
		this.setOpacity(1.0);
	});
	marker.on('mouseout', function (e) {
		this.setOpacity(0.3);
	});
	marker.on('popupopen', function (e) {
		this.setOpacity(1.0);
		this.on('mouseout', function (e) { //Disable mouseout opacity event while popup is opened
			this.setOpacity(1.0);
		});
	});
	marker.on('popupclose', function (e) {
		this.setOpacity(0.3);
		this.on('mouseout', function (e) { //Enable mouseout opacity event when popup is closed
			this.setOpacity(0.3);
		});
	});
}

//Main flow-------------------------------------------------

var userReportMarker;
var pokestopList;
var map;


getConfig(function(resp) {setUpMap(resp)}, function() { alert(resp); });
getPokestops(function(resp) {setUpPokestops(resp)}, function() { alert('Connection failed to reports API'); });