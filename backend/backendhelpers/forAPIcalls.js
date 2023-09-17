const axios = require('axios');
const Article = require('../schemas/ArticleSchema');
const User = require('../schemas/UserSchema');
const transformations = require('./transformations');
const { transformCurrentsArticle, transformNYTimesArticle, transformGuardianArticle } = transformations;

const fetchArticles = async () => {
    console.log('Fetching articles from APIs...')
    let currentsAPI, nyTimesAPI, guardianAPI;

    try {
        [currentsAPI, nyTimesAPI, guardianAPI] = await Promise.all([
            axios.get(`https://api.currentsapi.services/v1/latest-news?apiKey=${process.env.CURRENTS_API_KEY}`),
            axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.NYTIMES_API_KEY}`),
            axios.get(`https://content.guardianapis.com/search?order-by=newest&show-fields=byline%2Cthumbnail%2Cheadline%2CbodyText&api-key=${process.env.GUARDIAN_API_KEY}`)
        ]);
    } catch (err) {
        console.log('Error fetching articles:', err);
        throw err; // or return [] if you prefer not to throw an error.
    }

    console.log('Successfully fetched from APIs.')

    return [
        ...currentsAPI.data.news.slice(0, 100),
        ...nyTimesAPI.data.results.slice(0, 100),
        ...guardianAPI.data.response.results.slice(0, 100)
    ];
};


const transformAndSaveArticles = async (articles) => {
    console.log('Transforming saved articles.')

    const transformedCurrents = articles.filter(article => article.source).map(transformCurrentsArticle);
    const transformedNYTimes = articles.filter(article => article.section).map(transformNYTimesArticle);
    const transformedGuardian = articles.filter(article => article.webPublicationDate).map(transformGuardianArticle); // Filtering by a field specific to the Guardian API response

    const allArticles = [...transformedCurrents, ...transformedNYTimes, ...transformedGuardian];

    console.log('Articles transformed')

    for (const article of allArticles) {
        try {
            await Article.updateOne({ id: article.id }, article, { upsert: true });
            console.log('Article updated successfully!');
        } catch (err) {
            console.log('Error updating article:', err);
        }
    }
    console.log('All articles saved')
};

const fetchSavedAndLikedArticles = async () => {
    const users = await User.find({}, 'likedArticles savedArticles');
    const articlesToPreserve = new Set();

    users.forEach(user => {
        user.likedArticles.forEach(id => articlesToPreserve.add(id));
        user.savedArticles.forEach(id => articlesToPreserve.add(id));
    });

    return Array.from(articlesToPreserve);
};

const deleteOldArticles = async (articlesToPreserve) => {
    const someTimeAgo = new Date(new Date() - 72 * 60 * 60 * 1000);
    await Article.deleteMany({ "createdAt": { "$lt": someTimeAgo }, "id": { "$nin": articlesToPreserve } });
    console.log('Old articles cleaned up');
};


module.exports = { fetchArticles, transformAndSaveArticles, fetchSavedAndLikedArticles, deleteOldArticles };