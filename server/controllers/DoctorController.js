const {database} = require('../database');
const Doctor = database.doctors;

//doctor
exports.getAll = async(req, res) => {
    const doctor = await Doctor.findAll({attributes:['doctor_id', 'doctor_firstname', "doctor_lastname"]});
    res.send(doctor);
}