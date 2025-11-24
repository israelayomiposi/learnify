import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

export default function TopicEditor() {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (topicId) loadTopic();
  }, []);

  const loadTopic = async () => {
    try {
      const res = await API.get(`/topics/${topicId}`);
      setTitle(res.data.title);
      setContent(res.data.content);
      setVideoUrl(res.data.videoUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      videoUrl,
    };

    try {
      if (!topicId) {
        await API.post(`/topics/course/${courseId}`, payload);
      } else {
        await API.put(`/topics/course/${courseId}/${topicId}`, payload);
      }

      navigate(`/admin/courses/${courseId}/topics`);
    } catch (err) {
      console.error("Topic save error:", err);
      alert("Failed to save topic. Check console.");
    }
  };

  return (
    <div>
      <h2>{topicId ? "Edit Topic" : "Add Topic"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Content</label>
        <textarea rows={10} value={content} onChange={(e) => setContent(e.target.value)} />

        <label>Video URL</label>
        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />

        <button type="submit">{topicId ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
