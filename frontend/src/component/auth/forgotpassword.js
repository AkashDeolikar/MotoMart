// src/component/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import './forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
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
          />
        </div>
        <button type="submit" className="forgotpsd-button">Send Reset Link</button>
        {msg && <p className="forgotpsd-success">{msg}</p>}
        {error && <p className="forgotpsd-error">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
