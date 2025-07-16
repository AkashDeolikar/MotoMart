import React, { useState, useLayoutEffect } from "react";
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

const Passengervh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromNavigation = location.state?.fromCardClick || false;
  const [isLoading, setIsLoading] = useState(true);

  const [loadingStates, setLoadingStates] = useState({
    honda: false,
    hyndai: false,
    jeep: false,
    nissan: false,
    renault: false,
    suzuki: false,
  });

  // ✅ Wait for all <img> to load before removing loader
  useLayoutEffect(() => {
    const checkImages = () => {
      const images = Array.from(document.querySelectorAll("img"));
      if (images.length === 0) {
        setIsLoading(false);
        return;
      }

      let loadedCount = 0;
      const onImgLoad = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setIsLoading(false);
        }
      };

      images.forEach(img => {
        if (img.complete) {
          onImgLoad();
        } else {
          img.addEventListener("load", onImgLoad);
          img.addEventListener("error", onImgLoad);
        }
      });

      return () => {
        images.forEach(img => {
          img.removeEventListener("load", onImgLoad);
          img.removeEventListener("error", onImgLoad);
        });
      };
    };

    setTimeout(checkImages, 100);
  }, []);

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
      name: "Honda",
      key: "honda",
      route: "/hondacar",
      image: "/images/honda.webp",
      description:
        "Introducing a new era characterised by the advent of all-electric vehicles, combining exhilarating performance, dramatic design, and a captivating sense of theatre.",
    },
    {
      name: "Hyndai",
      key: "hyndai",
      route: "/hyundaicar",
      image: "/images/hyndai.webp",
      description:
        "Introducing a new era defined by the seamless fusion of dynamic performance, intelligent design, and sustainable luxury.",
    },
    {
      name: "Jeep",
      key: "jeep",
      route: "/jeepcar",
      image: "/images/jeep.webp",
      description:
        "Introducing a new era characterized by the powerful transformation of electric mobility, combining rugged capability, innovative technology, and a commitment to everyday utility.",
    },
    {
      name: "Nissan",
      key: "nissan",
      route: "/nissancar",
      image: "/images/nissan.webp",
      description:
        "Introducing a new era characterized by the progressive evolution of electric mobility, combining sophisticated design, exhilarating performance, and cutting-edge technology.",
    },
    {
      name: "Renault",
      key: "renault",
      route: "/renaultcar",
      image: "/images/renault.webp",
      description:
        "Introducing a new era characterized by the uncompromising evolution of electric capability, combining legendary luxury, commanding presence, and silent power.",
    },
    {
      name: "Suzuki",
      key: "suzuki",
      route: "/suzukicar",
      image: "/images/suzuki.webp",
      description:
        "Introducing a new era defined by the whisper-quiet ascent into electric super-luxury, combining unparalleled craftsmanship, serene performance, and an ethereal sense of presence.",
    },
  ];

  return (
    <div className="app-luxury-vehicle-page">
      <LoadingOverlay isLoading={isLoading} />
      <div className="app-luxury-page-header">
        <h2>PASSENGER VEHICLE</h2>
      </div>
      <div className="app-row">
        {vehicles.map(vehicle => (
          <div className="app-col-md-6" key={vehicle.key}>
            {loadingStates[vehicle.key] ? (
              <div className="app-luxury-card app-loading-card app-appear-intro"></div>
            ) : (
              <div className={`app-luxury-card app-luxury-card-${vehicle.key} app-appear-intro`}>
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  loading="lazy"
                  style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                />
                <div className="app-card-caption-wrapper">
                  <h2 className="app-margin-bottom-2">{vehicle.name}</h2>
                  <p className="app-margin-bottom-paragraph">{vehicle.description}</p>
                  <a
                    className="app-readmore-cta"
                    onClick={() => handleVehicleClick(vehicle.key, vehicle.route)}
                  >
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

export default Passengervh;


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

// const Passengervh = () => {
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
//                 <h2>PASSENGER VEHICLE</h2>
//             </div>

//             <div className="app-detail-section">
//                 {/* Content for detail section if any */}
//             </div>

//             <div className="app-row">
//                 {/* honda Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-honda app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Honda</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong>intelligent engineering of electric mobility, combining reliable performance, versatile design, and a commitment to everyday innovation</strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleJaguarClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* hyndai Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-hyndai app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Hyndai</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong>bold advancement of electric mobility, combining expressive design, intuitive technology, and a commitment to accessible innovation. </strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleJaguarClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* Jeep Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-jeep app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Jeep</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong>electrified evolution of legendary capability, combining iconic adventure, uncompromising power, and a commitment to sustainable exploration.</strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleJaguarClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* nissan Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-nissan app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">nissan</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong>pioneering spirit of electric innovation, combining accessible technology, reliable performance, and a commitment to sustainable driving. </strong>. 
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleJaguarClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* renault Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-renault app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Renault</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong> innovative approach to electric mobility, combining distinctive design, smart technology, and a commitment to European charm. </strong>.
//                                 </p>
//                                 <a className="app-readmore-cta" onClick={handleJaguarClick}>
//                                     Visit website
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* suzuki Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-suzuki app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Suzuki</h2>
//                                 <p className="app-margin-bottom-paragraph">
//                                     Introducing a new era characterized by the <strong>compact efficiency of electric mobility, combining nimble performance, practical design, and a commitment to urban versatility. </strong>.
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

// export default Passengervh;

