import { connect } from 'react-redux';
import ArticleList from '../helpers/ArticleList';
import React from 'react';

const YourSaved = ({ userId }) => {
    const fetchConfig = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('user')}`
        },
        params: { userId }
    };

    if (!userId) {
        return <h1 style={{
            fontSize: '4em',
            textAlign: 'center',
            marginTop: '50vh',
            transform: 'translateY(-50%)' // Centers the text vertically
        }}>
            Login to see your saved articles!
        </h1>;
    }

    return <ArticleList
        route={`${process.env.REACT_APP_BASE_API_URL}/api/saves/saved-articles`}
        pageTitle="Your saved"
        fetchConfig={fetchConfig}
    />;
}

const mapStateToProps = state => ({
    userId: state.user.userId,
    savedArticles: state.user.savedArticles
});

export default connect(mapStateToProps)(YourSaved);


