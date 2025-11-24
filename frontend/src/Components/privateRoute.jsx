import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth.js";

// role: 'admin' | 'student'
function PrivateRoute({ children, role }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
