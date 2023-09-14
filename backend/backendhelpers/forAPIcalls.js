const axios = require('axios');
const Article = require('../schemas/ArticleSchema');
const User = require('../schemas/UserSchema');
const transformations = require('./transformations');
const { transformCurrentsArticle, transformNYTimesArticle } = transformations;

const fetchArticles = async () => {
    console.log('Fetching articles from APIs...')

    const [currentsAPI, nyTimesAPI] = await Promise.all([
        axios.get(`https://api.currentsapi.services/v1/latest-news?apiKey=${process.env.CURRENTS_API_KEY}`),
        axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.NYTIMES_API_KEY}`)
    ]);

    console.log('Successfully fetched from APIs.')

    return [
        ...currentsAPI.data.news.slice(0, 100),
        ...nyTimesAPI.data.results.slice(0, 100)
    ];
};

const transformAndSaveArticles = async (articles) => {
    console.log('Transforming saved articles.')

    const transformedCurrents = articles.filter(article => article.source).map(transformCurrentsArticle);
    const transformedNYTimes = articles.filter(article => article.section).map(transformNYTimesArticle);

    const allArticles = [...transformedCurrents, ...transformedNYTimes];

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
    const users = await User.find({}, 'likedArticles savedArticles');  // fetch only the fields you need
    const articlesToPreserve = new Set();  // a Set will automatically remove duplicates

    users.forEach(user => {
        user.likedArticles.forEach(id => articlesToPreserve.add(id));
        user.savedArticles.forEach(id => articlesToPreserve.add(id));
    });

    return Array.from(articlesToPreserve);
};

const deleteOldArticles = async (articlesToPreserve) => {
    const someTimeAgo = new Date(new Date() - 72 * 60 * 60 * 1000);  // 72 hours ago
    await Article.deleteMany({ "createdAt": { "$lt": someTimeAgo }, "id": { "$nin": articlesToPreserve } });
    console.log('Old articles cleaned up');
};

const fetchDataAndCleanUp = async () => {
    try {
        const fetchedArticles = await fetchArticles();
        await transformAndSaveArticles(fetchedArticles);

        const articlesToPreserve = await fetchSavedAndLikedArticles();
        await deleteOldArticles(articlesToPreserve);

    } catch (errors) {
        console.log(errors);
    }
};

module.exports = { fetchArticles, transformAndSaveArticles, fetchSavedAndLikedArticles, deleteOldArticles };