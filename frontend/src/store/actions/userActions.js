export const setUser = (userId) => ({
    type: 'SET_USER',
    payload: userId
});

export const likeArticle = (articleId) => ({
    type: 'LIKE_ARTICLE',
    payload: articleId
});

export const unlikeArticle = (articleId) => ({
    type: 'UNLIKE_ARTICLE',
    payload: articleId
});