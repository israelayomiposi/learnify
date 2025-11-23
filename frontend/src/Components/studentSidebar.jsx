import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./studentSidebar.css";


export default function StudentSidebar({ enrolledCount = 0 }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Hamburger icon only for mobile */}
      {isMobile && !mobileOpen && (
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
      )}

      <div
        className={`sidebar ${isMobile ? "mobile" : "desktop"} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        {/* Close button only on mobile */}
        {isMobile && (
          <button
            className="mobile-close-btn"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        )}

        {/* Logo at the top */}
        <div className="sidebar-logo-container">
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>

        <nav className="sidebar-links">
          <NavLink to="/student/dashboard" className="sidebar-link">
            <span className="icon">🏠</span>
            <span className="label">Dashboard</span>
          </NavLink>

          <NavLink to="/student/overview" className="sidebar-link">
            <span className="icon">📊</span>
            <span className="label">Overview</span>
          </NavLink>

          <NavLink to="/student/courses" className="sidebar-link">
            <span className="icon">📘</span>
            <span className="label">Courses</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
}
