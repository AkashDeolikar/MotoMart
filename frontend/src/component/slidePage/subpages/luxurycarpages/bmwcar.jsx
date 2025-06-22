import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import BMWi4 from '../PageAsset/bmw/BMWi4.jpg';
import BMWi7 from '../PageAsset/bmw/BMWi7.jpg';
import BMWiXM60 from '../PageAsset/bmw/BMWiXM60.jpg';
import BMWX7 from '../PageAsset/bmw/BMWX7.jpg';
import BMWXMLabelRed from '../PageAsset/bmw/BMWXMLabelRed.jpg';

const tabData = [
    {
        title: "BMW i4 eDrive40",
        image: BMWi4,
        specs: [
            { label: "ELECTRIC RANGE (WLTP)", value: "590", unit: "KM", desc: "With 18'' wheels under ideal conditions." },
            { label: "0–100 KM/H", value: "5.7", unit: "S", desc: "Single motor, rear-wheel drive." },
            { label: "MAXIMUM POWER", value: "250", unit: "kW", desc: "Equivalent to 340 hp." }
        ],
        description:
            "The BMW i4 eDrive40 is a fully electric gran coupe offering long range, smooth acceleration, and dynamic handling with 250 kW of power.",
        cta: "https://www.bmw.com/en/bmw-models/bmw-i4.html"
    },
    {
        title: "BMW i7 xDrive60",
        image: BMWi7,
        specs: [
            { label: "TOP SPEED", value: "240", unit: "KM/H", desc: "Electronically limited." },
            { label: "0–100 KM/H", value: "4.7", unit: "S", desc: "All-wheel drive, dual motor." },
            { label: "MAXIMUM POWER", value: "400", unit: "kW", desc: "Equivalent to 544 hp." }
        ],
        description:
            "The BMW i7 xDrive60 combines electric luxury with intelligent performance. Features a 101.7 kWh battery and next-gen comfort.",
        cta: "https://www.bmw.com/en/bmw-models/bmw-i7.html"
    },
    {
        title: "BMW iX M60",
        image: BMWiXM60,
        specs: [
            { label: "TOP SPEED", value: "250", unit: "KM/H", desc: "Electronically limited." },
            { label: "0–100 KM/H", value: "3.8", unit: "S", desc: "M-tuned electric all-wheel drive." },
            { label: "MAXIMUM POWER", value: "455", unit: "kW", desc: "Equivalent to 619 hp." }
        ],
        description:
            "BMW’s performance flagship electric SUV with M tuning, delivering blistering acceleration and electric torque up to 1100 Nm.",
        cta: "https://www.bmw.com/en/bmw-models/bmw-ix-m60.html"
    },
    {
        title: "BMW X7 xDrive40d MHEV",
        image: BMWX7,
        specs: [
            { label: "TOP SPEED", value: "250", unit: "KM/H", desc: "Electronically limited." },
            { label: "0–100 KM/H", value: "5.9", unit: "S", desc: "Mild hybrid 3.0L diesel inline-6." },
            { label: "MAXIMUM POWER", value: "250", unit: "kW", desc: "Combined system output (~340 hp)." }
        ],
        description:
            "The BMW X7 blends seven-seat practicality with premium design and mild hybrid efficiency, powered by a refined diesel engine.",
        cta: "https://www.bmw.com/en/bmw-models/bmw-x7.html"
    },
    {
        title: "BMW XM Label Red",
        image: BMWXMLabelRed,
        specs: [
            { label: "TOP SPEED", value: "290", unit: "KM/H", desc: "With M Driver’s Package." },
            { label: "0–100 KM/H", value: "3.8", unit: "S", desc: "Plug-in hybrid V8 + electric motor." },
            { label: "MAXIMUM POWER", value: "550", unit: "kW", desc: "750 hp combined system output." }
        ],
        description:
            "The most powerful production BMW ever — a high-performance plug-in hybrid SUV delivering 750 hp and ultimate road presence.",
        cta: "https://www.bmw-m.com/en/topics/magazine-article-pool/bmw-xm-label-red.html"
    }
];


const Bmwcar = () => {
    // Removed activeTab state as activeIndex handles tab selection
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">HEIGHTENED PERFORMANCE</h1>
                    <p className="subtitle">
                        Experience the ultimate driving machine with BMW, offering unparalleled performance, innovative technology, and luxurious comfort across a diverse range of vehicles.
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

export default Bmwcar;