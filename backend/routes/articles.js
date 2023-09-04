const mongoose = require('mongoose');
const {
    fetchArticles,
    transformAndSaveArticles,
    fetchSavedAndLikedArticles,
    deleteOldArticles
} = require('../backendhelpers/forAPIcalls');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const fetchDataAndCleanUp = async () => {
    try {
        const fetchedArticles = await fetchArticles();
        await transformAndSaveArticles(fetchedArticles);

        const articlesToPreserve = await fetchSavedAndLikedArticles();
        await deleteOldArticles(articlesToPreserve);

    } catch (errors) {
        console.log(errors);
    }
};

// Run the function immediately upon start
fetchDataAndCleanUp();

// Run the function every 1 hour
setInterval(fetchDataAndCleanUp, 3600000);
