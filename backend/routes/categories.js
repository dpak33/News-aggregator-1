const express = require('express');
const router = express.Router();
const Article = require('../schemas/ArticleSchema');

// Route for 'most recent articles'
router.get('/mostRecent', async (req, res) => {
    try {
        const articles = await Article.find().sort({ published: -1 }).limit(25);
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;



