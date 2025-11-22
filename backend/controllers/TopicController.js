import Topic from "../models/Topic.js";
import Course from "../models/course.js";

export const createTopic = async (req, res) => {
  try {
    const { title, content, videoUrl } = req.body;
    const { courseId } = req.params;

    if (!title || !courseId) {
      return res.status(400).json({ message: "Title and Course ID required" });
    }

    const topic = await Topic.create({
      title,
      content,
      videoUrl,
      course: courseId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: { topics: topic._id }
    });

    res.status(201).json(topic);
  } catch (err) {
    console.error("Create topic error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const { title, content, videoUrl } = req.body;
    const { topicId } = req.params;

    const topic = await Topic.findByIdAndUpdate(
      topicId,
      { title, content, videoUrl },
      { new: true }
    );

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json(topic);
  } catch (err) {
    console.error("Update topic error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getTopicsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const topics = await Topic.find({ course: courseId });
    res.json(topics);
  } catch (err) {
    console.error("Get topics error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getSingleTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json(topic);
  } catch (err) {
    console.error("Get single topic error:", err);
    res.status(500).json({ message: err.message });
  }
};
