const {database} = require('../database');
const {getBaseUrl} = require('../controllers/commonFunction');
const Doctor = database.doctors;

//doctor
exports.getAll = async(req, res) => {
    const doctor = await Doctor.findAll({attributes:['doctor_id', 'doctor_firstname', "doctor_lastname"]});
    res.send(doctor);
}

//doctor/:id
exports.getById = async (req, res) => {
    const doctor = await Doctor.findByPk(req.params.id);

    if(doctor === null){
        res.status(404)
        .send({error: "User not found"});
        return;
    }
    res.send(doctor);
}

//doctor/
exports.createNew = async (req, res) => {
    let doctor;

    try {
        doctor = await Doctor.create(req.body);
    } 
    catch (error) {
        if (error instanceof database.Sequelize.ValidationError) {
            res.status(400)
            .send({error: error.errors.map( (item) => item.message )});
        }
        else {
            console.log("doctor/ - createNew: ", error);
            res.status(500)
            .send({error: 'Something went wrong on our side. Sorry sos'});
        }
        return;
    }

    res.status(201)
    .location(`${getBaseUrl(req)}/doctor`)
    .json(doctor);
}

// doctor/:id
exports.deleteById = async (req, res) => {
    let result;
    console.log(req.params.id);
    try{
        result = await Doctor.destroy({ where: { doctor_id: req.params.id } });
    } 
    catch (error) {
        console.log('doctor/:id - deleteById: ', error);
        res.status(500)
        .send({error: 'something went wrong on our side. Sorry xP'});
        return;
    }
    res.status(204).send();
}