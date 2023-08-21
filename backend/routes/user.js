const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middlewares/authMiddleware');
const User = require('../schemas/UserSchema');  // Ensure you've imported your User model

router.get('/get-user-info', authMiddleWare, async (req, res) => {
    try {
        // Fetch user data from the database using the user ID from the JWT
        const userData = await User.findById(req.user._id);

        if (!userData) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        res.send({ success: true, data: userData });
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;




