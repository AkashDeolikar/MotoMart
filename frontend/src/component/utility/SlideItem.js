// import React from 'react';
// import './SlideItem.css';

// const SlideItem = ({ title, subtitle, img, bgImage, downimg, video }) => {
//   const isMp4 = video?.endsWith(".mp4");

//   return (
//     <div
//       className="slide-item"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="slide-background-title">{title}</div>

//       <div className="slide-content-wrapper">
//         <div className="slide-text">
//           <h1>{title}</h1>
//           <p>{subtitle}</p>
//         </div>

//         {/* Show image if no video */}
//         {!video && img && (
//           <div className="slide-img">
//             <img src={img} alt={title} />
//             <div className="img-glow-circle"></div>
//           </div>
//         )}
//       </div>

//       {/* ✅ Show MP4 video if available */}
//       {video && isMp4 && (
//         <div className="slide-video-wrapper">
//           <video
//             src={video}
//             controls
//             autoPlay
//             muted
//             loop
//             style={{ width: "100%", borderRadius: "12px" }}
//           />
//         </div>
//       )}

//       {/* ✅ Show YouTube iframe if it's not an MP4 */}
//       {video && !isMp4 && (
//         <div className="slide-video-wrapper">
//           <iframe
//             width="100%"
//             height="400"
//             src={video}
//             title="Embedded Video"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>
//       )}

//       {downimg && (
//         <div className="slide-down-img">
//           <img src={downimg} alt="Decorative bottom" />
//         </div>
//       )}
//     </div>
//   );
// };



// export default SlideItem;
