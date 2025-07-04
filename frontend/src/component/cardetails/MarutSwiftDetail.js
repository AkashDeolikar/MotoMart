// // src/component/cardetails/SwiftDetail.jsx
// import React, { useState, useRef } from "react";
// import './Details.css';
// import './temp.css';

// const MarutSwiftDetail = () => {
//     const car = {
//         name: "Maruti Suzuki Swift",
//         price: "₹6.49 – ₹9.64 Lakh",
//         mileage: "22.38 – 30.90 km/l",
//         width: "1735 mm",
//         height: "1530 mm",
//         image: "https://www.marutisuzuki.com/js/arenabrandjs/threesixtyjs/img/red_black_dual_tone/suzuki_swift_ext_360_red_black_dual_tone_v-1_2.webp",
//         description:
//             "The Maruti Swift is a popular hatchback known for its sporty design, reliable performance, and excellent fuel efficiency.",
//         details: {
//             engine: {
//                 petrol: "1.2L Dual Jet VVT (90 PS, 113 Nm)",
//             },
//             transmission: "5MT / AMT",
//             fuelOptions: "Petrol & CNG",
//             safetyRating: "2 Stars (Global NCAP)",
//             features: [
//                 "7” Touchscreen SmartPlay Studio",
//                 "Android Auto & Apple CarPlay",
//                 "Dual Airbags, ABS with EBD",
//                 "LED DRLs & Projector Headlamps",
//                 "Idle Start Stop Technology",
//             ],
//             colorOptions: [
//                 { name: "Solid Fire Red", hex: "#b22222" },
//                 { name: "Midnight Blue", hex: "#191970" },
//                 { name: "Pearl Arctic White", hex: "#f8f8ff" },
//                 { name: "Magma Grey", hex: "#555555" },
//                 { name: "Luster Blue", hex: "#4169e1" },
//                 // "🔴 Solid Fire Red",
//                 // "🔵 Midnight Blue",
//                 // "⚪ Pearl Arctic White",
//                 // "⚫ Magma Grey",
//                 // "🔷 Luster Blue",
//             ],
//             segment: "Hatchback",
//             launched: "First: 2005, Latest Gen: 2018",
//             evAvailable: false,
//         },
//     };

//     //360 VIEW 
//     const totalImages = 71;
//     const [currentIndex, setCurrentIndex] = useState(1);
//     const isDragging = useRef(false);
//     const startX = useRef(0);
//     //For Desktop
//     const handleMouseDown = (e) => {
//         isDragging.current = true;
//         startX.current = e.clientX;
//     };

//     const handleMouseUp = () => {
//         isDragging.current = false;
//     };

//     const handleMouseMove = (e) => {
//         if (!isDragging.current) return;

//         const delta = e.clientX - startX.current;

//         if (Math.abs(delta) > 5) {
//             setCurrentIndex((prev) => {
//                 let newIndex = prev + (delta > 0 ? -1 : 1);
//                 if (newIndex < 1) newIndex = totalImages;
//                 if (newIndex > totalImages) newIndex = 1;
//                 return newIndex;
//             });
//             startX.current = e.clientX;
//         }
//     };
//     //For Mobile
//     const handleTouchStart = (e) => {
//         isDragging.current = true;
//         startX.current = e.touches[0].clientX;
//     };

//     const handleTouchMove = (e) => {
//         if (!isDragging.current) return;
//         const delta = e.touches[0].clientX - startX.current;

//         if (Math.abs(delta) > 15) { //5
//             setCurrentIndex((prev) => {
//                 let newIndex = prev + (delta > 0 ? -1 : 1);
//                 if (newIndex < 1) newIndex = totalImages;
//                 if (newIndex > totalImages) newIndex = 1;
//                 return newIndex;
//             });
//             startX.current = e.touches[0].clientX;
//         }
//     };

//     const handleTouchEnd = () => {
//         isDragging.current = false;
//     };

//     return (
//         <div className="ak">
//             <div className="swiftbox">
//                 <div className="vr-360-exterior">
//                     <div className="section-inner">
//                         <div className="titArea pvreTitArea">
//                             <h3 className="subTitM alignC">360° Experience</h3>
//                             <div className="conAreaM alignC">
//                                 Click and turn the vehicle image to the left or right.
//                             </div>
//                         </div>
//                         <div className="experiencePanoramaBox exterior">
//                             <div
//                                 className="panorama loadingEnd"
//                                 style={{
//                                     position: "relative",
//                                     margin: "0px auto",
//                                     padding: "0px",
//                                     height: "425px",
//                                     width: "1120px",
//                                     overflow: "hidden",
//                                     cursor: "grab",
//                                 }}
//                                 //for desktop
//                                 onMouseDown={handleMouseDown}
//                                 onMouseUp={handleMouseUp}
//                                 onMouseLeave={handleMouseUp}
//                                 onMouseMove={handleMouseMove}
//                                 //for mobile
//                                 onTouchStart={handleTouchStart}
//                                 onTouchMove={handleTouchMove}
//                                 onTouchEnd={handleTouchEnd}

//                             >
//                                 {[...Array(totalImages)].map((_, i) => {
//                                     const index = i + 1;
//                                     return (
//                                         <img
//                                             key={index}
//                                             className={`panoVues vue${index}`}
//                                             // src={`/images/creta/abyss-black_${index}.png`} // ✅ Now correct
//                                             src={`/images/swift/SUZUKI_SWIFT_EXT_360_RED_V-1_${index}.webp`}
//                                             style={{
//                                                 visibility: index === currentIndex ? "visible" : "hidden",
//                                                 position: "absolute",
//                                                 top: 0,
//                                                 left: 0,
//                                             }}
//                                             width="1120"
//                                             height="425"
//                                             // width="560"
//                                             // height="212 "
//                                             alt={`swift-view-${index}`}
//                                         />
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* DETAILS */}
//             <div className="car-detail" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
//                 <h1>{car.name}</h1>
//                 {/* <img src={car.image} alt={car.name} style={{ width: "300px" }} /> */}
//                 <p><strong>Price:</strong> {car.price}</p>
//                 <p><strong>Mileage:</strong> {car.mileage}</p>
//                 <p><strong>Width:</strong> {car.width}</p>
//                 <p><strong>Height:</strong> {car.height}</p>
//                 <p>{car.description}</p>

//                 <h2>Specifications</h2>
//                 <p><strong>Engine (Petrol):</strong> {car.details.engine.petrol}</p>
//                 <p><strong>Transmission:</strong> {car.details.transmission}</p>
//                 <p><strong>Fuel:</strong> {car.details.fuelOptions}</p>
//                 <p><strong>Safety Rating:</strong> {car.details.safetyRating}</p>
//                 <p><strong>Segment:</strong> {car.details.segment}</p>
//                 <p><strong>Launched:</strong> {car.details.launched}</p>
//                 <p><strong>EV Variant Available:</strong> {car.details.evAvailable ? "Yes" : "No"}</p>

//                 <h3>Key Features</h3>
//                 <ul>
//                     {car.details.features.map((feature, index) => (
//                         <li key={index}>✅ {feature}</li>
//                     ))}
//                 </ul>

//                 {/* <h3>Available Colors</h3>
//             <ul>
//                 {car.details.colorOptions.map((color, index) => (
//                     <li key={index}>{color}</li>
//                 ))}
//             </ul> */}
//                 <h3>Available Colors</h3>
//                 <div className="hexx" style={{ display: "flex", gap: "2.0rem", flexWrap: "wrap", marginTop: "1rem" }}>
//                     {car.details.colorOptions.map((c, index) => (
//                         <div key={index} style={{ textAlign: "center" }}>
//                             <ul>
//                                 <div
//                                     style={{
//                                         backgroundColor: c.hex,
//                                         width: "40px",
//                                         height: "40px",
//                                         borderRadius: "50%",
//                                         border: "1px solid #ccc",
//                                         marginBottom: "0.5rem",
//                                     }}
//                                 ></div>
//                             </ul>
//                             <small>{c.name}</small>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MarutSwiftDetail;

// src/component/cardetails/MarutSwiftDetail.js


// src/component/cardetails/MarutSwiftDetail.js
import React, { useState, useRef } from "react";
import './Details.css';
import './temp.css';

const MarutSwiftDetail = () => {
  const car = {
    name: "Maruti Suzuki Swift",
    price: "₹6.49 – ₹9.64 Lakh",
    mileage: "22.38 – 30.90 km/l",
    width: "1735 mm",
    height: "1530 mm",
    image: "https://www.marutisuzuki.com/js/arenabrandjs/threesixtyjs/img/red_black_dual_tone/suzuki_swift_ext_360_red_black_dual_tone_v-1_2.webp",
    description:
      "The Maruti Swift is a popular hatchback known for its sporty design, reliable performance, and excellent fuel efficiency. It continues to attract young buyers due to its compact size, stylish looks, and fun-to-drive nature.",
    details: {
      engine: {
        petrol: "1.2L Dual Jet VVT (90 PS, 113 Nm)",
      },
      transmission: "5-speed Manual / 5-speed AMT",
      fuelOptions: "Petrol, Petrol+CNG",
      safetyRating: "2 Stars (Global NCAP)",
      segment: "Hatchback",
      launched: "First: 2005, Latest Gen: 2018",
      evAvailable: false,
      variants: ["LXI", "VXI", "ZXI", "ZXI+", "VXI AMT", "ZXI AMT", "CNG VXI"],
      performance: {
        topSpeed: "165 km/h",
        acceleration: "0–100 km/h in 12.6 seconds"
      },
      comfort: [
        "Automatic Climate Control",
        "Push Start/Stop",
        "Rear AC Vents",
        "Height Adjustable Driver Seat",
        "Steering Mounted Controls"
      ],
      infotainment: [
        "7-inch Touchscreen SmartPlay Studio",
        "Android Auto & Apple CarPlay",
        "Voice Command",
        "Bluetooth, USB, AUX Connectivity"
      ],
      safetyFeatures: [
        "Dual Front Airbags",
        "ABS with EBD",
        "Rear Parking Sensors",
        "ISOFIX Child Seat Mounts",
        "Speed Sensing Auto Door Lock"
      ],
      pros: [
        "Stylish and sporty design",
        "Refined petrol engine with good mileage",
        "Excellent resale value",
        "Compact and city-friendly"
      ],
      cons: [
        "Rear seat space is tight",
        "Only 2-star safety rating",
        "No diesel engine option"
      ],
      competitors: ["Hyundai Grand i10 Nios", "Tata Tiago", "Renault Kwid", "Citroen C3"],
      colorOptions: [
        { name: "Solid Fire Red", hex: "#b22222" },
        { name: "Midnight Blue", hex: "#191970" },
        { name: "Pearl Arctic White", hex: "#f8f8ff" },
        { name: "Magma Grey", hex: "#555555" },
        { name: "Luster Blue", hex: "#4169e1" },
        { name: "Sizzling Red + Black Roof", hex: "#8B0000" },
      ]
    }
  };

  const totalImages = 71;
  const [currentIndex, setCurrentIndex] = useState(1);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 5) {
      setCurrentIndex(prev => (prev + (delta > 0 ? -1 : 1) - 1 + totalImages) % totalImages + 1);
      startX.current = e.clientX;
    }
  };
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientX - startX.current;
    if (Math.abs(delta) > 15) {
      setCurrentIndex(prev => (prev + (delta > 0 ? -1 : 1) - 1 + totalImages) % totalImages + 1);
      startX.current = e.touches[0].clientX;
    }
  };
  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="swift-detail-wrapper">
      <div className="car360-section">
        <h3 className="subTitM alignC">360° Experience</h3>
        <p className="conAreaM alignC">Click and turn the vehicle image to the left or right.</p>
        <div className="car360-box">
          <div
            className="car360-panorama"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {[...Array(totalImages)].map((_, i) => (
              <img
                key={i}
                className={`car360-frame vue${i + 1}`}
                src={`/images/swift/SUZUKI_SWIFT_EXT_360_RED_V-1_${i + 1}.webp`}
                alt={`swift-view-${i + 1}`}
                style={{ visibility: i + 1 === currentIndex ? "visible" : "hidden" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="car-detail-section">
        <h1>{car.name}</h1>
        <p><strong>Price:</strong> {car.price}</p>
        <p><strong>Mileage:</strong> {car.mileage}</p>
        <p><strong>Dimensions:</strong> {car.width} (W) × {car.height} (H)</p>
        <p>{car.description}</p>

        <h2>Variants</h2>
        <ul>{car.details.variants.map((v, i) => <li key={i}>{v}</li>)}</ul>

        <h2>Performance</h2>
        <p><strong>Top Speed:</strong> {car.details.performance.topSpeed}</p>
        <p><strong>0–100 km/h:</strong> {car.details.performance.acceleration}</p>

        <h2>Comfort & Convenience</h2>
        <ul>{car.details.comfort.map((c, i) => <li key={i}>🛋️ {c}</li>)}</ul>

        <h2>Infotainment</h2>
        <ul>{car.details.infotainment.map((iF, i) => <li key={i}>🎵 {iF}</li>)}</ul>

        <h2>Safety Features</h2>
        <ul>{car.details.safetyFeatures.map((s, i) => <li key={i}>🛡️ {s}</li>)}</ul>

        <h2>Pros</h2>
        <ul>{car.details.pros.map((pro, i) => <li key={i}>✅ {pro}</li>)}</ul>

        <h2>Cons</h2>
        <ul>{car.details.cons.map((con, i) => <li key={i}>❌ {con}</li>)}</ul>

        <h2>Competitors</h2>
        <ul>{car.details.competitors.map((rival, i) => <li key={i}>⚔️ {rival}</li>)}</ul>

        <h2>Available Colors</h2>
        <div className="color-swatches">
          {car.details.colorOptions.map((c, i) => (
            <div key={i}>
              <div style={{
                backgroundColor: c.hex,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid #ccc",
                marginBottom: "0.5rem"
              }}></div>
              <small>{c.name}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarutSwiftDetail;
