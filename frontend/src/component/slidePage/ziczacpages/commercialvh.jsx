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

const Commercialvh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const [loadingStates, setLoadingStates] = useState({
    mahindrapickup: false,
    isuzupickup: false,
    ashokpickup: false,
    suzukipickup: false,
  });

  // ✅ Wait until all local images load before removing loader
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
      name: "Mahindra",
      key: "mahindrapickup",
      route: "/mahindrapickup",
      image: "/images/mahindrapickup.webp",
      description:
        "Introducing a new era characterised by the advent of all-electric vehicles, combining exhilarating performance, dramatic design, and a captivating sense of theatre.",
    },
    {
      name: "ISUZU",
      key: "isuzupickup",
      route: "/isuzupickup",
      image: "/images/isuzupickup.webp",
      description:
        "Introducing a new era defined by the seamless fusion of dynamic performance, intelligent design, and sustainable luxury.",
    },
    {
      name: "Ashok LayLand",
      key: "ashokpickup",
      route: "/ashokpickup",
      image: "/images/ashokpickup.webp",
      description:
        "Introducing a new era characterized by the powerful transformation of electric mobility, combining rugged capability, innovative technology, and a commitment to everyday utility.",
    },
    {
      name: "Suzuki",
      key: "suzukipickup",
      route: "/suzukipickup",
      image: "/images/suzukipickup.webp",
      description:
        "Introducing a new era characterized by the progressive evolution of electric mobility, combining sophisticated design, exhilarating performance, and cutting-edge technology.",
    },
  ];

  return (
    <div className="app-luxury-vehicle-page">
      <LoadingOverlay isLoading={isLoading} />
      <div className="app-luxury-page-header">
        <h2>COMMERCIAL VEHICLE</h2>
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
                    style={{ display: "none" }} // hidden but still triggers load
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

export default Commercialvh;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import "./combineouter.css";

// const LoadingOverlay = ({ isLoading }) => {
//   if (!isLoading) return null;
//   return (
//     <div className="app-loading-overlay">
//       <div className="app-glass-loader">
//         <div className="app-spinner"></div>
//         <p className="app-loading-text">
//           <i className="bi bi-lightning-charge-fill"></i> Please wait... loading details
//         </p>
//       </div>
//     </div>
//   );
// };

// const Commercialvh = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const fromNavigation = location.state?.fromCardClick || false;
//   const [isLoading, setIsLoading] = useState(true); // default true

//   const [loadingStates, setLoadingStates] = useState({
//     bmwEV: false,
//     kiaEV: false,
//     mercedesEV: false,
//     teslaEV: false,
//   });

//   useEffect(() => {
//   const timeout = setTimeout(() => {
//     setIsLoading(false); // hide after full load
//   }, 2000); // or 500ms

//   return () => clearTimeout(timeout);
// }, []); // ✅ only run once on first mount


//   const handleVehicleClick = (brand, route) => {
//     setLoadingStates(prev => ({ ...prev, [brand]: true }));
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setLoadingStates(prev => ({ ...prev, [brand]: false }));
//       navigate(route);
//     }, 2000);
//   };

//   const vehicles = [
//     {
//       name: "Mahindra", /* TITLE */
//       key: "mahindrapickup", /* CSS CODE AND IMG LINK NAME */
//       route: "/mahindrapickup", /* PAGE LINK */
//       description: "Introducing a new era characterised by the advent of all-electric vehicles, combining exhilarating performance, dramatic design, and a captivating sense of theatre."
//     },
//     {
//       name: "ISUZU",
//       key: "isuzupickup",
//       route: "/isuzupickup",
//       description: "Introducing a new era defined by the seamless fusion of dynamic performance, intelligent design, and sustainable luxury."
//     },
//     {
//       name: "Ashok LayLand",
//       key: "ashokpickup",
//       route: "/ashokpickup",
//       description: "Introducing a new era characterized by the powerful transformation of electric mobility, combining rugged capability, innovative technology, and a commitment to everyday utility."
//     },
//     {
//       name: "Suzuki",
//       key: "suzukipickup",
//       route: "/suzukipickup",
//       description: "Introducing a new era characterized by the progressive evolution of electric mobility, combining sophisticated design, exhilarating performance, and cutting-edge technology."
//     },
//   ];

//   return (
//     <div className="app-luxury-vehicle-page">
//       <LoadingOverlay isLoading={isLoading} />
//       <div className="app-luxury-page-header">
//         <h2>COMMERCIAL VEHICLE</h2>
//       </div>
//       <div className="app-row">
//         {vehicles.map(vehicle => (
//           <div className="app-col-md-6" key={vehicle.key}>
//             {loadingStates[vehicle.key] ? (
//               <div className="app-luxury-card app-loading-card app-appear-intro"></div>
//             ) : (
//               <div className={`app-luxury-card app-luxury-card-${vehicle.key} app-appear-intro`}>
//                 <div className="app-card-caption-wrapper">
//                   <h2 className="app-margin-bottom-2">{vehicle.name}</h2>
//                   <p className="app-margin-bottom-paragraph">{vehicle.description}</p>
//                   <a className="app-readmore-cta" onClick={() => handleVehicleClick(vehicle.key, vehicle.route)}>
//                     Visit website
//                   </a>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Commercialvh;

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

// const Commercialvh = () => {
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
//                 <h2>COMMERCIAL VEHICLE</h2>
//             </div>

//             <div className="app-detail-section">
//                 {/* Content for detail section if any */}
//             </div>

//             <div className="app-row">
//                 {/* Mahindra Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-mahindrapickup app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Mahindra</h2>
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
//                 {/* isuzu Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-isuzupickup app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">ISUZU</h2>
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
//                 {/* Ashok layland Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-ashokpickup app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Ford</h2>
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
//                 {/* suzuki pickup Card */}
//                 <div className="app-col-md-6">
//                     {loadingJaguar ? (
//                         // Display an empty div or a placeholder if you want to keep space
//                         // The image is removed as requested.
//                         <div className="app-luxury-card app-loading-card app-appear-intro">
//                             {/* No image or text inside this card's loading state now */}
//                         </div>
//                     ) : (
//                         // Display actual Jaguar card content
//                         <div className="app-luxury-card app-luxury-card-suzukipickup app-appear-intro">
//                             <div className="app-card-caption-wrapper">
//                                 <h2 className="app-margin-bottom-2">Suzuki</h2>
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

// export default Commercialvh;
