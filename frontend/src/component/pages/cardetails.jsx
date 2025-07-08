import React, { useState, useEffect } from 'react';
import carData from '../data/cars.json'; // Make sure this path is correct
import './cardetails.css'; // Your CSS file
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

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

    // Don't render anything until authentication state is confirmed
    if (!authChecked) {
        return null;
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
                        selectedVariantName: selectedVariant
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

    return (
        <div className="getinfo-container advanced-ui" data-theme={document.documentElement.getAttribute('data-theme')}>
            <h2 className="getinfo-title">Explore Your Dream Car</h2>
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
                                **{car.brand} {car.carName}** - {car.variantName}
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

                        {/* Basic Details */}
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
                        <div className="comparison-row">
                            <div className="comparison-cell">Fuel Type</div>
                            <div className="comparison-cell">{carsToCompare[0].details.fuelType || 'N/A'}</div>
                            <div className="comparison-cell">{carsToCompare[1].details.fuelType || 'N/A'}</div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Global NCAP Rating</div>
                            <div className="comparison-cell">{carsToCompare[0].details.globalNCAPRating || 'N/A'}</div>
                            <div className="comparison-cell">{carsToCompare[1].details.globalNCAPRating || 'N/A'}</div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Pricing Location</div>
                            <div className="comparison-cell">{carsToCompare[0].details.pricing_location || 'N/A'}</div>
                            <div className="comparison-cell">{carsToCompare[1].details.pricing_location || 'N/A'}</div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Price (Ex-showroom)</div>
                            <div className="comparison-cell">{carsToCompare[0].details.pricing || 'N/A'}</div>
                            <div className="comparison-cell">{carsToCompare[1].details.pricing || 'N/A'}</div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Ground Clearance</div>
                            <div className="comparison-cell">{carsToCompare[0].details.groundClearance || 'N/A'}</div>
                            <div className="comparison-cell">{carsToCompare[1].details.groundClearance || 'N/A'}</div>
                        </div>

                        {/* Engine Specifications Section */}
                        <div className="comparison-row section-header">
                            <div className="comparison-cell">Engine Specifications</div>
                            <div className="comparison-cell"></div>
                            <div className="comparison-cell"></div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Petrol Engine (Displacement)</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.engine_specs?.petrol?.displacement || carsToCompare[0].details.engine_specs?.petrolNA?.displacement || carsToCompare[0].details.engine_specs?.petrolTurbo?.displacement || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.engine_specs?.petrol?.displacement || carsToCompare[1].details.engine_specs?.petrolNA?.displacement || carsToCompare[1].details.engine_specs?.petrolTurbo?.displacement || 'N/A'}
                            </div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Petrol Engine (Max Power)</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.engine_specs?.petrol?.maxPower || carsToCompare[0].details.engine_specs?.petrolNA?.maxPower || carsToCompare[0].details.engine_specs?.petrolTurbo?.maxPower || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.engine_specs?.petrol?.maxPower || carsToCompare[1].details.engine_specs?.petrolNA?.maxPower || carsToCompare[1].details.engine_specs?.petrolTurbo?.maxPower || 'N/A'}
                            </div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Diesel Engine (Displacement)</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.engine_specs?.diesel?.displacement || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.engine_specs?.diesel?.displacement || 'N/A'}
                            </div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Diesel Engine (Max Power)</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.engine_specs?.diesel?.maxPower || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.engine_specs?.diesel?.maxPower || 'N/A'}
                            </div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">CNG Engine (Displacement)</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.engine_specs?.cng?.displacement || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.engine_specs?.cng?.displacement || 'N/A'}
                            </div>
                        </div>

                        {/* Mileage Section */}
                        <div className="comparison-row section-header">
                            <div className="comparison-cell">Mileage (ARAI)</div>
                            <div className="comparison-cell"></div>
                            <div className="comparison-cell"></div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Petrol Manual</div>
                            <div className="comparison-cell">{carsToCompare[0].details.mileage?.petrolManual || 'N/A'}</div>
                            <div className="comparison-cell">{carsToCompare[1].details.mileage?.petrolManual || 'N/A'}</div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Petrol Automatic</div>
                            <div className="comparison-cell">{carsToCompare[0].details.mileage?.petrolAutomatic || 'N/A'}</div>
                            <div className="comparison-cell">{carsToCompare[1].details.mileage?.petrolAutomatic || 'N/A'}</div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Diesel Manual</div>
                            <div className="comparison-cell">{carsToCompare[0].details.mileage?.dieselManual || 'N/A'}</div>
                            <div className="comparison-cell">{carsToCompare[1].details.mileage?.dieselManual || 'N/A'}</div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Diesel Automatic</div>
                            <div className="comparison-cell">{carsToCompare[0].details.mileage?.dieselAutomatic || 'N/A'}</div>
                            <div className="comparison-cell">{carsToCompare[1].details.mileage?.dieselAutomatic || 'N/A'}</div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">CNG</div>
                            <div className="comparison-cell">{carsToCompare[0].details.mileage?.cng || 'N/A'}</div>
                            <div className="comparison-cell">{carsToCompare[1].details.mileage?.cng || 'N/A'}</div>
                        </div>

                        {/* Transmission Section */}
                        <div className="comparison-row section-header">
                            <div className="comparison-cell">Transmission</div>
                            <div className="comparison-cell"></div>
                            <div className="comparison-cell"></div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Available Types</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.transmission?.join(', ') || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.transmission?.join(', ') || 'N/A'}
                            </div>
                        </div>

                        {/* Seating Capacity Section */}
                        <div className="comparison-row section-header">
                            <div className="comparison-cell">Seating Capacity</div>
                            <div className="comparison-cell"></div>
                            <div className="comparison-cell"></div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Capacity</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.seating_capacity?.join(', ') || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.seating_capacity?.join(', ') || 'N/A'}
                            </div>
                        </div>

                        {/* Safety Features Section */}
                        <div className="comparison-row section-header">
                            <div className="comparison-cell">Safety Features</div>
                            <div className="comparison-cell"></div>
                            <div className="comparison-cell"></div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Key Safety Features</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.safety?.join(', ') || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.safety?.join(', ') || 'N/A'}
                            </div>
                        </div>

                        {/* Infotainment & Connectivity Section */}
                        <div className="comparison-row section-header">
                            <div className="comparison-cell">Infotainment & Connectivity</div>
                            <div className="comparison-cell"></div>
                            <div className="comparison-cell"></div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Key Features</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.infotainment?.join(', ') || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.infotainment?.join(', ') || 'N/A'}
                            </div>
                        </div>

                        {/* Interior & Comfort Section */}
                        <div className="comparison-row section-header">
                            <div className="comparison-cell">Interior & Comfort</div>
                            <div className="comparison-cell"></div>
                            <div className="comparison-cell"></div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Key Features</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.interior?.join(', ') || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.interior?.join(', ') || 'N/A'}
                            </div>
                        </div>

                        {/* Exterior Design Section */}
                        <div className="comparison-row section-header">
                            <div className="comparison-cell">Exterior Design</div>
                            <div className="comparison-cell"></div>
                            <div className="comparison-cell"></div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Key Design Features</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.exterior?.designFeatures?.join(', ') || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.exterior?.designFeatures?.join(', ') || 'N/A'}
                            </div>
                        </div>
                        <div className="comparison-row">
                            <div className="comparison-cell">Color Options</div>
                            <div className="comparison-cell">
                                {carsToCompare[0].details.exterior?.colorOptions?.join(', ') || 'N/A'}
                            </div>
                            <div className="comparison-cell">
                                {carsToCompare[1].details.exterior?.colorOptions?.join(', ') || 'N/A'}
                            </div>
                        </div>
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