// Rover.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./rover.css";

const Rover = () => {
  return (
    <div className="roverpage">
      <Swiper
        pagination={{
          clickable: true,
          el: ".custom-paginationROVER",
          bulletClass: "custom-rover",
          bulletActiveClass: "custom-rover-active",
        }}
        modules={[Pagination, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}  
      >
        <SwiperSlide>
          <div className="rover-box">
            <div className="rover-types">
              <div className="rover-sv">
                <div className="pageswipe">
                  <h2 className="headingSwipe">RANGE ROVER-SV</h2>
                  <p className="psgswipe">Refined. Luxurious. Exclusive.</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="rover-box">
            <div className="rover-types">
              <div className="rover-autobiography">
                <div className="pageswipe">
                  <h2 className="headingSwipe">RANGE ROVER-AUTOBIOGRAPHY</h2>
                  <p className="psgswipe">The unmistakeable expression of refinement and luxury..</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="rover-box">
            <div className="rover-types">
              <div className="rover-luxury">
                <div className="pageswipe">
                  <h2 className="headingSwipe">RANGE ROVER-LUXURY RED</h2>
                  <p className="psgswipe">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="rover-box">
            <div className="rover-types">
              <div className="rover-hse">
                <div className="pageswipe">
                  <h2 className="headingSwipe">RANGE ROVER-HSE</h2>
                  <p className="psgswipe">Range Rover in its purest form.</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="custom-paginationROVER"></div>

      {/* <li class="cmp-readyToGoBar__item"> */}
      <div className="listrover">
        <a
          className="cmp-readyToGoBar__link"
          href="https://www.findmeasuv.in/pricing_pdf/land-rover-vehicles-price-in-india.pdf"
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
          <div className="cmp-readyToGoBar__copy body-copy" aria-hidden="true">
            <p>View vehicle prices online.</p>
          </div>
        </a>
      </div>

      {/* </li> */}
    </div>
  );
};

export default Rover;
