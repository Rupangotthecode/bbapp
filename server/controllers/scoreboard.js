import admins from "../models/auth.js";
import scoreboards from "../models/scoreboard.js";
import _ from "lodash"

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
                }
            })
            await admin.scoreboards.push(newScoreboard._id)
            await admins.findByIdAndUpdate(admin._id, admin)
            console.log(Buffer.isBuffer(newScoreboard.team1Logo)); // Should print "true"
            let modifiedScoreboard = _.cloneDeep(newScoreboard).toObject();
            console.log(Object.keys(modifiedScoreboard), modifiedScoreboard.tournament)
            if (Buffer.isBuffer(newScoreboard.team1Logo)) {
                modifiedScoreboard = {
                    ...modifiedScoreboard,
                    team1Logo: newScoreboard.team1Logo.toString('base64')
                };
                console.log('After team1Logo conversion:', typeof (modifiedScoreboard.team1Logo)); // Should print "string"
            } else {
                console.log('team1Logo is not a Buffer');
            }
            console.log(modifiedScoreboard.tournament)
            console.log(Buffer.isBuffer(newScoreboard.team2Logo)); // Should print "true" if team2Logo is a Buffer
            if (Buffer.isBuffer(newScoreboard.team2Logo)) {
                modifiedScoreboard = {
                    ...modifiedScoreboard,
                    team2Logo: newScoreboard.team2Logo.toString('base64')
                };
                console.log('After team2Logo conversion:', typeof (modifiedScoreboard.team2Logo)); // Should print "string"
            } else {
                console.log('team2Logo is not a Buffer');
            }

            console.log(typeof modifiedScoreboard.team1Logo); // Should print "string"
            console.log(typeof modifiedScoreboard.team2Logo); // Should print "string"
            console.log(Object.keys(modifiedScoreboard))

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

        console.log(updationData, gameId)

        const updatedScoreboard = await scoreboards.findByIdAndUpdate(
            gameId,
            { tossWinner: updationData },
            { new: true }
        );

        if (!updatedScoreboard) {
            res.status(404).json({ message: "Game not found" });
            return;
        }
        const modifiedScoreboard = convertMongoToObj(updatedScoreboard)
        console.log(updatedScoreboard.tossWinner)
        res.status(200).json({ result: modifiedScoreboard });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: String(error) });
    }
};

export const startSet = async (req, res) => {
    try {
        const { gameId, team1Main, team2Main, team1Server = null, team2Server = null } = req.body;
        console.log(req.body)
        const scoreboard = await scoreboards.findOne({ _id: gameId })
        console.log(scoreboard)
        if (!scoreboard) {
            res.status(404).json({ message: "Game not found" });
            return;
        }
        const team1MainNos = new Set(team1Main.map(player => player.playerNo))
        const team1Sub = scoreboard.team1Players.filter((player) => team1MainNos.has(player.playerNo))
        const team2MainNos = new Set(team2Main.map(player => player.playerNo))
        const team2Sub = scoreboard.team2Players.filter((player) => team2MainNos.has(player.playerNo))
        const initialSetData = {
            initialPrep: true,
            matchMessages: [],
            team1Main: team1Main,
            team2Main: team2Main,
            team1SubPlayers: team1Sub,
            team2SubPlayers: team2Sub,
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
        }
        const updatedScoreboard = await scoreboards.findByIdAndUpdate(
            gameId,
            { $push: { sets: initialSetData } },
            { new: true }  // This option returns the updated document
        );
        console.log('Updated document:', updatedScoreboard);
        const modifiedScoreboard = convertMongoToObj(updatedScoreboard)
        res.status(200).json({ result: modifiedScoreboard })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

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

        if (team === scoreboard.team1Name) {
            currentSet.team1Score += 1;

        } else if (team === scoreboard.team2Name) {
            currentSet.team2Score += 1;

        } else {
            return res.status(400).json({ message: "Invalid team specified" });
        }
        console.log(scoreboard.lastTeam1Server)
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
        console.log(gameId, team, server);

        const scoreboard = await scoreboards.findById(gameId);
        if (!scoreboard) {
            return res.status(404).json({ message: "Game not found" });
        }

        const setNumber = scoreboard.setNumber;

        const currentSet = scoreboard.sets[setNumber - 1];

        if (team === scoreboard.team1Name) {
            currentSet.lastTeam1Server = server
        } else if (team === scoreboard.team2Name) {
            currentSet.lastTeam2Server = server
        } else {
            return res.status(400).json({ message: "Invalid team specified" });
        }
        await scoreboard.save();

        const modifiedScoreboard = convertMongoToObj(scoreboard);

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
        let isSubLeft
        if (team === scoreboard.team1Name) {
            mainPlayers = currentSet.team1Main;
            subPlayers = currentSet.team1Sub;
            isSubLeft = !((scoreboard.gameType === "doubles" && currentSet.team1Sub.length === 1) || (scoreboard.gameType === "fives" && currentSet.team1Sub.length === 3))
        } else if (team === scoreboard.team2Name) {
            mainPlayers = currentSet.team2Main;
            subPlayers = currentSet.team2Sub;
            isSubLeft = !((scoreboard.gameType === "doubles" && currentSet.team2Sub.length === 1) || (scoreboard.gameType === "fives" && currentSet.team2Sub.length === 3))
        } else {
            return res.status(400).json({ message: "Invalid team specified" });
        }

        const playerIndex = mainPlayers.findIndex(player => player.playerNo === playerOut.playerNo);
        if (playerIndex === -1) {
            return res.status(400).json({ message: "Player out not found in main players" });
        }
        if (isSubLeft) {
            console.log("here I am")
            mainPlayers[playerIndex] = substitution.in;
            subPlayers.push(substitution);
        }

        console.log(scoreboard.sets[setNumber - 1].team1Sub)

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
        const { gameId, team } = req.body

        const scoreboard = await scoreboards.findById(gameId);
        if (!scoreboard) {
            return res.status(404).json({ message: "Game not found" });
        }

        const setNumber = scoreboard.setNumber;
        const currentSet = scoreboard.sets[setNumber - 1];

        if (team === scoreboard.team1Name && currentSet.team1TimeOut) {
            res.status(404).json({ message: "already taken timeout" })
            return
        }

        else {
            currentSet.team1TimeOut = true
        }

        if (team === scoreboard.team2Name && currentSet.team2TimeOut) {
            res.status(404).json({ message: "already taken timeout" })
            return
        }

        else {
            currentSet.team2TimeOut = true
        }

        await scoreboard.save()

        const modifiedScoreboard = convertMongoToObj(scoreboard);

        res.status(200).json({ result: modifiedScoreboard });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getAllScoreBoards = async (req, res) => {
    try {
        console.log("hi")
        const allScores = await scoreboards.find()
        console.log(allScores)
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