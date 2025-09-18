import React from "react";
import "./pages.css";

const Page1 = () => {
  return (
    <div className="page1-root">
      {/* Hero */}
      <section className="page1-hero">
        <h1>Smart Mobility for a Smarter World</h1>
        <p className="page1-hero-sub">
          We are reimagining transportation with clean energy, connected systems
          and AI-driven insights — making every journey safer, faster, and more
          sustainable.
        </p>
      </section>

      {/* Focus Areas */}
      <section className="page1-grid">
        {[
          {
            icon: "electric_bolt",
            title: "Electric Mobility",
            desc: "Accelerating EV adoption with fast-charging stations, high-density batteries, and affordable fleet electrification programs.",
          },
          {
            icon: "directions_car",
            title: "Connected Transport",
            desc: "Vehicle-to-vehicle (V2V) and vehicle-to-infrastructure (V2I) communication reduce accidents and streamline traffic flow.",
          },
          {
            icon: "analytics",
            title: "AI Traffic Insights",
            desc: "AI-powered algorithms analyze real-time traffic and weather data to predict congestion, improve safety, and optimize travel time.",
          },
          {
            icon: "recycling",
            title: "Sustainable Materials",
            desc: "Designing vehicles with recyclable composites, low-carbon steel, and bio-based materials to minimize environmental impact.",
          },
        ].map((item, idx) => (
          <div key={idx} className="page1-card">
            <span className="material-symbols-outlined page1-icon">
              {item.icon}
            </span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Latest Initiatives */}
      <section className="page1-initiatives">
        <h2>Latest Initiatives</h2>
        <div className="page1-initiatives-grid">
          {[
            {
              icon: "ev_station",
              title: "Nationwide EV Charging Network",
              desc: "Partnering with city governments to install 10,000+ public charging points across urban and rural highways by 2026.",
            },
            {
              icon: "sensors",
              title: "Smart City Integration",
              desc: "Integrating IoT road sensors and satellite data for real-time monitoring of traffic, air quality, and emergency routing.",
            },
            {
              icon: "shield",
              title: "Vision Zero Program",
              desc: "Deploying AI-powered accident prevention systems to help cities achieve zero road fatalities by 2030.",
            },
          ].map((item, idx) => (
            <div key={idx} className="page1-initiative">
              <span className="material-symbols-outlined page1-icon">
                {item.icon}
              </span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="page1-stats">
        <div className="page1-stat">
          <h3>120+</h3>
          <p>Smart mobility projects deployed</p>
        </div>
        <div className="page1-stat">
          <h3>500M+</h3>
          <p>Daily commuters impacted worldwide</p>
        </div>
        <div className="page1-stat">
          <h3>40%</h3>
          <p>Reduction in traffic delays using AI routing</p>
        </div>
      </section>
    </div>
  );
};

export default Page1;
