import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/Pages.css';
import Article from '../components/Article';
import { truncateText } from '../helpers/stringhelpers';


const MostRecent = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/display/latestArticles');
                console.log(res.data);
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
            <div className="bg-image"></div>
            <div className="top-section">
                <div className="back-arrow-popular">Return home</div>
                <h1 className="header-popular">Most Recent</h1>
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

export default MostRecent