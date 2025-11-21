import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseRef: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  topicRef: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  taskSubmissions: [
    {
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
      submission: String,
    },
  ],
});

export default mongoose.models.Progress || mongoose.model("Progress", progressSchema);
