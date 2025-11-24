import { useEffect, useState } from "react";
import axios from "axios";
import "./CourseList.css";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="course-list">
      <h2>All Courses</h2>
      <div className="course-container">
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
