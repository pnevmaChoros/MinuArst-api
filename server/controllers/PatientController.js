const {database} = require('../database');
const Patient = database.patients;

//patient
exports.getAll = async (req, res) => {
    const patient = await Patient.findAll({attributes:['patient_id', 'patient_firstname', "patient_lastname"]});
    res.send(patient);
}