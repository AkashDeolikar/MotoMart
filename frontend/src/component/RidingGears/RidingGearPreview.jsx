import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GearCard from '../RidingGears/GearCard';
import './RidingGearPreview.css';

const RidingGearPreview = () => {
  const [featuredGears, setFeaturedGears] = useState([]);

  useEffect(() => {
    axios.get('https://motomartbackend.onrender.com/api/gears')
      .then(res => setFeaturedGears(res.data.slice(0, 4))) // Only 3 items
      .catch(err => console.error('Failed to load preview:', err));
  }, []);

  return (
    <section className="gear-preview">
      <h2>Moto Riding Essentials</h2>
      <div className="preview-grid">
        {featuredGears.map(gear => (
          <GearCard key={gear._id} gear={gear} />
        ))}
      </div>
      <Link to="/MainPageGear" className="preview-button">View All Riding Gear</Link>
    </section>
  );
};

export default RidingGearPreview;
