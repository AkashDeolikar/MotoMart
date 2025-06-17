// import React, { useEffect, useState } from 'react';
// import './partsinfo.css';

// const PartsInfo = () => {
//     const [partsData, setPartsData] = useState([]);

//     useEffect(() => {
//         fetch('/partsData.json') // path->public folder
//             .then(response => response.json())
//             .then(data => setPartsData(data))
//             .catch(error => console.error('Error loading JSON:', error));
//     }, []);

//     return (
//         <div className="parts-container">
//             <h2>🛠 Parts & Fluids Information</h2>
//             <table className="parts-table">
//                 <thead>
//                     <tr>
//                         <th>Part</th>
//                         <th>Type</th>
//                         <th>Recommended Brands</th>
//                         <th>Price Range</th>
//                         <th>Grade / Specification</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {partsData.map((item, index) => (
//                         <tr key={index}>
//                             <td>{item.part}</td>
//                             <td>{item.type}</td>
//                             <td>{item.brands.join(', ')}</td>
//                             <td>{item.priceRange}</td>
//                             <td>{item.spec}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default PartsInfo;
import React, { useEffect, useState } from 'react';
import './partsinfo.css';

const PartsInfo = () => {
    const [partsData, setPartsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [partType, setPartType] = useState('');
    const [searchBrand, setSearchBrand] = useState('');

    useEffect(() => {
        fetch('/partsData.json')
            .then(res => res.json())
            .then(data => {
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
                            <td colSpan="5" style={{ textAlign: 'center' }}>
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

