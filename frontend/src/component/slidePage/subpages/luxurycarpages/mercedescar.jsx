import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import rover1 from '../../roverpages/roverAssets/rover1.jpg';
import rover2 from '../../roverpages/roverAssets/rover1.jpg';
import rover3 from '../../roverpages/roverAssets/rover1.jpg';
import rover4 from '../../roverpages/roverAssets/rover1.jpg';

const tabData = [
    {
        title: "ELECTRIC HYBRID",
        image: rover1,
        specs: [
            { label: "ELECTRIC RANGE (UP TO)", value: "121", unit: "KM", desc: "Expected real-world range of up to 94km." },
            { label: "PUBLIC CHARGING (FROM)", value: "<60", unit: "MINUTES", desc: "Charge up to 80% in under an hour." },
            { label: "HOME CHARGING (FROM)", value: "5", unit: "HOURS", desc: "Up to 100% using 7kW AC charger." }
        ],
        description: 'Available as an extended range plug-in electric hybrid (PHEV). The 3.0-litre 6 cylinder Ingenium petrol engine with 160 kW motor is fitted with P460e or P550e variants.',
        cta: "https://www.rangerover.com/lr/en_in/l460_k25/_/a-si6-550_a-ab_a-swb_h/ipr/personalise/model/"
    },
    {
        title: "SV PETROL V8",
        image: rover2,
        specs: [
            { label: "TOP SPEED", value: "261", unit: "KM/H" },
            { label: "MAXIMUM POWER", value: "452", unit: "kW" },
            { label: "0-100 KM/H", value: "4.5", unit: "S" }
        ],
        description: 'Providing immediate response with exceptional drivability, the 4.4-litre V8 engine has 452 kW and 750 Nm of torque - taking Range Rover SV from 0‑100 km/h in 4.5 seconds with Dynamic Launch engaged.',
        cta: "https://www.rangerover.com/lr/en_in/l460_k25/_/a-v8-615-sv_a-sv_a-swb_p/ipr/personalise/model/"
    },
    {
        title: "PETROL V8",
        image: rover3,
        specs: [
            { label: "TOP SPEED", value: "250", unit: "KM/H" },
            { label: "MAXIMUM POWER", value: "390", unit: "kW" },
            { label: "0-100 KM/H", value: "4.6", unit: "S" }
        ],
        description: 'Uncompromising power and performance with heightened efficiency. The new 4.4-litre V8 engine has 390 kW and 750 Nm of torque and can take Range Rover from 0‑100 km/h in 4.6 seconds with Dynamic Launch engaged.',
        cta: "https://www.rangerover.com/lr/en_in/l460_k25/_/a-v8-530_a-ab_a-swb_p/ipr/personalise/engine/"
    },
    {
        title: "DIESEL MILD HYBRID",
        image: rover4,
        specs: [
            { label: "TOP SPEED", value: "234", unit: "KM/H" },
            { label: "MAXIMUM POWER", value: "258", unit: "kW" },
            { label: "0-100 KM/H", value: "6.0", unit: "S" }
        ],
        description: `Range Rover’s mild hybrid engines harvest, store and redeploy energy normally lost during deceleration. Available with a range of diesel and petrol engines.`,
        cta: "https://www.rangerover.com/lr/en_in/l460"
    },
]

const Mercedescar = () => {
    const [activeTab] = useState('ELECTRIC HYBRID');
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData[activeIndex];
    return (
        <div className="bbb">
        <div className="rover-det-spec-block">
            <div className="rover-tabs-container">
                <h1 className="title1">HEIGHTENED PERFORMANCE</h1>
                <p className="subtitle">
                    The original luxury SUV, leading with Range Rover Electric and efficient plug-in and mild hybrids.
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
                    </div>
                </div>
            </div>

            <br />
            <br />
            <br />
            <a className="btn-boxpage5 mt-4 appearIntroPage5" href="/page5">View More</a>

        </div>
        </div>
    );
}

export default Mercedescar;