import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GearCard from "../RidingGears/GearCard";
import "./RidingGearPreview.css";

const RidingGearPreview = () => {
  const [featuredGears, setFeaturedGears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // cleanup flag

    const fetchFeaturedGears = async () => {
      try {
        const response = await axios.get(
          "https://motomartbackend.onrender.com/api/gears"
        );

        if (isMounted) {
          const gears = response.data;
          setFeaturedGears(gears.slice(0, 4)); // only keep first 4
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load riding gear preview:", err);
        if (isMounted) {
          setError("⚠️ Unable to fetch riding essentials. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchFeaturedGears();

    return () => {
      isMounted = false; // avoid state update on unmount
    };
  }, []);

  return (
    <section className="riding-gear-preview">
      <div className="container">
        <header className="preview-header">
          <h3 className="preview-title">🏍 Riding Gear</h3>
        </header>

        {loading ? (
          <div className="riding-gear-loader" role="status" aria-live="polite">
            <div className="riding-gear-spinner"></div>
            <p>Loading essentials...</p>
          </div>
        ) : error ? (
          <div className="riding-gear-error" role="alert">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="riding-gear-grid fade-in">
              {featuredGears.map((gear) => (
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
