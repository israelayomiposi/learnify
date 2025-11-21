import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";


export default function TopicList() {
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
      console.error("Failed to load topics:", err);
    }
  };

  const deleteTopic = async (topicId) => {
    if (!window.confirm("Delete this topic permanently?")) return;

    try {
      await API.delete(`/topics/${topicId}`);
      loadTopics();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete topic.");
    }
  };

  return (
    <div className="topic-list-container">
      <h2>Course Topics</h2>

      <button
        onClick={() => navigate(`/admin/courses/${courseId}/topics/new`)}
        className="create-btn"
      >
        + Add New Topic
      </button>

      <div className="topics-grid">
        {topics.map((t) => (
          <div key={t._id} className="topic-card">
            <h3>{t.title}</h3>
            <p>{t.content?.slice(0, 120)}...</p>

            <div className="actions">
              <button onClick={() => navigate(`/admin/courses/${courseId}/topics/${t._id}`)}>
                Edit
              </button>

              <button className="delete" onClick={() => deleteTopic(t._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
