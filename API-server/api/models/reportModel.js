var utils = require('../util/utils.js');

exports.validateReport = function(report) {

	if(!report.reporter) { return utils.createError("Missing required field 'reporter'")};
	if(!report.pokestopId) { return utils.createError("Missing required field 'pokestopId'")}; //TODO: Max length? Compare to list of known tasks?
	if(!report.taskId) { return utils.createError("Missing required field 'taskId'")};

	//Verify pokestop exists in DB
	//Verify task exists in DB

	return filterReport(report);
}

exports.getOutdatedReports = function(reports) {
	var outdatedReports = [];
	todaysDate = utils.formatDate(new Date());
	for (var i = reports.length - 1; i >= 0; i--) {
		if(formatDate(new Date(reports[i].date)) != todaysDate){
			outdatedReports.push(reports[i]._id);
		}
	}
	return outdatedReports;
}

//Filters out unwanted attributes so no garbage data reaches database
filterReport = function(report) {
	var filteredReport = new Object();

	filteredReport.pokestopId = report.pokestopId;
	filteredReport.taskId = report.taskId;
	filteredReport.reporter = report.reporter;
	filteredReport.date = utils.formatDate(new Date());

	return filteredReport;
}