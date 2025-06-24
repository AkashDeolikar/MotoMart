import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import TeslaModel3Image from '../evcarpages/pageAsset/tesla/model3.jpg';
import TeslaModelYImage from '../evcarpages/pageAsset/tesla/modely.jpg';
import TeslaModelSImage from '../evcarpages/pageAsset/tesla/models.jpg';
import TeslaModelXImage from '../evcarpages/pageAsset/tesla/modelx.jpg';

const tabData = [
    {
        title: "TESLA MODEL 3 (ELECTRIC SEDAN)",
        image: TeslaModel3Image,
        specs: [
            { label: "RANGE (WLTP)", value: "513 - 629", unit: "KM" }, // RWD to Long Range AWD
            { label: "0-100 KM/H", value: "3.1 - 6.1", unit: "S" }, // Performance to RWD
            { label: "TOP SPEED", value: "201 - 262", unit: "KM/H" },
            { label: "SEATING CAPACITY", value: "5", unit: "Seats" }
        ],
        description: 'The Tesla Model 3 is a revolutionary electric sedan, offering a compelling blend of performance, long range, and advanced technology. It features a minimalist interior, powerful acceleration, and access to Tesla\'s Supercharger network.',
        cta: "https://www.tesla.com/model3/design" // Global design page
    },
    {
        title: "TESLA MODEL Y (ELECTRIC SUV)",
        image: TeslaModelYImage,
        specs: [
            { label: "RANGE (WLTP)", value: "455 - 533", unit: "KM" }, // RWD to Long Range AWD
            { label: "0-100 KM/H", value: "3.7 - 6.9", unit: "S" }, // Performance to RWD
            { label: "SEATING CAPACITY", value: "5 - 7", unit: "Seats" }, // Optional 7-seater
            { label: "CARGO SPACE", value: "2158", unit: "L" }
        ],
        description: 'The Tesla Model Y is a versatile all-electric SUV, combining the functionality of an SUV with the performance and efficiency of a Tesla. It offers ample cargo space, optional third-row seating, and impressive safety features.',
        cta: "https://www.tesla.com/modely/design" // Global design page
    },
    {
        title: "TESLA MODEL S (ELECTRIC SEDAN)",
        image: TeslaModelSImage,
        specs: [
            { label: "RANGE (EPA EST.)", value: "660 - 675", unit: "KM" }, // Dual Motor to Plaid
            { label: "0-100 KM/H", value: "2.1 - 3.2", unit: "S" }, // Plaid with rollout subtracted to Dual Motor
            { label: "TOP SPEED", value: "250 - 322", unit: "KM/H" },
            { label: "PEAK POWER", value: "670 - 1020", unit: "HP" } // Dual Motor to Plaid
        ],
        description: 'The Tesla Model S is the pinnacle of electric luxury and performance. With its striking design, cutting-edge technology, and Ludicrous acceleration, it redefines what an executive sedan can be.',
        cta: "https://www.tesla.com/models/design" // Global design page
    },
    {
        title: "TESLA MODEL X (ELECTRIC SUV)",
        image: TeslaModelXImage,
        specs: [
            { label: "RANGE (EPA EST.)", value: "536 - 560", unit: "KM" }, // Plaid to Dual Motor
            { label: "0-100 KM/H", value: "2.6 - 3.9", unit: "S" }, // Plaid with rollout subtracted to Dual Motor
            { label: "SEATING CAPACITY", value: "5 - 7", unit: "Seats" },
            { label: "TOWING CAPACITY", value: "2268", unit: "KG" }
        ],
        description: 'The Tesla Model X is an all-electric SUV featuring unique Falcon Wing doors, impressive performance, and seating for up to seven adults. It combines utility with advanced safety and a luxurious, technology-rich interior.',
        cta: "https://www.tesla.com/modelx/design" // Global design page
    },
    // You can add upcoming models like Cybertruck or Roadster when they are closer to launch in India.
];

const Teslaevcar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData?.[activeIndex]; // Use optional chaining for safety

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">ACCELERATING THE WORLD'S TRANSITION TO SUSTAINABLE ENERGY</h1>
                    <p className="subtitle">
                        Explore Tesla's lineup of innovative electric vehicles, where unparalleled performance, advanced autonomy, and sustainable technology converge for an electrifying driving experience.
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
                        {active ? (
                            <>
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
                            </>
                        ) : (
                            <p>No Tesla EV models available to display.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teslaevcar;