import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GearCard from '../RidingGears/GearCard';
import './RidingGearPreview.css';

const RidingGearPreview = () => {
  const [featuredGears, setFeaturedGears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedGears = async () => {
      try {
        const response = await axios.get('https://motomartbackend.onrender.com/api/gears');
        setFeaturedGears(response.data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        console.error('Failed to load riding gear preview:', err);
        setError('Unable to fetch riding essentials. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeaturedGears();
  }, []);

  return (
    <section className="riding-gear-preview">
      <div className="container">
        <header className="preview-header">
          <h2 className='titlegear'>RIDING GEAR</h2>
        </header>

        {loading ? (
          <div className="riding-gear-loader">
            <div className="riding-gear-spinner"></div>
            <p>Loading essentials...</p>
          </div>
        ) : error ? (
          <div className="riding-gear-error">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="riding-gear-grid">
              {featuredGears.map(gear => (
                <GearCard key={gear._id} gear={gear} />
              ))}
            </div>

            <Link to="/MainPageGear" className="riding-gear-button">
              View All Riding Gear
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default RidingGearPreview;
