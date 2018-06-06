'use strict';

module.exports = function(app) {
    var reportController = require('../controllers/reportController'),
        configController = require('../controllers/configController')

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.route('/reports')
        .get(reportController.getReports)
        .post(reportController.postReport);

    app.route('/reports/:reportId')
        .get(reportController.getReport)
        .delete(reportController.deleteReport);

    app.route('/config')
        .get(configController.getConfig);
};