const schedulesReducer = (state = null, action) => {
    switch (action.type) {
        case "SUBMIT_SCHEDULE":
            return action.payload;
        case "UPDATE_ALL_SCHEDULES":
            console.log("in reducers", action.result)
            const result = action.result;
            return { ...state, result: result };
        default:
            return state;
    }
};

export default schedulesReducer;