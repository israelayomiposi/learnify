import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import { getCurrentUser } from "../../utils/auth.js";
import logo from "../../assets/logo.PNG";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchEnrollments();
      setLoading(false);
    };
    init();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await API.get("/users/me/enrollments");
      setEnrollments(Array.isArray(res.data) ? res.data : res.data.enrollments || []);
      if (!res.data || (Array.isArray(res.data) && res.data.length === 0)) fetchAvailableCourses();
    } catch {
      fetchAvailableCourses();
    }
  };

  const fetchAvailableCourses = async () => {
    try {
      const res = await API.get("/courses");
      setAvailableCourses(Array.isArray(res.data) ? res.data : res.data.courses || []);
    } catch {
      setAvailableCourses([]);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await API.post(`/courses/${courseId}/enroll`);
      await fetchEnrollments();
      alert("Enrolled successfully");
    } catch {
      alert("Failed to enroll.");
    }
  };

  const handleStartLearning = (course) => {
    if (course.topics?.length > 0) {
      navigate(`/courses/${course._id}/player/${course.topics[0]._id}`);
    } else {
      alert("No topics yet.");
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <img src={logo} alt="Learnify" className="sidebar-logo" />
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>My Courses</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="dashboard-content">
        <header className="dashboard-topbar">
          <h1>Welcome, {currentUser?.name || "Student"}</h1>
        </header>

        {loading ? (
          <p>Loading...</p>
        ) : enrollments.length === 0 ? (
          <div>
            <h2>Available Courses</h2>
            <div className="course-grid">
              {availableCourses.map((course) => (
                <div className="course-card" key={course._id}>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="actions">
                    <button onClick={() => handleEnroll(course._id)}>Enroll</button>
                    <button onClick={() => navigate(`/courses/${course._id}`)}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2>My Courses</h2>
            <div className="course-grid">
              {enrollments.map((en) => {
                const course = en.course || en;
                const progress = en.progress || 0;
                return (
                  <div className="course-card" key={course._id}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${progress}%` }} />
                    </div>
                    <p>{progress}% complete</p>
                    <div className="actions">
                      <button onClick={() => handleStartLearning(course)}>Start Learning</button>
                      <button onClick={() => navigate(`/courses/${course._id}`)}>Course Page</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
