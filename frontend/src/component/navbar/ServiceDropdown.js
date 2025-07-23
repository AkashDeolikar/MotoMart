import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ServiceDropdown.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ServiceDropdown = ({ closeParentMobileMenu, isParentMobileMenuOpen }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Renamed for consistency

    // Close the dropdown if the parent mobile menu is closed
    useEffect(() => {
        if (!isParentMobileMenuOpen) {
            setIsDropdownOpen(false);
        }
    }, [isParentMobileMenuOpen]);

    // Handles clicks on links within the dropdown
    const handleLinkClick = () => {
        closeParentMobileMenu(); // Close the main mobile menu
        setIsDropdownOpen(false); // Close this dropdown
    };

    // Toggles the dropdown visibility for mobile
    const handleToggleDropdown = (event) => {
        // Only prevent default and toggle for mobile viewports
        if (window.innerWidth <= 768) {
            event.preventDefault();
            setIsDropdownOpen(prev => !prev);
        }
        // For desktop, the Link navigation will proceed normally
    };

    return (
        // The 'mobile-dd-open' class will control the mobile slide-down effect
        <li className={`service-nav-item ${isDropdownOpen ? 'mobile-dd-open' : ''}`}>
            <Link
                to="/partsinfo"
                title="Service"
                className="navigationAnalytics desktop-service-link"
                onClick={handleToggleDropdown}
                // ARIA attributes for accessibility
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
            >
                <span className="desktop-title-text">Service</span>
                {/* Chevron icon visible only on mobile */}
                <span className="mobile-chevron">
                    {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </Link>

            {/* Desktop and Mobile Dropdown Container */}
            {/* On desktop, 'desk-nav-dd' handles hover. On mobile, 'mobile-dd-open' on parent li makes this visible. */}
            <div className="desk-nav-dd">
                <ul>
                    <li><Link to="/servicecostcalculator" onClick={handleLinkClick}>Service Cost Check <i className="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/emicalculator" onClick={handleLinkClick}>EMI Calculator <i className="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/partsinfo" onClick={handleLinkClick}>Parts Info <i className="bi bi-arrow-up-right-circle"></i></Link></li>
                </ul>
            </div>
        </li>
    );
};

export default ServiceDropdown;