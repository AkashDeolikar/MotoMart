import React, { useState } from "react";
import "./EngineShowcase.css";

function EngineShowcase() {
  const [engineOn, setEngineOn] = useState(false);

  const toggleEngine = () => {
    setEngineOn(!engineOn);
  };

  return (
    <div className="engine-status-container">
      <div className="engine-indicator">
        <span
          className={`status-light ${engineOn ? "on" : "off"}`}
        ></span>
        <p>{engineOn ? "Engine Running" : "Engine Stopped"}</p>
      </div>
      <button onClick={toggleEngine} className="toggle-btn">
        {engineOn ? "Stop Engine" : "Start Engine"}
      </button>
    </div>
  );
}

export default EngineShowcase;
