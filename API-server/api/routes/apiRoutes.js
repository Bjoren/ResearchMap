'use strict';

module.exports = function(app) {
    var pokestopController = require('../controllers/pokestopController'),
        researchTaskController = require('../controllers/researchTaskController'),
        reportController = require('../controllers/reportController'),
        configController = require('../controllers/configController');

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.route('/pokestops')
        .get(pokestopController.getPokestops)
        .post(pokestopController.postPokestop);

    app.route('/pokestops/:pokestopId')
        .get(pokestopController.getPokestop)
        .delete(pokestopController.deletePokestop);

    app.route('/researchTasks')
        .get(researchTaskController.getTasks)
        .post(researchTaskController.postTask);

    app.route('/researchTasks/:taskId')
        .get(researchTaskController.getTask)
        .delete(researchTaskController.deleteTask);
        
    app.route('/reports')
        .get(reportController.getReports)
        .post(reportController.postReport);

    app.route('/reports/:reportId')
        .get(reportController.getReport)
        .delete(reportController.deleteReport);

    app.route('/config')
        .get(configController.getConfig);
};