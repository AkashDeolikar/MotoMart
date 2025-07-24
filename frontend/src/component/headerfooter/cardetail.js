import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './cardetail.css'; // Ensure the enhanced CSS is imported

// Helper function to extract YouTube embed URL from various formats
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  // Already an embed URL
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  // Watch URL
  const watchMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&mute=1`; // Added autoplay and mute for better UX on initial load
  }

  return null;
};

const CarDetail = ({ bikeData, carData }) => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  // State to manage expanded sections, 'engineAndTransmission' is expanded by default for cars/bikes
  const [expandedSections, setExpandedSections] = useState(['engineAndTransmission', 'dimensionsAndWeight']);
  const [loading, setLoading] = useState(true); // Loading state

  const allVehicles = useMemo(() => {
    // Ensure data is always an array to prevent errors
    const bikes = Array.isArray(bikeData) ? bikeData.flatMap(group => group.vehicles || []) : [];
    const cars = Array.isArray(carData) ? carData.flatMap(group => group.vehicles || []) : [];
    return [...bikes, ...cars];
  }, [bikeData, carData]);

  const vehicle = useMemo(() => {
    return allVehicles.find(v => v.id === vehicleId);
  }, [allVehicles, vehicleId]);

  useEffect(() => {
    // Simulate loading, or set to false once data is confirmed available
    if (bikeData || carData) {
      setLoading(false);
    }
    // Scroll to top on component mount/vehicle change
    window.scrollTo(0, 0);
  }, [bikeData, carData, vehicleId]);

  // Handle loading state
  if (loading) {
    return (
      <div className="card-detail-container">
        <p className="loading-message">Loading vehicle details...</p>
      </div>
    );
  }

  // Handle vehicle not found
  if (!vehicle) {
    return (
      <div className="card-detail-container">
        <button onClick={() => navigate('/SeeOffer')} className="back-button">
          <i className="bi bi-arrow-left-circle" aria-hidden="true" /> Back to Offers
        </button>
        <p className="not-found-message">Vehicle not found. Please check the ID or try again.</p>
      </div>
    );
  }

  // Determine the back path based on whether it's a bike or car
  const isBike = Array.isArray(bikeData) && bikeData.some(group => group.vehicles?.some(v => v.id === vehicleId));
  const backPath = isBike ? '/Bikecard' : '/Carcard';
  const backText = isBike ? 'Back to Bikes' : 'Back to Cars';

  // Helper to format spec section headings
  const formatHeading = (text) => {
    // Capitalize first letter and add space before new capital letters
    return text
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  // Toggle function for spec sections
  const toggleSection = (key) => {
    setExpandedSections((prev) =>
      prev.includes(key) ? prev.filter(sec => sec !== key) : [...prev, key]
    );
  };

  // Sections to be explicitly ignored from the togglable list (as they are shown at the top)
  const ignoredSections = ['model', 'manufacturer', 'year', 'price', 'features', 'description'];

  // Extract key features for "At a Glance" section (can be customized)
  const getKeyFeatures = (vehicleInfo) => {
    const features = [];
    if (vehicleInfo.engineAndTransmission?.engineType) {
      features.push(`Engine: ${vehicleInfo.engineAndTransmission.engineType}`);
    }
    if (vehicleInfo.engineAndTransmission?.displacement) {
      features.push(`Displacement: ${vehicleInfo.engineAndTransmission.displacement}`);
    }
    if (vehicleInfo.performance?.maxPower) {
      features.push(`Max Power: ${vehicleInfo.performance.maxPower}`);
    }
    if (vehicleInfo.dimensionsAndWeight?.kerbWeight) {
      features.push(`Kerb Weight: ${vehicleInfo.dimensionsAndWeight.kerbWeight}`);
    }
    if (vehicleInfo.fuelAndPerformance?.mileage) {
      features.push(`Mileage: ${vehicleInfo.fuelAndPerformance.mileage}`);
    }
    // Add more as needed based on your data structure
    return features.slice(0, 4); // Limit to top 4-5 key features
  };

  const keyFeatures = vehicle.vehicleInfo ? getKeyFeatures(vehicle.vehicleInfo) : [];
  const embedVideoSrc = getYouTubeEmbedUrl(vehicle.videoSrc); // Get the formatted embed URL

  return (
    <div className="card-detail-container">
      <div className="card-header">
        <button onClick={() => navigate(backPath)} className="back-button" aria-label={`Go back to ${backText}`}>
          <i className="bi bi-arrow-left-circle" aria-hidden="true" /> {backText}
        </button>
        <h1 className="vehicle-title">{vehicle.title}</h1>
      </div>

      <div className="card-main-content">
        {/* Left: Media Block (Image/Video) */}
        <div className="media-block">
          <div className="media-section">
            {embedVideoSrc ? ( // Use the formatted embed URL
              <div className="video-responsive"> {/* Add the responsive wrapper */}
                <iframe
                  src={embedVideoSrc}
                  title={`${vehicle.title} video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy" // Lazy load iframe
                />
              </div>
            ) : (
              <img
                src={vehicle.videoPoster || 'https://via.placeholder.com/1200x675?text=No+Media+Available'}
                alt={`${vehicle.title} main image`}
                className="video-poster"
                loading="lazy" // Lazy load image
              />
            )}
          </div>
        </div>

        {/* Right: Info Block (Price, Link, Description, Key Features) */}
        <div className="info-block">
          <div className="price-section">
            <h2 className="price-heading">Price:</h2>
            <p className="price-value">{vehicle.vehicleInfo?.price || 'Price Not Available'}</p>
          </div>

          {keyFeatures.length > 0 && (
            <div className="key-features-section">
              <h3 className="price-heading">Key Highlights:</h3> {/* Using price-heading style */}
              <ul>
                {keyFeatures.map((feature, index) => (
                  <li key={index} className="spec-item">{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {vehicle.link && (
            <a
              href={vehicle.link}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link-button"
              aria-label={`Visit official page for ${vehicle.title}`}
            >
              Visit Official Page
            </a>
          )}

          <div className="vehicle-description">
            <h3>Description:</h3>
            <p>{vehicle.description || 'No detailed description available for this vehicle.'}</p>
          </div>
        </div>
      </div>

      {/* Detailed Specifications Section */}
      <div className="specs-container">
        <h2 className="vehicle-title" style={{ fontSize: '2rem', marginBottom: '25px', borderBottom: '1px solid var(--border-light)', paddingBottom: '15px' }}>
          Detailed Specifications
        </h2>
        <div className="basic-specs">
          <div><strong>Model:</strong> {vehicle.vehicleInfo?.model || 'N/A'}</div>
          <div><strong>Manufacturer:</strong> {vehicle.vehicleInfo?.manufacturer || 'N/A'}</div>
          <div><strong>Year:</strong> {vehicle.vehicleInfo?.year || 'N/A'}</div>
        </div>

        {Object.entries(vehicle.vehicleInfo || {}).map(([section, data]) => {
          if (ignoredSections.includes(section) || !data || (typeof data === 'object' && Object.keys(data).length === 0)) {
            return null; // Don't render empty or ignored sections
          }
          const isExpanded = expandedSections.includes(section);
          return (
            <div key={section} className="spec-section">
              <button
                className="section-toggle"
                onClick={() => toggleSection(section)}
                aria-expanded={isExpanded}
                aria-controls={`details-${section}`}
              >
                {formatHeading(section)}
                <span className={`arrow ${isExpanded ? 'open' : ''}`} aria-hidden="true">▼</span>
              </button>
              {isExpanded && (
                <div className="section-details" id={`details-${section}`}>
                  {Array.isArray(data?.features) // Handle array of features directly
                    ? data.features.length > 0
                      ? data.features.map((item, i) => (
                          <div className="spec-item" key={i}>{item}</div>
                        ))
                      : <div className="spec-item">No specific features listed.</div>
                    : typeof data === 'object' // Handle object of key-value pairs
                      ? Object.entries(data).length > 0
                        ? Object.entries(data).map(([key, val], idx) => (
                            <div key={idx} className="spec-item">
                              <strong>{formatHeading(key)}:</strong> {val || 'N/A'}
                            </div>
                          ))
                        : <div className="spec-item">No detailed specifications available for this section.</div>
                      : <div className="spec-item">{data || 'N/A'}</div> // Handle direct string values
                  }
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarDetail;


/* */



// import React, { useMemo } from 'react'; // Import useMemo for performance optimization
// import { useParams, useNavigate } from 'react-router-dom';
// import './cardetail.css'; // Your CSS file with custom properties

// const CarDetail = ({ bikeData, carData }) => {
//   const { vehicleId } = useParams();
//   const navigate = useNavigate();

//   // --- CORRECTED: Memoize all vehicles array at the top level ---
//   // This ensures useMemo is always called, regardless of subsequent conditional returns.
//   const allVehicles = useMemo(() => {
//     const bikes = Array.isArray(bikeData) ? bikeData.flatMap(group => group.vehicles || []) : [];
//     const cars = Array.isArray(carData) ? carData.flatMap(group => group.vehicles || []) : [];
//     return [...bikes, ...cars];
//   }, [bikeData, carData]); // Re-run only if bikeData or carData change

//   // --- Data Loading and Error Handling (now after useMemo) ---
//   if (!bikeData && !carData) {
//     // If neither data set is provided, show a loading/error message
//     return (
//       <div className="card-detail-container">
//         <button onClick={() => navigate('/SeeOffer')} className="back-button" aria-label="Go back to offers">
//           ← Back to Offers
//         </button>
//         <p>Loading vehicle information or data is not yet available...</p>
//       </div>
//     );
//   }

//   const vehicle = allVehicles.find(v => v.id === vehicleId);

//   if (!vehicle) {
//     return (
//       <div className="card-detail-container">
//         <button onClick={() => navigate('/SeeOffer')} className="back-button" aria-label="Go back to offers">
//           ← Back to Offers
//         </button>
//         <p>Sorry, the vehicle you're looking for was not found.</p>
//       </div>
//     );
//   }

//   // --- Dynamic Back Button Logic ---
//   let backPath = '/SeeOffer';
//   let backIcon = <i className="bi bi-arrow-left-circle" aria-hidden="true"></i>; // For Bootstrap Icons or similar
//   let backText = 'Back to Offers';

//   // Determine if the vehicle is from bikeData or carData to navigate back correctly
//   const isBike = Array.isArray(bikeData) && bikeData.some(group => group.vehicles?.some(v => v.id === vehicleId));
//   const isCar = Array.isArray(carData) && carData.some(group => group.vehicles?.some(v => v.id === vehicleId));

//   if (isBike) {
//     backPath = '/Bikecard';
//     backText = 'Back to Bikes'; // More specific label
//   } else if (isCar) {
//     backPath = '/Carcard';
//     backText = 'Back to Cars'; // More specific label
//   }

//   // --- Media Section Logic ---
//   // A more robust check for YouTube embed links
//   const isYouTubeEmbed = vehicle.videoSrc?.includes('youtube.com/embed/') || vehicle.videoSrc?.includes('youtu.be/');
//   const finalVideoSrc = isYouTubeEmbed ? vehicle.videoSrc : null;

//   return (
//     <div className="card-detail-container">
//       {/* Dynamic back button with icon and text */}
//       <button
//         onClick={() => navigate(backPath)}
//         className="back-button"
//         aria-label={`Go ${backText}`} // Improved aria-label
//       >
//         {backIcon} {backText}
//       </button>

//       <h1 className="vehicle-title">{vehicle.title}</h1>

//       <div className="media-section">
//         {finalVideoSrc ? ( // Render iframe only if it's a valid YouTube embed URL
//           <iframe
//             className="video-embed"
//             src={finalVideoSrc}
//             title={`${vehicle.title} video`}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             allowFullScreen
//           ></iframe>
//         ) : (
//           // Fallback to image if no valid video source or not a recognized embed
//           <img
//             src={vehicle.videoPoster || 'https://via.placeholder.com/800x450?text=No+Media+Available'} // Fallback placeholder
//             alt={vehicle.title || 'Vehicle Image'}
//             className="video-poster"
//             loading="lazy" // Lazy load images
//           />
//         )}
//       </div>

//       <div className="details-content">
//         <p className="vehicle-description">{vehicle.description}</p>

//         <h2 className="spec-heading">Vehicle Specifications</h2>
//         <ul className="spec-list">
//           <li><strong>Model:</strong> {vehicle.vehicleInfo?.model || 'N/A'}</li> {/* Use optional chaining and fallback */}
//           <li><strong>Manufacturer:</strong> {vehicle.vehicleInfo?.manufacturer || 'N/A'}</li>
//           <li><strong>Year:</strong> {vehicle.vehicleInfo?.year || 'N/A'}</li>
//           <li><strong>Price:</strong> {vehicle.vehicleInfo?.price || 'N/A'}</li>
//           <li>
//             <strong>Features:</strong>
//             <ul>
//               {/* Check if features array exists and is an array before mapping */}
//               {Array.isArray(vehicle.vehicleInfo?.features) && vehicle.vehicleInfo.features.length > 0 ? (
//                 vehicle.vehicleInfo.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))
//               ) : (
//                 <li>No specific features listed.</li>
//               )}
//             </ul>
//           </li>
//         </ul>

//         {/* Render external link button only if 'link' exists and is a valid URL */}
//         {vehicle.link && vehicle.link.startsWith('http') && (
//           <a
//             href={vehicle.link}
//             target="_blank"
//             rel="noopener noreferrer" // Essential for security with target="_blank"
//             className="external-link-button"
//             aria-label={`Visit official page for ${vehicle.title}`}
//           >
//             Visit Official Page
//           </a>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CarDetail;