exports.validateReport = function(report) {

	if(!report.quest) { return createError("Missing required field 'quest'")}; //TODO: Max length? Compare to list of known quests?
	if(!report.reward) { return createError("Missing required field 'reward'")};
	if(!report.reporter) { return createError("Missing required field 'reporter'")}; //TODO: This should recieve a token or something and validate towards Discord's OAuth
	if(!report.x) { return createError("Missing x coordinate")}; //TODO: Define max ranges in configuration file somewhere
	if(!report.y) { return createError("Missing y coordinate")};

	return filterReport(report);
}

exports.getOutdatedReports = function(reports) {
	var outdatedReports = [];
	for (var i = reports.length - 1; i >= 0; i--) {
		if(formatDate(new Date(reports[i].date)) != formatDate(new Date())){
			outdatedReports.push(reports[i]._id);
		}
	}
	return outdatedReports;
}

createError = function(errorMessage) {
	return {"error" : "Validation error: " + errorMessage};
}

//Filters out unwanted attributes so no garbage data reaches database
filterReport = function(report) {
	var filteredReport = new Object();
	var currentDate = new Date();
	var formattedDate = formatDate(currentDate);

	filteredReport.quest = report.quest;
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