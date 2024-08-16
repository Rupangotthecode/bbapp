const scoreboardReducer = (state = null, action) => {
    switch (action.type) {
        case "START_GAME":
            console.log(action?.payload)
            return { ...state, data: action?.payload }

        case "UPDATE_GAME":
            return { ...state, data: action?.payload }

        default:
            return state;
    }
}

export default scoreboardReducer