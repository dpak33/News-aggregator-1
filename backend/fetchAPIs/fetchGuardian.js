const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function fetchGuardian() {
    try {
        const response = await axios.get(`https://content.guardianapis.com/search?order-by=newest&show-fields=byline%2Cthumbnail%2Cheadline%2CbodyText&api-key=${process.env.GUARDIAN_API_KEY}`);
        console.log("Guardian API Response:", JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Error fetching Guardian articles:", error);
    }
}

fetchGuardian();