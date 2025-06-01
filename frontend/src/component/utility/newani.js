import React, { useEffect, useState } from 'react';
import './tab.css';

const colors = [
  '#f44336', // red
  '#e91e63', // pink
  '#9c27b0', // purple
  '#3f51b5', // indigo
  '#2196f3', // blue
  '#009688', // teal
  '#4caf50', // green
  '#ff9800', // orange
  '#795548', // brown
  '#607d8b'  // blue-grey
];

const newani = () => {
  const [bgColor, setBgColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(nextColor);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    // <div
    //   style={{
    //     backgroundColor: bgColor,
    //     transition: 'background-color 1s ease',
    //     height: '100vh',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     color: 'white',
    //     fontSize: '2rem',
    //     fontFamily: 'Arial, sans-serif'
    //   }}
    // >
    //   Auto-Changing Background
    // </div>
    <div className="card-container">
      <span className="circle-container">
        <span className="circle-inner"></span>
      </span>

      <div className="video-section">
        <section>
          <video
            muted
            playsInline
            disableRemotePlayback
            poster="https://www.gstatic.com/search-labs/in/en/6a8eb723-14fd-45c3-b33c-9dde7c877698_poster.png"
            className="video-element"
          >
            <source
              src="https://www.gstatic.com/search-labs/in/en/6a8eb723-14fd-45c3-b33c-9dde7c877698.mp4#t=0.01"
              type="video/mp4"
            />
          </video>
        </section>
      </div>

      <div className="content">
        <div className="title-section">
          <img
            src="https://www.gstatic.com/search-labs/37e2a921-8da9-4722-91d4-b874a0639988.png"
            alt=""
            className="thumbnail"
          />
          <div className="title">
            <a href="/search/experiment/1">AI overviews and more</a>
            <i className="material-icons">chevron_right</i>
          </div>
        </div>

        <p className="description">
          Try the latest AI experiments in Search, and get AI overviews on more topics in Labs. Ask anything, get inspired and find what you're looking for in faster, easier ways with insights from the web.
        </p>

        <span className="learn-more">Learn More</span>

        <div className="button-row">
          <button className="feedback-btn">
            <i className="material-icons">rate_review</i>
            Feedback
          </button>

          <button className="toggle-btn">
            <div className="toggle-circle"></div>
            <div className="toggle-label">Turn on</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default newani;
