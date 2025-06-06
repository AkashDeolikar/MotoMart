import React, { useState } from "react";
import "./login.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, provider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
      console.log("Google user:", user);
      localStorage.setItem("authToken", token);
      alert(`Welcome, ${user.displayName}`);
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
      console.log("User logged in:", userCred.user);
      localStorage.setItem("authToken", userCred.user.accessToken);
      alert("Login successful!");
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
    <div>
      <section className="bgimage">
        <div className="wrapper">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>

            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className="icon" />
            </div>

            <div className="input-box" style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
              <span
                onClick={togglePassword}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password">Forgot Password</Link>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="register-link">
              <p>
                Don't have an Account? <Link to="/register">Register Now</Link>
              </p>
            </div>

            <div className="gsign">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  backgroundColor: "#4285F2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "40px",
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <i class="bi bi-google"></i> Continue with Google
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
