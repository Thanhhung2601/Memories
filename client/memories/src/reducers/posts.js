const postsReducer = (state = { isLoading: false, posts: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING': {
            return { ...state, isLoading: true }
        }
        case 'END_LOADING': {
            return { ...state, isLoading: false }
        }
        case 'FETCH_ALL': {
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPage: action.payload.numberOfPage,
            }
        }
        case 'FETCH_POST': {
            return {
                ...state,
                post: action.payload,
            }
        }
        case 'UPDATE': {
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            }
        }
        case 'LIKE_POST': {
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            }
        }
        case 'DELETE': {
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
            }
        }
        case 'CREATE_POST': {
            return { ...state, posts: [...state.posts, action.payload] }
        }
        case 'FETCH_POSTS_BY_SEARCH': {
            return {
                ...state,
                posts: action.payload,
            }
        }
        default:
            return state
    }
}

export default postsReducer
