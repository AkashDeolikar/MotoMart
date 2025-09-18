import React, { useState } from "react";
import "./servicecost.css";
import AddMoreServiceCostCalculator from "./AddMoreServiceCostCalculator";

const servicesCatalog = {
  "2W": [
    { id: "oil2w", name: "Engine Oil (Bike)", price: 450 },
    { id: "brake2w", name: "Brake Pad Replacement", price: 800 },
    { id: "tyre2w", name: "Tyre Replacement", price: 2200 },
  ],
  "4W": [
    { id: "oil4w", name: "Engine Oil (Car)", price: 1200 },
    { id: "filter4w", name: "Air Filter Change", price: 600 },
    { id: "battery4w", name: "Battery Replacement", price: 5500 },
  ],
};

export default function ServiceCost() {
  const [vehicleType, setVehicleType] = useState("2W");
  const [services, setServices] = useState([]);
  const [notification, setNotification] = useState([]);

  // -------- handle Add from Catalog --------
  const handleAddService = (service) => {
    if (services.find((s) => s.id === service.id)) {
      showNotification("⚠️ Service already added", "error");
      return;
    }
    setServices([...services, { ...service, qty: 1 }]);
    showNotification(`${service.name} added`, "success");
  };

  // -------- handle Add from Custom Input --------
  const onAddCustomService = (name, price) => {
    const id = `custom-${Date.now()}`;
    setServices((prev) => [...prev, { id, name, price, qty: 1 }]);
    showNotification(`✅ ${name} added`, "success");
  };

  // -------- Quantity Update --------
  const handleQtyChange = (id, qty) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, qty: Math.max(1, qty) } : s))
    );
  };

  // -------- Delete --------
  const handleDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // -------- Clear All --------
  const clearAll = () => setServices([]);

  // -------- Notification System --------
  const showNotification = (message, type = "success", ms = 2000) => {
    const id = Date.now();
    setNotification((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotification((prev) => prev.filter((n) => n.id !== id));
    }, ms);
  };

  // -------- Totals --------
  const subtotal = services.reduce((acc, s) => acc + s.price * s.qty, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="container">
      <h1 className="sc">🔧 Service Cost Checker</h1>
      <p className="description">
        Select your vehicle type and add services to estimate costs.
      </p>

      {/* Custom Service Adder */}
      <AddMoreServiceCostCalculator onAddCustomService={onAddCustomService} />

      {/* Vehicle Selector */}
      <div className="input-group">
        <label htmlFor="vehicle">Vehicle Type</label>
        <select
          id="vehicle"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="2W">2 Wheeler (Bike/Scooter)</option>
          <option value="4W">4 Wheeler (Car)</option>
        </select>
      </div>

      {/* Add Services */}
      <div className="add-service-inputs">
        {servicesCatalog[vehicleType].map((service) => (
          <button
            key={service.id}
            className="add-btn"
            onClick={() => handleAddService(service)}
          >
            + {service.name}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="services-list-container">
        {services.length === 0 ? (
          <p className="no-services-msg">No services added yet.</p>
        ) : (
          <div className="services-grid">
            {services.map((s) => (
              <div className="service-item" key={s.id}>
                <div className="item-header">
                  <h3 className="service-name">{s.name}</h3>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(s.id)}
                  >
                    ✕
                  </button>
                </div>

                <div className="item-controls">
                  <div className="quantity-price">
                    <span className="current-price">₹{s.price}</span>
                    <input
                      type="number"
                      min="1"
                      className="quantity-input"
                      value={s.qty}
                      onChange={(e) =>
                        handleQtyChange(s.id, parseInt(e.target.value, 10))
                      }
                    />
                  </div>
                  <div className="item-total">₹{s.price * s.qty}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Totals */}
      {services.length > 0 && (
        <div className="total-and-clear">
          <div className="highlight-total">
            Total: ₹{total.toLocaleString()}
          </div>
          <button className="clear-all-btn" onClick={clearAll}>
            Clear All
          </button>
        </div>
      )}

      {/* Bill Summary */}
      {services.length > 0 && (
        <div className="bill-summary-section">
          <h2>Bill Summary</h2>
          <p>Subtotal: ₹{subtotal.toLocaleString()}</p>
          <p>Tax (18% GST): ₹{tax.toLocaleString()}</p>
          <p className="bill-total">Grand Total: ₹{total.toLocaleString()}</p>
        </div>
      )}

      {/* Notifications */}
      {notification.length > 0 && (
        <div className="notification-container">
          {notification.map((n) => (
            <div key={n.id} className={`notification ${n.type}`}>
              {n.message}
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <p className="disclaimer">
        * This is an estimate. Actual costs may vary depending on service
        center, location, and vehicle condition.
      </p>
    </div>
  );
}
