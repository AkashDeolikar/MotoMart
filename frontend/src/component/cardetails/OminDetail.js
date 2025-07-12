import React, { useState } from "react";
import './Details.css'; // Assuming your existing CSS is in Details.css
import './temp.css'; // Assuming you might have additional tab-specific CSS here

const OmniDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const car = {
    name: "Renault KWID",
    price: "₹4.70 – ₹6.45 Lakh (Ex-showroom, Delhi)", // Clarified price type and region
    mileage: "22.0 – 22.25 km/l (ARAI)", // Clarified mileage standard
    description:
      "The Renault KWID is a stylish and affordable entry-level hatchback, known for its SUV-inspired design cues and practical features. It offers strong fuel efficiency and a comfortable city driving experience, making it a popular choice for budget-conscious buyers.",
    details: {
      engine: {
        petrol: "0.8L SCe (54 PS, 72 Nm) & 1.0L SCe (68 PS, 91 Nm) Petrol Engine", // Added power/torque
      },
      transmission: "5-speed Manual / 5-speed AMT", // More specific
      fuelOptions: "Petrol",
      safetyRating: "1 Star (Global NCAP)", // Remains 1 star for India-spec model as per latest public tests
      features: [
        "8-inch Touchscreen MediaNAV Evolution with Apple CarPlay & Android Auto", // More specific infotainment
        "LED DRLs with Halogen Headlamps", // Clarified headlamp type
        "Digital Instrument Cluster",
        "Dual Front Airbags (Standard)", // Updated to dual airbags as standard
        "ABS with EBD",
        "Rear Parking Sensors & Rearview Camera (Top variants)", // Added Rearview Camera
        "Electrically Adjustable ORVMs (Top variants)", // Added electrically adjustable ORVMs
        "Speed Alert System", // Standard safety feature
        "Reverse Parking Camera" // Redundant if already in above, but keeping for clarity
      ],
      colorOptions: [
        { name: "Ice Cool White", hex: "#f8f8ff" },
        { name: "Metal Mustard", hex: "#E3AE57" }, // Popular Climber color
        { name: "Fiery Red", hex: "#b22222" },
        { name: "Outback Bronze", hex: "#6b4423" },
        { name: "Caspian Blue", hex: "#00568D" }, // Another common color
        { name: "Moonlight Silver", hex: "#c0c0c0" },
        { name: "Zanskar Blue with Mystery Black Roof", hex: "#007FFF", dualTone: true }, // Example dual tone
        { name: "Metal Mustard with Mystery Black Roof", hex: "#E3AE57", dualTone: true }, // Example dual tone
      ],
      segment: "Entry-level Hatchback",
      launched: "First Generation: 2015, Latest Update: 2023", // More specific launch info
      evAvailable: false,
      dimensions: { // Grouped dimensions
        length: "3731 mm", // Added Length
        width: "1579 mm",
        height: "1474 mm",
        wheelbase: "2422 mm",
        bootSpace: "279 Litres",
        groundClearance: "184 mm",
        fuelTankCapacity: "28 Litres"
      }
    },
  };

  return (
    <div className="car-detail-page"> {/* Changed class name for generality */}
      <div className="car360-section">
        <h3 className="section-title">360° Experience</h3>
        <p className="section-subtitle">Click and turn the vehicle image to the left or right.</p>
        <div className="car360-box">
          {/* Using an iframe for 360 view */}
          <iframe
            src="https://kwid.renault.co.in/kwid/?_gl=1*2ps9ee*_gcl_au*Mzk4NTkzNTUuMTc0NjY4NDQ4NA..*FPAU*Mzk4NTkzNTUuMTc0NjY4NDQ4NA..*_ga*MTY0MzkyMjg2Mi4xNzQ2Njg0NDg0*_ga_7C0H53S62Y*czE3NDY2ODQ0ODQkbzEkZzEkdDE3NDY2ODQ4MzQkajAkbDAkaDU5MzU4OTIzMQ..*_fplc*R01veklqWnh0TW85JTJCenAxTmdqbnlORyUyRkRnZ2lPZkc5OSUyRmh3SDNTSThvNVBCREZHa2djJTJGaHVianlJdmRnc2FYQ281VkVzWXBMdXVZdzZIdkJOZ08xbEd5TyUyRnBSNVRCcHdDMkc5VTM3bDcwREdNRUI3UXk4UEdYVXYzZGRTUSUzRCUzRA..#/car/kwid"
            title="Renault KWID"
            className="car360-panorama"
            allowFullScreen
          />
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
          </div>
        )}

        {activeTab === "specs" && (
          <div className="tab-content active">
            <h2>Fuel & Engine</h2>
            <p>
              <strong>Fuel Type:</strong> {car.details.fuelOptions}
            </p>
            <p>
              <strong>Engine:</strong> {car.details.engine.petrol}
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
            <h2>Safety</h2>
            <p>
              <strong>Rating:</strong> {car.details.safetyRating}
            </p>
            <ul>
              {car.details.features
                .filter(feature => 
                    feature.includes("Airbag") || 
                    feature.includes("ABS") || 
                    feature.includes("Parking Sensors") || 
                    feature.includes("Speed Alert") ||
                    feature.includes("Reverse Parking Camera") // Include rearview camera here
                )
                .map((feature, i) => (
                  <li key={i}>✅ {feature}</li>
                ))}
            </ul>

            <h2>Key Comfort & Convenience Features</h2>
            <ul>
              {car.details.features
                .filter(feature => 
                    !(feature.includes("Airbag") || 
                      feature.includes("ABS") || 
                      feature.includes("Parking Sensors") || 
                      feature.includes("Speed Alert") ||
                      feature.includes("Reverse Parking Camera"))
                )
                .map((feature, i) => (
                  <li key={i}>✅ {feature}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OmniDetail;