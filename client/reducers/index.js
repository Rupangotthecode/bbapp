import { combineReducers } from "redux";
import authReducer from "./auth.js";
import currentUserReducer from "./currentUser.js";
import schedulesReducer from "./schedule.js"
import scoreboardReducer from "./scoreboard.js"
import allScoresReducer from "./allScores.js";

export default combineReducers({
    authReducer,
    currentUserReducer,
    schedulesReducer,
    scoreboardReducer,
    allScoresReducer
})