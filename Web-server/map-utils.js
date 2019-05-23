'use strict';

//Map -----------------------------------------------

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
	return `<b>${pokestop.name}</b>
            <br><br>Reported by ${pokestop.reporter}`;
            
            //TODO: Add task if existant, otherwise report task form
            /*<br><b>Task:</b> ${pokestop.research.task}
		    <br><b>Reward:</b> ${pokestop.research.reward}*/
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

this.getRewardIcon = function(reward) {
    //Should return an appropriate icon for the name of reward passed in 'reward'.
    //This includes item names, Pokémon names and generic "encounter"-icon when multiple Pokémon are passed in
}

this.setUpPokestops = function(pokestops) {
	pokestopList = pokestops;

	pokestops.forEach(pokestop =>{
		setUpPokestopMarker(pokestop);
	});
}

this.setUpPokestopMarker = function(pokestop) {
	var marker = new pokestopMarker([pokestop.lat, pokestop.lng], {"icon": pokestopIcon, "opacity": 0.4, "_id": pokestop._id})
    .bindPopup(createPokestopPopup(pokestop));
    
    marker.namePopup = L.popup({"offset": [0,-50], "closeButton": false})
    .setContent(`<b>${pokestop.name}<b>`)
    .setLatLng([pokestop.lat, pokestop.lng]);

	setHoverOverOpacityEvents(marker);
	marker.addTo(map);
	return marker;
}

this.setHoverOverOpacityEvents = function(marker) {
	marker.on('mouseover', function (e) {
        this.setOpacity(1.0);
        this.namePopup.openOn(map);
	});
	marker.on('mouseout', function (e) {
        this.setOpacity(0.3);
        this.namePopup.removeFrom(map);
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
