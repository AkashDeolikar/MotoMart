import React from "react";
import "./overview.css";

const milestones2Wheeler = [
  {
    year: "Late 19th Century",
    title: "Early Motorization",
    description:
      "The first internal combustion engines were fitted to bicycles, creating motorized bicycles. Crude and often unreliable, they marked the birth of the motorcycle.",
  },
  {
    year: "Early 20th Century",
    title: "Mass Production & Design Refinement",
    description:
      "Brands like Harley-Davidson and Indian standardized designs with improved engines, suspension, and braking systems.",
  },
  {
    year: "Mid-20th Century",
    title: "Performance & Diversification",
    description:
      "Post-WWII saw a boom in performance-oriented bikes. Advanced frame and multi-cylinder engines emerged.",
  },
  {
    year: "21st Century",
    title: "Safety, Electronics & Electrification",
    description:
      "Modern bikes now include ABS, Traction Control, infotainment, and electrification.",
  },
];

const milestones4Wheeler = [
  {
    year: "1890s–1910s",
    title: "Birth of Motoring",
    description:
      "Benz Patent-Motorwagen and Ford's Model T revolutionized transportation and mass production.",
  },
  {
    year: "1950s–1970s",
    title: "Safety & Comfort",
    description:
      "Cars gained automatic transmissions, seat belts, and suspension systems for smoother rides.",
  },
  {
    year: "1980s–2000s",
    title: "Efficiency & Electronics",
    description:
      "Catalytic converters, fuel injection, and microprocessors improved performance and reduced emissions.",
  },
  {
    year: "2010s–Now",
    title: "Smart & Sustainable Mobility",
    description:
      "Electric vehicles, ADAS, infotainment, and connected features define today’s cars.",
  },
];

const OverviewPage = () => {
  return (
    <div className="overviewPage-container Light">
      <section className="overviewPage-hero-section">
        <h1 className="overviewPage-hero-title">
          The Journey of Motion:
          <br /> <span>2- and 4-Wheeler Evolution</span>
        </h1>
        <p className="overviewPage-hero-subtext">
          From the birth of engines to the era of autonomy and electrification,
          discover how vehicles shaped our world.
        </p>
      </section>

      <section className="overviewPage-timeline-section">
        <h2 className="overviewPage-timeline-heading">2-Wheeler Evolution</h2>
        <div className="overviewPage-timeline">
          {milestones2Wheeler.map((item, idx) => (
            <div className="overviewPage-timeline-card" key={idx}>
              <div className="overviewPage-timeline-year">{item.year}</div>
              <h3 className="overviewPage-timeline-title">{item.title}</h3>
              <p className="overviewPage-timeline-description">{item.description}</p>
            </div>
          ))}
        </div>

        <h2 className="overviewPage-timeline-heading">4-Wheeler Evolution</h2>
        <div className="overviewPage-timeline">
          {milestones4Wheeler.map((item, idx) => (
            <div className="overviewPage-timeline-card" key={idx}>
              <div className="overviewPage-timeline-year">{item.year}</div>
              <h3 className="overviewPage-timeline-title">{item.title}</h3>
              <p className="overviewPage-timeline-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overviewPage-future-section">
        <h2 className="overviewPage-future-heading">The Future of Mobility</h2>
        <p className="overviewPage-future-description">
          Electric vehicles, autonomous driving, AI-powered systems, and sustainable
          designs are driving us toward a cleaner, smarter, and safer future.
        </p>
      </section>
    </div>
  );
};

export default OverviewPage;
