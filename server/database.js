const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER,
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: 'mariadb',
        define: {
            timestamps: false,
            underscored: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
            timeout: 20000
         }
    }
);


const database = {};
database.Sequelize = Sequelize;
database.sequelize = sequelize;

//database object entities?
//Actually a "MODEL" an abstraction that represents a table in database TL;DR
database.patients = require('./Models/Patient.model')(sequelize, Sequelize);

// Checks database connection status
sequelize.authenticate().then( () => {
    console.log("connection established");
}).catch(error => {
    console.log("unable to connect: ", error);
})


async function Sync() {
    await sequelize.sync({alter:true});
}

module.exports = {database, Sync};