import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import Ioniq5 from '../passengercappages/PageAsset2/hyundai/Ioniq.jpg';
import Verna from '../passengercappages/PageAsset2/hyundai/verna.jpg';
import Creta from '../passengercappages/PageAsset2/hyundai/creta.jpg';
import Tucson from '../passengercappages/PageAsset2/hyundai/tucson.jpg';

const tabData = [
  {
    title: "Hyundai Ioniq 5 (Electric)",
    image: Ioniq5,
    specs: [
      { label: "BATTERY PACK", value: "72.6", unit: "kWh" },
      { label: "RANGE (ARAI)", value: "631", unit: "KM" },
      { label: "0-100 KM/H", value: "5.2", unit: "S" }
    ],
    description: "The Hyundai Ioniq 5 is a cutting-edge all-electric SUV offering futuristic design, ultra-fast 800V charging, and a spacious lounge-like interior.",
    cta: "https://ioniq5.hyundai.co.in/"
  },
  {
    title: "Hyundai Verna (Turbo Petrol)",
    image: Verna,
    specs: [
      { label: "ENGINE", value: "1.5L Turbo GDi" },
      { label: "MAX POWER", value: "117.5", unit: "kW" }, // ~160 PS
      { label: "0-100 KM/H", value: "8.1", unit: "S" }
    ],
    description: "The new Hyundai Verna is a performance-oriented sedan with sharp design, segment-leading safety, and a powerful turbocharged engine.",
    cta: "https://www.hyundai.com/in/en/find-a-car/verna/highlights"
  },
  {
    title: "Hyundai Creta (SUV)",
    image: Creta,
    specs: [
      { label: "ENGINE", value: "1.5L Petrol/Diesel" },
      { label: "MAX POWER", value: "85 - 125", unit: "kW" },
      { label: "BOOT SPACE", value: "433", unit: "L" }
    ],
    description: "The Hyundai Creta is India’s favorite SUV known for its bold design, refined engines, and a premium cabin loaded with modern tech.",
    cta: "https://www.hyundai.com/in/en/find-a-car/creta/highlights"
  },
  {
    title: "Hyundai Tucson (Premium SUV)",
    image: Tucson,
    specs: [
      { label: "ENGINE", value: "2.0L Petrol/Diesel" },
      { label: "MAX POWER", value: "114 - 137", unit: "kW" },
      { label: "ADAS LEVEL", value: "Level 2", unit: "" }
    ],
    description: "The Hyundai Tucson blends luxury and technology with global design, Level 2 ADAS, all-wheel drive, and powerful engine options.",
    cta: "https://www.hyundai.com/in/en/find-a-car/tucson/highlights"
  }
];

const Hyundaicar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tabData[activeIndex];

  return (
    <div className="bbb">
      <div className="rover-det-spec-block">
        <div className="rover-tabs-container">
          <h1 className="title1">FUTURE-READY MOBILITY</h1>
          <p className="subtitle">
            Hyundai leads innovation through electrification, turbo performance, connected tech, and futuristic design across all its segments.
          </p>

          <div className="tabs-header">
            {tabData.map((tab, idx) => (
              <button
                key={idx}
                className={`tab-button ${activeIndex === idx ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="tab-main">
            <img className="tab-image" src={active.image} alt={active.title} />
            <div className="tab-info">
              <div className="specs">
                {active.specs.map((spec, i) => (
                  <div key={i} className="spec-item">
                    <p className="spec-label">{spec.label}</p>
                    <div className="spec-value">{spec.value} <span>{spec.unit}</span></div>
                  </div>
                ))}
              </div>
              <p className="titleH">{active.title}</p>
              <p className="descriptionn">{active.description}</p>
              <a
                className="btn-boxpage5 mt-4 appearIntroPage5"
                href={active.cta}
                target="_blank"
                rel="noopener noreferrer"
              >
                View More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hyundaicar;
