import React, { useState, useRef, useEffect } from "react";
import "./Details.css";

const HondaActivaDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentIndex, setCurrentIndex] = useState(1);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const [selectedColor, setSelectedColor] = useState(0);


  const totalImages = 23;

  const car = {
    name: "Honda Activa 110 (2025)",
    price: "₹80,950 - ₹95,567 (Ex-showroom, Maharashtra / major cities)",  // approximate range
    mileage: "Approx. 47 kmpl (Company Claim)",
    description:
      "The 2025 Honda Activa 110 brings together performance, convenience, and modern tech. Now compliant with OBD-2B norms, it features a new 4.2-inch TFT display with Bluetooth via RoadSync, navigation & call/SMS alerts via app, Idle-Start-Stop system, USB-C charging, external fuel filler cap. Offered in three variants: Standard, DLX & H-Smart; six color options; built for city agility and reliability.",
    details: {
      engine: {
        displacement: "109.51 cc, Single-Cylinder, Air-Cooled, PGM-FI, OBD2B",
        power: "7.88 bhp (≈5.9 kW) @ 8000 rpm",
        torque: "9.05 Nm @ 5500 rpm",
        emissionStandard: "BS VI (OBD2B)",
      },
      transmission: "Automatic (V-Matic style)",
      fuelOptions: "Petrol",
      safetyRating: "Includes Combi-Brake System (CBS); Smart Key & Engine Immobilizer in H-Smart variant; no NCAP rating yet",
      segment: "110cc Scooter",
      kerbWeight: "106 kg",
      seatHeight: "764 mm",
      fuelTankCapacity: "5.3 L",
      variants: ["Standard", "DLX", "H-Smart"],
      warranty: "3 Years or 36,000 km (whichever comes first)",
      features: [
        "4.2-inch TFT digital meter",
        "Bluetooth via Honda RoadSync",
        "Turn-by-turn navigation / Call & SMS alerts (via app)",
        "Idle Start-Stop System",
        "External Fuel Filler Cap",
        "USB Type-C Charger",
        "Alloy Wheels (DLX & H-Smart variants)",
        "Combi-Brake System (CBS)",
        "Smart Key & Engine Immobilizer (H-Smart)",
      ],
      colorOptions: [
        { name: "Pearl Precious White", hex: "#f8f8ff" },
        { name: "Decent Blue Metallic", hex: "#4169e1" },
        { name: "Pearl Igneous Black", hex: "#000000" },
        { name: "Mat Axis Gray Metallic", hex: "#555555" },
        { name: "Rebel Red Metallic", hex: "#b22222" },
        { name: "Pearl Siren Blue", hex: "#4682b4" },
      ],
      dimensions: {
        length: "1833 mm",
        width: "677 mm",
        height: "1165 mm",
        wheelbase: "1260 mm",
        groundClearance: "162 mm",
      }
    }
  };


  // Refs for smooth scroll + active detection
  const overviewRef = useRef(null);
  const specsRef = useRef(null);
  const colorsRef = useRef(null);
  const featuresRef = useRef(null);

  const sectionRefs = {
    overview: overviewRef,
    specs: specsRef,
    colors: colorsRef,
    features: featuresRef,
  };

  // Scroll into view
  const scrollToSection = (section) => {
    setActiveTab(section);
    sectionRefs[section].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Intersection Observer for auto active tab
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-50% 0px -40% 0px", // triggers when section is middle of screen
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, options);

    Object.keys(sectionRefs).forEach((key) => {
      if (sectionRefs[key].current) {
        observer.observe(sectionRefs[key].current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ---- 360° Image Handling ---- */
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  const handleMouseLeave = () => {
    isDragging.current = false;
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 5) {
      setCurrentIndex(
        (prev) => (prev + (delta > 0 ? -1 : 1) - 1 + totalImages) % totalImages + 1
      );
      startX.current = e.clientX;
    }
  };
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientX - startX.current;
    if (Math.abs(delta) > 15) {
      setCurrentIndex(
        (prev) => (prev + (delta > 0 ? -1 : 1) - 1 + totalImages) % totalImages + 1
      );
      startX.current = e.touches[0].clientX;
    }
  };
  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="car-detail-page">
      {/* LEFT: 360 Viewer */}
      <div className="car360-section">
        <h3 className="section-title">360° Experience</h3>
        <p className="section-subtitle">Swipe or drag to rotate</p>
        <div className="car360-box">
          <div
            className="car360-panorama"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {[...Array(totalImages)].map((_, i) => (
              <img
                key={i}
                className="car360-frame"
                src={`/images/activa/${i + 1}.png`}
                alt={`activa-360-${i + 1}`}
                style={{
                  visibility: i + 1 === currentIndex ? "visible" : "hidden",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Details */}
      <div className="car-detail-section">
        <h1>{car.name}</h1>
        <p className="lead-description">{car.description}</p>

        <div className="key-highlights">
          <p><strong>Price:</strong> {car.price}</p>
          <p><strong>Mileage:</strong> {car.mileage}</p>
        </div>

        {/* Sticky Tab Navigation */}
        <div className="tab-buttons">
          <button className={activeTab === "overview" ? "tab-btn active" : "tab-btn"} onClick={() => scrollToSection("overview")}>Overview</button>
          <button className={activeTab === "specs" ? "tab-btn active" : "tab-btn"} onClick={() => scrollToSection("specs")}>Specifications</button>
          <button className={activeTab === "colors" ? "tab-btn active" : "tab-btn"} onClick={() => scrollToSection("colors")}>Colors</button>
          <button className={activeTab === "features" ? "tab-btn active" : "tab-btn"} onClick={() => scrollToSection("features")}>Features</button>
        </div>

        {/* Sections */}
        <div id="overview" ref={overviewRef} className="tab-content360">
          <h2>Segment</h2>
          <p>{car.details.segment}</p>
          <h2>Launch Date</h2>
          <p>{car.details.launched}</p>
          <h2>Variants</h2>
          <ul>
            {car.details.variants.map((variant, i) => (
              <li key={i}>
                <span className="material-symbols-outlined">check_circle</span>
                {variant}
              </li>
            ))}
          </ul>

        </div>

        <div id="specs" ref={specsRef} className="tab-content360">
          <h2>Engine & Transmission</h2>
          <p><strong>Displacement:</strong> {car.details.engine.displacement}</p>
          <p><strong>Power:</strong> {car.details.engine.power}</p>
          <p><strong>Torque:</strong> {car.details.engine.torque}</p>
          <p><strong>Emission Standard:</strong> {car.details.engine.emissionStandard}</p>
          <p><strong>Transmission:</strong> {car.details.transmission}</p>
          <p><strong>Fuel Type:</strong> {car.details.fuelOptions}</p>
        </div>

        <div id="colors" ref={colorsRef} className="tab-content360">
          <h2>Available Colors</h2>
          <div className="color-swatches">
            {car.details.colorOptions.map((c, index) => (
              <div
                key={index}
                className={`color-swatch-item ${selectedColor === index ? "selected" : ""}`}
                onClick={() => setSelectedColor(index)}
              >
                <div
                  className="color-swatch-circle"
                  style={{ backgroundColor: c.hex }}
                ></div>
                <span className="color-swatch-label">{c.name}</span>
              </div>
            ))}
          </div>
        </div>


        <div id="features" ref={featuresRef} className="tab-content360">
          <h2>Key Features</h2>
          <ul>
            {car.details.features.map((item, i) => (
              <li key={i}>
                <span className="material-symbols-outlined">check_circle</span>
                {item}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default HondaActivaDetail;
