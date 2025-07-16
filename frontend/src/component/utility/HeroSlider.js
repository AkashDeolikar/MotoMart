import React, { useState } from 'react';
import './HeroSlider.css';
import SlideItem from './SlideItem';

// import img1 from '../utility/slideasset/blueberry.png';
import img1 from '../utility/im3.png';
import img2 from '../utility/slideasset/coke.png';
import img3 from '../utility/im41.png';

import bg1 from './slideasset/s-bg3.jpg';
import bg2 from './slideasset/s-bg2.jpg';
import bg3 from './slideasset/s-bg1.jpg';

import downbg1 from './slideasset/rocks3.png';
import downbg2 from './slideasset/rock2.png';
import downbg3 from './slideasset/rocks1.png';

const slides = [
  {
    title: "MotoMart Drive",
    subtitle: "Unleash performance with every ride.",
    img: img1,
    bgImage: bg1,
    downimg: downbg1,
  },
  {
    title: "Tomorrow's Mobility",
    subtitle: "Driving the future, one innovation at a time.",
    img: null,
    bgImage: bg2,
    downimg: downbg2,
    video: "https://www.tatamotors.com/wp-content/themes/TataMotors/video/TML-Desktop-video.mp4", 
  },
  {
    title: "Explore the Road",
    subtitle: "Where style meets performance.",
    img: img3,
    bgImage: bg3,
    downimg: downbg3,
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const currentSlide = slides[current];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-slider">
      <SlideItem
        title={currentSlide.title}
        subtitle={currentSlide.subtitle}
        img={currentSlide.img}
        downimg={currentSlide.downimg}
        bgImage={currentSlide.bgImage}
        video={currentSlide.video}
      />

      <div className="slider-nav">
        <button onClick={prevSlide}>⬅ Prev</button>
        <button onClick={nextSlide}>Next ➡</button>
      </div>

    </div>
  );
};

export default HeroSlider;
