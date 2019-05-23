'use strict';

var reportModel = require('../models/reportModel');

var reportCache = null;

exports.getReport = function(request, response) {
	var report = DATABASE.reports.findOne({_id: request.params.reportId});

	if(!report) {
		response.status(404).json("Could not find report with id: " + request.params.reportId).send();
	} else {
		response.json(report);
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
		emptyCache();
		response.json(validatedReport);
	} else {
		console.error(validatedReport.error);
		response.status(400).json(validatedReport);
	}
};

exports.deleteReport = function(request, response) {
	var getReportResponse = DATABASE.reports.findOne({_id: request.params.reportId});

	if(!getReportResponse) {
		response.status(404).json("Could not find report with id: " + request.params.reportId).send();
	}

	DATABASE.reports.remove({_id: request.params.reportId});
	emptyCache();
	response.send();
};

var emptyCache = function() {
	console.log("Emptying report cache");
	reportCache = null;
}