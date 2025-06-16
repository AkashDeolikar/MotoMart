import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ServiceDropdown.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ServiceDropdown = ({ closeParentMobileMenu, isParentMobileMenuOpen }) => {
    const [isMobileServiceMenuOpen, setIsMobileServiceMenuOpen] = useState(false);

    useEffect(() => {
        if (!isParentMobileMenuOpen) {
            setIsMobileServiceMenuOpen(false);
        }
    }, [isParentMobileMenuOpen]);

    const handleServiceLinkClick = () => {
        closeParentMobileMenu(); // Close the main mobile menu
        setIsMobileServiceMenuOpen(false); // Also close this submenu if open
    };

    const handleToggleServiceMenu = (event) => {
        if (event.type === 'click' && window.innerWidth <= 768) { // Adjust breakpoint as per your CSS
            event.preventDefault();
        }
        setIsMobileServiceMenuOpen(prevState => !prevState);
    };


    return (
        <li
            className={`service-nav-item ${isMobileServiceMenuOpen ? 'mobile-dd-open' : ''}`}
        >
            {/* Desktop Service Link & Mobile Toggle */}
            {/* THIS IS THE FIX FOR LINE 35 */}
            <Link // Changed from <a> to <Link> for internal navigation
                to="/overviewpage" // Provide a valid destination, e.g., the overview page
                title="Service"
                className="navigationAnalytics icon-arrow-down desktop-service-link"
                onClick={handleToggleServiceMenu}
            >
                <span className="desktop-title-text">Service</span>
                <span className="mobile-chevron">
                    {isMobileServiceMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </Link>

            <div className="desk-nav-dd"> {/* This is your desktop dropdown content */}
                <ul>
                    <li><Link to="/overviewpage" title="Overview" nav-title="Service" className="redirectionPath sub-nav" onClick={handleServiceLinkClick}>Overview <i class="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/servicecostcalculator" title="Service Cost Calculator" nav-title="Service" className="redirectionPath sub-nav" onClick={handleServiceLinkClick}>Service Cost check <i class="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/emicalculator" title="Book a Service" nav-title="Service" className="redirectionPath sub-nav" onClick={handleServiceLinkClick}>EMI Calculator <i class="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/partsinfo" title="Service History" nav-title="Service" className="redirectionPath sub-nav" onClick={handleServiceLinkClick}>Parts Info<i class="bi bi-arrow-up-right-circle"></i></Link></li>
                </ul>
            </div>
        </li>
    );
};

export default ServiceDropdown;