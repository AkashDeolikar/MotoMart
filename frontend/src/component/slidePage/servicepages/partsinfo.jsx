// import React, { useEffect, useState } from 'react';
// import './partsinfo.css';

// const PartsInfo = () => {
//     const [partsData, setPartsData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [partNameFilter, setPartNameFilter] = useState(''); // Renamed from partType for clarity
//     const [searchBrand, setSearchBrand] = useState('');
//     const [vehicleType, setVehicleType] = useState('all');

//     useEffect(() => {
//         fetch('https://motomartbackend.onrender.com/api/parts')
//             .then(res => res.json())
//             .then(data => {
//                 setPartsData(data);
//                 setFilteredData(data);
//             })
//             .catch(err => console.error('Failed to load:', err));
//     }, []);

//     useEffect(() => {
//         let currentFilteredData = partsData;

//         // Filter by Vehicle Type
//         if (vehicleType === '4W') {
//             currentFilteredData = currentFilteredData.filter(item => item.part.includes('(4W)'));
//         } else if (vehicleType === '2W') {
//             currentFilteredData = currentFilteredData.filter(item => item.part.includes('(2W)'));
//         }
//         // If 'all' is selected, no vehicle type filtering is applied here.
//         // Parts with '(Common)' or no specific 4W/2W designation will show for 'all' or specific filters if applicable.

//         // Filter by Part Name
//         if (partNameFilter.trim()) {
//             currentFilteredData = currentFilteredData.filter(item =>
//                 item.part.toLowerCase().includes(partNameFilter.toLowerCase())
//             );
//         }

//         // Filter by Brand
//         if (searchBrand.trim()) {
//             currentFilteredData = currentFilteredData.filter(item =>
//                 item.brands.some(brand =>
//                     brand.toLowerCase().includes(searchBrand.toLowerCase())
//                 )
//             );
//         }

//         setFilteredData(currentFilteredData);
//     }, [partNameFilter, searchBrand, vehicleType, partsData]);

//     return (
//         <div className="parts-container">
//             <h2>🛠 Parts & Fluids Information</h2>

//             {/* Filters */}
//             <div className="filters">
//                 <select
//                     value={vehicleType}
//                     onChange={(e) => setVehicleType(e.target.value)}
//                     className="vehicle-type-select"
//                 >
//                     <option value="all">All Vehicles</option>
//                     <option value="4W">Cars (4-Wheelers)</option>
//                     <option value="2W">Bikes (2-Wheelers)</option>
//                 </select>

//                 <input
//                     type="text"
//                     placeholder="Filter by Part Name (e.g., Brake)"
//                     value={partNameFilter}
//                     onChange={(e) => setPartNameFilter(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Search by Brand (e.g., Bosch)"
//                     value={searchBrand}
//                     onChange={(e) => setSearchBrand(e.target.value)}
//                 />
//             </div>

//             {/* Table */}
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
//                     {filteredData.length === 0 ? (
//                         <tr>
//                             <td colSpan="5" style={{ textAlign: 'center' }}>
//                                 No matching parts found. Please adjust your filters.
//                             </td>
//                         </tr>
//                     ) : (
//                         filteredData.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{item.part}</td>
//                                 <td>{item.type}</td>
//                                 <td>{item.brands.join(', ')}</td>
//                                 <td>{item.priceRange}</td>
//                                 <td>{item.spec}</td>
//                             </tr>
//                         ))
//                     )}
//                 </tbody>
//             </table>
//             <div className='note'>
//                 <p>NOTE: Original parts and fluids are also available at OEM-authorized service centers and care outlets.</p>
//             </div>
//         </div>
//     );
// };

// export default PartsInfo;

import React, { useEffect, useState } from 'react';
import './partsinfo.css';

const PartsInfo = () => {
    const [partsData, setPartsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [partNameFilter, setPartNameFilter] = useState('');
    const [searchBrand, setSearchBrand] = useState('');
    const [vehicleType, setVehicleType] = useState('all');
    const [loading, setLoading] = useState(true); // <-- loading state

    useEffect(() => {
        fetch('https://motomartbackend.onrender.com/api/parts')
            .then(res => res.json())
            .then(data => {
                setPartsData(data);
                setFilteredData(data);
                setLoading(false); // Done loading
            })
            .catch(err => {
                console.error('Failed to load:', err);
                setLoading(false); // Stop loading on error
            });
    }, []);

    useEffect(() => {
        let currentFilteredData = partsData;

        if (vehicleType === '4W') {
            currentFilteredData = currentFilteredData.filter(item => item.part.includes('(4W)'));
        } else if (vehicleType === '2W') {
            currentFilteredData = currentFilteredData.filter(item => item.part.includes('(2W)'));
        }

        if (partNameFilter.trim()) {
            currentFilteredData = currentFilteredData.filter(item =>
                item.part.toLowerCase().includes(partNameFilter.toLowerCase())
            );
        }

        if (searchBrand.trim()) {
            currentFilteredData = currentFilteredData.filter(item =>
                item.brands.some(brand =>
                    brand.toLowerCase().includes(searchBrand.toLowerCase())
                )
            );
        }

        setFilteredData(currentFilteredData);
    }, [partNameFilter, searchBrand, vehicleType, partsData]);

    return (
        <div className="parts-container">
            <h2>🛠 Parts & Fluids Information</h2>

            {/* Filters */}
            <div className="filters">
                <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="vehicle-type-select"
                >
                    <option value="all">All Vehicles</option>
                    <option value="4W">Cars (4-Wheelers)</option>
                    <option value="2W">Bikes (2-Wheelers)</option>
                </select>

                <input
                    type="text"
                    placeholder="Filter by Part Name (e.g., Brake)"
                    value={partNameFilter}
                    onChange={(e) => setPartNameFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Search by Brand (e.g., Bosch)"
                    value={searchBrand}
                    onChange={(e) => setSearchBrand(e.target.value)}
                />
            </div>

            {/* Loader */}
            {loading ? (
                <div className="partinfo-loader">
                    <div className="partinfo-spinner"></div>
                    <p>Fetching parts & fluids information from Server...</p>
                </div>
            ) : (
                <>
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
                                        No matching parts found. Please adjust your filters.
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
                </>
            )}
        </div>
    );
};

export default PartsInfo;
