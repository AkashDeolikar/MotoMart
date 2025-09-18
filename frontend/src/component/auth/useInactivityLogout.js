// src/component/auth/useInactivityLogout.js
import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes
const WARNING_TIME = 1 * 60 * 1000; // Show warning 1 min before logout

const useInactivityLogout = (user) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const warningRef = useRef(null);

  const [showWarning, setShowWarning] = useState(false);

  // 🔴 Logout function
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      setShowWarning(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during auto-logout:", error);
      navigate("/login");
    }
  }, [navigate]);

  // ⚡ Reset timer function
  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

    // Show warning before final logout
    warningRef.current = setTimeout(() => {
      setShowWarning(true);
    }, INACTIVITY_TIMEOUT - WARNING_TIME);

    timeoutRef.current = setTimeout(logout, INACTIVITY_TIMEOUT);
  }, [logout]);

  // ✅ Stay logged in if user clicks "Stay signed in"
  const stayLoggedIn = () => {
    setShowWarning(false);
    resetTimer();
  };

  useEffect(() => {
    if (!user) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
      setShowWarning(false);
      return;
    }

    const activityEvents = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // Start timer immediately on login

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
    };
  }, [user, resetTimer]);

  // 🔔 Render warning dialog/snackbar
  return (
    showWarning && (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#fff",
          color: "#202124",
          border: "1px solid #dadce0",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 1000,
          width: "280px",
          textAlign: "center",
        }}
      >
        <p style={{ marginBottom: "12px", fontSize: "14px" }}>
          You’ll be logged out in 1 minute due to inactivity.
        </p>
        <button
          onClick={stayLoggedIn}
          style={{
            background: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Stay signed in
        </button>
      </div>
    )
  );
};

export default useInactivityLogout;
