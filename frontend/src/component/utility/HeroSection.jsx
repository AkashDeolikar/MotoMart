import React, { useState, useEffect } from "react";
import "./HeroSection.css";

const slides = [
  {
    id: 1,
    title: "Experience the Future of Driving",
    subtitle: "Luxury, performance, and innovation—all in one place.",
    img: "https://img.staticmb.com/mbcontent/images/crop/uploads/2025/1/Expressways-in-Ahmedabad_0_1200.jpg.webp",
    link: "/home",
    cta: "Shop Cars",
  },
  {
    id: 2,
    title: "Electric Sedan X",
    subtitle: "Long range, fast charging, and sustainable.",
    img: "https://st.arenaev.com/news/23/01/geely-launches-new-electric-car-series-with-sedan-to-come-first/inline/-1200/arenaev_003.jpg",
    link: "/evvh",
    cta: "Explore Cars",
  },
  {
    id: 3,
    title: "Flagship Car 2025",
    subtitle: "AI-powered, ultra-fast, and eco-friendly.",
    img: "https://radii.co/wp-content/uploads/2025/07/radii-xiaomi-yu7-suv-ev-000.jpg",
    link: "/luxuryvh",
    cta: "Learn More",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {/* Carousel */}
      <div className="hero__carousel">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero__slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="hero__overlay">
              <h1 className="hero__banner-title">{slide.title}</h1>
              <p className="hero__banner-subtitle">{slide.subtitle}</p>
              <a href={slide.link} className="hero__banner-btn">
                {slide.cta}
              </a>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="hero__dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`hero__dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Below Banner Content */}
      <div className="hero__container">
        <div className="hero__text">
          <h2 className="hero__title">Your Dream Ride, Simplified</h2>
          <p className="hero__subtitle">
            Explore, compare, and shop the latest <strong>cars</strong> and{" "}
            <strong>bikes</strong> with 360° views, EMI options, and exclusive
            deals.
          </p>
          <div className="hero__actions">
            <a href="/cars" className="hero__btn hero__btn--primary">
              Explore Cars
            </a>
            <a href="/bikes" className="hero__btn hero__btn--secondary">
              Explore Bikes
            </a>
          </div>
        </div>

        <div className="hero__products">

          {/* CNG & Hybrid Cars */}
          <div className="hero__card">
            <img
              src="/infotabs/cng.webp"
              loading="lazy"
              alt="CNG Car"
              className="hero__card-img"
              style={{ width: "60px", height: "60px" }}
            />
            <div className="hero__card-info">
              <h3 className="hero__card-title">CNG & Hybrid Cars</h3>
              <p className="hero__card-desc">
                Affordable running costs with CNG + hybrids giving 25–28 kmpl.
                A practical choice for Indian families.
              </p>
              <a href="https://en.wikipedia.org/wiki/Maruti_Suzuki#Hybrid_and_EV_strategy"
                className="hero__card-link"
                target="_blank" rel="noopener noreferrer">
                Learn More →
              </a>
            </div>
          </div>

          {/* Two-Wheeler EVs */}
          <div className="hero__card">
            <img
              src="/infotabs/escooter.webp"
              loading="lazy"
              alt="Ola Electric Scooter"
              className="hero__card-img"
              style={{ width: "60px", height: "60px" }}
            />
            <div className="hero__card-info">
              <h3 className="hero__card-title">Electric Scooters</h3>
              <p className="hero__card-desc">
                Save fuel costs with EV scooters like Ola S1 & TVS iQube.
                Low maintenance and perfect for cities.
              </p>
              <a href="https://en.wikipedia.org/wiki/Ola_Electric#Products"
                className="hero__card-link"
                target="_blank" rel="noopener noreferrer">
                Explore →
              </a>
            </div>
          </div>

          {/* Safety Tech */}
          <div className="hero__card">
            <img
              src="/infotabs/5star.webp"
              loading="lazy"
              alt="Tata Nexon Safety"
              className="hero__card-img"
              style={{ width: "100px", height: "60px" }}
            />
            <div className="hero__card-info">
              <h3 className="hero__card-title">5-Star Safety Cars</h3>
              <p className="hero__card-desc">
                Safer cars like Tata Nexon & Mahindra XUV300 with
                Global NCAP 5-star ratings for family protection.
              </p>
              <a href="https://en.wikipedia.org/wiki/Tata_Nexon#Safety"
                className="hero__card-link"
                target="_blank" rel="noopener noreferrer">
                Discover →
              </a>
            </div>
          </div>

          {/* Affordable EV Cars */}
          <div className="hero__card">
            <img
              src="/infotabs/ecar.webp"
              loading="lazy"
              alt="Tata Nexon EV"
              className="hero__card-img"
              style={{ width: "60px", height: "60px" }}
            />
            <div className="hero__card-info">
              <h3 className="hero__card-title">Affordable EV Cars</h3>
              <p className="hero__card-desc">
                EV cars like Tata Nexon EV & MG Comet reduce fuel spend
                and are eligible for govt subsidies.
              </p>
              <a href="https://en.wikipedia.org/wiki/Tata_Nexon#Electric_version"
                className="hero__card-link"
                target="_blank" rel="noopener noreferrer">
                More Info →
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Promo Bar */}
      <div className="hero__promos">
        <span className="hero__promo">On-Road Price Calculator</span>
        <span className="hero__promo">Compare Multiple Vehicles</span>
        <span className="hero__promo">360° Virtual Tour</span>
      </div>
    </section>
  );
};

export default HeroSection;
