import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import hondaCityImage from '../passengercappages/PageAsset2/honda/hondacity.jpg';
import hondaElevateImage from '../passengercappages/PageAsset2/honda/hondaelevate.jpg';
import hondaAmazeImage from '../passengercappages/PageAsset2/honda/hondaamaze.jpg';

const tabData = [
    {
        title: "HONDA CITY (PETROL SEDAN)",
        image: hondaCityImage,
        specs: [
            { label: "ENGINE", value: "1.5L i-VTEC Petrol" },
            { label: "MAX POWER", value: "89", unit: "kW" }, // ~121 PS
            { label: "MILEAGE", value: "17.8", unit: "KM/L (MT)" }
        ],
        description: 'The Honda City is a popular mid-size sedan known for its premium styling, spacious interiors, refined engine, and reliable performance, offering a comfortable and efficient driving experience.',
        cta: "https://www.hondacarindia.com/honda-city"
    },
    {
        title: "HONDA ELEVATE (PETROL SUV)",
        image: hondaElevateImage,
        specs: [
            { label: "ENGINE", value: "1.5L i-VTEC Petrol" },
            { label: "MAX POWER", value: "89", unit: "kW" }, // ~121 PS
            { label: "BOOT SPACE", value: "458", unit: "Liters" }
        ],
        description: 'The Honda Elevate is a compact SUV designed for urban adventures and beyond, offering a bold design, spacious cabin, advanced features, and Honda’s renowned driving dynamics.',
        cta: "https://www.hondacarindia.com/honda-elevate"
    },
    {
        title: "HONDA AMAZE (PETROL/DIESEL SEDAN)",
        image: hondaAmazeImage,
        specs: [
            { label: "ENGINE", value: "1.2L i-VTEC Petrol / 1.5L i-DTEC Diesel" },
            { label: "MAX POWER (Petrol)", value: "66", unit: "kW" }, // ~90 PS
            { label: "MILEAGE (Petrol)", value: "18.6", unit: "KM/L (MT)" }
        ],
        description: 'The Honda Amaze is a stylish and practical compact sedan, offering a comfortable ride, spacious interior, fuel-efficient engines (petrol and diesel), and Honda’s characteristic reliability, ideal for city commutes.',
        cta: "https://www.hondacarindia.com/honda-amaze"
    },
    // You can add more Honda models here if needed
];

const Hondacar = () => {
    // No need for activeTab state as activeIndex directly controls the tab
    const [activeIndex, setActiveIndex] = useState(0); // Initialize with the first tab active
    const active = tabData[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">THE POWER OF DREAMS</h1>
                    <p className="subtitle">
                        Discover Honda's commitment to innovation and reliability across a range of passenger cars, offering a perfect blend of performance, comfort, and efficiency.
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

                {/* Removed the extra br tags and redundant "View More" button as each tab has its own CTA */}
            </div>
        </div>
    );
}

export default Hondacar;