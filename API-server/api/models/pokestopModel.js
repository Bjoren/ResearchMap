var utils = require('../util/utils.js');
const REQUIRED_FIELDS = ["name","lat","lng","reporter"];

exports.validatePokestop = function(pokestop) {

	var missingFields = utils.validateMissingFields(pokestop, REQUIRED_FIELDS);

	if(missingFields) { 
		return utils.createError("Missing required field(s): " + JSON.stringify(missingFields))
	};

	if(!isWithinBounds(pokestop.lat, pokestop.lng)) {
		var map = CONFIG.map;
		var errorData = {
			"pokestop": [pokestop.lat, pokestop.lng],
			"boundary": {
				"min": map.boundaryMin,
				"max": map.boundaryMax
			}
		}
		return utils.createError("Pokéstop with coordinates " + JSON.stringify([pokestop.lat, pokestop.lng]) + " is out of bounds.");
	};

	return filterPokestop(pokestop);
}

var isWithinBounds = function(lat, lng) {
	var map = CONFIG.map;
	return(lat > map.boundaryMin[0] && lat < map.boundaryMax[0] && lng > map.boundaryMin[1] && lng < map.boundaryMax[1]);
}

//Filters out unwanted attributes so no garbage data reaches database
filterPokestop = function(pokestop) {
	var filteredPokestop = new Object();

	filteredPokestop.name = pokestop.name;
	filteredPokestop.lat = pokestop.lat;
	filteredPokestop.lng = pokestop.lng;
	filteredPokestop.reporter = pokestop.reporter;

	return filteredPokestop;
}