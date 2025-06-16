import './partsinfo.css';
import React from 'react';

const partsData = [
    {
        part: 'Engine Oil',
        type: 'OEM / Aftermarket',
        brands: ['Castrol', 'Mobil 1', 'Motul'],
        priceRange: '₹900 - ₹1800 (per 3.5L)',
        spec: '5W30 (API SN), Fully Synthetic',
    },
    {
        part: 'Coolant',
        type: 'OEM / Aftermarket',
        brands: ['Shell', 'Bosch', 'Prestone'],
        priceRange: '₹300 - ₹700 (per L)',
        spec: 'Ethylene Glycol (Green/Red)',
    },
    {
        part: 'Brake Fluid',
        type: 'OEM / Aftermarket',
        brands: ['Bosch', 'TVS Girling', 'Castrol'],
        priceRange: '₹200 - ₹450 (per 500ml)',
        spec: 'DOT 3 / DOT 4',
    },
    {
        part: 'Air Filter',
        type: 'OEM / Aftermarket',
        brands: ['Bosch', 'Purolator', 'Mahle'],
        priceRange: '₹250 - ₹600',
        spec: 'Model-specific (e.g., 1.2L Petrol)',
    },
    {
        part: 'Battery',
        type: 'OEM / Aftermarket',
        brands: ['Exide', 'Amaron', 'SF Sonic'],
        priceRange: '₹3500 - ₹5500',
        spec: '35Ah - 45Ah (Maintenance-free)',
    },
    {
        part: 'Wiper Blade',
        type: 'OEM / Aftermarket',
        brands: ['Bosch', 'Hella', 'Rain-X'],
        priceRange: '₹300 - ₹1200 (per blade)',
        spec: '14” - 24” (Silicone or Rubber)'
    },
    {
        part: 'Headlight',
        type: 'OEM / Aftermarket',
        brands: ['Philips', 'Osram', 'Hella'],
        priceRange: '₹600 - ₹3000 (per unit)',
        spec: 'H4 / H7 Halogen, LED, HID options'
    },
];

const PartsInfo = () => {
    return (
        <div className="parts-container">
            <h2>🛠 Parts & Fluids Information</h2>
            <table className="parts-table">
                <thead>
                    <tr>
                        <th>Part</th>
                        <th>Type</th>
                        <th>Recommended Brands</th>
                        <th>Price Range</th>
                        <th>Grade / Specification</th>
                    </tr>
                </thead>
                <tbody>
                    {partsData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.part}</td>
                            <td>{item.type}</td>
                            <td>{item.brands.join(', ')}</td>
                            <td>{item.priceRange}</td>
                            <td>{item.spec}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PartsInfo;
