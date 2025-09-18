import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GearCSS/RaidOffroadGear.css';

const RidingPantsPage = () => {
  const [pants, setPants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://motomartbackend.onrender.com/api/pants')
      .then(res => {
        setPants(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching pants:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="jackets-page">
      <h2>Riding Pants</h2>
      {loading ? (
        <div className="app-loading-overlay">
          <div className="app-glass-loader">
            <div className="app-spinner"></div>
            <p className="app-loading-text">
              <i className="bi bi-lightning-charge-fill"></i> Loading Riding Pants...
            </p>
          </div>
        </div>
      ) : (
        <div className="gear-grid">
          {pants.map((item, index) => (
            <div className="gear-card" key={index}>
              <img src={item.image} alt={item.title} onError={(e) => (e.target.src = '/fallback.jpg')} />
              <div className="gear-info">
                <h3>{item.title}</h3>
                <p className="gear-price">₹ {item.price.toLocaleString()}</p>
                <div className="gear-variants">
                  {item.variants.map((v, i) => (
                    <span key={i} className="variant-chip">{v}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RidingPantsPage;
