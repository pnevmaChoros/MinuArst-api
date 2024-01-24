module.exports = (sequelize, Sequelize) => {
    const Docotr = sequelize.define("doctors", {
        doctor_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        doctor_firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },

        doctor_lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },

        field_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        patient_email: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Docotr;
}