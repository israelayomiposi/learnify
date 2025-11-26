// src/layouts/StudentLayout.jsx
import StudentSidebar from "./studentSidebar.jsx";
import { Outlet } from "react-router-dom";
import "./studentLayout.css"; // optional: create if you want layout css

export default function StudentLayout() {
  return (
    <div className="student-layout">
      <StudentSidebar />
      <main className="student-main-content">
        <Outlet />
      </main>
    </div>
  );
}
