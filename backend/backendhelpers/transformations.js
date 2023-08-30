const transformGuardianArticle = (guardianArticle) => {
    return {
        id: guardianArticle.id,
        title: guardianArticle.fields.headline,
        description: guardianArticle.fields.byline, // or whatever part of the bodyText you want
        url: guardianArticle.webUrl,
        author: guardianArticle.fields.byline,
        image: guardianArticle.fields.thumbnail,
        language: 'en',
        category: guardianArticle.sectionName,
        published: new Date(guardianArticle.webPublicationDate)
    };
};

const transformNYTimesArticle = (nyArticle) => {
    return {
        id: nyArticle.uri,
        title: nyArticle.title,
        description: nyArticle.abstract,
        url: nyArticle.url,
        author: nyArticle.byline,
        image: nyArticle.multimedia && nyArticle.multimedia.length > 0 ? nyArticle.multimedia[0].url : null,
        language: 'en',  // Since it's the NY Times, it's likely English
        category: nyArticle.section,
        published: new Date(nyArticle.published_date)
    };
}

module.exports = {
    transformNYTimesArticle,
    transformGuardianArticle
}