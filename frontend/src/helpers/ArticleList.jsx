import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/Pages.css';
import Article from '../components/Article';
import { Link } from 'react-router-dom';

const ArticleList = ({ route, pageTitle, fetchConfig = {}, userId }) => {

    const [articles, setArticles] = useState([]);


    useEffect(() => {
        const fetchArticles = async () => {
            try {
                if (!userId || userId) {
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
    }, [route, userId]);


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
                {articles.map((article, index) => ( // Note the change here
                    <Article key={index} article={article} />
                ))}
            </div>
        </div >
    );
}

export default ArticleList;