import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/Pages.css';
import Article from '../components/Article';
import { Link } from 'react-router-dom';

const ArticleList = ({ route, pageTitle, fetchConfig = {} }) => {
    const [articles, setArticles] = useState([]);

    const { params } = fetchConfig; // Destructure params from fetchConfig
    const userId = params && params.userId;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                if (userId == null || (userId && userId.length > 0)) {
                    const res = await axios.get(route, fetchConfig);
                    console.log(res.data);
                    setArticles(res.data);
                }
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchArticles();
    }, [route, userId, params]); // Use params as a dependency instead of fetchConfig
    //here
    return (
        <div className="article-container-pages">
            <div className="bg-image"></div>
            <div className="top-section">
                <div className="back-arrow-pages">
                    <Link to="/">Return home</Link>
                </div>
                <h1 className="header-pages">{pageTitle}</h1>
                <span className="production-icon">Pakenham Productions</span>
                <div></div>
            </div>
            <div className="article-list">
                {articles.map((article, index) => (
                    <Article key={index} article={article} />
                ))}
            </div>
        </div>
    );
}

export default ArticleList;