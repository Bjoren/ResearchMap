'use strict';

//REST methods ----------------------------------------------

this.getConfig = function(successCallback, errorCallback) {
	$.ajax ({
	        url: 'http://localhost:3000/config',
	        datatype: "json",
	        success: successCallback,
	        error: errorCallback
	    })
}

this.getReports = function(successCallback, errorCallback) {
	$.ajax ({
	        url: 'http://localhost:3000/reports',
	        datatype: "json",
	        success: successCallback,
	        error: errorCallback
	    })
}

//Map methods -----------------------------------------------

this.setUpMap = function(CONFIG) {
        map = L.map('mapid').setView([CONFIG.startingPointX, CONFIG.startingPointY], CONFIG.startingPointZoomLevel);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: CONFIG.accessToken
        }).addTo(map);
}

this.createPopupText = function(report) {
	return "<b>Quest: </b>" + report.quest + 
		"<br><b>Reward: </b>" + report.reward;
}

this.createIcon = function(reward) {
	var iconUrl = getIconUrl(reward);

	if(iconUrl != null) {
		var rewardIcon = L.icon({
		    iconUrl: iconUrl,
		    iconSize: [40, 40]
		});
		return {icon: rewardIcon};
	}
}

this.setUpReports = function(reports) {
	reportsList = reports;

	for (var i = reports.length - 1; i >= 0; i--) {
		var marker = L.marker([reports[i].x, reports[i].y], createIcon(reports[i].reward))
		.bindPopup(createPopupText(reports[i]));

		marker.addTo(map);
	}
}

//Main flow---------------------------------------------------

var reportsList;
var map;

getConfig(function(resp) {setUpMap(resp)}, function() { alert('Connection failed to config API'); });
getReports(function(resp) {setUpReports(resp)}, function() { alert('Connection failed to reports API'); });