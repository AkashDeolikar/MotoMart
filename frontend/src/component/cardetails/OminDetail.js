// src/component/cardetails/OmniDetail.jsx
import React from "react";
import './Details.css';

const OmniDetail = () => {
  const car = {
    name: "Renault KWID",
    price: "₹4.70 – ₹6.45 Lakh",
    mileage: "22.0 – 22.25 km/l",
    width: "1579 mm",
    height: "1474 mm",
    description:
      "The Renault KWID is a stylish entry-level hatchback with SUV-inspired design. It offers great fuel efficiency, advanced features, and a budget-friendly price, making it an ideal choice for city commuters.",
    details: {
      engine: {
        petrol: "0.8L SCe & 1.0L SCe Petrol Engine",
      },
      transmission: "5-speed Manual / AMT",
      fuelOptions: "Petrol",
      safetyRating: "1 Star (Global NCAP)",
      features: [
        "8-inch Touchscreen MediaNAV",
        "LED DRLs and Headlamps",
        "Digital Instrument Cluster",
        "ABS with EBD",
        "Rear Parking Sensors",
      ],
      colorOptions: [
        { name: "Moonlight Silver", hex: "#c0c0c0" },
        { name: "Fiery Red", hex: "#b22222" },
        { name: "Zanskar Blue", hex: "#007FFF" },
        { name: "Outback Bronze", hex: "#6b4423" },
        { name: "Ice Cool White", hex: "#f8f8ff" },
      ],
      segment: "Entry-level Hatchback",
      launched: "2015 (Updated 2023)",
      evAvailable: false,
    },
  };

  return (
    <div className="swift-detail-wrapper">
      <div className="car360-section">
        <h3 className="section-title">360° Experience</h3>
        <p className="section-subtitle">Click and turn the vehicle image to the left or right.</p>
        <div className="car360-box">
          <iframe
            src="https://kwid.renault.co.in/kwid/?_gl=1*2ps9ee*_gcl_au*Mzk4NTkzNTUuMTc0NjY4NDQ4NA..*FPAU*Mzk4NTkzNTUuMTc0NjY4NDQ4NA..*_ga*MTY0MzkyMjg2Mi4xNzQ2Njg0NDg0*_ga_7C0H53S62Y*czE3NDY2ODQ0ODQkbzEkZzEkdDE3NDY2ODQ4MzQkajAkbDAkaDU5MzU4OTIzMQ..*_fplc*R01veklqWnh0TW85JTJCenAxTmdqbnlORyUyRkRnZ2lPZkc5OSUyRmh3SDNTSThvNVBCREZHa2djJTJGaHVianlJdmRnc2FYQ281VkVzWXBMdXVZdzZIdkJOZ08xbEd5TyUyRnBSNVRCcHdDMkc5VTM3bDcwREdNRUI3UXk4UEdYVXYzZGRTUSUzRCUzRA..#/car/kwid"
            title="Renault KWID"
            className="car360-panorama"
          />
        </div>
      </div>

      <div className="car-detail-section">
        <h1>{car.name}</h1>
        <p className="lead-description">{car.description}</p>

        <div className="specifications-grid">
          <div className="spec-item">
            <h4>Price</h4>
            <p>{car.price}</p>
          </div>
          <div className="spec-item">
            <h4>Mileage</h4>
            <p>{car.mileage}</p>
          </div>
          <div className="spec-item">
            <h4>Dimensions</h4>
            <p>{car.width} (W) × {car.height} (H)</p>
          </div>
          <div className="spec-item">
            <h4>Fuel</h4>
            <p>{car.details.fuelOptions}</p>
          </div>
          <div className="spec-item">
            <h4>Transmission</h4>
            <p>{car.details.transmission}</p>
          </div>
          <div className="spec-item">
            <h4>Segment</h4>
            <p>{car.details.segment}</p>
          </div>
        </div>

        <h2>Key Features</h2>
        <ul>{car.details.features.map((feature, i) => <li key={i}>✅ {feature}</li>)}</ul>

        <h2>Available Colors</h2>
        <div className="color-swatches">
          {car.details.colorOptions.map((c, index) => (
            <div key={index}>
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

        <h2>Additional Info</h2>
        <ul>
          <li><strong>Petrol Engine:</strong> {car.details.engine.petrol}</li>
          <li><strong>Safety Rating:</strong> {car.details.safetyRating}</li>
          <li><strong>Launched:</strong> {car.details.launched}</li>
          <li><strong>EV Available:</strong> {car.details.evAvailable ? "Yes" : "No"}</li>
        </ul>
      </div>
    </div>
  );
};

export default OmniDetail;
