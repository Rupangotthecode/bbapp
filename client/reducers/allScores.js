const allScoresReducer = (state = null, action) => {
    switch (action.type) {
        case "GET_ALL_SCORES":
            return { ...state, data: action?.payload }

        default:
            return state;
    }
}

export default allScoresReducer