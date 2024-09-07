const liveLinkReducer = (state = null, action) => {
    switch (action.type) {
        case "POST_LIVE_LINK":
            return action.payload;
        case "GET_LIVE_LINKS":
            console.log(action.payload)
            const result = action.payload.result;
            return { ...state, result: result };
        default:
            return state;
    }
};

export default liveLinkReducer;