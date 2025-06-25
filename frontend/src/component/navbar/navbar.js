import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import './navbar.css'; // Ensure this path is correct for your CSS
import { auth } from "../../firebase"; // Assuming firebase auth is correctly imported
import ServiceDropdown from './ServiceDropdown';
import VehicleDropdown from "./vehicledropdown";

const CarNavbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // State to track if scrolled down
  const [isHomePageAtTop, setIsHomePageAtTop] = useState(false); // New state for transparent top bar

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      // Implement a user-friendly message instead of console.error in production
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Effect to handle scroll behavior for the navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const onHomePage = location.pathname === "/";

      if (onHomePage) {
        if (offset > 100) { // If scrolled more than 100px on homepage
          setScrolled(true); // Navbar becomes solid
          setIsHomePageAtTop(false); // Not at top anymore
        } else { // At the top of the homepage
          setScrolled(false); // Navbar is not "scrolled"
          setIsHomePageAtTop(true); // Navbar is in its transparent top state
        }
      } else {
        // On any other page, the navbar should always be visible and solid
        setScrolled(true); // Treat as "scrolled" for solid appearance
        setIsHomePageAtTop(false); // Not at homepage top
      }
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Perform an initial check immediately after mounting or path change
    // to set the correct navbar state before any scroll occurs.
    handleScroll(); 

    // Cleanup function: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]); // Re-run this effect when the path changes

  // Dynamically set navbar class based on theme and scroll states
  const navbarClass = `car-navbar ${theme} ${isHomePageAtTop ? 'homepage-transparent-top' : 'scrolled-or-other-page'}`;

  return (
    <nav className={navbarClass} aria-label="Main Navigation">
      <div className="car-navbar-container">
        <div className="car-navbar-logo">
          <h1 className="ProjectName">MotoMart</h1>
          {/* <IoCarSportSharp aria-hidden="true" /> MotoMart */}
        </div>

        {/* Mobile Menu Button (Hamburger/Close Icon) */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-controls="main-navbar-links"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu Overlay for dimming background */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
        )}

        {/* Main Navbar Links */}
        <div
          id="main-navbar-links"
          className={`car-navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        >
          <ul>
            {/* Home Link */}
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={closeMobileMenu}>Home</Link>
            </li>

            {/* Vehicle Dropdown Component */}
            {/* Pass closeParentMobileMenu to allow dropdowns to close the mobile menu */}
            <VehicleDropdown closeParentMobileMenu={closeMobileMenu} isParentMobileMenuOpen={isMobileMenuOpen}/>
            
            {/* Admin-only Add Car Link */}
            {user?.email === "admin@gmail.com" && (
              <li>
                <Link to="/add-car" className={location.pathname === "/add-car" ? "active" : ""} onClick={closeMobileMenu}>Add Car</Link>
              </li>
            )}

            {/* Service Dropdown Component */}
            <ServiceDropdown closeParentMobileMenu={closeMobileMenu} isParentMobileMenuOpen={isMobileMenuOpen} />
            
            {/* Contact Link */}
            <li>
              <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""} onClick={closeMobileMenu}>Contact</Link>
            </li>

            {/* Login/Register Links (Conditional based on user login status) */}
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

            {/* Logout Button (Conditional based on user login status) */}
            {user && (
              <li>
                <button className="logout-btn" onClick={() => { handleLogout(); closeMobileMenu(); }}><i className="bi bi-box-arrow-right"></i>Logout</button>
              </li>
            )}

            {/* User Info Display (Conditional based on user login status) */}
            {user && (
              <li className="user-info">
                <i className="bi bi-person-circle"></i> {user.displayName || user.email.split('@')[0]}
              </li>
            )}

            {/* Theme Toggle Button */}
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
