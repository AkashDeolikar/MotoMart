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
                  <h2 className="headingSwipe">RR-SV</h2>
                  <p className="psgswipe">Lorem ipsum dolor sit amet.</p>
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
                  <h2 className="headingSwipe">RR-AUTOBIOGRAPHY</h2>
                  <p className="psgswipe">Lorem ipsum dolor sit amet.</p>
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
                  <h2 className="headingSwipe">RR-Luxury RED</h2>
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
                  <h2 className="headingSwipe">RR-HSE</h2>
                  <p className="psgswipe">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="custom-paginationROVER"></div>
    </div>
  );
};

export default Rover;
