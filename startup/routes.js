const express = require('express');
const cors = require('cors');
const authentication = require('../routes/authentication');
const receipts = require('../routes/receiptsRoutes');
const users = require('../routes/usersRoutes');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.json());
    app.use(cors());
    app.use('/api/v1/users', users);
    app.use('/api/v1/receipts', receipts);
    app.use('/api/v1/authentication', authentication);
    app.use(error);
};