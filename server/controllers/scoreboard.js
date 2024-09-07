import admins from "../models/auth.js";
import scoreboards from "../models/scoreboard.js";
import _ from "lodash"

export const getCurrentDate = () => {
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

const convertMongoToObj = (scoreboard) => {
    let modifiedScoreboard = _.cloneDeep(scoreboard).toObject();
    if (Buffer.isBuffer(scoreboard.team1Logo)) {
        modifiedScoreboard = {
            ...modifiedScoreboard,
            team1Logo: scoreboard.team1Logo.toString('base64')
        };
        console.log('After team1Logo conversion:', typeof (modifiedScoreboard.team1Logo)); // Should print "string"
    } else {
        console.log('team1Logo is not a Buffer');
    }
    console.log(modifiedScoreboard.tournament)
    console.log(Buffer.isBuffer(scoreboard.team2Logo)); // Should print "true" if team2Logo is a Buffer
    if (Buffer.isBuffer(scoreboard.team2Logo)) {
        modifiedScoreboard = {
            ...modifiedScoreboard,
            team2Logo: scoreboard.team2Logo.toString('base64')
        };
        console.log('After team2Logo conversion:', typeof (modifiedScoreboard.team2Logo)); // Should print "string"
    } else {
        console.log('team2Logo is not a Buffer');
    }
    return modifiedScoreboard;
}

export const createNewGame = async (req, res) => {
    try {
        const newGameData = req.body;
        const admin = await admins.findOne({ username: newGameData.admin.username })
        const currentTime = getCurrentDate()
        const initialMessage = {
            setNumber: 1,
            message: "The match has officially started.",
            messageTime: currentTime
        };
        if (admin) {
            const currentTime = getCurrentDate()
            const newScoreboard = await scoreboards.create({
                tournament: newGameData.tournament,
                organizer: newGameData.organizer,
                venue: newGameData.venue,
                timeOfStarting: currentTime,
                admin: newGameData.admin.username,
                gameType: newGameData.gameType,
                team1Name: newGameData.team1,
                team1Coach: newGameData.team1Coach,
                team1Manager: newGameData.team1Manager,
                team1ACoach: newGameData.team1ACoach,
                team1Logo: Buffer.from(newGameData.team1Logo, 'base64'),
                team2Name: newGameData.team2,
                team2Coach: newGameData.team2Coach,
                team2Manager: newGameData.team2Manager,
                team2ACoach: newGameData.team2ACoach,
                team2Logo: Buffer.from(newGameData.team2Logo, 'base64'),
                team1MatchPoints: 0,
                team2MatchPoints: 0,
                matchStatus: "in progress",
                team1Players: newGameData.team1List,
                team2Players: newGameData.team2List,
                setNumber: 1,
                poolNo: newGameData.poolNo,
                matchNo: newGameData.matchNo,
                matchCompletionDetails: {
                    matchWinner: "TBD",
                    matchLoser: "TBD",
                    matchDraw: false,
                },
                matchMessages: [initialMessage]
            })
            await admin.scoreboards.push(newScoreboard._id)
            await admins.findByIdAndUpdate(admin._id, admin)
            const modifiedScoreboard = convertMongoToObj(newScoreboard)

            res.status(200).json({ result: modifiedScoreboard })
        } else {
            res.status(404).json({ message: "Admin not found" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: String(error) })
    }
}

export const updateScoreboard = async (req, res) => {
    try {
        const { updationData, gameId } = req.body;

        console.log("hello", updationData, gameId)

        const updatedScoreboard = await scoreboards.findByIdAndUpdate(
            gameId,
            updationData,
            { new: true }
        );

        if (!updatedScoreboard) {
            res.status(404).json({ message: "Game not found" });
            return;
        }
        const modifiedScoreboard = convertMongoToObj(updatedScoreboard)
        console.log(updatedScoreboard.matchStatus)
        res.status(200).json({ result: modifiedScoreboard });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: String(error) });
    }
};

export const startSet = async (req, res) => {
    try {
        const { gameId, team1Main, team2Main, team1Server = null, team2Server = null } = req.body;
        console.log(req.body);

        const scoreboard = await scoreboards.findOne({ _id: gameId });
        console.log(scoreboard);
        if (!scoreboard) {
            return res.status(404).json({ message: "Game not found" });
        }

        let winnerMessage = {};

        const team1MainNos = new Set(team1Main.map(player => player.playerNo));
        const team1SubPlayers = scoreboard.team1Players.filter((player) => !team1MainNos.has(player.playerNo));
        const team2MainNos = new Set(team2Main.map(player => player.playerNo));
        const team2SubPlayers = scoreboard.team2Players.filter((player) => !team2MainNos.has(player.playerNo));

        const initialSetData = {
            initialPrep: true,
            team1Main,
            team2Main,
            team1SubPlayers,
            team2SubPlayers,
            lastTeam1Server: team1Server,
            lastTeam2Server: team2Server,
            team1Sub: [],
            team2Sub: [],
            team1Score: 0,
            team2Score: 0,
            team1TimeOut: false,
            team2TimeOut: false,
            setWinner: "TBD",
            setLoser: "TBD"
        };

        const currentTime = getCurrentDate(); // Moved this line here

        if (scoreboard.sets.length > 0) {
            const setNumber = scoreboard.setNumber - 1;
            const lastSet = scoreboard.sets[setNumber];

            if (lastSet.team1Score > lastSet.team2Score) {
                lastSet.setWinner = scoreboard.team1Name;
                lastSet.setLoser = scoreboard.team2Name;
                scoreboard.team1MatchPoints += 1;
            } else if (lastSet.team1Score < lastSet.team2Score) {
                lastSet.setWinner = scoreboard.team2Name;
                lastSet.setLoser = scoreboard.team1Name;
                scoreboard.team2MatchPoints += 1;
            } else {
                lastSet.setWinner = "Tie";
                lastSet.setLoser = "Tie";
            }

            winnerMessage = {
                setNumber: scoreboard.setNumber,
                message: `${lastSet.setWinner} has won the set and gained 1 match point`,
                messageTime: currentTime
            };

            scoreboard.setNumber += 1;
            await scoreboard.save();
        }

        const matchMessage = {
            setNumber: scoreboard.setNumber,
            message: `Set ${scoreboard.setNumber} has started. Team 1 (${scoreboard.team1Name}) and Team 2 (${scoreboard.team2Name}) are ready.`,
            messageTime: currentTime
        };

        // Push the initial set data and the match messages
        const updatedScoreboard = await scoreboards.findByIdAndUpdate(
            gameId,
            {
                $push: {
                    sets: initialSetData,
                    matchMessages: { $each: [winnerMessage, matchMessage] } // Combined messages
                }
            },
            { new: true }
        );

        console.log('Updated document:', updatedScoreboard);
        const modifiedScoreboard = convertMongoToObj(updatedScoreboard);
        res.status(200).json({ result: modifiedScoreboard });
    } catch (error) {
        console.log("Error in startSet:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};




export const increaseTeamScore = async (req, res) => {
    try {
        const { gameId, team } = req.body;
        console.log(gameId, team);

        const scoreboard = await scoreboards.findById(gameId);
        if (!scoreboard) {
            return res.status(404).json({ message: "Game not found" });
        }

        const setNumber = scoreboard.setNumber;
        const currentSet = scoreboard.sets[setNumber - 1];

        let newScore;
        if (team === scoreboard.team1Name) {
            currentSet.team1Score += 1;
            newScore = currentSet.team1Score;
        } else if (team === scoreboard.team2Name) {
            currentSet.team2Score += 1;
            newScore = currentSet.team2Score;
        } else {
            return res.status(400).json({ message: "Invalid team specified" });
        }

        // Create a match message for the score increase
        const currentTime = getCurrentDate();
        const matchMessage = {
            team: team,
            setNumber: scoreboard.setNumber,
            message: `${team} scored! New score: ${newScore}`,
            messageTime: currentTime
        };

        // Push the match message
        await scoreboards.findByIdAndUpdate(
            gameId,
            { $push: { matchMessages: matchMessage } }
        );

        await scoreboard.save();

        const modifiedScoreboard = convertMongoToObj(scoreboard);
        res.status(200).json({ result: modifiedScoreboard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const changeServer = async (req, res) => {
    try {
        const { gameId, team, server } = req.body;
        console.log("server", gameId, team, server);

        const scoreboard = await scoreboards.findById(gameId);
        if (!scoreboard) {
            return res.status(404).json({ message: "Game not found" });
        }

        let message;
        if (team === scoreboard.team1Name) {
            scoreboard.lastTeam1Server = server;
            message = `${team} has changed their server to ${server}.`;
        } else if (team === scoreboard.team2Name) {
            scoreboard.lastTeam2Server = server;
            message = `${team} has changed their server to ${server}.`;
        } else {
            return res.status(400).json({ message: "Invalid team specified" });
        }

        // Create a match message for the server change
        const currentTime = getCurrentDate();
        const matchMessage = {
            team: team,
            setNumber: scoreboard.setNumber,
            message: message,
            messageTime: currentTime
        };
        await scoreboard.save();
        // Push the match message
        const updatedScoreboard = await scoreboards.findByIdAndUpdate(
            gameId,
            { $push: { matchMessages: matchMessage } }
        );

        const modifiedScoreboard = convertMongoToObj(updatedScoreboard);

        console.log(modifiedScoreboard.lastTeam1Server, modifiedScoreboard.lastTeam2Server, modifiedScoreboard.matchMessages);

        res.status(200).json({ result: modifiedScoreboard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const manageSubstitution = async (req, res) => {
    try {
        const { gameId, team, playerIn, playerOut } = req.body;
        console.log(gameId, team, playerIn, playerOut);

        // Find the scoreboard by ID
        const scoreboard = await scoreboards.findById(gameId);
        if (!scoreboard) {
            return res.status(404).json({ message: "Game not found" });
        }

        // Get the current set using the setNumber
        const setNumber = scoreboard.setNumber;
        const currentSet = scoreboard.sets[setNumber - 1]; // Array index is setNumber - 1

        if (!currentSet) {
            return res.status(404).json({ message: "Set not found" });
        }

        const substitution = {
            in: playerIn,
            out: playerOut
        };

        let mainPlayers;
        let subPlayers;
        let isSubLeft;
        let teamName;
        if (team === scoreboard.team1Name) {
            mainPlayers = currentSet.team1Main;
            subPlayers = currentSet.team1Sub;
            isSubLeft = !(currentSet.team1Sub.length === 3);
            teamName = scoreboard.team1Name;
        } else if (team === scoreboard.team2Name) {
            mainPlayers = currentSet.team2Main;
            subPlayers = currentSet.team2Sub;
            isSubLeft = !(currentSet.team2Sub.length === 3);
            teamName = scoreboard.team2Name;
        } else {
            return res.status(400).json({ message: "Invalid team specified" });
        }

        const playerIndex = mainPlayers.findIndex(player => player.playerNo === playerOut.playerNo);
        if (playerIndex === -1) {
            return res.status(400).json({ message: "Player out not found in main players" });
        }

        if (isSubLeft) {
            mainPlayers[playerIndex] = substitution.in;
            subPlayers.push(substitution);
        }

        // Create a match message for the substitution
        const currentTime = getCurrentDate();
        const matchMessage = {
            team: team,
            setNumber: scoreboard.setNumber,
            message: `${teamName} substituted ${playerOut.playerName} with ${playerIn.playerName}.`,
            messageTime: currentTime
        };

        // Push the match message
        await scoreboards.findByIdAndUpdate(
            gameId,
            { $push: { matchMessages: matchMessage } }
        );

        console.log(scoreboard.sets[setNumber - 1].team1Sub);

        await scoreboard.save();

        const modifiedScoreboard = convertMongoToObj(scoreboard);

        res.status(200).json({ result: modifiedScoreboard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const manageTimeout = async (req, res) => {
    try {
        const { gameId, team } = req.body;

        const scoreboard = await scoreboards.findById(gameId);
        if (!scoreboard) {
            return res.status(404).json({ message: "Game not found" });
        }

        const setNumber = scoreboard.setNumber;
        const currentSet = scoreboard.sets[setNumber - 1];

        if (team === scoreboard.team1Name) {
            if (currentSet.team1TimeOut) {
                return res.status(404).json({ message: "Team 1 has already taken a timeout" });
            }
            currentSet.team1TimeOut = true;
        } else if (team === scoreboard.team2Name) {
            if (currentSet.team2TimeOut) {
                return res.status(404).json({ message: "Team 2 has already taken a timeout" });
            }
            currentSet.team2TimeOut = true;
        } else {
            return res.status(400).json({ message: "Invalid team specified" });
        }

        // Create a match message for the timeout
        const currentTime = getCurrentDate();
        const matchMessage = {
            team: team,
            setNumber: scoreboard.setNumber,
            message: `${team} has taken a timeout.`,
            messageTime: currentTime
        };

        // Push the match message
        await scoreboards.findByIdAndUpdate(
            gameId,
            { $push: { matchMessages: matchMessage } }
        );

        await scoreboard.save();

        const modifiedScoreboard = convertMongoToObj(scoreboard);

        res.status(200).json({ result: modifiedScoreboard });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const getAllScoreBoards = async (req, res) => {
    try {
        console.log("hi")
        const allScores = await scoreboards.find()
        allScores.forEach(score => {
            convertMongoToObj(score)
        });
        if (!allScores) {
            return res.status(404).json({ message: "No scores found" });
        }
        res.status(200).json({ result: allScores })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

export const getScoreboard = async (req, res) => {
    try {
        const gameId = req.params.gameId
        const scoreboard = await scoreboards.findById(gameId)
        if (!scoreboard) {
            return res.status(404).json({ message: "Scoreboard not found" });
        }
        const modifiedScoreboard = convertMongoToObj(scoreboard);
        res.status(200).json({ result: modifiedScoreboard });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
}