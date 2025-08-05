import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./GearCSS/HelmetStore.css";

const HelmetStore = () => {
    const [loading, setLoading] = useState(true);
    const [helmets, setHelmets] = useState([]);
    const [filteredHelmets, setFilteredHelmets] = useState([]);
    const [sortOrder, setSortOrder] = useState("high");
    const [brandFilter, setBrandFilter] = useState("All");

    useEffect(() => {
        axios.get('https://motomartbackend.onrender.com/api/helmets')
            .then(res => {
                setHelmets(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching jackets:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        applyFilters(helmets, sortOrder, brandFilter);
    }, [sortOrder, brandFilter]);

    const applyFilters = (data, sort, brand) => {
        let result = [...data];
        if (brand !== "All") {
            result = result.filter((helmet) => helmet.brand === brand);
        }
        result.sort((a, b) =>
            sort === "high" ? b.price_inr - a.price_inr : a.price_inr - b.price_inr
        );
        setFilteredHelmets(result);
    };

    // Extract unique brands for dropdown
    const uniqueBrands = ["All", ...new Set(helmets.map((h) => h.brand))];

    return (
        <section>
            {loading ? (
                <div className="gear-loader">
                    <div className="gear-spinner"></div>
                    <p>Loading Helmets...</p>
                </div>
            ) : (
                <div className="helmet-store-container">
                    <h1>Helmets</h1>

                    {/* Filters */}

                    <div className="filters-wrapper">
                        <div className="sort-section">
                            <label>Sort by:</label>
                            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="high">Price (High to Low)</option>
                                <option value="low">Price (Low to High)</option>
                            </select>
                        </div>

                        <div className="sort-section">
                            <label>Brand:</label>
                            <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                                {uniqueBrands.map((brand) => (
                                    <option key={brand} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Helmet Cards */}
                    <div className="helmet-grid">
                        {filteredHelmets.map((helmet) => (
                            <div key={helmet.id} className="helmet-card">
                                <img src={helmet.image} alt={helmet.name} />
                                <div className="helmet-info">
                                    <p className="brand">{helmet.brand}</p>
                                    <h3 className="name">{helmet.name}</h3>
                                    <p className="price">M.R.P.: ₹ {helmet.price_inr}</p>
                                    {helmet.link && (
                                        <a href={helmet.link} target="_blank" rel="noopener noreferrer">
                                            <button className="buy-btn">BUY NOW</button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default HelmetStore;
