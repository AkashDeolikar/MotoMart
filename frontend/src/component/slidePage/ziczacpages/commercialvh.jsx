import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./combineouter.css";

// Images
import mahindraImg from "../../slidePage/ziczacpages/assetziczac/commercial/mahindrapickup.webp";
import isuzuImg from "../../slidePage/ziczacpages/assetziczac/commercial/isuzu.webp";
import ashokImg from "../../slidePage/ziczacpages/assetziczac/commercial/ashok.webp";
import suzukiImg from "../../slidePage/ziczacpages/assetziczac/commercial/suzuki.webp";

// Global Loading Overlay
const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="app-loading-overlay">
      <div className="app-glass-loader">
        <div className="app-spinner"></div>
        <p className="app-loading-text">Please wait... loading details</p>
      </div>
    </div>
  );
};

const Commercialvh = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});

  // Wait until all images load
  useLayoutEffect(() => {
    const images = Array.from(document.querySelectorAll("img"));
    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const onImgLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) setIsLoading(false);
    };

    images.forEach((img) => {
      if (img.complete) onImgLoad();
      else {
        img.addEventListener("load", onImgLoad);
        img.addEventListener("error", onImgLoad);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", onImgLoad);
        img.removeEventListener("error", onImgLoad);
      });
    };
  }, []);

  const handleVehicleClick = (brand, route) => {
    setLoadingStates((prev) => ({ ...prev, [brand]: true }));
    setIsLoading(true);

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [brand]: false }));
      setIsLoading(false);
      navigate(route);
    }, 1200);
  };

  const vehicles = [
    {
      name: "Mahindra",
      key: "mahindrapickup",
      route: "/mahindrapickup",
      image: mahindraImg,
      description:
        "Introducing a new era characterised by the advent of all-electric vehicles, combining exhilarating performance, dramatic design, and a captivating sense of theatre.",
    },
    {
      name: "ISUZU",
      key: "isuzupickup",
      route: "/isuzupickup",
      image: isuzuImg,
      description:
        "Introducing a new era defined by the seamless fusion of dynamic performance, intelligent design, and sustainable luxury.",
    },
    {
      name: "Ashok LayLand",
      key: "ashokpickup",
      route: "/ashokpickup",
      image: ashokImg,
      description:
        "Introducing a new era characterized by the powerful transformation of electric mobility, combining rugged capability, innovative technology, and a commitment to everyday utility.",
    },
    {
      name: "Suzuki",
      key: "suzukipickup",
      route: "/suzukipickup",
      image: suzukiImg,
      description:
        "Introducing a new era characterized by the progressive evolution of electric mobility, combining sophisticated design, exhilarating performance, and cutting-edge technology.",
    },
  ];

  return (
    <div className="app-luxury-vehicle-page">
      <LoadingOverlay isLoading={isLoading} />

      <header className="app-luxury-page-header">
        <h2>Commercial Vehicles</h2>
        <p className="app-subtitle">Explore the future of commercial electric mobility</p>
      </header>

      <div className="app-grid">
        {vehicles.map((vehicle) => (
          <div className="app-card" key={vehicle.key}>
            <div
              className="app-card-bg"
              style={{ backgroundImage: `url(${vehicle.image})` }}
            />
            <div className="app-card-content">
              <h3>{vehicle.name}</h3>
              <p>{vehicle.description}</p>
              <button
                className="app-cta"
                onClick={() => handleVehicleClick(vehicle.key, vehicle.route)}
              >
                Visit website
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commercialvh;
