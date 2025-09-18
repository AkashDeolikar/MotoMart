import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./combineouter.css";

import hondaImg from "../../slidePage/ziczacpages/assetziczac/passengerimg/honda.webp";
import hyundaiImg from "../../slidePage/ziczacpages/assetziczac/passengerimg/hyndai.webp";
import jeepImg from "../../slidePage/ziczacpages/assetziczac/passengerimg/jeep.webp";
import nissanImg from "../../slidePage/ziczacpages/assetziczac/passengerimg/nissan.webp";
import renaultImg from "../../slidePage/ziczacpages/assetziczac/passengerimg/renault.webp";
import suzukiImg from "../../slidePage/ziczacpages/assetziczac/passengerimg/suzuki.webp";

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

const Passengervh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromNavigation = location.state?.fromCardClick || false;

  const [isLoading, setIsLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800); // smooth entry
    return () => clearTimeout(timer);
  }, []);

  const handleVehicleClick = (brand, route) => {
    setLoadingStates((prev) => ({ ...prev, [brand]: true }));
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setLoadingStates((prev) => ({ ...prev, [brand]: false }));
      navigate(route);
    }, 1200);
  };

  const vehicles = [
    {
      name: "Honda",
      key: "honda",
      route: "/hondacar",
      image: hondaImg,
      description:
        "Introducing a new era of all-electric passenger vehicles combining performance, design, and comfort.",
    },
    {
      name: "Hyundai",
      key: "hyundai",
      route: "/hyundaicar",
      image: hyundaiImg,
      description:
        "Seamlessly blending intelligent design, dynamic performance, and sustainable passenger mobility.",
    },
    {
      name: "Jeep",
      key: "jeep",
      route: "/jeepcar",
      image: jeepImg,
      description:
        "Rugged capability and innovative tech meet electric transformation for passenger vehicles.",
    },
    {
      name: "Nissan",
      key: "nissan",
      route: "/nissancar",
      image: nissanImg,
      description:
        "Sophisticated design and exhilarating performance with cutting-edge electric technology.",
    },
    {
      name: "Renault",
      key: "renault",
      route: "/renaultcar",
      image: renaultImg,
      description:
        "Legendary comfort and silent electric power for refined passenger vehicle performance.",
    },
    {
      name: "Suzuki",
      key: "suzuki",
      route: "/suzukicar",
      image: suzukiImg,
      description:
        "Whisper-quiet, efficient, and luxurious passenger vehicles combining craftsmanship and serenity.",
    },
  ];

  return (
    <div className="app-luxury-vehicle-page">
      <LoadingOverlay isLoading={isLoading} />

      <header className="app-luxury-page-header">
        <h2>Passenger Vehicles</h2>
        <p className="app-subtitle">Explore premium electric passenger mobility</p>
      </header>

      <div className="app-grid">
        {vehicles.map((vehicle) => (
          <div className="app-card" key={vehicle.key}>
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="app-card-bg"
              loading="lazy"
p          />
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

export default Passengervh;
