import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import "./forgotpassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "If an account exists, a reset link has been sent. Check your inbox or spam folder."
      );
      setEmail("");
    } catch (err) {
      console.error("Password reset error:", err);
      let errorMessage = "Failed to send reset link. Please try again.";
      if (err.code === "auth/invalid-email") {
        errorMessage = "Enter a valid email address.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgotpsd-container">
      <div className="forgotpsd-card">
        {/*  Google Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="forgotpsd-logo"
        >
          <path
            fill="#4285F4"
            d="M24 9.5c3.94 0 6.63 1.7 8.15 3.13l5.96-5.82C34.23 3.46 
            29.62 1.5 24 1.5 14.82 1.5 7.01 7.56 3.82 15.84l6.98 5.43C12.33 
            14.62 17.7 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.5 24.5c0-1.6-.14-3.17-.39-4.67H24v9h12.7c-.55 
            2.95-2.19 5.45-4.66 7.12l7.02 5.46C43.83 37.62 46.5 31.53 
            46.5 24.5z"
          />
          <path
            fill="#FBBC05"
            d="M10.8 28.79c-.5-1.49-.8-3.07-.8-4.79s.3-3.3.8-4.79l-6.98-5.43C2.64 
            16.35 1.5 20.02 1.5 24s1.14 7.65 3.32 10.21l6.98-5.42z"
          />
          <path
            fill="#EA4335"
            d="M24 46.5c6.48 0 11.91-2.14 15.88-5.82l-7.02-5.46c-2.03 
            1.37-4.62 2.18-8.86 2.18-6.3 0-11.67-5.12-13.19-11.77l-6.98 
            5.42C7.01 40.44 14.82 46.5 24 46.5z"
          />
        </svg>

        <h1 className="forgotpsd-title">Find your account</h1>
        <p className="forgotpsd-subtitle">
          Enter your email address to get a password reset link.
        </p>

        <form onSubmit={handleReset} className="forgotpsd-form">
          <div className="forgotpsd-input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgotpsd-input"
              aria-label="Email for password reset"
            />
          </div>

          {message && (
            <p className="forgotpsd-success" role="alert">
              {message}
            </p>
          )}
          {error && (
            <p className="forgotpsd-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="forgotpsd-button"
          >
            {loading ? "Sending..." : "Next"}
          </button>
        </form>

        <div className="forgotpsd-links">
          <Link to="/login" className="forgotpsd-link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
