// This is assuming you're using Express.js for your backend
const express = require('express');
const router = express.Router();
const Article = require('../schemas/ArticleSchema');

router.get('/latestArticles', async (req, res) => {
    try {
        const articles = await Article.find().sort({ published: -1 }).limit(20);
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;