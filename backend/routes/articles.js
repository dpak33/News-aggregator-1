const axios = require('axios');
const Article = require('../schemas/ArticleSchema');

//see chat for further info for modification to save to DB. 

axios.get('https://api.currentsapi.services/v1/latest-news?apiKey=e7iyp7IB4DSu8-dI7GRpc2JeNz6SDjllgaNHu9bOzJrjobgO')
    .then((response) => {
        // handle success
        response.data.news.forEach((article, index) => {
            console.log(`Article ${index + 1}:`, article);
        });
        // Additional handling here, for example, save the data to your database
        // Database.save(response.data);
    })
    .catch((error) => {
        // handle error
        console.log(error);
        // Additional error handling, for example, log error details
        // ErrorLogger.log(error);
    });







