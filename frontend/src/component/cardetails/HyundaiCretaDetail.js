import React, { useState, useRef } from "react";
import './Details.css';
import './temp.css'; // Assuming this contains general styles

const HyundaiCretaDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const car = {
    name: "Hyundai Creta Facelift (2024 Model Year)",
    price: "₹11.00 – ₹20.15 Lakh (Ex-showroom)", // Clarified price type
    mileage: "17.4 – 21.8 km/l (ARAI)", // Clarified mileage standard
    description:
      "The Hyundai Creta is a premium compact SUV, widely acclaimed for its contemporary design, feature-rich cabin, and versatile powertrain options. The 2024 facelift brings a refreshed look, advanced technology, and enhanced safety, cementing its position as a segment leader. It offers petrol, turbo-petrol, and diesel engine choices, catering to diverse driving preferences.",
    details: {
      engine: {
        petrolNA: "1.5L MPi Petrol (115 PS, 144 Nm)", // N.A. Petrol
        turboPetrol: "1.5L Kappa Turbo GDi Petrol (160 PS, 253 Nm)", // Added Turbo Petrol
        diesel: "1.5L U2 CRDi Diesel (116 PS, 250 Nm)" // Clarified diesel engine name
      },
      transmission: "6-speed Manual / IVT (CVT) / 7-speed DCT / 6-speed Automatic (Torque Converter)", // More descriptive
      fuelOptions: "Petrol, Turbo Petrol & Diesel", // Updated fuel options
      safetyRating: "5 Stars (ASEAN NCAP, for new gen)", // Clarified NCAP rating
      segment: "Compact SUV",
      launched: "First Generation: 2015, Facelift (2nd Gen): January 2024", // More detailed launch info
      evAvailable: false,
      dimensions: { // Grouped dimensions
        length: "4330 mm", // Updated length for 2024 facelift
        width: "1790 mm",
        height: "1635 mm",
        wheelbase: "2610 mm",
        bootSpace: "433 Litres",
        groundClearance: "190 mm",
        fuelTankCapacity: "50 Litres"
      },
      interiorFeatures: [
        "Integrated 10.25” Touchscreen Infotainment & Digital Instrument Cluster",
        "Panoramic Sunroof",
        "Wireless Phone Charging",
        "Ventilated Front Seats",
        "8-speaker Bose Premium Sound System",
        "Dual-Zone Automatic Climate Control",
        "Connected Car Technology (Bluelink)",
        "Leatherette Upholstery",
        "8-way Power Adjustable Driver Seat",
        "Ambient Lighting",
        "Rear AC Vents"
      ],
      exteriorFeatures: [
        "Parametric Jewel Design Radiator Grille",
        "Horizon LED Positioning Lamp & DRLs",
        "Quad-beam LED Headlamps",
        "New Design 17-inch Alloy Wheels",
        "Connected LED Tail Lamps",
        "Roof Rails",
        "Shark Fin Antenna"
      ],
      safetyFeatures: [
        "6 Airbags (Standard across variants)",
        "Electronic Stability Control (ESC)",
        "Vehicle Stability Management (VSM)",
        "Hill Start Assist Control (HAC)",
        "All Disc Brakes",
        "Tyre Pressure Monitoring System (TPMS) (Highline)",
        "Rear Parking Sensors",
        "Rear Camera with Dynamic Guidelines",
        "ISOFIX Child Seat Mounts",
        "ABS with EBD"
      ],
      adasFeatures: [ // Features part of ADAS Level 2
        "Forward Collision Warning & Avoidance Assist (Car, Pedestrian, Cycle, Junction Turning)",
        "Blind-Spot Collision Warning & Avoidance Assist",
        "Lane Keeping Assist",
        "Lane Departure Warning",
        "Adaptive Cruise Control with Stop & Go",
        "High Beam Assist",
        "Leading Vehicle Departure Alert",
        "Rear Cross-Traffic Collision Warning & Avoidance Assist",
        "360-degree Camera with Blind View Monitor"
      ],
      colorOptions: [
        { name: "Atlas White", hex: "#f0f0f0" },
        { name: "Abyss Black", hex: "#1a1a1a" },
        { name: "Titan Grey", hex: "#4b4b4b" },
        { name: "Fiery Red", hex: "#b22222" },
        { name: "Robust Emerald Pearl", hex: "#254117" },
        { name: "Ranger Khaki", hex: "#726d52" },
        { name: "Starry Night", hex: "#36454F" },
        { name: "Atlas White with Abyss Black Roof", hex: "#f0f0f0", dualTone: true }
      ]
    }
  };

  // 360° Image Viewer
  const totalImages = 35; // Assuming you have 35 images for the 360 view for Creta
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
    <div className="car-detail-page"> {/* Consistent class name */}
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
                  src={`/images/creta/abyss-black_${index}.png`} // Ensure image paths are correct
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

      <div className="car-detail-section">
        <h1>{car.name}</h1>
        <p className="lead-description">{car.description}</p>

        <div className="key-highlights">
          <p><strong>Price:</strong> {car.price}</p>
          <p><strong>Mileage:</strong> {car.mileage}</p>
        </div>

        {/* Tab Buttons */}
        <div className="tab-buttons">
          <button
            className={activeTab === "overview" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={activeTab === "specs" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("specs")}
          >
            Specifications
          </button>
          <button
            className={activeTab === "colors" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("colors")}
          >
            Colors
          </button>
          <button
            className={activeTab === "features" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("features")}
          >
            Features
          </button>
        </div>

        {/* Tab Content - Conditionally render based on activeTab state */}
        {activeTab === "overview" && (
          <div className="tab-content active">
            <h2>Segment</h2>
            <p>{car.details.segment}</p>
            <h2>Launch Information</h2>
            <p>{car.details.launched}</p>
            <p>
              <strong>EV Variant Available:</strong>{" "}
              {car.details.evAvailable ? "Yes" : "No"}
            </p>
            <h2>Interior Highlights</h2>
            <p>The 2024 Creta's cabin is a blend of sophistication and technology, featuring dual integrated screens, a panoramic sunroof, and premium materials. Comfort is prioritized with ventilated seats and dual-zone climate control, making every journey enjoyable.</p>
            <h2>Exterior Highlights</h2>
            <p>The facelifted Creta boasts a striking new design with a bolder grille, connected LED lighting signature, and redesigned bumpers. Its sharp lines and confident stance give it a modern and assertive road presence.</p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="tab-content active">
            <h2>Fuel & Engine</h2>
            <p>
              <strong>Fuel Type:</strong> {car.details.fuelOptions}
            </p>
            <p>
              <strong>Petrol Engine:</strong> {car.details.engine.petrolNA}
            </p>
            <p>
              <strong>Turbo Petrol Engine:</strong> {car.details.engine.turboPetrol}
            </p>
            <p>
              <strong>Diesel Engine:</strong> {car.details.engine.diesel}
            </p>

            <h2>Transmission</h2>
            <p>{car.details.transmission}</p>

            <h2>Fuel Efficiency & Performance</h2>
            <p>
              <strong>ARAI Mileage:</strong> {car.mileage}
            </p>
            <p>
              <strong>Fuel Tank Capacity:</strong> {car.details.dimensions.fuelTankCapacity}
            </p>

            <h2>Dimensions</h2>
            {Object.entries(car.details.dimensions).map(([key, value]) => (
              <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').replace('kerb', 'Kerb').replace('fuelTankCapacity', 'Fuel Tank Capacity')}: </strong>{value}</p>
            ))}
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
                      marginBottom: "0.5rem",
                    }}
                  ></div>
                  <small>{c.name} {c.dualTone && "(Dual Tone)"}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="tab-content active">
            <h2>Safety Features</h2>
            <p>
              <strong>ASEAN NCAP Rating:</strong> {car.details.safetyRating}
            </p>
            <ul>
              {car.details.safetyFeatures.map((item, i) => <li key={i}>✅ {item}</li>)}
            </ul>

            <h2>Interior Features</h2>
            <ul>{car.details.interiorFeatures.map((item, i) => <li key={i}>✅ {item}</li>)}</ul>

            <h2>Exterior Features</h2>
            <ul>{car.details.exteriorFeatures.map((item, i) => <li key={i}>✅ {item}</li>)}</ul>

            <h2>Advanced Driver Assistance Systems (ADAS Level 2)</h2>
            <ul>{car.details.adasFeatures.map((item, i) => <li key={i}>✅ {item}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HyundaiCretaDetail;