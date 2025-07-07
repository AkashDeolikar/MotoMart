import React, { useEffect, useState } from 'react';
import './partsinfo.css';

// Define a TypeScript interface for each part object
interface Part {
  part: string;
  type: string;
  brands: string[];
  priceRange: string;
  spec: string;
}

const PartsInfo: React.FC = () => {
  const [partsData, setPartsData] = useState<Part[]>([]);
  const [filteredData, setFilteredData] = useState<Part[]>([]);
  const [partType, setPartType] = useState<string>('');
  const [searchBrand, setSearchBrand] = useState<string>('');

  useEffect(() => {
    fetch('/partsData.json')
      .then(res => res.json())
      .then((data: Part[]) => {
        setPartsData(data);
        setFilteredData(data);
      })
      .catch(err => console.error('Failed to load:', err));
  }, []);

  useEffect(() => {
    let filtered = partsData;

    if (partType.trim()) {
      filtered = filtered.filter(item =>
        item.part.toLowerCase().includes(partType.toLowerCase())
      );
    }

    if (searchBrand.trim()) {
      filtered = filtered.filter(item =>
        item.brands.some(brand =>
          brand.toLowerCase().includes(searchBrand.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
  }, [partType, searchBrand, partsData]);

  return (
    <div className="parts-container">
      <h2>🛠 Parts & Fluids Information</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Part Name (e.g., Brake)"
          value={partType}
          onChange={(e) => setPartType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Brand (e.g., Bosch)"
          value={searchBrand}
          onChange={(e) => setSearchBrand(e.target.value)}
        />
      </div>

      {/* Table */}
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
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>
                No matching parts found.
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.part}</td>
                <td>{item.type}</td>
                <td>{item.brands.join(', ')}</td>
                <td>{item.priceRange}</td>
                <td>{item.spec}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className='note'>
        <p>NOTE: Original parts and fluids are also available at OEM-authorized service centers and care outlets.</p>
      </div>
    </div>
  );
};

export default PartsInfo;
