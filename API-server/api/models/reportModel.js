var CONFIG = require('../../../config.json');

exports.validateReport = function(report) {

	if(!isWithinBounds(report.x, report.y)) {return createError("Report is out of bounds")};
	if(!report.task) { return createError("Missing required field 'task'")}; //TODO: Max length? Compare to list of known tasks?
	if(!report.reward) { return createError("Missing required field 'reward'")};
	if(!report.reporter) { return createError("Missing required field 'reporter'")}; //TODO: This should recieve a token or something and validate towards Discord's OAuth
	if(!report.x) { return createError("Missing latitude coordinate")}; //TODO: Restrict to max values defined in config
	if(!report.y) { return createError("Missing longitude coordinate")};

	return filterReport(report);
}

var isWithinBounds = function(x, y) {
	return(x > CONFIG.map.boundaryLatMin && x < CONFIG.map.boundaryLatMax && y > CONFIG.map.boundaryLngMin && y < CONFIG.map.boundaryLngMax);
}

exports.getOutdatedReports = function(reports) {
	var outdatedReports = [];
	todaysDate = formatDate(new Date());
	for (var i = reports.length - 1; i >= 0; i--) {
		if(formatDate(new Date(reports[i].date)) != todaysDate){
			outdatedReports.push(reports[i]._id);
		}
	}
	return outdatedReports;
}

createError = function(errorMessage) {
	return {"error" : errorMessage};
}

//Filters out unwanted attributes so no garbage data reaches database
filterReport = function(report) {
	var filteredReport = new Object();
	var currentDate = new Date();
	var formattedDate = formatDate(currentDate);

	filteredReport.task = report.task;
	filteredReport.reward = report.reward;
	filteredReport.x = report.x;
	filteredReport.y = report.y;
	filteredReport.date = formattedDate;
	filteredReport.reporter = report.reporter;

	return filteredReport;
}

formatDate = function(date) {
	return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
}