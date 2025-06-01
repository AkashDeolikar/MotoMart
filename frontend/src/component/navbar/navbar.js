import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import './navbar.css';
import { auth } from "../../firebase";
import ServiceDropdown from './ServiceDropdown';
import VehicleDropdown from "./vehicledropdown";

const CarNavbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`car-navbar ${theme}`} aria-label="Main Navigation">
      <div className="car-navbar-container">
        <div className="car-navbar-logo">
          <IoCarSportSharp aria-hidden="true" /> MotoMart
        </div>

        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-controls="main-navbar-links"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
        )}

        <div
          id="main-navbar-links"
          className={`car-navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        >
          <ul>
            {/* Home */}
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={closeMobileMenu}>Home</Link>
            </li>
            {/* <li>
              <Link to="/cardetails" className={location.pathname === "/cardetails" ? "active" : ""} onClick={closeMobileMenu}>Cars</Link>
            </li> */}

            {/* Vehicle Dropdown */}
            <VehicleDropdown closeParentMobileMenu={closeMobileMenu} isParentMobileMenuOpen={isMobileMenuOpen}/>
            
            {user?.email === "admin@gmail.com" && (
              <li>
                <Link to="/add-car" className={location.pathname === "/add-car" ? "active" : ""} onClick={closeMobileMenu}>Add Car</Link>
              </li>
            )}

            {/* Service Dropdown */}
            <ServiceDropdown closeParentMobileMenu={closeMobileMenu} isParentMobileMenuOpen={isMobileMenuOpen} />
            
            {/* Contact */}
            <li>
              <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""} onClick={closeMobileMenu}>Contact</Link>
            </li>

            {/* Login - Register */}
            {!user && (
              <>
                <li>
                  <Link to="/login" className={location.pathname === "/login" ? "active" : ""} onClick={closeMobileMenu}>Login</Link>
                </li>
                <li>
                  <Link to="/register" className={location.pathname === "/register" ? "active" : ""} onClick={closeMobileMenu}>Register</Link>
                </li>
              </>
            )}

            {user && (
              <li>
                <button className="logout-btn" onClick={() => { handleLogout(); closeMobileMenu(); }}>Logout</button>
              </li>
            )}

            {user && (
              <li className="user-info">
                👋 {user.displayName || user.email.split('@')[0]}
              </li>
            )}

            <li>
              <div className="theme-toggle" onClick={() => { toggleTheme(); closeMobileMenu(); }}>
                {theme === "light" ? <FaMoon aria-label="Switch to dark theme" /> : <FaSun aria-label="Switch to light theme" />}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CarNavbar;
