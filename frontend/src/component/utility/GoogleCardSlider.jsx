import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "./GoogleCardSlider.css";

const googleCards = [
  {
    className: "card-pic1",
    heading: "The electric advantage",
    subheading: "Powering the future with clean technology",
    link: "/page1",
  },
  {
    className: "card-pic2",
    heading: "Building for progress",
    subheading: "Innovating products that matter",
    link: "/page2",
  },
  {
    className: "card-pic3",
    heading: "Future-ready begins here",
    subheading: "Designed for tomorrow’s world",
    link: "/page3",
  },
  {
    className: "card-pic4",
    heading: "Committed to do good",
    subheading: "Sustainability at the core",
    link: "/page4",
  },
];

const GoogleCardSlider = () => {
  const canLoop = googleCards.length >= 3;

  const handleCardClick = (link) => {
    // Navigate to the link
    window.location.href = link;
  };

  return (
    <section className="google-slider">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop={canLoop}
        autoplay={canLoop ? { delay: 4000, disableOnInteraction: false } : false}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 1.2,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="google-swiper"
      >
        {googleCards.map((card, index) => (
          <SwiperSlide key={index} className="google-slide">
            <div
              className={`google-card ${card.className}`}
              onClick={() => handleCardClick(card.link)}
              style={{ cursor: "pointer" }}
            >
              <div className="google-card-overlay" />
              <div className="google-card-content">
                <h3>{card.heading}</h3>
                <p>{card.subheading}</p>
                <a
                  href={card.link}
                  className="google-link"
                  onClick={(e) => e.stopPropagation()} // prevent double navigation
                >
                  Explore <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GoogleCardSlider;
