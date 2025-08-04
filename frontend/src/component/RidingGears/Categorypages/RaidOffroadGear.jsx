// src/pages/RaidOffroadGear.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GearCSS/RaidOffroadGear.css';

const RaidOffroadGear = () => {
  const [gearData, setGearData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://motomartbackend.onrender.com/api/raid-offroad') // Replace with actual API endpoint https://motomartbackend.onrender.com/raid-offroad
      .then((res) => {
        setGearData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching raid offroad gear:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="gear-loader">
        <div className="gear-spinner"></div>
        <p>Loading Raid Offroad Collection...</p>
      </div>
    );
  }

  return (
    <section className="raid-gear-page">
      <h2>Raid Offroad Collection</h2>
      <div className="raid-gear-grid">
        {gearData.map((item, index) => (
          <div className="gear-card" key={index}>
            <img src={item.image} alt={item.title} />
            <div className="gear-info">
              <h3>{item.title}</h3>
              <p className="gear-price">₹ {item.price.toLocaleString()}</p>
              {item.variants && item.variants.length > 0 && (
                <div className="gear-variants">
                  {item.variants.map((variant, i) => (
                    <span key={i} className="variant-chip">{variant}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RaidOffroadGear;
