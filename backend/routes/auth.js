const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
        //checking for existing user below. If found, return error message. 
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).send({ success: false, message: 'User email already registered!' })
        }

        const existingUserName = await User.findOne({ username: req.body.username });
        if (existingUserName) {
            return res.status(400).send({ success: false, message: 'Username already in use!' })
        }

        const password = req.body.password;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save()
        res
            .status(200)
            .send({ success: true, message: 'User registered successfully!' })

    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })
        //below we check that the hashed password matches with the unhashed password just entered. 
        if (user) {
            const passwordsMatched = await bcrypt.compare(req.body.password, user.password);

            if (passwordsMatched) {
                const dataToBeSentToFrontend = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                }
                //below we define our secret key and the expiration time for our token. 
                const token = jwt.sign(dataToBeSentToFrontend, process.env.SECRET, {
                    expiresIn: 60 * 60,
                })

                res.status(200).send({ success: true, message: "Successful user log in!", data: token, })
            }
            else {
                res.status(400).send({ success: false, message: "Incorrect password!" })
            }
        } else {
            res.status(400).send({ success: false, message: "User does not exist!", data: null })
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
});

module.exports = router;