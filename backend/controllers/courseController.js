// backend/controllers/courseController.js
import Course from "../models/course.js";

import Topic from "../models/Topic.js";
export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const course = await Course.create({
      title,
      description,
      createdBy: req.user ? req.user._id : null,
    });

    res.status(201).json(course);
  } catch (err) {
    console.error("createCourse:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCourses = async (req, res) => {
  try {
    // support pagination if present
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      Course.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("title description createdAt topics")
        .lean(),
      Course.countDocuments(),
    ]);

    // append topic count and enrollments not computed here (can be added)
    const result = courses.map((c) => ({
      ...c,
      topicsCount: (c.topics && c.topics.length) || 0,
    }));

    res.json({ total, page, limit, courses: result });
  } catch (err) {
    console.error("getCourses:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate({
      path: "topics",
      select: "title content videoUrl orderIndex",
      options: { sort: { orderIndex: 1 } },
    });

    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("getCourseById:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const updates = req.body || {};
    const course = await Course.findByIdAndUpdate(courseId, updates, { new: true });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("updateCourse:", err);
    res.status(500).json({ message: "Server error" });
  }
};
