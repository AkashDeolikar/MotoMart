import React, {
  useState,
  useEffect,
  useCallback,
  memo,
  useMemo,
  useRef,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
} from "react-icons/fa";
import "./googlenavbar.css";
import { auth } from "../../firebase";

import lightLogo from "./logo2.png";
// import darkLogo from "./logo1.png";

const CarNavbar = memo(({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFlyout, setActiveFlyout] = useState(null);
  const [isHomePageAtTop, setIsHomePageAtTop] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const lastScrollYRef = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const tickingRef = useRef(false);

  const navItems = useMemo(
    () => ({
      vehicle: [
        { to: "/overviewpage", title: "Overview", desc: "All vehicle highlights" },
        { to: "/carcard", title: "Explore Car", desc: "Discover our cars" },
        { to: "/bikecard", title: "Explore Bike", desc: "Check out bikes" },
        { to: "/cardetails", title: "Car Compare", desc: "Compare different cars" },
        { to: "/bikecomparedetails", title: "Bike Compare", desc: "Compare different bikes" },
        { to: "/mainpagegear", title: "Bike Riding Gear", desc: "Find essential riding gear" },
      ],
      service: [
        { to: "/servicecostcalculator", title: "Service Cost Check", desc: "Estimate your service costs easily" },
        { to: "/emicalculator", title: "EMI Calculator", desc: "Plan payments with ease" },
        { to: "/partsinfo", title: "Parts Info", desc: "Find genuine parts info" },
      ],
      pages: [
        { to: "/page1", title: "Mobility", desc: "Smart mobility solutions" },
        { to: "/page2", title: "Smart Roads", desc: "AI-powered traffic & road systems" },
        { to: "/page3", title: "Impact", desc: "Global transport impact & insights" },
        { to: "/page4", title: "Partners", desc: "Work with us to shape the future" },
      ],
    }),
    []
  );

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setActiveFlyout(null);
  }, []);

  const handleLinkClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  const handleLogout = useCallback(async () => {
    try {
      await auth.signOut();
      navigate("/login");
      closeMenu();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, [navigate, closeMenu]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setActiveFlyout(null);
    setIsHeaderVisible(true);
  }, []);

  const handleFlyoutToggle = useCallback((menu, event) => {
    if (event?.stopPropagation) event.stopPropagation();
    setActiveFlyout((prev) => (prev === menu ? null : menu));
  }, []);

  const handleDocumentClick = useCallback((e) => {
    const target = e.target;
    if (
      !target.closest(".main-menu__item") &&
      !target.closest(".mobile-section")
    ) {
      setActiveFlyout(null);
    }
    if (!target.closest(".user-menu")) {
      // safe close
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  useEffect(() => {
    function updateVisibility() {
      const currentY = window.scrollY;

      if (window.innerWidth < 1024) {
        setIsHeaderVisible(true);
        lastScrollYRef.current = currentY;
        tickingRef.current = false;
        return;
      }

      if (isMobileMenuOpen) {
        setIsHeaderVisible(true);
        lastScrollYRef.current = currentY;
        tickingRef.current = false;
        return;
      }

      if (currentY <= 50) {
        setIsHeaderVisible(true);
      } else {
        if (currentY > lastScrollYRef.current && currentY > 120) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
      }

      lastScrollYRef.current = currentY;
      tickingRef.current = false;
    }

    function onScroll() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(updateVisibility);
      }
    }

    updateVisibility();

    window.addEventListener("scroll", onScroll, { passive: true });

    function onResize() {
      if (window.innerWidth < 1024) setIsHeaderVisible(true);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onScrollForHome = () => {
      setIsHomePageAtTop(location.pathname === "/" && window.scrollY <= 50);
    };
    window.addEventListener("scroll", onScrollForHome, { passive: true });
    onScrollForHome();
    return () => window.removeEventListener("scroll", onScrollForHome);
  }, [location.pathname]);

  const navbarClass = useMemo(() => {
    let cls = `header ${isHomePageAtTop ? "homepage-transparent" : "scrolled"}`;
    if (!isHeaderVisible) cls += " hidden";
    return cls;
  }, [isHomePageAtTop, isHeaderVisible]);

  return (
    <header
      className={navbarClass}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      {/* Gradient Background */}
      <div className="header__gradient__container" aria-hidden="true">
        <div className="header__gradient__wrapper">
          <div className="header__gradient__shape" />
          <div className="header__gradient__shape" />
          <div className="header__gradient__shape" />
          <div className="header__gradient__shape" />
        </div>
      </div>

      <div className="header-container">
        {/* Left */}
        <div className="left-menu">
          <Link to="/" className="logo-wrapper" onClick={handleLinkClick}>
            <img
              src={theme === "light" ? lightLogo : lightLogo}
              alt="Logo"
              className="navbar-logo"
            />
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            <ul className="main-menu__list">
              <li>
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>

              {/* VEHICLE */}
              <li
                className={`main-menu__item ${activeFlyout === "vehicle" ? "is-expanded" : ""
                  }`}
              >
                <button
                  className="main-menu__label"
                  onClick={(e) => handleFlyoutToggle("vehicle", e)}
                  aria-expanded={activeFlyout === "vehicle"}
                >
                  Vehicle{" "}
                  {activeFlyout === "vehicle" ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <div className="flyout__wrapper">
                  <div className="flyout__container">
                    {navItems.vehicle.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flyout__link"
                        onClick={handleLinkClick}
                      >
                        <div className="contentt">
                          <span>{item.title}</span>
                          <p>
                            {item.desc} <FaChevronRight />
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {user?.email === "admin@gmail.com" && (
                <li>
                  <Link
                    to="/add-car"
                    className={location.pathname === "/add-car" ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    Add Car
                  </Link>
                </li>
              )}

              {/* SERVICES */}
              <li
                className={`main-menu__item ${activeFlyout === "service" ? "is-expanded" : ""
                  }`}
              >
                <button
                  className="main-menu__label"
                  onClick={(e) => handleFlyoutToggle("service", e)}
                  aria-expanded={activeFlyout === "service"}
                >
                  Service{" "}
                  {activeFlyout === "service" ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <div className="flyout__wrapper">
                  <div className="flyout__container">
                    {navItems.service.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flyout__link"
                        onClick={handleLinkClick}
                      >
                        <div className="contentt">
                          <span>{item.title}</span>
                          <p>
                            {item.desc} <FaChevronRight />
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {/* PAGES */}
              <li
                className={`main-menu__item ${activeFlyout === "pages" ? "is-expanded" : ""
                  }`}
              >
                <button
                  className="main-menu__label"
                  onClick={(e) => handleFlyoutToggle("pages", e)}
                  aria-expanded={activeFlyout === "pages"}
                >
                  Solutions {activeFlyout === "pages" ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <div className="flyout__wrapper">
                  <div className="flyout__container">
                    {navItems.pages.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flyout__link"
                        onClick={handleLinkClick}
                      >
                        <div className="contentt">
                          <span>{item.title}</span>
                          <p>
                            {item.desc} <FaChevronRight />
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              <li>
                <Link
                  to="/contact"
                  className={location.pathname === "/contact" ? "active" : ""}
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right */}
        <div className="right-menu">
          {!user ? (
            <>
              <Link
                to="/login"
                className="action-link"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="action-link cta__wrapper"
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/myfavorites"
                className="action-link desktop-only"
                onClick={handleLinkClick}
              >
                My Favorites
              </Link>

              <div className="user-menu desktop-only" ref={menuRef}>
                <button
                  className="user-info-btn"
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="user-avatar" />
                  ) : (
                    <span className="user-avatar-placeholder">
                      {user.displayName ? user.displayName[0].toUpperCase() : "U"}
                    </span>
                  )}
                  <span className="user-name">
                    {user.displayName || user.email.split("@")[0]}
                  </span>
                  <span className="material-symbols-outlined">expand_more</span>
                </button>

                {open && (
                  <div className="user-dropdown">
                    <Link to="/ProfileSettings" onClick={() => setOpen(false)}>
                      Profile
                    </Link>
                    <Link to="/Settings" onClick={() => setOpen(false)}>
                      Settings
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </>
          )}

          <button
            className="theme-toggle"
            onClick={() => {
              toggleTheme();
              closeMenu();
            }}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          <button
            className={`menu-toggle ${isMobileMenuOpen ? "is-active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className={`mobile-menu ${isMobileMenuOpen ? "is-active" : ""}`}
        aria-label="Mobile navigation"
      >
        <Link to="/" onClick={handleLinkClick}>
          Home
        </Link>

        {/*  VEHICLES */}
        <div className="mobile-section">
          <button
            onClick={() =>
              setActiveFlyout(activeFlyout === "vehicle" ? null : "vehicle")
            }
          >
            Vehicle{" "}
            {activeFlyout === "vehicle" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`mobile-flyout ${activeFlyout === "vehicle" ? "is-active" : ""
              }`}
          >
            {navItems.vehicle.map((item) => (
              <Link key={item.to} to={item.to} onClick={handleLinkClick}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {user?.email === "admin@gmail.com" && (
          <Link to="/add-car" onClick={handleLinkClick}>
            Add Car
          </Link>
        )}

        {/*  SERVICES */}
        <div className="mobile-section">
          <button
            onClick={() =>
              setActiveFlyout(activeFlyout === "service" ? null : "service")
            }
          >
            Service{" "}
            {activeFlyout === "service" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`mobile-flyout ${activeFlyout === "service" ? "is-active" : ""
              }`}
          >
            {navItems.service.map((item) => (
              <Link key={item.to} to={item.to} onClick={handleLinkClick}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/*  SOLUTION */}
        <div className="mobile-section">
          <button
            onClick={() =>
              setActiveFlyout(activeFlyout === "pages" ? null : "pages")
            }
          >
            Solutions {activeFlyout === "pages" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`mobile-flyout ${activeFlyout === "pages" ? "is-active" : ""
              }`}
          >
            {navItems.pages.map((item) => (
              <Link key={item.to} to={item.to} onClick={handleLinkClick}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/*  CONTACT */}
        <Link to="/contact" onClick={handleLinkClick}>
          Contact
        </Link>

        {!user ? (
          <>
            <Link to="/login" onClick={handleLinkClick}>
              Login
            </Link>
            <Link
              to="/register"
              className="cta__wrapper"
              onClick={handleLinkClick}
            >
              Register
            </Link>
          </>
        ) : (
          <div className="mobile-user-section">
            <div className="mobile-user-header">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="user-avatar"
                />
              ) : (
                <span className="user-info">
                  {user.displayName || user.email.split("@")[0]}
                </span>
              )}
            </div>
            <Link to="/myfavorites" onClick={handleLinkClick}>
              My Favorites
            </Link>
            <Link to="/ProfileSettings" onClick={handleLinkClick}>
              Profile
            </Link>
            <Link to="/Settings" onClick={handleLinkClick}>
              Settings
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
});

export default CarNavbar;
