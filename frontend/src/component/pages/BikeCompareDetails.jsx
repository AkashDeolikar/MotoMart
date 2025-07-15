// BikeCompareDetails.jsx (Revised to match CarDetails.jsx structure and new JSON)
import React, { useState, useEffect } from 'react';
import bikeData from '../data/bikes.json'; // Ensure this path is correct
import './cardetails.css'; 
// Assuming this CSS handles the styling
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Ensure this path is correct
import { onAuthStateChanged } from 'firebase/auth';

const LoadingOverlay = ({ isLoading }) => {
    if (!isLoading) return null;
    return (
        <div className="app-loading-overlay">
            <div className="app-glass-loader">
                <div className="app-spinner"></div>
                <p className="app-loading-text">
                    <i className="bi bi-lightning-charge-fill"></i> Please wait... loading details
                </p>
            </div>
        </div>
    );
};

const BikeCompareDetails = () => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedBike, setSelectedBike] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [bikeInfo, setBikeInfo] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [bikesToCompare, setBikesToCompare] = useState([]);
    const [showComparison, setShowComparison] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) navigate('/login');
            else setAuthChecked(true);
        });
        return () => unsubscribe();
    }, [navigate]);

    if (!authChecked) return null; // Wait for authentication check

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        setSelectedBike('');
        setSelectedVariant('');
        setBikeInfo(null);
        setSubmitted(false);
        setShowComparison(false);
    };

    const handleBikeChange = (e) => {
        setSelectedBike(e.target.value);
        setSelectedVariant('');
        setBikeInfo(null);
        setSubmitted(false);
        setShowComparison(false);
    };

    const handleVariantChange = (e) => {
        setSelectedVariant(e.target.value);
        setBikeInfo(null);
        setSubmitted(false);
        setShowComparison(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedBrand || !selectedBike || !selectedVariant) {
            alert('Please select a Brand, Bike, and Variant to search.');
            return;
        }

        setLoading(true);
        setSubmitted(false);
        setShowComparison(false);

        // Simulate network request delay
        setTimeout(() => {
            try {
                const commonDetails = bikeData[selectedBrand]?.[selectedBike]?.common_details;
                const variantDetails = bikeData[selectedBrand]?.[selectedBike]?.variants?.[selectedVariant];

                if (commonDetails && variantDetails) {
                    setBikeInfo({
                        ...commonDetails,
                        ...variantDetails,
                        selectedVariantName: selectedVariant, // Keep this for display
                        brand: selectedBrand, // Add brand for easier access in bikeInfo
                        bikeName: selectedBike // Add bike name for easier access in bikeInfo
                    });
                } else {
                    alert('Bike or variant information not found in our database.');
                    setBikeInfo(null);
                }
            } catch (error) {
                console.error("Error accessing Bike data:", error);
                alert('An error occurred while fetching bike details. Please try again.');
                setBikeInfo(null);
            } finally {
                setLoading(false);
                setSubmitted(true);
            }
        }, 1000);
    };

    const handleAddToCompare = () => {
        if (bikeInfo) {
            if (bikesToCompare.length < 2) {
                const isAlreadyAdded = bikesToCompare.some(
                    (bike) =>
                        bike.brand === selectedBrand &&
                        bike.bikeName === selectedBike &&
                        bike.variantName === bikeInfo.selectedVariantName
                );

                if (!isAlreadyAdded) {
                    setBikesToCompare((prevBikes) => [
                        ...prevBikes,
                        {
                            brand: selectedBrand,
                            bikeName: selectedBike,
                            variantName: bikeInfo.selectedVariantName,
                            details: bikeInfo, // Store the combined bikeInfo
                        },
                    ]);
                } else {
                    alert('This specific bike (variant) is already in your comparison list.');
                }
            } else {
                alert('You can compare a maximum of two bikes at a time.');
            }
        }
    };

    const handleClearComparison = () => {
        setBikesToCompare([]);
        setShowComparison(false);
    };

    const handleShowComparison = () => {
        if (bikesToCompare.length < 2) {
            alert('Please add two bikes to compare.');
        } else {
            setShowComparison(true);
        }
    };

    const brands = Object.keys(bikeData);
    const bikes = selectedBrand ? Object.keys(bikeData[selectedBrand]) : [];
    const variants = selectedBrand && selectedBike ? Object.keys(bikeData[selectedBrand]?.[selectedBike]?.variants || {}) : [];

    // Define the order of features for individual display and comparison
    // This provides a consistent order and allows easy addition/removal
    const displayFeatures = [
        // Basic Info
        { key: 'brand', label: 'Brand', type: 'text' },
        { key: 'bikeName', label: 'Bike', type: 'text' },
        { key: 'selectedVariantName', label: 'Variant', type: 'text' },
        { key: 'pricing', label: 'Price', type: 'text' },
        { key: 'bodyType', label: 'Body Type', type: 'text' },
        { key: 'emissionStandard', label: 'Emission Standard', type: 'text' },

        // Engine & Performance 
        { key: 'engine', label: 'Engine', type: 'text' },
        { key: 'maxPower', label: 'Max Power', type: 'text' },
        { key: 'maxTorque', label: 'Max Torque', type: 'text' },
        { key: 'mileage', label: 'Mileage', type: 'text' },
        { key: 'transmission', label: 'Transmission', type: 'text' },
        { key: 'coolingSystem', label: 'Cooling System', type: 'text' },
        { key: 'bore', label: 'Bore', type: 'text' },
        { key: 'stroke', label: 'Stroke', type: 'text' },
        { key: 'compressionRatio', label: 'Compression Ratio', type: 'text' },
        { key: 'topSpeed', label: 'Top Speed', type: 'text' },

        // Dimensions & Capacity
        { key: 'fuelCapacity', label: 'Fuel Capacity', type: 'text' },
        { key: 'reserveFuelCapacity', label: 'Reserve Fuel', type: 'text' },
        { key: 'kerbWeight', label: 'Kerb Weight', type: 'text' },
        { key: 'seatHeight', label: 'Seat Height', type: 'text' },
        { key: 'groundClearance', label: 'Ground Clearance', type: 'text' },
        { key: 'overallLength', label: 'Length', type: 'text' },
        { key: 'overallWidth', label: 'Width', type: 'text' },
        { key: 'overallHeight', label: 'Height', type: 'text' },
        { key: 'wheelbase', label: 'Wheelbase', type: 'text' },

        // Brakes & Wheels
        { key: 'brakingSystem', label: 'Braking System', type: 'text' },
        { key: 'frontBrakeType', label: 'Front Brake Type', type: 'text' },
        { key: 'frontBrakeSize', label: 'Front Brake Size', type: 'text' },
        { key: 'rearBrakeType', label: 'Rear Brake Type', type: 'text' },
        { key: 'rearBrakeSize', label: 'Rear Brake Size', type: 'text' },
        { key: 'wheelType', label: 'Wheel Type', type: 'text' },
        { key: 'frontWheelSize', label: 'Front Wheel Size', type: 'text' },
        { key: 'rearWheelSize', label: 'Rear Wheel Size', type: 'text' },
        { key: 'frontTyreSize', label: 'Front Tyre Size', type: 'text' },
        { key: 'rearTyreSize', label: 'Rear Tyre Size', type: 'text' },
        { key: 'tyreType', label: 'Tyre Type', type: 'text' },

        // Suspension
        { key: 'frontSuspension', label: 'Front Suspension', type: 'text' },
        { key: 'rearSuspension', label: 'Rear Suspension', type: 'text' },

        // Electricals & Features
        { key: 'battery', label: 'Battery', type: 'text' },
        { key: 'instrumentConsole', label: 'Instrument Console', type: 'text' },
        { key: 'usbChargingPort', label: 'USB Charging', type: 'text' },
        { key: 'headlightType', label: 'Headlight Type', type: 'text' },
        { key: 'drLs', label: 'DRLs', type: 'boolean' }, // For boolean values
        { key: 'tailLightType', label: 'Tail Light Type', type: 'text' },
        { key: 'turnSignalType', label: 'Turn Signal Type', type: 'text' },
        { key: 'startType', label: 'Start Type', type: 'text' },
        { key: 'killSwitch', label: 'Kill Switch', type: 'boolean' },
        { key: 'pillionFootrest', label: 'Pillion Footrest', type: 'boolean' },
        { key: 'features', label: 'Key Features', type: 'array' } // For array values
    ];

    // Filter features for comparison table - exclude image, selectedVariantName, brand, bikeName as they are headers
    const comparisonFeatures = displayFeatures.filter(f =>
        f.key !== 'image' &&
        f.key !== 'selectedVariantName' &&
        f.key !== 'brand' &&
        f.key !== 'bikeName'
    );

    return (
        <div className="getinfo-container advanced-ui" data-theme={document.documentElement.getAttribute('data-theme')}>
            <LoadingOverlay isLoading={isLoading} />
            <h2 className="getinfo-title">Explore Your Dream Bike</h2>
            <form onSubmit={handleSubmit} className="getinfo-form">
                <div className="getinfo-field">
                    <label htmlFor="brand">Brand:</label>
                    <select id="brand" value={selectedBrand} onChange={handleBrandChange}>
                        <option value="">Select Brand</option>
                        {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                </div>

                <div className="getinfo-field">
                    <label htmlFor="bike">Bike Model:</label>
                    <select id="bike" value={selectedBike} onChange={handleBikeChange} disabled={!selectedBrand}>
                        <option value="">Select Bike Model</option>
                        {bikes.map((bike) => <option key={bike} value={bike}>{bike}</option>)}
                    </select>
                </div>

                <div className="getinfo-field">
                    <label htmlFor="variant">Variant:</label>
                    <select id="variant" value={selectedVariant} onChange={handleVariantChange} disabled={!selectedBike}>
                        <option value="">Select Variant</option>
                        {variants.map((variant) => <option key={variant} value={variant}>{variant}</option>)}
                    </select>
                </div>

                <button className="getinfo-btn gradient-shadow" type="submit" disabled={!selectedBrand || !selectedBike || !selectedVariant || loading}>
                    {loading ? 'Searching...' : '🔍 Search Details'}
                </button>
            </form>

            {submitted && bikeInfo && (
                <div className="getinfo-result fade-in">
                    <h4 className="getinfo-subheading">Specifications for {selectedBike} - {bikeInfo.selectedVariantName}</h4>
                    {bikeInfo.image && <img src={bikeInfo.image} alt={selectedBike} className="getinfo-image" />}

                    <div className="getinfo-grid">
                        {displayFeatures.map(feature => (
                            bikeInfo[feature.key] !== undefined && (
                                <p key={feature.key}>
                                    <strong>{feature.label}:</strong>{' '}
                                    {feature.type === 'array'
                                        ? bikeInfo[feature.key].join(', ')
                                        : feature.type === 'boolean'
                                            ? (bikeInfo[feature.key] ? 'Yes' : 'No')
                                            : bikeInfo[feature.key]}
                                </p>
                            )
                        ))}
                    </div>

                    <button className="getinfo-btn add-to-compare-btn" onClick={handleAddToCompare} disabled={bikesToCompare.length >= 2}>
                        Add to Compare ({bikesToCompare.length}/2)
                    </button>
                </div>
            )}

            {bikesToCompare.length > 0 && (
                <div className="comparison-list-summary fade-in">
                    <h4>Currently Selected for Comparison:</h4>
                    <ul>
                        {bikesToCompare.map((bike, index) => (
                            <li key={index}>{bike.brand} {bike.bikeName} - {bike.variantName}</li>
                        ))}
                    </ul>
                    <button className="getinfo-btn" onClick={handleShowComparison} disabled={bikesToCompare.length < 2}>Compare Selected Bikes</button>
                    <button className="getinfo-btn clear-btn" onClick={handleClearComparison}>Clear Comparison List</button>
                </div>
            )}

            {showComparison && bikesToCompare.length === 2 && (
                <div className="bike-comparison-container fade-in">
                    <h3 className="comparison-title">Side-by-Side Bike Comparison</h3>
                    <div className="comparison-table">
                        <div className="comparison-row comparison-header">
                            <div className="comparison-cell">Feature</div>
                            <div className="comparison-cell">{bikesToCompare[0].bikeName} ({bikesToCompare[0].variantName})</div>
                            <div className="comparison-cell">{bikesToCompare[1].bikeName} ({bikesToCompare[1].variantName})</div>
                        </div>

                        {comparisonFeatures.map(feature => (
                            <div className="comparison-row" key={feature.key}>
                                <div className="comparison-cell"><strong>{feature.label}</strong></div>
                                <div className="comparison-cell">
                                    {feature.type === 'array'
                                        ? (bikesToCompare[0].details[feature.key]?.join(', ') || 'N/A')
                                        : feature.type === 'boolean'
                                            ? (bikesToCompare[0].details[feature.key] ? 'Yes' : (bikesToCompare[0].details[feature.key] === false ? 'No' : 'N/A'))
                                            : (bikesToCompare[0].details[feature.key] || 'N/A')}
                                </div>
                                <div className="comparison-cell">
                                    {feature.type === 'array'
                                        ? (bikesToCompare[1].details[feature.key]?.join(', ') || 'N/A')
                                        : feature.type === 'boolean'
                                            ? (bikesToCompare[1].details[feature.key] ? 'Yes' : (bikesToCompare[1].details[feature.key] === false ? 'No' : 'N/A'))
                                            : (bikesToCompare[1].details[feature.key] || 'N/A')}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="getinfo-btn clear-btn" onClick={handleClearComparison}>Clear Comparison</button>
                </div>
            )}
        </div>
    );
};

export default BikeCompareDetails;