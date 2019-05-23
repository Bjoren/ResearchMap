'use strict';

const API_PORT = 3000; //TODO: Remove hardcoded port
const API_URL = 'http://' + window.location.hostname + ':' + API_PORT;

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
