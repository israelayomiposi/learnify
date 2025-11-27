import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import StudentSidebar from "../../Components/studentSidebar.jsx";
import "./TopicReader.css";

export default function TopicReader() {
  const { courseId, topicId } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    loadTopic();
  }, [topicId]);

  const loadTopic = async () => {
    try {
      const res = await API.get(`/topics/${topicId}`);
      setTopic(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!topic)
    return (
      <div className="dashboard-layout">
        <StudentSidebar />
        <main className="dashboard-content">
          <p>Loading...</p>
        </main>
      </div>
    );

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <StudentSidebar />

      {/* CONTENT */}
      <main className="dashboard-content topic-reader-page">
        <h1 className="topic-title">{topic.title}</h1>

        {topic.videoUrl && (
          <video className="topic-video" src={topic.videoUrl} controls />
        )}

        <div
          className="topic-content"
          dangerouslySetInnerHTML={{ __html: topic.content }}
        ></div>
      </main>
    </div>
  );
}
