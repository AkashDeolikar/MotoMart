import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import JeepCompassImage from '../passengercappages/PageAsset2/jeep/compass.jpg';
import JeepWranglerImage from '../passengercappages/PageAsset2/jeep/jeep.jpg';
import JeepGrandCherokeeImage from '../passengercappages/PageAsset2/jeep/jeep2.jpg';

const tabData = [
    {
        title: "JEEP COMPASS (PETROL/DIESEL SUV)",
        image: JeepCompassImage,
        specs: [
            { label: "ENGINE", value: "1.4L MultiAir Petrol / 2.0L MultiJet Diesel" },
            { label: "MAX POWER (Petrol)", value: "120", unit: "kW" }, // ~163 PS
            { label: "DRIVETRAIN", value: "FWD / AWD Options" }
        ],
        description: 'The Jeep Compass is a versatile and capable SUV, blending iconic Jeep design with urban sophistication. It offers powerful engine options, advanced features, and legendary off-road capability for its segment.',
        cta: "https://www.jeep-india.com/compass.html"
    },
    {
        title: "JEEP WRANGLER (PETROL SUV)",
        image: JeepWranglerImage,
        specs: [
            { label: "ENGINE", value: "2.0L Turbo Petrol" },
            { label: "MAX POWER", value: "200", unit: "kW" }, // ~270 PS
            { label: "CAPABILITY", value: "Trail Rated 4x4" }
        ],
        description: 'The Jeep Wrangler is the ultimate icon of adventure, built for extreme off-road capability with its robust design, powerful engine, and legendary 4x4 systems, perfect for conquering any terrain.',
        cta: "https://www.jeep-india.com/wrangler.html"
    },
    {
        title: "JEEP GRAND CHEROKEE (PETROL SUV)",
        image: JeepGrandCherokeeImage,
        specs: [
            { label: "ENGINE", value: "2.0L Turbo Petrol" },
            { label: "MAX POWER", value: "200", unit: "kW" }, // ~270 PS
            { label: "TRANSMISSION", value: "8-Speed Automatic" }
        ],
        description: 'The Jeep Grand Cherokee is a premium SUV that combines refined luxury with formidable capability. It offers a sophisticated interior, powerful performance, and advanced technology for a superior driving experience.',
        cta: "https://www.jeep-india.com/grand-cherokee.html"
    },
    // Add more Jeep models if you have data for them
];

const Jeepcar = () => {
    const [activeIndex, setActiveIndex] = useState(0); // Initialize with the first tab active
    const active = tabData[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block"> {/* Consider renaming this class to be more generic, e.g., "car-spec-block" */}
                <div className="rover-tabs-container"> {/* Consider renaming this class to be more generic, e.g., "car-tabs-container" */}
                    <h1 className="title1">LEGENDARY CAPABILITY, UNRIVALLED ADVENTURE</h1>
                    <p className="subtitle">
                        Explore the iconic range of Jeep SUVs, engineered for legendary off-road capability, robust performance, and everyday versatility to conquer any journey.
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

                {/* The extra br tags and redundant "View More" button were already removed in the previous correction. */}
            </div>
        </div>
    );
}

export default Jeepcar;