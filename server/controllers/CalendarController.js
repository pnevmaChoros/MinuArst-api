const {database} = require('../database');
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