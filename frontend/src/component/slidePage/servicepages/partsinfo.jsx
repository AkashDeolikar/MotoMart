import React, { useEffect, useState } from "react";
import "./partsinfo.css";

const PartsInfo = () => {
  const [partsData, setPartsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [partNameFilter, setPartNameFilter] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [vehicleType, setVehicleType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://motomartbackend.onrender.com/api/parts")
      .then((res) => res.json())
      .then((data) => {
        setPartsData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let currentFilteredData = partsData;

    if (vehicleType === "4W") {
      currentFilteredData = currentFilteredData.filter((item) =>
        item.part.includes("(4W)")
      );
    } else if (vehicleType === "2W") {
      currentFilteredData = currentFilteredData.filter((item) =>
        item.part.includes("(2W)")
      );
    }

    if (partNameFilter.trim()) {
      currentFilteredData = currentFilteredData.filter((item) =>
        item.part.toLowerCase().includes(partNameFilter.toLowerCase())
      );
    }

    if (searchBrand.trim()) {
      currentFilteredData = currentFilteredData.filter((item) =>
        item.brands.some((brand) =>
          brand.toLowerCase().includes(searchBrand.toLowerCase())
        )
      );
    }

    setFilteredData(currentFilteredData);
  }, [partNameFilter, searchBrand, vehicleType, partsData]);

  return (
    <div className="partsinfo-root">
      <div className="partsinfo-hero">
        <h1>🛠 Parts & Fluids</h1>
        <p className="partsinfo-muted">
          Search and explore recommended vehicle parts, brands, and specs.
        </p>
      </div>

      {/* Filters */}
      <div className="partsinfo-filters">
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="all">All Vehicles</option>
          <option value="4W">Cars (4W)</option>
          <option value="2W">Bikes (2W)</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Part Name"
          value={partNameFilter}
          onChange={(e) => setPartNameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Brand"
          value={searchBrand}
          onChange={(e) => setSearchBrand(e.target.value)}
        />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="partsinfo-loader">
          <div className="partsinfo-spinner"></div>
          <p>Fetching parts & fluids information...</p>
        </div>
      ) : (
        <div className="partsinfo-grid">
          {filteredData.length === 0 ? (
            <div className="partsinfo-empty">
              <p>No matching parts found. Try adjusting filters.</p>
            </div>
          ) : (
            filteredData.map((item, index) => (
              <div key={index} className="partsinfo-card">
                <h3>{item.part}</h3>
                <p className="partsinfo-type">{item.type}</p>

                <div className="partsinfo-meta">
                  <span>
                    <strong>Brands:</strong> {item.brands.join(", ")}
                  </span>
                  <span>
                    <strong>Price:</strong> {item.priceRange}
                  </span>
                  <span>
                    <strong>Spec:</strong> {item.spec}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div className="partsinfo-note">
        <p>
          NOTE: Original parts & fluids are also available at OEM service
          centers.
        </p>
      </div>
    </div>
  );
};

export default PartsInfo;
