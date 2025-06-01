import React from "react";
import "./overview.css";

const OverviewPage = () => {
  return (
    <div className="overview-container">
      <header className="overview-header">
        <h1>Overview of Car and Bike Evaluation</h1>
      </header>

      <section className="overview-intro">
        <p>
          Learn how to evaluate the condition of vehicles—cars and bikes—effectively.
          This guide covers essential checks and best practices to ensure safety,
          performance, and reliability.
        </p>
      </section>

      <section className="overview-section">
        <h2>What’s included in a vehicle evaluation?</h2>
        <p>
          The evaluation involves examining various aspects of a vehicle, such as:
        </p>
        <ul>
          <li>Engine performance and fuel efficiency</li>
          <li>Exterior and interior condition</li>
          <li>Brake, suspension, and steering systems</li>
          <li>Electrical systems and onboard electronics</li>
          <li>Service history and accident records</li>
        </ul>
      </section>

      <section className="overview-section">
        <h2>Cars vs. Bikes</h2>
        <p>
          While both cars and bikes share common checks, cars are evaluated for
          spaciousness and comfort features, whereas bikes are assessed for handling,
          maneuverability, and balance.
        </p>
      </section>

      <section className="overview-section">
        <h2>Why is this evaluation important?</h2>
        <p>
          A detailed inspection and test drive ensure that vehicles meet safety and
          legal standards, providing peace of mind for both buyers and sellers.
        </p>
      </section>
    </div>
  );
};

export default OverviewPage;
