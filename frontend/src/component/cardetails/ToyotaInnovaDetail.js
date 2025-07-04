// src/component/cardetails/InnovaDetail.jsx
import React, { useState, useRef } from "react";
import './Details.css';

const ToyotaInnovaDetail = () => {
  const car = {
    name: "Innova",
    price: "₹18.25 – ₹25.71 Lakh",
    mileage: "11.7 – 15.0 km/l",
    width: "1830 mm",
    height: "1795 mm",
    description:
      "Toyota Innova Crysta is a premium MPV that offers superior comfort, advanced safety features, and a refined driving experience. Known for its reliability and practicality, it is an excellent choice for large families and long-distance travel.",
    details: {
      engine: {
        petrol: "2.7L 4-cylinder (166 PS, 245 Nm)",
        diesel: "2.4L 4-cylinder (150 PS, 343 Nm)",
      },
      transmission: "5MT / 6AT",
      fuelOptions: "Petrol & Diesel",
      safetyRating: "4 Stars (Global NCAP)",
      features: [
        "7” Touchscreen Infotainment",
        "Apple CarPlay & Android Auto",
        "LED Projector Headlamps",
        "Front & Rear Parking Sensors",
        "Upgraded 9 Speaker Sound System",
      ],
      colorOptions: [
        { name: "Super White", hex: "#fefefe" },
        { name: "Attitude Black", hex: "#0c0c0c" },
        { name: "Avant-Garde Bronze", hex: "#6e5849" },
        { name: "Platinum White Pearl", hex: "#f4f5f7" },
        { name: "Silver Metallic", hex: "#c8c8c8" },
        { name: "Sparkling Black Crystal Shine", hex: "#1c1c1c" },
      ],
      segment: "Premium MPV",
      launched: "First: 2005, Facelift: 2021",
      evAvailable: false,
    },
  };

  const totalImages = 17;
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
                  src={`/images/innova/img_0_0_${index}.png`}
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
        <p>Premium upholstery, ambient lighting, touchscreen infotainment, rear AC vents, and ample storage.</p>

        <h2>Exterior</h2>
        <p>LED projector headlamps, chrome accents, bold grille, and strong road presence.</p>

        <h2>Safety</h2>
        <ul>
          <li><strong>Safety Rating:</strong> {car.details.safetyRating}</li>
          <li>Front & Rear Parking Sensors, 3 Airbags, ABS with EBD</li>
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

export default ToyotaInnovaDetail;