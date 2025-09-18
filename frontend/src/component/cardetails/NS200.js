import React, { useState, useRef } from "react";
import './Details.css';
import './temp.css';

const NS200Detail = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [currentIndex, setCurrentIndex] = useState(1);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const [selectedColor, setSelectedColor] = useState(0);

    const totalImages = 15;

    const car = {
        name: "Bajaj Pulsar NS200 (2024)",
        price: "₹1,56,876 – ₹1,58,876 (Ex-showroom, Delhi)",
        mileage: "35 – 40 kmpl (User Reported, Real-world)",
        description:
            "The Bajaj Pulsar NS200 is a naked streetfighter motorcycle that blends aggressive styling with sporty performance. Equipped with a liquid-cooled, triple-spark engine and perimeter frame, it offers sharp handling and a thrilling ride. The latest update brings a new all-digital instrument cluster with Bluetooth connectivity, navigation, and improved safety with dual-channel ABS.",
        details: {
            engine: {
                displacement:
                    "199.5cc, Single-Cylinder, 4-Valve, SOHC, Liquid-Cooled, Triple-Spark, Fuel-Injected",
                power: "24.5 PS @ 9750 rpm",
                torque: "18.74 Nm @ 8000 rpm",
                emissionStandard: "BS6 Phase 2 (OBD2B compliant)",
            },
            transmission: "6-speed Manual",
            fuelOptions: "Petrol",
            safetyRating: "Not rated by NCAP, features Dual-Channel ABS",
            segment: "Naked Streetfighter",
            launched: "Original: 2012 | Latest BS6 OBD2 Update: 2023",
            variants: ["Standard with Dual-Channel ABS"],
            dimensions: {
                length: "2017 mm",
                width: "804 mm",
                height: "1075 mm",
                wheelbase: "1363 mm",
                groundClearance: "168 mm",
                seatHeight: "805 mm",
                kerbWeight: "159.5 kg",
                fuelTankCapacity: "12 Litres",
            },
            features: [
                "All-Digital LCD Instrument Cluster (New)",
                "Bluetooth Connectivity (Bajaj Ride Connect App)",
                "Turn-by-Turn Navigation",
                "Gear Position Indicator",
                "Distance-to-Empty (DTE) & Real-Time Mileage",
                "Dual-Channel ABS",
                "Perimeter Frame for Better Stability",
                "Upside-Down (USD) Front Forks (new upgrade)",
                "Nitrox Monoshock Rear Suspension",
                "Underbelly Exhaust for Mass Centralization",
                "LED DRLs and Projector Headlamp",
            ],
            colorOptions: [
                { name: "Metallic Pearl White", hex: "#f5f5f5" },
                { name: "Glossy Ebony Black", hex: "#1a1a1a" },
                { name: "Cocktail Wine Red", hex: "#990000" },
                { name: "Pewter Grey", hex: "#6c727f" },
            ],
        },
    };


    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.clientX;
    };
    const handleMouseUp = () => { isDragging.current = false; };
    const handleMouseLeave = () => { isDragging.current = false; };
    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        const delta = e.clientX - startX.current;
        if (Math.abs(delta) > 5) {
            setCurrentIndex(prev => (prev + (delta > 0 ? -1 : 1) - 1 + totalImages) % totalImages + 1);
            startX.current = e.clientX;
        }
    };
    const handleTouchStart = (e) => {
        isDragging.current = true;
        startX.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e) => {
        if (!isDragging.current) return;
        const delta = e.touches[0].clientX - startX.current;
        if (Math.abs(delta) > 15) {
            setCurrentIndex(prev => (prev + (delta > 0 ? -1 : 1) - 1 + totalImages) % totalImages + 1);
            startX.current = e.touches[0].clientX;
        }
    };
    const handleTouchEnd = () => { isDragging.current = false; };

    return (
        <div className="car-detail-page">
            <div className="car360-section">
                <h3 className="section-title">360° Experience</h3>
                <p className="section-subtitle">Swipe or drag to rotate the scooter image</p>
                <div className="car360-box">
                    <div
                        className="car360-panorama"
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {[...Array(totalImages)].map((_, i) => (
                            <img
                                key={i}
                                className="car360-frame"
                                src={`/images/ns200/${i + 0}.webp`}
                                alt={`ns-360-${i + 1}`}
                                style={{
                                    visibility: i + 1 === currentIndex ? "visible" : "hidden",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="car-detail-section">
                <h1>{car.name}</h1>
                <p className="lead-description">{car.description}</p>

                <div className="key-highlights">
                    <p><strong>Price:</strong> {car.price}</p>
                    <p><strong>Mileage:</strong> {car.mileage}</p>
                </div>

                <div className="tab-buttons">
                    <button className={activeTab === "overview" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("overview")}>Overview</button>
                    <button className={activeTab === "specs" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("specs")}>Specifications</button>
                    <button className={activeTab === "colors" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("colors")}>Colors</button>
                    <button className={activeTab === "features" ? "tab-btn active" : "tab-btn"} onClick={() => setActiveTab("features")}>Features</button>
                </div>

                {activeTab === "overview" && (
                    <div className="tab-content360 active">
                        <h2>Segment</h2>
                        <p>{car.details.segment}</p>
                        <h2>Launch Date</h2>
                        <p>{car.details.launched}</p>
                        <h2>Variants</h2>
                        <ul>
                            {car.details.features.map((variant, i) => (
                                <li key={i}>
                                    <span className="material-symbols-outlined">check_circle</span>
                                    {variant}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === "specs" && (
                    <div className="tab-content360 active">
                        <h2>Engine & Transmission</h2>
                        <p><strong>Displacement:</strong> {car.details.engine.displacement}</p>
                        <p><strong>Power:</strong> {car.details.engine.power}</p>
                        <p><strong>Torque:</strong> {car.details.engine.torque}</p>
                        <p><strong>Emission Standard:</strong> {car.details.engine.emissionStandard}</p>
                        <p><strong>Transmission:</strong> {car.details.transmission}</p>
                        <p><strong>Fuel Type:</strong> {car.details.fuelOptions}</p>

                        <h2>Performance & Efficiency</h2>
                        <p><strong>Claimed Mileage:</strong> {car.mileage}</p>
                        <p><strong>Fuel Tank Capacity:</strong> 5.3 Litres</p>
                        <p><strong>Underseat Storage:</strong> Approx. 18 Litres</p>

                        <h2>Chassis & Dimensions</h2>
                        <p><strong>Seat Height:</strong> 692 mm</p>
                        <p><strong>Ground Clearance:</strong> 162 mm</p>
                        <p><strong>Wheelbase:</strong> 1260 mm</p>
                        <p><strong>Kerb Weight:</strong> Approx. 105–106 kg</p>

                        <h2>Tyres & Brakes</h2>
                        <p><strong>Tyre Size (Front):</strong> 90/90-12 (Tubeless)</p>
                        <p><strong>Tyre Size (Rear):</strong> 90/100-10 (Tubeless)</p>
                        <p><strong>Wheel Type:</strong> Alloy (DLX & H-Smart), Steel (STD)</p>
                    </div>
                )}


                {activeTab === "colors" && (
                    <div className="tab-content360 active">
                        <h2>Available Colors</h2>
                        <div className="color-swatches">
                            {car.details.colorOptions.map((c, index) => (
                                <div
                                    key={index}
                                    className={`color-swatch-item ${selectedColor === index ? "selected" : ""
                                        }`}
                                    onClick={() => setSelectedColor(index)}
                                >
                                    <div
                                        className="color-swatch-circle"
                                        style={{ backgroundColor: c.hex }}
                                    ></div>
                                    <small className="color-swatch-label">
                                        {c.name} {c.dualTone && "(Dual Tone)"}
                                    </small>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {activeTab === "features" && (
                    <div className="tab-content360 active">
                        <h2>Key Features</h2>
                        <ul>
                            {car.details.features.map((item, i) => (
                                <li key={i}>
                                    <span className="material-symbols-outlined">check_circle</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                    </div>
                )}
            </div>
        </div>
    );
};

export default NS200Detail;
