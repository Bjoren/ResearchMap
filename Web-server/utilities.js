'use strict';

var API_PORT = 3000; //TODO: Remove hardcoded port
var API_URL = 'http://' + window.location.hostname + ':' + API_PORT;

this.getIconUrl = function(reward) { //TODO: There's definitely a better way to do this
	switch(reward) {
		case "Aerodactyl":
			return '/icons/Aerodactyl.png';
		case "Rare Candy":
			return '/icons/Rare_Candy.png';
		default:
			return null;
	}
}

//REST methods ----------------------------------------------

this.getConfig = function(successCallback, errorCallback) {
	$.ajax ({
	        url: API_URL + '/config',
	        datatype: "json",
	        success: successCallback,
	        error: errorCallback
	    })
}

this.getPokestops = function(successCallback, errorCallback) {
	$.ajax ({
			url: API_URL + '/pokestops',
			datatype: "json",
			success: successCallback,
			error: errorCallback
		})
}

this.postPokestop = function(report, successCallback, errorCallback) {
	$.ajax ({
	        url: API_URL + '/pokestops',
	        type: "POST",
	        data: report,
	        datatype: "json",
	        success: successCallback,
	        error: errorCallback
	    })
}

this.getReports = function(successCallback, errorCallback) {
	$.ajax ({
	        url: API_URL + '/reports',
	        datatype: "json",
	        success: successCallback,
	        error: errorCallback
	    })	
}		

this.postReport = function(report, successCallback, errorCallback) {
	$.ajax ({
	        url: API_URL + '/reports',
	        type: "POST",
	        data: report,
	        datatype: "json",
	        success: successCallback,
	        error: errorCallback
	    })
}
