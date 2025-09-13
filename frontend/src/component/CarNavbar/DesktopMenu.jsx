import React from "react";
import { Link } from "react-router-dom";
import "./DesktopMenu.scss";

const DesktopMenu = ({ location, activeFlyout, handleFlyoutToggle, handleLinkClick, user }) => {
  return (
    <nav className="desktop-nav">
      <ul className="desktop-menu">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li
          className={`has-flyout ${activeFlyout === "products" ? "open" : ""}`}
          onMouseEnter={() => handleFlyoutToggle("products")}
          onMouseLeave={() => handleFlyoutToggle(null)}
        >
          <button>Products</button>
          <div className="flyout">
            <Link to="/overview" onClick={handleLinkClick}>Overview</Link>
            <Link to="/carcard" onClick={handleLinkClick}>Explore Cars</Link>
            <Link to="/bikecard" onClick={handleLinkClick}>Explore Bikes</Link>
          </div>
        </li>
        {user?.email === "admin@gmail.com" && (
          <li>
            <Link to="/add-car" onClick={handleLinkClick}>Add Car</Link>
          </li>
        )}
        <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
      </ul>
    </nav>
  );
};

export default DesktopMenu;
