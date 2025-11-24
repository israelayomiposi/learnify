import Enrollment from "../models/Enrollment.js";
import Topic from "../models/Topic.js";
import Progress from "../models/Progress.js";
import express from "express";
const router = express.Router();

export const checkEnrollment = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    const enrollment = await Enrollment.findOne({ userRef: userId, courseRef: courseId });
    if (!enrollment) return res.json({ enrolled: false, progress: 0 });

    const totalTopics = await Topic.countDocuments({ courseRef: courseId });
    const completedTopics = await Progress.countDocuments({
      userRef: userId,
      courseRef: courseId,
      completed: true,
    });

    const progress = totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0;
    res.json({ enrolled: true, progress });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export default router;
