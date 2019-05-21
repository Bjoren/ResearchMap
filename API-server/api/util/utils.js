var CONFIG = require('../../../config.json');

exports.getConfig = function() { //Deprecated! Use global CONFIG object instead.
	return CONFIG;
}

exports.createError = function(errorMessage) {
	return {"error" : errorMessage};
}

exports.formatDate = function(date) {
	return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
}