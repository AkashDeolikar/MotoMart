// src/component/auth/Register.js
import React, { useState } from "react";
import "./login.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, provider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Google sign-in failed. Try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("authToken", userCred.user.accessToken);
      navigate("/");
    } catch (err) {
      let message = "Something went wrong!";
      if (err.code === "auth/email-already-in-use") {
        message = "Email already in use.";
      } else if (err.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h1 className="login-title">Create your account</h1>
        <p className="login-subtitle">for CarPortal</p>

        <form onSubmit={handleRegister} className="login-form">
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

          <div className="input-box">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FaLock className="icon" />
            <span
              onClick={toggleConfirmPassword}
              className="password-toggle"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading} className="primary-btn">
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="divider"><span>OR</span></div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="google-btn"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          Continue with Google
        </button>

        <p className="register-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
