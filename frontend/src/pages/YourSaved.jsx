import { connect } from 'react-redux';
import ArticleList from '../helpers/ArticleList';

const YourSaved = ({ userId }) => {
    const fetchConfig = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('user')}`
        },
        params: { userId }
    };

    return <ArticleList
        route="http://localhost:8000/api/saves/saved-articles"
        pageTitle="Your saved"
        fetchConfig={fetchConfig}
    />;
}

const mapStateToProps = state => ({
    userId: state.user.userId,
    savedArticles: state.user.savedArticles
});

export default connect(mapStateToProps)(YourSaved);


