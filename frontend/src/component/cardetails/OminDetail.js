import React, { useState } from "react";
import './Details.css'; // Assuming your existing CSS is in Details.css
import './temp.css'; // Assuming you might have additional tab-specific CSS here

const OmniDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedColor, setSelectedColor] = useState(0);

  const car = {
    name: "Renault KWID (2023)",
    price: "₹4.70 – ₹6.45 Lakh (Ex-showroom, Delhi)",
    mileage: "22.0 – 22.25 km/l (ARAI Certified)",
    description:
      "The Renault KWID is a budget-friendly hatchback with SUV-inspired styling, modern features, and impressive fuel efficiency. Popular among first-time buyers, it offers a spacious cabin, practical technology like an 8-inch touchscreen with Android Auto/Apple CarPlay, and segment-leading 184 mm ground clearance. Its affordability and urban agility make it one of the most value-packed entry-level cars in India.",
    details: {
      engine: {
        petrol_0_8L: "0.8L SCe Petrol – 54 PS @ 5678 rpm, 72 Nm @ 4386 rpm",
        petrol_1_0L: "1.0L SCe Petrol – 68 PS @ 5500 rpm, 91 Nm @ 4250 rpm",
      },
      transmission: "5-speed Manual / 5-speed AMT",
      fuelOptions: "Petrol",
      safetyRating:
        "1 Star (Global NCAP, India-spec model) – Dual Airbags Standard",
      segment: "Entry-level Hatchback",
      launched: "First Generation: 2015 | Latest BS6 Phase 2 Update: 2023",
      evAvailable: false,
      dimensions: {
        length: "3731 mm",
        width: "1579 mm",
        height: "1474 mm",
        wheelbase: "2422 mm",
        bootSpace: "279 Litres",
        groundClearance: "184 mm (Best-in-Segment)",
        fuelTankCapacity: "28 Litres",
      },
      features: [
        "8-inch Touchscreen MediaNAV Evolution with Apple CarPlay & Android Auto",
        "Digital Instrument Cluster",
        "LED DRLs with Halogen Headlamps",
        "Electrically Adjustable ORVMs (Top Variants)",
        "Dual Front Airbags (Standard)",
        "ABS with EBD",
        "Rear Parking Sensors",
        "Reverse Parking Camera (Top Variants)",
        "Speed Alert System",
        "Seat Belt Reminder (Driver & Passenger)",
        "Front Power Windows",
      ],
      colorOptions: [
        { name: "Ice Cool White", hex: "#f8f8ff" },
        { name: "Fiery Red", hex: "#b22222" },
        { name: "Moonlight Silver", hex: "#c0c0c0" },
        { name: "Outback Bronze", hex: "#6b4423" },
        { name: "Metal Mustard", hex: "#E3AE57" },
        { name: "Caspian Blue", hex: "#00568D" },
        { name: "Zanskar Blue with Mystery Black Roof", hex: "#007FFF", dualTone: true },
        { name: "Metal Mustard with Mystery Black Roof", hex: "#E3AE57", dualTone: true },
      ],
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
          <div className="tab-content360 active">
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
          <div className="tab-content360 active">
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
                  <li key={i}><span className="material-symbols-outlined">check_circle</span>{feature}</li>
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
                  <li key={i}><span className="material-symbols-outlined">check_circle</span>{feature}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OmniDetail;