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
    <div className="engine-container">
      {/* Background Bike Image */}
      <img src={bmwimg} alt="BMW S1000RR" className="bike-img" />

      {/* Sound Waves */}
      <div className={`waves ${playing ? "active" : ""}`}>
        {[...Array(5)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* Engine Start/Stop Button */}
      <div className="circle" onClick={toggleEngine}>
        {playing ? "STOP ENGINE" : "START ENGINE"}
      </div>

      {/* Audio with onEnded listener */}
      <audio
        ref={audioRef}
        src={enginesound}
        preload="auto"
        onEnded={() => setPlaying(false)} // 👈 stop animation when music ends
      />
    </div>
  );
}

export default EngineSound;
