import React from "react";
import { Link } from 'react-router-dom';
import './page1.css';

import vr from './vr-img.jpg';
import vr2 from './vr-img2.jpg';

const Page1 = () => {
  return (
    <div className="page-container">

      {/* === Hero Section === */}
      <section className="hero-banner">
        <div className="hero-text">
          <h5>Committing to a Good Innovation</h5>
          <h1>Creating Tomorrows</h1>
          <h1>Today</h1>
        </div>
      </section>

      {/* === Key Focus Areas === */}
      <section className="info-section">
        <h2>Our Key Focus Areas</h2>
        <div className="info-cards">
          {[
            {
              title: "Electrification",
              desc: "Driving the transition to clean, green mobility solutions."
            },
            {
              title: "Connectivity",
              desc: "Advanced vehicle-to-cloud integration & real-time data."
            },
            {
              title: "Digital Services",
              desc: "Smarter UX with intelligent dashboards and AI navigation."
            },
            {
              title: "Manufacturing 4.0",
              desc: "AI-powered automation and sustainable production."
            }
          ].map((card, index) => (
            <div className="info-card" key={index}>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Accordion Section === */}
      <section className="accordion-section">
        <div className="accordion-item">
          <button
            className="accordion-toggle"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#designCollapse"
          >
            <h3>DESIGN <i className="bi bi-chevron-down"></i></h3>
          </button>
          <div className="collapse" id="designCollapse">
            <div className="accordion-content">
              <img
                src={vr}
                alt="Design"
              />
              <div className="accordion-text">
                <h3>Building a new paradigm</h3>
                <p>Design is our foundation. Our global studios craft futuristic, human-centric vehicles that blend beauty, safety, and sustainability.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <button
            className="accordion-toggle"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#techCollapse"
          >
            <h3>TECHNOLOGY <i className="bi bi-chevron-down"></i></h3>
          </button>
          <div className="collapse" id="techCollapse">
            <div className="accordion-content">
              <img
                src={vr2}
                alt="Technology"
              />
              <div className="accordion-text">
                <h3>Shaping concept to reality</h3>
                <p>We innovate with a purpose—combining AI, software, and hardware to create smart, efficient, and connected mobility systems.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Stats Highlight: Vehicle Count === */}
      <section className="stats-highlight-section">
        <div className="stats-card">
          <h3>500M+</h3>
          <p>2-Wheelers Operating Globally</p>
        </div>
        <div className="stats-card">
          <h3>1.5B+</h3>
          <p>4-Wheelers on Roads Worldwide</p>
        </div>
        <div className="stats-card">
          <h3>80M+</h3>
          <p>Commercial & Large Vehicles</p>
        </div>
      </section>

      {/* === Call to Action === */}
      <section className="cta-section">
        <h2>Ready to Drive the Future with Us?</h2>
        <p>Be a part of our journey to electrify and digitize global mobility solutions.</p>
        <Link to="/contact" className="cta-button">Get in Touch</Link>
      </section>

    </div>
  );
};

export default Page1;
