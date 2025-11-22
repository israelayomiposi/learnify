import express from "express";
import {
  createTopic,
  updateTopic,
  getTopicsByCourse,
  getSingleTopic
} from "../controllers/TopicController.js";

const router = express.Router();

router.post("/course/:courseId", createTopic);
router.put("/course/:courseId/:topicId", updateTopic);
router.get("/course/:courseId", getTopicsByCourse);
router.get("/:topicId", getSingleTopic);

export default router;
