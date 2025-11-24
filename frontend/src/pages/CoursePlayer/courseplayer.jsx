import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import "./coursePlayer.css";

export default function CoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    loadCourse();
    loadTopics();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      const res = await API.get(`/courses/${courseId}`);
      setCourse(res.data);
    } catch (err) {
      console.error("Course load error:", err);
    }
  };

  const loadTopics = async () => {
    try {
      const res = await API.get(`/topics/course/${courseId}`);
      setTopics(res.data);
    } catch (err) {
      console.error("Topics load error:", err);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-player-container">

      <h2>{course.title}</h2>
      <p>{course.description}</p>

      <h3>Topics</h3>

      <div className="topics-grid">
        {topics.map((t) => (
          <div key={t._id} className="topic-card">

            <h4>{t.title}</h4>

            <button
              className="read-button"
              onClick={() =>
                navigate(`/courses/${courseId}/topic/${t._id}`)
              }
            >
              Read
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}
