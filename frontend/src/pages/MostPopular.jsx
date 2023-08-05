import React, { useState, useEffect } from 'react';
import altImage from '../altimage/Alt-image.jpeg';
import axios from 'axios';

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
        <div className="article-list">
            {articles.map((article, index) => (
                <div key={index} className="article">
                    <img src={article.image}
                        alt={article.title}
                        onError={(e) => { e.target.onerror = null; e.target.src = altImage }} />
                    <h2>{article.title}</h2>
                </div>
            ))}
        </div>
    )
}

export default MostPopular