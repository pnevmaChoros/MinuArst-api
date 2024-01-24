const {database} = require('../database');
const {getBaseUrl} = require('./commonFunction');
const Patient = database.patients;

//patient/
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

// patient/
exports.createNew = async (req, res) => {
    let patient;

    try {
        patient = await Patient.create(req.body);
    } 
    catch (error) {
        if (error instanceof database.Sequelize.ValidationError) {
            res.status(400)
            .send({error: error.errors.map( (item) => item.message )});
        }
        else {
            console.log("patient/ - createNew: ", error);
            res.status(500)
            .send({error: 'Something went wrong on our side. Sorry sos'});
        }
        return;
    }

    res.status(201)
    .location(`${getBaseUrl(req)}/patient`)
    .json(patient);
}

// patient/:id
exports.deleteById = async (req, res) => {
    let result;
    console.log(req.params.id);
    try{
        result = await Patient.destroy({ where: { patient_id: req.params.id } });
    } 
    catch (error) {
        console.log('patient/:id - deleteById: ', error);
        res.status(500)
        .send({error: 'something went wrong on our side. Sorry xP'});
        return;
    }
    res.status(204).send();
}