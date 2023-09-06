const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    const connection = mongoose.connection;

    connection.on('error', (error) => {
        console.log(error)
    });

    connection.on('connected', () => {
        console.log('Mongoose connection successful!')
    });
}