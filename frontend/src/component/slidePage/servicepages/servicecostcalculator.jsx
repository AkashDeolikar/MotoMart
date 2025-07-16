import React, { useState } from 'react';
import './servicecost.css';

const initialServices = [
  {
    id: 1,
    name: 'Oil Change',
    price: 0,
    applicableTo: ['2-wheeler', '4-wheeler'],
    brands: {
      Castrol: 500,
      Motul: 650,
      Shell: 600,
    },
  },
  {
    id: 2,
    name: 'Car Wash',
    price: 0,
    applicableTo: ['2-wheeler', '4-wheeler'],
    washTypes: {
      exterior: 200,
      interior: 200,
      completeWash: 300,
    },
  },
  { id: 3, name: 'Brake Inspection and Changing', price: 700, applicableTo: ['2-wheeler', '4-wheeler'] },
  { id: 4, name: 'Wheel Alignment and Balancing', price: 600, applicableTo: ['2-wheeler', '4-wheeler'] },
  { id: 5, name: 'Battery Check', price: 350, applicableTo: ['2-wheeler', '4-wheeler'] },
  { id: 6, name: 'AC Service', price: 1200, applicableTo: ['4-wheeler'] },
];

const ServiceCostCalculator = () => {
  const [services, setServices] = useState(initialServices);
  const [quantities, setQuantities] = useState({});
  const [brands, setBrands] = useState({});
  const [washTypes, setWashTypes] = useState({});
  const [newService, setNewService] = useState({ name: '', price: '' });
  const [vehicleType, setVehicleType] = useState('4-wheeler');

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(0, parseInt(value) || 0);
    setQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const handleBrandChange = (id, brand) => {
    setBrands(prev => ({ ...prev, [id]: brand }));
  };

  const getServicePrice = (service) => {
    let basePrice = 0;
    if (service.brands) {
      const selectedBrand = brands[service.id];
      basePrice = service.brands[selectedBrand] || 0;
    } else if (service.washTypes) {
      const selectedType = washTypes[service.id];
      basePrice = service.washTypes[selectedType] || 0;
    } else {
      basePrice = service.price;
    }
    return vehicleType === '2-wheeler' ? Math.round(basePrice * 0.6) : basePrice;
  };

  const calculateTotal = () => {
    return services.reduce((total, service) => {
      if (!service.applicableTo.includes(vehicleType)) return total;
      const qty = quantities[service.id] || 0;
      const price = getServicePrice(service);
      return total + qty * price;
    }, 0);
  };

  const handleAddService = () => {
    if (!newService.name || !newService.price) return;
    const id = services.length + 1;
    const price = parseFloat(newService.price);
    const newEntry = {
      id,
      name: newService.name,
      price,
      applicableTo: ['2-wheeler', '4-wheeler'],
    };
    setServices([...services, newEntry]);
    setNewService({ name: '', price: '' });
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
    const newBrands = { ...brands };
    delete newBrands[id];
    setBrands(newBrands);
    const newWashTypes = { ...washTypes };
    delete newWashTypes[id];
    setWashTypes(newWashTypes);
  };

  const filteredServices = services.filter(service => service.applicableTo.includes(vehicleType));
  const selectedServices = filteredServices.filter(s => (quantities[s.id] || 0) > 0);

  return (
    <div className="container">
      <h2>Service Cost Calculator</h2>

      <div className="vehicle-selector">
        <label>Select Vehicle Type:</label>
        <select value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
          <option value="2-wheeler">2-Wheeler</option>
          <option value="4-wheeler">4-Wheeler</option>
        </select>
      </div>

      <div className="add-service">
        <input
          type="text"
          placeholder="Service Name"
          value={newService.name}
          onChange={e => setNewService({ ...newService, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newService.price}
          onChange={e => setNewService({ ...newService, price: e.target.value })}
        />
        <button onClick={handleAddService}>Add Service</button>
        <button className="clear-btn" onClick={() => setQuantities({})}>Clear Quantities</button>
      </div>

      <h3 style={{ color: vehicleType === '2-wheeler' ? '#81c784' : '#4caf50' }}>
        {vehicleType === '2-wheeler' ? '🛵 Services for 2-Wheelers' : '🚗 Services for 4-Wheelers'}
      </h3>

      <div className="list">
        {filteredServices.map(service => {
          const price = getServicePrice(service);
          return (
            <div key={service.id} className="item">
              <span className="service-name">{service.name} (₹{price})</span>

              {service.brands && (
                <select
                  value={brands[service.id] || ''}
                  onChange={e => handleBrandChange(service.id, e.target.value)}
                >
                  <option value="">Select Brand</option>
                  {Object.entries(service.brands).map(([brand, brandPrice]) => (
                    <option key={brand} value={brand}>
                      {brand} (₹{vehicleType === '2-wheeler' ? Math.round(brandPrice * 0.6) : brandPrice})
                    </option>
                  ))}
                </select>
              )}

              {service.washTypes && (
                <select
                  value={washTypes[service.id] || ''}
                  onChange={e => setWashTypes(prev => ({ ...prev, [service.id]: e.target.value }))}
                >
                  <option value="">Select Wash Type</option>
                  {Object.entries(service.washTypes).map(([type, washPrice]) => (
                    <option key={type} value={type}>
                      {type} (₹{vehicleType === '2-wheeler' ? Math.round(washPrice * 0.6) : washPrice})
                    </option>
                  ))}
                </select>
              )}

              <input
                type="number"
                min="0"
                value={quantities[service.id] || ''}
                onChange={e => handleQuantityChange(service.id, e.target.value)}
                className="input"
                placeholder="Qty"
              />

              <button className="delete-btn" onClick={() => handleDeleteService(service.id)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          );
        })}
      </div>

      <h3>Total Cost: ₹{calculateTotal()}</h3>

      {selectedServices.length > 0 && (
        <div className="bill">
          <h4>Bill Summary ({vehicleType})</h4>
          <ul>
            <div className="bar-summary">
              {selectedServices.map(service => {
                const qty = quantities[service.id];
                const price = getServicePrice(service);
                const total = qty * price;
                const widthPercent = (total / calculateTotal()) * 100;

                return (
                  <div key={service.id} className="bar-row">
                    <span className="bar-label">{service.name} ({qty}×₹{price})</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${widthPercent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServiceCostCalculator;