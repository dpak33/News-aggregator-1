import ArticleList from '../helpers/ArticleList';


const MostRecent = () => {

    const route = "http://localhost:8000/api/display/latestArticlespage";
    return <ArticleList route={route} pageTitle="Most Recent" />;
}

export default MostRecent;