var utils = require('../util/utils.js');
const REQUIRED_FIELDS = ["reporter","pokestopId","task","reward"];

exports.validateReport = function(report) {

	var missingFields = utils.validateMissingFields(report, REQUIRED_FIELDS);

	if(missingFields) { 
		return utils.createError("Missing required field(s): " + JSON.stringify(missingFields))
	};
	//Verify pokestop exists in DB
	//Verify task exists in DB & task.task and reward are valid for task

	return filterReport(report);
}

exports.getOutdatedReports = function(reports) {
	var outdatedReports = [];
	todaysDate = utils.formatDate(new Date());
	for (var i = reports.length - 1; i >= 0; i--) {
		if(utils.formatDate(new Date(reports[i].date)) != todaysDate){
			outdatedReports.push(reports[i]._id);
		}
	}
	return outdatedReports;
}

//Filters out unwanted attributes so no garbage data reaches database
filterReport = function(report) {
	var filteredReport = new Object();

	filteredReport.pokestopId = report.pokestopId;
	filteredReport.task = report.task;
	filteredReport.reward = report.reward;
	filteredReport.reporter = report.reporter;
	filteredReport.date = utils.formatDate(new Date());

	return filteredReport;
}