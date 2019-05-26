'use strict';

var pokestopModel = require('../models/pokestopModel');

var pokestopCache = null;

exports.getPokestop = function(request, response) {
	var pokestop = DATABASE.pokestops.findOne({_id: request.params.pokestopId});
	
	if(!pokestop) {
		response.status(404).json("Could not find Pokéstop with id: " + request.params.pokestopId).send();
	} else {
		attachResearchReport(pokestop);
		response.json(pokestop);
	}
};

exports.getPokestops = function(request, response) {
	if(pokestopCache === null){
		var databaseResponse = DATABASE.pokestops.find({});

		databaseResponse.forEach(pokestop => {
			attachResearchReport(pokestop);			
		});

		pokestopCache = databaseResponse;
		response.json(databaseResponse);
	} else {
		console.debug("Fetching Pokéstops from cache");
		response.json(pokestopCache);
	}
};

exports.postPokestop = function(request, response) {
	var validatedPokestop = pokestopModel.validatePokestop(request.body);
	
	if(!validatedPokestop.error) {
		var databaseResponse = DATABASE.pokestops.save(validatedPokestop);
		emptyCache();
		response.json(databaseResponse);
	} else {
		console.error(validatedPokestop.error);
		response.status(400).json(validatedPokestop);
	}
};

exports.deletePokestop = function(request, response) {
	var getPokestopResponse = DATABASE.pokestops.findOne({_id: request.params.pokestopId});
	
	if(!getPokestopResponse) {
		response.status(404).json("Could not find Pokéstop with id: " + request.params.pokestopId).send();
	}
	
	DATABASE.pokestops.remove({_id: request.params.pokestopId});
	emptyCache();
	response.send();
};

var attachResearchReport = function(pokestop) {
	var attachedReport = getAttachedReport(pokestop._id);

	if(attachedReport){
		delete attachedReport.pokestopId;
		pokestop.researchReport = attachedReport;
	}
}

var getAttachedReport = function (pokestopId) {
	var attachedReport = DATABASE.reports.findOne({pokestopId: pokestopId});
	if(attachedReport) {
		return attachedReport;
	}
	return "";
};

var emptyCache = function() {
	console.debug("Emptying Pokéstop cache");
	pokestopCache = null;
};