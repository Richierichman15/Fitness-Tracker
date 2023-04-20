require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require('morgan');
const apiRouter = require('./api');
const bodyParser = require('body-parser');
//// const cors = require('cors');


//// Setup your Middleware and API Router here

//// const path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());

const client = require('./db/client');

client.connect();

// app.use('/api', apiRouter);


app.get('/api/gamer', (req, res) => {
    res.json({username: 'ted', gamerid: 1 });
  });

//// app.use('/', (req, res));


module.exports = app;