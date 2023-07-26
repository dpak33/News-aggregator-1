const axios = require('axios');
const Article = require('../schemas/ArticleSchema');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

axios.get('https://api.currentsapi.services/v1/latest-news?apiKey=e7iyp7IB4DSu8-dI7GRpc2JeNz6SDjllgaNHu9bOzJrjobgO')
    .then((response) => {
        console.log(response.data.news.length);
        let articlesData = response.data.news;
        //console.log(articlesData);

        // Sort articles by date in descending order
        articlesData.sort((a, b) => {
            let dateA = new Date(a.published);
            let dateB = new Date(b.published);
            return dateB - dateA; // for descending order
        });

        // Limit to the first 100 articles
        articlesData = articlesData.slice(0, 100);

        // Loop through each article data from the API
        articlesData.forEach(async (articleData) => {

            // Define the newArticle data
            let newArticle = new Article({
                id: articleData.id,
                title: articleData.title,
                description: articleData.description,
                url: articleData.url,
                author: articleData.author,
                image: articleData.image,
                language: articleData.language,
                category: articleData.category,
                published: new Date(articleData.published)
            });

            console.log(newArticle);
            // Update the document in the database or insert if it does not exist
            try {
                const savedArticle = await newArticle.save();
                console.log('Article saved successfully:', savedArticle);
            } catch (err) {
                console.log('Error saving article:', err);
            }
        });
    })
    .catch((error) => {
        console.log(error);
    });







