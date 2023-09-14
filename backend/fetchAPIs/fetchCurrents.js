const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function fetchCurrents() {
    try {
        const response = await axios.get(`https://api.currentsapi.services/v1/latest-news?apiKey=${process.env.CURRENTS_API_KEY}`);
        console.log("Guardian API Response:", JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Error fetching Guardian articles:", error);
    }
}

fetchCurrents();