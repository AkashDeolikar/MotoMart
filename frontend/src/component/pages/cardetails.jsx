import React, { useState, useEffect } from 'react';
import carData from '../data/cars.json';
import './cardetails.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Adjust the path if needed
import { onAuthStateChanged } from 'firebase/auth';

const CarDetails = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [carInfo, setCarInfo] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is signed in with Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login'); // Redirect to login if not authenticated
      } else {
        setAuthChecked(true); // Allow render if authenticated
      }
    });
    return () => unsubscribe(); // Cleanup
  }, [navigate]);
  if (!authChecked) return null; // Prevent UI render while checking auth
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBrand || !selectedCar || !selectedModel) {
      alert('Please select all fields');
      return;
    }

    setLoading(true);
    setSubmitted(false);

    setTimeout(() => {
      setCarInfo(carData[selectedBrand][selectedCar]);
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };


  const brands = Object.keys(carData);
  const cars = selectedBrand ? Object.keys(carData[selectedBrand]) : [];
  const models = selectedBrand && selectedCar ? carData[selectedBrand][selectedCar].models : [];

  return (
    <div className="car-search-container">
      <h2>Find Your Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Brand:
          <select
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setSelectedCar('');
              setSelectedModel('');
              setCarInfo(null);
              setSubmitted(false);
            }}
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        <label>
          Car:
          <select
            value={selectedCar}
            onChange={(e) => {
              setSelectedCar(e.target.value);
              setSelectedModel('');
              setCarInfo(null);
              setSubmitted(false);
            }}
            disabled={!selectedBrand}
          >
            <option value="">Select Car</option>
            {cars.map((car) => (
              <option key={car} value={car}>
                {car}
              </option>
            ))}
          </select>
        </label>

        <label>
          Model:
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={!selectedCar}
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={!selectedBrand || !selectedModel || loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {submitted && carInfo && selectedModel && (
        <div className="result">
          <h4>Details:</h4><br />
          <img
            src={carInfo.image}
            alt={selectedCar}
            style={{ width: '250px', marginTop: '10px', borderRadius: '10px' }}
          />
          <p><strong>Brand:</strong> {selectedBrand}</p>
          <p><strong>Car:</strong> {selectedCar}</p>
          <p><strong>Model:</strong> {selectedModel}</p>
          <p><strong>Engine:</strong> {carInfo.engine}</p>
          <p><strong>Engine Option:</strong> {carInfo["engine-Option"]}</p>
          <p><strong>Fuel Type:</strong> {carInfo.fuelType}</p>

          <div>
            <h5 className="heading"><strong>Transmission:</strong></h5>
            <ul>
              {carInfo.transmission.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="heading"><strong>Performance:</strong></h5>
            <p><strong>Petrol:</strong> {carInfo.performance.petrol.power}, {carInfo.performance.petrol.torque}</p>
            <p><strong>CNG:</strong> {carInfo.performance.cng.power}, {carInfo.performance.cng.torque}</p>
            <p><strong>Diesel:</strong> {carInfo.performance.diesel.power}, {carInfo.performance.diesel.torque}</p>
          </div>

          <div>
            <h5 className="heading"><strong>Mileage:</strong></h5>
            <ul>
              <li><strong>Petrol Manual:</strong> {carInfo.mileage.petrolManual}</li>
              <li><strong>Petrol AMT:</strong> {carInfo.mileage.petrolAMT}</li>
              <li><strong>CNG:</strong> {carInfo.mileage.cng}</li>
              <li><strong>Diesel Manual:</strong> {carInfo.mileage.dieselManual}</li>
            </ul>
          </div>

          <div>
            <h5 className="heading"><strong>Safety Features:</strong></h5>
            <ul>
              {carInfo.safety.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="heading"><strong>Infotainment & Connectivity:</strong></h5>
            <ul>
              {carInfo.infotainment.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="heading"><strong>Interior & Comfort:</strong></h5>
            <ul>
              {carInfo.interior.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="heading"><strong>Exterior Design:</strong></h5>
            <ul>
              {carInfo.exterior.designFeatures.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="heading"><strong>Color Options:</strong></h5>
            <ul>
              {carInfo.exterior.colorOptions.map((color, index) => (
                <li key={index}>{color}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="heading"><strong>Pricing:</strong></h5>
            <p><strong>Base Model:</strong> {carInfo.pricing.baseModel}</p>
            <p><strong>Top Model:</strong> {carInfo.pricing.topModel}</p>
            <p><strong>Location:</strong> {carInfo.pricing.location}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
