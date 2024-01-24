const {database} = require('../database');
const Doctor = database.doctors;

//doctor
exports.getAll = async(req, res) => {
    const doctor = await Doctor.findAll({attributes:['doctor_id', 'doctor_firstname', "doctor_lastname"]});
    res.send(doctor);
}

//  doctor/:id
exports.getById = async (req, res) => {
    const doctor = await Doctor.findByPk(req.params.id);

    if(doctor === null){
        res.status(404)
        .send({error: "User not found"});
        return;
    }
    res.send(doctor);
}