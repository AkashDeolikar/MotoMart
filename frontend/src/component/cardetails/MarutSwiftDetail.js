import React, { useState, useRef } from "react";
import './Details.css';
import './temp.css';

const MarutSwiftDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentIndex, setCurrentIndex] = useState(1);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const totalImages = 71; // Ensure this matches the number of 360-degree images you have

  const car = {
    name: "Maruti Suzuki Swift (2024, 4th Gen)",
    price: "₹6.49 – ₹9.64 Lakh (Ex-showroom, Delhi)",
    mileage: "24.80 kmpl (Petrol MT) | 25.75 kmpl (Petrol AMT) | 30.90 km/kg (CNG)",
    description:
      "The all-new 2024 Maruti Suzuki Swift (4th Generation) brings a sportier design, new Z-Series 1.2L engine, improved efficiency, and added safety. With upgraded interiors, tech features, and dual-tone options, the Swift continues to be India’s favorite hatchback, appealing to young buyers and families alike.",
    details: {
      engine: {
        petrol:
          "1.2L Z-Series, 3-cylinder DualJet Dual VVT Petrol — 82 PS @ 5700 rpm, 112 Nm @ 4300 rpm",
        cng:
          "1.2L Z-Series CNG — 77 PS @ 6000 rpm, 98.5 Nm @ 4300 rpm", // corrected specs
      },
      transmission: "5-speed Manual / 5-speed AMT",
      fuelOptions: "Petrol, Petrol+CNG",
      safetyRating: "4 Stars (Japan NCAP for new gen, Global NCAP India rating awaited)",
      segment: "Hatchback",
      launched: "May 2024 (India, 4th Generation)",
      evAvailable: false,
      dimensions: {
        length: "3860 mm",
        width: "1735 mm",
        height: "1520 mm",
        wheelbase: "2450 mm",
        groundClearance: "163 mm",
        bootSpace: "265 Litres",
        fuelTankCapacity: "37 Litres",
      },
      interiorFeatures: [
        "9-inch SmartPlay Pro+ Touchscreen Infotainment System",
        "Wireless Apple CarPlay & Android Auto",
        "Arkamys Surround Sense Audio System",
        "Automatic Climate Control",
        "Steering-Mounted Controls",
        "Semi-Digital Instrument Cluster with MID",
        "Rear AC Vents (new in 2024 gen)",
        "USB Type-A & Type-C Charging (Front & Rear)",
        "Push Button Start/Stop with Smart Key",
        "Height-Adjustable Driver Seat",
        "60:40 Split Folding Rear Seats",
      ],
      exteriorFeatures: [
        "Sporty Mesh Grille with Chrome Accents",
        "LED Projector Headlamps with LED DRLs",
        "LED Fog Lamps",
        "15-inch Dual-Tone Alloy Wheels (new design)",
        "Floating Roof with Dual-Tone Options",
        "Integrated Rear Spoiler",
        "Body-Colored ORVMs with Turn Indicators",
        "C-Shaped LED Tail Lamps",
      ],
      safetyFeatures: [
        "6 Airbags (Top Variants; Dual Front Standard)",
        "ABS with EBD and Brake Assist",
        "Electronic Stability Program (ESP)",
        "Hill Hold Assist (AMT variants)",
        "Rear Parking Sensors",
        "Reverse Camera with Guidelines",
        "ISOFIX Child Seat Mounts",
        "Seatbelt Reminders for All Seats",
        "Speed Alert System",
      ],
      adasFeatures: [
        "Not Available (ADAS not offered on Swift yet)",
      ],
      colorOptions: [
        { name: "Solid Fire Red", hex: "#b22222" },
        { name: "Luster Blue", hex: "#4169e1" },
        { name: "Pearl Arctic White", hex: "#f8f8ff" },
        { name: "Magma Grey", hex: "#555555" },
        { name: "Splendid Silver", hex: "#C0C0C0" },
        { name: "Novel Orange", hex: "#FF8C00" },
        { name: "Bluish Black", hex: "#000000" },
        { name: "Fire Red with Bluish Black Roof", hex: "#8B0000", dualTone: true },
        { name: "Pearl White with Bluish Black Roof", hex: "#f8f8ff", dualTone: true },
      ],
    },
  };


  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  const handleMouseLeave = () => { // Added for better desktop experience
    isDragging.current = false;
  };
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
  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="car-detail-page"> {/* Changed wrapper class for consistency */}
      <div className="car360-section">
        <h3 className="section-title">360° Experience</h3> {/* Changed class for consistency */}
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
            {[...Array(totalImages)].map((_, i) => (
              <img
                key={i}
                className="car360-frame"
                src={`/images/swift/SUZUKI_SWIFT_EXT_360_RED_V-1_${i + 1}.webp`}
                alt={`swift-view-${i + 1}`}
                style={{
                  visibility: i + 1 === currentIndex ? "visible" : "hidden",
                  position: "absolute", // Added for image stacking
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="car-detail-section">
        <h1>{car.name}</h1>
        <p className="lead-description">{car.description}</p>

        <div className="key-highlights"> {/* Added for consistency */}
          <p><strong>Price:</strong> {car.price}</p>
          <p><strong>Mileage:</strong> {car.mileage}</p>
        </div>

        <div className="tab-buttons">
          <button className={activeTab === "overview" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("overview")}>Overview</button>
          <button className={activeTab === "specs" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("specs")}>SpecificationsSpecifications</button>
          <button className={activeTab === "colors" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("colors")}>Colors</button>
          <button className={activeTab === "features" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("features")}>Features</button>
        </div>

        {activeTab === "overview" && (
          <div className="tab-content360 active">
            <h2>Segment</h2>
            <p>{car.details.segment}</p>
            <h2>Launch Information</h2>
            <p>{car.details.launched}</p>
            <p><strong>EV Variant Available:</strong> {car.details.evAvailable ? "Yes" : "No"}</p>
            <h3>Interior Highlights</h3> {/* Added from Innova structure */}
            <p>The 2024 Swift features a modern and ergonomic interior, designed for comfort and convenience. It boasts a new 9-inch SmartPlay Pro+ infotainment system, automatic climate control, and improved material quality. The cabin is spacious for a car of its segment, offering a pleasant driving and passenger experience with practical storage solutions.</p>
            <h3>Exterior Highlights</h3> {/* Added from Innova structure */}
            <p>The new Swift sports a refreshed and sportier exterior design with a bolder front fascia, redesigned LED headlamps with integrated DRLs, and new alloy wheel designs. Its signature floating roof design is retained, giving it a dynamic and youthful appeal on the road, perfectly blending aesthetics with aerodynamics.</p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="tab-content360 active">
            <h2>Fuel & Engine</h2>
            <p><strong>Fuel Type:</strong> {car.details.fuelOptions}</p>
            <p><strong>Petrol Engine:</strong> {car.details.engine.petrol}</p>
            {car.details.engine.cnp && <p><strong>CNG Engine:</strong> {car.details.engine.cnp}</p>} {/* Conditionally render CNG if available */}

            <h2>Transmission</h2>
            <p>{car.details.transmission}</p>

            <h2>Fuel & Performance</h2>
            <p><strong>Mileage:</strong> {car.mileage}</p>
            <p><strong>Fuel Tank Capacity:</strong> {car.details.dimensions.fuelTankCapacity}</p>

            <h2>Dimensions</h2>
            <p><strong>Length:</strong> {car.details.dimensions.length}</p> {/* Use from car.details.dimensions */}
            <p><strong>Width:</strong> {car.details.dimensions.width}</p> {/* Use from car.details.dimensions */}
            <p><strong>Height:</strong> {car.details.dimensions.height}</p> {/* Use from car.details.dimensions */}
            <p><strong>Wheelbase:</strong> {car.details.dimensions.wheelbase}</p>
            <p><strong>Boot Space:</strong> {car.details.dimensions.bootSpace}</p>
            <p><strong>Ground Clearance:</strong> {car.details.dimensions.groundClearance}</p>
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
            <p><strong>Global NCAP Rating:</strong> {car.details.safetyRating}</p>
            <ul>
              {car.details.safetyFeatures.map((item, i) => <li key={i}><span className="material-symbols-outlined">check_circle</span>{item}</li>)} {/* Mapped from new safetyFeatures array */}
            </ul>

            <h2>Interior Features</h2>
            <ul>
              {car.details.interiorFeatures.map((item, i) => <li key={i}><span className="material-symbols-outlined">check_circle</span>{item}</li>)} {/* Mapped from new interiorFeatures array */}
            </ul>

            <h2>Exterior Features</h2>
            <ul>
              {car.details.exteriorFeatures.map((item, i) => <li key={i}><span className="material-symbols-outlined">check_circle</span>{item}</li>)} {/* Mapped from new exteriorFeatures array */}
            </ul>

            <h2>Advanced Driver Assistance Systems (ADAS)</h2>
            <ul>
              {car.details.adasFeatures.map((item, i) => <li key={i}><span className="material-symbols-outlined">check_circle</span>{item}</li>)} {/* Mapped from new adasFeatures array */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarutSwiftDetail;