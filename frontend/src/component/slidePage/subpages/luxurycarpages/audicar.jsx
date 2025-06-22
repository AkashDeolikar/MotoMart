import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import AudiA3 from '../PageAsset/audi/Audia3.jpg';
import AudiA6 from '../PageAsset/audi/Audia6.jpg'
import AudiA8 from '../PageAsset/audi/AudiA8.jpg'
import AudiQ3 from '../PageAsset/audi/AudiQ3.jpg'
import AudiQ5 from '../PageAsset/audi/AudiQ5.jpg'

const tabData = [
    {
        title: "AUDI A3 (PETROL)",
        image: AudiA3, // Assuming AudiA3 image is suitable for the petrol variant as well
        specs: [
            { label: "ENGINE", value: "1.5L TFSI", unit: "Petrol" },
            { label: "MAXIMUM POWER", value: "110", unit: "kW" }, // ~150 HP
            { label: "0-100 KM/H", value: "8.4", unit: "S" }
        ],
        description: 'The Audi A3 35 TFSI is powered by an efficient 1.5-litre TFSI petrol engine, offering a dynamic yet refined driving experience with its compact luxury design.',
        cta: "https://www.audi.in/in/web/en/models/a3/a3-sedan.html" // General A3 link
    },
    {
        title: "AUDI A6 (PETROL V6)",
        image: AudiA6,
        specs: [
            { label: "TOP SPEED", value: "250", unit: "KM/H" },
            { label: "MAXIMUM POWER", value: "250", unit: "kW" },
            { label: "0-100 KM/H", value: "5.1", unit: "S" }
        ],
        description: 'The Audi A6, with its 3.0-litre TFSI V6 engine, combines sophisticated design with dynamic performance, delivering a refined and powerful driving experience.',
        cta: "https://www.audi.in/in/web/en/models/a6/a6-sedan.html"
    },
    {
        title: "AUDI A8 (LUXURY V8)",
        image: AudiA8,
        specs: [
            { label: "TOP SPEED", value: "250", unit: "KM/H" },
            { label: "MAXIMUM POWER", value: "338", unit: "kW" },
            { label: "0-100 KM/H", value: "4.4", unit: "S" }
        ],
        description: 'The Audi A8, featuring a powerful 4.0-litre TFSI V8 engine, represents the pinnacle of luxury and performance, offering an exceptionally smooth and commanding drive.',
        cta: "https://www.audi.in/in/web/en/models/a8/a8l.html"
    },
    {
        title: "AUDI Q3 (COMPACT SUV)",
        image: AudiQ3,
        specs: [
            { label: "TOP SPEED", value: "228", unit: "KM/H" },
            { label: "MAXIMUM POWER", value: "140", unit: "kW" },
            { label: "0-100 KM/H", value: "7.3", unit: "S" }
        ],
        description: 'The Audi Q3 is a versatile and stylish compact SUV, offering a dynamic driving experience with its efficient 2.0-litre TFSI petrol engine and quattro all-wheel drive.',
        cta: "https://www.audi.in/in/web/en/models/q3/q3.html"
    },
    {
        title: "AUDI Q5 (MILD HYBRID SUV)",
        image: AudiQ5,
        specs: [
            { label: "TOP SPEED", value: "222", unit: "KM/H" },
            { label: "MAXIMUM POWER", value: "150", unit: "kW" },
            { label: "0-100 KM/H", value: "7.6", unit: "S" }
        ],
        description: 'The Audi Q5, featuring a mild-hybrid diesel engine, delivers a balance of powerful performance and enhanced efficiency, making it a versatile and sophisticated SUV.',
        cta: "https://www.audi.in/in/web/en/models/q5/q5.html"
    },
];

const Audicar = () => {
    // Removed activeTab state as activeIndex handles tab selection
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">HEIGHTENED PERFORMANCE</h1>
                    <p className="subtitle">
                        Experience advanced technology and progressive luxury with Audi, offering a dynamic range of sedans, SUVs, and electrified vehicles.
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

export default Audicar;