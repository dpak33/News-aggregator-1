const transformGuardianArticle = (guardianArticle) => {
    return {
        id: guardianArticle.id,
        title: guardianArticle.fields.headline,
        description: guardianArticle.fields.byline, // or whatever part of the bodyText you want
        url: guardianArticle.webUrl,
        author: guardianArticle.fields.byline,
        image: guardianArticle.fields.thumbnail,
        language: 'en',  // The Guardian is in English, you could map this dynamically if you want
        category: guardianArticle.sectionName,
        published: new Date(guardianArticle.webPublicationDate)
    };
};

const transformNYTimesArticle = (NYTimesArticle) => {
    return {

    };
}

module.exports = {
    transformNYTimesArticle,
    transformGuardianArticle
}