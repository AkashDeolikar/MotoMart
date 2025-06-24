import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import MarutiSwiftImage from '../passengercappages/PageAsset2/suzuki/swift.jpg';
import MarutiBalenoImage from '../passengercappages/PageAsset2/suzuki/baleno.jpg';
import MarutiBrezzaImage from '../passengercappages/PageAsset2/suzuki/brezza.jpg';
import MarutiErtigaImage from '../passengercappages/PageAsset2/suzuki/ertiga.jpg'; // <-- ADD THIS IMPORT

const tabData = [
    {
        title: "MARUTI SUZUKI SWIFT (PETROL HATCHBACK)",
        image: MarutiSwiftImage,
        specs: [
            { label: "ENGINE", value: "1.2L DualJet Petrol" },
            { label: "MAX POWER", value: "66", unit: "kW" }, // ~90 PS
            { label: "MILEAGE", value: "22.35", unit: "KM/L" } // Varies by variant, using a common value
        ],
        description: 'The iconic Maruti Suzuki Swift is celebrated for its sporty design, peppy performance, and exceptional fuel efficiency. It offers a fun-to-drive experience with a spacious and modern interior, making it a favorite among hatchback enthusiasts.',
        cta: "https://www.marutisuzuki.com/swift"
    },
    {
        title: "MARUTI SUZUKI BALENO (PETROL PREMIUM HATCHBACK)",
        image: MarutiBalenoImage,
        specs: [
            { label: "ENGINE", value: "1.2L DualJet Petrol" },
            { label: "MAX POWER", value: "66", unit: "kW" }, // ~90 PS
            { label: "MILEAGE", value: "22.94", unit: "KM/L" } // Varies by variant, using a common value
        ],
        description: 'The Maruti Suzuki Baleno redefines the premium hatchback segment with its elegant design, spacious cabin, and advanced features. It delivers a refined driving experience coupled with Maruti Suzuki’s renowned reliability and fuel efficiency.',
        cta: "https://www.nexaexperience.com/baleno/price"
    },
    {
        title: "MARUTI SUZUKI BREZZA (PETROL SUV)",
        image: MarutiBrezzaImage,
        specs: [
            { label: "ENGINE", value: "1.5L K15C Smart Hybrid Petrol" },
            { label: "MAX POWER", value: "75.8", unit: "kW" }, // ~103 PS
            { label: "MILEAGE", value: "19.89", unit: "KM/L" } // Varies by variant, using a common value
        ],
        description: 'The Maruti Suzuki Brezza is a stylish and capable compact SUV designed for urban adventurers. It offers a commanding road presence, a feature-packed interior, and efficient performance, making it a popular choice for families and city dwellers alike.',
        cta: "https://www.marutisuzuki.com/brezza"
    },
    {
        title: "MARUTI SUZUKI ERTIGA (PETROL/CNG MPV)", // <-- ADDED ERTIGA
        image: MarutiErtigaImage, // <-- Make sure to import this image
        specs: [
            { label: "ENGINE", value: "1.5L K15C Smart Hybrid Petrol / S-CNG" },
            { label: "MAX POWER (Petrol)", value: "75.8", unit: "kW" }, // ~103 PS
            { label: "SEATING CAPACITY", value: "7", unit: "Seats" },
            { label: "MILEAGE (Petrol)", value: "20.51", unit: "KM/L" },
            { label: "MILEAGE (CNG)", value: "26.11", unit: "KM/KG" }
        ],
        description: 'The Maruti Suzuki Ertiga is a popular and spacious 7-seater MPV, renowned for its comfortable ride, versatile seating, and excellent fuel efficiency. It’s an ideal choice for large families and long journeys, offering practicality and reliability.',
        cta: "https://www.marutisuzuki.com/ertiga" // Official Ertiga page
    },
    // Add more Maruti Suzuki models if you have data for them, e.g., Dzire, Grand Vitara, etc.
];

const Suzukicar = () => {
    const [activeIndex, setActiveIndex] = useState(0); // Initialize with the first tab active
    const active = tabData[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">WAY OF LIFE! RELIABILITY. INNOVATION. VALUE.</h1>
                    <p className="subtitle">
                        Discover Maruti Suzuki's extensive range of cars, known for their unwavering reliability, fuel efficiency, and innovative technology, designed for every Indian road and family.
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

export default Suzukicar;