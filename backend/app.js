const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

require('dotenv').config();

const displayRoute = require("./routes/display");

const mongodbConnection = require('./config/mongoDBConnection');
const port = 8000;

app.use("/api/display", displayRoute);

app.listen(port, () => console.log(`Node JS server running on port ${port}!`));

module.exports = app;