'use strict';

module.exports = function(app) {
  var reportController = require('../controllers/reportController');

  app.route('/reports')
    .get(reportController.getReports)
    .post(reportController.postReport);


  app.route('/reports/:reportId')
    .get(reportController.getReport)
    .delete(reportController.deleteReport);
};