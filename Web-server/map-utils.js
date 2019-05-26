'use strict';

const pokestopIcon = new L.Icon({
    iconUrl: "/icons/pokestop.svg",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
    shadowSize: [25, 45]
});

const newPokestopIcon = new L.Icon({
    iconUrl: "/icons/pokestopNew.svg",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
    shadowSize: [25, 45]
});

var pokestopMarker = L.Marker.extend({
    options: { 
        _id: ""
    }
});

var CONFIG;
var selectedMarker = null;

//Map -----------------------------------------------

this.initialSetup = function(config) {
    CONFIG = config;
    setUpMap();
}

this.setUpMap = function() {
    var boundaries = [CONFIG.boundaryMin, CONFIG.boundaryMax];
    
	map = L.map('mapid').setMaxBounds(boundaries)
    .setView(CONFIG.startingPoint, CONFIG.startingPointZoomLevel);
    
    L.rectangle(boundaries, {color: "#ff7800", weight: 1, interactive: false, fill: false}).addTo(map);
    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 13, //TODO: Add to config
        id: 'mapbox.streets',
		accessToken: CONFIG.accessToken,
		bounds: boundaries,
    }).addTo(map);
    
    map.on('contextmenu', onRightClick)
    .on('click', onLeftClick);
}

this.setUpPokestops = function(pokestops) {
    pokestopList = pokestops;

    pokestops.forEach(pokestop =>{
        setUpPokestopMarker(pokestop);
    });
}

this.createPokestopPopupText = function(pokestop) {
    if(pokestop.researchReport) {
        return document.getElementById("researchReportDetails").outerHTML;
    }
    else {
        console.log(document.getElementById("researchReportForm").cloneNode(true));
        return document.getElementById("researchReportForm").cloneNode(true);
    }
}

this.setUpPokestopMarker = function(pokestop) {
    var marker = new pokestopMarker([pokestop.lat, pokestop.lng],{"icon": pokestopIcon, "opacity": 0.4, "_id": pokestop._id})
    .bindPopup(createPokestopPopupText(pokestop), {"autoClose": false, "closeButton": false});
    
    marker.namePopup = L.popup({"offset": [0,-50], "closeButton": false})
    .setContent(`<b>${pokestop.name}<b>`)
    .setLatLng([pokestop.lat, pokestop.lng]);

    setPokestopMarkerOpacityEvents(marker);
    marker.addTo(map);
    return marker;
}

this.getRewardIcon = function(reward) {
    //Should return an appropriate icon for the name of reward passed in 'reward'.
    //This includes item names, Pokémon names and generic "encounter"-icon when multiple Pokémon are passed in
}

this.setPokestopMarkerOpacityEvents = function(marker) {
    setHoverOverOpacityEvents(marker);
    setOnClickOpacityEvents(marker);
}

this.setHoverOverOpacityEvents = function(marker) {
	marker.on('mouseover', function (e) {
        this.setOpacity(1.0);
        if(selectedMarker == null) {
            this.namePopup.openOn(map);
        }
	});
	marker.on('mouseout', function (e) {
        if(selectedMarker != this) {
            this.setOpacity(0.3);
        }
        this.namePopup.removeFrom(map);
	});
}

this.setOnClickOpacityEvents = function(marker) {
	marker.on('popupopen', function (e) {
        this.setOpacity(1.0);
        selectedMarker = this;
    });
    
	marker.on('popupclose', function (e) {
		this.setOpacity(0.3);
        if(selectedMarker === this) {
            selectedMarker = null;
        }
    });
}

this.isInBounds = function(latLng) {
    const boundaries = L.latLngBounds([CONFIG.boundaryMin, CONFIG.boundaryMax]);
    return boundaries.contains(latLng);
}