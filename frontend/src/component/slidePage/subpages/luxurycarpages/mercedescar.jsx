import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import MercedesCClass from '../PageAsset/mercedes/Cclass.jpg';
import MercedesEClass from '../PageAsset/mercedes/Eclass.jpg';
import MercedesSClass from '../PageAsset/mercedes/Sclass.jpg';
import MercedesGLC from '../PageAsset/mercedes/GLC.jpg';
import MercedesEQS from '../PageAsset/mercedes/EQS.jpg';


const tabData = [
    {
        title: "MERCEDES-BENZ C-CLASS (PETROL MHEV)",
        image: MercedesCClass,
        specs: [
            { label: "ENGINE", value: "2.0L Turbo I4 MHEV" },
            { label: "MAXIMUM POWER", value: "190", unit: "kW" }, // ~255 HP
            { label: "0-100 KM/H", value: "6.0", unit: "S" }
        ],
        description: 'The Mercedes-Benz C-Class blends dynamic design with advanced technology, featuring a mild-hybrid petrol engine for efficient and spirited driving performance.',
        cta: "https://www.mercedes-benz.co.in/passengercars/models/c-class/saloon/overview.html"
    },
    {
        title: "MERCEDES-BENZ E-CLASS (PETROL MHEV)",
        image: MercedesEClass,
        specs: [
            { label: "ENGINE", value: "2.0L Turbo I4 MHEV" },
            { label: "MAXIMUM POWER", value: "190", unit: "kW" }, // ~255 HP
            { label: "0-100 KM/H", value: "6.1", unit: "S" }
        ],
        description: 'The Mercedes-Benz E-Class combines executive comfort with cutting-edge innovation, offering a sophisticated driving experience with its powerful mild-hybrid petrol engine.',
        cta: "https://www.mercedes-benz.co.in/passengercars/models/e-class/saloon-v214/overview.html"
    },
    {
        title: "MERCEDES-BENZ S-CLASS (LUXURY PETROL MHEV)",
        image: MercedesSClass,
        specs: [
            { label: "ENGINE", value: "3.0L I6 Turbo MHEV" },
            { label: "MAXIMUM POWER", value: "270", unit: "kW" }, // ~362 HP
            { label: "0-100 KM/H", value: "5.1", unit: "S" }
        ],
        description: 'The Mercedes-Benz S-Class sets the standard for automotive luxury, offering unparalleled comfort, advanced technology, and powerful yet refined performance from its mild-hybrid engine.',
        cta: "https://www.mercedes-benz.co.in/passengercars/models/s-class/saloon-v223/overview.html"
    },
    {
        title: "MERCEDES-BENZ GLC (SUV PETROL MHEV)",
        image: MercedesGLC,
        specs: [
            { label: "ENGINE", value: "2.0L Turbo I4 MHEV" },
            { label: "MAXIMUM POWER", value: "190", unit: "kW" }, // ~255 HP
            { label: "0-100 KM/H", value: "6.2", unit: "S" }
        ],
        description: 'The Mercedes-Benz GLC is a dynamic and elegant SUV, offering a harmonious blend of refined design, advanced features, and efficient mild-hybrid performance for everyday versatility.',
        cta: "https://www.mercedes-benz.co.in/passengercars/models/glc/suv-x254/overview.html"
    },
    {
        title: "MERCEDES-BENZ EQS (ALL-ELECTRIC LUXURY)",
        image: MercedesEQS,
        specs: [
            { label: "POWERTRAIN", value: "Electric Motor (RWD)" },
            { label: "MAXIMUM POWER", value: "245", unit: "kW" }, // ~329 HP
            { label: "0-100 KM/H", value: "6.2", unit: "S" },
            { label: "ELECTRIC RANGE (WLTP)", value: "785", unit: "KM" }
        ],
        description: 'The Mercedes-Benz EQS is the brand\'s flagship all-electric luxury sedan, offering groundbreaking technology, exceptional comfort, and a long electric range for a sustainable driving experience.',
        cta: "https://www.mercedes-benz.co.in/passengercars/models/eqs/saloon/overview.html"
    },
];

const Mercedescar = () => {
    // Removed activeTab state as activeIndex handles tab selection
    const [activeIndex, setActiveIndex] = useState(0); // Initialize with the first tab active
    const active = tabData[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">HEIGHTENED PERFORMANCE</h1>
                    <p className="subtitle">
                        Experience precision engineering and iconic luxury with Mercedes-Benz, offering a diverse range from efficient sedans and versatile SUVs to groundbreaking all-electric vehicles.
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

export default Mercedescar;