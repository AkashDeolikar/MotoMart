import React, { useState, useEffect, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import './navbar.css';
import '../openai/Chatbot.css';
import { auth } from "../../firebase";
import ServiceDropdown from './ServiceDropdown';
import VehicleDropdown from "./vehicledropdown";

// ✅ Import different logos for theme
import lightLogo from './logo2.png';   // used in light theme (dark logo)
import darkLogo from './logo1.png';   // used in dark theme (light logo)

const CarNavbar = memo(({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHomePageAtTop, setIsHomePageAtTop] = useState(true);

  const handleLogout = useCallback(async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, [navigate]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isHomePath = location.pathname === "/";
      const scrollTop = window.scrollY;
      const newIsHomePageAtTop = isHomePath && scrollTop <= 50;
      if (newIsHomePageAtTop !== isHomePageAtTop) {
        setIsHomePageAtTop(newIsHomePageAtTop);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, isHomePageAtTop]);

  const navbarClass = `car-navbar ${isHomePageAtTop ? "homepage-transparent-top" : "scrolled-or-other-page"}`;

  return (
    <nav className={navbarClass} aria-label="Main Navigation">
      <div className="car-navbar-container">
        {/* Logo that switches with theme */}
        <div className="car-navbar-logo">
          <img
            className="ProjectName"
            src={theme === "dark" ? darkLogo : lightLogo}
            alt="MotoMart Logo"
          />
        </div>

        {/* <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-controls="main-navbar-links"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button> */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-controls="main-navbar-links"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            // ✅ Custom close button SVG
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24">
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // ✅ Custom hamburger (three lines)
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>


        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
        )}

        <div
          id="main-navbar-links"
          role="navigation"
          aria-hidden={!isMobileMenuOpen}
          className={`car-navbar-links ${isMobileMenuOpen ? "mobile-open" : ""}`}
        >
          <ul>
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={closeMobileMenu}>Home</Link>
            </li>

            <VehicleDropdown
              closeParentMobileMenu={closeMobileMenu}
              isParentMobileMenuOpen={isMobileMenuOpen}
            />

            {user?.email === "admin@gmail.com" && (
              <li>
                <Link to="/add-car" className={location.pathname === "/add-car" ? "active" : ""} onClick={closeMobileMenu}>Add Car</Link>
              </li>
            )}

            <ServiceDropdown
              closeParentMobileMenu={closeMobileMenu}
              isParentMobileMenuOpen={isMobileMenuOpen}
            />

            <li>
              <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""} onClick={closeMobileMenu}>Contact</Link>
            </li>

            {!user ? (
              <>
                <li><Link to="/login" className={location.pathname === "/login" ? "active" : ""} onClick={closeMobileMenu}>Login</Link></li>
                <li><Link to="/register" className={location.pathname === "/register" ? "active" : ""} onClick={closeMobileMenu}>Register</Link></li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/myfavorites" className={location.pathname === "/myfavorites" ? "active" : ""} onClick={closeMobileMenu}>
                    My Favorites
                  </Link>
                </li>
                <li>
                  <button className="logout-btn" onClick={() => { handleLogout(); closeMobileMenu(); }}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </li>
                <li className="user-info">
                  <i className="bi bi-person-circle"></i> {user.displayName || user.email.split('@')[0]}
                </li>
              </>
            )}

            {/* Theme Toggle Button */}
            <li>
              <div
                className="theme-toggle"
                onClick={() => { toggleTheme(); closeMobileMenu(); }}
                role="button"
                tabIndex="0"
                aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleTheme();
                    closeMobileMenu();
                  }
                }}
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default CarNavbar;
