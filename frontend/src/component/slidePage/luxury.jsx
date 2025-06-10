import React, { useState } from "react";
import "./styles.css";

const BRANDS = [
  {
    name: "Range Rover",
    logo: "https://media.landrover.com/themes/custom/jlr_media/images/modern-luxury/rr-logo.svg",
    media: {
      type: "mp4",
      src: "https://cdn.pixabay.com/video/2024/08/20/227567_large.mp4",
      poster: "https://listers.co.uk/img/cms/72ec43c1-546c-4e12-8b57-f24bad6bdb5c/1600x-1.webp",
    },
    href: "https://www.rangerover.com",
  },
  {
    name: "Defender",
    logo: "https://media.landrover.com/themes/custom/jlr_media/images/modern-luxury/defender-logo.svg",
    media: {
      type: "mp4",
      src: "https://cdn.pixabay.com/video/2025/03/06/262905_large.mp4",
      poster: "https://listers.co.uk/img/cms/123e181b-a8b5-490d-8f4d-5deadc738335/1600x-1.webp",
    },
    href: "https://www.landrover.com/vehicles/defender",
  },
  {
    name: "Discovery",
    logo: "https://media.landrover.com/themes/custom/jlr_media/images/modern-luxury/discovery-logo.svg",
    media: {
      type: "mp4",
      src: "https://cdn.pixabay.com/video/2021/02/10/64759-510850877_large.mp4",
      poster: "https://listers.co.uk/img/cms/fe850470-72b4-40fd-ab7d-ffda9b35fdc2/1600x-1.webp",
    },
    href: "https://www.landrover.com/vehicles/discovery",
  },
];

const Luxury = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="hob-wrapper">
      {BRANDS.map(({ name, logo, media, href }) => (
        <a
          key={name}
          href={href}
          className="hob-poster"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(name)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Show poster by default, video only on hover */}
          <div className="hob-media-container">
            <img
              className="hob-poster-image"
              src={media.poster}
              alt={`${name} poster`}
              style={{ opacity: hovered === name ? 0 : 1 }}
            />
            {hovered === name && (
              media.type === "mp4" ? (
                <video
                  className="hob-video"
                  src={media.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={media.poster}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <iframe
                  className="hob-video"
                  src={media.src}
                  title={name}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  frameBorder="0"
                />
              )
            )}
          </div>

          <div className="hob-overlay">
            <img src={logo} alt={`${name} logo`} className="hob-logo" />
            <span className="hob-cta">ENTER</span>
          </div>
        </a>
      ))}
    </section>
  );
};

export default Luxury;
