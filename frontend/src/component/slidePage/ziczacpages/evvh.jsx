import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./combineouter.css";

import bmwImg from "../../slidePage/ziczacpages/assetziczac/evimg/bmwEV.webp";
import kiaImg from "../../slidePage/ziczacpages/assetziczac/evimg/kiaEV.webp";
import mercedesImg from "../../slidePage/ziczacpages/assetziczac/evimg/mercedesEV.webp";
import teslaImg from "../../slidePage/ziczacpages/assetziczac/evimg/teslaEV.webp";

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

const Evvh = () => {
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
      name: "BMW",
      key: "bmwEV",
      route: "/bmwcarev",
      image: bmwImg,
      description:
        "Introducing a new era characterised by the advent of all-electric vehicles, combining exhilarating performance, dramatic design, and a captivating sense of theatre.",
    },
    {
      name: "Kia",
      key: "kiaEV",
      route: "/kiacarev",
      image: kiaImg,
      description:
        "Introducing a new era defined by the seamless fusion of dynamic performance, intelligent design, and sustainable luxury.",
    },
    {
      name: "Mercedes",
      key: "mercedesEV",
      route: "/mercedescarev",
      image: mercedesImg,
      description:
        "Introducing a new era characterized by the powerful transformation of electric mobility, combining rugged capability, innovative technology, and a commitment to everyday utility.",
    },
    {
      name: "Tesla",
      key: "teslaEV",
      route: "/teslacarev",
      image: teslaImg,
      description:
        "Introducing a new era characterized by the progressive evolution of electric mobility, combining sophisticated design, exhilarating performance, and cutting-edge technology.",
    },
  ];

  return (
    <div className="app-luxury-vehicle-page">
      <LoadingOverlay isLoading={isLoading} />

      <header className="app-luxury-page-header">
        <h2>Electric Vehicles (EV)</h2>
        <p className="app-subtitle">Explore the future of premium electric mobility</p>
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

export default Evvh;
