import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import ALDostImage from '../commercialcarpages/pageAsset/ashok/1.jpg';
import ALEcometImage from '../commercialcarpages/pageAsset/ashok/2.jpg';
import ALAVTRImage from '../commercialcarpages/pageAsset/ashok/3.jpg';

const tabData = [
    {
        title: "ASHOK LEYLAND DOST+ (LIGHT COMMERCIAL VEHICLE)",
        image: ALDostImage,
        specs: [
            { label: "ENGINE", value: "1.5L, 3 Cylinder Diesel", unit: "(BS6)" },
            { label: "POWER", value: "70", unit: "hp" },
            { label: "TORQUE", value: "170", unit: "Nm" },
            { label: "PAYLOAD CAPACITY", value: "1500", unit: "kg" },
            { label: "GVW", value: "2805", unit: "kg" },
            { label: "MILEAGE (Approx.)", value: "19.6", unit: "kmpl" },
            { label: "TRANSMISSION", value: "5-Speed Manual", unit: "" }
        ],
        description: 'The Ashok Leyland Dost+ is a versatile and robust light commercial vehicle, ideal for last-mile delivery and varied intra-city logistics. It offers high payload, excellent mileage, and superior comfort for its segment, making it a profitable choice for businesses.',
        cta: 'https://www.ashokleyland.com/in/trucks/light-commercial-vehicle', // General LCV link, specific Dost+ page might vary
    },
    {
        title: "ASHOK LEYLAND ECOMET 1615 HE (INTERMEDIATE COMMERCIAL VEHICLE)",
        image: ALEcometImage,
        specs: [
            { label: "ENGINE", value: "H series BS-VI – 4 cylinder CRS with i-Gen6", unit: "" },
            { label: "POWER", value: "150", unit: "hp" },
            { label: "TORQUE", value: "450", unit: "Nm" },
            { label: "GVW", value: "16100", unit: "kg" },
            { label: "PAYLOAD CAPACITY", value: "10800", unit: "kg" },
            { label: "TRANSMISSION", value: "6-Speed Manual", unit: "" },
            { label: "FUEL TANK", value: "185", unit: "Ltrs" }
        ],
        description: 'The Ashok Leyland Ecomet 1615 HE is a highly efficient and reliable intermediate commercial vehicle, designed for various applications including cargo transport, tipper, and tanker. It features advanced i-Gen6 technology for optimal performance and fuel efficiency.',
        cta: 'https://www.ashokleyland.com/in/trucks/intermediate-commercial-vehicle', // General ICV link, specific Ecomet page might vary
    },
    {
        title: "ASHOK LEYLAND AVTR 4620 (HEAVY COMMERCIAL VEHICLE)",
        image: ALAVTRImage,
        specs: [
            { label: "ENGINE", value: "H series BS-VI with i-Gen6 technology", unit: "" },
            { label: "POWER", value: "200", unit: "hp" },
            { label: "TORQUE", value: "700", unit: "Nm" },
            { label: "GVW", value: "45500", unit: "kg" },
            { label: "TRANSMISSION", value: "6-Speed Manual", unit: "" },
            { label: "FUEL TANK", value: "375", unit: "Ltrs" },
            { label: "AXLE CONFIGURATION", value: "4x2", unit: "" }
        ],
        description: 'The Ashok Leyland AVTR 4620 is part of Ashok Leyland\'s modular truck platform, offering superior flexibility, higher load-carrying capacity, and best-in-class mileage for heavy-duty applications. It is engineered for long-haul transportation with enhanced driver comfort.',
        cta: 'https://www.ashokleyland.com/in/trucks/heavy-commercial-vehicle', // General HCV link, specific AVTR page might vary
    },
];

const Ashokpickup = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData?.[activeIndex]; // Use optional chaining for safety

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">ASHOK LEYLAND: DRIVING PROGRESS</h1>
                    <p className="subtitle">
                        Experience the power of reliability and innovation with Ashok Leyland, India's trusted leader in commercial vehicles, engineered for every road and every business.
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
                            <p>No Ashok Leyland vehicles available to display.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ashokpickup;