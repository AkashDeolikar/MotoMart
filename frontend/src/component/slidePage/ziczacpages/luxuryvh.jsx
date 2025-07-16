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

// const Luxuryvh = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const fromNavigation = location.state?.fromCardClick || false;
//   const [isLoading, setIsLoading] = useState(true); // default true

//   const [loadingStates, setLoadingStates] = useState({
//     jaguar: false,
//     bmw: false,
//     ford: false,
//     audi: false,
//     discovery: false,
//     rollsroyls: false,
//     mercedes: false,
//   });

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);

//     return () => clearTimeout(timeout);
//   }, []); 
//   // useEffect(() => {
//   //   const handlePageLoad = () => {
//   //     setIsLoading(false);
//   //   };

//   //   // Check if already loaded
//   //   if (document.readyState === "complete") {
//   //     handlePageLoad();
//   //   } else {
//   //     window.addEventListener("load", handlePageLoad);
//   //   }

//   //   return () => window.removeEventListener("load", handlePageLoad);
//   // }, []);


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
//       name: "Jaguar",/* TITLE */
//       key: "jaguar",/* CSS CODE AND IMG LINK NAME */
//       route: "/jaguarcar", /* PAGE LINK */
//       description: "Introducing a new era characterised by the advent of all-electric vehicles, combining exhilarating performance, dramatic design, and a captivating sense of theatre."
//     },
//     {
//       name: "BMW",
//       key: "bmw",
//       route: "/bmwcar",
//       description: "Introducing a new era defined by the seamless fusion of dynamic performance, intelligent design, and sustainable luxury."
//     },
//     {
//       name: "Ford",
//       key: "ford",
//       route: "/fordcar",
//       description: "Introducing a new era characterized by the powerful transformation of electric mobility, combining rugged capability, innovative technology, and a commitment to everyday utility."
//     },
//     {
//       name: "Audi",
//       key: "audi",
//       route: "/audicar",
//       description: "Introducing a new era characterized by the progressive evolution of electric mobility, combining sophisticated design, exhilarating performance, and cutting-edge technology."
//     },
//     {
//       name: "RangeRover",
//       key: "discovery",
//       route: "/rangerovercar",
//       description: "Introducing a new era characterized by the uncompromising evolution of electric capability, combining legendary luxury, commanding presence, and silent power."
//     },
//     {
//       name: "RollsRoyls",
//       key: "rollsroyls",
//       route: "/rollsroylscar",
//       description: "Introducing a new era defined by the whisper-quiet ascent into electric super-luxury, combining unparalleled craftsmanship, serene performance, and an ethereal sense of presence."
//     },
//     {
//       name: "Mercedes",
//       key: "mercedes",
//       route: "/mercedescar",
//       description: "Introducing a new era characterized by the pioneering spirit of electric innovation, combining iconic luxury, refined performance, and intuitive technology."
//     }
//   ];

//   return (
//     <div className="app-luxury-vehicle-page">
//       <LoadingOverlay isLoading={isLoading} />
//       <div className="app-luxury-page-header">
//         <h2>LUXURY VEHICLE</h2>
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

// export default Luxuryvh;

import React, { useState, useEffect, useLayoutEffect } from "react";
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

  const [isLoading, setIsLoading] = useState(true);

  const [loadingStates, setLoadingStates] = useState({
    jaguar: false,
    bmw: false,
    ford: false,
    audi: false,
    discovery: false,
    rollsroyls: false,
    mercedes: false,
  });

  // 👇 This runs after DOM (images) is painted
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

    // Delay execution slightly to ensure DOM is ready
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
      name: "Jaguar",
      key: "jaguar",
      route: "/jaguarcar",
      image: "/images/jaguar.webp",
      description:
        "Introducing a new era characterised by the advent of all-electric vehicles, combining exhilarating performance, dramatic design, and a captivating sense of theatre.",
    },
    {
      name: "BMW",
      key: "bmw",
      route: "/bmwcar",
      image: "/images/bmw.webp",
      description:
        "Introducing a new era defined by the seamless fusion of dynamic performance, intelligent design, and sustainable luxury.",
    },
    {
      name: "Ford",
      key: "ford",
      route: "/fordcar",
      image: "/images/ford.webp",
      description:
        "Introducing a new era characterized by the powerful transformation of electric mobility, combining rugged capability, innovative technology, and a commitment to everyday utility.",
    },
    {
      name: "Audi",
      key: "audi",
      route: "/audicar",
      image: "/images/audi.webp",
      description:
        "Introducing a new era characterized by the progressive evolution of electric mobility, combining sophisticated design, exhilarating performance, and cutting-edge technology.",
    },
    {
      name: "RangeRover",
      key: "discovery",
      route: "/rangerovercar",
      image: "/images/discovery.webp",
      description:
        "Introducing a new era characterized by the uncompromising evolution of electric capability, combining legendary luxury, commanding presence, and silent power.",
    },
    {
      name: "RollsRoyls",
      key: "rollsroyls",
      route: "/rollsroylscar",
      image: "/images/rollsroyls.webp",
      description:
        "Introducing a new era defined by the whisper-quiet ascent into electric super-luxury, combining unparalleled craftsmanship, serene performance, and an ethereal sense of presence.",
    },
    {
      name: "Mercedes",
      key: "mercedes",
      route: "/mercedescar",
      image: "/images/mercedes.webp",
      description:
        "Introducing a new era characterized by the pioneering spirit of electric innovation, combining iconic luxury, refined performance, and intuitive technology.",
    },
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
                {/* ✅ Add real image so loader waits */}
                <img src={vehicle.image} alt={vehicle.name} loading="lazy" style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
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
