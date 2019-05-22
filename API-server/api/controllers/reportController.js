'use strict';

var reportModel = require('../models/reportModel');

var reportCache = null;

exports.getReport = function(request, response) {
	var databaseResponse = DATABASE.reports.findOne({_id: request.params.reportId});

	if(!databaseResponse) {
		response.status(404).json("Could not find report with id: " + request.params.reportId).send();
	} else {
		response.json(databaseResponse);
	}
};

exports.getReports = function(request, response) {
	if(reportCache === null) {
		var reports = DATABASE.reports.find({});
		var outdatedReports = reportModel.getOutdatedReports(reports);
		
		if(outdatedReports != null) {
			console.log("Deleting outdated reports from database: " + JSON.stringify(outdatedReports));
			outdatedReports.forEach(reportId => {
				DATABASE.reports.remove({"_id": reportId});
			});
			reports = DATABASE.reports.find({});
		}

		reportCache = reports;
		response.json(reports);
	} else {
		console.log("Fetching reports from cache");
		response.json(reportCache);
	}
};

exports.postReport = function(request, response) {
	var validatedReport = reportModel.validateReport(request.body);

	if(!validatedReport.error) {
		DATABASE.reports.save(validatedReport);
		flushCache();
	} else {
		console.error(validatedReport.error);
		response.status(400).json(validatedReport).send();
	}
};

exports.deleteReport = function(request, response) {
	DATABASE.reports.remove({_id: request.params.reportId});

	flushCache();
};

var flushCache = function() {
	console.log("Emptying report cache");
	reportCache = null;
}