// frontend/src/pages/admin/CourseEditor.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import "./courseEditor.css";

function CourseEditor() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    topics: [],
  });

  const [newTopic, setNewTopic] = useState({
    title: "",
    content: "",
    video: null,
  });

  const [loading, setLoading] = useState(false);

  // ------------------------------------
  // 👉 FETCH COURSE IF EDITING
  // ------------------------------------
  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        try {
          const res = await API.get(`/courses/${courseId}`);

          // Ensure correct format
          setCourse({
            title: res.data.title,
            description: res.data.description,
            topics: res.data.topics || [],
            _id: res.data._id,
          });
        } catch (err) {
          console.error("Error loading course:", err);
          alert("Failed to load course");
        }
      };

      fetchCourse();
    }
  }, [courseId]);

  // ------------------------------------
  // 👉 SAVE OR UPDATE COURSE
  // ------------------------------------
  const handleCourseSave = async () => {
    if (!course.title || !course.description)
      return alert("Course title & description required");

    setLoading(true);

    try {
      let res;

      if (courseId) {
        // update
        res = await API.put(`/courses/${courseId}`, {
          title: course.title,
          description: course.description,
        });

        alert("Course updated");
      } else {
        // create
        res = await API.post("/courses", {
          title: course.title,
          description: course.description,
        });

        alert("Course created");

        // Set course ID so topics can be added
        setCourse({
          ...course,
          _id: res.data._id,
          topics: [],
        });

        // redirect to editor with ID
        navigate(`/admin/courses/editor/${res.data._id}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error saving course");
    }

    setLoading(false);
  };

  // ------------------------------------
  // 👉 ADD NEW TOPIC
  // ------------------------------------
  const handleTopicAdd = async () => {
    if (!course._id)
      return alert("You must save the course first before adding topics!");

    if (!newTopic.title || !newTopic.content)
      return alert("Topic title & content required");

    const formData = new FormData();
    formData.append("title", newTopic.title);
    formData.append("content", newTopic.content);
    if (newTopic.video) formData.append("video", newTopic.video);

    try {
      const res = await API.post(
        `/courses/${course._id}/topics`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setCourse((prev) => ({
        ...prev,
        topics: [...prev.topics, res.data],
      }));

      setNewTopic({ title: "", content: "", video: null });

      alert("Topic added");
    } catch (err) {
      console.error(err);
      alert("Error adding topic");
    }
  };

  return (
    <div className="course-editor-container">
      <h2>{courseId ? "Edit Course" : "Add New Course"}</h2>

      {/* Course form */}
      <div className="course-form">
        <input
          type="text"
          placeholder="Course Title"
          value={course.title}
          onChange={(e) =>
            setCourse({ ...course, title: e.target.value })
          }
        />

        <textarea
          placeholder="Course Description"
          value={course.description}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />

        <button onClick={handleCourseSave} disabled={loading}>
          {loading ? "Saving..." : "Save Course"}
        </button>
      </div>

      {/* Topic section */}
      {course._id && (
        <>
          <hr />
          <h3>Topics</h3>

          <div className="topic-list">
            {course.topics.map((t) => (
              <div key={t._id} className="topic-card">
                <h4>{t.title}</h4>
                <p>{t.content}</p>

                {t.videoUrl && (
                  <video
                    src={t.videoUrl}
                    controls
                    width="250"
                    style={{ marginTop: "10px" }}
                  ></video>
                )}
              </div>
            ))}
          </div>

          {/* Add topic */}
          <div className="topic-form">
            <h4>Add New Topic</h4>

            <input
              type="text"
              placeholder="Title"
              value={newTopic.title}
              onChange={(e) =>
                setNewTopic({ ...newTopic, title: e.target.value })
              }
            />

            <textarea
              placeholder="Content"
              value={newTopic.content}
              onChange={(e) =>
                setNewTopic({ ...newTopic, content: e.target.value })
              }
            />

            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                setNewTopic({
                  ...newTopic,
                  video: e.target.files[0],
                })
              }
            />

            {newTopic.video && (
              <video
                src={URL.createObjectURL(newTopic.video)}
                controls
                width="300"
              ></video>
            )}

            <button onClick={handleTopicAdd}>Add Topic</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CourseEditor;
