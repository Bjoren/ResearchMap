'use strict';

var userInputMarker;
var pokestopList;
var map;

getConfig(function(resp) {setUpMap(resp)}, function() { alert(resp); });
getPokestops(function(resp) {setUpPokestops(resp)}, function() { alert('Connection failed to reports API'); });

this.onRightClick = function(event){
	if(userInputMarker != null) { map.removeLayer(userInputMarker); } //Remove old marker
	
	userInputMarker = L.marker(event.latlng, {"draggable": true, "icon": newPokestopIcon, "autoPan": true, "zIndexOffset": 1000})
		.bindPopup("New Pokéstop")
		.on('dragend', function (e) {
			this.openPopup();
		});
	userInputMarker.addTo(map).openPopup();
}

this.onLeftClick = function(event) {
	if(userInputMarker != null) { map.removeLayer(userInputMarker); }
}

this.submitPokestop = function() {
	postPokestop({
	"name": document.getElementById("pokestopForm").elements["name"].value,
	"lat": userInputMarker.getLatLng().lat,
	"lng": userInputMarker.getLatLng().lng,
	"reporter": "Web-client" //TODO: Get this from Auth API.
	}, function(response){
		userInputMarker.removeFrom(map);
		var newPokestopMarker = setUpPokestopMarker(response)
		newPokestopMarker.openPopup();
	}, function(response) {
		alert(JSON.stringify(response.responseJSON.error));
	})
}
