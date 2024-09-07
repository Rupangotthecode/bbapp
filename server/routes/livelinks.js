import express from "express";
import { getAllLiveLinks, postLiveLink } from "../controllers/livelink.js";

const router = express.Router();
router.post("/postlivelink", postLiveLink)
router.get("/getlivelinks", getAllLiveLinks)

export default router;