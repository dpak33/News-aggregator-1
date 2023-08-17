export const setUser = (userId) => ({
    type: 'SET_USER',
    payload: userId
});

export const likeArticle = (articleId) => ({
    type: 'LIKE_ARTICLE',
    payload: articleId
});