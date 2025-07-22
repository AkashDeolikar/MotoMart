import React, { useState, useRef } from "react";
import './Details.css';
import './temp.css';

const HondaActivaDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentIndex, setCurrentIndex] = useState(1);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const totalImages = 23;

  const car = {
    name: "Honda Activa 110 (2025)",
    price: "₹83,097 - ₹96,117 (Ex-showroom, Maharashtra)",
    mileage: "Approx. 60-65 kmpl (Company Claimed)",
    description:
      "The 2025 Honda Activa 110 is India’s most trusted scooter, now better than ever. Equipped with an OBD2B-compliant PGM-FI engine and exciting features like Bluetooth connectivity, digital console, and enhanced convenience. It comes in 3 variants: Standard, DLX, and H-Smart — built for refined performance, urban agility, and long-lasting reliability.",
    details: {
      engine: {
        displacement: "109.51cc, Single-Cylinder, Air-Cooled, PGM-FI, OBD2B",
        power: "5.88 kW @ 8000 rpm",
        torque: "9.05 Nm @ 5500 rpm",
        emissionStandard: "BS6 Phase 2 (OBD2B)"
      },
      transmission: "CVT (Automatic)",
      fuelOptions: "Petrol",
      safetyRating: "Not rated by NCAP, includes CBS & Smart Features",
      segment: "110cc Scooter",
      launched: "January 23, 2025",
      variants: ["Standard", "Deluxe", "H-Smart"],
      features: [
        "4.2-inch TFT digital meter (DLX & H-Smart)",
        "Bluetooth with Honda RoadSync",
        "Turn-by-turn navigation (via app)",
        "Call & SMS alerts (via app)",
        "Idling Stop System",
        "Silent Start with ACG",
        "External Fuel Filler Cap",
        "USB Type-C Charger",
        "Combi-Brake System (CBS)",
        "Smart Key (H-Smart)",
        "Anti-theft & Engine Immobilizer (H-Smart)"
      ],
      colorOptions: [
        { name: "Pearl Precious White", hex: "#f8f8ff" },
        { name: "Decent Blue Metallic", hex: "#4169e1" },
        { name: "Pearl Igneous Black", hex: "#000000" },
        { name: "Mat Axis Gray Metallic", hex: "#555555" },
        { name: "Rebel Red Metallic", hex: "#b22222" },
        { name: "Pearl Siren Blue", hex: "#4682b4" }
      ]
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseLeave = () => { isDragging.current = false; };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 5) {
      setCurrentIndex(prev => (prev + (delta > 0 ? -1 : 1) - 1 + totalImages) % totalImages + 1);
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
      setCurrentIndex(prev => (prev + (delta > 0 ? -1 : 1) - 1 + totalImages) % totalImages + 1);
      startX.current = e.touches[0].clientX;
    }
  };
  const handleTouchEnd = () => { isDragging.current = false; };

  return (
    <div className="car-detail-page">
      <div className="car360-section">
        <h3 className="section-title">360° Experience</h3>
        <p className="section-subtitle">Swipe or drag to rotate the scooter image</p>
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
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="car-detail-section">
        <h1>{car.name}</h1>
        <p className="lead-description">{car.description}</p>

        <div className="key-highlights">
          <p><strong>Price:</strong> {car.price}</p>
          <p><strong>Mileage:</strong> {car.mileage}</p>
        </div>

        <div className="tab-buttons">
          <button className={activeTab === "overview" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("overview")}>Overview</button>
          <button className={activeTab === "specs" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("specs")}>Specifications</button>
          <button className={activeTab === "colors" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("colors")}>Colors</button>
          <button className={activeTab === "features" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("features")}>Features</button>
        </div>

        {activeTab === "overview" && (
          <div className="tab-content active">
            <h2>Segment</h2>
            <p>{car.details.segment}</p>
            <h2>Launch Date</h2>
            <p>{car.details.launched}</p>
            <h2>Variants</h2>
            <ul>
              {car.details.variants.map((variant, i) => (
                <li key={i}>✅ {variant}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "specs" && (
  <div className="tab-content active">
    <h2>Engine & Transmission</h2>
    <p><strong>Displacement:</strong> {car.details.engine.displacement}</p>
    <p><strong>Power:</strong> {car.details.engine.power}</p>
    <p><strong>Torque:</strong> {car.details.engine.torque}</p>
    <p><strong>Emission Standard:</strong> {car.details.engine.emissionStandard}</p>
    <p><strong>Transmission:</strong> {car.details.transmission}</p>
    <p><strong>Fuel Type:</strong> {car.details.fuelOptions}</p>

    <h2>Performance & Efficiency</h2>
    <p><strong>Claimed Mileage:</strong> {car.mileage}</p>
    <p><strong>Fuel Tank Capacity:</strong> 5.3 Litres</p>
    <p><strong>Underseat Storage:</strong> Approx. 18 Litres</p>

    <h2>Chassis & Dimensions</h2>
    <p><strong>Seat Height:</strong> 692 mm</p>
    <p><strong>Ground Clearance:</strong> 162 mm</p>
    <p><strong>Wheelbase:</strong> 1260 mm</p>
    <p><strong>Kerb Weight:</strong> Approx. 105–106 kg</p>

    <h2>Tyres & Brakes</h2>
    <p><strong>Tyre Size (Front):</strong> 90/90-12 (Tubeless)</p>
    <p><strong>Tyre Size (Rear):</strong> 90/100-10 (Tubeless)</p>
    <p><strong>Wheel Type:</strong> Alloy (DLX & H-Smart), Steel (STD)</p>
  </div>
)}


        {activeTab === "colors" && (
          <div className="tab-content active">
            <h2>Available Colors</h2>
            <div className="color-swatches">
              {car.details.colorOptions.map((c, index) => (
                <div key={index} className="color-swatch-item">
                  <div
                    style={{
                      backgroundColor: c.hex,
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      border: "2px solid #ccc",
                      marginBottom: "0.5rem"
                    }}
                  ></div>
                  <small>{c.name}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="tab-content active">
            <h2>Key Features</h2>
            <ul>
              {car.details.features.map((item, i) => (
                <li key={i}>✅ {item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HondaActivaDetail;
