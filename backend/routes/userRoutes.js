import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyEnrollments } from "../controllers/userController.js";

const router = express.Router();

router.get("/me/enrollments", protect, getMyEnrollments);


export default router;
