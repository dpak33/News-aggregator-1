const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    language: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    published: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Article', ArticleSchema);