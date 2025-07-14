import React from 'react';
import './SlideItem.css';

const SlideItem = ({ title, subtitle, img, bgImage, downimg }) => {
  return (
    <div className="slide-item" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="slide-background-title">{title}</div>

      <div className="slide-content-wrapper">
        <div className="slide-text">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <div className="slide-img">
          <img src={img} alt={title} />
          <div className="img-glow-circle"></div>
        </div>
      </div>

      {/* ✅ Move here */}
      {downimg && (
        <div className="slide-down-img">
          <img src={downimg} alt="Decorative bottom" />
        </div>
      )}
    </div>

  );
};

export default SlideItem;
