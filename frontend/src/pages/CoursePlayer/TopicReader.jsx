// TopicReader.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import StudentSidebar from "../../Components/studentSidebar.jsx";
import "./TopicReader.css";

export default function TopicReader() {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [topics, setTopics] = useState([]); // course topics for TOC / navigation
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  // Load single topic
  const loadTopic = async (id) => {
    try {
      setLoading(true);
      const res = await API.get(`/topics/${id}`);
      setTopic(res.data);
    } catch (err) {
      console.error("Failed to load topic:", err);
      setTopic(null);
    } finally {
      setLoading(false);
    }
  };

  // Load course topics (for TOC and nav). This assumes your backend exposes this endpoint.
  const loadCourseTopics = async () => {
    if (!courseId) return;
    try {
      const res = await API.get(`/courses/${courseId}/topics`);
      // Expect an array in res.data
      setTopics(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load course topics:", err);
      setTopics([]);
    }
  };

  useEffect(() => {
    if (topicId) loadTopic(topicId);
    if (courseId) loadCourseTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, courseId]);

  // derive current index in course topics
  const currentIndex = useMemo(() => {
    if (!topics || topics.length === 0 || !topic) return -1;
    return topics.findIndex((t) => String(t._id || t.id) === String(topic._id || topic.id));
  }, [topics, topic]);

  // completed state stored in localStorage (you can replace with API call)
  const completedKey = (id) => `topic_completed_${id}`;

  const isCompleted = useMemo(() => {
    if (!topic) return false;
    return localStorage.getItem(completedKey(topic._id || topic.id)) === "1";
  }, [topic]);

  const toggleCompleted = async () => {
    if (!topic) return;
    try {
      setMarking(true);
      const key = completedKey(topic._id || topic.id);
      const currently = localStorage.getItem(key) === "1";
      if (currently) localStorage.removeItem(key);
      else localStorage.setItem(key, "1");

      // If you have an API endpoint to save progress, call it here instead of localStorage
      // await API.post(`/users/me/progress`, { topicId: topic._id, completed: !currently });
      // force update by toggling state:
      setTopic({ ...topic });
    } catch (err) {
      console.error("Failed to toggle completed:", err);
    } finally {
      setMarking(false);
    }
  };

  const goToTopic = (t) => {
    const id = t._id || t.id;
    if (!id) return;
    navigate(`/courses/${courseId}/topic/${id}`);
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      const prev = topics[currentIndex - 1];
      goToTopic(prev);
    }
  };

  const goNext = () => {
    if (currentIndex >= 0 && currentIndex < topics.length - 1) {
      const next = topics[currentIndex + 1];
      goToTopic(next);
    }
  };

  // Progress percent (based on index)
  const progressPercent = useMemo(() => {
    if (!topics || topics.length === 0 || currentIndex < 0) return 0;
    return Math.round(((currentIndex + 1) / topics.length) * 100);
  }, [topics, currentIndex]);

  // loading placeholder
  if (loading && !topic) {
    return (
      <div className="dashboard-layout">
        <StudentSidebar />
        <main className="dashboard-content topic-reader-page">
          <div className="topic-container">
            <p>Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="dashboard-layout">
        <StudentSidebar />
        <main className="dashboard-content topic-reader-page">
          <div className="topic-container">
            <p>Topic not found.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="topic-layout">
      {/* LEFT: main sidebar */}
      <StudentSidebar />

      {/* PAGE CONTENT */}
      <div className="topic-page">
        {/* PROGRESS BAR */}
        <div className="topic-progress">
          <div
            className="topic-progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="topic-content-wrapper">
          {/* TOC / Course Topics */}
          <aside className="toc" aria-label="Course topics">
            <h3>Course Topics</h3>
            <ul>
              {topics.length === 0 && <li style={{ color: "#6b7280" }}>No topics available</li>}
              {topics.map((t) => {
                const id = t._id || t.id;
                const active = String(id) === String(topic._id || topic.id);
                return (
                  <li
                    key={id}
                    className={active ? "active-topic" : ""}
                    onClick={() => goToTopic(t)}
                    style={{ cursor: "pointer" }}
                  >
                    {t.title || t.name || "Untitled Topic"}
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* MAIN TOPIC */}
          <main className="topic-main">
            <h1 className="topic-title">{topic.title}</h1>

            <div className="topic-meta">
              <label style={{ cursor: "pointer", userSelect: "none" }}>
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={toggleCompleted}
                  disabled={marking}
                  style={{ marginRight: "8px" }}
                />
                Mark as Completed
              </label>
              <div style={{ float: "right", color: "#6b7280", fontSize: "0.95rem" }}>
                {progressPercent}% complete
              </div>
            </div>

            {topic.videoUrl && (
              <video
                className="topic-video"
                src={topic.videoUrl}
                controls
                preload="metadata"
              />
            )}

            <div
              className="topic-content-card"
              dangerouslySetInnerHTML={{ __html: topic.content }}
            ></div>

            <div className="topic-navigation">
              <button
                className="prev-btn"
                onClick={goPrev}
                disabled={currentIndex <= 0}
                style={{ opacity: currentIndex <= 0 ? 0.5 : 1 }}
              >
                ← Previous
              </button>

              <button
                className="next-btn"
                onClick={goNext}
                disabled={currentIndex < 0 || currentIndex >= topics.length - 1}
                style={{ opacity: currentIndex < 0 || currentIndex >= topics.length - 1 ? 0.5 : 1 }}
              >
                Next →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
