import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./combineouter.css";

import audiImg from "../../slidePage/ziczacpages/assetziczac/audi.WebP";
import bmwImg from "../../slidePage/ziczacpages/assetziczac/bmwnew.WebP";
import discoveryImg from "../../slidePage/ziczacpages/assetziczac/discovery.WebP";
import fordImg from "../../slidePage/ziczacpages/assetziczac/ford.WebP";
import jaguarImg from "../../slidePage/ziczacpages/assetziczac/jaguarnew.WebP";
import rollsroylsImg from "../../slidePage/ziczacpages/assetziczac/rollsroyls.WebP";
import mercedesImg from "../../slidePage/ziczacpages/assetziczac/mercedesnew.WebP";

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

const Luxuryvh = () => {
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
      name: "Jaguar",
      key: "jaguar",
      route: "/jaguarcar",
      image: jaguarImg,
      description:
        "A new era of all-electric vehicles combining exhilarating performance, dramatic design, and captivating theatre.",
    },
    {
      name: "BMW",
      key: "bmw",
      route: "/bmwcar",
      image: bmwImg,
      description:
        "Seamlessly fusing dynamic performance, intelligent design, and sustainable luxury.",
    },
    {
      name: "Ford",
      key: "ford",
      route: "/fordcar",
      image: fordImg,
      description:
        "Rugged capability and innovative tech meet the electric transformation of everyday mobility.",
    },
    {
      name: "Audi",
      key: "audi",
      route: "/audicar",
      image: audiImg,
      description:
        "Progressive electric mobility: sophisticated design, exhilarating performance, and cutting-edge tech.",
    },
    {
      name: "Range Rover",
      key: "discovery",
      route: "/rangerovercar",
      image: discoveryImg,
      description:
        "Legendary luxury and silent electric power, redefined for a commanding presence.",
    },
    {
      name: "Rolls-Royce",
      key: "rollsroyls",
      route: "/rollsroylscar",
      image: rollsroylsImg,
      description:
        "Whisper-quiet electric super-luxury with unparalleled craftsmanship and serene performance.",
    },
    {
      name: "Mercedes",
      key: "mercedes",
      route: "/mercedescar",
      image: mercedesImg,
      description:
        "Iconic luxury meets pioneering electric innovation with refined performance and intuitive tech.",
    },
  ];

  return (
    <div className="app-luxury-vehicle-page">
      <LoadingOverlay isLoading={isLoading} />

      <header className="app-luxury-page-header">
        <h2>Luxury Vehicles</h2>
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

export default Luxuryvh;
