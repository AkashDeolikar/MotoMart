
import React, { useState, useEffect } from 'react';
import './cardetails.css'; // Your CSS file
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
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

const CarDetails = () => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCar, setSelectedCar] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [carInfo, setCarInfo] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [carsToCompare, setCarsToCompare] = useState([]); // State to store cars selected for comparison
    const [showComparison, setShowComparison] = useState(false); // Controls visibility of the comparison table
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [carData, setCarData] = useState({}); // State to store fetched car data

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    // Authentication check: Redirects to login if not authenticated
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            } else {
                setAuthChecked(true);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // Fetch live car data from API
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch('https://motomartbackend.onrender.com/api/cars');
                const data = await res.json();

                const structuredData = {};
                data.forEach(car => {
                    if (!structuredData[car.brand]) {
                        structuredData[car.brand] = {};
                    }
                    structuredData[car.brand][car.model] = {
                        common_details: car.common_details,
                        variants: car.variants
                    };
                });

                setCarData(structuredData);
            } catch (err) {
                console.error("Failed to fetch Car data:", err);
            }
        };

        fetchCars();
    }, []);

    // Don't render anything until authentication state is confirmed and carData is loaded
    if (!authChecked || Object.keys(carData).length === 0) {
        return <LoadingOverlay isLoading={true} />;
    }

    // Handlers for dropdown changes: Reset selections and hide previous results/comparison
    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        setSelectedCar('');
        setSelectedVariant('');
        setCarInfo(null);
        setSubmitted(false);
        setShowComparison(false); // Hide comparison when main selections change
    };

    const handleCarChange = (e) => {
        setSelectedCar(e.target.value);
        setSelectedVariant('');
        setCarInfo(null);
        setSubmitted(false);
        setShowComparison(false); // Hide comparison when main selections change
    };

    const handleVariantChange = (e) => {
        setSelectedVariant(e.target.value);
        setCarInfo(null);
        setSubmitted(false);
        setShowComparison(false); // Hide comparison when main selections change
    };

    // Handler for submitting the car details form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedBrand || !selectedCar || !selectedVariant) {
            alert('Please select a Brand, Car, and Variant to search.');
            return;
        }

        setLoading(true);
        setSubmitted(false);
        setShowComparison(false); // Ensure comparison is hidden when submitting a new car detail search

        setTimeout(() => {
            try {
                const commonDetails = carData[selectedBrand]?.[selectedCar]?.common_details;
                const variantDetails = carData[selectedBrand]?.[selectedCar]?.variants?.[selectedVariant];

                if (commonDetails && variantDetails) {
                    setCarInfo({
                        ...commonDetails,
                        ...variantDetails,
                        selectedVariantName: selectedVariant,
                        brand: selectedBrand, // Add brand for easier access in carInfo
                        carName: selectedCar // Add car name for easier access in carInfo
                    });
                } else {
                    alert('Car or variant information not found in our database.');
                    setCarInfo(null);
                }
            } catch (error) {
                console.error("Error accessing car data:", error);
                alert('An error occurred while fetching car details. Please try again.');
                setCarInfo(null);
            } finally {
                setLoading(false);
                setSubmitted(true);
            }
        }, 1000); // Simulate network delay
    };

    // Handler for adding the currently displayed car to the comparison list
    const handleAddToCompare = () => {
        if (carInfo) {
            if (carsToCompare.length < 2) { // Allow comparison of up to 2 cars
                const isAlreadyAdded = carsToCompare.some(
                    (car) =>
                        car.brand === selectedBrand &&
                        car.carName === selectedCar &&
                        car.variantName === carInfo.selectedVariantName
                );

                if (!isAlreadyAdded) {
                    setCarsToCompare((prevCars) => [
                        ...prevCars,
                        {
                            brand: selectedBrand,
                            carName: selectedCar,
                            variantName: carInfo.selectedVariantName,
                            details: carInfo, // Store the full carInfo object for comparison
                        },
                    ]);
                    alert(`${selectedBrand} ${selectedCar} ${carInfo.selectedVariantName} has been added to the comparison list!`);
                } else {
                    alert('This specific car (variant) is already in your comparison list.');
                }
            } else {
                alert('You can compare a maximum of two cars at a time. Please clear a selection to add another.');
            }
        }
    };

    // Handler to clear all cars from the comparison list
    const handleClearComparison = () => {
        setCarsToCompare([]);
        setShowComparison(false);
        alert('Comparison list cleared successfully!');
    };

    // Handler to display the comparison table
    const handleShowComparison = () => {
        if (carsToCompare.length < 2) {
            alert('Please add at least two cars to your comparison list before comparing.');
        } else {
            setShowComparison(true);
        }
    };

    // Derived state for dropdown options
    const brands = Object.keys(carData);
    const cars = selectedBrand ? Object.keys(carData[selectedBrand]) : [];
    const variants = selectedBrand && selectedCar
        ? Object.keys(carData[selectedBrand]?.[selectedCar]?.variants || {})
        : [];

    // Define the order of features for comparison
    const comparisonFeatures = [
        // Basic Info
        { key: 'fuelType', label: 'Fuel Type', type: 'text' },
        { key: 'globalNCAPRating', label: 'Global NCAP Rating', type: 'text' },
        { key: 'groundClearance', label: 'Ground Clearance', type: 'text' },
        { key: 'pricing', label: 'Price (Ex-showroom)', type: 'text' },

        // Engine & Performance
        {
            key: 'engine_specs', label: 'Engine Specifications', type: 'custom',
            render: (details) => {
                const specs = details.engine_specs;
                if (!specs) return 'N/A';
                let output = [];
                if (specs.petrol) output.push(`Petrol: ${specs.petrol.displacement} | ${specs.petrol.maxPower} | ${specs.petrol.maxTorque}`);
                if (specs.diesel) output.push(`Diesel: ${specs.diesel.displacement} | ${specs.diesel.maxPower} | ${specs.diesel.maxTorque}`);
                if (specs.cng) output.push(`CNG: ${specs.cng.displacement} | ${specs.cng.maxPower} | ${specs.cng.maxTorque}`);
                if (specs.petrolNA) output.push(`Petrol (NA): ${specs.petrolNA.displacement} | ${specs.petrolNA.maxPower} | ${specs.petrolNA.maxTorque}`);
                if (specs.petrolTurbo) output.push(`Petrol (Turbo): ${specs.petrolTurbo.displacement} | ${specs.petrolTurbo.maxPower} | ${specs.petrolTurbo.maxTorque}`);
                return output.join('; ') || 'N/A';
            }
        },
        {
            key: 'mileage', label: 'Mileage (ARAI Certified)', type: 'custom',
            render: (details) => {
                const mileage = details.mileage;
                if (!mileage) return 'N/A';
                let output = [];
                if (mileage.petrolManual) output.push(`Petrol Manual: ${mileage.petrolManual}`);
                if (mileage.petrolAMT) output.push(`Petrol AMT: ${mileage.petrolAMT}`);
                if (mileage.cng) output.push(`CNG: ${mileage.cng}`);
                if (mileage.dieselManual) output.push(`Diesel Manual: ${mileage.dieselManual}`);
                if (mileage.petrolAutomatic) output.push(`Petrol Automatic: ${mileage.petrolAutomatic}`);
                if (mileage.petrolTurboiMT) output.push(`Petrol Turbo iMT: ${mileage.petrolTurboiMT}`);
                if (mileage.petrolTurboDCT) output.push(`Petrol Turbo DCT: ${mileage.petrolTurboDCT}`);
                if (mileage.petrolCVT) output.push(`Petrol CVT: ${mileage.petrolCVT}`);
                if (mileage.dieselAutomatic) output.push(`Diesel Automatic: ${mileage.dieselAutomatic}`);
                return output.join('; ') || 'N/A';
            }
        },
        { key: 'transmission', label: 'Transmission Options', type: 'array' },
        { key: 'seating_capacity', label: 'Seating Capacity', type: 'array' },
        { key: 'safety', label: 'Key Safety Features', type: 'array' },
        { key: 'infotainment', label: 'Infotainment & Connectivity', type: 'array' },
        { key: 'interior', label: 'Interior & Comfort Features', type: 'array' },
        { key: 'exterior.designFeatures', label: 'Key Design Features', type: 'array', path: ['exterior', 'designFeatures'] }, // Nested array
        { key: 'exterior.colorOptions', label: 'Color Options', type: 'array', path: ['exterior', 'colorOptions'] }, // Nested array
    ];

    const getNestedValue = (obj, path) => {
        return path.reduce((acc, part) => acc && acc[part], obj);
    };

    return (
        <div className="getinfo-container advanced-ui" data-theme={document.documentElement.getAttribute('data-theme')}>
            <LoadingOverlay isLoading={isLoading} />
            <h2 className="getinfo-title">Explore Your Car</h2>
            <form onSubmit={handleSubmit} className="getinfo-form">
                <div className="getinfo-field">
                    <label htmlFor="brand">Brand:</label>
                    <select
                        id="brand"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                    >
                        <option value="">Select Brand</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <div className="getinfo-field">
                    <label htmlFor="car">Car Model:</label>
                    <select
                        id="car"
                        value={selectedCar}
                        onChange={handleCarChange}
                        disabled={!selectedBrand}
                    >
                        <option value="">Select Car Model</option>
                        {cars.map((car) => (
                            <option key={car} value={car}>{car}</option>
                        ))}
                    </select>
                </div>

                <div className="getinfo-field">
                    <label htmlFor="variant">Variant:</label>
                    <select
                        id="variant"
                        value={selectedVariant}
                        onChange={handleVariantChange}
                        disabled={!selectedCar}
                    >
                        <option value="">Select Variant</option>
                        {variants.map((variant) => (
                            <option key={variant} value={variant}>{variant}</option>
                        ))}
                    </select>
                </div>

                <button
                    className="getinfo-btn gradient-shadow"
                    type="submit"
                    disabled={!selectedBrand || !selectedCar || !selectedVariant || loading}
                >
                    {loading ? 'Searching...' : '🔍 Search Details'}
                </button>
            </form>

            {/* Display detailed information for the selected car */}
            {submitted && carInfo && (
                <div className="getinfo-result fade-in">
                    <h4 className="getinfo-subheading">Specifications for {selectedCar} - {carInfo.selectedVariantName}</h4>

                    {carInfo.image && (
                        <img src={carInfo.image} alt={selectedCar} className="getinfo-image" />
                    )}

                    <div className="getinfo-grid">
                        <p><strong>Brand:</strong> {selectedBrand}</p>
                        <p><strong>Car:</strong> {selectedCar}</p>
                        <p><strong>Variant:</strong> {carInfo.selectedVariantName}</p>
                        {carInfo.engine && <p><strong>Engine:</strong> {carInfo.engine}</p>}
                        {carInfo.fuelType && <p><strong>Fuel Type:</strong> {carInfo.fuelType}</p>}
                        {carInfo.globalNCAPRating && <p><strong>Global NCAP Rating:</strong> {carInfo.globalNCAPRating}</p>}
                        {carInfo.groundClearance && <p><strong>Ground Clearance:</strong> {carInfo.groundClearance}</p>}
                        {carInfo.pricing_location && <p><strong>Pricing Location:</strong> {carInfo.pricing_location}</p>}
                    </div>

                    {/* Variant-specific details sections */}
                    {carInfo.engine_specs && (
                        <div className="getinfo-section">
                            <h5>Engine Specifications</h5>
                            {carInfo.engine_specs.petrol && (
                                <p><strong>Petrol:</strong> {carInfo.engine_specs.petrol.displacement} | {carInfo.engine_specs.petrol.maxPower} | {carInfo.engine_specs.petrol.maxTorque}</p>
                            )}
                            {carInfo.engine_specs.diesel && (
                                <p><strong>Diesel:</strong> {carInfo.engine_specs.diesel.displacement} | {carInfo.engine_specs.diesel.maxPower} | {carInfo.engine_specs.diesel.maxTorque}</p>
                            )}
                            {carInfo.engine_specs.cng && (
                                <p><strong>CNG:</strong> {carInfo.engine_specs.cng.displacement} | {carInfo.engine_specs.cng.maxPower} | {carInfo.engine_specs.cng.maxTorque}</p>
                            )}
                            {carInfo.engine_specs.petrolNA && (
                                <p><strong>Petrol (NA):</strong> {carInfo.engine_specs.petrolNA.displacement} | {carInfo.engine_specs.petrolNA.maxPower} | {carInfo.engine_specs.petrolNA.maxTorque}</p>
                            )}
                            {carInfo.engine_specs.petrolTurbo && (
                                <p><strong>Petrol (Turbo):</strong> {carInfo.engine_specs.petrolTurbo.displacement} | {carInfo.engine_specs.petrolTurbo.maxPower} | {carInfo.engine_specs.petrolTurbo.maxTorque}</p>
                            )}
                        </div>
                    )}

                    {carInfo.mileage && (
                        <div className="getinfo-section">
                            <h5>Mileage (ARAI Certified)</h5>
                            <ul>
                                {carInfo.mileage.petrolManual && <li><strong>Petrol Manual:</strong> {carInfo.mileage.petrolManual}</li>}
                                {carInfo.mileage.petrolAMT && <li><strong>Petrol AMT:</strong> {carInfo.mileage.petrolAMT}</li>}
                                {carInfo.mileage.cng && <li><strong>CNG:</strong> {carInfo.mileage.cng}</li>}
                                {carInfo.mileage.dieselManual && <li><strong>Diesel Manual:</strong> {carInfo.mileage.dieselManual}</li>}
                                {carInfo.mileage.petrolAutomatic && <li><strong>Petrol Automatic:</strong> {carInfo.mileage.petrolAutomatic}</li>}
                                {carInfo.mileage.petrolTurboiMT && <li><strong>Petrol Turbo iMT:</strong> {carInfo.mileage.petrolTurboiMT}</li>}
                                {carInfo.mileage.petrolTurboDCT && <li><strong>Petrol Turbo DCT:</strong> {carInfo.mileage.petrolTurboDCT}</li>}
                                {carInfo.mileage.petrolCVT && <li><strong>Petrol CVT:</strong> {carInfo.mileage.petrolCVT}</li>}
                                {carInfo.mileage.dieselAutomatic && <li><strong>Diesel Automatic:</strong> {carInfo.mileage.dieselAutomatic}</li>}
                            </ul>
                        </div>
                    )}

                    {carInfo.transmission && carInfo.transmission.length > 0 && (
                        <div className="getinfo-section">
                            <h5>Transmission Options</h5>
                            <ul>{carInfo.transmission.map((item, index) => <li key={index}>{item}</li>)}</ul>
                        </div>
                    )}

                    {carInfo.seating_capacity && carInfo.seating_capacity.length > 0 && (
                        <div className="getinfo-section">
                            <h5>Seating Capacity</h5>
                            <ul>{carInfo.seating_capacity.map((item, index) => <li key={index}>{item}</li>)}</ul>
                        </div>
                    )}

                    {carInfo.safety && carInfo.safety.length > 0 && (
                        <div className="getinfo-section">
                            <h5>Key Safety Features</h5>
                            <ul>{carInfo.safety.map((item, index) => <li key={index}>{item}</li>)}</ul>
                        </div>
                    )}

                    {carInfo.infotainment && carInfo.infotainment.length > 0 && (
                        <div className="getinfo-section">
                            <h5>Infotainment & Connectivity</h5>
                            <ul>{carInfo.infotainment.map((item, index) => <li key={index}>{item}</li>)}</ul>
                        </div>
                    )}

                    {carInfo.interior && carInfo.interior.length > 0 && (
                        <div className="getinfo-section">
                            <h5>Interior & Comfort Features</h5>
                            <ul>{carInfo.interior.map((item, index) => <li key={index}>{item}</li>)}</ul>
                        </div>
                    )}

                    {carInfo.exterior && (
                        <>
                            {carInfo.exterior.designFeatures && carInfo.exterior.designFeatures.length > 0 && (
                                <div className="getinfo-section">
                                    <h5>Exterior Design Elements</h5>
                                    <ul>{carInfo.exterior.designFeatures.map((item, index) => <li key={index}>{item}</li>)}</ul>
                                </div>
                            )}
                            {carInfo.exterior.colorOptions && carInfo.exterior.colorOptions.length > 0 && (
                                <div className="getinfo-section">
                                    <h5>Available Color Options</h5>
                                    <ul>{carInfo.exterior.colorOptions.map((color, index) => <li key={index}>{color}</li>)}</ul>
                                </div>
                            )}
                        </>
                    )}

                    {carInfo.pricing && (
                        <div className="getinfo-section">
                            <h5>Pricing (Ex-showroom)</h5>
                            <p><strong>Price:</strong> {carInfo.pricing}</p>
                        </div>
                    )}
                    {/* Button to add the currently viewed car to the comparison list */}
                    <button
                        className="getinfo-btn add-to-compare-btn"
                        onClick={handleAddToCompare}
                        disabled={carsToCompare.length >= 2} // Disable if 2 cars are already selected
                    >
                        Add to Compare ({carsToCompare.length}/2)
                    </button>
                </div>
            )}

            {/* Section to display cars currently selected for comparison */}
            {carsToCompare.length > 0 && (
                <div className="comparison-list-summary fade-in">
                    <h4>Currently Selected for Comparison:</h4>
                    <ul>
                        {carsToCompare.map((car, index) => (
                            <li key={index}>
                                <b>{car.brand} {car.carName}</b> - {car.variantName}
                            </li>
                        ))}
                    </ul>
                    <button
                        className="getinfo-btn"
                        onClick={handleShowComparison}
                        disabled={carsToCompare.length < 2} // Enable only when 2 cars are selected
                    >
                        Compare Selected Cars
                    </button>
                    <button
                        className="getinfo-btn clear-btn"
                        onClick={handleClearComparison}
                    >
                        Clear Comparison List
                    </button>
                </div>
            )}

            {/* The main comparison table, visible only when `showComparison` is true and 2 cars are selected */}
            {showComparison && carsToCompare.length === 2 && (
                <div className="car-comparison-container fade-in">
                    <h3 className="comparison-title">Side-by-Side Car Comparison</h3>
                    <div className="comparison-table">
                        {/* Table Header */}
                        <div className="comparison-row comparison-header">
                            <div className="comparison-cell">Feature</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].brand} {carsToCompare[0].carName} ({carsToCompare[0].variantName})
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].brand} {carsToCompare[1].carName} ({carsToCompare[1].variantName})
                            </div>
                        </div>
                        {/* Images */}
                        <div className="comparison-row">
                            <div className="comparison-cell">Image</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.image && (
                                    <img src={carsToCompare[0].details.image} alt={`${carsToCompare[0].carName}`} className="compare-image" />
                                )}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.image && (
                                    <img src={carsToCompare[1].details.image} alt={`${carsToCompare[1].carName}`} className="compare-image" />
                                )}
                            </div>
                        </div>
                        {/* Basic Details (Brand, Car Model, Variant) are already in header */}
                        <div className="comparison-row">
                            <div className="comparison-cell">Brand</div>
                            <div className="comparison-cell">{carsToCompare[0].brand}</div>
                            <div className="comparison-cell">{carsToCompare[1].brand}</div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Car Model</div>
                            <div className="comparison-cell">{carsToCompare[0].carName}</div>
                            <div className="comparison-cell">{carsToCompare[1].carName}</div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Variant</div>
                            <div className="comparison-cell">{carsToCompare[0].variantName}</div>
                            <div className="comparison-cell">{carsToCompare[1].variantName}</div>
                        </div>

                        {/* Dynamically rendered comparison features */}
                        {comparisonFeatures.map((feature) => (
                            <div className="comparison-row" key={feature.key}>
                                <div className="comparison-cell">{feature.label}</div>
                                <div className="comparison-cell">
                                    {feature.type === 'array'
                                        ? (getNestedValue(carsToCompare[0].details, feature.path || [feature.key])?.join(', ') || 'N/A')
                                        : feature.type === 'custom'
                                            ? feature.render(carsToCompare[0].details)
                                            : (getNestedValue(carsToCompare[0].details, feature.path || [feature.key]) || 'N/A')}
                                </div>
                                <div className="comparison-cell">
                                    {feature.type === 'array'
                                        ? (getNestedValue(carsToCompare[1].details, feature.path || [feature.key])?.join(', ') || 'N/A')
                                        : feature.type === 'custom'
                                            ? feature.render(carsToCompare[1].details)
                                            : (getNestedValue(carsToCompare[1].details, feature.path || [feature.key]) || 'N/A')}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="getinfo-btn clear-btn"
                        onClick={handleClearComparison}
                    >
                        Clear Comparison
                    </button>
                </div>
            )}
        </div>
    );
};

export default CarDetails;