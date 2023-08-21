const initialState = {
    userId: null,
    likedArticles: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userId: action.payload,
            };

        case 'SET_USER_INFO':
            console.log("Before SET_USER_INFO:", state);
            const updatedState = {
                ...state,
                userId: action.payload.userId,
                likedArticles: action.payload.likedArticles
            };
            console.log("Action Payload:", action.payload);
            console.log("After SET_USER_INFO:", updatedState);
            return updatedState;

        case 'LIKE_ARTICLE':
            console.log("Current Liked Articles:", state.likedArticles);
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