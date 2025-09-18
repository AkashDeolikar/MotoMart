import React, { useState } from "react";
import "./login.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, provider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem("authToken", token);
      navigate("/cardetails");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Google sign-in failed. Try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("authToken", userCred.user.accessToken);
      navigate("/");
    } catch (err) {
      let errorMessage = "Invalid email or password";
      if (err.code === "auth/user-not-found") {
        errorMessage = "User not found. Please check your email.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        
        <h1 className="login-title">Sign in</h1>
        <p className="login-subtitle">to continue to CarPortal</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-box">
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
            <span onClick={togglePassword} className="password-toggle">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" disabled={loading} className="primary-btn">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="divider"><span>OR</span></div>

        <button type="button" onClick={handleGoogleSignIn} className="google-btn">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          Continue with Google
        </button>

        <p className="register-link">
          Don’t have an account? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
