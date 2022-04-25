const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case 'AUTH': {
            console.log('Run reducer auth')
            localStorage.setItem(
                'profile',
                JSON.stringify({ ...action?.payload })
            )
            console.log(action.payload)
            return { ...state, authData: action?.payload }
        }
        case 'LOGOUT': {
            localStorage.clear()
            return { ...state, authData: null }
        }
        default:
            return state
    }
}

export default authReducer
