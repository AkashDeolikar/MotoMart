// ProfileSettings.jsx
import React, { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase";
import {
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import "./profileSettings.css";

const ProfileSettings = ({ theme, toggleTheme }) => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [googlePhotos, setGooglePhotos] = useState([]);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("photo");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleLocalUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return setError("No file selected or user not logged in.");
    try {
      setUploading(true);
      const storage = getStorage();
      const fileRef = ref(storage, `profilePhotos/${user.uid}/${file.name}`);
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      await updateProfile(user, { photoURL });
      setMessage("Profile photo updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Error uploading photo. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleGooglePhotosLogin = () => {
    setGooglePhotos([
      "https://picsum.photos/200?random=1",
      "https://picsum.photos/200?random=2",
      "https://picsum.photos/200?random=3",
      "https://picsum.photos/200?random=4",
      "https://picsum.photos/200?random=5",
      "https://picsum.photos/200?random=6",
    ]);
    setShowPhotoPicker(true);
  };

  const handleSelectGooglePhoto = async (photoUrl) => {
    if (!user) return;
    try {
      await updateProfile(user, { photoURL: photoUrl });
      setMessage("Profile photo updated from Google Photos!");
      setShowPhotoPicker(false);
    } catch (err) {
      console.error(err);
      setError("Error updating photo.");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, { displayName });
      setMessage("Display name updated!");
    } catch (err) {
      console.error(err);
      setError("Error updating display name.");
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return setError("User email not found.");
    try {
      await sendPasswordResetEmail(auth, user.email);
      setMessage("Password reset email sent!");
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email.");
    }
  };

  if (!user) return <p className="profile-loading">Loading profile...</p>;

  return (
    <div className="profile-layout">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <h2>Profile Settings</h2>
        <nav>
          <ul>
            <li
              className={activeSection === "photo" ? "active" : ""}
              onClick={() => setActiveSection("photo")}
            >
              Photo
            </li>
            <li
              className={activeSection === "info" ? "active" : ""}
              onClick={() => setActiveSection("info")}
            >
              Personal Info
            </li>
            <li
              className={activeSection === "security" ? "active" : ""}
              onClick={() => setActiveSection("security")}
            >
              Security
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className="profile-content">
        <div className="profile-header">
          <h2>Manage Your Profile</h2>
          <p className="profile-subtitle">
            Update your photo, personal info, and security settings
          </p>
        </div>

        {/* Photo Section */}
        {activeSection === "photo" && (
          <section className="profile-section profile-photo-section">
            <h3>Profile Photo</h3>
            <div className="profile-photo-display">
              <img
                src={user.photoURL || "https://picsum.photos/200"}
                alt="Profile"
                className="profile-photo"
              />
              <div className="profile-photo-actions">
                <label
                  className={`profile-btn profile-btn-primary ${uploading ? "disabled" : ""}`}
                >
                  <span className="material-symbols-outlined">upload_file</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLocalUpload}
                    style={{ display: "none" }}
                  />
                  {uploading ? "Uploading..." : "Upload from Device"}
                </label>
                <button
                  onClick={handleGooglePhotosLogin}
                  className="profile-btn profile-btn-primary"
                  disabled={uploading}
                >
                  <span className="material-symbols-outlined">photo_library</span>
                  Choose from Google Photos
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Personal Info Section */}
        {activeSection === "info" && (
          <section className="profile-section profile-info-section">
            <h3>Personal Info</h3>
            <form onSubmit={handleUpdateProfile}>
              <div className="profile-input-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <button type="submit" className="profile-btn profile-btn-primary">
                <span className="material-symbols-outlined">save</span>
                Save Changes
              </button>
            </form>
          </section>
        )}

        {/* Security Section */}
        {activeSection === "security" && (
          <section className="profile-section profile-security-section">
            <h3>Security</h3>
            <button
              onClick={handlePasswordReset}
              className="profile-btn profile-btn-danger"
            >
              <span className="material-symbols-outlined">lock_reset</span>
              Send Password Reset Email
            </button>
          </section>
        )}

        {/* Alerts */}
        <div className="profile-alert-container" aria-live="polite">
          {message && <div className="profile-alert success">{message}</div>}
          {error && <div className="profile-alert error">{error}</div>}
        </div>
      </main>

      {/* Google Photos Picker Modal */}
      {showPhotoPicker && (
        <div className="profile-modal-backdrop" onClick={() => setShowPhotoPicker(false)}>
          <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Select a Profile Photo</h3>
            <div className="profile-photo-grid">
              {googlePhotos.map((url, idx) => (
                <div
                  key={idx}
                  className="profile-photo-item"
                  onClick={() => handleSelectGooglePhoto(url)}
                >
                  <img src={url} alt={`Photo ${idx + 1}`} />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowPhotoPicker(false)}
              className="profile-btn profile-btn-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
