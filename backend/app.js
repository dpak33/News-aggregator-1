const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();
const mongodbConnection = require('./config/mongoDBConnection');
const port = 8000;

app.listen(port, () => console.log(`Node JS server running on port ${port}!`));

module.exports = app;