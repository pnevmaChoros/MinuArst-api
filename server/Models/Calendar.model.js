module.exports = (sequelize, Sequelize) => {
    const Calendar = sequelize.define("calendars", {
        calendar_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        doctor_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        patient_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        calendar_comment: {
            type: Sequelize.STRING,
            allowNull: true
        },

        calendar_datetime: {
            type: Sequelize.DATE,
            allowNull: true
        },
    });

    return Calendar;
}