import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import FordEdgeST from '../PageAsset/ford/FordEdgeST.jpg';
import fordendeavour from '../PageAsset/ford/fordendeavour.jpg';
import FordF150Lobo from '../PageAsset/ford/FordF150Lobo.jpg';
import FordMustangGTD from '../PageAsset/ford/FordMustangGTD.jpg';

const tabData = [
    {
        title: "FORD ENDEAVOUR (DIESEL SUV)",
        image: fordendeavour,
        specs: [
            { label: "MAX POWER", value: "207.13", unit: "BHP" },
            { label: "MAX TORQUE", value: "500", unit: "NM" },
            { label: "ENGINE", value: "2.0L Bi-Turbo Diesel" }
        ],
        description: 'The Ford Endeavour (also known as Everest in some markets) is a robust and capable 7-seater SUV, powered by efficient diesel engines and designed for both on-road comfort and off-road adventures.',
        cta: "https://www.ford.com/suvs/"
    },
    {
        title: "FORD F-150 LOBO (V8 TRUCK)",
        image: FordF150Lobo,
        specs: [
            { label: "HORSEPOWER", value: "400", unit: "HP" },
            { label: "TORQUE", value: "410", unit: "LB-FT" },
            { label: "TOWING CAPACITY", value: "7,900", unit: "LBS" }
        ],
        description: 'The 2025 Ford F-150 Lobo is a street-focused performance truck, featuring a powerful 5.0L Coyote V8 engine, aggressive styling, and robust towing capabilities.',
        cta: "https://www.ford.com/trucks/"
    },
    {
        title: "FORD MUSTANG GTD (SUPERCAR)",
        image: FordMustangGTD,
        specs: [
            { label: "MAX HORSEPOWER", value: "815", unit: "HP" },
            { label: "TOP SPEED", value: "325", unit: "KM/H" },
            { label: "NURBURGRING TIME", value: "6 Min. 52.072 Sec." }
        ],
        description: `The Ford Mustang GTD is a street-legal, track-focused supercar, boasting a supercharged 5.2L V8 engine and advanced suspension for unparalleled performance.`,
        cta: "https://www.ford.com/performance/mustang-gtd/"
    },
    {
        title: "FORD EDGE ST (PERFORMANCE SUV)",
        image: FordEdgeST,
        specs: [
            { label: "HORSEPOWER", value: "335", unit: "HP" },
            { label: "TORQUE", value: "380", unit: "LB-FT" },
            { label: "ENGINE", value: "2.7L EcoBoost V6" }
        ],
        description: 'The Ford Edge ST features a powerful 2.7L EcoBoost V6 engine, delivering a dynamic and sporty SUV experience with impressive performance.',
        cta: "https://www.ford.com/suvs/"
    },
];

const Fordcar = () => {
    // Removed activeTab state as activeIndex handles tab selection
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">HEIGHTENED PERFORMANCE</h1>
                    <p className="subtitle">
                        Experience innovation and driving excitement with Ford, offering a powerful range from rugged trucks and versatile SUVs to iconic performance vehicles.
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
                                        {spec.desc && <p className="spec-desc">{spec.desc}</p>}
                                    </div>
                                ))}
                            </div>
                            <p className="titleH">{active.title}</p>
                            <p className="descriptionn">{active.description}</p>
                            <a className="btn-boxpage5 mt-4 appearIntroPage5" href={active.cta} target="_blank" rel="noopener noreferrer">
                                View More
                            </a>
                        </div>
                    </div>
                </div>

                {/* Removed the redundant "View More" button at the bottom */}
            </div>
        </div>
    );
}

export default Fordcar;