import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";
import Topic from "../models/Topic.js";

// Check if the current user is enrolled and get progress

export const getMyEnrollments = async (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = await Enrollment.find({ userRef: userId }).populate("courseRef");

    const results = await Promise.all(enrollments.map(async (enrollment) => {
      const totalTopics = await Topic.countDocuments({ courseRef: enrollment.courseRef._id });
      const completedTopics = await Progress.countDocuments({ userRef: userId, courseRef: enrollment.courseRef._id, completed: true });
      const progress = totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0;

      return {
        course: enrollment.courseRef,
        progress
      };
    }));

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
