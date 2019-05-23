'use strict';

var userReportMarker;
var pokestopList;
var map;

getConfig(function(resp) {setUpMap(resp)}, function() { alert(resp); });
getPokestops(function(resp) {setUpPokestops(resp)}, function() { alert('Connection failed to reports API'); });

this.onRightClick = function(event){
	if(userReportMarker != null) { map.removeLayer(userReportMarker); } //Remove old marker
	
	userReportMarker = L.marker(event.latlng, {"draggable": true, "icon": newPokestopIcon}).bindPopup("New Pokéstop:");
	userReportMarker.addTo(map).openPopup();
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
