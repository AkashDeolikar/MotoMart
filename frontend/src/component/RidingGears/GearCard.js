// src/components/Gear/GearCard.js
import React from 'react';
import './GearCard.css';

const GearCard = ({ gear }) => {
  return (
    <div className="gear-card">
      <img src={gear.imageUrl} alt={gear.model} className="gear-img" />
      <div className="gear-info">
        <h3>{gear.brand} <span>{gear.model}</span></h3>
        <p className="gear-price">₹{gear.price}</p>
        <ul className="gear-features">
          {gear.features?.slice(0, 3).map((f, idx) => (
            <li key={idx}>• {f}</li>
          ))}
        </ul>
        <a href={gear.productLink} target="_blank" rel="noopener noreferrer" className="gear-btn">
          View Product
        </a>
      </div>
    </div>
  );
};

export default GearCard;
