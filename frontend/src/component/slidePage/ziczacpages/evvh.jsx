import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./combineouter.css";

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="app-loading-overlay">
      <div className="app-glass-loader">
        <div className="app-spinner"></div>
        <p className="app-loading-text">
          <i className="bi bi-lightning-charge-fill"></i> Please wait... loading details
        </p>
      </div>
    </div>
  );
};

const Evvh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromNavigation = location.state?.fromCardClick || false;
  const [isLoading, setIsLoading] = useState(true); // default true

  const [loadingStates, setLoadingStates] = useState({
    bmwEV: false,
    kiaEV: false,
    mercedesEV: false,
    teslaEV: false,
  });

  useEffect(() => {
  const timeout = setTimeout(() => {
    setIsLoading(false); // hide after full load
  }, 1000); // or 500ms

  return () => clearTimeout(timeout);
}, []); // ✅ only run once on first mount


  const handleVehicleClick = (brand, route) => {
    setLoadingStates(prev => ({ ...prev, [brand]: true }));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoadingStates(prev => ({ ...prev, [brand]: false }));
      navigate(route);
    }, 2000);
  };

  const vehicles = [
    {
      name: "BMW", /* TITLE */
      key: "bmwEV",/* CSS CODE AND IMG LINK NAME */
      route: "https://www.rangerover.com/en-in/index.html", /* PAGE LINK */
      description: "Introducing a new era characterised by the advent of all-electric vehicles, combining exhilarating performance, dramatic design, and a captivating sense of theatre."
    },
    {
      name: "Kia",
      key: "kiaEV",
      route: "/page5",
      description: "Introducing a new era defined by the seamless fusion of dynamic performance, intelligent design, and sustainable luxury."
    },
    {
      name: "Mercedes",
      key: "mercedesEV",
      route: "/ford",
      description: "Introducing a new era characterized by the powerful transformation of electric mobility, combining rugged capability, innovative technology, and a commitment to everyday utility."
    },
    {
      name: "Tesla",
      key: "teslaEV",
      route: "/audi",
      description: "Introducing a new era characterized by the progressive evolution of electric mobility, combining sophisticated design, exhilarating performance, and cutting-edge technology."
    },
  ];

  return (
    <div className="app-luxury-vehicle-page">
      <LoadingOverlay isLoading={isLoading} />
      <div className="app-luxury-page-header">
        <h2>ELECTRIC VEHICLE (EV)</h2>
      </div>
      <div className="app-row">
        {vehicles.map(vehicle => (
          <div className="app-col-md-6" key={vehicle.key}>
            {loadingStates[vehicle.key] ? (
              <div className="app-luxury-card app-loading-card app-appear-intro"></div>
            ) : (
              <div className={`app-luxury-card app-luxury-card-${vehicle.key} app-appear-intro`}>
                <div className="app-card-caption-wrapper">
                  <h2 className="app-margin-bottom-2">{vehicle.name}</h2>
                  <p className="app-margin-bottom-paragraph">{vehicle.description}</p>
                  <a className="app-readmore-cta" onClick={() => handleVehicleClick(vehicle.key, vehicle.route)}>
                    Visit website
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Evvh;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import './combineouter.css';

// // Loading Animation Component
// const LoadingOverlay = ({ isLoading }) => {
//     if (!isLoading) return null;

//     return (
//         <div className="app-loading-overlay">
//             <div className="app-glass-loader">
//                 <div className="app-spinner"></div>
//                 <p className="app-loading-text">
//                     <i className="bi bi-lightning-charge-fill"></i> Please wait... loading details
//                 </p>
//             </div>
//         </div>
//     );
// };

// const Evvh = () => {
//     const navigate = useNavigate();
//         const [isLoading, setIsLoading] = useState(false); // For the global loading overlay
//         const [loadingJaguar, setLoadingJaguar] = useState(false); // For the Jaguar card specific loading state (now just a trigger)
    
//         const handleJaguarClick = () => {
//             setLoadingJaguar(true); // Activate card-specific state (though it won't show an image now)
//             setIsLoading(true);     // Activate global loading overlay
    
//             setTimeout(() => {
//                 setIsLoading(false);     // Deactivate global loading overlay
//                 setLoadingJaguar(false); // Deactivate card-specific state
//                 navigate("/jaguar");     // Navigate to the Jaguar page using react-router-dom
//             }, 2000); // Simulate network delay or content loading time
//         };

//     return (
//         <div className="app-luxury-vehicle-page">
//             <LoadingOverlay isLoading={isLoading} /> {/* Global loading animation */}

//             <div className="app-luxury-page-header">
//                 <h2>EV VEHICLE</h2>
//             </div>

//             <div className="app-detail-section">
//                 {/* Content for detail section if any */}
//             </div>

//             <div className="app-row">
//                 {/* bmwEVJaguar Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-bmwEV app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">BMW</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterised by the advent of all-electric vehicles, combining
//                                     exhilarating performance, dramatic design, and a captivating sense of theatre.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleJaguarClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* kiaEV Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-kiaEV app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Kia</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era defined by the seamless fusion of <strong>dynamic performance, intelligent design, and sustainable luxury</strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleJaguarClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* MercedesEV Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-mercedesEV app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Mercedes</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong>powerful transformation of electric mobility, combining rugged capability, innovative technology, and a commitment to everyday utility</strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleJaguarClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* teslaEV Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-teslaEV app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Tesla</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong>progressive evolution of electric mobility, combining sophisticated design, exhilarating performance, and cutting-edge technology</strong>. 
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleJaguarClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
                
//                 {/* Add more luxury vehicle cards here if needed */}
//             </div>

//             <div className="app-detail-section-secondary">
//                 {/* -------------------- Content for detail1 section if any */}
//             </div>

//         </div>
//     );
// }

// export default Evvh;


