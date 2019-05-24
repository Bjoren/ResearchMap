'use strict';

module.exports = function(app) {
    var pokestopController = require('../controllers/pokestopController'),
        researchTaskController = require('../controllers/researchTaskController'),
        reportController = require('../controllers/reportController'),
        configController = require('../controllers/configController');

    //app.set("env", "production"); //TODO: This will remove stacktraces from API-response
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(function(err, req, res, next) { //Catch errors to override default error handler which sends HTML instead of JSON
        console.log("Test: " + JSON.stringify(err));
        if(err.type === "entity.parse.failed") {
            res.status(400);
            res.json({"error": (err.message)});
        } else {
            res.status(500);
            res.json({"error": (err.message)}); //TODO: Investigate if it's a bad idea to expose this via API.
        }
    })

    app.route('/pokestops')
        .get(pokestopController.getPokestops)
        .post(pokestopController.postPokestop);

    app.route('/pokestops/:pokestopId')
        .get(pokestopController.getPokestop)
        .delete(pokestopController.deletePokestop);

    app.route('/researchTasks')
        .get(researchTaskController.getResearchTasks)
        .post(researchTaskController.postResearchTask);

    app.route('/researchTasks/:researchTaskId')
        .get(researchTaskController.getResearchTask)
        .delete(researchTaskController.deleteResearchTask);
        
    app.route('/reports')
        .get(reportController.getReports)
        .post(reportController.postReport);

    app.route('/reports/:reportId')
        .get(reportController.getReport)
        .delete(reportController.deleteReport);

    app.route('/config')
        .get(configController.getConfig);
};