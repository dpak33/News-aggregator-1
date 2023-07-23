const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();


mongoose.connect(
    process.env.MONGODB_URI
).then(() => app.listen(8000)).then(console.log("Connected to database!")
).catch((err) => (console.log(err)));

