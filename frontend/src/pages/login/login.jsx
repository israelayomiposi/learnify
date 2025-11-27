import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import { saveToken } from "../../utils/auth.js";
import { SignInButton } from "@clerk/clerk-react";
import logo from "../../assets/logo.PNG";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // success / error message
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [showPassword, setShowPassword] = useState(false); // new toggle state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/auth/login", { email, password });

      setMessageType("success");
      setMessage("Login successful! Redirecting...");
      saveToken(res.data.token);

      setTimeout(() => {
        const payload = JSON.parse(atob(res.data.token.split(".")[1]));
        if (payload.role === "admin") navigate("/admin/dashboard");
        else navigate("/student/dashboard");
      }, 1000);

    } catch (err) {
      console.error(err);
      setMessageType("error");

      if (err.response?.data?.message === "Invalid password") {
        setMessage("Incorrect password");
      } 
      else if (err.response?.data?.message === "User not found") {
        setMessage("Email not found");
      }
      else {
        setMessage("Login failed. Try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Welcome Back!</h1>
        <p>
          Login to access your courses and continue your learning journey.
        </p>
        <img src={logo} alt="Logo" className="left-logo" />
      </div>

      <div className="login-right">
        <div className="form-container">
          <h2>Login</h2>

          {/* Message Box */}
          {message && (
            <div className={`msg-box ${messageType}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />

            {/* Password field with toggle */}
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

            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="auth-divider">OR</div>

          <SignInButton mode="modal">
            <button className="clerk-btn">Continue with Gmail</button>
          </SignInButton>

          <p style={{ marginTop: "15px" }}>
            Don't have an account? <Link to="/register">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
