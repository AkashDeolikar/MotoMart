// Rover.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./jaguar.css";

const Jaguar = () => {
  return (
    <div className="jaguarpage">
      <Swiper
        pagination={{
          clickable: true,
          el: ".custom-paginationJAGUAR",
          bulletClass: "custom-jaguar",
          bulletActiveClass: "custom-jaguar-active",
        }}
        modules={[Pagination, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
      >
        <SwiperSlide>
          <div className="jaguar-box">
            <div className="jaguar-types">
              <div className="jaguar-sv">
                <div className="pageswipe">
                  <h2 className="headingSwipe">Jaguar Type 00</h2>
                  <p className="psgswipe">Future. Vision
                    Bold. Unexpected. Fearless.</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="jaguar-box">
            <div className="jaguar-types">
              <div className="jaguar-autobiography">
                <div className="pageswipe">
                  <h2 className="headingSwipe">JAGUAR F‑PACE</h2>
                  <p className="psgswipe">Luxury performance SUV offering practicality and efficiency.
                    SUV
                    DRIVETRAIN: AWD
                    ENGINE: Diesel/Petrol
                    PASSENGERS: 5</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>


      </Swiper>

      <div className="custom-paginationJAGUAR"></div>

      {/* <li class="cmp-readyToGoBar__item"> */}
      <div className="premium-highlight-section">
            <p className="premium-text">
              Explore our exclusive collection of <strong>Jaguar Cars</strong> handpicked for enthusiasts & connoisseurs.
              <a
                className="premium-cta-button"
                href="/jaguarcar"
                //   target="_blank"
                title="Browse Premium Segment"
              >
                View Collection
              </a>
            </p>
          </div>
      <div className="listjaguar">
        <a
          className="cmp-readyToGoBar__link"
          href="https://www.findmeasuv.in/pricing_pdf/land-jaguar-vehicles-price-in-india.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="VIEW PRICES - View vehicle prices online."
        >
          <i className="bi bi-book"></i>
          <h2 className="cmp-readyToGoBar__heading headline headline--s" aria-hidden="true">
            <div className="cmp-readyToGoBar__heading-inner">
              <p className="view-prices-title"><i class="bio bi-chevron-right small-icon"></i> VIEW PRICES</p>
            </div>
          </h2>
        </a>
      </div>

      {/* </li> */}
    </div>
  );
};

export default Jaguar;
