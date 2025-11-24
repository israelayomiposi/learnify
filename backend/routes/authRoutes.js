import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { createCourse } from "../controllers/courseController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Admin: Add a course
router.post("/admin/add-course", protect, admin, createCourse);

export default router;
