import * as api from '../api/index'
export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        console.log(data)
        dispatch({ type: 'AUTH', payload: data })
        history.push('/')
    } catch (error) {}
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        dispatch({ type: 'AUTH', payload: data })
        history.push('/')
    } catch (error) {}
}
