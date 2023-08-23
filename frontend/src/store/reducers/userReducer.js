const initialState = {
    userId: null,
    likedArticles: [],
    savedArticles: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userId: action.payload,
            };

        case 'SET_USER_INFO':
            const updatedState = {
                ...state,
                userId: action.payload.userId,
                likedArticles: action.payload.likedArticles || [],
                savedArticles: action.payload.savedArticles || []
            };
            return updatedState;

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

        case 'SAVE_ARTICLE':
            console.log('saved articles: ' + state.savedArticles);
            if (!state.savedArticles.includes(action.payload)) {
                return { ...state, savedArticles: [...state.savedArticles, action.payload] };
            }
            return state;

        default:
            return state;
    }
};

export default userReducer;