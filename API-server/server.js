'use strict';

global.CONFIG = require('../config.json');
global.DATABASE = require('diskdb');	//Probably not best practices to use 'global'

DATABASE.connect('./API-server/database', ['pokestops', 'reports', 'researchTasks']);

var express = require('express'),
	app = express(),
	port = process.env.PORT || CONFIG.databasePort,
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/apiRoutes'); //importing route
routes(app);

app.listen(port);

console.log('API server listening on: ' + port);