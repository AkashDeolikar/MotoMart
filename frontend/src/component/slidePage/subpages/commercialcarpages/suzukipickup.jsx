import React, { useState } from "react";
import '../../subpages/mainstyle.css'; // Assuming your shared CSS is here

import MS_SuperCarryPetrolImage from '../commercialcarpages/pageAsset/suzuki/1.jpg'; 
import MS_SuperCarryCNGImage from '../commercialcarpages/pageAsset/suzuki/2.jpg';

const tabData = [
    {
        title: "MARUTI SUZUKI SUPER CARRY (PETROL) - MINI TRUCK",
        image: MS_SuperCarryPetrolImage,
        specs: [
            { label: "ENGINE", value: "1.2L Advanced K-Series Dual Jet, Dual VVT Petrol", unit: "" },
            { label: "POWER", value: "80.7", unit: "PS @ 6000 rpm" },
            { label: "TORQUE", value: "104.4", unit: "Nm @ 2900 rpm" },
            { label: "PAYLOAD CAPACITY", value: "740", unit: "kg" },
            { label: "GVW", value: "1600", unit: "kg" },
            { label: "MILEAGE (ARAI)", value: "18", unit: "kmpl" },
            { label: "FUEL TANK", value: "30", unit: "Litres (Petrol)" },
            { label: "TRANSMISSION", value: "5-Speed Manual", unit: "" }
        ],
        description: 'The Maruti Suzuki Super Carry Petrol variant is a powerful and reliable mini-truck designed for efficient urban and semi-urban goods transportation. It offers robust performance, high payload capacity, and improved fuel efficiency, making it an ideal partner for various businesses.',
        cta: 'https://www.marutisuzukicommercial.com/super-carry', // Official Super Carry page
    },
    {
        title: "MARUTI SUZUKI SUPER CARRY (CNG) - MINI TRUCK",
        image: MS_SuperCarryCNGImage,
        specs: [
            { label: "ENGINE", value: "1.2L Advanced K-Series Dual Jet, Dual VVT CNG", unit: "" },
            { label: "POWER", value: "70.67", unit: "PS @ 6000 rpm (CNG Mode)" },
            { label: "TORQUE", value: "95", unit: "Nm @ 2800 rpm (CNG Mode)" },
            { label: "PAYLOAD CAPACITY", value: "625", unit: "kg" },
            { label: "GVW", value: "1600", unit: "kg" },
            { label: "MILEAGE (ARAI)", value: "23.24", unit: "km/kg (CNG)" },
            { label: "FUEL TANK", value: "70", unit: "Litres (CNG) + 5 Litres (Petrol Emergency)" },
            { label: "TRANSMISSION", value: "5-Speed Manual", unit: "" }
        ],
        description: 'The Maruti Suzuki Super Carry CNG offers a highly economical and eco-friendly solution for commercial transport. With its impressive CNG mileage and bi-fuel capability (CNG + Petrol emergency tank), it ensures lower running costs and extended range, making it highly profitable for businesses.',
        cta: 'https://www.marutisuzukicommercial.com/super-carry', // Official Super Carry page
    },
];

const Suzukipickup = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData?.[activeIndex]; // Use optional chaining for safety

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">MARUTI SUZUKI COMMERCIAL: AAPKA SAATH, AAPKI TARAKKI</h1>
                    <p className="subtitle">
                        Discover the Maruti Suzuki Super Carry, India's most powerful mini-truck, engineered for superior performance, reliability, and profitability in last-mile delivery.
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
                                            </div>
                                        ))}
                                    </div>
                                    <p className="titleH">{active.title}</p>
                                    <p className="descriptionn">{active.description}</p>
                                    <a className="btn-boxpage5 mt-4 appearIntroPage5" href={active.cta} target="_blank" rel="noopener noreferrer">
                                        Explore More
                                    </a>
                                </div>
                            </>
                        ) : (
                            <p>No Suzuki Pickup vehicles available to display.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Suzukipickup;