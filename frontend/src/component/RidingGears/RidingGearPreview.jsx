import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GearCard from "../RidingGears/GearCard";
import "./RidingGearPreview.css";

const RidingGearPreview = () => {
  const [featuredGears, setFeaturedGears] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "error" | "success"
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // ✅ cancel API request on unmount

    const fetchFeaturedGears = async () => {
      try {
        const { data } = await axios.get(
          "https://motomartbackend.onrender.com/api/gears",
          { signal: controller.signal }
        );

        setFeaturedGears(data.slice(0, 4)); // ✅ no need to store all
        setStatus("success");
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Failed to load riding gear preview:", err);
          setError("⚠️ Unable to fetch riding essentials. Please try again.");
          setStatus("error");
        }
      }
    };

    fetchFeaturedGears();

    return () => controller.abort(); // ✅ cleanup
  }, []);

  return (
    <section className="riding-gear-preview">
      <div className="container">
        <header className="preview-header">
          <h3 className="preview-title">🏍 Riding Gear</h3>
        </header>

        {status === "loading" && (
          <div className="riding-gear-loader" role="status" aria-live="polite">
            <div className="riding-gear-spinner" />
            <p>Loading essentials...</p>
          </div>
        )}

        {status === "error" && (
          <div className="riding-gear-error" role="alert">
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
