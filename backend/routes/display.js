// This is assuming you're using Express.js for your backend
const express = require('express');
const router = express.Router();
const Article = require('../schemas/ArticleSchema');

router.get('/latestArticles', async (req, res) => {
    try {
        const articles = await Article.aggregate([
            { $sort: { published: -1 } },
            { $limit: 30 },
            {
                $project: {
                    id: 1,
                    title: 1,
                    description: 1,
                    image: 1,
                    url: 1,
                    author: 1,
                    language: 1,
                    category: 1,
                    published: 1,
                    likesCount: {
                        $cond: [
                            { $isArray: "$likes" },
                            { $size: "$likes" },
                            0
                        ]
                    }, likes: 1,
                }
            },
        ]);

        res.json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    }
});


router.get('/allArticles', async (req, res) => {
    try {
        const articles = await Article.find().sort({ published: -1 }).limit(80);
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/mostPopularArticles', async (req, res) => {
    try {
        const articles = await Article.aggregate([
            { $sort: { likes: -1 } },
            { $limit: 50 },
            {
                $project: {
                    id: 1,
                    title: 1,
                    description: 1,
                    image: 1,
                    url: 1,
                    author: 1,
                    language: 1,
                    category: 1,
                    published: 1,
                    likesCount: {
                        $cond: [
                            { $isArray: "$likes" },
                            { $size: "$likes" },
                            0
                        ]
                    }, likes: 1,
                }
            },
        ]);

        res.json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    }
});

module.exports = router;