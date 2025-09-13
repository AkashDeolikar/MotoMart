import React from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./MobileMenu.scss";

const MobileMenu = ({ isMobileMenuOpen, activeFlyout, handleFlyoutToggle, handleLinkClick, user, handleLogout }) => {
  return (
    <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
      <Link to="/" onClick={handleLinkClick}>Home</Link>

      <div className="mobile-section">
        <button onClick={() => handleFlyoutToggle("products")}>
          Products {activeFlyout === "products" ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        <div className={`mobile-flyout ${activeFlyout === "products" ? "active" : ""}`}>
          <Link to="/overview" onClick={handleLinkClick}>Overview</Link>
          <Link to="/carcard" onClick={handleLinkClick}>Explore Cars</Link>
          <Link to="/bikecard" onClick={handleLinkClick}>Explore Bikes</Link>
        </div>
      </div>

      {user?.email === "admin@gmail.com" && <Link to="/add-car" onClick={handleLinkClick}>Add Car</Link>}

      <Link to="/contact" onClick={handleLinkClick}>Contact</Link>

      {!user ? (
        <>
          <Link to="/login" onClick={handleLinkClick}>Login</Link>
          <Link to="/register" onClick={handleLinkClick}>Register</Link>
        </>
      ) : (
        <>
          <Link to="/myfavorites" onClick={handleLinkClick}>My Favorites</Link>
          <button onClick={() => { handleLogout(); handleLinkClick(); }}>Logout</button>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
