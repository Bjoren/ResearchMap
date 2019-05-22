'use strict';

//User action methods ---------------------------------------

this.onRightClick = function(event){
	if(userReportMarker != null) { map.removeLayer(userReportMarker); } //Remove old marker

	console.log(event);
	
	userReportMarker = L.marker(event.latlng, {"draggable": true}).bindPopup("Report here?").openPopup();

	userReportMarker.addTo(map).openPopup();

	//Handle marker out of bounds
}

this.submitReport = function() {
	postReport({
	"task": document.getElementById("reportWindow").elements["task"].value,
	"reward": document.getElementById("reportWindow").elements["reward"].value,
	"x": userReportMarker.getLatLng().lat,
	"y": userReportMarker.getLatLng().lng,
	"reporter": "Web-client" //TODO: Get this from Auth API.
	}, function(response){
		var marker = L.marker([response.x, response.y], createIcon(response.reward)).bindPopup(createPopupText(response));

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

this.createPopupText = function(report) {
	return "<b>Task: </b>" + report.task + 
		"<br><b>Reward: </b>" + report.reward +
		"<br><br>Reported by " + report.reporter + ".";
}

this.createIcon = function(reward) {
	var iconUrl = getIconUrl(reward);

	if(iconUrl != null) {
		var rewardIcon = L.icon({
		    iconUrl: iconUrl,
		    iconSize: [80, 80],
		    popupAnchor: [-0, -15]
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

//Main flow-------------------------------------------------

var userReportMarker;
var reportsList;
var map;

getConfig(function(resp) {setUpMap(resp)}, function() { alert(resp); });
getReports(function(resp) {setUpReports(resp)}, function() { alert('Connection failed to reports API'); });