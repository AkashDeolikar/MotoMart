import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GearCSS/RaidOffroadGear.css';

const SaddleBagPage = () => {
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://motomartbackend.onrender.com/api/saddlebags')
      .then(res => {
        setBags(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching saddlebags:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="jackets-page">
      <h2>Saddle Bags Collection</h2>
      {loading ? (
        <div className="app-loading-overlay">
          <div className="app-glass-loader">
            <div className="app-spinner"></div>
            <p className="app-loading-text">
              <i className="bi bi-lightning-charge-fill"></i> Loading Saddle Bags...
            </p>
          </div>
        </div>
      ) : (
        <div className="gear-grid">
          {bags.map((item, idx) => (
            <div className="gear-card" key={idx}>
              <img src={item.image} alt={item.title} onError={(e) => (e.target.src = '/fallback.jpg')} />
              <div className="gear-info">
                <h3>{item.title}</h3>
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

export default SaddleBagPage;
