import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";


export default function CourseTopics() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const res = await API.get(`/topics/course/${courseId}`);
      setTopics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="course-topics-container">
      <h2>Course Topics</h2>

      <div className="topics-grid">
        {topics.map((t) => (
          <div
            key={t._id}
            className="topic-card"
            onClick={() =>
              navigate(`/courses/${courseId}/topic/${t._id}`)
            }
          >
            <h3>{t.title}</h3>
            <p>{t.content?.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
