import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GearCSS/RaidOffroadGear.css';

const BaseLayerPage = () => {
  const [layers, setLayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://motomartbackend.onrender.com/api/base-layers')
      .then(res => {
        setLayers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching base layers:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="raid-gear-page">
      <h2>Base Layers</h2>

      {loading ? (
        <div className="app-loading-overlay">
          <div className="app-glass-loader">
            <div className="app-spinner"></div>
            <p className="app-loading-text">
              <i className="bi bi-lightning-charge-fill"></i> Loading Baselayers...
            </p>
          </div>
        </div>
      ) : (
        <div className="raid-gear-grid">
          {layers.map((item, index) => (
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

export default BaseLayerPage;
