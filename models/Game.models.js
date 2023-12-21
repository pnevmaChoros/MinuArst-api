module.exports = (sequelize,Sequelize) => {
    const Game = sequelize.define("game", {
        //data strucute from database
        id: {
            type: Sequelize.INTEGER,
            primatyKey: true,
            autoIncreament: true
        },
        name: {
            type: sequelize.STRINGER,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        data: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        isawailable: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
    return Game;
}