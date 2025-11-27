import express from "express";
import Enrollment from "../models/Enrollment.js";
import Topic from "../models/Topic.js";
import Progress from "../models/Progress.js";
 // ✅ FIXED

const router = express.Router();

// ---------------------- CHECK ENROLLMENT ----------------------
export const checkEnrollment = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    const enrollment = await Enrollment.findOne({
      userRef: userId,
      courseRef: courseId
    });

    if (!enrollment) {
      return res.json({ enrolled: false, progress: 0 });
    }

    const totalTopics = await Topic.countDocuments({ courseRef: courseId });
    const completedTopics = await Progress.countDocuments({
      userRef: userId,
      courseRef: courseId,
      completed: true,
    });

    const progress = totalTopics
      ? Math.round((completedTopics / totalTopics) * 100)
      : 0;

    res.json({ enrolled: true, progress });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------- ENROLL USER ----------------------
export const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    const existing = await Enrollment.findOne({
      userRef: userId,
      courseRef: courseId
    });

    if (existing) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const newEnrollment = new Enrollment({
      userRef: userId,
      courseRef: courseId,
      progress: 0,
    });

    await newEnrollment.save();

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment: newEnrollment
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default router;
