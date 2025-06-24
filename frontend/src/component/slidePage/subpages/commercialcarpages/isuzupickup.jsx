import React, { useState } from "react";
import '../../subpages/mainstyle.css'; 

import IsuzuVcrossImage from '../commercialcarpages/pageAsset/isuzu/1.jpg'; 
import IsuzuMUxImage from '../commercialcarpages/pageAsset/isuzu/2.jpg';
import IsuzuDmaxImage from '../commercialcarpages/pageAsset/isuzu/3.jpg';

const tabData = [
    {
        title: "ISUZU D-MAX V-CROSS (ADVENTURE UTILITY VEHICLE)",
        image: IsuzuVcrossImage,
        specs: [
            { label: "ENGINE", value: "1.9L Ddi VGS Turbo Intercooled Diesel", unit: "" },
            { label: "POWER", value: "163", unit: "PS" },
            { label: "TORQUE", value: "360", unit: "Nm" },
            { label: "SEATING CAPACITY", value: "5", unit: "Seater" },
            { label: "TRANSMISSION", value: "6-Speed Manual / Automatic (TC)", unit: "" },
            { label: "DRIVE TYPE", value: "2WD / 4WD (Shift-on-the-fly)", unit: "" },
            { label: "MILEAGE (Approx.)", value: "12.4 - 14", unit: "kmpl" }
        ],
        description: 'The Isuzu D-Max V-Cross is India\'s first adventure utility vehicle, combining the ruggedness of a pickup with SUV-like comfort and features. It\'s built for those who seek adventure and demand durability.',
        cta: 'https://www.isuzu.in/v-cross.html',
    },
    {
        title: "ISUZU MU-X (PREMIUM SUV)",
        image: IsuzuMUxImage,
        specs: [
            { label: "ENGINE", value: "1.9L Ddi VGS Turbo Intercooled Diesel", unit: "" },
            { label: "POWER", value: "163", unit: "PS" },
            { label: "TORQUE", value: "360", unit: "Nm" },
            { label: "SEATING CAPACITY", value: "7", unit: "Seater" },
            { label: "TRANSMISSION", value: "6-Speed Automatic (TC)", unit: "" },
            { label: "DRIVE TYPE", value: "2WD / 4WD", unit: "" },
            { label: "MILEAGE (Approx.)", value: "12.3 - 13", unit: "kmpl" }
        ],
        description: 'The Isuzu MU-X is a robust and spacious 7-seater SUV, offering a blend of powerful performance, superior comfort, and advanced safety features. It\'s designed for families and adventurers who need reliability and space.',
        cta: 'https://www.isuzu.in/mu-x.html',
    },
    {
        title: "ISUZU D-MAX (COMMERCIAL PICKUP)",
        image: IsuzuDmaxImage,
        specs: [
            { label: "ENGINE", value: "2.5L 4JA1 Common Rail Diesel", unit: "" },
            { label: "POWER", value: "78", unit: "PS" },
            { label: "TORQUE", value: "176", unit: "Nm" },
            { label: "PAYLOAD CAPACITY", value: "Up to 1710", unit: "kg" },
            { label: "GVW", value: "Up to 3490", unit: "kg" },
            { label: "TRANSMISSION", value: "5-Speed Manual", unit: "" },
            { label: "FUEL TYPE", value: "Diesel", unit: "" }
        ],
        description: 'The Isuzu D-Max is a reliable and highly durable commercial pickup truck, engineered for heavy-duty usage and diverse business applications. It offers excellent load-carrying capability and fuel efficiency, making it ideal for various commercial needs.',
        cta: 'https://www.isuzu.in/d-max.html', // General D-Max commercial link
    },
];

const Isuzupickup = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData?.[activeIndex]; // Use optional chaining for safety

    return (
        <div className="bbb">
            <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                    <h1 className="title1">ISUZU: ENGINEERED FOR LIFE</h1>
                    <p className="subtitle">
                        Discover Isuzu's range of durable and reliable vehicles, built with over a century of Japanese engineering excellence to conquer any challenge.
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
                            <p>No Isuzu vehicles available to display.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Isuzupickup;