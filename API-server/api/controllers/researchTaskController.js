'use strict';

var researchTaskModel = require('../models/researchTaskModel');

var researchTaskCache = null;

exports.getResearchTask = function(request, response) {
	var researchTask = DATABASE.researchTasks.findOne({_id: request.params.researchTaskId});
	
	if(!researchTask) {
		response.status(404).json("Could not find research task with id: " + request.params.researchTaskId).send();
	} else {
		response.json(researchTask);
	}
};

exports.getResearchTasks = function(request, response) {
	if(researchTaskCache === null){
		var databaseResponse = DATABASE.researchTasks.find({});
		researchTaskCache = databaseResponse;
		response.json(databaseResponse);
	} else {
		console.debug("Fetching research tasks from cache");
		response.json(researchTaskCache);
	}
};

exports.postResearchTask = function(request, response) {
	var validatedResearchTask = researchTaskModel.validateReseachTask(request.body);
	
	if(!validatedResearchTask.error) {
		var databaseResponse = DATABASE.researchTasks.save(validatedResearchTask);
		emptyCache();
		response.json(databaseResponse);
	} else {
		console.error(validatedResearchTask.error);
		response.status(400).json(validatedResearchTask);
	}
};

exports.deleteResearchTask = function(request, response) {
	var getResearchTaskResponse = DATABASE.researchTasks.findOne({_id: request.params.researchTaskId});
	
	if(!getResearchTaskResponse) {
		response.status(404).json("Could not find research task with id: " + request.params.researchTaskId).send();
	}

	DATABASE.researchTasks.remove({_id: request.params.researchTaskId});
	emptyCache();
	response.send();
};

var emptyCache = function() {
	console.debug("Emptying research task cache");
	researchTaskCache = null;
};