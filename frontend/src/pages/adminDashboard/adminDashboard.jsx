import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import "./adminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Assuming you have an endpoint /api/admin/stats returning { totalUsers, totalCourses }
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="stats-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Total Courses</h3>
          <p>{stats.totalCourses}</p>
        </div>
      </div>

      <div className="admin-links">
        <button onClick={() => navigate("/admin/courses")}>Manage Courses</button>
        <button onClick={() => navigate("/admin/users")}>Manage Users</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
