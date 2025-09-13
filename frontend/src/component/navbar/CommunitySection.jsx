// import React, { useEffect, useRef } from "react";
// import lottie from "lottie-web";
// import "./community.css"; // custom Gemini-like styles

// // Import your lottie JSON files
// import topAnim from "./community-top.json";
// import bottomAnim from "./community-bottom.json";

// const CommunitySection = () => {
//   const topRef = useRef(null);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     if (topRef.current) {
//       lottie.loadAnimation({
//         container: topRef.current,
//         renderer: "svg",
//         loop: true,
//         autoplay: true,
//         animationData: topAnim,
//       });
//     }
//     if (bottomRef.current) {
//       lottie.loadAnimation({
//         container: bottomRef.current,
//         renderer: "svg",
//         loop: true,
//         autoplay: true,
//         animationData: bottomAnim,
//       });
//     }
//   }, []);

//   return (
//     <section className="gemini-landing-community">
//       {/* Top animation layer */}
//       <div className="gemini-layer">
//         <div className="gemini-block gemini-block--start">
//           <div className="gemini-svg" ref={topRef}></div>
//         </div>
//         <div className="gemini-block gemini-block--end">
//           <div className="gemini-svg" ref={bottomRef}></div>
//         </div>
//       </div>

//       {/* Text + CTA */}
//       <div className="gemini-section-hero">
//         <article className="gemini-cta">
//           <div className="gemini-section gemini-section__title">
//             <h2 className="gemini-type-d4">Join the community</h2>
//           </div>
//           <div className="gemini-section gemini-section__copy">
//             <p className="gemini-type-t1">
//               Tap into the power of our community forum. Get answers, build
//               together, and be part of the conversation.
//             </p>
//           </div>
//           <div className="gemini-section gemini-section__buttons">
//             <a
//               className="gemini-btn gemini-primary"
//               href="https://discuss.ai.google.dev/"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Google AI Forum
//             </a>
//           </div>
//         </article>
//       </div>
//     </section>
//   );
// };

// export default CommunitySection;
