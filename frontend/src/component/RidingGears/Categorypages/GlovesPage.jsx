import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GearCSS/GlovesPage.css';

const GlovesPage = () => {
  const [gloves, setGloves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://motomartbackend.onrender.com/api/gloves')
      .then((res) => {
        setGloves(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch gloves:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="gloves-page">
      <h2>All Riding & Winter Gloves</h2>
      {loading ? (
        <div className="gear-loader">
          <div className="gear-spinner"></div>
          <p>Loading gloves...</p>
        </div>
      ) : (
        <div className="gear-grid">
          {gloves.map((item, index) => (
            <div className="gear-card" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="gear-info">
                <h3>{item.title}</h3>
                <p className="gear-brand">{item.brand}</p>
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

export default GlovesPage;