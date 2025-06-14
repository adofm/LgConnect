import express from "express";
import { addMeeting, getUserMeetings } from "../controllers/meeting.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, addMeeting);
router.get("/", protectRoute, getUserMeetings);

export default router;
