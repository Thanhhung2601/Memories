const postsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL': {
            console.log(action.payload)
            return action.payload
        }
        case 'UPDATE': {
            return state.map((post) =>
                post._id === action.payload._id ? action.payload : post
            )
        }
        case 'LIKE_POST': {
            return state.map((post) =>
                post._id === action.payload._id ? action.payload : post
            )
        }
        case 'DELETE': {
            return state.filter((post) => post._id !== action.payload)
        }
        case 'CREATE_POST': {
            return [...state, action.payload]
        }
        default:
            return state
    }
}

export default postsReducer
