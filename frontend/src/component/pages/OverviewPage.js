import React from "react";
import "./overview.css";

const OverviewPage = () => {
  return (
    <main className="vehicle-revolution-container">
      <section
        className="vehicle-revolution-hero-section"
        id="hero"
        aria-label="Introduction to Vehicle Evolution"
      >
        <h1 className="vehicle-revolution-hero-title">
          The Journey of Motion:{" "}
          <span>2- and 4-Wheeler Evolution & Technology</span>
        </h1>
        <p className="vehicle-revolution-hero-subtext">
          Embark on a journey through time to explore the remarkable evolution
          of personal transportation. From the humble beginnings of bicycles and
          rudimentary automobiles to today's sophisticated smart vehicles, this
          overview delves into the key milestones and technological breakthroughs
          that have shaped two-wheelers and four-wheelers, profoundly impacting
          how we live, work, and travel.
        </p>
      </section>

      {/* 2-WHEELER TIMELINE */}
      <section
        className="vehicle-revolution-section"
        id="two-wheeler-evolution"
        aria-label="2-Wheeler Evolution Timeline"
      >
        <h2 className="vehicle-revolution-timeline-heading">
          The Evolution of 2-Wheelers: From Boneshakers to Superbikes
        </h2>
        <p className="vehicle-revolution-timeline-description">
          The story of the motorcycle begins with the bicycle. Early designs,
          often dubbed "boneshakers," laid the groundwork for motorized
          two-wheelers.
        </p>
        <ul className="vehicle-revolution-timeline">
          <li className="vehicle-revolution-timeline-card">
            <p className="vehicle-revolution-timeline-year">Late 19th Century</p>
            <h3 className="vehicle-revolution-timeline-title">Early Motorization</h3>
            <p className="vehicle-revolution-timeline-description">
              The first internal combustion engines were fitted to bicycles,
              creating motorized bicycles. Crude and often unreliable, they marked
              the birth of the motorcycle.
            </p>
          </li>
          <li className="vehicle-revolution-timeline-card">
            <p className="vehicle-revolution-timeline-year">Early 20th Century</p>
            <h3 className="vehicle-revolution-timeline-title">
              Mass Production & Design Refinement
            </h3>
            <p className="vehicle-revolution-timeline-description">
              Brands like Harley-Davidson and Indian emerged, standardizing designs
              with improved engines, suspension, and braking systems.
            </p>
          </li>
          <li className="vehicle-revolution-timeline-card">
            <p className="vehicle-revolution-timeline-year">Mid-20th Century</p>
            <h3 className="vehicle-revolution-timeline-title">
              Performance & Diversification
            </h3>
            <p className="vehicle-revolution-timeline-description">
              Post-WWII saw a boom in high-performance motorcycles, with the
              introduction of overhead valve engines and sportbike designs.
            </p>
          </li>
          <li className="vehicle-revolution-timeline-card">
            <p className="vehicle-revolution-timeline-year">
              Late 20th & 21st Century
            </p>
            <h3 className="vehicle-revolution-timeline-title">
              Safety, Electronics & Electrification
            </h3>
            <p className="vehicle-revolution-timeline-description">
              Modern motorcycles feature ABS, traction control, riding modes, and
              now electric bikes are rising with zero emissions and instant torque.
            </p>
          </li>
        </ul>
      </section>

      {/* 4-WHEELER TIMELINE */}
      <section
        className="vehicle-revolution-section"
        id="four-wheeler-evolution"
        aria-label="4-Wheeler Evolution Timeline"
      >
        <h2 className="vehicle-revolution-timeline-heading">
          The Evolution of 4-Wheelers: From Horsepower to AI-Powered Mobility
        </h2>
        <p className="vehicle-revolution-timeline-description">
          The automobile's development has been a relentless pursuit of speed,
          safety, comfort, and efficiency.
        </p>
        <ul className="vehicle-revolution-timeline">
          <li className="vehicle-revolution-timeline-card">
            <p className="vehicle-revolution-timeline-year">
              Late 19th - Early 20th Century
            </p>
            <h3 className="vehicle-revolution-timeline-title">
              The Dawn of Motoring
            </h3>
            <p className="vehicle-revolution-timeline-description">
              Karl Benz's Patent-Motorwagen marked the beginning. Henry Ford's
              assembly line (Model T) revolutionized production.
            </p>
          </li>
          <li className="vehicle-revolution-timeline-card">
            <p className="vehicle-revolution-timeline-year">Mid-20th Century</p>
            <h3 className="vehicle-revolution-timeline-title">
              Design, Safety & Performance Focus
            </h3>
            <p className="vehicle-revolution-timeline-description">
              Cars adopted independent suspensions, automatic transmissions, and
              early safety features. The muscle car era also emerged.
            </p>
          </li>
          <li className="vehicle-revolution-timeline-card">
            <p className="vehicle-revolution-timeline-year">Late 20th Century</p>
            <h3 className="vehicle-revolution-timeline-title">
              Efficiency, Emissions & Electronics
            </h3>
            <p className="vehicle-revolution-timeline-description">
              Oil crises shifted focus to fuel efficiency. Emission control tech
              and early electronics like ABS and fuel injection were introduced.
            </p>
          </li>
          <li className="vehicle-revolution-timeline-card">
            <p className="vehicle-revolution-timeline-year">21st Century</p>
            <h3 className="vehicle-revolution-timeline-title">
              Smart Cars & Sustainable Mobility
            </h3>
            <p className="vehicle-revolution-timeline-description">
              Hybrid and electric vehicles, ADAS systems, and connected infotainment
              are becoming standard, paving the way for autonomous driving.
            </p>
          </li>
        </ul>
      </section>

      {/* CROSS-CUTTING INNOVATIONS */}
      <section
        className="vehicle-revolution-section"
        id="cross-cutting-tech"
        aria-label="Cross-cutting Technology Upgrades"
      >
        <h2 className="vehicle-revolution-timeline-heading">
          Cross-Cutting Technological Upgrades
        </h2>
        <p className="vehicle-revolution-timeline-description">
          Many advancements have transformed both 2- and 4-wheelers:
        </p>
        <ul className="vehicle-revolution-timeline">
          <li className="vehicle-revolution-timeline-card">
            <h3 className="vehicle-revolution-timeline-title">
              Engine & Powertrain Innovations
            </h3>
            <p className="vehicle-revolution-timeline-description">
              From carburetion to electric propulsion, with turbocharging,
              variable valve timing, and hybrids in between.
            </p>
          </li>
          <li className="vehicle-revolution-timeline-card">
            <h3 className="vehicle-revolution-timeline-title">Safety Systems</h3>
            <p className="vehicle-revolution-timeline-description">
              Basic seatbelts evolved into airbags, crumple zones, ESC, and now
              ADAS features like lane assist and auto emergency braking.
            </p>
          </li>
          <li className="vehicle-revolution-timeline-card">
            <h3 className="vehicle-revolution-timeline-title">
              Comfort & Convenience
            </h3>
            <p className="vehicle-revolution-timeline-description">
              From power windows to AI voice controls and wireless phone
              integration, comfort is redefined.
            </p>
          </li>
          <li className="vehicle-revolution-timeline-card">
            <h3 className="vehicle-revolution-timeline-title">
              Material Science & Manufacturing
            </h3>
            <p className="vehicle-revolution-timeline-description">
              Lightweight materials like aluminum and carbon fiber improve
              performance while 3D printing and automation increase precision.
            </p>
          </li>
          <li className="vehicle-revolution-timeline-card">
            <h3 className="vehicle-revolution-timeline-title">
              Connectivity & AI
            </h3>
            <p className="vehicle-revolution-timeline-description">
              AI powers navigation, OTA updates, and advanced diagnostics.
              Connectivity is a core feature for modern vehicles.
            </p>
          </li>
        </ul>
      </section>

      {/* FUTURE OF MOBILITY */}
      <section
        className="vehicle-revolution-future-section"
        id="future"
        aria-label="The Future of Mobility"
      >
        <h2 className="vehicle-revolution-future-heading">The Future of Mobility</h2>
        <p className="vehicle-revolution-future-description">
          Autonomous driving, vehicle-to-everything (V2X) communication,
          sustainable manufacturing, and AI will define the next chapter in the
          evolution of personal transportation. The journey continues.
        </p>
      </section>
    </main>
  );
};

export default OverviewPage;
