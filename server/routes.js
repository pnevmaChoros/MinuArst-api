const patientController = require('./controllers/PatientController');

module.exports = (app) => {

    //patient/
    app.route('/patient')
    .get(patientController.getAll)
}