import User from "../models/user.js";
import Course from "../models/course.js";

// Admin stats
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    res.json({ totalUsers, totalCourses });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getMyEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id })
    .populate("course");

  const result = enrollments.map(e => {
    return {
      course: e.course,
      progress: e.progress
    };
  });

  res.json(result);
};


// Promote a user to admin
export const promoteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ message: `${user.name} promoted to admin.` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
