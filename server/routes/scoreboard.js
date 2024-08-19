import express from "express";
import { changeServer, createNewGame, getAllScoreBoards, increaseTeamScore, manageSubstitution, manageTimeout, startSet, updateScoreboard } from "../controllers/scoreboard.js";

const router = express.Router();

router.post("/createNewGame", createNewGame);
router.post("/updateGame", updateScoreboard);
router.post("/startSet", startSet)
router.post("/addPoint", increaseTeamScore);
router.post("/changeServer", changeServer)
router.post("/substitute", manageSubstitution);
router.post("/timeout", manageTimeout)
router.get("/getAll", getAllScoreBoards)

export default router