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
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

// Page swipe imports
import { Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

//AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

import img1 from './assetimg/img1.jpg';
import img2 from './assetimg/img2.jpg';
import img3 from './assetimg/img3.jpg';
import img4 from './assetimg/img4.jpg';

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
      <div className="progress-container">
        <div className="progress" role="progressbar" aria-label="Loading..." aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '90%' }}><i className="bi bi-cloud-arrow-down" style={{ fontSize: '15px' }}> Loading...</i></div>
        </div>
        <p className="loading-text">Please wait while we load the details...</p>
      </div>
    </div>
  );
};

/**
 * Renders the Bootstrap Carousel for the hero section.
 */
const HeroCarousel = () => (
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
);

/**
 * Renders an auto-playing Swiper slider for "Fold2" cards.
 * @param {object} props - Component props.
 * @param {Array<object>} props.data - Array of card data.
 */
const AutoPlayCardSlider = ({ data }) => (
  <section className="home-fold2">
    <div className="fold2-sldr-cvr" data-aos="fade-up" data-aos-once="true">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={'auto'}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 4000 }}
        className="fold2-sldr"
      >
        {data.map((card, index) => (
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
);

/**
 * Renders the About Us section with a background image and scroll-down arrow.
 * @param {object} props - Component props.
 * @param {function} props.scrollToTargetSection - Function to scroll to a target section.
 */
const AboutUsSection = ({ scrollToTargetSection }) => (
  <div className="backgroundimage" data-aos="fade" data-aos-once="true">
    <section className="naming" data-aos="fade-up" data-aos-once="true">
      <h1>THE HEART OF JOY-REDEFINING DRIVING</h1>
      <div className="aboutus" data-aos="fade-up" data-aos-once="true">
        <h5>About us</h5>
        <h5>Agile, new-age and future-ready</h5>
        <p className="passage">We are India’s market leader in commercial vehicles and amongst the top three in the passenger vehicles market. We prioritise human centricity with technological prowess and engineering excellence to make cargo and passenger mobility safer, smarter and greener.</p>
      </div>
    </section>
    <i
      className="bi bi-arrow-down-circle bounce-arrow"
      style={{
        position: 'absolute',
        top: '100px',
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
);

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
 * Renders the full-page swipe sections for different vehicle categories.
 */
const SwipePagesSection = () => (
  <div className="ConstantBGHomeSwipe" data-aos="fade" data-aos-once="true">
    <Swiper
      pagination={{
        clickable: true,
        el: '.custom-pagination',
        bulletClass: 'custom-bullet',
        bulletActiveClass: 'custom-bullet-active',
      }}
      modules={[Pagination, EffectFade]}
      spaceBetween={30}
      slidesPerView={1}
      effect="fade"
      fadeEffect={{
        crossFade: true,
      }}
    >
      <SwiperSlide>
        <div className="swipebg">
          <div className="swipeimg1">
            <div className="T1PageSwipe" data-aos="flip-left" data-aos-once="true">
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
            <div className="T1PageSwipe" data-aos="flip-left" data-aos-once="true">
              <h2 className="constantBGT1pageSwipe" >Passenger Vehicle</h2>
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
            <div className="T1PageSwipe" data-aos="flip-left" data-aos-once="true">
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
            <div className="T1PageSwipe" data-aos="flip-left" data-aos-once="true">
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
    </Swiper>
    <div className="custom-pagination"></div>
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
    <section className="vehicle-categories-section" data-aos="fade-up">
      <div className="container1" data-aos="zoom-in">
        <h2 className="section-title">Our Vehicles</h2>
        <div className="category-cards-grid">

          {/* Car Card */}
          <div className="category-card" data-aos="fade-up" >
            <div className="card-inner">
              <div className="card-front">
                <Link to="/carcard">
                  <img src="/images/car.jpg" alt="Car" />
                </Link>
                <div className="card-title-overlay">Cars</div>
              </div>
              <div className="card-back">
                <p>Explore our wide range of passenger cars.</p>
                <Link to="/carcard" className="view-btn">Explore</Link>
              </div>
            </div>
          </div>

          {/* Bike Card */}
          <div className="category-card" data-aos="fade-up" >
            <div className="card-inner">
              <div className="card-front">
                <Link to="/bikecard">
                  <img src="/images/bike.jpg" alt="Bike" />
                </Link>
                <div className="card-title-overlay">Bikes</div>
              </div>
              <div className="card-back">
                <p>Discover our collection of motorcycles and scooters.</p>
                <Link to="/bikecard" className="view-btn">Explore</Link>
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

  // const vehicles = [
  //   {
  //     name: "EV Car 1",
  //     img: "/images/evcar1.jpg"
  //   },
  //   {
  //     name: "EV Bike",
  //     img: "/images/evbike.jpg"
  //   },
  //   {
  //     name: "EV Car 2",
  //     img: "/images/evcar2.jpg"
  //   }
  // ];

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
      <LoadingOverlay isLoading={isLoading} />

      <HeroCarousel />

      <AutoPlayCardSlider data={fold2CardsData} />

      {/* NEW RECOMMENDED POSITION FOR VEHICLE CATEGORIES SECTION */}
      <VehicleCategoriesSection />
      {/* END NEW RECOMMENDED POSITION */}

      <AboutUsSection scrollToTargetSection={scrollToTargetSection} />

      {/* Placeholder div for scroll target */}
      <div ref={targetSectionRef} className="hand-image-box" >
        <div className="hand-image-text" data-aos="fade" >
          <h2>Experience the Future of Driving</h2>
        </div>
      </div>

      <FeaturedCarsSection
        featuredCars={featuredCars}
        handlePrev={handlePrev}
        handleNext={handleNext}
        visibleCars={visibleCars}
        handleViewCarDetails={handleViewCarDetails}
        carRouteMap={carRouteMap}
      />

      {/*Luxury vehicle intro */}
      <div className="hand-image-box1" data-aos="fade">
        <div className="hand-image-text1" data-aos="zoom-in">
          <h2>Stay inspired</h2>
          <h4>This is just the beginning. <i className="bi bi-gem"></i> </h4>
        </div>
      </div>

      <SwipePagesSection />

      {/* <SustainabilitySection /> */}
      <div className="masonrymedia-aka">
        <div className="masonrymedia__container masonrymedia__container--right masonrymedia__container--visible">
          <div className="masonrymedia__mosaic">
            {/* Top row */}
            <div className="masonrymedia__row masonrymedia__row--supportive">
              <div className="masonrymedia__cell">
                <picture className="masonrymedia__picture" data-aos="zoom-in-right" data-aos-delay="100">
                  <img alt="Interior Steering" className="masonrymedia__image" src={img1}  />
                </picture>
              </div>
              <div className="masonrymedia__cell">
                <picture className="masonrymedia__picture" data-aos="zoom-in-right" data-aos-delay="250">
                  <img alt="Headlight" className="masonrymedia__image" src={img4}  />
                </picture>
              </div>
            </div>

            {/* Bottom row */}
            <div className="masonrymedia__row masonrymedia__row--main">
              <div className="masonrymedia__cell masonrymedia__cell--narrow">
                <picture className="masonrymedia__picture" data-aos="zoom-in" data-aos-delay="350" >
                  <img alt="Woman Driving" className="masonrymedia__image" src={img3} loading="lazy" />
                </picture>
              </div>
              <div className="masonrymedia__cell masonrymedia__cell--main">
                <picture className="masonrymedia__picture" data-aos="zoom-in" data-aos-delay="500">
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
                    href="/rover"
                    target="_self"
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




      {/* Hot Deals Section */}
      <div className="deals" data-aos="fade-right" data-aos-delay="400">
        <h2>⚡ Vehicle Powertrain Options</h2>
<ul>
  <li>🔋 Electric Vehicles (EV): Zero emissions, silent drive, low maintenance</li>
  <li>⛽ Petrol Engines: Smooth performance with city-friendly mileage</li>
  <li>🛢️ Diesel Engines: High torque, great for long-distance and heavy usage</li>
  <li>🔄 Hybrid Systems: Combines fuel economy of EV with petrol range</li>
</ul>

      </div>

      <section className="intro">
        <p className="cl1">Empower your <i className="bi bi-boxes"></i></p>
        <p className="cl2">digital Journey</p>
      </section>

      <OffersGridSection offers={offers} />
    </div>
  );
};

export default Home;