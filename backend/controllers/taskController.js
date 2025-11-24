import Task from "../models/task.js";
import Topic from "../models/Topic.js";
import Progress from "../models/Progress.js";

// Add a new task to a topic (Admin only)
export const addTask = async (req, res) => {
  try {
    const { title, description, type, solutionSchema } = req.body;
    const topicId = req.params.topicId;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const topic = await Topic.findById(topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    const task = await Task.create({
      topicRef: topicId,
      title,
      description,
      type,
      solutionSchema,
    });

    topic.tasks.push(task._id);
    await topic.save();

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Student submits task completion
export const submitTask = async (req, res) => {
  try {
    const topicId = req.params.topicId;
    const userId = req.user.id;
    const { taskId, submission } = req.body;

    // Fetch progress
    let progress = await Progress.findOne({ userRef: userId, topicRef: topicId });
    if (!progress) {
      progress = await Progress.create({
        userRef: userId,
        topicRef: topicId,
        courseRef: req.body.courseRef,
        completed: false,
        taskSubmissions: [],
      });
    }

    // Enforce sequential completion
    if (progress.completed) {
      return res.status(400).json({ message: "Topic already completed" });
    }

    progress.taskSubmissions.push({ taskId, submission });
    progress.completed = true; // simple: mark topic complete after first submission
    progress.completedAt = new Date();
    await progress.save();

    res.json({ message: "Task submitted and topic marked complete", progress });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// Get tasks for a topic
// Get all tasks for a specific topic
export const getTasks = async (req, res) => {
  try {
    const { topicId } = req.params;
    const tasks = await Task.find({ topic: topicId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

