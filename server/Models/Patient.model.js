module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define("patients", {
        patient_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        patient_firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },

        patient_lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },

        patient_email: {
            type: Sequelize.STRING,
            allowNull: false
        },
    
        patient_pass: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Patient;
}