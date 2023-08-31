const transformGuardianArticle = (guardianArticle) => {
    return {
        id: guardianArticle.id,
        title: guardianArticle.fields.headline,
        description: guardianArticle.fields.byline,
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
        image: nyArticle.multimedia && nyArticle.multimedia.length > 0 ? nyArticle.multimedia[1].url : null,
        language: 'en',  // Since it's the NY Times, it's likely English
        category: nyArticle.section,
        published: new Date(nyArticle.published_date)
    };
}

const transformCurrentsArticle = (currentsArticle) => {
    return {
        id: currentsArticle.id,
        title: currentsArticle.title,
        description: currentsArticle.description,
        url: currentsArticle.url,
        author: currentsArticle.author,
        image: currentsArticle.image,
        language: currentsArticle.language,
        category: currentsArticle.category,
        published: new Date(currentsArticle.published)
    };
};

module.exports = {
    transformNYTimesArticle,
    transformGuardianArticle,
    transformCurrentsArticle
}