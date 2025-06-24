import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import RenaultKwidImage from '../passengercappages/PageAsset2/renault/kwid.jpg';
import RenaultKigerImage from '../passengercappages/PageAsset2/renault/kiger.jpg';
import RenaultTriberImage from '../passengercappages/PageAsset2/renault/triber.jpg';

const tabData = [
    {
        title: "RENAULT KWID (PETROL HATCHBACK)",
        image: RenaultKwidImage,
        specs: [
            { label: "ENGINE", value: "1.0L SCe Petrol" },
            { label: "MAX POWER", value: "50", unit: "kW" }, // ~68 PS
            { label: "MILEAGE", value: "22.3", unit: "KM/L" }
        ],
        description: 'The Renault Kwid is a stylish and compact hatchback with an SUV-inspired design. It offers a spacious cabin, modern features, and impressive fuel efficiency, making it perfect for urban commutes.',
        cta: "https://www.renault.co.in/cars/renault-kwid.html"
    },
    {
        title: "RENAULT KIGER (PETROL SUV)",
        image: RenaultKigerImage,
        specs: [
            { label: "ENGINE", value: "1.0L Energy / 1.0L Turbo Petrol" },
            { label: "MAX POWER (Turbo)", value: "74", unit: "kW" }, // ~100 PS
            { label: "BOOT SPACE", value: "405", unit: "Liters" }
        ],
        description: 'The Renault Kiger is a sporty and smart compact SUV. It boasts a bold design, advanced features like a multi-sense drive mode, and a choice of efficient engines, providing an exhilarating driving experience.',
        cta: "https://www.renault.co.in/cars/renault-kiger.html"
    },
    {
        title: "RENAULT TRIBER (PETROL MPV)",
        image: RenaultTriberImage,
        specs: [
            { label: "ENGINE", value: "1.0L Energy Petrol" },
            { label: "MAX POWER", value: "53", unit: "kW" }, // ~72 PS
            { label: "SEATING", value: "7-Seater Modular" }
        ],
        description: 'The Renault Triber is an ultra-modular 7-seater MPV, designed for maximum space and flexibility. With its innovative EasyFix seats, it adapts to your life on demand, making it perfect for families and varied needs.',
        cta: "https://www.renault.co.in/cars/renault-triber.html"
    },
    // Add more Renault models if you have data for them
];

const Renaultcar = () => {
    const [activeIndex, setActiveIndex] = useState(0); // Initialize with the first tab active
    const active = tabData[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block"> {/* Consider renaming this class to be more generic, e.g., "car-spec-block" */}
                <div className="rover-tabs-container"> {/* Consider renaming this class to be more generic, e.g., "car-tabs-container" */}
                    <h1 className="title1">PASSION FOR LIFE. INNOVATION FOR EVERYONE.</h1>
                    <p className="subtitle">
                        Experience Renault's commitment to creating innovative, reliable, and stylish vehicles designed to bring joy and convenience to every journey.
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

export default Renaultcar;