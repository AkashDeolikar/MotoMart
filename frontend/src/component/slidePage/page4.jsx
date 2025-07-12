import React from "react";
import './page4.css';

import img1 from './p4img.jpg';
import img2 from './p4img1.jpg';

const Page4 = () => {
  return (
    <div className="B1Page">
      <div className="bgPaper">
        <h5>Our Commitment</h5>
        <h1>Committed to Good</h1>
        <h1>in Automobiles</h1>
      </div>

      <div className="ConstantBG">
        <div className="T1Page">
          <h2 className="constantBGT1page">Driven by Purpose</h2>
          <p className="constantBGT1page">
            We’re not just building vehicles — we’re building a better tomorrow. Our purpose-driven innovations reflect a commitment to sustainability, safety, and smarter mobility for all.
          </p>
          <p className="constantBGT1page">
            With over <strong>500,000+ electric vehicles</strong> on roads globally, and <strong>reduction of 2 million+ tons</strong> of CO₂ emissions in the last 3 years, our work goes beyond transportation. Our dedication to circular manufacturing, renewable energy adoption, and clean mobility ensures that every drive makes a difference.
          </p>
        </div>
      </div>

      <div className="drops">
        <div className="firstdrop">
          <p className="d-inline-flex gap-1">
            <button
              className="btn-attractive"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSustainability"
              aria-expanded="false"
              aria-controls="collapseSustainability"
            >
              <h3 className="dropheading text-center mb-1">
                Sustainability <i className="bi bi-menu-down"></i>
              </h3>
            </button>
          </p>
          <div className="collapse" id="collapseSustainability">
            <div className="drop-flex">
              <div className="drop-image">
                <img
                  src={img1}
                  alt="Sustainability"
                />
              </div>
              <div className="drop-text">
                <h3>Eco-Friendly by Design</h3>
                <p>
                  Sustainability is at the core of our engineering. With <strong>over 85% recyclability</strong> in our new vehicle platforms and <strong>70% manufacturing powered by renewable energy</strong>, we ensure a low environmental footprint at every step.
                </p>
                <p>
                  We’ve installed <strong>500+ fast-charging stations</strong> across major highways and cities, enabling long-distance green travel. Our initiatives help conserve over <strong>100 million liters of fuel annually</strong> through efficient vehicle design and electric transitions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="seconddrop">
          <p className="d-inline-flex gap-1">
            <button
              className="btn-attractive"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseInnovation"
              aria-expanded="false"
              aria-controls="collapseInnovation"
            >
              <h3 className="dropheading text-center mb-1">
                Responsible Innovation <i className="bi bi-menu-down"></i>
              </h3>
            </button>
          </p>
          <div className="collapse" id="collapseInnovation">
            <div className="drop-flex">
              <div className="drop-image">
                <img
                  src={img2}
                  alt="Innovation"
                />
              </div>
              <div className="drop-text">
                <h3>Smart, Safe & Human-Centric</h3>
                <p>
                  Almost all vehicles integrated over <strong>30+ ADAS features</strong> (Advanced Driver-Assistance Systems) across our latest models to ensure driver safety and control. With <strong>AI-based diagnostics</strong>, we reduce vehicle breakdowns and enhance predictive maintenance.
                </p>
                <p>
                  Our software platforms process over <strong>2 TB of vehicle telemetry data daily</strong>, allowing us to continuously improve performance and enhance customer experiences. Voice-controlled dashboards, real-time updates, and smart connectivity bring tomorrow’s tech today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4;
