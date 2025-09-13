// src/component/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase"; // IMPORTANT: Adjust path to your firebase.js config
import { Link } from 'react-router-dom'; // Assuming you have React Router for navigation
import './forgotpassword.css'; // Assuming you have a CSS file for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // For success messages
  const [error, setError] = useState("");     // For error messages
  const [loading, setLoading] = useState(false); // For showing loading state

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setError("");   // Clear previous errors
    setLoading(true); // Start loading

    try {
      // Firebase's sendPasswordResetEmail will resolve successfully
      // whether the email exists or not, to prevent email enumeration attacks.
      await sendPasswordResetEmail(auth, email);

      // IMPORTANT: The success message should be generic for security reasons.
      setMessage('If an account with that email exists, a password reset email has been sent to your inbox (and check your spam folder).');
      setEmail(""); // Clear the email input field after submission

    } catch (err) {
      console.error("Password reset error:", err); // Log the full error for debugging

      // Firebase errors related to invalid email *format* or temporary issues
      let errorMessage = "Failed to send password reset email. Please try again.";

      if (err.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address format.";
      }
      // Note: "auth/user-not-found" is typically suppressed by sendPasswordResetEmail
      // to prevent enumeration, so this block might not trigger for non-existent users.

      setError(errorMessage);

    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="forgotpsd-wrapper">
      <h1 className="forgotpsd-title">Reset Password</h1>
      <form onSubmit={handleReset} className="forgotpsd-form">
        <div className="forgotpsd-input-box">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgotpsd-input"
            aria-label="Email for password reset" // Added for accessibility
          />
        </div>
        <button
          type="submit"
          disabled={loading} // Disable button while loading
          className="forgotpsd-button"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        {message && <p className="forgotpsd-success" role="alert">{message}</p>} {/* Added role="alert" for accessibility */}
        {error && <p className="forgotpsd-error" role="alert">{error}</p>}       {/* Added role="alert" for accessibility */}
      </form>
      <div className="forgotpsd-links">
        <Link to="/login" className="forgotpsd-link">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;