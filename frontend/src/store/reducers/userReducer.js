const initialState = {
    userId: null,
    likedArticles: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, userId: action.payload };

        case 'LIKE_ARTICLE':
            if (!state.likedArticles.includes(action.payload)) {
                return { ...state, likedArticles: [...state.likedArticles, action.payload] };
            }
            return state;

        case 'UNLIKE_ARTICLE':
            return {
                ...state,
                likedArticles: state.likedArticles.filter(articleId => articleId !== action.payload)
            };

        default:
            return state;
    }
};

export default userReducer;