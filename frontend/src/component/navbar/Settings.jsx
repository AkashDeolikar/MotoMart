// Settings.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { deleteUser, signOut, onAuthStateChanged } from "firebase/auth";
import "./settings.css";

const Settings = ({ theme, toggleTheme }) => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [activeSection, setActiveSection] = useState("display");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    if (deleteConfirmation === "DELETE") {
      try {
        await deleteUser(user);
        alert("Account deleted successfully");
        window.location.href = "/register";
      } catch (error) {
        console.error("Delete error:", error);
        alert("You may need to re-authenticate before deleting your account.");
      }
    } else {
      alert("Please type 'DELETE' to confirm.");
    }
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <div className="settings-layout">
        {/* Sidebar Navigation */}
        <aside className="settings-sidebar">
          <h2>Settings</h2>
          <nav>
            <ul>
              <li
                className={activeSection === "display" ? "active" : ""}
                onClick={() => setActiveSection("display")}
              >
                Display
              </li>
              <li
                className={activeSection === "privacy" ? "active" : ""}
                onClick={() => setActiveSection("privacy")}
              >
                Privacy
              </li>
              <li
                className={activeSection === "account" ? "active" : ""}
                onClick={() => setActiveSection("account")}
              >
                Account
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="settings-page">
          <div className="settings-header">
            <h2>App Settings</h2>
            <p className="settings-subtitle">
              Manage your preferences, privacy, and account
            </p>
          </div>

          {activeSection === "display" && (
            <section className="setting-section">
              <h3>Display</h3>
              <div className="setting-item">
                <span>Theme</span>
                <button
                  onClick={toggleTheme}
                  className="settingbtn theme-btn"
                  aria-label={
                    theme === "light"
                      ? "Switch to dark theme"
                      : "Switch to light theme"
                  }
                >
                  <span className="material-symbols-outlined">
                    {theme === "light" ? "dark_mode" : "light_mode"}
                  </span>
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
              </div>
            </section>
          )}

          {activeSection === "privacy" && (
            <section className="setting-section">
              <h3>Privacy</h3>
              <div className="setting-item">
                <span>Notifications</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="setting-item">
                <span>Enhanced Privacy Mode</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={privacyMode}
                    onChange={() => setPrivacyMode(!privacyMode)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </section>
          )}

          {activeSection === "account" && (
            <section className="setting-section account-actions">
              <h3>Account</h3>
              <div className="setting-item">
                <span>Logout</span>
                <button
                  onClick={handleLogout}
                  className="settingbtn logout-btn"
                  aria-label="Logout of account"
                >
                  <span className="material-symbols-outlined">logout</span>
                  Logout
                </button>
              </div>
              <div className="setting-item danger">
                <span>Delete Account</span>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="settingbtn delete-btn"
                  aria-label="Delete your account permanently"
                >
                  <span className="material-symbols-outlined">delete</span>
                  Delete
                </button>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Delete Account?</h3>
            <p>
              Are you sure you want to delete your account? This action is
              <strong> irreversible</strong>.
            </p>
            <p>Please type <b>DELETE</b> to confirm.</p>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className="delete-input"
              placeholder="Type DELETE"
            />
            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="settingbtn modal-cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="settingbtn modal-delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
