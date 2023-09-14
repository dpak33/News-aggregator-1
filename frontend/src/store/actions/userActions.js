export const setUser = (userId) => ({
    type: 'SET_USER',
    payload: userId
});

export const setUserInfo = (userInfo) => ({
    type: 'SET_USER_INFO',
    payload: userInfo
});

export const clearUserInfo = () => {
    return {
        type: 'CLEAR_USER_INFO'
    }
};

export const likeArticle = (articleId) => ({
    type: 'LIKE_ARTICLE',
    payload: articleId
});

export const unlikeArticle = (articleId) => ({
    type: 'UNLIKE_ARTICLE',
    payload: articleId
});

export const saveArticle = (articleID) => ({
    type: 'SAVE_ARTICLE',
    payload: articleID
});

export const unsaveArticle = (articleID) => ({
    type: 'UNSAVE_ARTICLE',
    payload: articleID
});