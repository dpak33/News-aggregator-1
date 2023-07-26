import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainBar = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/display/latestArticles'); // adjust the URL based on your backend setup
                setArticles(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchArticles();
    }, []); // Empty array as second argument to run this effect once on component mount

    return (
        <div>
            {articles.map((article, index) => (
                <div key={index}>
                    <h2>{article.title}</h2>
                    <img src={article.image} alt={article.title} />
                </div>
            ))}
        </div>
    );
};

export default MainBar;