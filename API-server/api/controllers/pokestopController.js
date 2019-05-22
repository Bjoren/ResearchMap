'use strict';

var pokestopModel = require('../models/pokestopModel');

var pokestopCache = null;

exports.getPokestop = function(request, response) {
	var databaseResponse = DATABASE.pokestops.findOne({_id: request.params.pokestopId});
	
	if(!databaseResponse) {
		response.status(404).json("Could not find Pokéstop with id: " + request.params.pokestopId).send();
	} else {
		response.json(databaseResponse);
	}
};

exports.getPokestops = function(request, response) {
	if(pokestopCache === null){
		var databaseResponse = DATABASE.pokestops.find({});
		pokestopCache = databaseResponse;
		response.json(databaseResponse);
	} else {
		console.log("Fetching Pokéstops from cache");
		response.json(pokestopCache);
	}
};

exports.postPokestop = function(request, response) {
	var validatedPokestop = pokestopModel.validatePokestop(request.body);

	if(!validatedPokestop.error) {
		var databaseResponse = DATABASE.pokestops.save(validatedPokestop);
		response.json(databaseResponse);
		flushCache();
	} else {
		console.error(validatedPokestop.error);
		response.status(400).json(validatedPokestop).send();
	}
};

exports.deletePokestop = function(request, response) {
	var databaseResponse = DATABASE.pokestops.remove({_id: request.params.pokestopId});
	response.json(databaseResponse);

	emptyCache();
};

var emptyCache = function() {
	console.log("Emptying Pokéstop cache");
	pokestopCache = null;
}