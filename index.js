const express = require("express");
const cors = require('cors');
const app = express();
const port = 8080;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
// const yamljs = require("yamljs");
// const swaggerDocument = yamljs.load("./docs/swagger.yaml");

app.use(cors());
app.use(express.json());

const doctors = [
    {id: 1,name: "Nikita Kondakov", price: 20},
    {id: 2,name: "Mirje Kruusimägi", price: 23},
    {id: 3,name: "Andrea Hoole", price: 24},
    {id: 4,name: "Markus Henrik Repkoson", price: 15},
    {id: 5,name: "Ilja Vaitenko", price: 20},
    {id: 6,name: "Ulje Maljarichenko", price: 30},
    {id: 7,name: "Gregor Posonov", price: 26},
    {id: 8,name: "Vankja Pipiskin", price: 87}
];


//require("./routes/app_routes")(app);

// app.get('/doctors', (req, res) => {
//     res.send(doctors);
// });

// app.get("/doctors/:id", (req, res) => {
//     if(typeof doctors[req.params.id - 1] === "undefinde") {
//         return res.status(404).send({error: "Doctor not found"});
//     }
//     res.send(doctors[req.params.id - 1]);
// });

app.post("/doctors", (req, res) => {
    if(!req.body.name || !req.body.price) {
        return res.status(400).send({error:"one or all params are missing"});
    }
    let doctor = {
        id: doctors.length + 1,
        price: req.body.price,
        name: req.body.name
    }

    doctors.push(doctor);

    res.status(201).location(`${getBaseUrl(req)}/doctors/${doctors.length}`)
        .send(doctor);
});

app.delete("/doctors/:id", (req, res) => {
    if(typeof doctors[req.params.id - 1] === "undefined"){
        return res.status(404).send({error:"doctor not found"});
    }

    doctors.splice(req.params.id - 1, 1);

    res.status(204).send({error:"No content"});
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
});

function getBaseUrl(req){
    return req.connection && req.connection.encrypted ? "https" : "http" + `://${req.headers.host}`;
}