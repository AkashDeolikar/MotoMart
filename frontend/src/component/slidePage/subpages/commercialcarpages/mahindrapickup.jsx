import React, { useState } from "react";
import '../../subpages/mainstyle.css'; // Assuming your shared CSS is here

// --- UPDATED IMAGE IMPORTS BASED ON YOUR NEW PATHS ---
import BoleroPikUpImage from '../commercialcarpages/pageAsset/mahindra/1.jpg';
import JeetoImage from '../commercialcarpages/pageAsset/mahindra/2.jpg';
import FurioImage from '../commercialcarpages/pageAsset/mahindra/3.jpg';
import BlazoImage from '../commercialcarpages/pageAsset/mahindra/4.jpg';
// ----------------------------------------------------

const tabData = [
    {
        title: "MAHINDRA BOLERO PIK-UP (RUGGED PICKUP)",
        image: BoleroPikUpImage,
        specs: [
            { label: "ENGINE", value: "m2DiCR 2.5L TB Diesel", unit: "" },
            { label: "POWER", value: "75 - 80", unit: "HP" },
            { label: "TORQUE", value: "200 - 220", unit: "Nm" },
            { label: "PAYLOAD CAPACITY", value: "Up to 1700", unit: "kg" },
            { label: "GVW", value: "~2735 - 3490", unit: "kg" },
            { label: "MILEAGE (Approx.)", value: "15-17", unit: "kmpl" }
        ],
        description: 'The iconic Bolero Pik-Up series is India\'s favorite for its ruggedness, high payload capacity, and reliable performance. It\'s a versatile workhorse for various commercial applications across urban and rural landscapes.',
        cta: 'https://auto.mahindra.com/commercial/pik-ups/bolero-pik-up',
    },
    {
        title: "MAHINDRA JEETO (LAST-MILE MINI-TRUCK)",
        image: JeetoImage,
        specs: [
            { label: "ENGINE OPTIONS", value: "Diesel / Petrol / CNG", unit: "" },
            { label: "POWER", value: "16 - 20", unit: "HP" },
            { label: "TORQUE", value: "38 - 45", unit: "Nm" },
            { label: "PAYLOAD CAPACITY", value: "Up to 750", unit: "kg" },
            { label: "GVW", value: "~1450 - 1605", unit: "kg" },
            { label: "MILEAGE (Diesel)", value: "Approx. 32-37", unit: "kmpl" }
        ],
        description: 'The Mahindra Jeeto is a highly fuel-efficient and versatile mini-truck, perfectly designed for last-mile delivery. Its compact size and multiple fuel options make it an ideal partner for small businesses and urban logistics.',
        cta: 'https://auto.mahindra.com/commercial/small-commercial-vehicles/jeeto-strong',
    },
    {
        title: "MAHINDRA FURIO (INTERMEDIATE COMMERCIAL VEHICLE)",
        image: FurioImage,
        specs: [
            { label: "ENGINE", value: "mDi Tech 4-cylinder BS6 Diesel", unit: "" },
            { label: "POWER", value: "103 kW (140 HP) - 138", unit: "HP" },
            { label: "TORQUE", value: "525", unit: "Nm" },
            { label: "GVW RANGE", value: "6950 - 17000", unit: "kg" },
            { label: "TRANSMISSION", value: "5/6 Speed Manual", unit: "" },
            { label: "KEY FEATURE", value: "Pininfarina-designed Cabin", unit: "" }
        ],
        description: 'The Mahindra Furio series offers a range of Intermediate Commercial Vehicles (ICVs) known for their superior mileage, robust build, and a comfortable cabin designed by Pininfarina. They are built for higher earnings and lower operating costs.',
        cta: 'https://auto.mahindra.com/commercial/trucks', // General trucks page for Furio series
    },
    {
        title: "MAHINDRA BLAZO X (HEAVY COMMERCIAL VEHICLE)",
        image: BlazoImage,
        specs: [
            { label: "ENGINE", value: "mPOWER 7.2 Litre FuelSmart BS6 Diesel", unit: "" },
            { label: "POWER", value: "276", unit: "HP" },
            { label: "TORQUE", value: "1050", unit: "Nm" },
            { label: "GVW RANGE", value: "28000 - 49000", unit: "kg" },
            { label: "TRANSMISSION", value: "Eaton 6/9 Speed Manual", unit: "" },
            { label: "KEY FEATURE", value: "FuelSmart Technology", unit: "" }
        ],
        description: 'The Mahindra Blazo X series comprises heavy commercial vehicles (HCVs) engineered for robust performance, high uptime, and excellent fuel economy. Featuring the mPOWER FuelSmart engine, they are ideal for demanding long-haul and heavy-duty applications.',
        cta: 'https://auto.mahindra.com/commercial/trucks', // General trucks page for Blazo series
    },
];

const Mahindrapickup = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData?.[activeIndex]; // Use optional chaining for safety

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">MAHINDRA COMMERCIAL VEHICLES: TOUGH, RELIABLE, PROFITABLE</h1>
                    <p className="subtitle">
                        Explore Mahindra's robust non-electric commercial vehicle range, built to deliver superior performance, high payload capacity, and unmatched reliability for every business need.
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
                                                {/* No spec.desc in the Mercedes code, removed */}
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
                            <p>No Mahindra Commercial Vehicles available to display.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mahindrapickup;