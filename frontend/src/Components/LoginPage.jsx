import React, { useState } from "react";
import "../Styles/AuthForm.css";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "",
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if(!response.ok) {
        throw new Error(data.message || "error logging in")
      }

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem("userName", data.name);
        localStorage.setItem('userId', data._id);
        alert("Login successful!");
        navigate("/home"); 
      } else {
        alert(data.message || data || "Login failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Form Panel */}
        <div className="form-panel">
          <div className="form-header">
            <h2 className="form-title">Sign in</h2>
          </div>
          
          <div className="social-login">
            <button
              type="button"
              className="google-login-btn"
              onClick={() => window.location.href = "http://localhost:5000/auth/google"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>
          
          <div className="divider">
            <span>or use your account</span>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>
            
            <button type="submit" className="submit-btn">SIGN IN</button>
          </form>
          
          <p className="auth-link">
            Don't have an account? <Link to="/register">Create account</Link>
          </p>
        </div>

        {/* Welcome Panel */}
        <div className="welcome-panel">
          <div className="welcome-content">
            <h2 className="welcome-title">Hello, Friend!</h2>
            <p className="welcome-subtitle">Enter your personal details and start journey with us</p>
            <Link to="/register" className="welcome-btn">SIGN UP</Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;