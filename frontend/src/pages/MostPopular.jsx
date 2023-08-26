import ArticleList from '../helpers/ArticleList';


const MostRecent = () => {

    const route = "http://localhost:8000/api/display/mostpopularArticles";
    return <ArticleList route={route} pageTitle="Most Popular" />;
}

export default MostRecent;