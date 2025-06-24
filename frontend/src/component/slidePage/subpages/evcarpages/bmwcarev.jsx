import React, { useState } from "react";
import '../../subpages/mainstyle.css';

import BmwI4Image from '../evcarpages/pageAsset/bmw/i4.jpg';
import BmwIxImage from '../evcarpages/pageAsset/bmw/ix.jpg';
import BmwI7Image from '../evcarpages/pageAsset/bmw/i7.jpg';
import BmwIxm60Image from '../evcarpages/pageAsset/bmw/m60.jpg';

const tabData = [
    {
        title: "BMW i4 eDrive40",
        image: BmwI4Image,
        specs: [
            { label: "ELECTRIC RANGE (WLTP)", value: "590", unit: "KM" },
            { label: "0-100 KM/H", value: "5.7", unit: "S" },
            { label: "MAXIMUM POWER", value: "250", unit: "kW" } // 340 hp
        ],
        description: 'The BMW i4 eDrive40 is a fully electric Gran Coupé that blends sporty performance with elegant design and a long driving range, making it ideal for both city driving and longer journeys.',
        cta: "https://www.bmw.in/en/all-models/i-series/i4/overview.html"
    },
    {
        title: "BMW iX xDrive40 / xDrive50",
        image: BmwIxImage,
        specs: [
            { label: "ELECTRIC RANGE (WLTP)", value: "425 / 635", unit: "KM" }, // Approximate, varies by variant
            { label: "0-100 KM/H", value: "6.1 / 4.6", unit: "S" }, // Approximate, varies by variant
            { label: "MAXIMUM POWER", value: "240 / 385", unit: "kW" } // 326 / 523 hp, varies by variant
        ],
        description: 'The BMW iX is a fully electric Sports Activity Vehicle (SAV) that offers a futuristic design, luxurious interior, and impressive electric performance. Available in different power and range options.',
        cta: "https://www.bmw.in/en/all-models/i-series/ix/overview.html"
    },
    {
        title: "BMW i7 xDrive60",
        image: BmwI7Image,
        specs: [
            { label: "ELECTRIC RANGE (WLTP)", value: "590 - 625", unit: "KM" },
            { label: "0-100 KM/H", value: "4.7", unit: "S" },
            { label: "MAXIMUM POWER", value: "400", unit: "kW" } // 544 hp
        ],
        description: 'The BMW i7 xDrive60 is the all-electric version of the flagship 7 Series sedan, offering unparalleled luxury, cutting-edge technology, and a serene electric driving experience with substantial range.',
        cta: "https://www.bmw.in/en/all-models/i-series/i7/overview.html"
    },
    {
        title: "BMW iXM60",
        image: BmwIxm60Image,
        specs: [
            { label: "ELECTRIC RANGE (WLTP)", value: "506 - 561", unit: "KM" },
            { label: "0-100 KM/H", value: "3.8", unit: "S" },
            { label: "MAXIMUM POWER", value: "455", unit: "kW" } // 619 hp
        ],
        description: 'The BMW iXM60 is the high-performance electric SAV from BMW M. It combines the luxurious features of the iX with exhilarating power and sporty driving dynamics, delivering a unique EV experience.',
        cta: "https://www.bmw.in/en/all-models/m-series/ix-m/overview.html"
    },
    // Potentially add other upcoming or recently launched models as per BMW India's portfolio
];

const Bmwevcar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tabData?.[activeIndex]; // Use optional chaining to handle potential undefined

    return (
        <div className="bbb">
            <div className="rover-det-spec-block"> {/* Consider a more generic class name */}
                <div className="rover-tabs-container"> {/* Consider a more generic class name */}
                    <h1 className="title1">THE FUTURE OF DRIVING: BMW ELECTRIC</h1>
                    <p className="subtitle">
                        Experience the innovative world of BMW electric vehicles, combining exhilarating performance, cutting-edge technology, and sustainable mobility for the roads of Nagpur and beyond.
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
                        {active && (
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
                        )}
                        {!active && <p>No electric BMW models available to display.</p>} {/* Fallback in case data is empty */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bmwevcar;