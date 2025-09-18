import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GearCSS/RaidOffroadGear.css';

const JacketsPage = () => {
  const [jackets, setJackets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://motomartbackend.onrender.com/api/jackets')
      .then(res => {
        setJackets(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching jackets:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="raid-gear-page">
      <h2>Riding Jackets Collection</h2>

      {loading ? (
        <div className="app-loading-overlay">
          <div className="app-glass-loader">
            <div className="app-spinner"></div>
            <p className="app-loading-text">
              <i className="bi bi-lightning-charge-fill"></i> Loading Jackets...
            </p>
          </div>
        </div>
      ) : (
        <div className="raid-gear-grid">
          {jackets.map((item, index) => (
            <div className="gear-card" key={index}>
              <img
                src={item.image}
                alt={item.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/fallback.jpg';
                }}
              />
              <div className="gear-info">
                <h3>{item.title}</h3>
                {item.brand && <p className="gear-brand">{item.brand}</p>}
                <p className="gear-price">₹ {item.price.toLocaleString()}</p>
                <div className="gear-variants">
                  {item.variants.map((variant, i) => (
                    <span key={i} className="variant-chip">{variant}</span>
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

export default JacketsPage;
