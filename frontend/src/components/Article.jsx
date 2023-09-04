import React, { useState } from 'react'; // Import useState for local component state management
import altImage from '../altimage/Alt-image.jpeg';
import '../styling/Article.css';
import { connect } from 'react-redux';
import { likeArticle, unlikeArticle, saveArticle, unsaveArticle } from '../store/actions/userActions';
import axios from 'axios';
import toast from "react-hot-toast";

const Article = ({ article, userId, likeArticle, unlikeArticle, saveArticle, unsaveArticle, savedArticles }) => {

    //console.log(article.id);

    const [isLiked, setIsLiked] = useState(article && article.likes ? article.likes.includes(userId) : false); // Local state to track if an article is liked
    const [isSaved, setIsSaved] = useState(savedArticles ? savedArticles.includes(article.id) : false);
    const likesCount = article.likesCount !== undefined ? article.likesCount : article.likes.length;

    const encodedId = encodeURIComponent(article.id);

    const handleLikeToggle = async () => {
        if (!isLiked) {
            try {
                console.log("User ID being sent:", userId);
                await axios.post(`http://localhost:8000/api/likes/like/${encodedId}`, { userId },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('user')}`
                        }
                    });
                setIsLiked(true);
                likeArticle(article.id);  // Update the Redux store
            } catch (error) {
                console.error("Error liking the article:", error);
                let errorMessage = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "An unexpected error occurred.";

                toast.error(`${errorMessage} Login to like!`);
            }
        }
        else {
            try {
                await axios.post(`http://localhost:8000/api/likes/unlike/${encodedId}`, { userId },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('user')}`
                        }
                    }
                );
                setIsLiked(false);
                unlikeArticle(article.id);
            } catch (error) {
                console.error("Error unliking the article:", error);
            }
        }
    }

    const handleSaveToggle = async () => {
        if (!isSaved) {
            try {
                await axios.post(`http://localhost:8000/api/saves/save/${encodedId}`, { userId },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('user')}`
                        }
                    });
                setIsSaved(true);
                saveArticle(article.id);  // Update the Redux store
            } catch (error) {
                console.error("Error saving the article:", error);
                let errorMessage = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "An unexpected error occurred.";

                toast.error(`${errorMessage} Login to save!`);
            }
        }
        else {
            try {
                await axios.post(`http://localhost:8000/api/saves/unsave/${encodedId}`, { userId },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('user')}`
                        }
                    }
                );
                setIsSaved(false);
                unsaveArticle(article.id);
            } catch (error) {
                console.error("Error unsaving the article:", error);
                let errorMessage = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "An unexpected error occurred.";

                toast.error(errorMessage);
            }
        }
    }

    return (
        <div className="article">
            <img className="article-image-popular" src={article.image}
                alt={article.title}
                onError={(e) => { e.target.onerror = null; e.target.src = altImage }} />
            <div className="article-text">
                <h2 className="article-title-popular">{article.title}</h2>
                <h3 className="article-description-capped">{article.description}</h3>
                <div className="article-actions">
                    <a href={article.url} target="_blank" className="a" rel="noopener noreferrer">Read more</a>
                    <button onClick={handleLikeToggle}>{isLiked ? "Unlike" : "Like"}</button>
                    <div className="article-likes-container">
                        <span className="article-likes">{likesCount}</span>
                        <span> likes</span>
                    </div>
                    <button onClick={handleSaveToggle}>{isSaved ? "Unsave" : "Save"}</button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.user.userId,
    savedArticles: state.user.savedArticles
});

const mapDispatchToProps = {
    likeArticle,
    unlikeArticle,
    saveArticle,
    unsaveArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);