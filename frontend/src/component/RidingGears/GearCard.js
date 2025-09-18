// src/components/Gear/GearCard.jsx
import React from "react";
import "./GearCard.css";

const GearCard = ({ gear }) => {
  return (
    <div className="gear-card">
      {/* Product Image */}
      <div className="gear-card-image">
        <img src={gear.imageUrl} alt={gear.model} loading="lazy" />
      </div>

      {/* Product Info */}
      <div className="gear-card-info">
        <h3 className="gear-card-title">
          {gear.brand} <span>{gear.model}</span>
        </h3>
        <p className="gear-card-price">₹{gear.price}</p>

        {gear.features?.length > 0 && (
          <ul className="gear-card-features">
            {gear.features.slice(0, 3).map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        )}

        <a
          href={gear.productLink}
          target="_blank"
          rel="noopener noreferrer"
          className="gear-card-btn"
        >
          View Product
        </a>
      </div>
    </div>
  );
};

export default GearCard;
