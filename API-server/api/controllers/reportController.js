'use strict';

var reportModel = require('../models/reportModel');
var database = require('diskdb');
database.connect('./API-server/database', ['reports']);

var reportCache = null;

exports.getReport = function(request, response) {
	var databaseResponse = database.reports.findOne({_id: request.params.reportId});
	response.json(databaseResponse);
};

exports.getReports = function(request, response) {
	if(reportCache === null){
		var databaseResponse = database.reports.find({});
		var outdatedReports = reportModel.getOutdatedReports(databaseResponse);
		
		if(outdatedReports != null) {
			for (var i = outdatedReports.length - 1; i >= 0; i--) {
				console.log(outdatedReports[i]);
				database.reports.remove({_id: outdatedReports[i]});
			}
			databaseResponse = database.reports.find({});
		}
		reportCache = databaseResponse;
		response.json(databaseResponse);
	} else {
		console.log("Fetching reports from cache");
		response.json(reportCache);
	}
};

exports.postReport = function(request, response) {
	var validatedReport = reportModel.validateReport(request.body);

	if(!validatedReport.error) {
		var databaseResponse = database.reports.save(validatedReport);
		response.json(databaseResponse);
		flushCache();
	} else {
		console.error(validatedReport.error);
		response.status(400).json(validatedReport).send();
	}
};

exports.deleteReport = function(request, response) {
	var databaseResponse = database.reports.remove({_id: request.params.reportId});
	response.json(databaseResponse);

	flushCache();
};

var flushCache = function() {
	console.log("Flushing report cache");
	reportCache = null;
}