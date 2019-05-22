/*
 * Checks that parent has a field with matching name for each name in requiredFields.
 * Returns null if no fields are missing.
 * Returns a list of all missing fields if one or more are missing.
 */
exports.validateMissingFields = function(parent, requiredFields) {
	var missingFields = [];
	requiredFields.forEach(requiredField => {
		if(!parent[requiredField]) {missingFields.push(requiredField)}
	});

	return missingFields.length == 0 ? null : missingFields;
}

exports.createError = function(errorMessage) {
	return {"error" : errorMessage};
}

exports.formatDate = function(date) {
	return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
}