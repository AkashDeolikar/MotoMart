import React, { useState, useEffect } from 'react';
import './MainPageGear.css';

import img1 from './GearAssets/img1.webp';
import img2 from './GearAssets/img2.webp';
import img3 from './GearAssets/img3.webp';
import img4 from './GearAssets/img4.webp';
import img5 from './GearAssets/img5.webp';
import img6 from './GearAssets/img6.webp';
import img7 from './GearAssets/img7.webp';
import banner from './GearAssets/banner.webp';

const slidesData = [
  {
    id: 'slide-1',
    title: 'HELIUM GT 3 JACKET',
    description: 'Ventilated. Visible. Incredibly Light',
    desktopImg: 'https://rynoxgear.com/cdn/shop/files/Home_Page_Banner-100_1_1280x.jpg?v=1753511998',
    mobileImg: 'https://rynoxgear.com/cdn/shop/files/Mobile_banner-100_400x.jpg?v=1753512016'
  },
  {
    id: 'slide-2',
    title: 'DEFENDER PRO HANDGUARDS',
    description: 'Engineered for Strength, Designed for Protection.',
    desktopImg: 'https://rynoxgear.com/cdn/shop/files/Defender_handguard_Website_Asset_Home_page_Banner_4_2400x.jpg?v=1753091974',
    mobileImg: 'https://rynoxgear.com/cdn/shop/files/WhatsApp_Image_2025-07-12_at_11.16.45_AM_400x.jpg?v=1752299225'
  },
  {
    id: 'slide-3',
    title: 'APEX EVO JACKET - CE CERTIFIED CLASS AA',
    description: 'Track Precision. Road Performance.',
    desktopImg: 'https://rynoxgear.com/cdn/shop/files/Home_page_copy_6_1280x.jpg?v=1749287507',
    mobileImg: 'https://rynoxgear.com/cdn/shop/files/Mobile_Banner_8_400x.jpg?v=1749287523'
  },
  {
    id: 'slide-4',
    title: 'EXCLUSIVE HELMETS',
    description: 'Dream big, ride safe, wear a helmet',
    desktopImg: 'https://images.wallpaperscraft.com/image/single/motorcycle_motorcyclist_bike_172850_2560x1080.jpg',
    mobileImg: 'https://w0.peakpx.com/wallpaper/159/383/HD-wallpaper-motorcyclist-helmet-motorcycle-equipment.jpg'
  },
  {
    id: 'slide-5',
    title: 'RELOAD HYDRATION BLADDER',
    description: 'Hassle-free hydration on-the-go.',
    desktopImg: 'https://rynoxgear.com/cdn/shop/files/Home_page_copy_4_1280x.jpg?v=1744892193',
    mobileImg: 'https://rynoxgear.com/cdn/shop/files/Mobile_Banner_6_400x.jpg?v=1744892246'
  },
  {
    id: 'slide-6',
    title: 'Navigator Frame Bags 24L Stormproof – For RE Himalayan 450',
    description: 'Mount. Move. Conquer!',
    desktopImg: 'https://rynoxgear.com/cdn/shop/files/Home_page_copy_3_1280x.jpg?v=1743917923',
    mobileImg: 'https://rynoxgear.com/cdn/shop/files/Mobile_Banner_5_400x.jpg?v=1743917937'
  },
];

const categoryData = [
  { title: 'OFFROAD', img: img1, link: '/RaidOffroadGear', size: 'large' },
  { title: 'GLOVES', img: img2, link: '/Glovespage', size: 'large' },
  { title: 'JACKETS', img: img3, link: '/JacketsPage', size: 'large' },
  { title: 'BASE LAYERS', img: img4, link: '/BaseLayerPage', size: 'small' },
  { title: 'PANTS', img: img5, link: '/RidingPantsPage', size: 'small' },
  { title: 'TAIL BAGS', img: img6, link: '/TailBagPage', size: 'small' },
  { title: 'SADDLEBAGS', img: img7, link: '/SaddleBagPage', size: 'small' }
];

const MainPageGear = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  const goToSlide = (i) => setCurrentSlide(i);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="gear-main-page-container">

      {/* Hero Slider Section */}
      <section className="gear-hero-section">
        <div className="gear-slider">
          <div className="gear-slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slidesData.map((slide, index) => (
              <a href={slide.link} key={slide.id} className={`gear-slide ${index === currentSlide ? 'gear-slide-active' : ''}`}>
                <div className="gear-slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <span className="gear-explore-button">EXPLORE NOW</span>
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

      {/* Product Categories Grid 1 (Large) */}
      <section className="gear-category-grid gear-category-grid-large">
        {categoryData.filter(item => item.size === 'large').map((item, idx) => (
          <a href={item.link} className="gear-category-card" key={idx}>
            <img src={item.img} alt={item.title} />
            <span className="gear-category-label">{item.title}</span>
          </a>
        ))}
      </section>

      {/* Product Categories Grid 2 (Small) */}
      <section className="gear-category-grid gear-category-grid-small">
        {categoryData.filter(item => item.size === 'small').map((item, idx) => (
          <a href={item.link} className="gear-category-card gear-category-card-small" key={idx}>
            <img src={item.img} alt={item.title} />
            <span className="gear-category-label">{item.title}</span>
          </a>
        ))}
      </section>

      {/* Pro Series & Featured Product Section */}
      <section className="gear-pro-series-section">
        <a href="/pro-series" className="gear-pro-card">
          <div className="gear-pro-overlay">
            <h3>PRO SERIES</h3>
            <span className="gear-explore-more-btn">EXPLORE MORE</span>
          </div>
        </a>
        <a href="/featured-product" className="gear-featured-product-card">
          <img
            src={banner}
            alt="Featured Jacket"
            className="gear-featured-image"
          />
        </a>
      </section>
    </div>
  );
};

export default MainPageGear;