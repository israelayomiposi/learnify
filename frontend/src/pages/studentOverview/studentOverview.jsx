import { useEffect, useState } from "react";
import API from "../../services/api.js";
import { getCurrentUser } from "../../utils/auth.js";
import StudentSidebar from "../../Components/studentSidebar.jsx";
import { useNavigate } from "react-router-dom";
import "./studentOverview.css";


export default function StudentOverview() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      setLoading(true);
      try {
        let res;
        try {
          res = await API.get("/users/me/enrollments");
        } catch (err) {
          if (currentUser && currentUser.id) {
            res = await API.get(`/users/${currentUser.id}/enrollments`);
          } else {
            throw err;
          }
        }

        if (Array.isArray(res.data)) {
          setEnrollments(res.data);
        } else if (res.data.enrollments && Array.isArray(res.data.enrollments)) {
          setEnrollments(res.data.enrollments);
        } else {
          setEnrollments([]);
        }
      } catch (err) {
        console.error("Failed to fetch enrollments:", err);
        setEnrollments([]);
      }
      setLoading(false);
    };

    fetchEnrollments();
  }, [currentUser]);

  // Calculate total topics completed
  const totalCourses = enrollments.length;
  const totalProgress = enrollments.reduce((acc, en) => {
    const prog = en.progress ?? 0;
    return acc + prog;
  }, 0);
  const avgProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;

  return (
    <div className="dashboard-layout">
      <StudentSidebar enrolledCount={totalCourses} />

      <div className="dashboard-content">
        <h2>Overview</h2>

        {loading ? (
          <p>Loading…</p>
        ) : (
          <div className="overview-cards">
            <div className="overview-card">
              <h3>Total Courses</h3>
              <p>{totalCourses}</p>
            </div>

            <div className="overview-card">
              <h3>Average Progress</h3>
              <p>{avgProgress}%</p>
            </div>

            {enrollments.length === 0 && (
              <div className="overview-card">
                <h3>No Enrollments</h3>
                <p>You are not enrolled in any courses yet.</p>
                <button onClick={() => navigate("/student/courses")}>
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
