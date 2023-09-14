const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function fetchNY() {
    try {
        const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.NYTIMES_API_KEY}`);
        console.log("Guardian API Response:", JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Error fetching Guardian articles:", error);
    }
}

fetchNY();