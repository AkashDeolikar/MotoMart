// import React from "react";
// import { motion } from "framer-motion";
// import logoLight from "../navbar/logo1.png";
// import logoDark from "../navbar/logo2.png";

// const GoogleAILoader = ({ theme = "light", loading = true }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 1 }}
//       animate={{ opacity: loading ? 1 : 0 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ duration: 1, ease: "easeInOut" }}
//       style={{
//         position: "fixed",
//         inset: 0,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: theme === "dark" ? "#0c0c0c" : "#fafafa",
//         zIndex: 9999,
//         overflow: "hidden",
//       }}
//     >
//       {/* Background Gradient Layer */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           filter: "blur(80px)",
//           opacity: 0.9,
//         }}
//       >
//         {blobs.map((b, i) => (
//           <motion.div
//             key={i}
//             animate={{
//               x: [0, b.x, -b.x, 0],
//               y: [0, -b.y, b.y, 0],
//               scale: [1, 1.15, 0.95, 1],
//             }}
//             transition={{
//               repeat: Infinity,
//               duration: b.duration,
//               ease: "easeInOut",
//             }}
//             style={blobStyle(b.color, b.left, b.top, b.size)}
//           />
//         ))}
//       </div>

//       {/* Center Logo */}
//       <motion.img
//         src={theme === "dark" ? logoDark : logoLight}
//         alt="Google AI Loader"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: [1, 1.08, 1] }}
//         transition={{
//           duration: 1.5,
//           repeat: Infinity,
//           repeatType: "reverse",
//           ease: "easeInOut",
//         }}
//         style={{
//           width: "180px",
//           zIndex: 2,
//           filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.25))",
//         }}
//       />
//     </motion.div>
//   );
// };

// // Blob Config
// const blobs = [
//   {
//     color: "radial-gradient(circle, rgba(66,133,244,0.8), transparent 70%)",
//     left: "10%",
//     top: "-20%",
//     size: 900,
//     x: 180,
//     y: 140,
//     duration: 16,
//   },
//   {
//     color: "radial-gradient(circle, rgba(234,67,53,0.8), transparent 70%)",
//     left: "70%",
//     top: "-25%",
//     size: 700,
//     x: 150,
//     y: 120,
//     duration: 18,
//   },
//   {
//     color: "radial-gradient(circle, rgba(251,188,5,0.8), transparent 70%)",
//     left: "20%",
//     top: "60%",
//     size: 600,
//     x: 120,
//     y: 150,
//     duration: 20,
//   },
//   {
//     color: "radial-gradient(circle, rgba(52,168,83,0.8), transparent 70%)",
//     left: "80%",
//     top: "70%",
//     size: 650,
//     x: 140,
//     y: 130,
//     duration: 22,
//   },
// ];

// // Blob Style
// const blobStyle = (bg, left, top, size) => ({
//   position: "absolute",
//   left,
//   top,
//   width: `${size}px`,
//   height: `${size}px`,
//   borderRadius: "50%",
//   background: bg,
//   mixBlendMode: "screen", // softer glow
// });

// export default GoogleAILoader;
