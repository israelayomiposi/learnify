import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import { saveToken } from "../../utils/auth.js";
import { SignInButton } from "@clerk/clerk-react";
import logo from "../../assets/logo.PNG";

import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      saveToken(res.data.token);

      // redirect based on role
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      if (payload.role === "admin") navigate("/admin/dashboard");
      else navigate("/student/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      {/* Left side content */}
      <div className="login-left">
        <h1>Welcome Back!</h1>
        <p>
          Login to access your courses and continue your learning journey. 
          Stay updated and track your progress easily.
        </p>
        <img src={logo} alt="Logo" className="left-logo" />
      </div>

      {/* Right side form */}
      <div className="login-right">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit">Login</button>
          </form>

          <div className="auth-divider">OR</div>

          <SignInButton mode="modal">
            <button className="clerk-btn">Continue with Google</button>
          </SignInButton>

          <p style={{ marginTop: "15px" }}>
            Don't have an account? <a href="/register">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
