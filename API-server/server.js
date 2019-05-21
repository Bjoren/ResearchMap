var CONFIG = require('../config.json');

var express = require('express'),
	app = express(),
	port = process.env.PORT || CONFIG.databasePort,
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/apiRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('API server listening on: ' + port);