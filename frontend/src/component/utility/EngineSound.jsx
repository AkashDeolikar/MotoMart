import React, { useState, useRef } from "react";
import "./EngineSound.css";
import enginesound from "../utility/sound/bmw_s1000rr.mp3";
import bmwimg from "../utility/sound/bmw.png";

function EngineSound() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleEngine = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="sport-engine-container">
      {/* Background Bike Image */}
      <img src={bmwimg} alt="BMW S1000RR" className="sport-bike-img" />

      {/* Sound Waves */}
      <div className={`sport-waves ${playing ? "active" : ""}`}>
        {[...Array(5)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* Engine Start/Stop Button */}
      <div
        className="sport-circle"
        onClick={toggleEngine}
        style={{ backgroundColor: playing ? "red" : "green", color: "white", opacity: "0.9"}}
      >
        {playing ? "STOP ENGINE" : "START ENGINE"}
      </div>


      {/* Audio with onEnded listener */}
      <audio
        ref={audioRef}
        src={enginesound}
        preload="auto"
        onEnded={() => setPlaying(false)} // stop animation when music ends
      />
    </div>
  );
}

export default EngineSound;
