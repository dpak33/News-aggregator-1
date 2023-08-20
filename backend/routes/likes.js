const express = require('express');
const router = express.Router();
const Article = require('../schemas/ArticleSchema');
const jwtMiddleWare = require('../middlewares/authMiddleware');


router.post('/like/:articleId', jwtMiddleWare, async (req, res) => {
    const userId = req.user._id;  // Assuming you send the userId in the request body
    try {
        const article = await Article.findOne({ id: req.params.articleId });

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }


        if (article.likes.includes(userId)) {
            return res.status(400).json({ message: 'User already liked this article' });
        }


        article.likes.push(userId);


        await article.save();

        res.json({ message: 'Article liked successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/unlike/:articleId', jwtMiddleWare, async (req, res) => {
    const userId = req.user._id;  // Assuming you send the userId in the request body

    try {
        const article = await Article.findOne({ id: req.params.articleId });

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }


        if (!article.likes.includes(userId)) {
            return res.status(400).json({ message: 'User did not like this' });
        }


        article.likes.pull(userId);


        await article.save();

        res.json({ message: 'Article unliked successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;