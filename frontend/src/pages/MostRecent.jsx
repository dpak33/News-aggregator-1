import ArticleList from '../helpers/ArticleList';


const MostRecent = () => {

    const route = `${process.env.REACT_APP_BASE_API_URL}/api/display/latestArticles`;
    return <ArticleList route={route} pageTitle="Most Recent" />;
}

export default MostRecent;