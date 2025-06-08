import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ServiceDropdown.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const VehicleDropdown = ({ closeParentMobileMenu, isParentMobileMenuOpen }) => {
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
                <span className="desktop-title-text">Vehicle</span>
                <span className="mobile-chevron">
                    {isMobileServiceMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </Link>

            <div className="desk-nav-dd"> 
                <ul>
                    <li><Link to="/overviewpage" title="Overview" nav-title="Service" className="redirectionPath sub-nav" onClick={handleServiceLinkClick}>Overview <i class="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/Carcard" title="Service Cost Calculator" nav-title="Service" className="redirectionPath sub-nav" onClick={handleServiceLinkClick}>Explore Car <i class="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/Bikecard" title="Book a Service" nav-title="Service" className="redirectionPath sub-nav" onClick={handleServiceLinkClick}>Explore Bike <i class="bi bi-arrow-up-right-circle"></i></Link></li>
                    <li><Link to="/cardetails" title="Service History" nav-title="Service" className="redirectionPath sub-nav" onClick={handleServiceLinkClick}>Car Details <i class="bi bi-arrow-up-right-circle"></i></Link></li>
                </ul>
            </div>

        </li>
    );
};

export default VehicleDropdown;

// import React from "react";

// const VehicleDropdown = () => {
//     return (
//         <div className="dropdown"> {/* Changed class to className */}
//             <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                 Dropdown button {/* You might want to change this text to "Vehicles" or "Browse" */}
//             </button>
//             <ul className="dropdown-menu dropdown-menu-dark"> {/* Changed class to className */}
//                 <li><a className="dropdown-item active" href="/overviewpage">Action</a></li> {/* Changed class to className */}
//                 <li><a className="dropdown-item" href="/Carcard">Another action</a></li> {/* Changed class to className */}
//                 <li><a className="dropdown-item" href="/Bikecard">Something else here</a></li> {/* Changed class to className */}
//                 <li><a className="dropdown-item" href="/cardetails">Separated link</a></li> {/* Changed class to className */}
//             </ul>
//         </div>
//     );
// }

// export default VehicleDropdown;