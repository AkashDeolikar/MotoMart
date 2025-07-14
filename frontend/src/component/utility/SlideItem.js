import React from 'react';
import './SlideItem.css';

const SlideItem = ({ title, subtitle, img, bgImage }) => {
  return (
    <div
      className="slide-item"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="slide-background-title">{title}</div>

      <div className="slide-content-wrapper">
        <div className="slide-text">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <button className="cta-btn">Order Today</button>
        </div>

        <div className="slide-img">
          <img src={img} alt={title} />
          <div className="img-glow-circle"></div>
        </div>
      </div>
    </div>
  );
};

export default SlideItem;
