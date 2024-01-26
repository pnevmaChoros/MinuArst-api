// Basicaly Main() function in C++ or C-type languages
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.APP_PORT;
const swaggerui = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerdocument = yamljs.load('../doc/swagger.yaml');

app.use(cors());
app.use(express.json());
app.use('/doc', swaggerui.serve, swaggerui.setup(swaggerdocument));

// Imagine it as "Interface Implementation" - Connects All logic/methods
require('./routes/routes')(app);

app.listen(port, async () => {
    //await require('./database').Sync();
    console.log(`API up at: http://localhost:${port}/patient`);
});