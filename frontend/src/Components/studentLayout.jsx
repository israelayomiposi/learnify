import { Outlet } from "react-router-dom";
import StudentSidebar from "./studentSidebar.jsx";
import "./StudentLayout.css";

export default function StudentLayout() {
  return (
    <div className="student-layout">
      <StudentSidebar />

      <main className="student-main">
        <div className="student-content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
