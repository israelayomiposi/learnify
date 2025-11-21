import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { getStats, promoteUser } from "../controllers/adminController.js";

const router = express.Router();router.get("/stats", protect, admin, getStats);
router.post("/promote", protect, admin, promoteUser);

export default router;
