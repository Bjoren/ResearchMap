exports.validateReport = function(report) {
	console.log(report);

	if(!report.quest) { return createError("Missing required field 'quest'")};
	if(!report.reward) { return createError("Missing required field 'reward'")};
	if(!report.x) { return createError("Missing x coordinate")};
	if(!report.y) { return createError("Missing y coordinate")};
	
	return true;
}

createError = function(errorMessage) {
	console.log("Empty quest");
	return {"Error" : "Validation error: " + errorMessage};
}