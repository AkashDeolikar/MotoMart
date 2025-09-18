import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./viewmore.css";

const Viewmore = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const handleExploreClick = () => {
    setShowOptions(true);
  };

  const handleBackClick = () => {
    setShowOptions(false);
  };

  const handleSelection = (type) => {
    if (type === "car") {
      navigate("/carcard");
    } else if (type === "bike") {
      navigate("/bikecard");
    }
  };

  return (
    <div className="carslidefeatured-card viewmore-card">
      <div className="carslidefeatured-info">
        <h3 className="viewmore-title">To View More</h3>

        {!showOptions ? (
          <button
            className="viewmorenav-button"
            onClick={handleExploreClick}
          >
            EXPLORE →
          </button>
        ) : (
          <div className="option-buttons">
            <button className="viewmorenav-button" onClick={() => handleSelection("car")}>
              Car Card
            </button>
            <button className="viewmorenav-button" onClick={() => handleSelection("bike")}>
              Bike Card
            </button>
            <button className="viewmorenav-button back-btn" onClick={handleBackClick}>
              Back
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default Viewmore;
