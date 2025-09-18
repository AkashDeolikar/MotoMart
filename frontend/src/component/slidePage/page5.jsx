import React, { useState, useEffect } from "react";
import "./page5.css";
import AOS from "aos";
import "aos/dist/aos.css";

import JaguarLoading from "../slidePage/Jaguarloading.jpg";
import RangeRoverLoading from "../slidePage/Range-Roverloading.jpg";
import bmwloading from "../slidePage/bmwloading.jpg";
import mercedesloading from "../slidePage/mercedesloading.jpg";

const Page5 = () => {
  const [loadingBrand, setLoadingBrand] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleClick = (brand, url) => {
    setLoadingBrand(brand);
    setTimeout(() => (window.location.href = url), 1200);
  };

  const brands = [
    {
      name: "Jaguar",
      desc: "A new era of electric performance. Dramatic design, exhilarating drive, and uncompromising luxury.",
      img: JaguarLoading,
      url: "/jaguar",
    },
    {
      name: "Land Rover",
      desc: "Vehicles at the pinnacle of elegance. A perfect blend of opulent comfort and all-terrain adventure.",
      img: RangeRoverLoading,
      url: "/rover",
    },
    {
      name: "BMW",
      desc: "Precision engineering and pure driving pleasure. German innovation for every journey.",
      img: bmwloading,
      url: "/bmw",
    },
    {
      name: "Mercedes-Benz",
      desc: "Iconic design and cutting-edge technology redefining modern luxury and safety.",
      img: mercedesloading,
      url: "/mercedes",
    },
  ];

  return (
    <div className="page5">
      {/* Hero */}
      <section className="page5-hero">
        <h1>Luxury vehicles reimagined</h1>
        <p>
          Discover iconic brands shaping the future of mobility with
          performance, design, and innovation.
        </p>
        <a href="/luxury" target="_blank" className="btn-primary">
          Discover
        </a>
      </section>

      {/* Brands */}
      <section className="page5-grid">
        {brands.map((b, i) => (
          <div
            className={`page5-row ${i % 2 === 1 ? "reverse" : ""}`}
            key={b.name}
            data-aos="fade-up"
          >
            <div className="page5-image">
              <img src={b.img} alt={b.name} />
            </div>
            <div className="page5-text">
              {loadingBrand === b.name ? (
                <p className="loading">Loading {b.name}...</p>
              ) : (
                <>
                  <h2>{b.name}</h2>
                  <p>{b.desc}</p>
                  <button
                    className="btn-outline"
                    onClick={() => handleClick(b.name, b.url)}
                  >
                    Visit Website
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Highlight */}
      <section className="page5-highlight">
        <h3>Premium Collection</h3>
        <p>
          Explore our exclusive lineup of{" "}
          <strong>premium cars</strong> handpicked for enthusiasts &
          connoisseurs.
        </p>
        <a href="/luxuryvh" className="btn-primary">
          View Collection
        </a>
      </section>
    </div>
  );
};

export default Page5;
