import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import './home.css';
import './tab.css';
import './homecard.css'; // For CardBox and slider horizontal
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Bootstrap/bootstrapHomePage.css';
import '../Bootstrap/progressiveBar.css';
import '../Bootstrap/bootstrapHorizontalSlider.css';
import '../Bootstrap/bootstrapluxuryvehicle.css';
import './swipepage.css';

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

//page swipe
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';

// export const vehicleData = [
//   {
//     manufacturer: '4-Wheeler',
//     idPrefix: '4-Wheeler',
//     vehicles: [
//       {
//         id: 'suzuki-car',
//         videoPoster: "https://www.carlogos.org/logo/Suzuki-logo-640x425.jpg",
//         description: "SUZUKI",
//       },
//       {
//         id: 'hyundai-car',
//         videoPoster: "https://www.carlogos.org/car-logos/hyundai-logo-2011-640.png",
//         description: "HYUNDAI",
//       },
//       {
//         id: 'renault-car',
//         videoPoster: "https://www.carlogos.org/logo/Renault-logo-2015-640x550.jpg",
//         description: "RENAULT",
//       },
//       {
//         id: 'bmw-car',
//         videoPoster: "https://www.carlogos.org/car-logos/bmw-logo-2020-gray.png",
//         description: "BMW",
//       },
//       {
//         id: 'volkswagen-car',
//         videoPoster: "https://www.carlogos.org/logo/Volkswagen-logo-2019-640x500.jpg",
//         description: "VOLKSWAGEN", // Corrected spelling
//       },
//       {
//         id: 'tata-car',
//         videoPoster: "https://www.carlogos.org/logo/Tata-logo-2000-640x550.jpg",
//         description: "TATA",
//       },
//       {
//         id: 'toyota-car',
//         videoPoster: "https://www.carlogos.org/car-logos/toyota-logo-2005-download.png",
//         description: "TOYOTA",
//       },
//       {
//         id: 'mahindra-car',
//         videoPoster: "https://www.carlogos.org/logo/Mahindra-logo-640x316.jpg",
//         description: "MAHINDRA",
//       },
//     ]
//   },
//   {
//     manufacturer: '2-Wheeler',
//     idPrefix: '2-Wheeler',
//     vehicles: [
//       {
//         id: 'royal-enfield-bike',
//         videoPoster: "https://www.bikerspad.com/cdn/shop/collections/png-transparent-royal-enfield-logo-enfield-cycle-co-ltd-motorcycle-logo-royal-enfield-bicycle-royal-emblem-text-label.png?v=1651684842",
//         description: "ROYAL ENFIELD",
//       },
//       {
//         id: 'bajaj-bike',
//         videoPoster: "https://i.pinimg.com/736x/8b/e8/e5/8be8e5432419e9a984a3ab3fd3792905.jpg",
//         description: "BAJAJ",
//       },
//       {
//         id: 'tvs-bike',
//         videoPoster: "https://1000logos.net/wp-content/uploads/2020/07/TVS-Motor-Logo.jpg",
//         description: "TVS",
//       },
//       {
//         id: 'hero-bike',
//         videoPoster: "https://animationvisarts.com/wp-content/uploads/2023/12/image-11-1030x334.png",
//         description: "HERO",
//       }, {
//         id: 'yamaha-bike',
//         videoPoster: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Yamaha_Motor_Logo_%28full%29.svg/2560px-Yamaha_Motor_Logo_%28full%29.svg.png",
//         description: "YAMAHA",
//       }, {
//         id: 'honda-bike',
//         videoPoster: "https://download.logo.wine/logo/Honda/Honda-Logo.wine.png",
//         description: "HONDA",
//       }, {
//         id: 'suzuki-bike',
//         videoPoster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYVNcHT89onLkVVCUGFUrAtLkr7ytsifda_g&s",
//         description: "SUZUKI",
//       },
//     ]
//   },
// ];

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLoading, setIsLoading] = useState(false); // New loading state

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
      title: "Best Maintenance Service", // Corrected spelling
      description: "Authorized and genuine service center across country", // Corrected spelling
      image: require('../Assets/service.png'),
    },
    {
      id: 3,
      title: "24*7 Connect",
      description: "For support our team always be ready for your help 😊", // Corrected grammar
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

  // Word auto typing
  const typingWords = ["To Automobile", "To Revolution", "To Dream Drive"];
  const [currentWord, setCurrentWord] = useState(0);

  const carRouteMap = {
    "Maruti Suzuki Swift": "/swift",
    "Hyundai Creta": "/creta",
    "Tata Nexon": "/nexon",
    "Suzuki Ertiga": "/ertiga",
    "Renault Kwid": "/omni", // Assuming /omni is the correct route for Kwid
    "Toyota Innova": "/innova",
  };

  // Function to handle navigation with loading state
  const handleViewCarDetails = (carName) => {
    setIsLoading(true); // Start loading
    // Simulate network request or data loading
    setTimeout(() => {
      const route = carRouteMap[carName];
      setIsLoading(false); // End loading
      if (route) {
        navigate(route); // Navigate to the car detail page
      } else {
        console.warn(`Route not found for ${carName}`);
      }
    }, 1500); // Simulate 1.5 seconds of loading time
  };

  // const renderVehicleCard = (vehicle) => (
  //   <div className="card-containerHome" key={vehicle.id}>
  //     <div className="video-sectionHome">
  //       <section>
  //         <video
  //           muted
  //           playsInline
  //           disableRemotePlayback
  //           poster={vehicle.videoPoster}
  //           className="video-elementHome"
  //         >
  //           <source src={vehicle.videoSrc} type="video/mp4" />
  //           Your browser does not support the video tag.
  //         </video>
  //       </section>
  //     </div>

  //     <div className="content">
  //       <p className="descriptionHome">{vehicle.description}</p>
  //       <div className="button-rowHome">
  //         {/* Your existing commented out buttons */}
  //       </div>
  //     </div>
  //   </div>
  // );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % typingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [typingWords.length]);

  // Hand image parallax effect
  const imageRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const translateY = -scrollY / 2; // Adjust scroll sensitivity. Increase denominator for slower movement.
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- SCROLL SLIDER ---
  const targetSectionRef = useRef(null);//target value NULL
  const scrollToTargetSection = () => {
    targetSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  //swiper automatic
  const fold2CardsData = [
    {
      className: 'fold2-pic1',
      heading: 'The electric advantage',
      link: '/page1',
    },
    {
      className: 'fold2-pic2',
      heading: 'Building for progress',
      link: '/page2',
    },
    {
      className: 'fold2-pic3',
      heading: 'Future-ready begins here',
      link: '/page3',
    },
    {
      className: 'fold2-pic4',
      heading: 'Committed to do good',
      link: '/page4',
    },
  ];


  return (
    <div className="home-container">
      {/* Loading Overlay - Conditionally Rendered */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="progress-container">
            <div className="progress" role="progressbar" aria-label="Loading..." aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '90%' }}><i class="bi bi-cloud-arrow-down" style={{ fontSize: '15px' }}> Loading...</i></div>
            </div>
            <p className="loading-text">Please wait while we load the details...</p>
          </div>
        </div>
      )}

      {/* Bootstrap Carousel (your existing code) */}
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://www.tatamotors.com/wp-content/themes/TataMotors/images/TM_Home_Desktop4.webp" className="d-block w-100" alt="First Slide" />
            <div className="carousel-caption">
              <h1>Connection aspirations.</h1>
              <h1>Delevering values.</h1>
            </div>
          </div>

          <div className="carousel-item">
            <video id="bnr-vid" preload="metadata" autoPlay loop muted playsInline type="video/mp4" src="https://www.tatamotors.com/wp-content/themes/TataMotors/video/TML-Desktop-video.mp4">
              Your browser does not support the video tag.
            </video>
            <div className="carousel-caption">
              <h1>A spotlight on</h1>
              <h1>Sustainability.</h1>
            </div>
          </div>

          <div className="carousel-item">
            <img src="https://www.tatamotors.com/wp-content/themes/TataMotors/images/TM_Home_Desktop2.webp" className="d-block w-100" alt="Second Slide" />
            <div className="carousel-caption">
              <h1>Embracing</h1>
              <h1>Clean mobility.</h1>
            </div>
          </div>

          <div className="carousel-item">
            <img src="https://www.tatamotors.com/wp-content/themes/TataMotors/images/TM_Home_Desktop1.webp" className="d-block w-100" alt="Third Slide" />
            <div className="carousel-caption">
              <h1>Tomorrow's choices,</h1>
              <h1>Today</h1>
            </div>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/*Slider function */}
      <section className="home-fold2">
        <div className="fold2-sldr-cvr">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={'auto'}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 4000 }}
            className="fold2-sldr"
          >
            {fold2CardsData.map((card, index) => (
              <SwiperSlide
                key={index}
                style={{ width: '328px' }}
                className="swiper-slide"
              >
                <div className={`fold2-card ${card.className} anim-3`}>
                  <div className="caption-ca">
                    <a href={card.link} target="_blank" rel="noreferrer">Explore</a>
                    <h2 className="caption-card h2">{card.heading}</h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/*Background image and text indexing */}
      <div className="backgroundimage">
        <section className="naming">
          <h1 >THE HEART OF JOY-REDEFINING DRIVING</h1>
          {/* <div className="typing">{typingWords[currentWord]}</div> */}
          <div className="aboutus">
            <h5>About us</h5>
            <h2>Agile, new-age and future-ready</h2>
            <p className="passage">We are India’s market leader in commercial vehicles and amongst the top three in the passenger vehicles market. We prioritise human centricity with technological prowess and engineering excellence to make cargo and passenger mobility safer, smarter and greener.</p>
          </div>
        </section>
        {/*Down Arrow */}
        <i
          className="bi bi-arrow-down-circle bounce-arrow"
          style={{
            position: 'absolute',
            top: '80px',
            right: '20px',
            fontSize: '2.5rem',
            color: '#fff',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer',
            zIndex: 1000,
          }}
          title="Scroll Down"
          onClick={scrollToTargetSection}
        ></i>
      </div>

      {/* Hand image section */}
      {/* <div className="hand-image-section" ref={targetSectionRef}>
        <div className="hand-image-wrapper">
          <img
            ref={imageRef}
            decoding="async"
            loading="lazy"
            width={2504}
            height={1472}
            sizes="min((100vw - 48px) * 1.5, 800px)"
            srcSet={`
              https://framerusercontent.com/images/KcRmJwxep99VQhGCvjFixDxur6Q.webp?scale-down-to=512 512w,
              https://framerusercontent.com/images/KcRmJwxep99VQhGCvjFixDxur6Q.webp?scale-down-to=1024 1024w,
              https://framerusercontent.com/images/KcRmJwxep99VQhGCvjFixDxur6Q.webp?scale-down-to=2048 2048w,
              https://framerusercontent.com/images/KcRmJwxep99VQhGCvjFixDxur6Q.webp 2504w
            `}
            src="https://framerusercontent.com/images/KcRmJwxep99VQhGCvjFixDxur6Q.webp?scale-down-to=2048"
            alt="hand"
            className="hand-image-grow"
          />
        </div>
        </div> */}

      {/*intro sub-category*/}
      <div className="hand-image-box">
        <div className="hand-image-text">
          <h2>Experience the Future of Driving</h2>
          <p>Discover innovative features and cutting-edge technology designed to enhance your journey.</p>
        </div>
      </div>

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
                {/* Modified Link to use handleViewCarDetails */}
                <Link
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default Link behavior
                    handleViewCarDetails(car.name);
                  }}
                  to={carRouteMap[car.name]}
                  className="view-btn"
                >
                  View {car.name}
                </Link>
              </div>
            ))}
          </div>
          <button className="nav-btn right" onClick={handleNext}>❯</button>
        </div>
      </div>

      {/*Luxury vehicle */}
      <div className="hand-image-box1">
        <div className="hand-image-text1">
          <h2>Stay inspired</h2>
          <h4>This is just the beginning. <i class="bi bi-gem"></i> </h4>
        </div>
      </div>
      {/*Luxury car poster and link */}
      {/* <div className="luxuryvehicle">
        <div>
          <button
            className="luxury-btn"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                navigate("/page5");
              }, 1500);
            }}
          >
            <h1 className="luxuryheading">Luxury vehicle<i class="bi bi-box-arrow-in-right"></i></h1>
          </button>
        </div>
      </div> */}

      {/*SWipe PAges */}
      <div className="ConstantBGHomeSwipe">
        <Swiper
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'custom-bullet',
            bulletActiveClass: 'custom-bullet-active',
          }}
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
        >
          <SwiperSlide>
              <div className="swipebg">
                <div className="swipeimg1">
            <div className="T1PageSwipe">
              <h2 className="constantBGT1pageSwipe">Luxury Vehicle</h2>
              <p className="constantBGT1pageSwipe">
                Cutting-edge designs, quest to excel and promise to delight customers keeps us ahead of the curve. Our cars and SUVs offer best-in-class safety and superior driving experience.
              </p>
              <a href="/page5" className="readmore-ctaSwipe">
                Discover Luxury vehicles
              </a>
            </div>
            </div>
            </div>
          </SwiperSlide>  

          <SwiperSlide>
            <div className="swipebg">
                <div className="swipeimg2">
            <div className="T1PageSwipe">
              <h2 className="constantBGT1pageSwipe">Passenger Vehicle</h2>
              <p className="constantBGT1pageSwipe">
                Cutting-edge designs, quest to excel and promise to delight customers keeps us ahead of the curve. Our cars and SUVs offer best-in-class safety and superior driving experience.
              </p>
              <a href="https://www.tatamotors.com/passenger-vehicles/" className="readmore-ctaSwipe">
                Discover passenger vehicles
              </a>
            </div>
            </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="swipebg">
                <div className="swipeimg3">
            <div className="T1PageSwipe">
              <h2 className="constantBGT1pageSwipe">Go EV</h2>
              <p className="constantBGT1pageSwipe">
                Evolve to the new age of zero emissions, quieter drives and connected mobility.
              </p>
              <a href="https://www.tatamotors.com/electric-vehicles/" className="readmore-ctaSwipe">
                Discover electric vehicles
              </a>
            </div>
            </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="swipebg">
                <div className="swipeimg4">
            <div className="T1PageSwipe">
              <h2 className="constantBGT1pageSwipe">Commercial Vehicle</h2>
              <p className="constantBGT1pageSwipe">
                Our commercial vehicles rule the roads they run on. No terrain is too challenging and no load too heavy.
              </p>
              <a href="https://www.tatamotors.com/commercial-vehicles/" className="readmore-ctaSwipe">
                Discover commercial vehicles
              </a>
            </div>
            </div>
            </div>
          </SwiperSlide>

          {/* Add more slides if needed */}
        </Swiper>

        {/* Custom styled bullet bar below */}
        <div className="custom-pagination"></div>
      </div>

      {/*Sustanability chart */}
      <section className="suatainability-wrp">
        <div className="sus-cvr-wrp">
          <div className="container-1600-wrp">
            <h4 className="sub-ttle appearIntro">Sustainability</h4>
            <h2 className="common-ttle appearIntro">Our roadmap<br />
              to Net Zero</h2>
            <p className="appearIntro" >We are making responsible choices. By prioritizing sustainable mobility, safety,
              emission reduction and use of eco-friendly materials, we are driving meaningful change. </p>
            <a href="/page6" className="btn-boxx appearIntro">Read more</a>
          </div>
        </div>
      </section>

      {/* <div className="seeoffer-backgroundakash">
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
      </div> */}

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
        {/* Modified Link to use handleViewCarDetails for "Explore Car List" */}
        <button
          className="explore-btn"
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              navigate("/cardetails"); // Assuming /cardetails is your general car list route
            }, 1500);
          }}
        >
          Explore Car List
        </button>
      </div>

      <section className="intro">
        <p className="cl1">Empower your <i className="bi bi-boxes"></i></p>
        <p className="cl2">digital Journey</p>
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