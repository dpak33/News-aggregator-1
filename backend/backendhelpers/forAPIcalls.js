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
    //console.log('currentsAPI Response:', JSON.stringify(currentsAPI.data, null, 2));
    return {
        currentsAPI: currentsAPI.data.news.slice(0, 20),
        nyTimesAPI: nyTimesAPI.data.results.slice(0, 20),
        guardianAPI: guardianAPI.data.response.results.slice(0, 20)
    };
};


const transformAndSaveArticles = async (articles) => {
    console.log('Transforming saved articles.')
    //console.log('articles currentsAPI' + JSON.stringify(articles.currentsAPI, null, 2));
    // Split the articles object into separate arrays

    //AT THIS POINT STILL CORRECT BEFORE HERE
    const currentsArticles = articles.currentsAPI || [];
    const nyTimesArticles = articles.nyTimesAPI || [];
    const guardianArticles = articles.guardianAPI || [];

    //This is where you feed in the currentsArticles to your function
    //console.log(currentsArticles);
    // Transform the articles
    const transformedCurrents = currentsArticles.map(transformCurrentsArticle);
    const transformedNYTimes = nyTimesArticles.map(transformNYTimesArticle);
    const transformedGuardian = guardianArticles.map(transformGuardianArticle);

    //console.log(transformedCurrents);
    // Combine all transformed articles
    const allArticles = [...transformedCurrents, ...transformedNYTimes, ...transformedGuardian];


    console.log('Articles transformed');
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