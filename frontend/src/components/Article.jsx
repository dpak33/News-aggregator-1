import React, { useState } from 'react'; // Import useState for local component state management
import altImage from '../altimage/Alt-image.jpeg';
import '../styling/Article.css';
import { connect } from 'react-redux';
import { likeArticle } from '../store/actions/userActions';
import axios from 'axios'; // Assuming you have axios for HTTP requests

const Article = ({ article, userId, likeArticle }) => {

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
                // You might need another Redux action to "unlike" the article in the store
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
        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.user.userId
});

const mapDispatchToProps = {
    likeArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);







