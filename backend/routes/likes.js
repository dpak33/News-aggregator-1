const express = require('express');
const router = express.Router();
const Article = require('../schemas/ArticleSchema');

router.post('/like/:articleId', async (req, res) => {
    const userId = req.body.userId;  // Assuming you send the userId in the request body

    try {
        // Find the article by its ID
        const article = await Article.findById(req.params.articleId);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Check if user already liked the article
        if (article.likes.includes(userId)) {
            return res.status(400).json({ message: 'User already liked this article' });
        }

        // Push the userId to the likes array
        article.likes.push(userId);

        // Save the updated article
        await article.save();

        res.json({ message: 'Article liked successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;