import React, { useState, useRef } from "react";
import "./Details.css";
import "./temp.css"; // Assuming this contains general styles

const HyundaiCretaDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedColor, setSelectedColor] = useState(0);

  const car = {
    name: "Hyundai Creta Facelift (2024 Model Year)",
    price: "₹11.00 – ₹20.15 Lakh (Ex-showroom, India)",
    mileage: "17.4 – 21.8 km/l (ARAI Certified)",
    description:
      "The 2024 Hyundai Creta facelift is a premium compact SUV that redefines its segment with bold styling, advanced features, and enhanced safety. It offers multiple engine choices — petrol, turbo-petrol, and diesel — with a wide range of transmissions. Packed with ADAS, connected car technology, and premium interiors, the new Creta continues to be the benchmark in India’s SUV market.",
    details: {
      engine: {
        petrolNA: "1.5L MPi Petrol — 115 PS, 144 Nm",
        turboPetrol: "1.5L Kappa Turbo GDi Petrol — 160 PS, 253 Nm",
        diesel: "1.5L U2 CRDi Diesel — 116 PS, 250 Nm",
      },
      transmission:
        "6-speed Manual, IVT (CVT), 7-speed DCT, 6-speed Automatic (Torque Converter)",
      drivetrain: "Front-Wheel Drive (FWD)",
      fuelOptions: "Petrol, Turbo Petrol, Diesel",
      safetyRating: "5 Stars (ASEAN NCAP, 2nd Gen Platform)",
      segment: "Compact SUV",
      launched: "2nd Gen Facelift — January 2024 (India)",
      variants: "7 trims — E, EX, S, S(O), SX, SX Tech, SX(O)",
      evAvailable: false,
      warranty: "3 Years / 100,000 km (extendable up to 7 years)",
      dimensions: {
        length: "4330 mm",
        width: "1790 mm",
        height: "1635 mm",
        wheelbase: "2610 mm",
        bootSpace: "433 Litres",
        groundClearance: "190 mm",
        fuelTankCapacity: "50 Litres",
      },
      interiorFeatures: [
        "Integrated 10.25” Touchscreen Infotainment & Digital Instrument Cluster",
        "Panoramic Sunroof",
        "Wireless Phone Charging",
        "Ventilated Front Seats",
        "8-speaker Bose Premium Sound System",
        "Dual-Zone Automatic Climate Control",
        "Connected Car Technology (Bluelink, OTA updates)",
        "Leatherette Upholstery",
        "8-way Power Adjustable Driver Seat",
        "Ambient Lighting",
        "Rear AC Vents",
      ],
      exteriorFeatures: [
        "New Parametric Jewel Design Radiator Grille",
        "Horizon LED Positioning Lamp & DRLs",
        "Quad-beam LED Headlamps",
        "17-inch Diamond-cut Alloy Wheels",
        "Connected LED Tail Lamps",
        "Roof Rails",
        "Shark Fin Antenna",
        "Dual-tone Roof Option (in select colors)",
      ],
      safetyFeatures: [
        "6 Airbags (Standard across variants)",
        "Electronic Stability Control (ESC)",
        "Vehicle Stability Management (VSM)",
        "Hill Start Assist Control (HAC)",
        "All-Wheel Disc Brakes",
        "Tyre Pressure Monitoring System (TPMS, Highline in top trims)",
        "Rear Parking Sensors",
        "Rear Camera with Dynamic Guidelines",
        "ISOFIX Child Seat Mounts",
        "ABS with EBD",
      ],
      adasFeatures: [
        "Forward Collision Warning & Avoidance Assist (Car, Pedestrian, Cycle, Junction Turning)",
        "Blind-Spot Collision Warning & Avoidance Assist",
        "Lane Keeping Assist",
        "Lane Departure Warning",
        "Adaptive Cruise Control with Stop & Go",
        "High Beam Assist",
        "Leading Vehicle Departure Alert",
        "Rear Cross-Traffic Collision Warning & Avoidance Assist",
        "360-degree Camera with Blind View Monitor",
      ],
      colorOptions: [
        { name: "Atlas White", hex: "#f0f0f0" },
        { name: "Abyss Black", hex: "#1a1a1a" },
        { name: "Titan Grey", hex: "#4b4b4b" },
        { name: "Fiery Red", hex: "#b22222" },
        { name: "Robust Emerald Pearl", hex: "#254117" },
        { name: "Ranger Khaki", hex: "#726d52" },
        { name: "Starry Night", hex: "#36454F" },
        { name: "Atlas White with Abyss Black Roof", hex: "#f0f0f0", dualTone: true },
      ],
    },
  };


  // 360° Image Viewer
  const totalImages = 35;
  const [currentIndex, setCurrentIndex] = useState(1);
  const isDragging = useRef(false);
  const startX = useRef(0);

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
      setCurrentIndex((prev) => {
        let newIndex = prev + (delta > 0 ? -1 : 1);
        if (newIndex < 1) newIndex = totalImages;
        if (newIndex > totalImages) newIndex = 1;
        return newIndex;
      });
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
      setCurrentIndex((prev) => {
        let newIndex = prev + (delta > 0 ? -1 : 1);
        if (newIndex < 1) newIndex = totalImages;
        if (newIndex > totalImages) newIndex = 1;
        return newIndex;
      });
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
        <p className="section-subtitle">Click and turn the vehicle image to the left or right.</p>
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
            {[...Array(totalImages)].map((_, i) => {
              const index = i + 1;
              return (
                <img
                  key={index}
                  src={`/images/creta/abyss-black_${index}.png`}
                  alt={`creta-view-${index}`}
                  style={{
                    visibility: index === currentIndex ? "visible" : "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              );
            })}
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

        {/* Tab Buttons */}
        <div className="tab-buttons">
          <button className={activeTab === "overview" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("overview")}>Overview</button>
          <button className={activeTab === "specs" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("specs")}>Specifications</button>
          <button className={activeTab === "colors" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("colors")}>Colors</button>
          <button className={activeTab === "features" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("features")}>Features</button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="tab-content360 active">
            <h2>Segment</h2>
            <p>{car.details.segment}</p>
            <h2>Launch Information</h2>
            <p>{car.details.launched}</p>
            <p><strong>EV Variant Available:</strong> {car.details.evAvailable ? "Yes" : "No"}</p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="tab-content360 active">
            <h2>Fuel & Engine</h2>
            <p><strong>Fuel Type:</strong> {car.details.fuelOptions}</p>
            <p><strong>Petrol Engine:</strong> {car.details.engine.petrolNA}</p>
            <p><strong>Turbo Petrol Engine:</strong> {car.details.engine.turboPetrol}</p>
            <p><strong>Diesel Engine:</strong> {car.details.engine.diesel}</p>
          </div>
        )}

        {activeTab === "colors" && (
          <div className="tab-content360 active">
            <h2>Available Colors</h2>
            <div className="color-swatches">
              {car.details.colorOptions.map((c, index) => (
                <div
                  key={index}
                  className={`color-swatch-item ${selectedColor === index ? "selected" : ""
                    }`}
                  onClick={() => setSelectedColor(index)}
                >
                  <div
                    className="color-swatch-circle"
                    style={{ backgroundColor: c.hex }}
                  ></div>
                  <small className="color-swatch-label">
                    {c.name} {c.dualTone && "(Dual Tone)"}
                  </small>
                </div>
              ))}
            </div>
          </div>
        )}


        {activeTab === "features" && (
          <div className="tab-content360 active">
            <h2>Safety Features</h2>
            <ul>
              {car.details.safetyFeatures.map((item, i) => (
                <li key={i}>
                  <span className="material-symbols-outlined">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>

            <h2>Interior Features</h2>
            <ul>
              {car.details.interiorFeatures.map((item, i) => (
                <li key={i}>
                  <span className="material-symbols-outlined">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>

            <h2>Exterior Features</h2>
            <ul>
              {car.details.exteriorFeatures.map((item, i) => (
                <li key={i}>
                  <span className="material-symbols-outlined">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>

            <h2>Advanced Driver Assistance Systems (ADAS Level 2)</h2>
            <ul>
              {car.details.adasFeatures.map((item, i) => (
                <li key={i}>
                  <span className="material-symbols-outlined">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HyundaiCretaDetail;
