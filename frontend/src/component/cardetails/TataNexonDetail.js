// src/component/cardetails/TataNexonDetail.jsx
import React, { useState, useRef } from "react";
import './Details.css'; // Assuming your existing CSS is in Details.css
import './temp.css'; // Assuming you have some temporary CSS here too

const TataNexonDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedColor, setSelectedColor] = useState(0);

  const car = {
    name: "Tata Nexon Facelift (2025 Model Year)",
    price: "₹8.00 – ₹15.60 Lakh (Ex-showroom, India)",
    mileage:
      "Petrol: 17.01 – 19.4 km/l | Diesel: 23.23 – 24.08 km/l | CNG: 17.44 km/kg (Company claimed/ARAI)",
    description:
      "The 2025 Tata Nexon facelift is a feature-rich compact SUV, offering bold styling, premium interiors, connected tech, and robust safety with a 5-star GNCAP rating. Available in Petrol, Diesel, and iCNG options, it supports manual, AMT, and DCT transmissions — making it one of the most versatile SUVs in its segment. Tata Nexon EV is also sold alongside.",
    image:
      "https://imgd.aeplcdn.com/0x0/n/cw/ec/149209/nexon-facelift-exterior-right-front-three-quarter-2.jpeg", // official facelift image
    details: {
      engine: {
        petrol:
          "1.2L Turbo Revotron, 3-Cylinder Petrol – 120 PS @ 5500 rpm, 170 Nm @ 1750–4000 rpm",
        diesel:
          "1.5L Revotorq, 4-Cylinder Diesel – 115 PS @ 3750 rpm, 260 Nm @ 1500–2750 rpm",
        cng: "1.2L Turbo iCNG, 3-Cylinder Petrol+CNG – 100 PS, 170 Nm",
      },
      transmission:
        "5MT / 6MT / 6AMT / 7DCA (Petrol) | 6MT / 6AMT (Diesel) | 6MT (CNG)",
      fuelOptions: "Petrol, Diesel, Petrol+CNG",
      topSpeed: "Approx. 180 km/h",
      acceleration: "0–100 km/h in ~11.5s (Petrol DCT)",
      safetyRating: "5 Stars (Global NCAP, 2023 – latest protocol)",
      segment: "Compact SUV",
      launched:
        "First Generation: 2017 | Facelift: September 2023 | Model Year Update: 2025",
      evAvailable: true, // Nexon EV Prime/Max available
      dimensions: {
        length: "3995 mm",
        width: "1804 mm",
        height: "1620 mm",
        wheelbase: "2498 mm",
        groundClearance: "208 mm",
        bootSpace: "382 Litres",
        fuelTank: "44 Litres",
        kerbWeight: "1185–1305 kg (varies by variant)",
      },
      interiorFeatures: [
        "10.25-inch Floating Touchscreen Infotainment",
        "10.25-inch Fully Digital Instrument Cluster with Navigation",
        "Wireless Android Auto & Apple CarPlay",
        "Ventilated Front Seats",
        "Premium Leatherette Upholstery (Top Variants)",
        "2-Spoke Steering Wheel with Illuminated Tata Logo",
        "Touch-based Climate Control Panel",
        "Ambient Cabin Lighting",
        "Wireless Phone Charger",
        "Rear AC Vents",
        "iRA Connected Car Tech (with SOS & Breakdown Assist)",
        "Air Purifier",
        "Auto-dimming IRVM",
      ],
      exteriorFeatures: [
        "Split LED Headlamp Setup with Sequential DRLs",
        "Connected LED Tail Lamps with Y-shaped Signature",
        "New Grille & Sporty Bumper Design",
        "16-inch Diamond-cut Alloy Wheels (New Design)",
        "Electric Sunroof (Panoramic in higher trims)",
        "Dual-tone Exterior Options",
        "Roof Rails & Shark Fin Antenna",
        "Rear Wiper & Washer",
      ],
      safetyFeatures: [
        "6 Airbags (Standard)",
        "ABS with EBD",
        "Electronic Stability Program (ESP)",
        "Hill Hold Control",
        "Traction Control & Roll-over Mitigation",
        "Tyre Pressure Monitoring System (TPMS)",
        "Brake Disc Wiping",
        "ISOFIX Child Seat Mounts",
        "Seatbelt Reminders (All Occupants)",
        "5-Star Global NCAP Crash Rating",
      ],
      adasFeatures: [
        "360° Surround View Camera",
        "Blind View Monitor (indicator-linked)",
        "Front Parking Sensors",
        "Reverse Parking Sensors with Dynamic Guidelines",
        "Rear Camera",
        "Cruise Control",
        "Auto Headlamps & Rain-Sensing Wipers",
        "Auto Hold Function (DCT only)",
      ],
      colorOptions: [
        { name: "Fearless Purple", hex: "#4A004A" },
        { name: "Creative Ocean", hex: "#004B4B" },
        { name: "Pristine White", hex: "#F5F5DC" },
        { name: "Daytona Grey", hex: "#4A4A4A" },
        { name: "Flame Red", hex: "#CC0000" },
        { name: "Grassland Beige", hex: "#B8B880" },
        { name: "Pure Grey", hex: "#708090" },
      ],
    },
  };


  const totalImages = 34; // Assuming you have 34 images for the 360 view for Nexon
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
                  src={`/images/nexon/PureGrey-${index}.png`} // Assuming image paths for Nexon 360 images
                  alt={`nexon-view-${index}`}
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
          <div className="tab-content360 active">
            <h2>Segment</h2>
            <p>{car.details.segment}</p>
            <h2>Launch Information</h2>
            <p>{car.details.launched}</p>
            <p>
              <strong>EV Variant Available:</strong>{" "}
              {car.details.evAvailable ? "Yes" : "No"}
            </p>
            <h2>Interior Highlights</h2>
            <p>Experience a futuristic cabin with a large touchscreen, fully digital driver display, ventilated seats, and multi-mode drive selector. The new 2-spoke steering wheel with an illuminated logo adds to the premium feel.</p>
            <h2>Exterior Highlights</h2>
            <p>The Nexon facelift commands attention with its striking split-headlamp design, connected LED DRLs and tail lamps, bold grille, and new alloy wheel designs. Its coupe-like stance gives it a dynamic and sporty appearance.</p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="tab-content360 active">
            <h2>Fuel & Engine</h2>
            <p>
              <strong>Fuel Type:</strong> {car.details.fuelOptions}
            </p>
            <p>
              <strong>Petrol Engine:</strong> {car.details.engine.petrol}
            </p>
            <p>
              <strong>Power (Petrol):</strong> {car.details.engine.powerPetrol}
            </p>
            <p>
              <strong>Torque (Petrol):</strong> {car.details.engine.torquePetrol}
            </p>
            <p>
              <strong>Diesel Engine:</strong> {car.details.engine.diesel}
            </p>
            <p>
              <strong>Power (Diesel):</strong> {car.details.engine.powerDiesel}</p>
            <p>
              <strong>Torque (Diesel):</strong> {car.details.engine.torqueDiesel}</p>
            {car.details.engine.cng && (
              <>
                <p>
                  <strong>CNG Engine:</strong> {car.details.engine.cng}
                </p>
                <p>
                  <strong>Power (CNG):</strong> {car.details.engine.powerCNG}
                </p>
                <p>
                  <strong>Torque (CNG):</strong> {car.details.engine.torqueCNG}
                </p>
              </>
            )}

            <h2>Transmission</h2>
            <p>{car.details.transmission}</p>

            <h2>Fuel Efficiency & Performance</h2>
            <p>
              <strong>ARAI Mileage:</strong> {car.mileage}
            </p>
            <p>
              <strong>Top Speed:</strong> {car.details.topSpeed}
            </p>
            <p>
              <strong>Acceleration (0–100 km/h):</strong> {car.details.acceleration}
            </p>
            <p>
              <strong>Fuel Tank Capacity:</strong> {car.details.dimensions.fuelTank}
            </p>

            <h2>Dimensions</h2>
            {Object.entries(car.details.dimensions).map(([key, value]) => (
              <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').replace('kerb', 'Kerb')}: </strong>{value}</p>
            ))}
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
            <p>
              <strong>Global NCAP Rating:</strong> {car.details.safetyRating}
            </p>
            <ul>
              {car.details.safetyFeatures.map((item, i) => <li key={i}><span className="material-symbols-outlined">check_circle</span>{item}</li>)}
            </ul>

            <h2>Interior Features</h2>
            <ul>{car.details.interiorFeatures.map((item, i) => <li key={i}><span className="material-symbols-outlined">check_circle</span>{item}</li>)}</ul>

            <h2>Exterior Features</h2>
            <ul>{car.details.exteriorFeatures.map((item, i) => <li key={i}><span className="material-symbols-outlined">check_circle</span>{item}</li>)}</ul>

            <h2>Advanced Driver Assistance Systems (ADAS)</h2>
            <ul>{car.details.adasFeatures.map((item, i) => <li key={i}><span className="material-symbols-outlined">check_circle</span>{item}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TataNexonDetail;