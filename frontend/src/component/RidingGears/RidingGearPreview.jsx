// src/components/Gear/RidingGearPreview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GearCard from "./GearCard";
import "./RidingGearPreview.css";

const RidingGearPreview = () => {
  const [featuredGears, setFeaturedGears] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturedGears = async () => {
      try {
        const { data } = await axios.get(
          "https://motomartbackend.onrender.com/api/gears",
          { signal: controller.signal }
        );
        setFeaturedGears(data.slice(0, 4));
        setStatus("success");
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Unable to fetch riding essentials. Please try again.");
          setStatus("error");
        }
      }
    };

    fetchFeaturedGears();
    return () => controller.abort();
  }, []);

  return (
    <section className="riding-gear-preview">
      <div className="container">
        <header className="preview-header">
          <h3 className="preview-title">Riding Gear</h3>
          <p className="preview-subtitle">Essentials for your next ride</p>
        </header>

        {status === "loading" && (
          <div className="riding-gear-loader">
            <div className="riding-gear-spinner" />
            <p>Loading essentials...</p>
          </div>
        )}

        {status === "error" && (
          <div className="riding-gear-error">
            <p>{error}</p>
          </div>
        )}

        {status === "success" && (
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
