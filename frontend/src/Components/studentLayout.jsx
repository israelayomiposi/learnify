import { Outlet } from "react-router-dom";
import StudentSidebar from "./studentSidebar";
import "./studentLayout.css";

export default function StudentLayout() {
  return (
    <div className="student-layout">
      <StudentSidebar />
      <div className="student-content">
        <Outlet />
      </div>
    </div>
  );
}
