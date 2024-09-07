import mongoose from "mongoose"

const scoreboardSchema = mongoose.Schema({
    tournament: { type: String, required: true },
    organizer: { type: String, required: true },
    venue: { type: String, required: true },
    timeOfStarting: { type: String, required: true },
    admin: { type: String, required: true },
    gameType: { type: String, required: true },
    team1Name: { type: String, required: true },
    team1Coach: { type: String, required: true },
    team1Manager: { type: String, required: true },
    team1ACoach: { type: String, required: true },
    team1Logo: { type: Buffer, required: true },
    team2Name: { type: String, required: true },
    team2Coach: { type: String, required: true },
    team2Manager: { type: String, required: true },
    team2ACoach: { type: String, required: true },
    team2Logo: { type: Buffer, required: true },
    team1MatchPoints: { type: Number, required: true },
    team2MatchPoints: { type: Number, required: true },
    poolNo: { type: String, required: true },
    matchNo: { type: String, required: true },
    matchStatus: { type: String, required: true },
    tossWinner: {
        winner: { type: String, default: null },
        firstService: { type: String, default: null }
    },
    matchMessages: [{
        team: { type: String, default: null },
        setNumber: { type: Number, default: null },
        message: { type: String, default: null },
        messageTime: { type: String, default: null }
    }],
    matchCompletionDetails: {
        matchWinner: { type: String, required: true },
        matchLoser: { type: String, required: true },
        matchDraw: { type: Boolean, required: true },
    },
    lastTeam1Server: { type: String, default: null },
    lastTeam2Server: { type: String, default: null },
    team1Players: [{
        playerName: { type: String, required: true },
        playerNo: { type: String, required: true },
        dob: { type: String, required: true }
    }],
    team2Players: [{
        playerName: { type: String, required: true },
        playerNo: { type: String, required: true },
        dob: { type: String, required: true }
    }],
    setNumber: { type: Number, required: true },
    sets: [{
        initialPrep: { type: Boolean, required: true },
        team1Main: [{
            playerName: { type: String, required: true },
            playerNo: { type: String, required: true },
        }],
        team2Main: [{
            playerName: { type: String, required: true },
            playerNo: { type: String, required: true },
        }],
        team1Sub: [{
            in: {
                playerName: { type: String, required: true },
                playerNo: { type: String, required: true },
            },
            out: {
                playerName: { type: String, required: true },
                playerNo: { type: String, required: true },
            }
        }],
        team2Sub: [{
            in: {
                playerName: { type: String, required: true },
                playerNo: { type: String, required: true },
            },
            out: {
                playerName: { type: String, required: true },
                playerNo: { type: String, required: true },
            }
        }],
        team1TimeOut: { type: Boolean, required: true },
        team2TimeOut: { type: Boolean, required: true },
        team1Score: { type: Number, required: true },
        team2Score: { type: Number, required: true },
        setWinner: { type: String, required: true },
        setLoser: { type: String, required: true }
    }],
    default: [],
})

export default mongoose.model("Scoreboard", scoreboardSchema);