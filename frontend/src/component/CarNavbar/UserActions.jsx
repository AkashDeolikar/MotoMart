import React from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import "./UserActions.scss";

const UserActions = ({ user, theme, toggleTheme, handleLogout, handleLinkClick, isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <div className="user-actions">
      {!user ? (
        <>
          <Link to="/login" onClick={handleLinkClick}>Login</Link>
          <Link to="/register" className="cta" onClick={handleLinkClick}>Register</Link>
        </>
      ) : (
        <>
          <Link to="/myfavorites" onClick={handleLinkClick}>My Favorites</Link>
          <button onClick={() => { handleLogout(); handleLinkClick(); }}>Logout</button>
          <span className="username">{user.displayName || user.email.split("@")[0]}</span>
        </>
      )}
      <button className="theme-toggle" onClick={() => { toggleTheme(); handleLinkClick(); }}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
      <button className={`menu-toggle ${isMobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
        <span></span><span></span><span></span>
      </button>
    </div>
  );
};

export default UserActions;
