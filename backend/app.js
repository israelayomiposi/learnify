// backend/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

const app = express();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// All course CRUD operations
app.use("/api/courses", courseRoutes);

// Topic creation inside a course: /api/courses/:courseId/topics
app.use("/api/topics", topicRoutes);

// Task routes
app.use("/api/tasks", taskRoutes);

// Enrollment: /api/courses/:courseId/enroll

app.use("/api/courses", enrollmentRoutes);


// Root test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.message);
  res.status(500).json({ error: err.message });
});

export default app;
