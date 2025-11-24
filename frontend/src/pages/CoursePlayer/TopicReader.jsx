import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
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

  if (!topic) return <p>Loading...</p>;

  return (
    <div className="topic-reader-container">
      <h2>{topic.title}</h2>

      {topic.videoUrl && (
        <video src={topic.videoUrl} width="600" controls />
      )}

      <div
        className="topic-content"
        dangerouslySetInnerHTML={{ __html: topic.content }}
      ></div>
    </div>
  );
}
