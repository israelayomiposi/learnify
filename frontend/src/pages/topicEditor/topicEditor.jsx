import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import API from "../../services/api";
import "./TopicEditor.css";

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
    <div className="topic-editor-page">
      <div className="editor-container">
        <h2 className="page-title">{topicId ? "Edit Topic" : "Add Topic"}</h2>

        <form onSubmit={handleSubmit} className="editor-form">
          <label>Title</label>
          <input 
            className="input"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter topic title"
          />

          <label>Content</label>
          <ReactQuill 
            className="rich-editor"
            value={content} 
            onChange={setContent}
            placeholder="Write your topic content here..."
          />

          <label>Video URL</label>
          <input 
            className="input"
            value={videoUrl} 
            onChange={(e) => setVideoUrl(e.target.value)} 
            placeholder="https://example.com/video.mp4"
          />

          <button className="save-btn" type="submit">
            {topicId ? "Update Topic" : "Create Topic"}
          </button>
        </form>
      </div>
    </div>
  );
}
