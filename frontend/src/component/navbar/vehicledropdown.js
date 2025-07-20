import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ServiceDropdown.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const VehicleDropdown = ({ closeParentMobileMenu, isParentMobileMenuOpen }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!isParentMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    }, [isParentMobileMenuOpen]);

    const handleLinkClick = () => {
        closeParentMobileMenu();
        setIsMobileMenuOpen(false);
    };

    const handleToggleMenu = (event) => {
        if (window.innerWidth <= 768) {
            event.preventDefault();
            setIsMobileMenuOpen(prev => !prev);
        }
    };

    return (
        <li className={`vehicle-nav-item ${isMobileMenuOpen ? 'mobile-dd-open' : ''}`}>
            <Link
                to="/overviewpage"
                title="Vehicle"
                className="navigationAnalytics icon-arrow-down desktop-service-link"
                onClick={handleToggleMenu}
            >
                <span className="desktop-title-text">Vehicle</span>
                <span className="mobile-chevron">
                    {isMobileMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </Link>

            <div className="desk-nav-dd">
                <ul>
                    <li><Link to="/overviewpage" onClick={handleLinkClick}>Overview <i className="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/Carcard" onClick={handleLinkClick}>Explore Car <i className="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/Bikecard" onClick={handleLinkClick}>Explore Bike <i className="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/cardetails" onClick={handleLinkClick}>Car Compare <i className="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/BikeCompareDetails" onClick={handleLinkClick}>Bike Compare<i className="bi bi-arrow-up-right-circle"></i></Link></li>
                </ul>
            </div>
        </li>
    );
};

export default VehicleDropdown;
