import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api.js";
import { saveToken } from "../../utils/auth.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Register.css";
import logo from "../../assets/logo.PNG";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      saveToken(res.data.token);
      toast.success("Registration successful!");
      navigate("/student/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please check your input.");
    }
  };

  return (
    <div className="register-page">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="register-left">
        <h1>Welcome to Learnify!</h1>
        <p>
          Join our community and start learning amazing courses today. Grow
          your skills, connect with others, and achieve your goals.
        </p>
        <img src={logo} alt="Logo" className="left-logo" />
      </div>

      <div className="register-right">
        <div className="form-container">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <button type="submit">Sign Up</button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
