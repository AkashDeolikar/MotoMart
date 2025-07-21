import React from "react";
import "./overview.css";

const OverviewPage = () => {
  return (
    <div className="overviewpagecode-container">
      <section className="overviewpagecode-hero-section">
        <h1 className="overviewpagecode-hero-title">
          The Journey of Motion: <span>2- and 4-Wheeler Evolution & Technology</span>
        </h1>
        <p className="overviewpagecode-hero-subtext">
          Embark on a journey through time to explore the remarkable evolution of personal transportation. From the humble beginnings of bicycles and rudimentary automobiles to today's sophisticated smart vehicles, this overview delves into the key milestones and technological breakthroughs that have shaped two-wheelers and four-wheelers, profoundly impacting how we live, work, and travel.
        </p>
      </section>

      <section className="overviewpagecode-section">
        <h2 className="overviewpagecode-timeline-heading">The Evolution of 2-Wheelers: From Boneshakers to Superbikes</h2>
        <p className="overviewpagecode-timeline-description">
          The story of the motorcycle begins with the bicycle. Early designs, often dubbed "boneshakers," laid the groundwork for motorized two-wheelers.
        </p>
        <ul className="overviewpagecode-timeline">
          <li className="overviewpagecode-timeline-card">
            <p className="overviewpagecode-timeline-year">Late 19th Century</p>
            <h3 className="overviewpagecode-timeline-title">Early Motorization</h3>
            <p className="overviewpagecode-timeline-description">The first internal combustion engines were fitted to bicycles, creating motorized bicycles. Crude and often unreliable, they marked the birth of the motorcycle.</p>
          </li>
          <li className="overviewpagecode-timeline-card">
            <p className="overviewpagecode-timeline-year">Early 20th Century</p>
            <h3 className="overviewpagecode-timeline-title">Mass Production & Design Refinement</h3>
            <p className="overviewpagecode-timeline-description">Brands like Harley-Davidson and Indian emerged, standardizing designs with improved engines, suspension, and braking systems, making motorcycles more practical for daily use.</p>
          </li>
          <li className="overviewpagecode-timeline-card">
            <p className="overviewpagecode-timeline-year">Mid-20th Century</p>
            <h3 className="overviewpagecode-timeline-title">Performance & Diversification</h3>
            <p className="overviewpagecode-timeline-description">Post-WWII saw a boom in performance-oriented motorcycles. The introduction of overhead valve engines, multi-cylinder configurations, and advanced frame designs led to the rise of sportbikes, cruisers, and off-road bikes.</p>
          </li>
          <li className="overviewpagecode-timeline-card">
            <p className="overviewpagecode-timeline-year">Late 20th & 21st Century</p>
            <h3 className="overviewpagecode-timeline-title">Safety, Electronics & Electrification</h3>
            <p className="overviewpagecode-timeline-description">Modern motorcycles feature sophisticated electronics like Anti-lock Braking Systems (ABS), Traction Control (TC), riding modes, and advanced infotainment. The advent of electric motorcycles is revolutionizing the segment with instant torque and zero emissions.</p>
          </li>
        </ul>
      </section>

      <section className="overviewpagecode-section">
        <h2 className="overviewpagecode-timeline-heading">The Evolution of 4-Wheelers: From Horsepower to AI-Powered Mobility</h2>
        <p className="overviewpagecode-timeline-description">
          The automobile's development has been a relentless pursuit of speed, safety, comfort, and efficiency.
        </p>
        <ul className="overviewpagecode-timeline">
          <li className="overviewpagecode-timeline-card">
            <p className="overviewpagecode-timeline-year">Late 19th - Early 20th Century</p>
            <h3 className="overviewpagecode-timeline-title">The Dawn of Motoring</h3>
            <p className="overviewpagecode-timeline-description">Karl Benz's Patent-Motorwagen marked the beginning. Henry Ford's assembly line (Model T) revolutionized production, making cars accessible to the masses.</p>
          </li>
          <li className="overviewpagecode-timeline-card">
            <p className="overviewpagecode-timeline-year">Mid-20th Century</p>
            <h3 className="overviewpagecode-timeline-title">Design, Safety & Performance Focus</h3>
            <p className="overviewpagecode-timeline-description">Post-WWII saw a boom in performance-oriented motorcycles. The introduction of independent suspension, automatic transmissions, and early safety features (seat belts) became more common. The muscle car era emphasized raw power.</p>
          </li>
          <li className="overviewpagecode-timeline-card">
            <p className="overviewpagecode-timeline-year">Late 20th Century</p>
            <h3 className="overviewpagecode-timeline-title">Efficiency, Emissions & Electronics</h3>
            <p className="overviewpagecode-timeline-description">The oil crises drove a focus on fuel efficiency. Catalytic converters addressed emissions. Microprocessors enabled electronic fuel injection, engine management systems, and early anti-lock brakes.</p>
          </li>
          <li className="overviewpagecode-timeline-card">
            <p className="overviewpagecode-timeline-year">21st Century</p>
            <h3 className="overviewpagecode-timeline-title">Smart Cars & Sustainable Mobility</h3>
            <p className="overviewpagecode-timeline-description">Modern cars are packed with technology: advanced infotainment, connectivity (Apple CarPlay/Android Auto), hybrid and electric powertrains, and sophisticated Advanced Driver-Assistance Systems (ADAS) paving the way for autonomous driving.</p>
          </li>
        </ul>
      </section>

      <section className="overviewpagecode-section">
        <h2 className="overviewpagecode-timeline-heading">Cross-Cutting Technological Upgrades</h2>
        <p className="overviewpagecode-timeline-description">Many advancements have transformed both 2- and 4-wheelers:</p>
        <ul className="overviewpagecode-timeline">
          <li className="overviewpagecode-timeline-card">
            <h3 className="overviewpagecode-timeline-title">Engine & Powertrain Innovations</h3>
            <p className="overviewpagecode-timeline-description">From carburetion to direct injection, turbocharging, variable valve timing, and the transformative shift to electric and hybrid propulsion.</p>
          </li>
          <li className="overviewpagecode-timeline-card">
            <h3 className="overviewpagecode-timeline-title">Safety Systems</h3>
            <p className="overviewpagecode-timeline-description">Evolution from basic seatbelts to multi-airbag systems, crumple zones, ABS, Electronic Stability Control (ESC), and the comprehensive suite of ADAS features (adaptive cruise control, lane keeping assist, automatic emergency braking).</p>
          </li>
          <li className="overviewpagecode-timeline-card">
            <h3 className="overviewpagecode-timeline-title">Comfort & Convenience</h3>
            <p className="overviewpagecode-timeline-description">Power steering, air conditioning, automatic climate control, sophisticated infotainment systems with navigation, voice control, and seamless smartphone integration have become standard.</p>
          </li>
          <li className="overviewpagecode-timeline-card">
            <h3 className="overviewpagecode-timeline-title">Material Science & Manufacturing</h3>
            <p className="overviewpagecode-timeline-description">Lighter, stronger materials (high-strength steel, aluminum, carbon fiber) enhance performance and fuel efficiency. Advanced manufacturing techniques ensure precision and scale.</p>
          </li>
          <li className="overviewpagecode-timeline-card">
            <h3 className="overviewpagecode-timeline-title">Connectivity & AI</h3>
            <p className="overviewpagecode-timeline-description">Vehicles are increasingly connected, offering over-the-air updates, remote diagnostics, and integrating artificial intelligence for navigation, voice assistants, and eventually, fully autonomous driving.</p>
          </li>
        </ul>
      </section>

      <section className="overviewpagecode-future-section">
        <h2 className="overviewpagecode-future-heading">The Future of Mobility</h2>
        <p className="overviewpagecode-future-description">
          The automotive landscape continues its rapid transformation. Electric vehicles are becoming mainstream, autonomous driving technology is progressing, and the focus is shifting towards integrated, sustainable, and intelligent mobility solutions that promise safer, cleaner, and more efficient transportation for all.
        </p>
      </section>
    </div>
  );
};

export default OverviewPage;