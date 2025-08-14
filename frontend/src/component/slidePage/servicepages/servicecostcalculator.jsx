import React, { useState, useEffect } from 'react';
import {
  SERVICE_TYPES,
  VEHICLE_TYPES,
  VEHICLE_SEGMENTS,
  WASH_TYPES,
  initialServices
} from './constants';
import './servicecost.css';
import AddMoreServiceCostCalculator from './AddMoreServiceCostCalculator';

// ----------------- Floating Notification Component -----------------
const Notification = ({ notices }) => (
  <div className="notification-container">
    {notices.map((n) => (
      <div key={n.id} className={`notification ${n.type}`}>
        {n.message}
      </div>
    ))}
  </div>
);

// Helper function to calculate service price
const calculateServicePrice = (service, selectedVehicleType, selectedOption = null, selectedSegment = null) => {
  if (service.type === SERVICE_TYPES.FIXED) {
    return service.price;
  } else if (service.type === SERVICE_TYPES.BRAND_BASED && selectedOption && service.brands) {
    return service.brands[selectedOption]?.[selectedVehicleType] || 0;
  } else if (service.type === SERVICE_TYPES.WASH_BASED && selectedOption && service.washTypes) {
    return service.washTypes[selectedOption] || 0;
  } else if (service.type === SERVICE_TYPES.SIZE_BASED && selectedSegment && service.pricesBySegment) {
    return service.pricesBySegment[selectedSegment] || 0;
  } else if (service.type === SERVICE_TYPES.ESTIMATE_BASED) {
    return null;
  }
  if (service.isCustom) {
      return service.cost;
  }
  return 0;
};

function ServiceCostCalculator() {
  const [selectedVehicleType, setSelectedVehicleType] = useState(VEHICLE_TYPES.FOUR_WHEELER);
  const [selectedServices, setSelectedServices] = useState([]);
  const [notices, setNotices] = useState([]);

  // -------- Notification Handler --------
  const showNote = (message, type = "success", ms = 3000) => {
    const id = Date.now() + Math.random();
    setNotices((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotices((prev) => prev.filter((x) => x.id !== id));
    }, ms);
  };

  // Function to handle adding a new custom service from the child component
  const addCustomService = (serviceName, serviceCost) => {
      const newServiceInstance = {
          name: serviceName,
          cost: serviceCost,
          isCustom: true,
          instanceId: Date.now() + Math.random(),
          quantity: 1,
          currentPrice: serviceCost,
          type: "CUSTOM_FIXED",
      };
      setSelectedServices(prev => [...prev, newServiceInstance]);
      showNote(`${serviceName} added successfully!`, "success");
  };

  const addService = (serviceId) => {
    const serviceToAdd = initialServices.find(s => s.id === serviceId);
    if (!serviceToAdd) {
      showNote('Service not found!', "error");
      return;
    }

    const newServiceInstance = {
      ...serviceToAdd,
      instanceId: Date.now() + Math.random(),
      quantity: 1,
      selectedOption: null,
      selectedSegment: null,
      currentPrice: null,
    };

    if (serviceToAdd.type === SERVICE_TYPES.BRAND_BASED) {
      newServiceInstance.selectedOption = serviceToAdd.defaultBrand;
    } else if (serviceToAdd.type === SERVICE_TYPES.WASH_BASED) {
      newServiceInstance.selectedOption = serviceToAdd.defaultWashType;
    } else if (serviceToAdd.type === SERVICE_TYPES.SIZE_BASED) {
      newServiceInstance.selectedSegment = serviceToAdd.defaultSegment;
    }

    if (newServiceInstance.type !== SERVICE_TYPES.ESTIMATE_BASED) {
      newServiceInstance.currentPrice = calculateServicePrice(
        newServiceInstance,
        selectedVehicleType,
        newServiceInstance.selectedOption,
        newServiceInstance.selectedSegment
      );
    } else {
        newServiceInstance.currentPrice = null;
    }

    setSelectedServices(prev => [...prev, newServiceInstance]);
    showNote(`${serviceToAdd.name} added!`);
  };

  const removeService = (instanceId) => {
    setSelectedServices(prev => prev.filter(service => service.instanceId !== instanceId));
    showNote('Service removed.');
  };
  
  const updateServiceQuantity = (instanceId, newQuantity) => {
    setSelectedServices(prev =>
      prev.map(service =>
        service.instanceId === instanceId
          ? { ...service, quantity: Math.max(1, parseInt(newQuantity) || 1) }
          : service
      )
    );
  };

  const updateServiceOption = (instanceId, newOption) => {
    setSelectedServices(prev =>
      prev.map(service => {
        if (service.instanceId === instanceId) {
          const updatedService = { ...service, selectedOption: newOption };
          updatedService.currentPrice = calculateServicePrice(
            updatedService,
            selectedVehicleType,
            updatedService.selectedOption
          );
          return updatedService;
        }
        return service;
      })
    );
  };

  const updateServiceSegment = (instanceId, newSegment) => {
    setSelectedServices(prev =>
      prev.map(service => {
        if (service.instanceId === instanceId) {
          const updatedService = { ...service, selectedSegment: newSegment };
          updatedService.currentPrice = calculateServicePrice(
            updatedService,
            selectedVehicleType,
            null,
            updatedService.selectedSegment
          );
          return updatedService;
        }
        return service;
      })
    );
  };

  useEffect(() => {
    setSelectedServices(prevServices => {
        return prevServices.map(service => {
            if (service.type === SERVICE_TYPES.BRAND_BASED || service.type === SERVICE_TYPES.SIZE_BASED) {
                const newPrice = calculateServicePrice(
                    service,
                    selectedVehicleType,
                    service.selectedOption,
                    service.selectedSegment
                );
                return { ...service, currentPrice: newPrice };
            }
            return service;
        }).filter(service => service.isCustom || service.applicableTo.includes(selectedVehicleType));
    });
    setNotices([]);
  }, [selectedVehicleType]);


  const clearAllServices = () => {
    setSelectedServices([]);
    showNote('All services cleared!');
  };

  const totalCost = selectedServices.reduce((sum, service) => {
    const price = service.currentPrice !== null ? service.currentPrice : 0;
    return sum + (price * service.quantity);
  }, 0);

  const availableServices = initialServices.filter(service =>
    service.applicableTo.includes(selectedVehicleType)
  );

  return (
    <div className="container">
      <Notification notices={notices} />
      <AddMoreServiceCostCalculator onAddCustomService={addCustomService} />

      <h2 className='sc'>Vehicle Service Cost Calculator</h2>
      <p className="description">
        Calculate the estimated cost of vehicle services for your {selectedVehicleType === VEHICLE_TYPES.TWO_WHEELER ? '2-wheeler' : '4-wheeler'}. Add services, adjust quantities, and get a real-time estimate.
      </p>

      {/* Vehicle Selector */}
      <div className="input-group vehicle-selector">
        <label htmlFor="vehicle-type-select">Select Vehicle Type:</label>
        <select
          id="vehicle-type-select"
          value={selectedVehicleType}
          onChange={(e) => {
            setSelectedVehicleType(e.target.value);
          }}
        >
          {Object.values(VEHICLE_TYPES).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Add Services Section */}
      <div className="add-service-section">
        <h3 className='sc'>Add Services</h3>
        <div className="add-service-inputs">
          {availableServices.map(service => (
            <button
              key={service.id}
              onClick={() => addService(service.id)}
              className="add-btn"
            >
              {service.name}
              {service.type === SERVICE_TYPES.ESTIMATE_BASED && ` (Est. from ₹${service.startingFrom})`}
              {service.type === SERVICE_TYPES.FIXED && ` (+₹${service.price})`}
              {service.type === SERVICE_TYPES.BRAND_BASED && ` (+₹${service.brands[service.defaultBrand][selectedVehicleType]})`}
              {service.type === SERVICE_TYPES.WASH_BASED && ` (+₹${service.washTypes[service.defaultWashType]})`}
              {service.type === SERVICE_TYPES.SIZE_BASED && ` (+₹${service.pricesBySegment[service.defaultSegment]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="services-list-container">
        <h3>Selected Services</h3>
        {selectedServices.length === 0 ? (
          <p className="no-services-msg">No services added yet. Select from above!</p>
        ) : (
          <div className="services-grid">
            {selectedServices.map(service => (
              <div key={service.instanceId} className="service-item">
                <div className="item-header">
                  <span className="service-name">{service.name}</span>
                  <button
                    className="delete-btn"
                    onClick={() => removeService(service.instanceId)}
                    aria-label={`Remove ${service.name}`}
                  >
                    &times;
                  </button>
                </div>
                {service.description && <p className="help-text">{service.description}</p>}
                {service.timeEstimate && <p className="help-text">Est. Time: {service.timeEstimate}</p>}
                <div className="item-controls">
                  {service.type === SERVICE_TYPES.BRAND_BASED && (
                    <div className="input-group">
                      <label htmlFor={`brand-select-${service.instanceId}`} className="sr-only">Select Brand for {service.name}</label>
                      <select
                        id={`brand-select-${service.instanceId}`}
                        className="service-select"
                        value={service.selectedOption}
                        onChange={(e) => updateServiceOption(service.instanceId, e.target.value)}
                      >
                        {Object.entries(service.brands).map(([brand, prices]) => (
                          <option key={brand} value={brand}>
                            {brand} (₹{prices[selectedVehicleType] || 'N/A'})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {service.type === SERVICE_TYPES.WASH_BASED && (
                    <div className="input-group">
                      <label htmlFor={`wash-select-${service.instanceId}`} className="sr-only">Select Wash Type for {service.name}</label>
                      <select
                        id={`wash-select-${service.instanceId}`}
                        className="service-select"
                        value={service.selectedOption}
                        onChange={(e) => updateServiceOption(service.instanceId, e.target.value)}
                      >
                        {Object.entries(service.washTypes).map(([washType, price]) => (
                          <option key={washType} value={washType}>
                            {washType} (₹{price})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {service.type === SERVICE_TYPES.SIZE_BASED && (
                    <div className="input-group">
                      <label htmlFor={`segment-select-${service.instanceId}`} className="sr-only">Select Vehicle Segment for {service.name}</label>
                      <select
                        id={`segment-select-${service.instanceId}`}
                        className="service-select"
                        value={service.selectedSegment}
                        onChange={(e) => updateServiceSegment(service.instanceId, e.target.value)}
                      >
                        {Object.entries(service.pricesBySegment).map(([segment, price]) => (
                          <option key={segment} value={segment}>
                            {segment} (₹{price})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {service.type !== SERVICE_TYPES.ESTIMATE_BASED && (
                    <div className="quantity-price">
                      <div className="input-group" style={{ flexGrow: 1 }}>
                        <label htmlFor={`quantity-input-${service.instanceId}`} className="sr-only">Quantity for {service.name}</label>
                        <input
                          id={`quantity-input-${service.instanceId}`}
                          type="number"
                          className="quantity-input"
                          value={service.quantity}
                          onChange={(e) => updateServiceQuantity(service.instanceId, e.target.value)}
                          min="1"
                        />
                      </div>
                      <span className="current-price">
                        ₹{service.currentPrice ? service.currentPrice.toFixed(2) : 'N/A'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="item-total">
                  {service.type === SERVICE_TYPES.ESTIMATE_BASED ? (
                    `Estimate Required (Starts from ₹${service.startingFrom?.toLocaleString('en-IN')})`
                  ) : (
                    `Total: ₹${(service.currentPrice * service.quantity).toLocaleString('en-IN')}`
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Total & Clear Quantities */}
      <div className="total-and-clear">
        <h3>Estimated Total: <span className="highlight-total">₹{totalCost.toLocaleString('en-IN')}</span></h3>
        <button
          className="clear-all-btn"
          onClick={clearAllServices}
          disabled={selectedServices.length === 0}
        >
          Clear All Services
        </button>
      </div>

      {/* Bill Summary */}
      <div className="bill-summary-section">
        <h4 className='sc'>Bill Summary</h4>
        {selectedServices.length === 0 ? (
          <p className="no-services-msg">Add services to see the summary.</p>
        ) : (
          <div className="bill-items">
            {selectedServices.map(service => (
              <div key={service.instanceId} className="bill-item">
                <span>
                    {service.name}
                    {service.type !== SERVICE_TYPES.ESTIMATE_BASED &&
                        ` (${service.quantity} x ₹${service.currentPrice?.toLocaleString('en-IN') || 'N/A'})`
                    }
                </span>
                <span className="bill-item-total">
                    {service.type === SERVICE_TYPES.ESTIMATE_BASED ? (
                        `Quote Req. (from ₹${service.startingFrom?.toLocaleString('en-IN')})`
                    ) : (
                        `₹${(service.currentPrice * service.quantity).toLocaleString('en-IN')}`
                    )}
                </span>
              </div>
            ))}
            <div className="bill-total">
              <span>Grand Total:</span>
              <span>₹{totalCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="bar-summary">
                <div className="bar-row">
                    <div className="bar-label">
                        <span>Total Service Cost</span>
                        <strong>{Math.min(100, (totalCost / 5000) * 100).toFixed(0)}%</strong>
                    </div>
                    <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${Math.min(100, (totalCost / 5000) * 100)}%` }}></div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>

      <div className="disclaimer">
        <p>
          Disclaimer: This is an estimated cost. Actual prices may vary based on specific vehicle model, parts required, additional labor, and any unforeseen issues. Please confirm the final cost with the service provider.
        </p>
      </div>
    </div>
  );
}

export default ServiceCostCalculator;