import React from "react";
import "./pages.css";

const Page2 = () => {
  return (
    <div className="page2-root">
      {/* Hero */}
      <section className="page2-hero">
        <h1>Smarter Roads, Safer Cities</h1>
        <p className="page2-hero-sub">
          We build intelligent road management systems powered by AI, IoT, and
          data analytics — reducing congestion, improving safety, and keeping
          cities moving.
        </p>
      </section>

      {/* Core Focus */}
      <section className="page2-grid">
        {[
          {
            icon: "traffic",
            title: "AI Traffic Control",
            desc: "Dynamic traffic lights powered by AI that adapt in real-time to reduce congestion and emissions.",
          },
          {
            icon: "sensors",
            title: "Smart Road Monitoring",
            desc: "IoT sensors track road quality and predict maintenance needs, preventing costly breakdowns.",
          },
          {
            icon: "shield_person",
            title: "Vision Zero Safety",
            desc: "Accident-prevention systems that support global Vision Zero goals to eliminate road fatalities.",
          },
          {
            icon: "satellite_alt",
            title: "Connected Infrastructure",
            desc: "Integrating vehicles, satellites, and smart signals for seamless mobility across cities.",
          },
        ].map((item, idx) => (
          <div key={idx} className="page2-card">
            <span className="material-symbols-outlined page2-icon">
              {item.icon}
            </span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Latest Initiatives */}
      <section className="page2-initiatives">
        <h2>Transforming Urban Transport</h2>
        <div className="page2-initiatives-grid">
          {[
            {
              icon: "apartment",
              title: "Smart City Pilots",
              desc: "Over 25 pilot projects launched globally integrating smart roads with real-time traffic data.",
            },
            {
              icon: "directions_bus",
              title: "AI-Managed Bus Corridors",
              desc: "Dedicated AI-controlled bus lanes reduce wait times and improve commuter experience.",
            },
            {
              icon: "eco",
              title: "Low-Emission Zones",
              desc: "Supporting city authorities in creating cleaner, greener transport corridors with intelligent tolling.",
            },
          ].map((item, idx) => (
            <div key={idx} className="page2-initiative">
              <span className="material-symbols-outlined page2-icon">
                {item.icon}
              </span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="page2-stats">
        <div className="page2-stat">
          <h3>30+</h3>
          <p>Smart city projects deployed</p>
        </div>
        <div className="page2-stat">
          <h3>60%</h3>
          <p>Average reduction in traffic congestion</p>
        </div>
        <div className="page2-stat">
          <h3>2M+</h3>
          <p>Road sensors actively monitoring conditions</p>
        </div>
      </section>
    </div>
  );
};

export default Page2;
