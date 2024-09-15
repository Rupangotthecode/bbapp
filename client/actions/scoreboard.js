import * as api from "../api";

const getCurrentDate = () => {
    const now = new Date();

    // Extract date components
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();

    // Extract time components
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Combine date and time
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export const startGame = (scoreboardData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.startGame(scoreboardData)
        dispatch({ type: 'START_GAME', payload: data })
        if (navigate) {
            navigate("AdminControl");
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const completeToss = (teamName, firstServer, gameId, setShowToss) => async (dispatch) => {
    try {
        const updationData = {
            tossWinner: {
                winner: teamName,
                firstService: firstServer
            },
            $push: {
                matchMessages: {
                    team: null,
                    setNumber: 1,
                    message: `${teamName} won the toss and chose ${firstServer} to serve first.`,
                    messageTime: getCurrentDate()
                }
            }
        };
        const { data } = await api.updateScoreboard(updationData, gameId)
        console.log(data.result.tossWinner)
        dispatch({ type: 'UPDATE_GAME', payload: data })
        setShowToss(false)
    } catch (error) {
        console.log(error)
    }
}

export const startSet = (team1Main, team2Main, team1Server, team2Server, gameId) => async (dispatch) => {
    try {
        const { data } = await api.startSet(team1Main, team2Main, team1Server, team2Server, gameId)
        dispatch({ type: 'UPDATE_GAME', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const addPoint = (gameId, team) => async (dispatch) => {
    try {
        const { data } = await api.addPoint(gameId, team)
        dispatch({ type: 'UPDATE_GAME', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const changeServer = (gameId, teamName, server) => async (dispatch) => {
    try {

        const { data } = await api.changeServer(gameId, teamName, server);

        dispatch({ type: 'UPDATE_GAME', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const manageSubstitution = (gameId, team, playerIn, playerOut) => async (dispatch) => {
    try {
        console.log(gameId, team, playerIn, playerOut)
        const { data } = await api.manageSubstitution(gameId, team, playerIn, playerOut)
        dispatch({ type: 'UPDATE_GAME', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const manageTimeout = (gameId, team) => async (dispatch) => {
    try {
        const { data } = await api.manageTimeout(gameId, team)
        dispatch({ type: 'UPDATE_GAME', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const endMatch = (gameId, matchWinner, matchLoser, draw) => async (dispatch) => {
    try {
        const updationData = {
            matchStatus: "Completed",
            "matchCompletionDetails.matchWinner": matchWinner,
            "matchCompletionDetails.matchLoser": matchLoser,
            "matchCompletionDetails.matchDraw": draw,
        }
        const { data } = await api.updateScoreboard(updationData, gameId)
        dispatch({ type: 'UPDATE_GAME', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getAllScores = () => async (dispatch) => {
    try {
        const { data } = await api.getAllScores()
        dispatch({ type: "GET_ALL_SCORES", payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getScoreboard = (gameId) => async (dispatch) => {
    try {
        const { data } = await api.getScoreboard(gameId)
        dispatch({ type: "GET_GAME", payload: data })
    } catch (error) {
        console.log(error)
    }
}