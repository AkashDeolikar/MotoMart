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
import premiumBg from "./premium-bg.webp";

import Viewmore from "../cardetails/viewmore";
import SlideItem from "./SlideItem"; // This component seems unused based on commented out usage

//Riding GEAR page import
import GearPage from "../RidingGears/RidingGearPreview";

import wintage from './slideimgasset/wintage.webp';
import wintagemb from './slideimgasset/wintagemb.webp';
import bgt from './slideimgasset/bgt.webp';
import bgtmb from './slideimgasset/bgtmb.webp';
import innovation from './slideimgasset/innovation.webp';
import innovationmb from './slideimgasset/innovationmb.webp';
import busa from './slideimgasset/busa.webp';
import busamb from './slideimgasset/busamb.webp';
import HeroSection from "./HeroSection";
import GoogleCardSlider from "./GoogleCardSlider";
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
    { id: 3, type: 'image', src: premiumBg, title: "Embracing", name: "Clean mobility.", description: "Innovating for a greener tomorrow." },
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

const Slidemoto = () => {
  const slidesData = [
    {
      id: 'slide-1',
      title: 'HERITAGE AND CLASSIC DESIGN',
      description: 'For the timeless rider: Gear that combines vintage style with modern protection.',
      desktopImg: wintage,
      mobileImg: wintagemb,
    },
    {
      id: 'slide-2',
      title: 'ENGINEERING & PERFORMANCE',
      description: 'Inspired by speed: Gear that mirrors the precision and power of a hypercar.',
      desktopImg: bgt,
      mobileImg: bgtmb,
    },

    {
      id: 'slide-3',
      title: 'THE EVOLUTION OF RIDING GEAR',
      description: 'Experience the next generation of ventilated, visible, and incredibly light jackets.',
      desktopImg: 'https://rynoxgear.com/cdn/shop/files/Home_Page_Banner-100_1_1280x.jpg?v=1753511998',
      mobileImg: 'https://rynoxgear.com/cdn/shop/files/Mobile_banner-100_400x.jpg?v=1753512016'
    },
    {
      id: 'slide-4',
      title: 'CUTTING-EDGE PROTECTION TECHNOLOGY',
      description: 'Engineered for strength and designed for ultimate protection on any road.',
      desktopImg: 'https://rynoxgear.com/cdn/shop/files/Defender_handguard_Website_Asset_Home_page_Banner_4_2400x.jpg?v=1753091974',
      mobileImg: 'https://rynoxgear.com/cdn/shop/files/WhatsApp_Image_2025-07-12_at_11.16.45_AM_400x.jpg?v=1752299225'
    },
    {
      id: 'slide-5',
      title: 'PERFORMANCE MEETS INNOVATION',
      description: 'Track precision and road performance, now CE Certified Class AA.',
      desktopImg: innovation,
      mobileImg: innovationmb,
    },
    {
      id: 'slide-6',
      title: 'SAFETY TECHNOLOGY IN HELMETS',
      description: 'Dream big, ride safe, and explore the exclusive helmet range with advanced safety features.',
      desktopImg: 'https://images.wallpaperscraft.com/image/single/motorcycle_motorcyclist_bike_172850_2560x1080.jpg',
      mobileImg: 'https://w0.peakpx.com/wallpaper/159/383/HD-wallpaper-motorcyclist-helmet-motorcycle-equipment.jpg'
    },
    {
      id: 'slide-7',
      title: 'ADVENTURE-READY HYDRATION SYSTEMS',
      description: 'Stay hydrated on-the-go with hassle-free and integrated hydration bladders.',
      desktopImg: 'https://rynoxgear.com/cdn/shop/files/Home_page_copy_4_1280x.jpg?v=1744892193',
      mobileImg: 'https://rynoxgear.com/cdn/shop/files/Mobile_Banner_6_400x.jpg?v=1744892246'
    },
    {
      id: 'slide-8',
      title: 'THE ULTIMATE SPEED MACHINE',
      description: 'Experience unparalleled speed and performance. Designed for those who live life in the fast lane.',
      desktopImg: busa,
      mobileImg: busamb,
    },

  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  const goToSlide = (i) => setCurrentSlide(i);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="main-page-gear">

      {/* Hero Slider Section */}
      <section className="gear-hero-section">
        <div className="gear-slider">
          <div className="gear-slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slidesData.map((slide, index) => (
              <a href={slide.link} key={slide.id} className={`gear-slide ${index === currentSlide ? 'gear-slide-active' : ''}`}>
                <div className="gear-slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  {/* <span className="gear-explore-button">EXPLORE NOW</span> */}
                </div>
                <picture>
                  <source media="(max-width: 768px)" srcSet={slide.mobileImg} />
                  <img src={slide.desktopImg} alt={slide.title} className="gear-slide-image" />
                </picture>
              </a>
            ))}
          </div>
          <button className="gear-slider-arrow gear-slider-arrow-left" onClick={prevSlide}>&lt;</button>
          <button className="gear-slider-arrow gear-slider-arrow-right" onClick={nextSlide}>&gt;</button>
          <div className="gear-slider-dots">
            {slidesData.map((_, i) => (
              <button key={i} className={`gear-slider-dot ${i === currentSlide ? 'gear-dot-active' : ''}`} onClick={() => goToSlide(i)} />
            ))}
          </div>
        </div>
      </section>
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
      <h2 className="carslidefeatured-heading">Experience Every Angle</h2>

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
  <section className="offers-section">
    <h2 className="offers-heading">Smart Tools for Your Vehicle</h2>
    <div className="offers-grid" data-aos="fade-up">
      {offers.map((offer) => (
        <Link to={offer.link} key={offer.id} className="offer-card">
          <div className="offer-card-content">
            <img className="offer-icon" src={offer.image} alt={offer.title} />
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <span className="offer-link">{offer.text}</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

/**
 * Renders the Vehicle Categories section.
 */
const VehicleCategoriesSection = () => {
  return (
    <section className="vc-hero">
      {/* Background */}
      <div className="vc-bg" />
      <div className="vc-overlay" />

      {/* Content */}
      <div className="vc-inner">
        <div className="vc-content">
          <h1 className="vc-title">Redefine Your Drive</h1>
          <p className="vc-subtitle">
            Explore luxury, performance, and innovation — all in one place.
          </p>
          <div className="vc-actions">
            <Link to="/cardetails" className="vc-btn vc-btn-primary">
              Discover Cars <FaArrowRight className="vc-arrow" />
            </Link>
            <Link to="/BikeCompareDetails" className="vc-btn vc-btn-outline">
              Discover Bikes <FaArrowRight className="vc-arrow" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="vc-scroll">SCROLL ↓</div>
    </section>
  );
};

// ===============================================
// Main Home Component
// ===============================================

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(
    () => sessionStorage.getItem("homeActiveTab") || "SUV"
  );

  useEffect(() => {
    sessionStorage.setItem("homeActiveTab", activeTab);
  }, [activeTab]);

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
    { id: 8, name: "Bajaj NS200", price: "1.45 Lakh", image: "./images/ns200/7.webp" },
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
    "Bajaj NS200": "/ns",
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

      <HeroSection />
      <GoogleCardSlider />

      {/* <HeroCarousel /> NOT USING THIS */}
      {/* <Slidemoto /> NOT USING THIS*/}
      {/* Auto-Playing Card Slider (Fold2 Cards) */}
      {/* <AutoPlayCardSlider data={fold2CardsData} />   NOT USING THIS */}

      {/* Vehicle Categories Section (Discover Cars/Bikes) */}
      <VehicleCategoriesSection />


      {/* About Us Section */}
      <div className="masonrymedia">
        <div className="masonrymedia__container">
          {/* Left: Text Section */}
          <div className="masonrymedia__card">
            <div className="masonrymedia__card-inner">
              <h3 className="masonrymedia__card-title">JOY OF REDEFINING DRIVING</h3>
              <div className="masonrymedia__card-description">
                <p>Welcome.</p>
                <p>To a world created for the young.</p>
                <p>The ones who seek innovation with passion.</p>
              </div>
              <div className="masonrymedia__card-cta">
                <button
                  className="primary-btn"
                  onClick={() => {
                    localStorage.setItem("aboutusReady", "false");
                    setIsLoading(true);
                    const checkPageReady = setInterval(() => {
                      if (localStorage.getItem("aboutusReady") === "true") {
                        clearInterval(checkPageReady);
                        setIsLoading(false);
                      }
                    }, 100);
                    navigate("/aboutus");
                  }}
                >
                  ABOUT US
                </button>
              </div>
            </div>
          </div>

          {/* Right: Image Grid */}
          <div className="masonrymedia__mosaic">
            <div className="masonrymedia__row">
              <div className="masonrymedia__cell">
                <img src={bimg1} alt="Interior Steering" className="masonrymedia__image" />
              </div>
              <div className="masonrymedia__cell">
                <img src={bimg2} alt="Headlight" className="masonrymedia__image" />
              </div>
            </div>
            <div className="masonrymedia__row masonrymedia__row--main">
              <div className="masonrymedia__cell masonrymedia__cell--narrow">
                <img src={bimg3} alt="Woman Driving" className="masonrymedia__image" loading="lazy" />
              </div>
              <div className="masonrymedia__cell masonrymedia__cell--main">
                <img src={bimg4} alt="Gear Knob" className="masonrymedia__image" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Placeholder div for scroll target (appears to be a decorative section) */}
      <section
        className="cardetail-sections-wrapper01"
        ref={targetSectionRef}
      >
        {/* Background & Overlay */}
        <div className="cardetail-sections-bg01"></div>
        <div className="cardetail-sections-overlay01"></div>

        {/* Inner Content */}
        <div className="cardetail-sections-inner01">
          <div
            className="cardetail-sections-content01"
            data-aos="fade-up"
            data-aos-once="true"
          >
            <h1 className="cardetail-sections-title01">
              Made for How You Move.
            </h1>
            <p className="cardetail-sections-subtitle01">
              From daily commutes to weekend adventures, experience vehicles built around people — not machines.
            </p>

          </div>
        </div>

        {/* Scroll Hint */}
        <div className="cardetail-sections-scroll-hint01">
          SCROLL TO EXPLORE ↓
        </div>
      </section>

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

      {/* Vehicle Categories Section */}
      <section className="vehicle-categories">
        <div className="vehicle-categories__container">
          <h2 className="vehicle-categories__title">Explore Our Vehicle Range</h2>

          <div className="vehicle-categories__grid">
            {/* Luxury */}
            <Link to="/luxuryvh" className="vehicle-card">
              <div className="vehicle-card__image-wrapper">
                <img src={luxury} alt="Luxury Vehicles" />
              </div>
              <h3>Luxury Vehicles</h3>
            </Link>

            {/* Passenger */}
            <Link to="/passengervh" className="vehicle-card">
              <div className="vehicle-card__image-wrapper">
                <img src={passenger} alt="Passenger Vehicles" />
              </div>
              <h3>Passenger Vehicle</h3>
            </Link>

            {/* EV */}
            <Link to="/evvh" className="vehicle-card">
              <div className="vehicle-card__image-wrapper">
                <img src={ev} alt="EV Vehicles" />
              </div>
              <h3>EV Vehicle</h3>
            </Link>

            {/* Commercial */}
            <Link to="/commercialvh" className="vehicle-card">
              <div className="vehicle-card__image-wrapper">
                <img src={commercial} alt="Commercial Vehicles" />
              </div>
              <h3>Commercial Vehicle</h3>
            </Link>
          </div>
        </div>
      </section>


      {/* Premium Car Section */}
      <div className="masonrymedia premium-car">
        <div className="masonrymedia__container masonrymedia__container--reverse">

          {/* Left: Image Mosaic */}
          <div className="masonrymedia__mosaic">
            {/* Image row 1 */}
            <div className="masonrymedia__row">
              <div className="masonrymedia__cell">
                <img alt="Interior Steering" className="masonrymedia__image" src={img1} />
              </div>
              <div className="masonrymedia__cell">
                <img alt="Headlight" className="masonrymedia__image" src={img4} />
              </div>
            </div>
            {/* Image row 2 */}
            <div className="masonrymedia__row masonrymedia__row--main">
              <div className="masonrymedia__cell masonrymedia__cell--narrow">
                <img alt="Woman Driving" className="masonrymedia__image" src={img3} loading="lazy" />
              </div>
              <div className="masonrymedia__cell masonrymedia__cell--main">
                <img alt="Gear Knob" className="masonrymedia__image" src={img2} loading="lazy" />
              </div>
            </div>
          </div>

          {/* Right: Text Section */}
          <div className="masonrymedia__card">
            <div className="masonrymedia__card-inner">
              <h3 className="masonrymedia__card-title">ELEGANCE IN MOTION</h3>
              <p className="masonrymedia__card-description">
                Sophisticated elegance.
              </p>
              <div className="masonrymedia__card-ctalist">
                <button
                  className="primary-btn"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      navigate("/page5");
                    }, 1500);
                  }}
                >
                  EXPLORE PREMIUM SEGMENT
                </button>
                <a
                  className="secondary-btn"
                  href="/carcard"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Re-direct to Car Search
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      <StatsHighlightSection />

      {/* Flip Card Section - Introduction */}
      <section className="intro">
        <h2 className="intro-title">Smarter Vehicle Management</h2>
        <p className="intro-subtitle">
          Track EMI, services, and spare parts—all in one place.
        </p>
      </section>


      {/* Offers Flip Cards Grid */}
      <OffersGridSection offers={offers} />

      <GearPage />
    </div>
  );
};

export default Home;