'use strict';

//User action methods ---------------------------------------

this.onRightClick = function(event){
	if(userReportMarker != null) { map.removeLayer(userReportMarker); } //Remove old marker

	console.log(event);
	
	userReportMarker = L.marker(event.latlng, {"draggable": true}).bindPopup("Report here?").openPopup();

	userReportMarker.addTo(map).openPopup();

	map.setView(event.latlng, 20);

	//Handle marker out of bounds
}

this.submitReport = function() {
	postReport({
	"quest": document.getElementById("reportWindow").elements["task"].value,
	"reward": document.getElementById("reportWindow").elements["reward"].value,
	"x": userReportMarker.getLatLng().lat,
	"y": userReportMarker.getLatLng().lng,
	"reporter": "Cleanstream"
	}, function(resp){console.log(resp);}, function(resp) {console.alert(resp);})
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

    map.on('contextmenu', onRightClick);
}

this.createPopupText = function(report) {
	return "<b>Task: </b>" + report.quest + 
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