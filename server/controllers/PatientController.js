const {database} = require('../database');
const Patient = database.patients;

//patient
exports.getAll = async (req, res) => {
    const patient = await Patient.findAll({attributes:['patient_id', 'patient_firstname', "patient_lastname"]});
    res.send(patient);
}

//  patient/:id
exports.getById = async (req, res) => {
    const patient = await Patient.findByPk(req.params.id);

    if(patient === null){
        res.status(404)
        .send({error: "User not found"});
        return;
    }
    res.send(patient);
}