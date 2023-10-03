import ArticleList from '../helpers/ArticleList';


const MostPopular = () => {

    const route = `${process.env.REACT_APP_BASE_API_URL}/api/display/mostpopularArticles`;
    return <ArticleList route={route} pageTitle="Most Popular" />;
}

export default MostPopular;