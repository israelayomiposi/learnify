import express from "express";
import { addTask, getTasks } from "../controllers/taskController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add a new task (Admin only)
router.post("/:topicId/tasks", protect, admin, addTask);

// Get all tasks for a topic (any logged-in user)
router.get("/:topicId/tasks", protect, getTasks);

export default router;
