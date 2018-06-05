exports.validateReport = function(report) {
	console.log(report);

	if(!report.quest) { return createError("Missing required field 'quest'")}; //TODO: Max length? Compare to list of known quests?
	if(!report.reward) { return createError("Missing required field 'reward'")};
	if(!report.x) { return createError("Missing x coordinate")}; //TODO: Define max ranges in configuration file somewhere
	if(!report.y) { return createError("Missing y coordinate")};

	return new FilteredReport(report);
}

createError = function(errorMessage) {
	console.log("Empty quest");
	return {"error" : "Validation error: " + errorMessage};
}

//Filters out unwanted attributes so no garbage data reaches database
class FilteredReport {
	constructor(report) {
    this.quest = report.quest;
    this.reward = report.reward;
    this.x = report.x;
    this.y = report.y;
  }
}