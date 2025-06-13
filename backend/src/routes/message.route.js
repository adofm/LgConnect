import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage, sendAIMessage, getAIPreview } from "../controllers/message.controller.js";

const router = express.Router();
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/ai/send/:id", protectRoute, sendAIMessage);
router.post("/ai/preview", protectRoute, getAIPreview);

export default router;
