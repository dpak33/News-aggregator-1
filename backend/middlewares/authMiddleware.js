const jwt = require('jsonwebtoken');
require('dotenv').config();

//What request, what response and what function to execute if req=valid. 1st word will be bearer, 2nd token hence split index
module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET);
    if (user) {
        req.body.user = user;
        next();
    } else {
        res.status(500).send({ message: 'Invalid or expired token!' })
    }
};