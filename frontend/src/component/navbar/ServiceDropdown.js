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
        closeParentMobileMenu();
        setIsMobileServiceMenuOpen(false);
    };

    const handleToggleServiceMenu = (event) => {
        if (window.innerWidth <= 768) {
            event.preventDefault();
            setIsMobileServiceMenuOpen(prev => !prev);
        }
    };

    return (
        <li className={`service-nav-item ${isMobileServiceMenuOpen ? 'mobile-dd-open' : ''}`}>
            <Link
                to="/overviewpage"
                title="Service"
                className="navigationAnalytics icon-arrow-down desktop-service-link"
                onClick={handleToggleServiceMenu}
            >
                <span className="desktop-title-text">Service</span>
                <span className="mobile-chevron">
                    {isMobileServiceMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </Link>

            <div className="desk-nav-dd">
                <ul>
                    <li><Link to="/overviewpage" onClick={handleServiceLinkClick}>Overview <i className="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/servicecostcalculator" onClick={handleServiceLinkClick}>Service Cost Check <i className="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/emicalculator" onClick={handleServiceLinkClick}>EMI Calculator <i className="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/partsinfo" onClick={handleServiceLinkClick}>Parts Info <i className="bi bi-arrow-up-right-circle"></i></Link></li>
                </ul>
            </div>
        </li>
    );
};

export default ServiceDropdown;
