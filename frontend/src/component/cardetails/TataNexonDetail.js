import React, { useState, useRef } from "react";
import './Details.css';
import './temp.css';

const TataNexonDetail = () => {
  const car = {
    name: "Tata Nexon",
    price: "₹8.10 – ₹15.50 Lakh",
    mileage: "17.4 – 24.0 km/l",
    width: "1804 mm",
    height: "1620 mm",
    description:
      "Tata Nexon is a stylish and compact SUV offering strong performance, top-tier safety (5-star GNCAP), and a feature-rich cabin. Available in petrol and diesel with manual, AMT, and DCT options.",
    image: "https://w7.pngwing.com/pngs/696/785/png-transparent-tata-motors-car-tata-nexon-xza-petrol-maruti-suzuki-vitara-brezza-tata-nexon-thumbnail.png",
    details: {
      engine: {
        petrol: "1.2L Turbo Revotron, 3 Cylinder",
        diesel: "1.5L Revotorq, 4 Cylinder",
        powerPetrol: "120 PS @ 5500 rpm",
        torquePetrol: "170 Nm @ 1750-4000 rpm",
        powerDiesel: "115 PS @ 3750 rpm",
        torqueDiesel: "260 Nm @ 1500-2750 rpm"
      },
      transmission: "5MT / 6MT / AMT / 7DCA",
      fuelOptions: "Petrol & Diesel",
      mileage: "Petrol: 17.44–19.4 km/l | Diesel: 23.23–24.08 km/l",
      topSpeed: "Approx 180 km/h",
      acceleration: "0–100 km/h in ~11.5s",
      dimensions: {
        length: "3995 mm",
        width: "1804 mm",
        height: "1620 mm",
        wheelbase: "2498 mm",
        groundClearance: "209 mm",
        bootSpace: "382 Litres",
        fuelTank: "44 Litres",
        kerbWeight: "1185–1305 kg"
      },
      interior: [
        "10.25” Touchscreen Infotainment",
        "Wireless Android Auto & Apple CarPlay",
        "Ventilated Front Seats",
        "Premium Fabric Upholstery",
        "Digital TFT Cluster",
        "iRA Connected Tech"
      ],
      exterior: [
        "Projector Headlamps with LED DRLs",
        "Alloy Wheels",
        "Electric Sunroof",
        "LED Tail Lamps",
        "Dual-tone Color Options"
      ],
      safety: [
        "6 Airbags",
        "ABS with EBD",
        "ESP, Hill Hold Control",
        "TPMS",
        "ISOFIX Mounts",
        "5 Star GNCAP Rating"
      ],
      adas: [
        "360° Camera",
        "Reverse Parking Sensors",
        "Rear Parking Camera",
        "Auto Headlamps & Rain Sensing Wipers"
      ]
    }
  };

  const totalImages = 34;
  const [currentIndex, setCurrentIndex] = useState(1);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e) => { isDragging.current = true; startX.current = e.clientX; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 5) {
      setCurrentIndex(prev => (prev + (delta > 0 ? -1 : 1) - 1 + totalImages) % totalImages + 1);
      startX.current = e.clientX;
    }
  };
  const handleTouchStart = (e) => { isDragging.current = true; startX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientX - startX.current;
    if (Math.abs(delta) > 15) {
      setCurrentIndex(prev => (prev + (delta > 0 ? -1 : 1) - 1 + totalImages) % totalImages + 1);
      startX.current = e.touches[0].clientX;
    }
  };
  const handleTouchEnd = () => { isDragging.current = false; };

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
                src={`/images/nexon/PureGrey-${i + 1}.png`}
                alt={`nexon-view-${i + 1}`}
                style={{ visibility: i + 1 === currentIndex ? "visible" : "hidden" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="car-detail-section">
        <h1>{car.name}</h1>
        <p><strong>Price:</strong> {car.price}</p>
        <p>{car.description}</p>

        <h2>Fuel & Engine</h2>
        <p><strong>Petrol Engine:</strong> {car.details.engine.petrol}</p>
        <p><strong>Power:</strong> {car.details.engine.powerPetrol}</p>
        <p><strong>Torque:</strong> {car.details.engine.torquePetrol}</p>
        <p><strong>Diesel Engine:</strong> {car.details.engine.diesel}</p>
        <p><strong>Power:</strong> {car.details.engine.powerDiesel}</p>
        <p><strong>Torque:</strong> {car.details.engine.torqueDiesel}</p>

        <h2>Transmission</h2>
        <p>{car.details.transmission}</p>

        <h2>Fuel & Performance</h2>
        <p><strong>Mileage:</strong> {car.details.mileage}</p>
        <p><strong>Top Speed:</strong> {car.details.topSpeed}</p>
        <p><strong>0–100 km/h:</strong> {car.details.acceleration}</p>

        <h2>Dimensions</h2>
        {Object.entries(car.details.dimensions).map(([key, value]) => (
          <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>{value}</p>
        ))}

        <h2>Interior</h2>
        <ul>{car.details.interior.map((item, i) => <li key={i}>✅ {item}</li>)}</ul>

        <h2>Exterior</h2>
        <ul>{car.details.exterior.map((item, i) => <li key={i}>✅ {item}</li>)}</ul>

        <h2>Safety</h2>
        <ul>{car.details.safety.map((item, i) => <li key={i}>✅ {item}</li>)}</ul>

        <h2>ADAS Features</h2>
        <ul>{car.details.adas.map((item, i) => <li key={i}>✅ {item}</li>)}</ul>
      </div>
    </div>
  );
};

export default TataNexonDetail;
