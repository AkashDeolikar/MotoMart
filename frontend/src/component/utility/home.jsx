import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import './home.css';
import './tab.css';
import './homecard.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Bootstrap/bootstrapHomePage.css';
import '../Bootstrap/progressiveBar.css';
import '../Bootstrap/bootstrapHorizontalSlider.css';
import '../Bootstrap/bootstrapluxuryvehicle.css';
import './swipepage.css';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import "swiper/css/effect-coverflow";

// Page swipe imports
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

//AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

import img1 from './assetimg/img1.jpg';
import img2 from './assetimg/img2.jpg';
import img3 from './assetimg/img3.jpg';
import img4 from './assetimg/img4.jpg';
import luxury from './assetimg/luxury.jpg';
import passenger from './assetimg/passenger.jpg';
import ev from './assetimg/ev.jpg';
import commercial from './assetimg/commercial1.jpg'
import bimg1 from './assetimg/bimg1.jpg';
import bimg2 from './assetimg/bimg2.jpg';
import bimg3 from './assetimg/bimg3.jpg';
import bimg4 from './assetimg/bimg4.jpg';

// ===============================================
// Extracted Components for Better Structure
// ===============================================

/**
 * Renders a loading overlay with a progress bar.
 * @param {object} props - Component props.
 * @param {boolean} props.isLoading - Whether the loading overlay should be visible.
 */
const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="loading-overlay">
      <div className="glass-loader">
        <div className="spinner"></div>
        <p className="loading-text">
          <i className="bi bi-lightning-charge-fill"></i> Please wait... loading details
        </p>
      </div>
    </div>
  );
};


/**
 * Renders the Bootstrap Carousel for the hero section.
 */
const HeroCarousel = () => {
  const timeRunning = 3000; // Duration of the slide transition animation in ms
  const timeAutoNext = 7000; // Time before auto-advancing to next slide in ms

  const carouselRef = useRef(null);
  const runningTimeRef = useRef(null); // Ref to the timeRunning div

  const [isNextTransitioning, setIsNextTransitioning] = useState(false);
  const [isPrevTransitioning, setIsPrevTransitioning] = useState(false);
  const [runningTimeKey, setRunningTimeKey] = useState(0); // Key to force animation restart

  // Initial data for carousel items
  const [carouselItems, setCarouselItems] = useState([
    { id: 1, type: 'image', src: "https://www.tatamotors.com/wp-content/themes/TataMotors/images/TM_Home_Desktop4.webp", title: "Connection aspirations.", name: "Delivering values.", description: "Connect with the future of mobility." },
    { id: 2, type: 'video', src: "https://www.tatamotors.com/wp-content/themes/TataMotors/video/TML-Desktop-video.mp4", title: "A spotlight on", name: "Sustainability.", description: "Embracing clean mobility for a better tomorrow."},
    { id: 3, type: 'image', src: "https://www.tatamotors.com/wp-content/themes/TataMotors/images/TM_Home_Desktop2.webp", title: "Embracing", name: "Clean mobility.", description: "Innovating for a greener tomorrow."},
    { id: 4, type: 'image', src: "https://www.tatamotors.com/wp-content/themes/TataMotors/images/TM_Home_Desktop1.webp", title: "Tomorrow choices,", name: "Today.", description: "Driving the future, one innovation at a time." },
  ]);

  // Refs for managing timeouts to ensure they are cleared correctly across renders
  const runTimeOutRef = useRef(null);
  const runNextAutoRef = useRef(null);

  // Function to restart the progress bar animation
  const resetTimeAnimation = () => {
    // Increment the key to force React to re-render (and thus re-start animation) the `timeRunning` div
    setRunningTimeKey(prevKey => prevKey + 1);
  };

  // Function to handle slider movement (next or previous)
  const showSlider = (type) => {
    // Clear any existing timeouts to prevent conflicting actions
    clearTimeout(runTimeOutRef.current);
    clearTimeout(runNextAutoRef.current);

    let newItems = [...carouselItems]; // Create a mutable copy of the items array
    if (type === 'next') {
      const firstItem = newItems.shift(); // Remove the first item
      newItems.push(firstItem); // Add it to the end
      setIsNextTransitioning(true); // Apply 'next' class for CSS transition
      setIsPrevTransitioning(false); // Ensure 'prev' class is removed
    } else { // 'prev'
      const lastItem = newItems.pop(); // Remove the last item
      newItems.unshift(lastItem); // Add it to the beginning
      setIsPrevTransitioning(true); // Apply 'prev' class for CSS transition
      setIsNextTransitioning(false); // Ensure 'next' class is removed
    }
    setCarouselItems(newItems); // Update state to trigger re-render with new item order

    // Set a timeout to remove the transition classes after the animation completes
    runTimeOutRef.current = setTimeout(() => {
      setIsNextTransitioning(false);
      setIsPrevTransitioning(false);
    }, timeRunning); // This duration should match the CSS transition duration for items

    // Set a timeout for the next automatic slide advance
    runNextAutoRef.current = setTimeout(() => {
      showSlider('next');
    }, timeAutoNext); // This duration is for the auto-advance interval

    // Reset the progress bar animation for the new slide
    resetTimeAnimation();
  };

  // useEffect for initial setup and cleanup
  useEffect(() => {
    // Start the initial auto-play after the component mounts
    runNextAutoRef.current = setTimeout(() => {
      showSlider('next');
    }, timeAutoNext);

    // Start the initial progress bar animation
    resetTimeAnimation();

    // Cleanup function: Clear timeouts when the component unmounts
    return () => {
      clearTimeout(runTimeOutRef.current);
      clearTimeout(runNextAutoRef.current);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Render method for the carousel
  return (
    <div
      className={`carousel ${isNextTransitioning ? 'next' : ''} ${isPrevTransitioning ? 'prev' : ''}`}
      ref={carouselRef}
    >
      {/* The timeRunning div is key-ed to force re-render and restart its animation */}
      <div
        key={runningTimeKey}
        className="timeRunning"
        style={{ animationDuration: `${timeAutoNext / 1000}s` }} // Set animation duration dynamically
      ></div>

      <div className="list">
        {carouselItems.map((item, index) => (
          // Use background-image for image items, and a video tag for video items
          <div
            key={item.id} // Stable key for efficient React rendering
            className="item"
            style={item.type === 'image' ? { backgroundImage: `url(${item.src})` } : {}}
          >
            {item.type === 'video' && (
              <video
                preload="metadata"
                autoPlay
                loop
                muted
                playsInline
                type="video/mp4"
                src={item.src}
                className="item-video" // Apply specific video styling if needed
              >
                Your browser does not support the video tag.
              </video>
            )}
            <div className="content">
              <div className="title">{item.title}</div>
              <div className="name">{item.name}</div>
              <div className="des">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button className="prev" onClick={() => showSlider('prev')}>❮</button>
        <button className="next" onClick={() => showSlider('next')}>❯</button>
      </div>
    </div>
  );
};

/**
 * Renders an auto-playing Swiper slider for "Fold2" cards.
 * @param {object} props - Component props.
 * @param {Array<object>} props.data - Array of card data.
 */
const AutoPlayCardSlider = ({ data }) => {
  return (
    <section className="coverflow-section">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{ delay: 4000 }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="coverflow-swiper"
      >
        {data.map((card, index) => (
          <SwiperSlide key={index} className="coverflow-slide">
            <div className={`card-bg ${card.className}`}>
              <div className="card-overlay" />
              <div className="card-info">
                <h3>{card.heading}</h3>
                <a href={card.link} target="_blank" rel="noreferrer">
                  Explore →
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};


/**
 * Renders the About Us section with a background image and scroll-down arrow.
 * @param {object} props - Component props.
 * @param {function} props.scrollToTargetSection - Function to scroll to a target section.
 */

/**
 * Renders the Featured Cars Section with a horizontal slider.
 * @param {object} props - Component props.
 * @param {Array<object>} props.featuredCars - Array of featured car data.
 * @param {function} props.handlePrev - Function for previous button.
 * @param {function} props.handleNext - Function for next button.
 * @param {Array<object>} props.visibleCars - Array of cars currently visible in the slider.
 * @param {function} props.handleViewCarDetails - Function to handle viewing car details.
 * @param {object} props.carRouteMap - Map of car names to their routes.
 */
const FeaturedCarsSection = ({ featuredCars, handlePrev, handleNext, visibleCars, handleViewCarDetails, carRouteMap }) => (
  <div className="featured-cars" data-aos="fade-up" data-aos-once="true">
    <h2>Featured Cars</h2>
    <div className="carousel-wrapper">
      <button className="nav-btn left" onClick={handlePrev}>❮</button>
      <div className="car-grid">
        {visibleCars.map((car) => (
          <div key={car.id} className="car-cardbox ">
            <img className="img" src={car.image} alt={car.name} />
            <h3>{car.name}</h3>
            <p>Price: ₹{car.price}<sup>*</sup> </p>
            <br />
            <Link
              onClick={(e) => {
                e.preventDefault();
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
);


/**
 * Renders the Sustainability section.
 */
// const SustainabilitySection = () => (
//   <section className="suatainability-wrp" data-aos="fade-up">
//     <div className="sus-cvr-wrp" >
//       <div className="container-1600-wrp">
//         <h4 className="sub-ttle appearIntro">Sustainability</h4>
//         <h2 className="common-ttle appearIntro">Our roadmap<br />
//           to Net Zero</h2>
//         <p className="appearIntro" >We are making responsible choices. By prioritizing sustainable mobility, safety,
//           emission reduction and use of eco-friendly materials, we are driving meaningful change. </p>
//         <a href="/rover" className="btn-boxx appearIntro">Read more</a>
//       </div>
//     </div>
//   </section>
// );

/**
 * Renders a grid of offers.
 * @param {object} props - Component props.
 * @param {Array<object>} props.offers - Array of offer data.
 */
const OffersGridSection = ({ offers }) => (
  <div className="offers-grid" data-aos="fade-up">
    {offers.map((offer) => (
      <Link to={offer.link} key={offer.id} className="offer-card">
        <div className="offer-card-inner">
          <div className="offer-card-front">
            <img className="img" src={offer.image} alt={offer.title} />
          </div>
          <div className="offer-card-back">
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <h6>{offer.text}</h6>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

/**
 * Renders the Vehicle Categories section.
 */
const VehicleCategoriesSection = () => {
  //  const volkswagenPoloData = {
  //     id: 'volkswagen-polo',
  //     videoPoster: "https://cdn.yellowmessenger.com/7ozMGtvMg8vZ1743425593440.png", // Placeholder, replace with actual image import if available
  //     videoSrc: "https://www.youtube.com/embed/7S_MIU9_yBw",
  //     thumbnail: "https://cdn.yellowmessenger.com/7ozMGtvMg8vZ1743425593440.png", // Using a general VW logo or Polo image
  //     title: "Volkswagen Polo",
  //     link: "https://www.volkswagen.co.in/", // General VW India link, as Polo is discontinued in India
  //     description: "The Volkswagen Polo was a highly popular and iconic premium hatchback in India, known for its solid build quality, precise handling, and fun-to-drive nature. It was a benchmark in its segment for many years. (Discontinued in India as of 2022)",
  //     buttonText: "View Details",
  //     vehicleInfo: {
  //       model: "Polo",
  //       manufacturer: "Volkswagen",
  //       year: 2022, // Last year of production/sale in India
  //       features: ["German Build Quality", "Multi-function Steering Wheel", "Dual Airbags", "ABS", "Touchscreen Infotainment (later models)"],
  //       price: "₹ 6.45 - 10.25 Lakh (at time of discontinuation)" // Price at discontinuation
  //     }
  //   };

  return (
    <section className="vehicle-section2" data-aos="fade-up">
  <div className="vehicle-container2">
    <h2 className="vehicle-title2">Our Vehicles</h2>
    <div className="card-deck2">
      {/* Car Card */}
      <div className="vehicle-card2">
        <div className="vehicle-card-inner2">
          <div className="vehicle-card-front2">
            <Link to="/carcard">
              <img src="/images/car.jpg" alt="Car" />
            </Link>
            <div className="vehicle-title-overlay2">
              <h3 className="vehicle-overlay-text2">Cars</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bike Card */}
      <div className="vehicle-card2">
        <div className="vehicle-card-inner2">
          <div className="vehicle-card-front2">
            <Link to="/bikecard">
              <img src="/images/bike.jpg" alt="Bike" />
            </Link>
            <div className="vehicle-title-overlay2">
              <h3 className="vehicle-overlay-text2">Bikes</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};


// ===============================================
// Main Home Component
// ===============================================

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  /* Loading Animation until data load */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); // hide after full load
    }, 2000); // or 500ms
    return () => clearTimeout(timeout);
  }, []); // ✅ only run once on first mount


  const featuredCars = [
    { id: 1, name: "Maruti Suzuki Swift", price: "5.99 Lakh", image: "./images/swift/SUZUKI_SWIFT_EXT_360_RED_V-1_5.webp" },
    { id: 2, name: "Hyundai Creta", price: "10.87 Lakh", image: "./images/creta/abyss-black_7.png" },
    { id: 3, name: "Tata Nexon", price: "8.15 Lakh", image: "./images/nexon/PureGrey-0.png" },
    { id: 4, name: "Suzuki Ertiga", price: "9.50 Lakh", image: "./images/ertiga/ertiga.png" },
    { id: 5, name: "Renault Kwid", price: "3.50 Lakh", image: "./images/renault/renault.png" },
    { id: 6, name: "Toyota Innova", price: "17.50 Lakh", image: "https://www.jansatta.com/wp-content/uploads/2019/03/toyota-innova-crysta-small-2.jpg?w=440" },
  ];

  /*Scroll up animation */
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in milliseconds
      once: false    // set to false to animate again on scroll up
    });
  }, []);

  const offers = [
    {
      id: 1,
      title: "EMI Calculator",
      description: "Calculate your EMI and know the ROI",
      text: "click here",
      image: require('../Assets/emi.png'),
      link: "/emicalculator", // <-- Add this
    },
    {
      id: 2,
      title: "Parts and Fluid",
      description: "Authorized and genuine parts and fluid details",
      text: "click here",
      image: require('../Assets/service.png'),
      link: "/partsinfo",
    },
    {
      id: 3,
      title: "Service Cost Checker",
      description: "Check and manage the service cost by yourself",
      text: "click here",
      image: require('../Assets/247.png'),
      link: "/servicecost",
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

  const carRouteMap = {
    "Maruti Suzuki Swift": "/swift",
    "Hyundai Creta": "/creta",
    "Tata Nexon": "/nexon",
    "Suzuki Ertiga": "/ertiga",
    "Renault Kwid": "/omni", // Changed from "/page5" for consistency
    "Toyota Innova": "/innova",
  };

  const handleViewCarDetails = (carName) => {
    setIsLoading(true);
    setTimeout(() => {
      const route = carRouteMap[carName];
      setIsLoading(false);
      if (route) {
        navigate(route);
      } else {
        console.warn(`Route not found for ${carName}`);
      }
    }, 1500);
  };

  // --- SCROLL SLIDER ---
  const targetSectionRef = useRef(null); // Ref for scroll target
  const scrollToTargetSection = () => {
    targetSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="home-container">
      <LoadingOverlay isLoading={isLoading} />  {/* This is a loading animation */}

      <HeroCarousel />

      <AutoPlayCardSlider data={fold2CardsData} />

      {/* NEW RECOMMENDED POSITION FOR VEHICLE CATEGORIES SECTION */}
      <VehicleCategoriesSection />
      {/* END NEW RECOMMENDED POSITION */}

      {/* <SustainabilitySection /> */}

      {/* <ABOUT US SECTION /> */}
      <div className="masonrymedia-aka" style={{ position: 'relative' }}>
        <i
          className="bi bi-arrow-down-circle bounce-arrow"
          style={{
            position: 'absolute',
            top: '30px',
            right: '20px',
            fontSize: '3rem',
            color: '#fff',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer',
            zIndex: 1000,
          }}
          title="Scroll Down"
          onClick={scrollToTargetSection} // Your scroll function
        ></i>
        <div className="masonrymedia__container masonrymedia__container--right masonrymedia__container--visible">
          {/* Text section */}
          <div className="masonrymedia__card">

            <div className="masonrymedia__card-inner">
              <div className="masonrymedia__card-info">
                <h3 className="masonrymedia__card-title headline headline--xl">JOY OF REDEFINING DRIVING</h3>
                <div className="masonrymedia__card-description body-copy body-copy--s">
                  Sophisticated elegance.
                </div>
              </div>
              <div className="masonrymedia__card-ctalist linkContainer">
                <div className="primaryLinkContainer">
                  <a
                    className="primary-link icon-arrow-right"
                    onClick={() => {
                      localStorage.setItem("aboutusReady", "false");
                      setIsLoading(true);

                      const checkPageReady = setInterval(() => {
                        if (localStorage.getItem("aboutusReady") === "true") {
                          clearInterval(checkPageReady);
                          setIsLoading(false);
                        }
                      }, 100);

                      navigate('/aboutus');
                    }}
                  >
                    <span className="cta-content">ABOUT US</span>
                  </a>
                </div>
              </div>
            </div>
            <br />
            {/* <h3 className="masonrymedia__card-title headline headline--xl"></h3> */}
          </div>
          <div className="masonrymedia__mosaic">
            {/* Top row */}
            <div className="masonrymedia__row masonrymedia__row--supportive" >
              <div className="masonrymedia__cell" >
                <picture className="masonrymedia__picture" data-aos="zoom-in-right" data-aos-delay="100" data-aos-once="true">
                  <img alt="Interior Steering" className="masonrymedia__image" src={bimg1} />
                </picture>
              </div>
              <div className="masonrymedia__cell">
                <picture className="masonrymedia__picture" data-aos="zoom-in-right" data-aos-delay="200" data-aos-once="true">
                  <img alt="Headlight" className="masonrymedia__image" src={bimg2} />
                </picture>
              </div>
            </div>

            {/* Bottom row */}
            <div className="masonrymedia__row masonrymedia__row--main">
              <div className="masonrymedia__cell masonrymedia__cell--narrow">
                <picture className="masonrymedia__picture" data-aos="zoom-in" data-aos-delay="300" data-aos-once="true">
                  <img alt="Woman Driving" className="masonrymedia__image" src={bimg3} loading="lazy" />
                </picture>
              </div>
              <div className="masonrymedia__cell masonrymedia__cell--main">
                <picture className="masonrymedia__picture" data-aos="zoom-in" data-aos-delay="400" data-aos-once="true">
                  <img alt="Gear Knob" className="masonrymedia__image" src={bimg4} loading="lazy" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder div for scroll target */}
      <div ref={targetSectionRef} className="hand-image-box" >
        <div className="hand-image-text" data-aos="fade" data-aos-once="true" >
          <h2>Experience the Future of Driving</h2>
        </div>
      </div>

      {/* FEATURED CAR SECTION */}
      <FeaturedCarsSection
        featuredCars={featuredCars}
        handlePrev={handlePrev}
        handleNext={handleNext}
        visibleCars={visibleCars}
        handleViewCarDetails={handleViewCarDetails}
        carRouteMap={carRouteMap}
      />

      {/*Luxury vehicle intro */}
      <div className="shimmer-effect">
        <div className="hand-image-box1" data-aos="fade" data-aos-once="true">
          <div className="hand-image-text1" data-aos="zoom-in" data-aos-once="true">
            <h2>Stay inspired</h2>
            <h4>This is just the beginning. <i className="bi bi-gem"></i> </h4>
          </div>
        </div>
      </div>


      {/* ZIC ZAC SECTION */}
      <div className="zic-zic-blocks">
        <div className="zic-data">
          <div className="zic-alternating-content">
            <div className="mobile-note"> Tap the card to explore more features!</div>
            {/* Image 1: Right aligned - Clickable */}
            <div className="support right-aligned" data-aos="slide-right" data-aos-delay="200">
              <Link to="/luxuryvh" className="zic-image-link">
                <picture className="roverimg">
                  <img alt="roverRRJ" className="zic-zac-block-img" src={luxury} />
                </picture>
                <h3 class="masonrymedia__card-title1 headline headline--xl">LUXURY VEHICLES</h3>
              </Link>
            </div>

            {/* Image 3: Left aligned - Clickable */}
            <div className="support left-aligned" data-aos="slide-left" data-aos-delay="300">
              <Link to="/passengervh" className="zic-image-link">
                <picture className="roverimg">
                  <img alt="passenger" className="zic-zac-block-img" src={passenger} />
                </picture>
                <h3 class="masonrymedia__card-title1 headline headline--xl">PASSENGER VEHICLE</h3>
              </Link>
            </div>

            {/* Image 2: Right aligned - Clickable */}
            <div className="support right-aligned" data-aos="slide-right" data-aos-delay="350">
              <Link to="/evvh" className="zic-image-link">
                <picture className="roverimg">
                  <img alt="ev" className="zic-zac-block-img" src={ev} />
                </picture>
                <h3 class="masonrymedia__card-title1 headline headline--xl">EV VEHICLE</h3>
              </Link>
            </div>

            {/* Image 4: Left aligned - Clickable */}
            <div className="support left-aligned" data-aos="slide-left" data-aos-delay="400">
              <Link to="/commercialvh" className="zic-image-link">
                <picture className="roverimg">
                  <img alt="commercial" className="zic-zac-block-img" src={commercial} />
                </picture>
                <h3 class="masonrymedia__card-title1 headline headline--xl">COMMERCIAL VEHICLE</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* <PREMIUM CAR SECTION /> */}
      <div className="masonrymedia-aka">
        <div className="masonrymedia__container masonrymedia__container--right masonrymedia__container--visible">
          <div className="masonrymedia__mosaic">
            {/* Top row */}
            <div className="masonrymedia__row masonrymedia__row--supportive">
              <div className="masonrymedia__cell">
                <picture className="masonrymedia__picture" data-aos="zoom-in-right" data-aos-delay="100" data-aos-once="true">
                  <img alt="Interior Steering" className="masonrymedia__image" src={img1} />
                </picture>
              </div>
              <div className="masonrymedia__cell">
                <picture className="masonrymedia__picture" data-aos="zoom-in-right" data-aos-delay="250" data-aos-once="true">
                  <img alt="Headlight" className="masonrymedia__image" src={img4} />
                </picture>
              </div>
            </div>

            {/* Bottom row */}
            <div className="masonrymedia__row masonrymedia__row--main">
              <div className="masonrymedia__cell masonrymedia__cell--narrow">
                <picture className="masonrymedia__picture" data-aos="zoom-in" data-aos-delay="350" data-aos-once="true">
                  <img alt="Woman Driving" className="masonrymedia__image" src={img3} loading="lazy" />
                </picture>
              </div>
              <div className="masonrymedia__cell masonrymedia__cell--main">
                <picture className="masonrymedia__picture" data-aos="zoom-in" data-aos-delay="500" data-aos-once="true">
                  <img alt="Gear Knob" className="masonrymedia__image" src={img2} loading="lazy" />
                </picture>
              </div>
            </div>
          </div>

          {/* Text section */}
          <div className="masonrymedia__card">
            <div className="masonrymedia__card-inner">
              <div className="masonrymedia__card-info">
                <h3 className="masonrymedia__card-title headline headline--xl">ELEGANCE IN MOTION</h3>
                <div className="masonrymedia__card-description body-copy body-copy--s">
                  Sophisticated elegance.
                </div>
              </div>
              <div className="masonrymedia__card-ctalist linkContainer">
                <div className="primaryLinkContainer">
                  <a
                    className="primary-link icon-arrow-right"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        navigate('/page5');
                      }, 1500); // Adjust the delay if needed
                    }}
                  >
                    <span className="cta-content">EXPLORE PREMIUM SEGMENT</span>
                  </a>
                </div>
                <div className="secondaryLinkContainer">
                  <a
                    className="secondary-link"
                    href="/carcard"
                    target="_blank"
                  >
                    <span className="cta-content">Re-direct to Car Search</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* HOT DEALS SECTION */}
      <div className="deals" data-aos="fade-right" data-aos-delay="400" data-aos-once="true">
        <h2>⚡ Vehicle Powertrain Options</h2>
        <ul>
          <li>🔋 Electric Vehicles (EV): Zero emissions, silent drive, low maintenance</li>
          <li>⛽ Petrol Engines: Smooth performance with city-friendly mileage</li>
          <li>🛢️ Diesel Engines: High torque, great for long-distance and heavy usage</li>
          <li>🔄 Hybrid Systems: Combines fuel economy of EV with petrol range</li>
        </ul>
      </div>

      {/* FLIP CARD HEADING */}
      <section className="intro">
        <p className="cl1">Empower your <i className="bi bi-boxes"></i></p>
        <p className="cl2">digital Journey</p>
      </section>

      {/* OFFER FLIP CARDS  */}
      <OffersGridSection offers={offers} />
    </div>
  );
};

export default Home;