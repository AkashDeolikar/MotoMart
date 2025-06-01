import React, { useState } from "react";
import './next.css';

// Array of video data
const videosData = [
  {
    id: 1,
    title: "Suzuki Swift",
    url: "https://www.youtube.com/embed/-0NyYUzCDrU?rel=0&modestbranding=1",
  },
  {
    id: 2,
    title: "Hyundai Creta",
    url: "https://www.youtube.com/embed/NrZl1k8s96s?rel=0&modestbranding=1",
  },
  {
    id: 3,
    title: "Tata Nexon",
    url: "https://www.youtube.com/embed/XXXXXXX?rel=0&modestbranding=1",
  },
  // Add more videos here
];

const Next = () => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const handleVideoClick = (id) => {
    // If a video is clicked and it’s already selected, deselect it (show all)
    if (selectedVideoId === id) {
      setSelectedVideoId(null);
    } else {
      setSelectedVideoId(id);
    }
  };

  return (
    <div className="Next">
      {videosData.map((video) => {
        // If a video is selected, only render that video
        if (selectedVideoId && selectedVideoId !== video.id) {
          return null;
        }

        return (
          <div
            key={video.id}
            className="video-container"
            onClick={() => handleVideoClick(video.id)}
            style={{ cursor: "pointer" }}
          >
            <iframe
              className="video-element"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>{video.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Next;
