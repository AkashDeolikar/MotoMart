import React, { useEffect } from "react";
import './aboutus.css';

const Aboutus = () => {
  useEffect(() => {
    localStorage.setItem("aboutusReady", "true");
  }, []);

  return (
    <section className="aboutus-info-section">
      <div className="aboutus-info-container">
        <h1 className="aboutus-info-title">About MotoMart</h1>
        <p className="aboutus-info-description">
          <strong>MotoMart</strong> is your one-stop automotive companion platform, offering a seamless experience for exploring, comparing, and evaluating both <strong>cars and bikes</strong> across all segments—luxury, electric, commercial, budget, and performance.
        </p>

        <h2 className="aboutus-info-subheading">What We Offer</h2>
        <ul className="aboutus-info-feature-list">
          <li>🔍 <strong>Quick Vehicle View</strong>: Instantly preview specs and images of cars and bikes.</li>
          <li>💰 <strong>Price Information</strong>: Access accurate on-road and showroom prices with EMI/fuel breakdowns.</li>
          <li>🧮 <strong>EMI Calculator</strong>: Plan your monthly payments with adjustable tenure, rate, and down payment.</li>
          <li>🛠️ <strong>Service Cost Estimator</strong>: Predict maintenance costs by model, mileage, and intervals.</li>
          <li>🧪 <strong>Parts & Fluids Info</strong>: Discover OEM and aftermarket components, with fluid specifications.</li>
          <li>⚡ <strong>EV Section</strong>: Explore electric vehicle specs, battery range, charge time, and fuel savings.</li>
          <li>🆚 <strong>Car & Bike Comparison</strong>: Compare any car and bike side-by-side by performance and price.</li>
          <li>⭐ <strong>Add to Favorites</strong>: Save preferred vehicles for quicker access anytime.</li>
        </ul>

        <h2 className="aboutus-info-subheading">🎯 Our Goal</h2>
        <p className="aboutus-info-description">
          MotoMart is built to simplify vehicle exploration and ownership decisions. Whether you're a first-time buyer, enthusiast, or professional, MotoMart saves you time by bringing everything under one virtual roof.
        </p>

        <h2 className="aboutus-info-subheading">🌐 Visit the Original Manufacturers</h2>
        <p className="aboutus-info-description">
          We believe in transparency. All vehicle data links directly to the official manufacturer's site for more detailed brochures, configurations, and booking options.
        </p>

        <p className="aboutus-info-description">
          MotoMart is your trusted digital pit stop—get informed, compare wisely, and drive confidently.
        </p>

        <a href="/" className="aboutus-info-cta-button">Explore MotoMart</a>

        <div className="aboutus-info-footer">
          <p>
            <strong>Creator</strong>: Akash Deolikar
            <br />
            <strong>GitHub</strong>:{" "}
            <a href="https://github.com/AkashDeolikar/MotoMart" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-github"></i> GitHub Repo
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
