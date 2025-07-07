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

const Luxuryvh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromNavigation = location.state?.fromCardClick || false;
  const [isLoading, setIsLoading] = useState(true); // default true

  const [loadingStates, setLoadingStates] = useState({
    jaguar: false,
    bmw: false,
    ford: false,
    audi: false,
    discovery: false,
    rollsroyls: false,
    mercedes: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []); 
  // useEffect(() => {
  //   const handlePageLoad = () => {
  //     setIsLoading(false);
  //   };

  //   // Check if already loaded
  //   if (document.readyState === "complete") {
  //     handlePageLoad();
  //   } else {
  //     window.addEventListener("load", handlePageLoad);
  //   }

  //   return () => window.removeEventListener("load", handlePageLoad);
  // }, []);


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
      name: "Jaguar",/* TITLE */
      key: "jaguar",/* CSS CODE AND IMG LINK NAME */
      route: "/jaguarcar", /* PAGE LINK */
      description: "Introducing a new era characterised by the advent of all-electric vehicles, combining exhilarating performance, dramatic design, and a captivating sense of theatre."
    },
    {
      name: "BMW",
      key: "bmw",
      route: "/bmwcar",
      description: "Introducing a new era defined by the seamless fusion of dynamic performance, intelligent design, and sustainable luxury."
    },
    {
      name: "Ford",
      key: "ford",
      route: "/fordcar",
      description: "Introducing a new era characterized by the powerful transformation of electric mobility, combining rugged capability, innovative technology, and a commitment to everyday utility."
    },
    {
      name: "Audi",
      key: "audi",
      route: "/audicar",
      description: "Introducing a new era characterized by the progressive evolution of electric mobility, combining sophisticated design, exhilarating performance, and cutting-edge technology."
    },
    {
      name: "RangeRover",
      key: "discovery",
      route: "/rangerovercar",
      description: "Introducing a new era characterized by the uncompromising evolution of electric capability, combining legendary luxury, commanding presence, and silent power."
    },
    {
      name: "RollsRoyls",
      key: "rollsroyls",
      route: "/rollsroylscar",
      description: "Introducing a new era defined by the whisper-quiet ascent into electric super-luxury, combining unparalleled craftsmanship, serene performance, and an ethereal sense of presence."
    },
    {
      name: "Mercedes",
      key: "mercedes",
      route: "/mercedescar",
      description: "Introducing a new era characterized by the pioneering spirit of electric innovation, combining iconic luxury, refined performance, and intuitive technology."
    }
  ];

  return (
    <div className="app-luxury-vehicle-page">
      <LoadingOverlay isLoading={isLoading} />
      <div className="app-luxury-page-header">
        <h2>LUXURY VEHICLE</h2>
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

export default Luxuryvh;

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

// const Luxuryvh = () => {
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(false); // For the global loading overlay
//     const [loadingJaguar, setLoadingJaguar] = useState(false);
//     const [loadingBmw, setLoadingBmw] = useState(false);
//     const [loadingFord, setLoadingFord] = useState(false);
//     const [loadingAudi, setLoadingAudi] = useState(false);
//     const [loadingDiscovery, setLoadingDiscovery] = useState(false);
//     const [loadingRollsRoyls, setLoadingRollsRoyls] = useState(false);
//     const [loadingMercedes, setLoadingMercedes] = useState(false);


//     const handleVehicleClick = (brand, navigateTo, setLoader) => {
//         setLoader(true);
//         setIsLoading(true);

//         setTimeout(() => {
//             setIsLoading(false);
//             setLoader(false);
//             navigate(navigateTo);
//         }, 2000);
//     };
//     const handleJaguarClick = () => handleVehicleClick("jaguar", "/jaguar", setLoadingJaguar);
//     const handleBmwClick = () => handleVehicleClick("bmw", "/bmw", setLoadingBmw);
//     const handleFordClick = () => handleVehicleClick("ford", "/ford", setLoadingFord);
//     const handleAudiClick = () => handleVehicleClick("ford", "/ford", setLoadingAudi);
//     const handleDiscoveryClick = () => handleVehicleClick("ford", "/ford", setLoadingDiscovery);
//     const handleRollsRoylsClick = () => handleVehicleClick("ford", "/ford", setLoadingRollsRoyls);
//     const handleMercedesClick = () => handleVehicleClick("ford", "/ford", setLoadingMercedes);

//     return (
//         <div className="app-luxury-vehicle-page">
//             <LoadingOverlay isLoading={isLoading} /> {/* Global loading animation */}

//             <div className="app-luxury-page-header">
//                 <h2>LUXURY VEHICLE</h2>
//             </div>

//             <div className="app-detail-section">
//                 {/* Content for detail section if any */}
//             </div>

//             <div className="app-row">
//                 {/* Jaguar Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-jaguar app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Jaguar</h2>
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
//                 {/* BMW Card */}
//                 <div className="app-col-md-6">
//                     {loadingBmw ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-bmw app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">BMW</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era defined by the seamless fusion of <strong>dynamic performance, intelligent design, and sustainable luxury</strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleBmwClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* Ford Card */}
//                 <div className="app-col-md-6">
//                     {loadingFord ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-ford app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Ford</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong>powerful transformation of electric mobility, combining rugged capability, innovative technology, and a commitment to everyday utility</strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleFordClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* Audi Card */}
//                 <div className="app-col-md-6">
//                     {loadingAudi ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-audi app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Audi</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong>progressive evolution of electric mobility, combining sophisticated design, exhilarating performance, and cutting-edge technology</strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleAudiClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* Discovery Card */}
//                 <div className="app-col-md-6">
//                     {loadingDiscovery ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-discovery app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">RangeRover</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong>uncompromising evolution of electric capability, combining legendary luxury, commanding presence, and silent power</strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleDiscoveryClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* RollsRoyls Card */}
//                 <div className="app-col-md-6">
//                     {loadingRollsRoyls ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-rollsroyls app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">RollsRoyls</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era defined by the <strong>whisper-quiet ascent into electric super-luxury, combining unparalleled craftsmanship, serene performance, and an ethereal sense of presence</strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleRollsRoylsClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* Mercedes Card */}
//                 <div className="app-col-md-6">
//                     {loadingMercedes ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-mercedes app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Mercedes</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong> pioneering spirit of electric innovation, combining iconic luxury, refined performance, and intuitive technology</strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleMercedesClick}>
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

// export default Luxuryvh;



