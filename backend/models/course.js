// backend/models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
