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

const ProfileSettings = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [googlePhotos, setGooglePhotos] = useState([]);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Load user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
      }
    });
    return () => unsub();
  }, []);

  // Reset alerts after few seconds
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
    if (!file || !user) {
      setError("No file selected or user not logged in.");
      return;
    }

    try {
      setUploading(true);
      const storage = getStorage();
      const fileRef = ref(storage, `profilePhotos/${user.uid}/${file.name}`);
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);

      await updateProfile(user, { photoURL });
      setMessage("Profile photo updated successfully!");
    } catch (err) {
      console.error("Upload error:", err);
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
      console.error("Error:", err);
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
    if (!user?.email) {
      setError("User email not found.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, user.email);
      setMessage("Password reset email sent!");
    } catch (err) {
      console.error("Password reset error:", err);
      setError("Failed to send reset email.");
    }
  };

  if (!user) return <p className="loading-state">Loading profile...</p>;

  return (
    <div className="profile-settings">
      <div className="settings-header">
        <h2>Profile Settings</h2>
      </div>

      <div className="alert-container" aria-live="polite">
        {message && <div className="alert success">{message}</div>}
        {error && <div className="alert error">{error}</div>}
      </div>

      {/* Profile Photo */}
      <div className="setting-card profile-photo-section">
        <h3>Profile Photo</h3>
        <div className="photo-display">
          <img
            src={user.photoURL || "https://picsum.photos/200"}
            alt="Profile"
            className="profile-photo"
          />
          <div className="photo-actions">
            <label className={`btn btn-outlined ${uploading ? "disabled" : ""}`}>
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
              className="btn btn-outlined"
              disabled={uploading}
            >
              <span className="material-symbols-outlined">photo_library</span>
              Choose from Google Photos
            </button>
          </div>
        </div>
      </div>

      {/* Google Photos Picker */}
      {showPhotoPicker && (
        <div
          className="modal-backdrop"
          onClick={() => setShowPhotoPicker(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Select a Profile Photo</h3>
            <div className="photo-grid">
              {googlePhotos.map((url, idx) => (
                <div
                  key={idx}
                  className="photo-item"
                  onClick={() => handleSelectGooglePhoto(url)}
                >
                  <img src={url} alt={`Photo ${idx + 1}`} />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowPhotoPicker(false)}
              className="btn btn-text-only"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Personal Info */}
      <div className="setting-card user-info-section">
        <h3>Personal Info</h3>
        <form onSubmit={handleUpdateProfile}>
          <div className="input-group">
            <label htmlFor="displayName">Display Name</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <span className="material-symbols-outlined">save</span>
            Save Changes
          </button>
        </form>
      </div>

      {/* Security */}
      <div className="setting-card account-actions-section">
        <h3>Security</h3>
        <button
          onClick={handlePasswordReset}
          className="btn btn-outlined"
          disabled={uploading}
        >
          <span className="material-symbols-outlined">lock_reset</span>
          Send Password Reset Email
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
