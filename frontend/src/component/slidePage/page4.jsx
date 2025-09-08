import React from "react";
import "./page4.css";

import img1 from "./p4img.jpg";
import img2 from "./p4img1.jpg";

const Page4 = () => {
  return (
    <div className="B1Page">
      {/* Hero Section */}
      <section className="bgPaper">
        <h5>Our Commitment</h5>
        <h1 className="gradient-text">Committed to Good</h1>
        <h1 className="gradient-text">in Automobiles</h1>
      </section>

      {/* Purpose Section */}
      <section className="ConstantBG">
        <div className="T1Page">
          <h2 className="constantBGT1page">Driven by Purpose</h2>
          <p className="constantBGT1page">
            We’re not just building vehicles — we’re building a better tomorrow.
            Our purpose-driven innovations reflect a commitment to
            sustainability, safety, and smarter mobility for all.
          </p>
          <p className="constantBGT1page">
            With over <strong>500,000+ electric vehicles</strong> on roads
            globally, and <strong>reduction of 2 million+ tons</strong> of CO₂
            emissions in the last 3 years, our work goes beyond transportation.
            Our dedication to circular manufacturing, renewable energy adoption,
            and clean mobility ensures that every drive makes a difference.
          </p>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="drops">
        {/* Sustainability */}
        <div className="drop-item">
          <button
            className="btn-attractive"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSustainability"
            aria-expanded="false"
            aria-controls="collapseSustainability"
          >
            <h3 className="dropheading">
              Sustainability <i className="bi bi-chevron-down"></i>
            </h3>
          </button>
          <div className="collapse" id="collapseSustainability">
            <div className="drop-flex">
              <div className="drop-image">
                <img src={img1} alt="Sustainability initiatives" />
              </div>
              <div className="drop-text">
                <h3>Eco-Friendly by Design</h3>
                <p>
                  Sustainability is at the core of our engineering. With{" "}
                  <strong>over 85% recyclability</strong> in our new vehicle
                  platforms and <strong>70% manufacturing powered by renewable energy</strong>, we ensure a low environmental footprint at every step.
                </p>
                <p>
                  We’ve installed <strong>500+ fast-charging stations</strong>{" "}
                  across major highways and cities, enabling long-distance green
                  travel. Our initiatives help conserve over{" "}
                  <strong>100 million liters of fuel annually</strong> through
                  efficient vehicle design and electric transitions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Innovation */}
        <div className="drop-item">
          <button
            className="btn-attractive"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseInnovation"
            aria-expanded="false"
            aria-controls="collapseInnovation"
          >
            <h3 className="dropheading">
              Responsible Innovation <i className="bi bi-chevron-down"></i>
            </h3>
          </button>
          <div className="collapse" id="collapseInnovation">
            <div className="drop-flex">
              <div className="drop-image">
                <img src={img2} alt="Innovation features" />
              </div>
              <div className="drop-text">
                <h3>Smart, Safe & Human-Centric</h3>
                <p>
                  Almost all vehicles integrate{" "}
                  <strong>30+ ADAS features</strong> across our latest models to
                  ensure driver safety and control. With{" "}
                  <strong>AI-based diagnostics</strong>, we reduce vehicle
                  breakdowns and enhance predictive maintenance.
                </p>
                <p>
                  Our platforms process over{" "}
                  <strong>2 TB of telemetry data daily</strong>, continuously
                  improving performance and customer experiences. Voice
                  dashboards, real-time updates, and smart connectivity bring
                  tomorrow’s tech today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page4;
