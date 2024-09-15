import * as api from "../api";

export const getAllLivelinks = () => async (dispatch) => {
    try {

        const { data } = await api.getliveLinks()
        console.log("hi in action \n\n\n\n", data)
        dispatch({ type: 'GET_LIVE_LINKS', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const postLivelink = (admin, title, link) => async (dispatch) => {
    try {
        const { data } = await api.postLiveLink({ admin, title, link })
        dispatch(getAllLivelinks())
    } catch (error) {
        console.log(error)
    }
}