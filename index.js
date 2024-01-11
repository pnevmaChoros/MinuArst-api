const express = require('express')
const app = require('express')()
const port = 8081
const swaggerUi = require("swagger-ui-express")
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

app.use(express.json())

const arstid = [ 
    {id: 1, name: "Tiina Tuvi", amet: "Lastearst"},
    {id: 2, name: "Maria Seevald", amet: "Lastearst"},
    {id: 3, name: "Aavo Holmsen", amet: "Perearst"},
    {id: 4, name: "Asko Krimann", amet: "Perearst"},
    {id: 5, name: "Janek Veedla", amet: "Radioloog"},
    {id: 6, name: "Kristi Kaseoks", amet: "Pulmonoloog"}
]
app.get('/arstid', (req, res) => {
    res.send(arstid)
})

app.get('/arstid/:id', (req, res) => {
    res.send(arstid[req.params.id - 1])
})
//app.use ("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.post('/arstid', (req, res) => {
    if (!req.body.name && !req.body.amet) {
        return res.status(400).send({error:"One or all params are missing" })
    }
    let arstid = {id: arstid.length + 1,
        name: req.body.amet,
        name: req.body.name
    }

    arstid.push(arst)

    res.status(201)
    .location('${getBaseUrl(reg)}/arstid/${arstid.lenght}')
    .send(arstid)
})

//app.use('/arstid', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}/arstid`)
})

function getBaseUrl(reg) {
    return reg.connection && reg.connection.options && reg.connection.encrypted
    ? 'https': 'http' + '://${reg.headers.host}'  
}
