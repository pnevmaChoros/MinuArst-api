const patientController = require('./controllers/PatientController');

module.exports = (app) => {

    //patient/
    app.route('/patient')
    .get(patientController.getAll)
    .post(patientController.createNew);

    //patinet/:id
    app.route('/patient/:id')
    .get(patientController.getById)
    .put(patientController.updateById)
    .delete(patientController.deleteById);
}