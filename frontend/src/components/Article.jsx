import React from 'react';
import altImage from '../altimage/Alt-image.jpeg';
import '../styling/Article.css';

const Article = ({ article }) => {
    return (
        <div className="article">
            <img className="article-image-popular" src={article.image}
                alt={article.title}
                onError={(e) => { e.target.onerror = null; e.target.src = altImage }} />
            <div className="article-text">
                <h2 className="article-title-popular">{article.title}</h2>
                <h3 className="article-description-capped">{article.description}</h3>
                <a href={article.url} target="_blank" className="a" rel="noopener noreferrer">Read more</a>
            </div>
        </div>
    );
}

export default Article;







