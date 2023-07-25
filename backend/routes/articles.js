const axios = require('axios');

axios.get('https://api.currentsapi.services/v1/latest-news?apiKey=YOUR_API_KEY')
    .then((response) => {
        // handle success
        console.log(response.data.articles[0]);
        // Additional handling here, for example, save the data to your database
        // Database.save(response.data);
    })
    .catch((error) => {
        // handle error
        console.log(error);
        // Additional error handling, for example, log error details
        // ErrorLogger.log(error);
    });