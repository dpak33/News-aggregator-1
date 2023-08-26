import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/Pages.css';
import Article from '../components/Article';


const ArticleList = ({ route, pageTitle }) => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get(route);
                console.log(res.data);
                setArticles(res.data);
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchArticles();
    }, [route]);

    return (
        <div className="article-container-pages">
            <div className="bg-image"></div>
            <div className="top-section">
                <div className="back-arrow-pages">Return home</div>
                <h1 className="header-pages">{pageTitle}</h1>
                <span className="production-icon">Pakenham Productions</span>
                <div></div>
            </div>
            <div className="article-list">
                {articles.map((article, index) => (
                    <Article key={index} article={article} />
                ))}
            </div>
        </div >
    )
}

export default ArticleList;