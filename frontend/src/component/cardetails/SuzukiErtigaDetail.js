// src/component/cardetails/ErtigaDetail.jsx
import React, { useState, useRef } from "react";
import './Details.css'; // Assuming your existing CSS is in Details.css

const SuzukiErtigaDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const car = {
    name: "Maruti Suzuki Ertiga",
    price: "₹8.96 – ₹13.26 Lakh (Ex-showroom, Delhi)",
    mileage: "20.30 kmpl (Petrol AT) – 26.11 km/kg (CNG)",
    description:
      "The Maruti Suzuki Ertiga is a popular 7-seater MPV known for its spacious and comfortable cabin, fuel-efficient engines (Petrol and CNG), and practical features. It offers a smooth ride and is a versatile choice for Indian families.",
    details: {
      engine: {
        petrol: "1.5L K15C Smart Hybrid Petrol (101.65 PS @ 6000 rpm, 136.8 Nm @ 4400 rpm)",
        cng: "1.5L K15C Smart Hybrid CNG (87.83 PS @ 5500 rpm, 121.5 Nm @ 4200 rpm)",
      },
      transmission: "5-speed Manual / 6-speed Automatic (Torque Converter)",
      fuelOptions: "Petrol & CNG",
      safetyRating: "3 Stars (Global NCAP)", // For Adult and Child Occupant Protection
      features: [
        "7-inch SmartPlay Pro Touchscreen Infotainment System",
        "Apple CarPlay & Android Auto (Wireless in top variants)",
        "Voice Command & OTA Updates",
        "15-inch Dual-Tone Alloy Wheels",
        "Dual Front Airbags (Standard)",
        "ABS with EBD",
        "Electronic Stability Program (ESP)",
        "Hill Hold Control",
        "Rear Parking Sensors & Rearview Camera",
        "LED Tail Lamps with 3D Origami Style Design",
        "Halogen Projector Headlamps with Chrome Accents",
        "LED DRLs (Daytime Running Lamps)",
        "Smart Keyless Entry with Push Start/Stop Button",
        "Automatic Climate Control with Rear AC Vents",
        "Cruise Control",
        "Cooled Cup Holders in Center Console",
        "Second-row One-Touch Tumble and Slide Function",
        "Third-row 50:50 Split with Recline Function",
        "Front Seat Back Pockets & Charging Ports (12V outlets)",
      ],
      colorOptions: [
        { name: "Pearl Metallic Auburn Red", hex: "#6A1B1A" },
        { name: "Metallic Magma Grey", hex: "#505050" },
        { name: "Pearl Metallic Oxford Blue", hex: "#0A0F4A" },
        { name: "Splendid Silver", hex: "#C0C0C0" },
        { name: "Pearl Arctic White", hex: "#FFFFFF" },
        { name: "Dignity Brown", hex: "#4B2E21" }, // Example brown color, adjust hex if needed
        { name: "Bluish Black", hex: "#2C3539" }, // Example bluish black, adjust hex if needed
      ],
      segment: "Compact MPV (Multi-Purpose Vehicle)",
      launched: "First Generation: 2012, Latest Facelift: April 2022",
      evAvailable: false,
      dimensions: {
        length: "4395 mm",
        width: "1735 mm",
        height: "1690 mm",
        wheelbase: "2740 mm",
        bootSpace: "209 Litres (all rows up), expandable to 550 Litres (3rd row folded), 803 Litres (2nd & 3rd row folded)",
        groundClearance: "185 mm",
        fuelTankCapacity: "45 Litres",
      },
    },
  };

  const totalImages = 71; // Assuming you have 71 images for the 360 view
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
            onMouseLeave={handleMouseUp}
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
                  src={`/images/ertiga/${index}.png`}
                  alt={`ertiga-view-${index}`}
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
            <p>Spacious cabin with flexible 3-row seating, premium dual-tone dashboard with wood finish, and a modern infotainment unit.</p>
            <h2>Exterior Highlights</h2>
            <p>Dynamic chrome winged front grille, sleek LED tail lamps, stylish dual-tone alloys, and an aerodynamic body for enhanced urban and highway aesthetics.</p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="tab-content active">
            <h2>Fuel & Engine</h2>
            <p>
              <strong>Fuel Type:</strong> {car.details.fuelOptions}
            </p>
            <p>
              <strong>Petrol Engine:</strong> {car.details.engine.petrol}
            </p>
            {car.details.engine.cng && (
              <p>
                <strong>CNG Engine:</strong> {car.details.engine.cng}
              </p>
            )}

            <h2>Transmission</h2>
            <p>{car.details.transmission}</p>

            <h2>Fuel & Performance</h2>
            <p>
              <strong>Mileage (ARAI):</strong> {car.mileage}
            </p>
            <p>
              <strong>Fuel Tank Capacity:</strong> {car.details.dimensions.fuelTankCapacity}
            </p>

            <h2>Dimensions</h2>
            <p>
              <strong>Length:</strong> {car.details.dimensions.length}
            </p>
            <p>
              <strong>Width:</strong> {car.details.dimensions.width}
            </p>
            <p>
              <strong>Height:</strong> {car.details.dimensions.height}
            </p>
            <p>
              <strong>Wheelbase:</strong> {car.details.dimensions.wheelbase}
            </p>
            <p>
              <strong>Boot Space:</strong> {car.details.dimensions.bootSpace}
            </p>
            <p>
              <strong>Ground Clearance:</strong> {car.details.dimensions.groundClearance}
            </p>
          </div>
        )}

        {activeTab === "colors" && (
          <div className="tab-content active">
            <h2>Available Colors</h2>
            <div className="color-swatches">
              {car.details.colorOptions.map((c, index) => (
                <div key={index} className="color-swatch-item"> {/* Added class for consistent styling */}
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
                  <small>{c.name}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="tab-content active">
            <h2>Safety</h2>
            <p>
              <strong>Global NCAP Rating:</strong> {car.details.safetyRating}
            </p>
            <ul>
              {car.details.features
                .filter(feature =>
                  feature.includes("Airbag") ||
                  feature.includes("ABS") ||
                  feature.includes("ESP") ||
                  feature.includes("Hill Hold Control") ||
                  feature.includes("Rear Parking Sensors") ||
                  feature.includes("Rearview Camera") ||
                  feature.includes("Speed Alert")
                )
                .map((feature, i) => (
                  <li key={i}>✅ {feature}</li>
                ))}
                <li>ISOFIX Child Seat Mounts</li> {/* Commonly available safety feature */}
                <li>Seat Belt Reminders for Front & Rear</li>
            </ul>

            <h2>Key Comfort & Convenience Features</h2>
            <ul>
              {car.details.features
                .filter(feature =>
                  !(feature.includes("Airbag") ||
                    feature.includes("ABS") ||
                    feature.includes("ESP") ||
                    feature.includes("Hill Hold Control") ||
                    feature.includes("Rear Parking Sensors") ||
                    feature.includes("Rearview Camera") ||
                    feature.includes("Speed Alert"))
                )
                .map((feature, i) => (
                  <li key={i}>✅ {feature}</li>
                ))}
                <li>Power Windows (All Four)</li>
                <li>Adjustable Steering (Tilt)</li>
                <li>Height Adjustable Driver Seat</li>
                <li>Central Locking</li>
            </ul>
            <h2>ADAS Features</h2>
            <p>Not Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuzukiErtigaDetail;