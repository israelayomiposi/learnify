// backend/routes/courseRoutes.js
import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { createCourse, getCourses, getCourseById, updateCourse } from "../controllers/courseController.js";

const router = express.Router();

router.post("/", protect, admin, createCourse);
router.get("/", getCourses);
router.get("/:courseId", getCourseById);
router.put("/:courseId", protect, admin, updateCourse);

export default router;
