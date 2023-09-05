import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/Pages.css';
import Article from '../components/Article';
import { Link } from 'react-router-dom';
import { paginate } from './paginate'; // Make sure this import is correct

const ArticleList = ({ route, pageTitle, fetchConfig = {} }) => {

    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get(route, fetchConfig);
                console.log(res.data);
                setArticles(res.data);
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchArticles();
    }, [route]);

    const { totalPages, pageItems } = paginate(articles, pageSize, currentPage);

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
                {pageItems.map((article, index) => ( // Note the change here
                    <Article key={index} article={article} />
                ))}
                <div>
                    {currentPage > 1 && <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>}
                    {currentPage < totalPages && <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>}
                </div>
            </div>
        </div >
    );
}

export default ArticleList;