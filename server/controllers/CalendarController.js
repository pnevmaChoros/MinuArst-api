const {database} = require('../database');
const Calendar = database.calendars;

//calendar/
exports.getAll = async (req, res) => {
    const calendar = await Calendar.findAll({attributes:['calendar_id', 'calendar_comment', "calendar_datetime"]});
    res.send(calendar);
}