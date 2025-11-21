import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import "./StudentLayout.css";

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
