import * as api from "../api";

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
        const updationData = { winner: teamName, firstService: firstServer }
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
        console.log(gameId, teamName, server)
        const { data } = await api.changeServer(gameId, teamName, server)
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



export const endSet = (gameId) => async (dispatch) => {
    try {
        const { data } = await api.updateScoreboard({ matchStatus: "ended" }, gameId)
        dispatch({ type: 'UPDATE_GAME', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getAllScores = () => async (dispatch) => {
    try {
        const { data } = await api.getAllScores()
        console.log(data)
        dispatch({ type: "GET_ALL_SCORES", payload: data })
    } catch (error) {
        console.log(error)
    }
}