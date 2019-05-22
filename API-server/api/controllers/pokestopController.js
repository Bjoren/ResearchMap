'use strict';

var pokestopModel = require('../models/pokestopModel');

var pokestopCache = null;

exports.getPokestop = function(request, response) {
	var pokestop = DATABASE.pokestops.findOne({_id: request.params.pokestopId});
	
	if(!pokestop) {
		response.status(404).json("Could not find Pokéstop with id: " + request.params.pokestopId).send();
	} else {
		var attachedReport = getAttachedReport(request.params.pokestopId);
		if(attachedReport){
			pokestop.researchReport = attachedReport;
		}
		response.json(pokestop);
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
		emptyCache();
	} else {
		console.error(validatedPokestop.error);
		response.status(400).json(validatedPokestop).send();
	}
};

exports.deletePokestop = function(request, response) {
	DATABASE.pokestops.remove({_id: request.params.pokestopId});
	
	emptyCache();
};

var getAttachedReport = function (pokestopId) {
	var attachedReport = DATABASE.reports.findOne({pokestopId: pokestopId});
	if(attachedReport) {
		return attachedReport;
	}
	return "";
}

var emptyCache = function() {
	console.log("Emptying Pokéstop cache");
	pokestopCache = null;
}