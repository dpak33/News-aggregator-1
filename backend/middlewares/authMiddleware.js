const jwt = require('jsonwebtoken');
require('dotenv').config();

//What request, what response and what function to execute if req=valid. 1st word will be bearer, 2nd token hence split index
module.exports = (req, res, next) => {
    //console.log(req.headers);

    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'No token provided!' });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: 'Malformed authorization header!' });
    }

    try {
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(500).send({ message: 'Invalid or expired token!' });
    }
};