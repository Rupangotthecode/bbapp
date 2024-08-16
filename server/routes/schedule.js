import express from "express";
import { addSchedule, getAllSchedules } from "../controllers/schedule.js";

const router = express.Router();

router.post("/addSchedule", addSchedule);
router.get("/getAllSchedules", getAllSchedules);

export default router;