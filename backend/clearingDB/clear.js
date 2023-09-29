const mongoose = require('mongoose');
const Article = require('../schemas/ArticleSchema');

// Replace this with your MongoDB URI
//const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', async () => {
    console.log('Connected to database.');

    try {
        await Article.deleteMany({});
        console.log('Cleared the Article collection.');
    } catch (error) {
        console.error('Error clearing the Article collection:', error);
    } finally {
        mongoose.connection.close();
    }
});