import * as api from "../api";

export const addSchedule = (scheduleData, navigate) => async (dispatch) => {
    try {
        const { submitData } = await api.submitSchedule(scheduleData)
        console.log(submitData)
        const { data } = await api.getAllSchedules()
        console.log(data.result)
        const result = data.result
        console.log("result", result)
        dispatch({ type: "UPDATE_ALL_SCHEDULES", result })
        navigate('Home')
    } catch (error) {
        console.log(error)
    }
}

export const getAllSchedules = () => async (dispatch) => {
    try {
        console.log("started")
        const { data } = await api.getAllSchedules()
        const result = data.result
        console.log("result gs", result)
        dispatch({ type: "UPDATE_ALL_SCHEDULES", result })
        console.log("done")
    } catch (error) {
        console.log("error while getting schedules", error)
    }
}