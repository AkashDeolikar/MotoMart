import React, { useState, useEffect, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import UserActions from "./UserActions";
import "./CarNavbar.scss";

const CarNavbar = memo(({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFlyout, setActiveFlyout] = useState(null);
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
    setIsMobileMenuOpen((prev) => !prev);
    setActiveFlyout(null);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setActiveFlyout(null);
  }, []);

  const handleFlyoutToggle = useCallback(
    (menu) => {
      setActiveFlyout(activeFlyout === menu ? null : menu);
    },
    [activeFlyout]
  );

  const handleLinkClick = useCallback(() => {
    closeMobileMenu();
    setActiveFlyout(null);
  }, [closeMobileMenu]);

  useEffect(() => {
    const handleScroll = () => {
      const isHomePath = location.pathname === "/";
      const scrollTop = window.scrollY;
      setIsHomePageAtTop(isHomePath && scrollTop <= 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <header className={`car-header ${isHomePageAtTop ? "transparent" : "scrolled"}`}>
      <div className="car-header-container">
        <DesktopMenu
          theme={theme}
          location={location}
          activeFlyout={activeFlyout}
          handleFlyoutToggle={handleFlyoutToggle}
          handleLinkClick={handleLinkClick}
          user={user}
        />
        <UserActions
          user={user}
          theme={theme}
          toggleTheme={toggleTheme}
          handleLogout={handleLogout}
          handleLinkClick={handleLinkClick}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          closeMobileMenu={closeMobileMenu}
        />
      </div>
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        activeFlyout={activeFlyout}
        handleFlyoutToggle={handleFlyoutToggle}
        handleLinkClick={handleLinkClick}
        user={user}
        handleLogout={handleLogout}
      />
    </header>
  );
});

export default CarNavbar;
