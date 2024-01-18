const {db} = require("../db")
const Influencer = db.influencers

//gets a list of all the influencers
exports.getAll = async (req,res) => {
    const patiens = await Patiens.findAll({attributes:["onlinename"]})
    res.send(patiens)
}

//get a specific patien by its id
exports.getById = async (req,res) => {
    
    const patient = await Patient.findByPk(req.params.id)
    
    if (patient === 0 || patient === undefined) {
        res.status(404).send({"patient not found"})
        return
    } else {
        res.status(200).send(influencer)
    }      
}

//create a new influencer
exports.createNew = async (req, res) => {
    let influencer
    try {
        influencer = await Patient.create(req.body)
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":error.errors.map((item) => item.message)})
        } else {
            console.log("InfluencersCreate: ", error)
            res.status(500).send({"error":"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/patients/${patients.id}`)
        .json(patient)
        console.log(patient)
}

//delete an existing patient by id
exports.deleteById = async (req, res) => {
    let result
    try {
        result = await Patient.destroy({where: {id: req.params.id}})
    } catch (error) {        
        console.log("PatientsDelete: ", error)
        res.status(500).send({"error":"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        return
    }
    if (result === 0 || result === undefined) {
        res.status(404).send({error:"Patient not found"})}
    res.status(204).send()
}

//
exports.updateById = async (req, res) => {
    let changedinfluencer
    delete req.body.id
    try {
        changedinfluencer = await Influencer.update(req.body,{where: {id: req.params.id}})
    } catch (error) {        
        console.log("InfluencersUpdate: ", error)
        res.status(500).send({"error":"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        return
    }
    if (changedinfluencer === 0 || changedinfluencer === undefined) {
        res.status(404).send({error:"Influencer not found"})
        return
    }
    const influencer = await Influencer.findByPk(req.params.id)
    res.status(200)
    .location(`${getBaseUrl(req)}/INFLUENCERS/${influencer.id}`)
    .json(influencer)
}

getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encryption ? "https" : "http") +
        `://${request.headers.host}`
    )
}