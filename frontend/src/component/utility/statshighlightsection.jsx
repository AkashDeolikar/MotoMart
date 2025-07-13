// import React, { useEffect, useState } from 'react';
// import './StatsHighlightSection.css';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const VehicleStatCard = ({ end, label, index }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const duration = 2000;
//     const increment = end / (duration / 30);

//     const counter = setInterval(() => {
//       start += increment;
//       if (start >= end) {
//         clearInterval(counter);
//         setCount(end);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 30);

//     return () => clearInterval(counter);
//   }, [end]);

//   const formatNumber = (num) => {
//     if (end >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B+`;
//     if (end >= 1_000_000) return `${(num / 1_000_000).toFixed(0)}M+`;
//     return num;
//   };

//   return (
//     <div className="statsreportmechanism__card" id={`stat-card-${index}`}>
//       <h3 className="statsreportmechanism__count">{formatNumber(count)}</h3>
//       <p className="statsreportmechanism__label">{label}</p>
//     </div>
//   );
// };

// const StatsHighlightSection = () => {
//   useEffect(() => {
//     const isMobile = window.innerWidth <= 480;

//     if (isMobile) {
//       const cards = gsap.utils.toArray('.statsreportmechanism__card');

//       cards.forEach((card, index) => {
//         gsap.fromTo(card,
//           { opacity: 0, y: 50 },
//           {
//             opacity: 1,
//             y: 0,
//             scrollTrigger: {
//               trigger: card,
//               start: 'top 80%',
//               end: 'bottom 60%',
//               toggleActions: 'play none none reverse',
//               markers: false,
//             },
//             duration: 0.6,
//             ease: 'power2.out',
//           }
//         );
//       });
//     }
//   }, []);

//   return (
//     <section className="statsreportmechanism">
//       <div className="statsreportmechanism__container">
//         <VehicleStatCard end={500_000_000} label="2-Wheelers Operating Globally" index={0} />
//         <VehicleStatCard end={1_500_000_000} label="4-Wheelers on Roads Worldwide" index={1} />
//         <VehicleStatCard end={80_000_000} label="Commercial & Large Vehicles" index={2} />
//       </div>
//     </section>
//   );
// };

// export default StatsHighlightSection;

import React, { useEffect, useState } from 'react';
import './StatsHighlightSection.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VehicleStatCard = ({ end, label, index }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 30);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(counter);
        setCount(end);
      } else {
        setCount(Math.round(start));
      }
    }, 30);

    return () => clearInterval(counter);
  }, [end]);

  const formatNumber = (num) => {
    if (end >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B+`;
    if (end >= 1_000_000) return `${(num / 1_000_000).toFixed(0)}M+`;
    return num;
  };

  return (
    <div className="statsreportmechanism__card" id={`stat-card-${index}`}>
      <h3 className="statsreportmechanism__count">{formatNumber(count)}</h3>
      <p className="statsreportmechanism__label">{label}</p>
    </div>
  );
};

const StatsHighlightSection = () => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 480;
    const cards = gsap.utils.toArray('.statsreportmechanism__card');

    if (isMobile) {
      cards.forEach((card, index) => {
        gsap.set(card, {
          top: `${index * 100}vh`,
        });

        const scale = index === cards.length - 1 ? 1 : 0.85;

        gsap.to(card, {
          scale: scale,
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: `+=${window.innerHeight}`,
            pin: true,
            pinSpacing: false,
            scrub: 0.5,
          },
        });
      });
    }
  }, []);

  return (
    <section className="statsreportmechanism">
      <div className="statsreportmechanism__container">
        <VehicleStatCard end={500_000_000} label="2-Wheelers Operating Globally" index={0} />
        <VehicleStatCard end={1_500_000_000} label="4-Wheelers on Roads Worldwide" index={1} />
        <VehicleStatCard end={80_000_000} label="Commercial & Large Vehicles" index={2} />
      </div>
    </section>
  );
};

export default StatsHighlightSection;
