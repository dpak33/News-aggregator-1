const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middlewares/authMiddleware');


router.get('/get-user-info', authMiddleWare, async (req, res) => {

    try {
        res.send({ success: true, data: req.user });
    } catch (error) {
        res.status(400).send(error)
    }

});


module.exports = router;




