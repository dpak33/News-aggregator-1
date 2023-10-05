const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function fetchCurrents() {
    try {
        const response = await axios.get(`https://api.currentsapi.services/v1/latest-news?apiKey=${process.env.CURRENTS_API_KEY}`);
        const articles = response.data.news.filter(article => !article.image.startsWith('https://kubrick.htvapp'));
        console.log("Filtered Currents API response:", JSON.stringify(articles, null, 2));
    } catch (error) {
        console.error("Error fetching Currents articles:", error);
    }
}

fetchCurrents();