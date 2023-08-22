const express = require('express');
const router = express.Router();
const Article = require('../schemas/ArticleSchema');
const User = require('../schemas/UserSchema');
const jwtMiddleWare = require('../middlewares/authMiddleware');


router.post('/save/:articleId', jwtMiddleWare, async (req, res) => {
    const userId = req.user._id;  // Assuming you send the userId in the request body
    try {
        const article = await Article.findOne({ id: req.params.articleId });

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }


        const user = await User.findById(userId);
        user.savedArticles.push(req.params.articleId);
        await user.save();

        res.json({ message: 'Article liked successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;