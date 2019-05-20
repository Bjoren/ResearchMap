'use strict';

var CONFIG = require('../../../config.json');

exports.getConfig = function(request, response) {
	response.json(CONFIG.map);
};