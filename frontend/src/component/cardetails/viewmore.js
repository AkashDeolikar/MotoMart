import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './viewmore.css';

const Viewmore = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const handleExploreClick = () => {
    setShowOptions(true);
  };

  const handleSelection = (type) => {
    if (type === 'car') {
      navigate('/carcard');
    } else if (type === 'bike') {
      navigate('/bikecard');
    }
  };

  return (
    <div className="carslidefeatured-card">
      <div className="carslidefeatured-info">
        <p
          className="carslidefeatured-img-wrapper"
          style={{ textAlign: "center", padding: "8vh", textTransform: "uppercase", fontSize: "18px" }}
        >
          To view more
        </p>

        {!showOptions ? (
          <button className="viewmorenav-button" onClick={handleExploreClick}>
            EXPLORE →
          </button>
        ) : (
          <div className="option-buttons">
            <button className="viewmorenav-button" onClick={() => handleSelection('car')}>
             Car Card
            </button>
            <button className="viewmorenav-button" onClick={() => handleSelection('bike')}>
             Bike Card
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewmore;
