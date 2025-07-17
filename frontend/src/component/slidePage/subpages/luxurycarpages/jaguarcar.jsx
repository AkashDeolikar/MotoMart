import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import jaguarxf from '../PageAsset/jaguar/jaguarxf.WebP';
import jaguarXE from '../PageAsset/jaguar/JaguarXEReims.WebP';
import jaguarF from '../PageAsset/jaguar/JaguarFPace.WebP';
import jaguarE from '../PageAsset/jaguar/JaguarEPACE.WebP';
import Fpace from '../PageAsset/jaguar/2025Fpace.WebP';

const tabData = [
    {
        title: "Jaguar XF Electric Hybrid",
        image: jaguarxf,
        specs: [
            { label: "E‑RANGE/HOUR", value: "35", unit: "KM", desc: "Approx. 35 km per hour on 7 kW home charge." },
            { label: "HOME CHARGE (7 kW)", value: "≈4", unit: "HRS", desc: "Full charge in about 4 h for ~140 km" },
            { label: "PUBLIC CHARGE", value: "<60", unit: "MIN", desc: "0–80% on fast CCS DC chargers" },
            { label: "BATTERY", value: "19.2", unit: "kWh", desc: "Usable battery capacity for electric driving." },
        { label: "0-100 KM/H", value: "6.5", unit: "SEC", desc: "Acceleration from 0 to 100 kilometers per hour." },
        { label: "TOP SPEED", value: "240", unit: "KM/H", desc: "Maximum attainable speed (limited)." },
        { label: "MAX POWER", value: "300", unit: "PS", desc: "Combined power output of engine and electric motor." },
        { label: "MAX TORQUE", value: "400", unit: "Nm", desc: "Maximum torque for strong acceleration." },
        { label: "FUEL ECONOMY", value: "2.0", unit: "L/100KM", desc: "Combined fuel consumption (WLTP)." },
        { label: "CO2 EMISSIONS", value: "49", unit: "g/km", desc: "Carbon dioxide emissions (WLTP)." },
        { label: "TRANSMISSION", value: "8-Speed", unit: "Auto", desc: "Automatic transmission for smooth shifts." },
        { label: "DRIVETRAIN", value: "AWD", unit: "", desc: "All-Wheel Drive system for enhanced traction." },
        { label: "BOOT SPACE", value: "450", unit: "Litres", desc: "Luggage capacity with rear seats up." },
        { label: "WEIGHT", value: "1950", unit: "KG", desc: "Curb weight of the vehicle." },
        { label: "BRAKES", value: "Ventilated Discs", unit: "", desc: "Front and rear braking system." }
        ],
        description: "Available as an extended range plug-in electric hybrid (PHEV), the Jaguar XF offers a blend of efficient electric motoring and dynamic petrol performance.",
        cta: "https://www.jaguarusa.com/all-models/xf/index.html"
    },
    {
        title: "Jaguar XE SV Petrol V8",
        image: jaguarXE,
        specs: [
            { label: "TOP SPEED", value: "322", unit: "KM/H" },
            { label: "0‑100 KM/H", value: "3.5", unit: "S" },
            { label: "MAX POWER", value: "441", unit: "kW" }
        ],
        description: "Experience exhilarating performance with the Jaguar XE, delivering immediate response and exceptional drivability for a truly sporting saloon experience.",
        cta: "https://www.jaguar.com/jaguar-range/xe/index.html"
    },
    {
        title: "Jaguar F-Type Petrol V8",
        image: jaguarF,
        specs: [
            { label: "Top Speed", value: "250", unit: "KM/H" },
            { label: "Maximum Power", value: "390", unit: "kW" },
            { label: "0-100 KM/H", value: "4.6", unit: "s" }
        ],
        description: "Uncompromising power and performance with heightened efficiency. The Jaguar F-Type V8 delivers thrilling acceleration and a distinctive driving experience.",
        cta: "https://www.jaguar.com/jaguar-range/f-type/index.html"
    },
    {
        title: "Jaguar E-Pace Diesel Mild Hybrid",
        image: jaguarE,
        specs: [
            { label: "Top Speed", value: "234", unit: "KM/H" },
            { label: "Maximum Power", value: "258", unit: "kW" },
            { label: "0-100 KM/H", value: "6.0", unit: "s" }
        ],
        description: "Jaguar E-Pace's mild hybrid engines harvest, store and redeploy energy normally lost during deceleration, offering enhanced efficiency and smooth performance.",
        cta: "https://www.jaguar.com/jaguar-range/e-pace/index.html"
    },
    {
        title: "Jaguar F-Pace Diesel Mild Hybrid",
        image: Fpace,
        specs: [
            { label: "Top Speed", value: "234", unit: "KM/H" },
            { label: "Maximum Power", value: "258", unit: "kW" },
            { label: "0-100 KM/H", value: "6.0", unit: "s" }
        ],
        description: "Jaguar F-Pace's mild hybrid engines harvest, store and redeploy energy normally lost during deceleration, offering enhanced efficiency and dynamic performance.",
        cta: "https://www.jaguar.in/jaguar-range/f-pace/index.html"
    }
];

const Jaguarcar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData[activeIndex];

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">HEIGHTENED PERFORMANCE</h1>
                    <p className="subtitle">
                        The spirit of performance redefined — where cutting-edge innovation meets iconic Jaguar design in electric, hybrid, and petrol excellence.
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
                            <a className="btn-boxpage5 mt-4 appearIntroPage5" href={active.cta} target="_blank" rel="noopener noreferrer">Visit Official Site</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jaguarcar;