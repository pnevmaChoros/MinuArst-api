const patientController = require('../controllers/PatientController');
const doctorController = require('../controllers/DoctorController');
const calendarController = require('../controllers/CalendarController');

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

    //doctor
    app.route('/doctor')
    .get(doctorController.getAll)
    .post(doctorController.createNew);
    
    //doctor/:id
    app.route('/doctor/:id')
    .get(doctorController.getById)
    .put(doctorController.updateById)
    .delete(doctorController.deleteById);

    //calendar
    app.route('/calendar')
    .get(calendarController.getAll)
    .post(calendarController.createNew);

    //calendar/:id
    app.route('/calendar/:id')
    .get(calendarController.getById)
    .put(calendarController.updateById)
    .delete(calendarController.deleteById);

    
}