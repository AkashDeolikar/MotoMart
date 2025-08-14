import React, { useState } from "react";
import './AddMoreServiceCostCalculator.css';

// ----------------- Floating Notification Component -----------------
const AddMoreNotification = ({ items }) => (
  <div className="addmore-service-notification-container">
    {items.map((n) => (
      <div key={n.id} className={`addmore-service-notification ${n.type}`}>
        {n.message}
      </div>
    ))}
  </div>
);

export default function AddMoreServiceCostCalculator({ onAddCustomService }) {
  const [serviceName, setServiceName] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [notices, setNotices] = useState([]);

  // -------- Notification Handler --------
  const showNote = (message, type = "success", ms = 3000) => {
    const id = Date.now() + Math.random();
    setNotices((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotices((prev) => prev.filter((x) => x.id !== id));
    }, ms);
  };

  // -------- Add Service --------
  const addService = () => {
    if (!serviceName.trim() || !serviceCost) {
      showNote("❌ Please enter both service name and cost", "error");
      return;
    }
    const costNum = parseFloat(serviceCost);
    if (isNaN(costNum) || costNum < 0) {
      showNote("❌ Please enter a valid cost", "error");
      return;
    }

    onAddCustomService(serviceName.trim(), costNum);
    showNote(`✅ ${serviceName} added successfully!`, "success");

    setServiceName("");
    setServiceCost("");
  };

  return (
    <div className="addmore-service-cost-page">
      {/* Floating Notifications */}
      <AddMoreNotification items={notices} />

      <h2 className="addmore-service-title">Add Your Own Service</h2>

      <div className="addmore-service-input-group">
        <input
          type="text"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cost"
          value={serviceCost}
          onChange={(e) => setServiceCost(e.target.value)}
        />
        <button onClick={addService}>Add Service</button>
      </div>
    </div>
  );
}
