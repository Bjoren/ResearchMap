'use strict';

var reportModel = require('../models/reportModel');
var database = require('diskdb');
database.connect('./database', ['reports']);

exports.getReport = function(request, response) {
	var databaseResponse = database.reports.findOne({_id: request.params.reportId});
	response.json(databaseResponse);
};

exports.getReports = function(request, response) {
	var databaseResponse = database.reports.find({});
	var outdatedReports = reportModel.getOutdatedReports(databaseResponse);
	
	if(outdatedReports != null) {
		for (var i = outdatedReports.length - 1; i >= 0; i--) {
			console.log(outdatedReports[i]);
			database.reports.remove({_id: outdatedReports[i]});
		}
		databaseResponse = database.reports.find({});
	}
	response.json(databaseResponse);
};

exports.postReport = function(request, response) {
	var validatedReport = reportModel.validateReport(request.body);

	if(!validatedReport.error) {
		var databaseResponse = database.reports.save(validatedReport); //TODO: nodemon config to ignore DB updates, constant restarts!
		response.json(databaseResponse);
	} else {
		response.json(validatedReport);
	}
};

exports.deleteReport = function(request, response) {
	var databaseResponse = database.reports.remove({_id: request.params.reportId});
	response.json(databaseResponse);
};