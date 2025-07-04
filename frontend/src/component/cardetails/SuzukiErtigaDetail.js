// src/component/cardetails/ErtigaDetail.jsx
import React, { useState, useRef } from "react";
import './Details.css';

const SuzukiErtigaDetail = () => {
  const car = {
    name: "Ertiga",
    price: "₹8.35 – ₹12.79 Lakh",
    mileage: "19.01 – 26.08 km/l",
    width: "1735 mm",
    height: "1685 mm",
    description:
      "Maruti Suzuki Ertiga is a compact MPV that offers excellent space, comfortable ride quality, and efficient engine options. It's a versatile family vehicle with advanced features and a well-rounded design, making it a great choice for urban families.",
    details: {
      engine: {
        petrol: "1.5L K15B (103 PS, 138 Nm)",
        diesel: "1.5L DDIS (95 PS, 225 Nm)",
      },
      transmission: "5MT / 4AT / 6AT",
      fuelOptions: "Petrol & Diesel",
      safetyRating: "4 Stars (Global NCAP)",
      features: [
        "7.0” Touchscreen Infotainment System",
        "Apple CarPlay & Android Auto",
        "SmartPlay Studio, 16” Alloy Wheels",
        "Rear Parking Sensors, 4 Airbags",
        "LED DRLs, Smart Keyless Entry",
      ],
      colorOptions: [
        { name: "Pearl Metallic Auburn Red", hex: "#6a1b1a" },
        { name: "Metallic Magma Grey", hex: "#505050" },
        { name: "Pearl Metallic Oxford Blue", hex: "#0a0f4a" },
        { name: "Splendid Silver", hex: "#c0c0c0" },
        { name: "Arctic White", hex: "#ffffff" },
      ],
      segment: "Compact MPV",
      launched: "First: 2012, Facelift: 2022",
      evAvailable: false,
    },
  };

  const totalImages = 71;
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
    <div className="swift-detail-wrapper">
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

        <h2>Fuel & Engine</h2>
        <ul>
          <li><strong>Petrol Engine:</strong> {car.details.engine.petrol}</li>
          <li><strong>Diesel Engine:</strong> {car.details.engine.diesel}</li>
        </ul>

        <h2>Transmission</h2>
        <p>{car.details.transmission}</p>

        <h2>Fuel & Performance</h2>
        <ul>
          <li><strong>Fuel Type:</strong> {car.details.fuelOptions}</li>
          <li><strong>Mileage:</strong> {car.mileage}</li>
        </ul>

        <h2>Dimensions</h2>
        <p>{car.width} (W) × {car.height} (H)</p>

        <h2>Interior</h2>
        <p>Spacious cabin with flexible 3-row seating, dual-tone dashboard, and modern infotainment unit.</p>

        <h2>Exterior</h2>
        <p>Chrome grille, LED tail lamps, stylish alloys, and aerodynamic body for urban and highway drives.</p>

        <h2>Safety</h2>
        <ul>
          <li><strong>Safety Rating:</strong> {car.details.safetyRating}</li>
          <li>Rear Parking Sensors, 4 Airbags, ABS with EBD</li>
        </ul>

        <h2>ADAS Features</h2>
        <p>Not Available</p>

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
          <li><strong>Segment:</strong> {car.details.segment}</li>
          <li><strong>Launched:</strong> {car.details.launched}</li>
          <li><strong>EV Available:</strong> {car.details.evAvailable ? "Yes" : "No"}</li>
        </ul>
      </div>
    </div>
  );
};

export default SuzukiErtigaDetail;
