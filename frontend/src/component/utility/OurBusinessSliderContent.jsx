import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";

function OurBusinessSliderContent() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="slider-container">
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        className="main-slider"
      >
        <SwiperSlide><img src="/images/business-1.jpg" alt="Business 1" /></SwiperSlide>
        <SwiperSlide><img src="/images/business-2.jpg" alt="Business 2" /></SwiperSlide>
        <SwiperSlide><img src="/images/business-3.jpg" alt="Business 3" /></SwiperSlide>
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={3}
        modules={[Thumbs]}
        className="thumbs-slider"
      >
        <SwiperSlide><img src="/images/business-1-thumb.jpg" alt="Thumb 1" /></SwiperSlide>
        <SwiperSlide><img src="/images/business-2-thumb.jpg" alt="Thumb 2" /></SwiperSlide>
        <SwiperSlide><img src="/images/business-3-thumb.jpg" alt="Thumb 3" /></SwiperSlide>
      </Swiper>
    </div>
  );
}
