// backend/server.js
import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

// === CONFIG ===
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// === CORS FIX (IMPORTANT!) ===
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Vite + CRA
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// === MONGODB CONNECT ===
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    // Start Server
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`➡ Listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });
