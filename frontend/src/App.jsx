import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Login from "./pages/login/login.jsx";
import Register from "./pages/Register/Register.jsx";

import StudentLayout from "./Components/studentLayout.jsx";
import CourseList from "./pages/courseList/courseList.jsx";
import CourseDetail from "./pages/courseDetail/courseDetail.jsx";
import CoursePlayer from "./pages/CoursePlayer/courseplayer.jsx";
import TopicReader from "./pages/CoursePlayer/TopicReader.jsx";
import StudentDashboard from "./pages/studentDashboard/studentDashboard.jsx";
import StudentOverview from "./pages/studentOverview/studentOverview.jsx";
import StudentSidebar from "./Components/studentSidebar.jsx";

// Admin Pages
import AdminDashboard from "./pages/adminDashboard/adminDashboard.jsx";
import CourseManagement from "./pages/courseManagement/courseManagement.jsx";
import CourseEditor from "./pages/courseEditor/courseEditor.jsx";
import TopicManagement from "./pages/topicManagement/topicManagement.jsx";
import TopicEditor from "./pages/topicEditor/topicEditor.jsx";
import UserManagement from "./pages/userManagement/userManagement.jsx";

import PrivateRoute from "./Components/privateRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />

        
        {/* ========== STUDENT ROUTES (with Sidebar) ========== */}
        <Route
          path="/student"
          element={
            <PrivateRoute role="student">
              <StudentLayout />
            </PrivateRoute>
          }
        >
          {/* /student (index) */}
          <Route index element={<StudentDashboard />} />

          {/* /student/dashboard */}
          <Route path="dashboard" element={<StudentDashboard />} />

          {/* /student/overview */}
          <Route path="overview" element={<StudentOverview />} />

          {/* /student/courses/:courseId/player/:topicId */}
          <Route
            path="courses/:courseId/player/:topicId"
            element={<CoursePlayer />}
          />

          {/* /student/courses/:courseId/topic/:topicId */}
          <Route
            path="courses/:courseId/topic/:topicId"
            element={<TopicReader />}
          />
        </Route>



        {/* ---------- ADMIN ROUTES ---------- */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <PrivateRoute role="admin">
              <CourseManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/courses/new"
          element={
            <PrivateRoute role="admin">
              <CourseEditor />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/courses/:courseId/topics"
          element={
            <PrivateRoute role="admin">
              <TopicManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/courses/:courseId/topics/new"
          element={
            <PrivateRoute role="admin">
              <TopicEditor />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/courses/:courseId/topics/:topicId/edit"
          element={
            <PrivateRoute role="admin">
              <TopicEditor />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute role="admin">
              <UserManagement />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
