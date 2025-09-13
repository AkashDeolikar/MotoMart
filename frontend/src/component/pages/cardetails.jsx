import React, { useState, useEffect } from 'react';
import './cardetails.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

/* Loading Overlay */
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

/* Snackbar */
const Snackbar = ({ message, type, onClose }) => {
  if (!message) return null;
  return (
    <div className={`snackbar ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="snackbar-close">✖</button>
    </div>
  );
};

/* Confirmation Modal */
const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn modal-cancel-btn">Cancel</button>
          <button onClick={onConfirm} className="btn modal-delete-btn">Confirm</button>
        </div>
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
  const [carsToCompare, setCarsToCompare] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [carData, setCarData] = useState({});
  const [showClearModal, setShowClearModal] = useState(false);

  // Snackbar
  const [snackbar, setSnackbar] = useState({ message: "", type: "" });
  const showSnackbar = (msg, type = "info") => {
    setSnackbar({ message: msg, type });
    setTimeout(() => setSnackbar({ message: "", type: "" }), 4000);
  };

  const navigate = useNavigate();

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

  if (!authChecked || Object.keys(carData).length === 0) {
    return <LoadingOverlay isLoading={true} />;
  }

  /* Handlers */
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedCar('');
    setSelectedVariant('');
    setCarInfo(null);
    setSubmitted(false);
    setShowComparison(false);
  };

  const handleCarChange = (e) => {
    setSelectedCar(e.target.value);
    setSelectedVariant('');
    setCarInfo(null);
    setSubmitted(false);
    setShowComparison(false);
  };

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
    setCarInfo(null);
    setSubmitted(false);
    setShowComparison(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBrand || !selectedCar || !selectedVariant) {
      showSnackbar('Please select a Brand, Car, and Variant to search.', "error");
      return;
    }

    setLoading(true);
    setSubmitted(false);
    setShowComparison(false);

    setTimeout(() => {
      try {
        const commonDetails = carData[selectedBrand]?.[selectedCar]?.common_details;
        const variantDetails = carData[selectedBrand]?.[selectedCar]?.variants?.[selectedVariant];

        if (commonDetails && variantDetails) {
          setCarInfo({
            ...commonDetails,
            ...variantDetails,
            selectedVariantName: selectedVariant,
            brand: selectedBrand,
            carName: selectedCar
          });
        } else {
          showSnackbar('Car or variant information not found in our database.', "error");
          setCarInfo(null);
        }
      } catch (error) {
        console.error("Error accessing car data:", error);
        showSnackbar('An error occurred while fetching car details.', "error");
        setCarInfo(null);
      } finally {
        setLoading(false);
        setSubmitted(true);
      }
    }, 1000);
  };

  const handleAddToCompare = () => {
    if (carInfo) {
      if (carsToCompare.length < 2) {
        const isAlreadyAdded = carsToCompare.some(
          (car) =>
            car.brand === selectedBrand &&
            car.carName === selectedCar &&
            car.variantName === carInfo.selectedVariantName
        );
        if (!isAlreadyAdded) {
          setCarsToCompare((prev) => [
            ...prev,
            {
              brand: selectedBrand,
              carName: selectedCar,
              variantName: carInfo.selectedVariantName,
              details: carInfo,
            },
          ]);
          showSnackbar(`${selectedBrand} ${selectedCar} ${carInfo.selectedVariantName} added!`, "success");
        } else {
          showSnackbar('This car variant is already in your comparison list.', "info");
        }
      } else {
        showSnackbar('Max 2 cars can be compared. Please clear first.', "error");
      }
    }
  };

  const handleClearComparison = () => setShowClearModal(true);

  const confirmClearComparison = () => {
    setCarsToCompare([]);
    setShowComparison(false);
    setShowClearModal(false);
    showSnackbar("Comparison list cleared!", "success");
  };

  const handleShowComparison = () => {
    if (carsToCompare.length < 2) {
      showSnackbar('Please add at least two cars before comparing.', "error");
    } else {
      setShowComparison(true);
    }
  };

  const brands = Object.keys(carData);
  const cars = selectedBrand ? Object.keys(carData[selectedBrand]) : [];
  const variants = selectedBrand && selectedCar
    ? Object.keys(carData[selectedBrand]?.[selectedCar]?.variants || {})
    : [];

  const getNestedValue = (obj, path) => {
    return path.reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div className="getinfo-container advanced-ui">
      <LoadingOverlay isLoading={isLoading} />
      <h2 className="getinfo-title">Explore Your Car</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="getinfo-form">
        {/* Dropdowns */}
        <div className="getinfo-field">
          <label>Brand:</label>
          <select value={selectedBrand} onChange={handleBrandChange}>
            <option value="">Select Brand</option>
            {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
          </select>
        </div>
        <div className="getinfo-field">
          <label>Car Model:</label>
          <select value={selectedCar} onChange={handleCarChange} disabled={!selectedBrand}>
            <option value="">Select Car Model</option>
            {cars.map((car) => <option key={car} value={car}>{car}</option>)}
          </select>
        </div>
        <div className="getinfo-field">
          <label>Variant:</label>
          <select value={selectedVariant} onChange={handleVariantChange} disabled={!selectedCar}>
            <option value="">Select Variant</option>
            {variants.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <button className="getinfo-btn gradient-shadow" type="submit" disabled={!selectedBrand || !selectedCar || !selectedVariant || loading}>
          {loading ? 'Searching...' : '🔍 Search Details'}
        </button>
      </form>

      {/* Car Info */}
      {submitted && carInfo && (
        <div className="getinfo-result fade-in">
          <h4>Specifications for {selectedCar} - {carInfo.selectedVariantName}</h4>
          {carInfo.image && <img src={carInfo.image} alt={selectedCar} className="getinfo-image" />}
          <p><strong>Brand:</strong> {selectedBrand}</p>
          <p><strong>Fuel Type:</strong> {carInfo.fuelType}</p>
          <p><strong>Price:</strong> {carInfo.pricing}</p>
          <button className="getinfo-btn add-to-compare-btn" onClick={handleAddToCompare} disabled={carsToCompare.length >= 2}>
            Add to Compare ({carsToCompare.length}/2)
          </button>
        </div>
      )}

      {/* Comparison List */}
      {carsToCompare.length > 0 && (
        <div className="comparison-list-summary fade-in">
          <h4>Currently Selected:</h4>
          <ul>
            {carsToCompare.map((car, idx) => (
              <li key={idx}><b>{car.brand} {car.carName}</b> - {car.variantName}</li>
            ))}
          </ul>
          <button className="getinfo-btn" onClick={handleShowComparison} disabled={carsToCompare.length < 2}>Compare Selected Cars</button>
          <button className="getinfo-btn clear-btn" onClick={handleClearComparison}>Clear Comparison</button>
        </div>
      )}

      {/* Clear Confirmation */}
      <ConfirmModal
        show={showClearModal}
        title="Clear Comparison?"
        message="Are you sure you want to clear all selected cars?"
        onConfirm={confirmClearComparison}
        onCancel={() => setShowClearModal(false)}
      />

      {/* Snackbar */}
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ message: "", type: "" })}
      />
    </div>
  );
};

export default CarDetails;
