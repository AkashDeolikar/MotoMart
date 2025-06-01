import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './cardetail.css';

const CarDetail = ({ bikeData, carData }) => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  if (!bikeData || !carData) {
    console.warn("bikeData or carData is undefined in CarDetail.");
    return (
      <div className="card-detail-container">
        <button onClick={() => navigate('/SeeOffer')} className="back-button">
          ← Back to Offers
        </button>
        <p>Loading vehicle data or data not available...</p>
      </div>
    );
  }

  // Flatten all vehicles
  const allVehicles = [
    ...(bikeData ? bikeData.flatMap(group => group.vehicles) : []),
    ...(carData ? carData.flatMap(group => group.vehicles) : [])
  ];

//   const allVehicles = [
//   ...(Array.isArray(bikeData) ? bikeData.flatMap(group => group.vehicles) : []),
//   ...(Array.isArray(carData) ? carData.flatMap(group => group.vehicles) : [])
// ];


  const vehicle = allVehicles.find(v => v.id === vehicleId);

  if (!vehicle) {
    return (
      <div className="card-detail-container">
        <p>Vehicle not found.</p>
      </div>
    );
  }

  // Determine if the vehicle is from bikeData or carData
  const isBike = bikeData.some(group =>
    group.vehicles.some(v => v.id === vehicleId)
  );
  const isCar = carData.some(group =>
    group.vehicles.some(v => v.id === vehicleId)
  );

  // Determine the back button path and label dynamically
  const backPath = isBike ? '/Bikecard' : isCar ? '/Carcard' : '/SeeOffer';
  const backLabel = isBike ? '← Back to Bikes' : isCar ? '← Back to Cars' : '← Back to Offers';

  // Determine if it's a YouTube embed or direct video
  const isYouTube = vehicle.videoSrc && vehicle.videoSrc.includes('youtube.com/embed');

  return (
    <div className="card-detail-container">
      {/* Single dynamic back button */}
      <button onClick={() => navigate(backPath)} className="back-button">
        {backLabel}
      </button>

      <h1 className="vehicle-title">{vehicle.title}</h1>

      <div className="media-section">
        {isYouTube ? (
          <iframe
            className="video-embed"
            src={vehicle.videoSrc}
            title={`${vehicle.title} video`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img src={vehicle.videoPoster} alt={vehicle.title} className="video-poster" />
        )}
      </div>

      <div className="details-content">
        <p className="vehicle-description">{vehicle.description}</p>

        <h2 className="spec-heading">Vehicle Specifications</h2>
        <ul className="spec-list">
          <li><strong>Model:</strong> {vehicle.vehicleInfo.model}</li>
          <li><strong>Manufacturer:</strong> {vehicle.vehicleInfo.manufacturer}</li>
          <li><strong>Year:</strong> {vehicle.vehicleInfo.year}</li>
          <li><strong>Price:</strong> {vehicle.vehicleInfo.price}</li>
          <li>
            <strong>Features:</strong>
            <ul>
              {vehicle.vehicleInfo.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </li>
        </ul>

        {vehicle.link && vehicle.link.startsWith('http') && (
          <a
            href={vehicle.link}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link-button"
          >
            Visit Official Page
          </a>
        )}
      </div>
    </div>
  );
};

export default CarDetail;
