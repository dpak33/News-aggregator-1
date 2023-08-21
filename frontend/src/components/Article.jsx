import React, { useState } from 'react'; // Import useState for local component state management
import altImage from '../altimage/Alt-image.jpeg';
import '../styling/Article.css';
import { connect } from 'react-redux';
import { likeArticle, unlikeArticle } from '../store/actions/userActions';
import axios from 'axios';
import toast from "react-hot-toast";

const Article = ({ article, userId, likeArticle, unlikeArticle }) => {

    const [isLiked, setIsLiked] = useState(article && article.likes ? article.likes.includes(userId) : false); // Local state to track if an article is liked

    const handleLikeToggle = async () => {
        if (!isLiked) {
            try {
                console.log("User ID being sent:", userId);
                await axios.post(`http://localhost:8000/api/likes/like/${article.id}`, { userId },
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

                toast.error(errorMessage);
            }
        }
        else {
            try {
                await axios.post(`http://localhost:8000/api/likes/unlike/${article.id}`, { userId },
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

    return (
        <div className="article">
            <img className="article-image-popular" src={article.image}
                alt={article.title}
                onError={(e) => { e.target.onerror = null; e.target.src = altImage }} />
            <div className="article-text">
                <h2 className="article-title-popular">{article.title}</h2>
                <h3 className="article-description-capped">{article.description}</h3>
                <a href={article.url} target="_blank" className="a" rel="noopener noreferrer">Read more</a>
                <button onClick={handleLikeToggle}>{isLiked ? "Unlike" : "Like"}</button>
            </div>
            <div>
                <h4 className="article-likes"> {article.likes.length} likes </h4>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.user.userId
});

const mapDispatchToProps = {
    likeArticle,
    unlikeArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);

