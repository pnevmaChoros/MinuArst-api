const {db} = require('../db')
const LetsPlays = db.letsPlays
const Game = db.games

exports.getAll = async (req, res) => {
    const letsPlays = await letsPlays.findAll({
        include: {all: true},
        logging: console.log
    })
    console.log(letsPlays);
    let result = []
    result = letsPlays.map((lp) => {
        return {
            "gameName": lp.game.name,
            "influencer": `$(lp.player.name)`
        }
    })
    res.send(result);
}