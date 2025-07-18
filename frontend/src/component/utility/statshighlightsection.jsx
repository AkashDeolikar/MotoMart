import React, { useEffect, useRef, useState } from 'react';
import './StatsHighlightSection.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Reusable card with scroll-triggered count-up animation
const VehicleStatCard = ({ end, label, index }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const element = cardRef.current;
    let triggered = false;

    // Create ScrollTrigger instance for count-up animation
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        if (triggered) return;
        triggered = true;

        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 15);

        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            clearInterval(counter);
            setCount(end);
          } else {
            setCount(Math.floor(start));
          }
        }, 30);
      },
      once: true,
    });

    return () => {
      trigger.kill(); // ✅ cleanup ScrollTrigger
    };
  }, [end]);

  const formatNumber = (num) => {
    if (end >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B+`;
    if (end >= 1_000_000) return `${(num / 1_000_000).toFixed(0)}M+`;
    return num;
  };

  return (
    <div className="statsreportmechanism__card" id={`stat-card-${index}`} ref={cardRef}>
      <h3 className="statsreportmechanism__count">{formatNumber(count)}</h3>
      <p className="statsreportmechanism__label">{label}</p>
    </div>
  );
};

// Main section wrapper
const StatsHighlightSection = () => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 480;

    if (isMobile) {
      const cards = gsap.utils.toArray('.statsreportmechanism__card');

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse',
              markers: false,
            },
            duration: 0.6,
            ease: 'power2.out',
          }
        );
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
//     const increment = end / (duration / 20);

//     const counter = setInterval(() => {
//       start += increment;
//       if (start >= end) {
//         clearInterval(counter);
//         setCount(end);
//       } else {
//         setCount(Math.round(start));
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
//     const cards = gsap.utils.toArray('.statsreportmechanism__card');

//     if (isMobile && cards.length > 0) {
//       cards.forEach((card, index) => {
//         gsap.set(card, {
//           zIndex: cards.length - index,
//           opacity: 1,
//         });

//         gsap.to(card, {
//           opacity: 0,
//           scrollTrigger: {
//             trigger: card,
//             start: 'top top',
//             end: '+=100%',
//             scrub: true,
//             pin: true,
//             pinSpacing: false,
//           },
//         });
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


