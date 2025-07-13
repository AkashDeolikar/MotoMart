import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './VehicleShowcase.css';

const VehicleShowcase = ({ data }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    tl.fromTo(ref.current.querySelector('.vehicle-text'), { opacity: 0, y: 60 }, { opacity: 1, y: 0 });
    tl.fromTo(ref.current.querySelector('.vehicle-img'), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, "-=0.5");
  }, []);

  if (!data) return null; // ✅ Prevent error if data is undefined

  return (
    <section
      className="vehicle-showcase"
      style={{ backgroundColor: data.bgColor || '#0b0f1a' }} // fallback color
      ref={ref}
    >
      <div className="vehicle-content">
        <div className="vehicle-text">
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          <ul>
            {Object.entries(data.specs).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
          <button>Explore Model</button>
        </div>
        <img src={data.img} alt={data.title} className="vehicle-img" />
      </div>
    </section>
  );
};

export default VehicleShowcase;