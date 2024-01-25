const {database} = require('../database');
const {getBaseUrl} = require('./commonFunction');
const Calendar = database.calendars;

//calendar/
exports.getAll = async (req, res) => {
    const calendar = await Calendar.findAll({attributes:['calendar_id', 'calendar_comment', "calendar_datetime"]});
    res.send(calendar);
}

//calendar/:id
exports.getById = async (req, res) => {
    const calendar = await Calendar.findByPk(req.params.id);

    if(calendar === null){
        res.status(404)
        .send({error: "User not found"});
        return;
    }
    res.send(calendar);
}

//calendar/
exports.createNew = async (req, res) => {
    let calendar;

    try {
        calendar = await Calendar.create(req.body);
    } 
    catch (error) {
        if (error instanceof database.Sequelize.ValidationError) {
            res.status(400)
            .send({error: error.errors.map( (item) => item.message )});
        }
        else {
            console.log("calendar/ - createNew: ", error);
            res.status(500)
            .send({error: 'Something went wrong on our side. Sorry sos'});
        }
        return;
    }

    res.status(201)
    .location(`${getBaseUrl(req)}/calendar`)
    .json(calendar);
}

//calendar/:id
exports.deleteById = async (req, res) => {
    let result;
    console.log(req.params.id);
    try{
        result = await Calendar.destroy({ where: { calendar_id: req.params.id } });
    } 
    catch (error) {
        console.log('calendar/:id - deleteById: ', error);
        res.status(500)
        .send({error: 'something went wrong on our side. Sorry xP'});
        return;
    }
    res.status(204).send();
}

//calendar/:id/
exports.updateById = async (req, res) => {
    let result;
    delete req.body.id;
    
    try {
        result = await Calendar.update(
            req.body,
            {where: {calendar_id: req.params.id}}
        );
    } 
    catch (error) {
        console.log('calendar/:id - updateById: ', error);
        res.status(500)
        .send({error: 'Something went wrong on our side. Sorry xP'})
        return;
    }

    if (result === 0) {
        res.status(404)
        .send({error: 'User not found'});
        return;
    }

    const calendar = await Calendar.findByPk(req.params.id)
    res.status(200)
    .location(`${getBaseUrl(req)}/calendar/${calendar.id}`)
    .json(calendar);
}