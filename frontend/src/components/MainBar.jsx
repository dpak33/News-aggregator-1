import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/MainBar.css';
import altImage from '../altimage/Alt-image.jpeg';

const MainBar = () => {
    const [articles, setArticles] = useState([]);
    const [hoveredTitle, setHoveredTitle] = useState("");

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/categories/mostRecent'); // adjust the URL based on your backend setup
                setArticles(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchArticles();
    }, []); // Empty array as second argument to run this effect once on component mount

    return (
        <div>
            <div className="grid-container">
                {articles.map((article, index) => (
                    <div
                        className="grid-item"
                        key={index}
                        onMouseEnter={() => setHoveredTitle(article.title)}
                        onMouseLeave={() => setHoveredTitle("")}
                    >
                        <img
                            className="article-image"
                            src={article.image}
                            alt={article.title}
                            onError={(e) => { e.target.onerror = null; e.target.src = altImage }}
                        />
                    </div>
                ))}
            </div>
            <h2 className="title-display">{hoveredTitle}</h2>
        </div>
    );
};

export default MainBar;