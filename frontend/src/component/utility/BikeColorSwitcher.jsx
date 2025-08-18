import React, { useState } from "react";
import "./BikeColorSwitcher.css"; // Import CSS

const BikeColorSwitcher = () => {
  // Main display images
  const bikeImages = {
    black: "/images/bmwbike/black.png",
    red: "/images/bmwbike/red.png",
    blue: "/images/bmwbike/white.png", // check if this should be "blue.png"
  };

  // Thumbnail swatches
  const colorThumbnails = {
    black: "/images/bmwbike/blackcolor.png",
    red: "/images/bmwbike/redcolor.png",
    blue: "/images/bmwbike/multicolor.png",
  };

  const [selectedColor, setSelectedColor] = useState("black");

  return (
    <div className="bike-container">
      {/* Bike Image */}
      <img
        src={bikeImages[selectedColor]}
        alt={`BMW S1000RR - ${selectedColor}`}
        className="bike-image"
      />

      {/* Color Options */}
      <div className="color-options">
        {Object.keys(bikeImages).map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`color-button ${
              selectedColor === color ? "active" : ""
            }`}
          >
            <img
              src={colorThumbnails[color]}
              alt={`${color} color`}
              className="color-thumbnail"
            />
          </button>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="https://www.bmw-motorrad.in/en/models/sport/s1000rr/technicaldata.html#/section-technical-data"
        target="_blank"
        rel="noopener noreferrer"
        className="custom-btn"
      >
        View S1000rr Technical Data
      </a>
    </div>
  );
};

export default BikeColorSwitcher;
