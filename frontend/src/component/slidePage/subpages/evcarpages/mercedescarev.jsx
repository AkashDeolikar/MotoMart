import React, { useState } from "react";
import '../../subpages/mainstyle.css'; // Assuming your CSS is here

// --- YOU WILL NEED TO IMPORT YOUR ACTUAL MERCEDES-BENZ EV IMAGE FILES HERE ---
// Example placeholders (adjust paths as needed):
import MercedesEqsImage from '../evcarpages/pageAsset/mercedes/1.jpg';
import MercedesEqeImage from '../evcarpages/pageAsset/mercedes/2.jpg';
import MercedesEqcImage from '../evcarpages/pageAsset/mercedes/3.jpg';
import MercedesEqbImage from '../evcarpages/pageAsset/mercedes/4.jpg';
import MercedesEqsSUVImage from '../evcarpages/pageAsset/mercedes/5.jpg';
import MercedesEqeSUVImage from '../evcarpages/pageAsset/mercedes/6.jpg';
// -------------------------------------------------------------------------


const tabData = [
    {
        title: "MERCEDES-BENZ EQS (ELECTRIC SEDAN)",
        image: MercedesEqsImage,
        specs: [
            { label: "ELECTRIC RANGE (ARAI)", value: "813 - 857", unit: "KM" },
            { label: "0-100 KM/H", value: "4.3", unit: "S" }, // For EQS 580 4MATIC
            { label: "MAXIMUM POWER", value: "385", unit: "kW" }, // ~516 hp for EQS 580
            { label: "BATTERY CAPACITY", value: "107.8", unit: "kWh" }
        ],
        description: 'The Mercedes-Benz EQS is the flagship electric luxury sedan, offering unparalleled comfort, cutting-edge technology, and an exceptional electric range, defining the future of premium mobility.',
        cta: "https://www.mercedes-benz.co.in/passengercars/models/eq/eqs/overview.html"
    },
    {
        title: "MERCEDES-BENZ EQE (ELECTRIC SEDAN)",
        image: MercedesEqeImage,
        specs: [
            { label: "ELECTRIC RANGE (WLTP)", value: "590 - 625", unit: "KM" },
            { label: "0-100 KM/H", value: "6.4", unit: "S" }, // For EQE 350
            { label: "MAXIMUM POWER", value: "215", unit: "kW" }, // ~292 hp for EQE 350
            { label: "BATTERY CAPACITY", value: "90.6", unit: "kWh" }
        ],
        description: 'The Mercedes-Benz EQE Sedan brings electric luxury to a more compact executive segment. It combines dynamic driving characteristics with a spacious and technologically advanced interior.',
        cta: "https://www.mercedes-benz.co.in/passengercars/models/eq/eqe/overview.html"
    },
    {
        title: "MERCEDES-BENZ EQC (ELECTRIC SUV)",
        image: MercedesEqcImage,
        specs: [
            { label: "ELECTRIC RANGE (ARAI)", value: "450", unit: "KM" }, // EQC 400 4MATIC
            { label: "0-100 KM/H", value: "5.1", unit: "S" },
            { label: "MAXIMUM POWER", value: "300", unit: "kW" }, // ~402 hp
            { label: "BATTERY CAPACITY", value: "80", unit: "kWh" }
        ],
        description: 'As Mercedes-Benz\'s pioneering electric SUV in India, the EQC offers a blend of SUV practicality with a smooth, silent electric powertrain, luxurious interiors, and impressive performance.',
        cta: "https://www.mercedes-benz.co.in/passengercars/models/eq/eqc/overview.html"
    },
    {
        title: "MERCEDES-BENZ EQB (ELECTRIC SUV)",
        image: MercedesEqbImage,
        specs: [
            { label: "ELECTRIC RANGE (ARAI)", value: "423 - 535", unit: "KM" },
            { label: "0-100 KM/H", value: "6.2 - 8.7", unit: "S" },
            { label: "SEATING CAPACITY", value: "5 - 7", unit: "Seats" },
            { label: "BATTERY CAPACITY", value: "66.5 - 70.5", unit: "kWh" }
        ],
        description: 'The Mercedes-Benz EQB is a versatile and family-friendly electric SUV, offering up to seven seats and combining signature Mercedes-Benz luxury with electric efficiency for urban adventures and beyond.',
        cta: "https://www.mercedes-benz.co.in/passengercars/models/eq/eqb/overview.html"
    },
    {
        title: "MERCEDES-BENZ EQS SUV (ELECTRIC SUV)",
        image: MercedesEqsSUVImage,
        specs: [
            { label: "ELECTRIC RANGE (WLTP)", value: "510 - 660", unit: "KM" },
            { label: "0-100 KM/H", value: "4.6 - 6.0", unit: "S" },
            { label: "MAXIMUM POWER", value: "265 - 400", unit: "kW" },
            { label: "SEATING CAPACITY", value: "7", unit: "Seats" }
        ],
        description: 'The Mercedes-Benz EQS SUV translates the S-Class level of luxury into an all-electric SUV. It offers expansive space, advanced technology, and powerful electric performance with generous range for the ultimate family journey.',
        cta: "https://www.mercedes-benz.co.in/passengercars/models/eq/eqs-suv/overview.html"
    },
     {
        title: "MERCEDES-BENZ EQE SUV (ELECTRIC SUV)",
        image: MercedesEqeSUVImage,
        specs: [
            { label: "ELECTRIC RANGE (WLTP)", value: "450 - 590", unit: "KM" },
            { label: "0-100 KM/H", value: "4.9 - 6.7", unit: "S" },
            { label: "MAXIMUM POWER", value: "180 - 300", unit: "kW" },
            { label: "BATTERY CAPACITY", value: "89 - 90.6", unit: "kWh" }
        ],
        description: 'The Mercedes-Benz EQE SUV offers a dynamic and spacious electric SUV experience. It combines a sophisticated design with robust performance, making it a compelling choice for those seeking electric luxury and versatility.',
        cta: "https://www.mercedes-benz.co.in/passengercars/models/eq/eqe-suv/overview.html"
    },
];

const Mercedesevcar = () => { // Renamed component to Mercedesevcar
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData?.[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">ELECTRIC LUXURY: THE MERCEDES-BENZ EQ SERIES</h1>
                    <p className="subtitle">
                        Immerse yourself in the world of Mercedes-Benz electric vehicles, where pioneering innovation meets iconic luxury, delivering a sustainable and exhilarating driving experience.
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
                            <p>No Mercedes-Benz EV models available to display.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mercedesevcar; // Exporting the new component name