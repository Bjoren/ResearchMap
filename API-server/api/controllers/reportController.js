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
		response.json({databaseResponse});
};

exports.postReport = function(request, response) {
	var validation = reportModel.validateReport(request.body);

	if(validation === true) {
		var databaseResponse = database.reports.save(request.body); //TODO: nodemon config to ignore DB updates, constant restarts!
		response.json(databaseResponse);
	} else {
		response.json(validation);
	}
};

exports.deleteReport = function(request, response) {
	var databaseResponse = database.reports.remove({_id: request.params.reportId});
		response.json(databaseResponse);
};