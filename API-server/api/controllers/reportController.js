'use strict';

var database = require('diskdb');
database.connect('./database', ['reports']);

exports.getReport = function(request, response) {
	var databaseResponse = database.reports.findOne({_id: request.params.reportId});
		response.json(databaseResponse);
};

exports.getReports = function(request, response) {
	var databaseResponse = database.reports.find({});
		response.json(databaseResponse);
};

exports.postReport = function(request, response) {
	var databaseResponse = database.reports.save(request.body);
		response.json(databaseResponse);
};

exports.deleteReport = function(request, response) {
	var databaseResponse = database.reports.remove({_id: request.params.reportId});
		response.json(databaseResponse);
};