require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require('morgan');
const apiRouter = require('./api');
// const cors = require('cors');


// Setup your Middleware and API Router here

// const path = require('path');

app.use(morgan('dev'));

const client = require('./db/client');

client.connect();

app.use('/api', apiRouter)

// app.use('/', (req, res));

module.exports = app;