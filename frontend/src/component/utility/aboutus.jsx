import React, { useEffect } from "react";
import './aboutus.css';

const AboutUs = () => {
  useEffect(() => {
    localStorage.setItem("aboutUsVisited", "true");
  }, []);

  return (
    <section className="aboutus-section">
      <div className="aboutus-container">
        <h1 className="aboutus-title">About MotoMart</h1>

        <p className="aboutus-description">
          <strong>MotoMart</strong> is your all-in-one digital platform for discovering, comparing, and evaluating <strong>cars</strong> and <strong>bikes</strong>—whether you're interested in luxury, electric, performance, commercial, or budget segments.
        </p>

        <h2 className="aboutus-subheading">🚗 What Makes MotoMart Stand Out?</h2>
        <ul className="aboutus-feature-list">
          <li>🔍 <strong>Quick Preview</strong>: Instantly view vehicle specs and media content.</li>
          <li>💸 <strong>Accurate Pricing</strong>: Access showroom and on-road prices with EMI breakdowns.</li>
          <li>📊 <strong>EMI Calculator</strong>: Customize tenure, interest, and down payment live.</li>
          <li>🔧 <strong>Service Cost Estimator</strong>: Predict maintenance costs by model and usage.</li>
          <li>🛠️ <strong>Parts & Fluids Info</strong>: OEM parts and recommended fluids at a glance.</li>
          <li>⚡ <strong>Electric Vehicle Explorer</strong>: Dive into EV range, battery life, and charge time.</li>
          <li>🆚 <strong>Side-by-Side Comparisons</strong>: Compare multiple vehicles instantly.</li>
          <li>⭐ <strong>Favorites Feature</strong>: Save your picks and revisit anytime.</li>
        </ul>

        <h2 className="aboutus-subheading">🎯 Our Mission</h2>
        <p className="aboutus-description">
          We aim to simplify how users approach buying, comparing, and maintaining vehicles. Whether you're a daily commuter or an enthusiast, MotoMart helps you make smarter decisions with reliable data and intuitive tools.
        </p>

        <h2 className="aboutus-subheading">🔗 Official Source Links</h2>
        <p className="aboutus-description">
          For maximum transparency, MotoMart links directly to the official manufacturer websites for brochures, bookings, and authentic configurations.
        </p>

        <p className="aboutus-description">
          MotoMart is your trusted automotive sidekick—<em>compare wisely, drive confidently</em>.
        </p>

        <a href="/" className="aboutus-cta-button">Explore MotoMart</a>

        <div className="aboutus-footer">
          <p>
            <strong>Creator:</strong> Akash Deolikar
            <br />
            <strong>GitHub:</strong>{" "}
            <a href="https://github.com/AkashDeolikar/MotoMart" target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
