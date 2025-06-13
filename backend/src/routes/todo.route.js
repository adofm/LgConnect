import express from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
} from "../controllers/todo.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getTodos);
router.post("/", protectRoute, createTodo);
router.delete("/:id", protectRoute, deleteTodo);
router.patch("/:id", protectRoute, toggleTodo);

export default router;
