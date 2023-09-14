const {
    fetchArticles,
    transformAndSaveArticles,
    fetchSavedAndLikedArticles,
    deleteOldArticles
} = require('../backendhelpers/forAPIcalls');
const express = require('express');
const router = express.Router();

const fetchDataAndCleanUp = async () => {
    try {
        const fetchedArticles = await fetchArticles();
        console.log(fetchedArticles);
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

module.exports = {
    router,
    fetchDataAndCleanUp
};