const patientController = require('./controllers/PatientController');

module.exports = (app) => {

    //patient/
    app.route('/patient')
    .get(patientController.getAll);

    app.route('/patient/:id')
    .get(patientController.getById);
}