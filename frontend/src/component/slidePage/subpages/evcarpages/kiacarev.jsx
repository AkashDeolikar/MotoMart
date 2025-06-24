import React, { useState } from "react";
import '../../subpages/mainstyle.css';

// --- YOU WILL NEED TO IMPORT YOUR ACTUAL KIA EV IMAGE FILES HERE ---
// Example placeholders (adjust paths as needed):
import KiaEv6Image from '../evcarpages/pageAsset/kia/ev6.jpg';
import KiaEv9Image from '../evcarpages/pageAsset/kia/ev9.jpg';
// ---------------------------------------------------------------


const tabData = [
    {
        title: "KIA EV6 (ELECTRIC CROSSOVER)",
        image: KiaEv6Image,
        specs: [
            { label: "ELECTRIC RANGE (ARAI)", value: "708", unit: "KM" }, // RWD Long Range GT-Line
            { label: "0-100 KM/H (AWD)", value: "5.2", unit: "S" },
            { label: "MAXIMUM POWER (AWD)", value: "239", unit: "kW" }, // ~325 PS
            { label: "BATTERY CAPACITY", value: "77.4", unit: "kWh" }
        ],
        description: 'The Kia EV6 is a groundbreaking electric crossover, blending striking design with thrilling performance and an impressive long range. Built on a dedicated EV platform, it offers ultra-fast charging and a host of advanced features.',
        cta: "https://www.kia.com/in/our-vehicles/ev6/showroom.html"
    },
    {
        title: "KIA EV9 (ELECTRIC SUV)",
        image: KiaEv9Image,
        specs: [
            { label: "ELECTRIC RANGE (ARAI)", value: "561", unit: "KM" }, // GT-Line AWD
            { label: "0-100 KM/H", value: "5.3", unit: "S" },
            { label: "MAXIMUM POWER", value: "283", unit: "kW" }, // ~385 PS
            { label: "BATTERY CAPACITY", value: "99.8", unit: "kWh" },
            { label: "SEATING", value: "6 or 7", unit: "Seats" }
        ],
        description: 'The Kia EV9 is a bold and futuristic all-electric SUV, setting new benchmarks for design, space, and technology. It offers commanding presence, flexible seating for up to seven, and robust performance with a focus on sustainable luxury.',
        cta: "https://www.kia.com/in/our-vehicles/ev9/showroom.html"
    },
    // Add other Kia EV models if they become prominently available in India, like the EV5 or Niro EV,
    // ensuring you have their specific data and images.
];

const Kiacarev = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData?.[activeIndex]; // Use optional chaining for safety

    return (
        <div className="bbb">
            <div className="rover-det-spec-block"> {/* Consider a more generic class name like "car-detail-spec-block" */}
                <div className="rover-tabs-container"> {/* Consider a more generic class name like "car-tabs-container" */}
                    <h1 className="title1">MOVEMENT THAT INSPIRES: KIA ELECTRIC</h1>
                    <p className="subtitle">
                        Step into the future with Kia's innovative electric vehicles, combining stunning design, exhilarating performance, and advanced sustainable technology for an inspiring drive.
                    </p>

                    <div className="tabs-header">
                        {tabData?.map((tab, idx) => (
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
                        {active ? ( // Conditionally render if 'active' data exists
                            <>
                                <img className="tab-image" src={active.image} alt={active.title} />
                                <div className="tab-info">
                                    <div className="specs">
                                        {active.specs?.map((spec, i) => (
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
                            <p>No Kia EV models available to display. Please check data source or component props.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Kiacarev;