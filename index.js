const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
require('dotenv').load();


const port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = app.listen(port);


routes(app);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECT, { useMongoClient: true });



module.exports = app;
