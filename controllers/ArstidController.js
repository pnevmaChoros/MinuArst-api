const { Sequelize } = require('sequelize');
const {db} = require("../db");
const { query } = require('express');
const Game = db.games

exports.getAll = async (req,res) => {
    const arstid = await db.sequelize.query('SELECT * FROM arstid', {type:db.sequelize.queryTypes.SELECT})
    res.send(arstid)
}

exports.getById = async (req, res) => {
    const arstid = await Arst.findByPk(req.params.id)
    res.send(arstid)
}

exports.createNew = async (req, res) => {
    let arst
    try {
        game = await Arst.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":error.errors.map((item)=> item.message)})
        } else {
            console.log("ArstidCreate: ", error)
            res.status(500).send({"error":"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        }
        return
    }
    res
    .status(201)
    .location(`${getBaseUrl(req)}/arstid/${arst.id}`)
    .json(game);
    console.log(arst)
}

exports.deleteById = async (req, res) => {
    let result
    try {
        result = await Arst.destroy({where: {id: req.params.id}})
    } catch (error) {
        console.log("GamesDelete: ", error)
        res.status(500).send({error:"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"Game not found"})
        return
    }
    res
    .status(204).send()
}

exports.updateById = async (req, res) => {
    let result
    delete req.body.id
    try {
        result = await Game.update(req.body,{where: {id: req.params.id}})
    } catch (error) {
        console.log("GamesUpdate: ", error)
        res.status(500).send({error:"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"Game not found"})
        return
    }
    const game = await Game.findByPk(req.params.id)
    res.status(200)
    .location(`${getBaseUrl(req)}/games/${game.id}`)
    .json(game)
}

getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encryption ? "https" : "http") +
        `://${request.headers.host}`
    )
}