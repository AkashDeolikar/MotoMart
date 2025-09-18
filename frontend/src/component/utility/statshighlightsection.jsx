import React, { useEffect, useRef, useState } from "react";
import "./StatsHighlightSection.css";

const VehicleStatCard = ({ end, label, index, iconName }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    let observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);

          const step = () => {
            start += increment;
            if (start < end) {
              setCount(Math.floor(start));
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div className="stats-card" id={`stat-card-${index}`} ref={cardRef}>
      <span className="material-symbols-outlined stats-icon">
        {iconName}
      </span>
      <h3 className="stats-count">{count.toLocaleString()}</h3>
      <p className="stats-label">{label}</p>
    </div>
  );
};

const StatsHighlightSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <VehicleStatCard
          end={500000000}
          label="2-Wheelers Operating Globally"
          index={0}
          iconName="two_wheeler"
        />
        <VehicleStatCard
          end={1500000000}
          label="4-Wheelers on Roads Worldwide"
          index={1}
          iconName="directions_car"
        />
        <VehicleStatCard
          end={80000000}
          label="Commercial & Large Vehicles"
          index={2}
          iconName="local_shipping"
        />
      </div>
    </section>
  );
};

export default StatsHighlightSection;
