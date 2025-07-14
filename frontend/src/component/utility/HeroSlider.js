import React, { useState } from 'react';
import './HeroSlider.css';
import SlideItem from './SlideItem';

import img1 from '../utility/slideasset/blueberry.png';
import img2 from '../utility/slideasset/coke.png';
import img3 from '../utility/slideasset/berry.png';

import bg1 from './slideasset/s-bg1.jpg';
import bg2 from './slideasset/s-bg2.jpg';
import bg3 from './slideasset/s-bg3.jpg';

const slides = [
  {
    title: "Plasma Shock",
    subtitle: "Shock your senses with citrus energy.",
    img: img1,
    bgImage: bg1,
  },
  {
    title: "Titan Burn",
    subtitle: "Fuel the fire within.",
    img: img2,
    bgImage: bg2,
  },
  {
    title: "Nebula Berry",
    subtitle: "Berry beyond the stars.",
    img: img3,
    bgImage: bg3,
  },
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
        bgImage={currentSlide.bgImage}
      />

      <div className="slider-nav">
        <button onClick={prevSlide}>⬅ Prev</button>
        <button onClick={nextSlide}>Next ➡</button>
      </div>

      <div className="slider-flavors">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={index === current ? 'active' : ''}
          >
            {slide.title.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
