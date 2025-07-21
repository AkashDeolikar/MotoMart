import React from "react";
import "./overview.css"; // Ensure you have this CSS file for styling

const OverviewPage = () => {
  return (
    <div className="overview-container">
        <h1 className="head">The Journey of Motion: 2- and 4-Wheeler Evolution & Technology</h1>

      <section className="overview-intro">
        <p>
          Embark on a journey through time to explore the remarkable evolution of personal transportation. From the humble beginnings of bicycles and rudimentary automobiles to today's sophisticated smart vehicles, this overview delves into the key milestones and technological breakthroughs that have shaped two-wheelers and four-wheelers, profoundly impacting how we live, work, and travel.
        </p>
      </section>

      <section className="overview-section">
        <h2>The Evolution of 2-Wheelers: From Boneshakers to Superbikes</h2>
        <p>
          The story of the motorcycle begins with the bicycle. Early designs, often dubbed "boneshakers," laid the groundwork for motorized two-wheelers.
        </p>
        <ul>
          <li>
            <strong>Late 19th Century: Early Motorization</strong>
            <p>The first internal combustion engines were fitted to bicycles, creating motorized bicycles. Crude and often unreliable, they marked the birth of the motorcycle.</p>
          </li>
          <li>
            <strong>Early 20th Century: Mass Production & Design Refinement</strong>
            <p>Brands like Harley-Davidson and Indian emerged, standardizing designs with improved engines, suspension, and braking systems, making motorcycles more practical for daily use.</p>
          </li>
          <li>
            <strong>Mid-20th Century: Performance & Diversification</strong>
            <p>Post-WWII saw a boom in performance-oriented motorcycles. The introduction of overhead valve engines, multi-cylinder configurations, and advanced frame designs led to the rise of sportbikes, cruisers, and off-road bikes.</p>
          </li>
          <li>
            <strong>Late 20th & 21st Century: Safety, Electronics & Electrification</strong>
            <p>Modern motorcycles feature sophisticated electronics like Anti-lock Braking Systems (ABS), Traction Control (TC), riding modes, and advanced infotainment. The advent of electric motorcycles is revolutionizing the segment with instant torque and zero emissions.</p>
          </li>
        </ul>
      </section>

      <section className="overview-section">
        <h2>The Evolution of 4-Wheelers: From Horsepower to AI-Powered Mobility</h2>
        <p>
          The automobile's development has been a relentless pursuit of speed, safety, comfort, and efficiency.
        </p>
        <ul>
          <li>
            <strong>Late 19th - Early 20th Century: The Dawn of Motoring</strong>
            <p>Karl Benz's Patent-Motorwagen marked the beginning. Henry Ford's assembly line (Model T) revolutionized production, making cars accessible to the masses.</p>
          </li>
          <li>
            <strong>Mid-20th Century: Design, Safety & Performance Focus</strong>
            <p>Post-WWII saw a boom in performance-oriented motorcycles. The introduction of independent suspension, automatic transmissions, and early safety features (seat belts) became more common. The muscle car era emphasized raw power.</p>
          </li>
          <li>
            <strong>Late 20th Century: Efficiency, Emissions & Electronics</strong>
            <p>The oil crises drove a focus on fuel efficiency. Catalytic converters addressed emissions. Microprocessors enabled electronic fuel injection, engine management systems, and early anti-lock brakes.</p>
          </li>
          <li>
            <strong>21st Century: Smart Cars & Sustainable Mobility</strong>
            <p>Modern cars are packed with technology: advanced infotainment, connectivity (Apple CarPlay/Android Auto), hybrid and electric powertrains, and sophisticated Advanced Driver-Assistance Systems (ADAS) paving the way for autonomous driving.</p>
          </li>
        </ul>
      </section>

      <section className="overview-section">
        <h2>Cross-Cutting Technological Upgrades</h2>
        <p>Many advancements have transformed both 2- and 4-wheelers:</p>
        <ul>
          <li>
            <strong>Engine & Powertrain Innovations:</strong> From carburetion to direct injection, turbocharging, variable valve timing, and the transformative shift to electric and hybrid propulsion.
          </li>
          <li>
            <strong>Safety Systems:</strong> Evolution from basic seatbelts to multi-airbag systems, crumple zones, ABS, Electronic Stability Control (ESC), and the comprehensive suite of ADAS features (adaptive cruise control, lane keeping assist, automatic emergency braking).
          </li>
          <li>
            <strong>Comfort & Convenience:</strong> Power steering, air conditioning, automatic climate control, sophisticated infotainment systems with navigation, voice control, and seamless smartphone integration have become standard.
          </li>
          <li>
            <strong>Material Science & Manufacturing:</strong> Lighter, stronger materials (high-strength steel, aluminum, carbon fiber) enhance performance and fuel efficiency. Advanced manufacturing techniques ensure precision and scale.
          </li>
          <li>
            <strong>Connectivity & AI:</strong> Vehicles are increasingly connected, offering over-the-air updates, remote diagnostics, and integrating artificial intelligence for navigation, voice assistants, and eventually, fully autonomous driving.
          </li>
        </ul>
      </section>

      <section className="overview-section">
        <h2>The Future of Mobility</h2>
        <p>
          The automotive landscape continues its rapid transformation. Electric vehicles are becoming mainstream, autonomous driving technology is progressing, and the focus is shifting towards integrated, sustainable, and intelligent mobility solutions that promise safer, cleaner, and more efficient transportation for all.
        </p>
      </section>
    </div>
  );
};

export default OverviewPage;
