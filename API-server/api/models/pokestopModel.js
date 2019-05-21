var utils = require('../util/utils.js');

exports.validatePokestop = function(pokestop) {

	if(!pokestop.reporter) { return utils.createError("Missing required attribute 'reporter'")}; //TODO: This should recieve a token or something and validate towards Discord's OAuth
	if(!pokestop.pokestopName) { return utils.createError("Missing required attribute 'pokestopName'")};
	if(!pokestop.lat) { return utils.createError("Missing required attribute 'lat'")}; //TODO: Restrict to max values defined in config
	if(!pokestop.lng) { return utils.createError("Missing required attribute 'lng'")};

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

	filteredPokestop.pokestopName = pokestop.pokestopName;
	filteredPokestop.lat = pokestop.lat;
	filteredPokestop.lng = pokestop.lng;
	filteredPokestop.reporter = pokestop.reporter;

	return filteredPokestop;
}