import React, { useState, useEffect, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import './navbar.css';
import { auth } from "../../firebase";
import ServiceDropdown from './ServiceDropdown';
import VehicleDropdown from "./vehicledropdown";

// Memoize the Navbar component to prevent unnecessary re-renders
const CarNavbar = memo(({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHomePageAtTop, setIsHomePageAtTop] = useState(true);

  // Memoize handleLogout to prevent it from being recreated on every render
  const handleLogout = useCallback(async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, [navigate]); // navigate is stable due to useNavigate

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // ✅ SCROLL AND PAGE LOGIC - Optimized to use useCallback
  useEffect(() => {
    const handleScroll = () => {
      // Use a consistent variable for location.pathname check
      const isHomePath = location.pathname === "/";
      const scrollTop = window.scrollY;

      // Only update state if it actually changes to prevent unnecessary re-renders
      const newIsHomePageAtTop = isHomePath && scrollTop <= 50;
      if (newIsHomePageAtTop !== isHomePageAtTop) {
        setIsHomePageAtTop(newIsHomePageAtTop);
      }
    };

    // Add passive event listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run on mount/path change

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, isHomePageAtTop]); // Added isHomePageAtTop to dependencies for accurate state check

  // Optimize navbarClass computation
  const navbarClass = `car-navbar ${theme} ${isHomePageAtTop ? "homepage-transparent-top" : "scrolled-or-other-page"}`;

  return (
    <nav className={navbarClass} aria-label="Main Navigation">
      <div className="car-navbar-container">
        <div className="car-navbar-logo">
          <h1 className="ProjectName">MotoMart</h1>
        </div>

        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-controls="main-navbar-links"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Conditionally render overlay only when mobile menu is open */}
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

            {/* Pass closeMobileMenu directly */}
            <VehicleDropdown
              closeParentMobileMenu={closeMobileMenu}
              isParentMobileMenuOpen={isMobileMenuOpen}
            />

            {user?.email === "admin@gmail.com" && (
              <li>
                <Link to="/add-car" className={location.pathname === "/add-car" ? "active" : ""} onClick={closeMobileMenu}>Add Car</Link>
              </li>
            )}

            {/* Pass closeMobileMenu directly */}
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
                  <button className="logout-btn" onClick={() => { handleLogout(); closeMobileMenu(); }}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </li>
                <li className="user-info">
                  <i className="bi bi-person-circle"></i> {user.displayName || user.email.split('@')[0]}
                </li>
              </>
            )}

            <li>
              <div className="theme-toggle" onClick={() => { toggleTheme(); closeMobileMenu(); }} role="button" tabIndex="0" aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}>
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