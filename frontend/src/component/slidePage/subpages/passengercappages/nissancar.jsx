import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import NissanMagniteImage from '../passengercappages/PageAsset2/nissan/magnite.jpg';
import NissanKicksImage from '../passengercappages/PageAsset2/nissan/kicks.jpg';
import NissanLeafImage from '../passengercappages/PageAsset2/nissan/leaf.jpg';

const tabData = [
    {
        title: "NISSAN MAGNITE (PETROL SUV)",
        image: NissanMagniteImage,
        specs: [
            { label: "ENGINE", value: "1.0L B4D Petrol / 1.0L HRA0 Turbo Petrol" },
            { label: "MAX POWER (Turbo)", value: "74", unit: "kW" }, // ~100 PS
            { label: "MILEAGE (Turbo)", value: "20", unit: "KM/L" }
        ],
        description: 'The Nissan Magnite is a dynamic and stylish compact SUV, offering a bold design, advanced technology features, and impressive fuel efficiency, making it an ideal choice for urban and highway driving.',
        cta: "https://www.nissan.in/vehicles/new-vehicles/magnite.html"
    },
    {
        title: "NISSAN KICKS (PETROL SUV)",
        image: NissanKicksImage,
        specs: [
            { label: "ENGINE", value: "1.5L H4K Petrol / 1.3L HR13DET Turbo Petrol" },
            { label: "MAX POWER (Turbo)", value: "115", unit: "kW" }, // ~156 PS
            { label: "GROUND CLEARANCE", value: "210", unit: "mm" }
        ],
        description: 'The Nissan Kicks combines robust SUV aesthetics with a comfortable and feature-rich interior. Its powerful engine options provide an engaging driving experience, suitable for diverse terrains and urban commutes.',
        cta: "https://www.nissan.in/vehicles/new-vehicles/kicks.html"
    },
    {
        title: "NISSAN LEAF (ALL-ELECTRIC)",
        image: NissanLeafImage,
        specs: [
            { label: "POWERTRAIN", value: "Electric Motor" },
            { label: "MAX POWER", value: "110", unit: "kW" }, // ~147 hp (for 40 kWh model)
            { label: "ELECTRIC RANGE (WLTP)", value: "270", unit: "KM" }
        ],
        description: 'The Nissan Leaf is a pioneer in electric vehicles, offering silent, emissions-free driving with impressive range, innovative technology, and a comfortable ride, making sustainable mobility accessible.',
        cta: "https://global.nissannews.com/en/channels/leaf" // Global site as availability varies by region
    },
    // Add more Nissan models if you have data for them, e.g., Nissan Almera/Versa, Nissan X-Trail, Nissan GT-R etc.
];

const Nissancar = () => {
    const [activeIndex, setActiveIndex] = useState(0); // Initialize with the first tab active
    const active = tabData[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block"> {/* Consider renaming this class to be more generic, e.g., "car-spec-block" */}
                <div className="rover-tabs-container"> {/* Consider renaming this class to be more generic, e.g., "car-tabs-container" */}
                    <h1 className="title1">INNOVATION THAT EXCITES</h1>
                    <p className="subtitle">
                        Discover Nissan's diverse range of vehicles, crafted with groundbreaking technology, dynamic performance, and a commitment to exciting and sustainable mobility.
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
            </div>
        </div>
    );
}

export default Nissancar;