import React, { useState, useRef } from "react";
import './Details.css'; // Assuming this holds general component styles
import './temp.css'; // Assuming this holds specific temporary/utility styles

const MarutSwiftDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentIndex, setCurrentIndex] = useState(1);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Total images for the 360-degree view. Make sure this is accurate.
  const totalImages = 71; 

  const car = {
    name: "Maruti Suzuki Swift (2024)",
    price: "₹6.49 Lakh – ₹9.64 Lakh (Ex-showroom, Delhi)",
    // Mileage: Latest ARAI figures for India-spec 2024 Swift
    mileage: "24.80 kmpl (Petrol MT) - 25.75 kmpl (Petrol AMT) - 30.90 km/kg (CNG)", 
    description:
      "The latest generation Maruti Swift, launched in May 2024, is a highly anticipated hatchback in India. Known for its fresh, sporty design, improved performance, and enhanced fuel efficiency, it continues to attract young buyers and families alike. With its compact size, stylish looks, and fun-to-drive nature, the new Swift now comes with significant updates in safety and features.",
    details: {
      engine: {
        // Updated engine details for the new 1.2L Z-Series engine
        petrol: "1.2L Z-Series, 3-cylinder DualJet Dual VVT Petrol (82 PS @ 5700 rpm, 112 Nm @ 4300 rpm)",
        // CNG specs for the same Z-Series engine
        cnp: "1.2L Z-Series CNG (71.6 PS @ 6000 rpm, 95 Nm @ 4000 rpm)",
      },
      transmission: "5-speed Manual / 5-speed AMT",
      fuelOptions: "Petrol, Petrol+CNG",
      // Updated safety rating context for India-spec model
      safetyRating: "4 Stars (Japan NCAP for new gen, Indian rating pending for Bharat NCAP)", 
      segment: "Hatchback",
      launched: "First Gen: 2005, Latest Gen: May 2024",
      evAvailable: false,
      dimensions: {
        length: "3860 mm", // Updated for 2024 model
        width: "1735 mm",
        height: "1520 mm",
        wheelbase: "2450 mm",
        groundClearance: "163 mm",
        bootSpace: "265 Litres", // Updated boot space
        fuelTankCapacity: "37 Litres",
      },
      interiorFeatures: [
        "9-inch SmartPlay Pro+ Touchscreen Infotainment System",
        "Wireless Apple CarPlay & Android Auto",
        "Arkamys Surround Sense Audio System (6-speaker setup in top variants)", // More detail
        "Automatic Climate Control",
        "Steering Mounted Controls",
        "Semi-digital Instrument Cluster with 4.2-inch MID", // More specific
        "Rear AC Vents (New Addition)",
        "Type-A & Type-C USB Charging Ports (Front & Rear)",
        "Keyless Entry & Go with Push Start/Stop Button",
        "Height Adjustable Driver Seat",
        "60:40 Split Rear Seats",
        "Cruise Control", // Added
        "Wireless Phone Charger", // Added
        "New Fabric Upholstery" // Added
      ],
      exteriorFeatures: [
        "Sporty Front Bumper with Large Gloss Black Grille", // More specific
        "Sleek LED Projector Headlamps with Boomerang DRLs", // More specific
        "LED Fog Lamps",
        "New Design 15-inch Dual-tone Alloy Wheels", // New design for 2024
        "Floating Roof Design",
        "Integrated Spoiler",
        "Body-Colored ORVMs with Integrated Turn Indicators",
        "New LED Tail Lamps with C-shaped pattern", // More specific
        "Rear Door Handles now conventionally placed" // Significant design change
      ],
      safetyFeatures: [
        "6 SRS Airbags (Standard across all variants)", // Crucial update for 2024 model
        "ABS (Anti-lock Braking System) with EBD (Electronic Brake-force Distribution)",
        "Brake Assist (BA)",
        "ESP (Electronic Stability Program) (Standard)", // Now standard on all variants
        "Hill Hold Assist (Standard on AMT variants)",
        "Rear Parking Sensors",
        "Rear View Camera with Guidelines",
        "ISOFIX Child Seat Mounts",
        "Seat Belt Reminders for all occupants",
        "Speed Alert System",
        "Electronic Vehicle Stability Control (EVS)" // Often grouped with ESP, but good to list
      ],
      adasFeatures: [
        "None (Comprehensive ADAS suite is NOT offered in India-spec Swift yet)", // Important clarification for Indian market
      ],
      colorOptions: [
        { name: "Solid Fire Red", hex: "#CD202C" }, // Refined HEX
        { name: "Luster Blue", hex: "#4169E1" }, // Refined HEX
        { name: "Pearl Arctic White", hex: "#F8F8FF" },
        { name: "Magma Grey", hex: "#555555" },
        { name: "Sizzling Red with Bluish Black Roof", hex: "#8B0000" }, // Approximate HEX for dual tone
        { name: "Pearl Arctic White with Bluish Black Roof", hex: "#F8F8FF" }, // Same White, implied black roof
        { name: "Luster Blue with Bluish Black Roof", hex: "#4169E1" }, // Same Blue, implied black roof
        { name: "Splendid Silver", hex: "#C0C0C0" },
        { name: "Novel Orange", hex: "#FF8C00" },
        { name: "Bluish Black (Solid)", hex: "#000000" }, // Solid black option
      ],
    },
  };

  // 360-degree viewer logic (kept largely as is, it's functional)
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
    // Adjust sensitivity for smoother or faster rotation
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
    // Adjust sensitivity for touch devices
    if (Math.abs(delta) > 15) { 
      setCurrentIndex(prev => (prev + (delta > 0 ? -1 : 1) - 1 + totalImages) % totalImages + 1);
      startX.current = e.touches[0].clientX;
    }
  };
  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="car-detail-page">
      <div className="car360-section">
        <h3 className="section-title">360° Exterior Experience</h3>
        <p className="section-subtitle">Click and drag (or swipe) the vehicle image to rotate.</p>
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
                src={`/images/swift/SUZUKI_SWIFT_EXT_360_RED_V-1_${i + 1}.webp`}
                alt={`swift-view-${i + 1}`}
                style={{
                  visibility: i + 1 === currentIndex ? "visible" : "hidden",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  userSelect: 'none', // Prevent image dragging behavior
                  WebkitUserSelect: 'none', // For Webkit browsers
                  MozUserSelect: 'none', // For Mozilla Firefox
                  msUserSelect: 'none', // For Internet Explorer/Edge
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
          <button className={activeTab === "features" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("features")}>Features & Safety</button>
        </div>

        {activeTab === "overview" && (
          <div className="tab-content active">
            <h2>Overview</h2>
            <p><strong>Segment:</strong> {car.details.segment}</p>
            <p><strong>Launch Information:</strong> {car.details.launched}</p>
            <p><strong>EV Variant Available:</strong> {car.details.evAvailable ? "Yes" : "No"}</p>
            
            <h3>Interior Highlights</h3>
            <p>The 2024 Swift features a modern and ergonomic interior, designed for comfort and convenience. It boasts a new 9-inch SmartPlay Pro+ infotainment system with wireless Apple CarPlay & Android Auto, Arkamys Surround Sense Audio System, automatic climate control, and improved material quality. The cabin offers ample space for a car of its segment, providing a pleasant driving and passenger experience with practical storage solutions and the addition of rear AC vents.</p>
            
            <h3>Exterior Highlights</h3>
            <p>The new Swift sports a refreshed and sportier exterior design with a bolder front fascia, a larger gloss black grille, redesigned LED projector headlamps with integrated boomerang DRLs, and new 15-inch dual-tone alloy wheel designs. Its signature floating roof design is retained, giving it a dynamic and youthful appeal. The redesigned LED tail lamps with a C-shaped pattern and conventionally placed rear door handles further enhance its modern stance on the road, perfectly blending aesthetics with aerodynamics.</p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="tab-content active">
            <h2>Fuel & Engine</h2>
            <p><strong>Fuel Type:</strong> {car.details.fuelOptions}</p>
            <p><strong>Petrol Engine:</strong> {car.details.engine.petrol}</p>
            {car.details.engine.cnp && <p><strong>CNG Engine:</strong> {car.details.engine.cnp}</p>}

            <h2>Transmission</h2>
            <p>{car.details.transmission}</p>

            <h2>Fuel & Performance</h2>
            <p><strong>ARAI Certified Mileage:</strong> {car.mileage}</p>
            <p><strong>Fuel Tank Capacity:</strong> {car.details.dimensions.fuelTankCapacity}</p>

            <h2>Dimensions & Capacity</h2>
            <p><strong>Length:</strong> {car.details.dimensions.length}</p>
            <p><strong>Width:</strong> {car.details.dimensions.width}</p>
            <p><strong>Height:</strong> {car.details.dimensions.height}</p>
            <p><strong>Wheelbase:</strong> {car.details.dimensions.wheelbase}</p>
            <p><strong>Boot Space:</strong> {car.details.dimensions.bootSpace}</p>
            <p><strong>Ground Clearance:</strong> {car.details.dimensions.groundClearance}</p>
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
                  <small>{c.name}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="tab-content active">
            <h2>Safety Features</h2>
            <p><strong>Safety Rating (Global NCAP):</strong> {car.details.safetyRating}</p>
            <ul>
              {car.details.safetyFeatures.map((item, i) => <li key={i}> {item}</li>)}
            </ul>

            <h2>Interior Features</h2>
            <ul>
              {car.details.interiorFeatures.map((item, i) => <li key={i}> {item}</li>)}
            </ul>

            <h2>Exterior Features</h2>
            <ul>
              {car.details.exteriorFeatures.map((item, i) => <li key={i}> {item}</li>)}
            </ul>

            <h2>Advanced Driver Assistance Systems (ADAS)</h2>
            <p className="adas-note">
              {car.details.adasFeatures.map((item, i) => <span key={i}>{item}</span>)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarutSwiftDetail;