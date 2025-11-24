import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  topicRef: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ["quiz", "assignment", "text"], default: "text" },
  solutionSchema: { type: String, default: "" }, // Placeholder
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
 