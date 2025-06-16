import React, { useState } from 'react';
import './servicecost.css';

const initialServices = [
  {
    id: 1,
    name: 'Oil Change',
    price: 0, // base price will depend on brand
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
    washTypes: {
      exterior: 200,
      interior: 200,
      completeWash: 300,
    }
  },
  // { id: 2, name: 'Car Wash', price: 300 },
  { id: 3, name: 'Brake Inspection and Chaging', price: 700 },
  { id: 4, name: 'Wheel Alignment and Balancing', price: 600 },
  { id: 5, name: 'Battery Check', price: 350 },
  { id: 6, name: 'AC Service', price: 1200 },
];

const ServiceCostCalculator = () => {
  const [services, setServices] = useState(initialServices);
  const [quantities, setQuantities] = useState({});
  const [brands, setBrands] = useState({});
  const [washTypes, setwashTypes] = useState({});
  const [newService, setNewService] = useState({ name: '', price: '' });

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(0, parseInt(value) || 0);
    setQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const handleBrandChange = (id, brand) => {
    setBrands(prev => ({ ...prev, [id]: brand }));
  };

  const getServicePrice = (service) => {
    //oil
    if (service.brands) {
      const selectedBrand = brands[service.id];
      return service.brands[selectedBrand] || 0;
    }
    //car wash
    if (service.washTypes) {
    const selectedType = washTypes[service.id];
    return service.washTypes[selectedType] || 0;
  }
    return service.price;
  };

  const calculateTotal = () => {
    return services.reduce((total, service) => {
      const qty = quantities[service.id] || 0;
      const price = getServicePrice(service);
      return total + qty * price;
    }, 0);
  };

  const handleAddService = () => {
    if (!newService.name || !newService.price) return;
    const id = services.length + 1;
    const price = parseFloat(newService.price);
    setServices([...services, { id, name: newService.name, price }]);
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
  };

  const selectedServices = services.filter(s => (quantities[s.id] || 0) > 0);

  return (
    <div className="container">
      <h2>Service Cost Calculator</h2>

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

      <div className="list">
        {services.map(service => {
          // const selectedBrand = brands[service.id];
          const price = getServicePrice(service);
          return (
            <div key={service.id} className="item">
              <span className="service-name">{service.name} (₹{price})</span>
              {/*oil change */}
              {service.brands && (
                <select
                  value={brands[service.id] || ''}
                  onChange={e => handleBrandChange(service.id, e.target.value)}
                >
                  <option value="">Select Brand</option>
                  {Object.entries(service.brands).map(([brand, price]) => (
                    <option key={brand} value={brand}>
                      {brand} (₹{price} /ltr)
                    </option>
                  ))}
                </select>
              )}
              {/*Car Wash */}
              {service.washTypes && (
                <select
                  value={washTypes[service.id] || ''}
                  onChange={e => setwashTypes(prev => ({ ...prev, [service.id]: e.target.value }))}
                >
                  <option value="">Select Wash Type</option>
                  {Object.entries(service.washTypes).map(([type, price]) => (
                    <option key={type} value={type}>
                      {type} (₹{price})
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

              <button className="delete-btn" onClick={() => handleDeleteService(service.id)}><i class="bi bi-trash"></i></button>
            </div>
          );
        })}
      </div>

      <h3>Total Cost: ₹{calculateTotal()}</h3>

      {selectedServices.length > 0 && (
        <div className="bill">
          <h4>Bill Summary</h4>
          <ul>
            {selectedServices.map(service => {
              const qty = quantities[service.id];
              const price = getServicePrice(service);
              const total = qty * price;
              return (
                <li key={service.id}>
                  {service.name}
                  {service.brands && brands[service.id] ? ` (${brands[service.id]})` : ''}
                  × {qty} = ₹{total}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServiceCostCalculator;
