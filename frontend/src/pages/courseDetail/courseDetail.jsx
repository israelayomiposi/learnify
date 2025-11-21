import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import "./CourseDetail.css";

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${courseId}`);
        setCourse(res.data);

        // check enrollment
        const enrollmentRes = await API.get(`/courses/${courseId}/check-enrollment`);
        setEnrolled(enrollmentRes.data.enrolled);
        setProgress(enrollmentRes.data.progress);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      await API.post(`/courses/${courseId}/enroll`);
      setEnrolled(true);
      setProgress(0);
    } catch (err) {
      console.error(err);
      alert("Enrollment failed");
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-detail-container">
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      {!enrolled ? (
        <button onClick={handleEnroll}>Enroll Now</button>
      ) : (
        <>
          <p>Progress: {progress}%</p>
          <button onClick={() => navigate(`/courses/${courseId}/player/${course.topics[0]?._id}`)}>
            Start Learning
          </button>
        </>
      )}

      <h3>Topics</h3>

      {/* --- TOPIC CARDS --- */}
      <div className="topics-grid">
        {course.topics?.map((topic) => (
          <div key={topic._id} className="topic-card">
            <h4>{topic.title}</h4>
            <button
              onClick={() => navigate(`/courses/${courseId}/topic/${topic._id}`)}
              className="read-btn"
            >
              Read
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;
