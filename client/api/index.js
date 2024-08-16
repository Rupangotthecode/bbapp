import axios from "axios";
import { Platform } from "react-native";

const API = axios.create({
    baseURL: Platform.OS === 'ios' ? "http://192.168.1.2:5000/" : "http://10.0.2.2:5000/",
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const submitSchedule = (scheduleData) => API.post("/schedule/addSchedule", scheduleData)
export const getAllSchedules = () => API.get("/schedule/getAllSchedules")

export const startGame = (scoreboardData) => API.post("/scoreboard/createNewGame", scoreboardData)
export const updateScoreboard = (updationData, gameId) => API.post("/scoreboard/updateGame", { updationData, gameId })
export const startSet = (team1Main, team2Main, team1Server, team2Server, gameId) => API.post("/scoreboard/startSet", { team1Main, team2Main, team1Server, team2Server, gameId: gameId })
export const addPoint = (gameId, team, server, initialSelection) => API.post("/scoreboard/addPoint", { gameId, team, server, initialSelection })
export const manageSubstitution = (gameId, team, playerIn, playerOut) => API.post("/scoreboard/substitute", { gameId, team, playerIn, playerOut })
export const manageTimeout = (gameId, team) => API.post("/scoreboard/timeout", { gameId, team })
export const getAllScores = () => API.get("/scoreboard/getAll")