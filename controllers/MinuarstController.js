const db = require('../db');
const Game = db.games;

exports.getAll = async (req, res) => {
    const games = await Game.findAll({attributes:["name"]});
    res.send(game);
}


// exports.getAll = async (req, res) => {
//     let connection;
//     try {
//         connection = await pool.getConnection();
//         const rows = await connection.query("SELECT");
//         res.send(rows);
//     } catch {
//         throw error;
//     } finally {
//         if(connection) return connection.end();
//     }
// }