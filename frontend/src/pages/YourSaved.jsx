import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/Pages.css';
import Article from '../components/Article';
import { connect } from 'react-redux';
import toast from "react-hot-toast";


const YourSaved = ({ userId }) => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/saves/saved-articles', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('user')}`
                    }, params: { userId },
                });
                console.log(res.data);
                setArticles(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchArticles();
    }, []);

    return (
        <div className="article-container-pages">
            <div className="bg-image"></div>
            <div className="top-section">
                <div className="back-arrow-pages">Return home</div>
                <h1 className="header-pages">Your saved</h1>
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

const mapStateToProps = state => ({
    userId: state.user.userId,
    savedArticles: state.user.savedArticles
});

export default connect(mapStateToProps)(YourSaved);