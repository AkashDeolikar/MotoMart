import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import './home.css';
import './tab.css';
import './homecard.css';
import './featuredsection.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Bootstrap/bootstrapHomePage.css';
import '../Bootstrap/progressiveBar.css';
import '../Bootstrap/bootstrapHorizontalSlider.css';
import '../Bootstrap/bootstrapluxuryvehicle.css';
import './swipepage.css';
import StatsHighlightSection from '../utility/statshighlightsection';
import { FaArrowRight } from 'react-icons/fa';

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

// Asset Imports
import img1 from './assetimg/img1.jpg';
import img2 from './assetimg/img2.jpg';
import img3 from './assetimg/img3.jpg';
import img4 from './assetimg/img4.jpg';
import luxury from './assetimg/luxury.jpg';
import passenger from './assetimg/passenger.jpg';
import ev from './assetimg/ev.jpg';
import commercial from './assetimg/commercial1.jpg'
import bimg1 from './assetimg/bimg1.WebP';
import bimg2 from './assetimg/bimg2.WebP';
import bimg3 from './assetimg/bimg3.WebP';
import bimg4 from './assetimg/bimg4.WebP';

import Viewmore from "../cardetails/viewmore";
import HeroSlider from "./HeroSlider"; // This component seems unused based on commented out usage
import SlideItem from "./SlideItem"; // This component seems unused based on commented out usage

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
    <div className="app-loading-overlay">
    <div className="app-glass-loader">
        <div className="app-spinner"></div>
        <p className="app-loading-text">
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
  const timeRunning = 7000; // Duration of the slide transition animation in ms
  const timeAutoNext = 7000; // Time before auto-advancing to next slide in ms

  const carouselRef = useRef(null);
  const runningTimeRef = useRef(null); // Ref to the timeRunning div

  const [isNextTransitioning, setIsNextTransitioning] = useState(false);
  const [isPrevTransitioning, setIsPrevTransitioning] = useState(false);
  const [runningTimeKey, setRunningTimeKey] = useState(0); // Key to force animation restart

  // Initial data for carousel items
  const [carouselItems, setCarouselItems] = useState([
    // { id: 1, type: 'image', src: "https://www.tatamotors.com/wp-content/themes/TataMotors/images/TM_Home_Desktop4.webp", title: "Connection aspirations.", name: "Delivering values.", description: "Connect with the future of mobility." },
    { id: 2, type: 'video', src: "https://www.tatamotors.com/wp-content/themes/TataMotors/video/TML-Desktop-video.mp4", title: "A spotlight on", name: "Sustainability.", description: "Embracing clean mobility for a better tomorrow." },
    { id: 3, type: 'image', src: "https://www.tatamotors.com/wp-content/themes/TataMotors/images/TM_Home_Desktop2.webp", title: "Embracing", name: "Clean mobility.", description: "Innovating for a greener tomorrow." },
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
      setIsNextTransitioning(true); // Apply 'next' className for CSS transition
      setIsPrevTransitioning(false); // Ensure 'prev' className is removed
    } else { // 'prev'
      const lastItem = newItems.pop(); // Remove the last item
      newItems.unshift(lastItem); // Add it to the beginning
      setIsPrevTransitioning(true); // Apply 'prev' className for CSS transition
      setIsNextTransitioning(false); // Ensure 'next' className is removed
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
              {/* {item.id === 1 && <StatsHighlightSection />} */}
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
  const canLoop = data.length >= 3; // adjust as per your design
  return (
    <section className="coverflow-section">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={canLoop}
        autoplay={canLoop ? { delay: 4000 } : false}
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
 * Renders the Featured Cars Section with a horizontal slider.
 * @param {object} props - Component props.
 * @param {Array<object>} props.featuredCars - Array of featured car data.
 * @param {function} props.handleViewCarDetails - Function to handle viewing car details.
 * @param {object} props.carRouteMap - Map of car names to their routes.
 */
const FeaturedCarsSection = ({ featuredCars, handleViewCarDetails, carRouteMap }) => (
  <section className="carslidefeatured-section" data-aos="fade-up" data-aos-once="true">
    <div className="carslidefeatured-container">
      <h2 className="carslidefeatured-heading">🔥 Featured Cars</h2>

      <div className="carslidefeatured-slider">
        {featuredCars.map((car) => (
          <div key={car.id} className="carslidefeatured-card">
            <div className="carslidefeatured-img-wrapper">
              <img src={car.image} alt={car.name} />
            </div>
            <div className="carslidefeatured-info">
              <h3>{car.name}</h3>
              <p>Starting from ₹{car.price}<sup>*</sup></p>
              <Link
                to={carRouteMap[car.name]}
                className="carslidefeatured-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleViewCarDetails(car.name);
                }}
              >
                Explore {car.name}
              </Link>
            </div>
          </div>
        ))}
        <Viewmore /> {/* This component is rendered for all cars, typically it's a single "view more" link */}
      </div>
    </div>
  </section>
);

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
  return (
    <section className="cardetail-sections-wrapper">
      <div className="cardetail-sections-bg" />
      <div className="cardetail-sections-overlay" />

      <div className="cardetail-sections-inner">
        <div className="cardetail-sections-content">
          <h1 className="cardetail-sections-title">Redefine Your Drive</h1>
          <p className="cardetail-sections-subtitle">
            Explore luxury, performance, and innovation — all in one place.
          </p>
          <Link to="/cardetails" className="cardetail-sections-btn">
            Discover Cars <FaArrowRight className="cardetail-sections-arrow-icon" />
          </Link>

          <Link to="/BikeCompareDetails" className="cardetail-sections-btn">
            Discover Bikes <FaArrowRight className="cardetail-sections-arrow-icon" />
          </Link>
        </div>
      </div>

      <div className="cardetail-sections-scroll-hint">SCROLL ↓</div>
    </section>
  );
};

// ===============================================
// Main Home Component
// ===============================================

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("MUVs/SUVs"); // Initial active tab

  // Data for "Our Range" section
  const categories = [
    "Hatchback",
    "SUV",
    "Sedan",
    "Van",
    "EV",
  ];

  const categoryInfo = {
    Hatchback: "Hatchbacks are compact and fuel-efficient vehicles ideal for city driving. They offer easy maneuverability and affordable ownership.",
    SUV: "SUVs are built for both urban and off-road terrains, offering higher ground clearance and ample space for family trips.",
    Sedan: "Sedans are sleek and stylish with a focus on comfort and ride quality. Perfect for daily commuting with premium features.",
    Van: "Vans are perfect for large families or commercial use. They offer spacious interiors and flexible seating arrangements.",
    EV: "Electric Vehicles are eco-friendly and cost-effective with zero emissions. Great for the future of sustainable mobility."
  };

  /* Loading Animation until data load */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); // hide after full load
    }, 2000); // or 500ms
    return () => clearTimeout(timeout);
  }, []);

  /* FEATURED CAR AND BIKE SECTION */
  const featuredCars = [
    { id: 1, name: "Maruti Suzuki Swift", price: "5.99 Lakh", image: "./images/swift/SUZUKI_SWIFT_EXT_360_RED_V-1_5.webp" },
    { id: 2, name: "Hyundai Creta", price: "10.87 Lakh", image: "./images/creta/abyss-black_7.png" },
    { id: 3, name: "Tata Nexon", price: "8.15 Lakh", image: "./images/nexon/PureGrey-0.png" },
    { id: 4, name: "Suzuki Ertiga", price: "9.50 Lakh", image: "./images/ertiga.png" },
    { id: 5, name: "Renault Kwid", price: "3.50 Lakh", image: "./images/kwid.png" },
    { id: 6, name: "Toyota Innova", price: "17.50 Lakh", image: "./images/crysta.png" },
    { id: 7, name: "Honda Activa", price: "1.20 Lakh", image: "./images/activa/13.png" },
  ];

  /*Scroll up animation */
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in milliseconds
      once: false    // set to false to animate again on scroll up
    });
  }, []);

  // Data for "Offers Grid Section"
  const offers = [
    {
      id: 1,
      title: "EMI Calculator",
      description: "Calculate your EMI and know the ROI",
      text: "click here",
      image: require('../Assets/emi.png'),
      link: "/emicalculator",
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
      image: require('../Assets/servicecc.png'),
      link: "/servicecostcalculator",
    }
  ];

  // State for featured cars slider (though currently FeaturedCarsSection is not using visibleCars)
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3) % featuredCars.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 3 + featuredCars.length) % featuredCars.length);
  };

  // This `visibleCars` array is currently not used by `FeaturedCarsSection` as it maps all `featuredCars`.
  const visibleCars = [
    featuredCars[startIndex],
    featuredCars[(startIndex + 1) % featuredCars.length],
    featuredCars[(startIndex + 2) % featuredCars.length],
  ];

  // Data for AutoPlayCardSlider ("Fold2" cards)
  const fold2CardsData = [
    {
      className: 'fold2-pic1',
      heading: 'The electric advantage',
      link: '/page1', // Link to a specific page
    },
    {
      className: 'fold2-pic2',
      heading: 'Building for progress',
      link: '/page2', // Link to a specific page
    },
    {
      className: 'fold2-pic3',
      heading: 'Future-ready begins here',
      link: '/page3', // Link to a specific page
    },
    {
      className: 'fold2-pic4',
      heading: 'Committed to do good',
      link: '/page4', // Link to a specific page
    },
  ];

  // Mapping of car names to their respective routes for navigation
  const carRouteMap = {
    "Maruti Suzuki Swift": "/swift",
    "Hyundai Creta": "/creta",
    "Tata Nexon": "/nexon",
    "Suzuki Ertiga": "/ertiga",
    "Renault Kwid": "/omni", // Changed from "/page5" for consistency, assuming this is the correct route
    "Toyota Innova": "/innova",
    "Honda Activa": "/activa",
  };

  // Function to handle navigation to car details page with loading animation
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

  // Ref for a scroll target section (currently used for a placeholder div)
  const targetSectionRef = useRef(null);
  const scrollToTargetSection = () => {
    targetSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="home-container">
      <LoadingOverlay isLoading={isLoading} />

      {/* Hero Section - Bootstrap Carousel Replica */}
      <HeroCarousel />

      {/* Auto-Playing Card Slider (Fold2 Cards) */}
      <AutoPlayCardSlider data={fold2CardsData} />

      {/* Statistic Data Highlight Section */}
      <StatsHighlightSection />

      {/* Vehicle Categories Section (Discover Cars/Bikes) */}
      <VehicleCategoriesSection />

      {/* About Us Section */}
      <div className="masonrymedia-aka" style={{ position: 'relative' }}>
        <div className="masonrymedia__container masonrymedia__container--right masonrymedia__container--visible">
          {/* Text section */}
          <div className="masonrymedia__card">
            <div className="masonrymedia__card-inner">
              <div className="masonrymedia__card-info">
                <h3 className="masonrymedia__card-title headline headline--xl">JOY OF REDEFINING DRIVING</h3>
                <div className="masonrymedia__card-description body-copy body-copy--s">
                  <p>Welcome.</p>
                  <p>To a world created for the young.</p>
                  <p>The ones who seek innovation with passion.</p>
                </div>
              </div>
              <div className="masonrymedia__card-ctalist linkContainer">
                <div className="primaryLinkContainer">
                  <a
                    className="primary-link icon-arrow-right"
                    onClick={() => {
                      localStorage.setItem("aboutusReady", "false"); // Assuming this is for internal loading state
                      setIsLoading(true);

                      const checkPageReady = setInterval(() => {
                        if (localStorage.getItem("aboutusReady") === "true") {
                          clearInterval(checkPageReady);
                          setIsLoading(false);
                        }
                      }, 100);

                      navigate('/aboutus'); // Navigates to About Us page
                    }}
                  >
                    <span className="cta-content">ABOUT US</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Image mosaic for About Us section */}
          <div className="masonrymedia__mosaic">
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

      {/* Placeholder div for scroll target (appears to be a decorative section) */}
      <div className="cardetail-sections-wrapper01" ref={targetSectionRef}>
        <div className="cardetail-sections-bg01"></div>
        <div className="cardetail-sections-overlay01"></div>
        <div className="cardetail-sections-inner01">
          <div className="cardetail-sections-content01" data-aos="fade-up" data-aos-once="true">
            <p className="cardetail-sections-subtitle01">
              Discover intelligent features, advanced design, and next-level performance with our new-age vehicles.
            </p>
          </div>
        </div>
        <div className="cardetail-sections-scroll-hint01">SCROLL TO EXPLORE ↓</div>
      </div>

      {/* Featured Cars Section */}
      <FeaturedCarsSection
        featuredCars={featuredCars}
        handlePrev={handlePrev} // These handlers are passed but not used within FeaturedCarsSection
        handleNext={handleNext} // as it currently maps all `featuredCars` directly.
        visibleCars={visibleCars} // This prop is passed but not used within FeaturedCarsSection.
        handleViewCarDetails={handleViewCarDetails}
        carRouteMap={carRouteMap}
      />

      {/* Our Range - Category Tabs Section */}
      <div className="Aks__contentRange">
        <div className="Aks__MainRange">
          <div className="Aks__Rangetitle">
            <p className="Aks__subtitle">Our</p>
            <h1 className="Aks__title">Range</h1>
            <div className="Aks__RangeTabs">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={activeTab === cat ? "Aks__tab active" : "Aks__tab"}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="Aks__tabInfo">
              <p>{categoryInfo[activeTab]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Zic-Zac Section - Vehicle Categories with Images and Links */}
      <div className="zic-zic-blocks">
        <div className="zic-data">
          <div className="zic-alternating-content">
            <div className="note"> Tap the card to explore more features!</div>{/* className="mobile-note" => className="note"  */}
            {/* Luxury Vehicles */}
            <div className="support right-aligned" data-aos="slide-right" data-aos-delay="200">
              <Link to="/luxuryvh" className="zic-image-link">
                <picture className="roverimg">
                  <img alt="roverRRJ" className="zic-zac-block-img" src={luxury} />
                </picture>
                <h3 className="masonrymedia__card-title1 headline headline--xl">LUXURY VEHICLES</h3>
              </Link>
            </div>

            {/* Passenger Vehicles */}
            <div className="support left-aligned" data-aos="slide-left" data-aos-delay="200">
              <Link to="/passengervh" className="zic-image-link">
                <picture className="roverimg">
                  <img alt="passenger" className="zic-zac-block-img" src={passenger} />
                </picture>
                <h3 className="masonrymedia__card-title1 headline headline--xl">PASSENGER VEHICLE</h3>
              </Link>
            </div>

            {/* EV Vehicles */}
            <div className="support right-aligned" data-aos="slide-right" data-aos-delay="200">
              <Link to="/evvh" className="zic-image-link">
                <picture className="roverimg">
                  <img alt="ev" className="zic-zac-block-img" src={ev} />
                </picture>
                <h3 className="masonrymedia__card-title1 headline headline--xl">EV VEHICLE</h3>
              </Link>
            </div>

            {/* Commercial Vehicles */}
            <div className="support left-aligned" data-aos="slide-left" data-aos-delay="200">
              <Link to="/commercialvh" className="zic-image-link">
                <picture className="roverimg">
                  <img alt="commercial" className="zic-zac-block-img" src={commercial} />
                </picture>
                <h3 className="masonrymedia__card-title1 headline headline--xl">COMMERCIAL VEHICLE</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Car Section - Image Mosaic with Text */}
      <div className="masonrymedia-aka">
        <div className="masonrymedia__container masonrymedia__container--right masonrymedia__container--visible">
          <div className="masonrymedia__mosaic">
            {/* Image row 1 */}
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
            {/* Image row 2 */}
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

          {/* Text section for Premium Car Section */}
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
                        navigate('/page5'); // Navigates to a generic page 5
                      }, 1500); // Adjust the delay if needed
                    }}
                  >
                    <span className="cta-content">EXPLORE PREMIUM SEGMENT</span>
                  </a>
                </div>
                <div className="secondaryLinkContainer">
                  <a
                    className="secondary-link"
                    href="/carcard" // Direct link to car search
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

      {/* Flip Card Section - Introduction */}
      <section className="intro">
        <p className="cl1">Drive Smarter with Essentials <i className="bi bi-boxes"></i> </p>
        <p className="cl2"> Stay ahead with EMI, service, and parts tracking tools.</p>
      </section>

      {/* Offers Flip Cards Grid */}
      <OffersGridSection offers={offers} />
    </div>
  );
};

export default Home;