const initialState = {
    userId: null,
    likedArticles: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, userId: action.payload };
        case 'LIKE_ARTICLE':
            return { ...state, likedArticles: [...state.likedArticles, action.payload] };
        // Handle other actions...
        default:
            return state;
    }
};

export default userReducer;