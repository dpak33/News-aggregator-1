const axios = require('axios');
const Article = require('../schemas/ArticleSchema');
const mongoose = require('mongoose');
const transformations = require('../backendhelpers/transformations');
const { transformCurrentsArticle, transformGuardianArticle, transformNYTimesArticle } = transformations;
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const currentsAPI = axios.get(`https://api.currentsapi.services/v1/latest-news?apiKey=${process.env.CURRENTS_API_KEY}`);
const guardianAPI = axios.get(`https://content.guardianapis.com/search?order-by=newest&show-fields=byline%2Cthumbnail%2Cheadline%2CbodyText&api-key=${process.env.GUARDIAN_API_KEY}`);
const nyTimesAPI = axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.NYTIMES_API_KEY}`);

Promise.all([currentsAPI, guardianAPI, nyTimesAPI])
    .then((responses) => {
        const currentsArticles = responses[0].data.news.slice(0, 100);
        const guardianArticles = responses[1].data.response.results.slice(0, 100);
        const nyTimesArticles = responses[2].data.results.slice(0, 100);

        const transformedCurrents = currentsArticles.map(article => {
            // Assuming you have a transformCurrentsArticle function
            return transformCurrentsArticle(article);
        });

        const transformedGuardian = guardianArticles.map(article => {
            return transformGuardianArticle(article);
        });

        const transformedNYTimes = nyTimesArticles.map(article => {
            return transformNYTimesArticle(article);
        });

        const allArticles = [...transformedCurrents, ...transformedGuardian, ...transformedNYTimes];

        allArticles.forEach(async (article) => {
            try {
                let updated = await Article.updateOne({ id: article.id }, article, { upsert: true }).exec();
                console.log('Article updated successfully!');
            } catch (err) {
                console.log('Error updating article:', err);
            }
        });
    })
    .catch((errors) => {
        console.log(errors);
    });
