const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const cors = require('cors');

require('dotenv').config();


const authRoute = require("./routes/auth");
const categoriesRoute = require("./routes/categories");
const displayRoute = require("./routes/display");
const userRoute = require("./routes/user");
const likesRoute = require("./routes/likes");

const mongodbConnection = require('./config/mongoDBConnection');
const port = 8000;

app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/display", displayRoute);
app.use("/api/user", userRoute);
app.use("/api/likes", likesRoute);

app.listen(port, () => console.log(`Node JS server running on port ${port}!`));

module.exports = app;