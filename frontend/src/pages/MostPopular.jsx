import React, { useState, useEffect } from 'react';
import altImage from '../altimage/Alt-image.jpeg';
import axios from 'axios';
import '../styling/MostPopular.css';
import { truncateText, getFirstXWords } from '../helpers/stringhelpers';

const MostPopular = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/display/allArticles');
                setArticles(res.data);
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchArticles();
    }, []);

    return (
        <div className="article-container-popular">
            <div className="top-section">
                <div className="back-arrow-popular">Return home</div>
                <h1 className="header-popular">Most Popular</h1>
                <div></div>
            </div>
            <div className="article-list">
                {articles.map((article, index) => (
                    <div key={index} className="article">
                        <img className="article-image-popular" src={article.image}
                            alt={article.title}
                            onError={(e) => { e.target.onerror = null; e.target.src = altImage }} />
                        <div className="article-text">
                            <h2 className="article-title-popular">{article.title}</h2>
                            <h3 className="article-description-capped">{(article.description)}</h3>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MostPopular