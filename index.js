const express = require('express');
const winston = require('winston');
const app = express();
 
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

//This backend RESTAPI project is for a front-end Angular Receiptbook SPA.



const port = process.env.PORT || 3000;

const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;