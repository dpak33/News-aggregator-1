const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const jwtMiddleWare = require('./middlewares/authMiddleware');

require('dotenv').config();
const mongodbConnection = require('./config/mongoDBConnection');

mongodbConnection();

const authRoute = require("./routes/auth");
const categoriesRoute = require("./routes/categories");
const displayRoute = require("./routes/display");
const userRoute = require("./routes/user");
const likesRoute = require("./routes/likes");
const savesRoute = require("./routes/saves");
const { router: articleRoute, fetchDataAndCleanUp } = require("./routes/articles");



const port = 8000;


// Run your cleanup function
fetchDataAndCleanUp();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/display", displayRoute);
app.use("/api/user", userRoute);
app.use("/api/likes", jwtMiddleWare, likesRoute);
app.use("/api/saves", jwtMiddleWare, savesRoute);
app.use("/api/articles", articleRoute);

app.listen(port, () => console.log(`Node JS server running on port ${port}!`));

module.exports = app;
