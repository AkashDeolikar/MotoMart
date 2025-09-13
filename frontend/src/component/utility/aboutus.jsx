import React, { useEffect } from "react";
import "./aboutus.css";
import { Link } from "react-router-dom";

const AboutUs = () => {
  useEffect(() => {
    localStorage.setItem("aboutUsVisited", "true");
  }, []);

  return (
    <section className="aboutus-section">
      <div className="aboutus-container fade-in">
        <h1 className="aboutus-title">
          About <span className="highlight">MotoMart</span>
        </h1>

        <p className="aboutus-description">
          <strong className="highlight">MotoMart</strong> is your all-in-one digital platform for discovering, comparing, and evaluating{" "}
          <strong>cars</strong> and <strong>bikes</strong>.
        </p>

        <h2 className="aboutus-subheading">What Makes MotoMart Stand Out?</h2>
        <ul className="aboutus-feature-list">
          <li>
            <span className="material-symbols-outlined">search</span>
            <strong> Quick Preview:</strong> Instantly view vehicle specs and media content.
          </li>
          <li>
            <span className="material-symbols-outlined">payments</span>
            <strong> Accurate Pricing:</strong> Showroom & on-road prices with EMI breakdowns.
          </li>
          <li>
            <span className="material-symbols-outlined">calculate</span>
            <strong> EMI Calculator:</strong> Customize tenure, interest, and down payment.
          </li>
          <li>
            <span className="material-symbols-outlined">build</span>
            <strong> Service Cost Estimator:</strong> Predict maintenance costs.
          </li>
          <li>
            <span className="material-symbols-outlined">settings</span>
            <strong> Parts & Fluids Info:</strong> OEM parts and recommended fluids.
          </li>
          <li>
            <span className="material-symbols-outlined">bolt</span>
            <strong> EV Explorer:</strong> Dive into range, battery life & charge time.
          </li>
          <li>
            <span className="material-symbols-outlined">compare_arrows</span>
            <strong> Side-by-Side Comparisons:</strong> Compare vehicles instantly.
          </li>
          <li>
            <span className="material-symbols-outlined">star</span>
            <strong> Favorites Feature:</strong> Save your picks for later.
          </li>
        </ul>

        <a href="/" className="aboutus-cta-button">
          <span className="material-symbols-outlined">explore</span> Explore MotoMart
        </a>

        {/* Google AI Studio Style Cards */}
        <div className="aboutus-cards">
          <div className="aboutus-card">
            <span className="material-symbols-outlined card-icon">calculate</span>
            <h3>Try the EMI Calculator</h3>
            <p>Explore vehicle affordability with customizable EMI options.</p>
            <Link to="/emicalculator" className="aboutus-card-button">
              <span className="material-symbols-outlined">trending_up</span> Try it out
            </Link>
          </div>

          <div className="aboutus-card">
            <span className="material-symbols-outlined card-icon">api</span>
            <h3>Get Vehicle Data API</h3>
            <p>Integrate MotoMart APIs into your apps with real-time vehicle data.</p>
            <button>
              <span className="material-symbols-outlined">vpn_key</span> Get your API key
            </button>
          </div>

          <div className="aboutus-card">
            <span className="material-symbols-outlined card-icon">compare_arrows</span>
            <h3>Compare Vehicles</h3>
            <p>Side-by-side comparisons for specs, pricing, and features.</p>
            <button>
              <span className="material-symbols-outlined">directions_car</span> Explore Now
            </button>
          </div>
        </div>

        <div className="aboutus-footer">
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/AkashDeolikar/MotoMart"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
