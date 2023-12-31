const transformDate = require('./transformDate');
const { reformatDate } = transformDate;

const transformGuardianArticle = (guardianArticle) => {
    if (!guardianArticle || !guardianArticle.fields) {
        console.error("Invalid article data:", guardianArticle);
        return null;
    }
    //console.log("published guardian date: " + guardianArticle.webPublicationDate);
    return {
        id: guardianArticle.id || "",
        title: guardianArticle.fields.headline || "",
        description: guardianArticle.fields.byline || "",
        url: guardianArticle.webUrl || "",
        author: guardianArticle.fields.byline || "",
        image: guardianArticle.fields.thumbnail || "",
        language: 'en',
        category: guardianArticle.sectionName || "",
        published: new Date(guardianArticle.webPublicationDate)
    };
};

const transformNYTimesArticle = (nyArticle) => {

    if (!nyArticle) {
        console.error("Invalid article data:", nyArticle);
        return null;
    }

    //console.log(JSON.stringify(nyArticle, null, 2));
    //console.log("published NY date: " + nyArticle.published_date);
    return {
        id: nyArticle.uri || "",
        title: nyArticle.title || "",
        description: nyArticle.abstract || "",
        url: nyArticle.url || "",
        author: nyArticle.byline || "",
        image: nyArticle.multimedia && nyArticle.multimedia.length > 0 ? nyArticle.multimedia[1].url : "",
        language: 'en',
        category: nyArticle.section || "",
        published: new Date(nyArticle.published_date)
    };
}

const transformCurrentsArticle = (currentsArticle) => {
    if (!currentsArticle) {
        console.error("Invalid article data:", currentsArticle);
        return null;
    }
    //console.log(JSON.stringify(currentsArticle, null, 2));
    //RIGHT HERE NOW: console.log("published currentsAPI date: " + currentsArticle.published);
    //console.log("published currentsAPI url: " + currentsArticle.url);
    return {
        id: currentsArticle.id || "",
        title: currentsArticle.title || "",
        description: currentsArticle.description || "",
        url: currentsArticle.url || "",
        author: currentsArticle.author || "",
        image: currentsArticle.image || "",
        language: currentsArticle.language || "",
        category: currentsArticle.category || "",
        published: new Date(reformatDate(currentsArticle.published))
    };
};

module.exports = {
    transformNYTimesArticle,
    transformGuardianArticle,
    transformCurrentsArticle
}