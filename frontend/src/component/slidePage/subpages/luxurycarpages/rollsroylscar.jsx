import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import RollsRoycePhantom from '../PageAsset/RollsRoyls/RRPhantom.jpg';
import RollsRoyceGhost from '../PageAsset/RollsRoyls/RRGhost.jpg';
import RollsRoyceCullinan from '../PageAsset/RollsRoyls/RRCullinan.jpg';
import RollsRoyceSpectre from '../PageAsset/RollsRoyls/RRSpectre.jpg';

const tabData = [
    {
        title: "ROLLS-ROYCE PHANTOM (V12 PETROL)",
        image: RollsRoycePhantom,
        specs: [
            { label: "ENGINE", value: "6.75L Twin-Turbo V12" },
            { label: "MAXIMUM POWER", value: "420", unit: "kW" }, // ~563 HP
            { label: "0-100 KM/H", value: "5.3", unit: "S" }
        ],
        description: 'The Rolls-Royce Phantom is the pinnacle of automotive luxury, powered by a serene 6.75-litre twin-turbo V12 engine, delivering effortless performance and an unparalleled ride quality.',
        cta: "https://www.rolls-roycemotorcars.com/en_GB/bespoke/phantom-configurator.html"
    },
    {
        title: "ROLLS-ROYCE GHOST (V12 PETROL)",
        image: RollsRoyceGhost,
        specs: [
            { label: "ENGINE", value: "6.75L Twin-Turbo V12" },
            { label: "MAXIMUM POWER", value: "420", unit: "kW" }, // ~563 HP
            { label: "0-100 KM/H", value: "4.8", unit: "S" }
        ],
        description: 'The Rolls-Royce Ghost offers a more contemporary and dynamic interpretation of Rolls-Royce luxury, featuring a powerful 6.75-litre twin-turbo V12 engine and a focus on minimalist design.',
        cta: "https://www.rolls-roycemotorcars.com/en_GB/bespoke/ghost-configurator.html"
    },
    {
        title: "ROLLS-ROYCE CULLINAN (V12 SUV)",
        image: RollsRoyceCullinan,
        specs: [
            { label: "ENGINE", value: "6.75L Twin-Turbo V12" },
            { label: "MAXIMUM POWER", value: "420", unit: "kW" }, // ~563 HP
            { label: "0-100 KM/H", value: "5.2", unit: "S" }
        ],
        description: 'The Rolls-Royce Cullinan is the brand\'s first all-terrain SUV, combining uncompromised luxury with remarkable versatility, powered by the signature 6.75-litre twin-turbo V12 engine.',
        cta: "https://www.rolls-roycemotorcars.com/en_GB/bespoke/cullinan-configurator.html"
    },
    {
        title: "ROLLS-ROYCE SPECTRE (ALL-ELECTRIC)",
        image: RollsRoyceSpectre,
        specs: [
            { label: "POWERTRAIN", value: "Dual Electric Motors" },
            { label: "MAXIMUM POWER", value: "430", unit: "kW" }, // ~584 HP
            { label: "0-100 KM/H", value: "4.5", unit: "S" },
            { label: "ELECTRIC RANGE (WLTP)", value: "530", unit: "KM" }
        ],
        description: 'The Rolls-Royce Spectre marks a new era as the brand\'s first all-electric super coupé, offering silent propulsion, immense power, and an uncompromised luxury experience.',
        cta: "https://www.rolls-roycemotorcars.com/en_GB/bespoke/spectre-configurator.html"
    },
];

const Rollsroylscar = () => {
    // Removed activeTab state as activeIndex handles tab selection
    const [activeIndex, setActiveIndex] = useState(0); // Initialize with the first tab active
    const active = tabData[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">HEIGHTENED PERFORMANCE</h1>
                    <p className="subtitle">
                        Experience unparalleled luxury and effortless performance with Rolls-Royce, leading with iconic V12 engines and the innovative all-electric Spectre.
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

                <br />
                <br />
                <br />
                
            </div>
        </div>
    );
}

export default Rollsroylscar;