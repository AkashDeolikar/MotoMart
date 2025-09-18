// src/component/cardetails/InnovaDetail.jsx
import React, { useState, useRef } from "react";
import './Details.css'; // Assuming your existing CSS is in Details.css

const ToyotaInnovaDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedColor, setSelectedColor] = useState(0);

  const car = {
    name: "Toyota Innova Crysta",
    price: "₹18.25 – ₹25.71 Lakh (Ex-showroom, Delhi)",
    mileage: "11.5 km/l (Petrol, MT) – 15.6 km/l (Diesel, MT/AT)", // ARAI/realistic claimed figures
    description:
      "The Toyota Innova Crysta is India’s most trusted premium MPV, offering supreme comfort, a powerful diesel engine, and Toyota’s legendary reliability. Known for its spacious 7/8-seater cabin, robust build, and strong resale value, the Innova Crysta is the go-to choice for families, corporate use, and long-distance touring.",
    details: {
      engine: {
        petrol:
          "2.7L Dual VVT-i, 4-Cylinder Petrol – 166 PS @ 5200 rpm, 245 Nm @ 4000 rpm",
        diesel:
          "2.4L GD Turbo Diesel, 4-Cylinder – 150 PS @ 3400 rpm, 343 Nm @ 1400–2800 rpm (MT) / 360 Nm (AT)", // clarified AT torque
      },
      transmission: "5-speed Manual / 6-speed Automatic (Torque Converter)",
      fuelOptions: "Petrol & Diesel",
      safetyRating:
        "5 Stars (ASEAN NCAP for previous gen; India model expected strong performance, no GNCAP test yet)",
      segment: "Premium MPV",
      launched:
        "First Generation: 2005 | Innova Crysta Launch: 2016 | Latest Update: 2023 (BS6 Phase-2)",
      evAvailable: false,
      dimensions: {
        length: "4735 mm",
        width: "1830 mm",
        height: "1795 mm",
        wheelbase: "2750 mm",
        groundClearance: "178 mm",
        bootSpace: "300 Litres (with all rows up), expandable to ~900 Litres",
        fuelTankCapacity: "55 Litres",
      },
      interiorFeatures: [
        "8-inch Touchscreen Infotainment with Apple CarPlay & Android Auto",
        "Premium Leather Upholstery (ZX variants)",
        "Automatic Climate Control with Rear Auto AC",
        "Cruise Control",
        "Steering Mounted Audio & Phone Controls",
        "One-Touch Tumble Second Row Seats",
        "Ambient Cabin Lighting",
        "Cooled Upper Glove Box",
        "Foldable Seatback Tables (2nd Row)",
        "Optitron Analog-Digital Instrument Cluster",
        "8-way Power Adjustable Driver Seat",
        "Illuminated Entry System",
        "Smart Entry with Push Button Start/Stop",
      ],
      exteriorFeatures: [
        "Large Piano Black Trapezoidal Grille with Chrome Accents",
        "17-inch Diamond-cut Alloy Wheels",
        "LED Projector Headlamps with LED DRLs",
        "LED Fog Lamps",
        "Chrome Outside Door Handles & Window Line Garnish",
        "Body-colored ORVMs with Integrated Turn Indicators",
        "Shark Fin Antenna",
        "Integrated Rear Spoiler",
      ],
      safetyFeatures: [
        "7 SRS Airbags (Dual Front, Side, Curtain, Driver Knee)",
        "ABS with EBD & Brake Assist",
        "Vehicle Stability Control (VSC)",
        "Hill-Start Assist Control (HAC)",
        "All 3-Point Seatbelts",
        "Rear Parking Sensors",
        "Rear View Camera with Dynamic Guidelines",
        "ISOFIX Child Seat Mounts",
        "Speed-Sensing Auto Door Lock & Impact Sensing Unlock",
        "Engine Immobilizer & Anti-Theft Alarm",
      ],
      adasFeatures: [
        "None (ADAS not available on Innova Crysta; offered only on Innova Hycross)",
      ],
      colorOptions: [
        { name: "Super White", hex: "#F5F5F5" },
        { name: "Attitude Black Mica", hex: "#2C2C30" },
        { name: "Avant-Garde Bronze Metallic", hex: "#6E5849" },
        { name: "Platinum White Pearl", hex: "#EEEEEE" },
        { name: "Silver Metallic", hex: "#C0C0C0" },
        { name: "Sparkling Black Crystal Shine", hex: "#1A1A1A" },
      ],
    },
  };


  const totalImages = 17; // Assuming you have 17 images for the 360 view
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
  }; // Added for better desktop experience
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
                  src={`/images/innova/img_0_0_${index}.png`} // Assuming consistent image paths
                  alt={`innova-view-${index}`}
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
            <p>The Innova Crysta offers a supremely comfortable and spacious cabin with premium materials, supportive seating for up to 7 or 8 passengers, and well-designed ergonomics. Features like automatic climate control, a modern infotainment system, and ample storage contribute to a luxurious travel experience.</p>
            <h2>Exterior Highlights</h2>
            <p>The Innova Crysta boasts a commanding road presence with its bold trapezoidal grille, sleek LED projector headlamps, and chrome accents. Its robust and elegant design is further enhanced by stylish alloy wheels and an aerodynamic silhouette, giving it a sophisticated and dynamic appeal.</p>
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
              <strong>Diesel Engine:</strong> {car.details.engine.diesel}
            </p>

            <h2>Transmission</h2>
            <p>{car.details.transmission}</p>

            <h2>Fuel & Performance</h2>
            <p>
              <strong>Mileage:</strong> {car.mileage}
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
            <ul>
              {car.details.adasFeatures.map((item, i) => <li key={i}><span className="material-symbols-outlined">check_circle</span>{item}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToyotaInnovaDetail;