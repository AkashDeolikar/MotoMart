// src/component/cardetails/CretaDetail.jsx
import React, { useState, useRef } from "react";
import './Details.css';
import './temp.css';

const HyundaiCretaDetail = () => {
  const car = {
    name: "Hyundai Creta",
    price: "₹11.00 – ₹20.15 Lakh",
    mileage: "17.4 – 21.8 km/l",
    width: "1790 mm",
    height: "1635 mm",
    description:
      "Hyundai Creta is a premium compact SUV known for its modern styling, advanced features, and smooth driving experience. It offers multiple powertrains including petrol, turbo-petrol, and diesel, and is loaded with tech and safety features.",
    details: {
      engine: {
        petrol: "1.5L MPi (115 PS, 144 Nm)",
        diesel: "1.5L CRDi (116 PS, 250 Nm)"
      },
      transmission: "6MT / IVT / 7DCT / 6AT",
      fuelOptions: "Petrol & Diesel",
      safetyRating: "5 Stars (Global NCAP - new gen)",
      features: [
        "10.25” Touchscreen Infotainment System",
        "Panoramic Sunroof, Wireless Charging",
        "ADAS Level 2, 6 Airbags, ESC",
        "Ventilated Front Seats, Bose Sound System",
        "Digital Instrument Cluster, Connected Car Tech"
      ],
      colorOptions: [
        { name: "Polar White", hex: "#ffffff" },
        { name: "Typhoon Silver", hex: "#c0c0c0" },
        { name: "Phantom Black", hex: "#1a1a1a" },
        { name: "Titan Grey", hex: "#4b4b4b" },
        { name: "Fiery Red", hex: "#b22222" },
        { name: "Deep Forest", hex: "#254117" }
      ],
      segment: "Compact SUV",
      launched: "First: 2015, Facelift: 2024",
      evAvailable: false
    }
  };

  const totalImages = 35;
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
    <div className="swift-detail-wrapper">
      <div className="car360-section">
        <h3 className="subTitM alignC">360° Experience</h3>
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
            {[...Array(totalImages)].map((_, i) => (
              <img
                key={i}
                className="car360-frame"
                src={`/images/creta/abyss-black_${i + 1}.png`}
                alt={`creta-view-${i + 1}`}
                style={{ visibility: i + 1 === currentIndex ? "visible" : "hidden" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="car-detail-section">
        <h1>{car.name}</h1>
        <p className="lead-description">{car.description}</p>

        <h2>Fuel & Engine</h2>
        <p><strong>Fuel Type:</strong> {car.details.fuelOptions}</p>
        <p><strong>Engine (Petrol):</strong> {car.details.engine.petrol}</p>
        <p><strong>Engine (Diesel):</strong> {car.details.engine.diesel}</p>

        <h2>Transmission</h2>
        <p>{car.details.transmission}</p>

        <h2>Fuel & Performance</h2>
        <p><strong>Mileage:</strong> {car.mileage}</p>
        <p><strong>Fuel Tank Capacity:</strong> 50 Litres</p>

        <h2>Dimensions</h2>
        <p><strong>Width:</strong> {car.width}</p>
        <p><strong>Height:</strong> {car.height}</p>
        <p><strong>Wheelbase:</strong> 2610 mm</p>
        <p><strong>Boot Space:</strong> 433 Litres</p>
        <p><strong>Ground Clearance:</strong> 190 mm</p>

        <h2>Interior</h2>
        <ul>
          <li>Leatherette Upholstery</li>
          <li>Panoramic Sunroof</li>
          <li>Digital Instrument Cluster</li>
        </ul>

        <h2>Exterior</h2>
        <ul>
          <li>LED Headlamps & DRLs</li>
          <li>Dual-tone Paint Options</li>
          <li>Alloy Wheels</li>
        </ul>

        <h2>Safety</h2>
        <p><strong>Safety Rating:</strong> {car.details.safetyRating}</p>
        <ul>
          <li>6 Airbags</li>
          <li>ESC, Hill Assist</li>
          <li>All Disc Brakes</li>
        </ul>

        <h2>ADAS Features</h2>
        <ul>
          <li>Lane Keep Assist</li>
          <li>Adaptive Cruise Control</li>
          <li>Forward Collision Warning</li>
        </ul>

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
      </div>
    </div>
  );
};

export default HyundaiCretaDetail;
