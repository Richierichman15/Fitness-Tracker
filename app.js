require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const path = require('path');
console.log("__dirname: ",__dirname);

// Setup your Middleware and API Router here

app.use(morgan('dev'));

app.use(bodyParser.json());

const { router } = require('./api/index.js');

app.use('/api', router)

// app.use('*', (error, res, req, next) => {
//     res.status(404);
//     res.send({ error: 'route not found' })
// });


module.exports = app;
