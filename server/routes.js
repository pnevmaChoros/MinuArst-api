const patientController = require('./controllers/PatientController');

module.exports = (app) => {

    //patient/
    app.route('/patient')
    .get(patientController.getAll);

    //patinet/:id
    app.route('/patient/:id')
    .get(patientController.getById);
}