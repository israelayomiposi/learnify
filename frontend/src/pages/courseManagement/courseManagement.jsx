import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import "./courseManagement.css";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");

        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else if (Array.isArray(res.data.courses)) {
          setCourses(res.data.courses);
        } else {
          console.warn("Invalid course response:", res.data);
          setCourses([]);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-management-container">
      <h2>Manage Courses</h2>

      {/* Add new course */}
      <button onClick={() => navigate("/admin/courses/new")}>
        Add New Course
      </button>

      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              {/* Edit Course */}
              <button
                onClick={() => navigate(`/admin/courses/${course._id}/edit`)}
              >
                Edit Course
              </button>

              {/* View Course Topics */}
              <button
                onClick={() => navigate(`/admin/courses/${course._id}/topics`)}
              >
                Manage Topics
              </button>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
}

export default CourseManagement;
