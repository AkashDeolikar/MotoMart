import React from "react";
import "./pages.css";

const Page3 = () => {
  return (
    <div className="page3-root">
      {/* Hero */}
      <section className="page3-hero">
        <h1>Driving Change Worldwide</h1>
        <p className="page3-hero-sub">
          From sustainable mobility to AI-powered road systems, our solutions
          are making transport cleaner, safer, and more inclusive across the
          globe.
        </p>
      </section>

      {/* Impact Areas */}
      <section className="page3-impact">
        {[
          {
            icon: "public",
            title: "Global Reach",
            desc: "Smart transportation technologies deployed in over 40 countries, serving millions daily.",
          },
          {
            icon: "energy_savings_leaf",
            title: "Sustainability",
            desc: "Cutting CO₂ emissions by enabling electric mobility and green logistics solutions.",
          },
          {
            icon: "shield",
            title: "Safety First",
            desc: "AI-powered systems reducing accidents and supporting Vision Zero road safety goals.",
          },
        ].map((item, idx) => (
          <div key={idx} className="page3-card">
            <span className="material-symbols-outlined page3-icon">
              {item.icon}
            </span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="page3-stats">
        <div className="page3-stat-card">
          <h2>120+</h2>
          <p>Smart City Projects</p>
        </div>
        <div className="page3-stat-card">
          <h2>500M+</h2>
          <p>Daily Commuters Impacted</p>
        </div>
        <div className="page3-stat-card">
          <h2>40%</h2>
          <p>Reduction in Traffic Delays</p>
        </div>
      </section>

      {/* Highlight */}
      <section className="page3-highlight">
        <h2>Case Study: Metro City Initiative</h2>
        <p>
          In partnership with Metro City, we deployed AI-driven traffic control
          and EV-friendly infrastructure. Within 18 months, traffic congestion
          fell by 35% and CO₂ emissions dropped significantly.
        </p>
      </section>

      {/* Partners / Testimonials */}
      <section className="page3-partners">
        <h2>Trusted by Global Leaders</h2>
        <div className="page3-partner-logos">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thu…o_Simple.svg/500px-UN_Habitat_Logo_Simple.svg.png" alt="UN Habitat" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thu…roup_logo.svg/375px-World_Bank_Group_logo.svg.png" alt="World Bank" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Siemens-logo.svg" alt="Siemens" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Toyota_logo.png" alt="Toyota" />
        </div>

        <div className="page3-testimonials">
          <blockquote>
            <p>
              "Their AI-driven traffic solutions helped us cut down delays by
              30% while improving commuter satisfaction."
            </p>
            <footer>- City Transport Authority</footer>
          </blockquote>
          <blockquote>
            <p>
              "Partnering on sustainable mobility has accelerated our journey to
              carbon neutrality."
            </p>
            <footer>- Global Automotive Partner</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default Page3;
