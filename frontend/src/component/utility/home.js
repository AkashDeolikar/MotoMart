import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './home.css';
import './tab.css'; 
import './homecard.css'//for CardBox and slider horizontal

// import { SlArrowRight } from "react-icons/sl";
// import { VscFeedback } from "react-icons/vsc";
// import { useNavigate } from 'react-router-dom';
export const vehicleData = [
  {
    manufacturer: '4-Wheeler',
    idPrefix: '4-Wheeler',
    vehicles: [
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://www.carlogos.org/logo/Suzuki-logo-640x425.jpg",
        description: "SUZUKI",
      },
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://www.carlogos.org/car-logos/hyundai-logo-2011-640.png",
        description: "HYUNDAI",
      },
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://www.carlogos.org/logo/Renault-logo-2015-640x550.jpg",
        description: "RENAULT",
      },
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://www.carlogos.org/car-logos/bmw-logo-2020-gray.png",
        description: "BMW",
      },
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://www.carlogos.org/logo/Volkswagen-logo-2019-640x500.jpg",
        description: "VALKSWAGEN",
      },
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://www.carlogos.org/logo/Tata-logo-2000-640x550.jpg",
        description: "TATA",
      },
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://www.carlogos.org/car-logos/toyota-logo-2005-download.png",
        description: "TOYOTA",
      },
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://www.carlogos.org/logo/Mahindra-logo-640x316.jpg",
        description: "MAHINDRA",
      },
    ]
  },
  {
    manufacturer: '2-Wheeler',
    idPrefix: '2-Wheeler',
    vehicles: [
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://www.bikerspad.com/cdn/shop/collections/png-transparent-royal-enfield-logo-enfield-cycle-co-ltd-motorcycle-logo-royal-enfield-bicycle-royal-emblem-text-label.png?v=1651684842",
        description: "ROYAL ENFIELD",
      },
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://i.pinimg.com/736x/8b/e8/e5/8be8e5432419e9a984a3ab3fd3792905.jpg",
        description: "BAJAJ",
      },
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://1000logos.net/wp-content/uploads/2020/07/TVS-Motor-Logo.jpg",
        description: "TVS",
      },
      {
        id: 'royal-enfield-classic-350',
        videoPoster: "https://animationvisarts.com/wp-content/uploads/2023/12/image-11-1030x334.png",
        description: "HERO",
      },{
        id: 'royal-enfield-classic-350',
        videoPoster: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Yamaha_Motor_Logo_%28full%29.svg/2560px-Yamaha_Motor_Logo_%28full%29.svg.png",
        description: "YAMAHA",
      },{
        id: 'royal-enfield-classic-350',
        videoPoster: "https://download.logo.wine/logo/Honda/Honda-Logo.wine.png",
        description: "HONDA",
      },{
        id: 'royal-enfield-classic-350',
        videoPoster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYVNcHT89onLkVVCUGFUrAtLkr7ytsifda_g&s",
        description: "SUZUKI",
        // buttonText: "View Details",
      },
    ]
  },
]

const Home = () => {
  const featuredCars = [
    { id: 1, name: "Maruti Suzuki Swift", price: "5.99 Lakh", image: "./images/swift/SUZUKI_SWIFT_EXT_360_RED_V-1_5.webp" },
    { id: 2, name: "Hyundai Creta", price: "10.87 Lakh", image: "./images/creta/abyss-black_7.png" },
    { id: 3, name: "Tata Nexon", price: "8.15 Lakh", image: "./images/nexon/PureGrey-0.png" },
    { id: 4, name: "Suzuki Ertiga", price: "9.50 Lakh", image: "./images/ertiga/ertiga.png" },
    { id: 5, name: "Renault Kwid", price: "3.50 Lakh", image: "./images/renault/renault.png" },
    { id: 6, name: "Toyota Innova", price: "17.50 Lakh", image: "https://www.jansatta.com/wp-content/uploads/2019/03/toyota-innova-crysta-small-2.jpg?w=440" },
  ];

  const offers = [
    {
      id: 1,
      title: "No Cost EMI",
      description: "Plus ₹8000 cashback on selected models",
      image: require('../Assets/emi.png'),
    },
    {
      id: 2,
      title: "Best Maintainance Service",
      description: "Authorized and geniune service centre accross country",
      image: require('../Assets/service.png'),
    },
    {
      id: 3,
      title: "24*7 Connect",
      description: "For support our team always be ready for you help 😊",
      image: require('../Assets/247.png'),
    }
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3) % featuredCars.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 3 + featuredCars.length) % featuredCars.length);
  };

  const visibleCars = [
    featuredCars[startIndex],
    featuredCars[(startIndex + 1) % featuredCars.length],
    featuredCars[(startIndex + 2) % featuredCars.length],
  ];

  //word auto typing 
  const typingWords = ["To Automobile", "To Revolution", "To Dream Drive"];
  const [currentWord, setCurrentWord] = useState(0);

  const carRouteMap = {
    "Maruti Suzuki Swift": "/swift",
    "Hyundai Creta": "/creta",
    "Tata Nexon": "/nexon",
    "Suzuki Ertiga": "/ertiga",
    "Renault Kwid": "/omni",
    "Toyota Innova": "/innova",
  };

  //
  // const navigate = useNavigate();

  // const handleFeedbackClick = () => {
  //   console.log('Feedback button clicked!');
  //   navigate('/feedback');
  // };

  // const handleActionButtonClick = (vehicleId) => {
  //   console.log(`Action button clicked for vehicle: ${vehicleId}`);
  //   navigate(`/Carcard/${vehicleId}`);
  // };
  const renderVehicleCard = (vehicle) => (
      <div className="card-containerHome" key={vehicle.id}>
        <div className="video-sectionHome">
          <section>
            {/* Note: In Seeoffer, we still use the <video> tag with a poster.
                The actual embed will happen in CardDetail.js */}
            <video
              muted
              playsInline
              disableRemotePlayback
              poster={vehicle.videoPoster}
              className="video-elementHome"
            >
              {/* The source for the video tag here is less critical since it's just a preview/poster section.
                  If you have a short video preview, use it here. Otherwise, the poster is enough. */}
              <source src={vehicle.videoSrc} type="video/mp4" /> {/* Still good to have if it's an actual video file */}
              Your browser does not support the video tag.
            </video>
          </section>
        </div>
  
        <div className="content">
          <p className="descriptionHome">{vehicle.description}</p>
          <div className="button-rowHome">
            {/* <button className="feedback-btnHome" onClick={handleFeedbackClick}>
              <VscFeedback />
              Feedback
            </button> */}
            {/* <div className="main-action-group" onClick={() => handleActionButtonClick(vehicle.id)}>
              <div className="turn-on-button">{vehicle.buttonText}</div>
            </div> */}
          </div>
        </div>
      </div>
    );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % typingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [typingWords.length]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="backgroundimage">
        {/* <video autoPlay muted loop className="background-video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <section className="naming">
          <h1>HATTRICK CARNIVAL LIVE NOW</h1>
          <div className="typing">{typingWords[currentWord]}</div>
        </section>
      </div>

      <section className="hero">
        <h1>Welcome to MotoMart</h1>
        <p>Your ultimate destination to explore cars, compare features, and find your dream ride.</p>
        {/* <a href="/cars" className="explore-btn">Explore Cars</a> */}
      </section>

      {/* Featured Cars Section */}
      <div className="featured-cars">
        <h2>🔥 Featured Cars</h2>
        <div className="carousel-wrapper">
          <button className="nav-btn left" onClick={handlePrev}>❮</button>
          <div className="car-grid">
            {visibleCars.map((car) => (
              <div key={car.id} className="car-cardbox">
                <img className="img" src={car.image} alt={car.name} />
                <h3>{car.name}</h3>
                <p>Price: ₹{car.price}<sup>*</sup> </p>
                <br />
                <Link to={carRouteMap[car.name]} className="view-btn">
                  View {car.name}
                </Link>

              </div>
            ))}
          </div>
          <button className="nav-btn right" onClick={handleNext}>❯</button>
        </div>
      </div>

      <div className="seeoffer-backgroundakash">
            <div className='cardbox'>
              {vehicleData.map((manufacturerGroup) => (
                <React.Fragment key={manufacturerGroup.manufacturer}>
                  <div className='title1'>
                    <h1 className='rxkHome'>{manufacturerGroup.manufacturer} Vehicles</h1>
                  </div>
                  <div className="card-sliderHome">
                    <div className="card-grid-wrapperHome">
                      {manufacturerGroup.vehicles.map(vehicle => renderVehicleCard(vehicle))}
                    </div>
                  </div>
                  <div className="Xp8JS"></div>
                </React.Fragment>
              ))}
            </div>
          </div>

      {/* Hot Deals Section */}
      <div className="deals">
        <h2>💥 Hot Deals</h2>
        <ul >
          <li>Up to 15% off on SUVs</li>
          <li>No-cost EMI for 12 months</li>
          <li>Free insurance for the first year</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="cta">
        <h2>Ready to find your dream car?</h2>
        <a href="/cardetails" className="explore-btn">Explore Car List</a>
      </div>

      <section className="intro">
        <p className="cl1"> Different things.</p><p className="cl2"> Even more reason to Search</p>
      </section>

      {/* Offers*/}
      <div className="offers-grid">
        {offers.map((offer) => (
          <div className="offer-card" key={offer.id}>
            <img className="img" src={offer.image} alt={offer.title} />
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
