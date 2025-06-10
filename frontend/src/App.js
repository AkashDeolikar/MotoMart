// App.js
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navigate } from "react-router-dom";

// Pages
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import CarList from "./component/utility/carlist";
import AddCar from "./component/utility/addcar";
import Home from "./component/utility/home";
import Contact from "./component/utility/contact";
import ForgotPassword from "./component/auth/forgotpassword";
import Modal from "./component/auth/modal";
import ContactClick from "./component/utility/contactclick";
// import Seeoffer from "./component/headerfooter/seeoffer";

// Car pages link
import MarutSwiftDetail from "./component/cardetails/MarutSwiftDetail";
import TataNexonDetail from "./component/cardetails/TataNexonDetail";
import ToyotaInnovaDetail from "./component/cardetails/ToyotaInnovaDetail";
import HyundaiCretaDetail from "./component/cardetails/HyundaiCretaDetail";
import SuzukiErtigaDetail from "./component/cardetails/SuzukiErtigaDetail";
import OmniDetail from "./component/cardetails/OminDetail";
import Carcard from "./component/headerfooter/carcard";
import Bikecard from "./component/headerfooter/bikecard";

// Import vehicle data
import { vehicleData as bikeVehicleData } from "./component/headerfooter/bikecard";
import { vehicleData as carVehicleData } from "./component/headerfooter/carcard";

// Layout
// import Header from "./component/headerfooter/header";
import CarNavbar from "./component/navbar/navbar";
import Footer from "./component/headerfooter/footer";
import FeedBack from "./component/headerfooter/feedback";
import ScrollToTop from "./component/utility/ScrollToTop";
import Next from "./component/headerfooter/next";

// Animation Wrapper
import AnimatedPage from "./component/utility/AnimatedPage";
import Temp from "./component/headerfooter/temp";
import CarDetails from "./component/pages/cardetails";
import CarDetail from "./component/headerfooter/cardetail";
import ServiceDropdown from "./component/navbar/ServiceDropdown";
import OverviewPage from "./component/pages/OverviewPage";

//slider link import 
import Page1 from "./component/slidePage/page1";
import Page2 from "./component/slidePage/page2";
import Page3 from "./component/slidePage/page3";
import Page4 from "./component/slidePage/page4";
import Luxury from "./component/slidePage/luxury";
import Page6 from "./component/slidePage/Page6";
import Page5 from "./component/slidePage/page5";
// import BuildingForPregress from "./component/slidePage/BuildingForProgress";

// Debug logs
// console.log("Bike Data:", Bikecard);
console.log("Bike Data:", bikeVehicleData);
console.log("Car Data:", carVehicleData);

// Animated routes
const AnimatedRoutes = ({ theme, toggleTheme, showRegister, setShowRegister }) => {
  const location = useLocation();

  return (
    <>
      <CarNavbar theme={theme} toggleTheme={toggleTheme} />
      {/* <Header /> */}
      <ScrollToTop />
      <div className="app-wrapper">
        <div className="ContentWrapper">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Default view home page */}
              <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/carlist" element={<AnimatedPage><CarList /></AnimatedPage>} />
              <Route path="/add-car" element={<AddCar />} />
              <Route path="/ServiceDropdown" element={<ServiceDropdown />} />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/register-modal"
                element={
                  <Modal isOpen={showRegister} onClose={() => setShowRegister(false)}>
                    <Register closeModal={() => setShowRegister(false)} />
                  </Modal>
                }
              />

              {/* Utility and info pages */}
              {/* <Route path="/header" element={<Seeoffer />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/contactclick" element={<ContactClick />} />
              <Route path="/feedback" element={<FeedBack />} />
              <Route path="/next" element={<Next />} />

              {/* Cars */}
              <Route path="/swift" element={<MarutSwiftDetail />} />
              <Route path="/creta" element={<HyundaiCretaDetail />} />
              <Route path="/nexon" element={<TataNexonDetail />} />
              <Route path="/ertiga" element={<SuzukiErtigaDetail />} />
              <Route path="/omni" element={<OmniDetail />} />
              <Route path="/innova" element={<ToyotaInnovaDetail />} />

              {/* Offer */}
              {/* <Route path="/seeoffer" element={<Seeoffer />} /> */}
              <Route path="/carcard" element={<Carcard />} />
              <Route path="/bikecard" element={<Bikecard />} />
              <Route path="/temp" element={<Temp />} />
              <Route path="/overviewpage" element={<OverviewPage />} />

              {/*Slider Page */}
              {/* <Route path="buildingforprogress" element={<BuildingForPregress />} /> */}
              <Route path="/page1" element={<Page1 />} />
              <Route path="/page2" element={<Page2 />} />
              <Route path="/page3" element={<Page3 />} />
              <Route path="/page4" element={<Page4 />} />
              <Route path="/page6" element={<Page6 />} />
              <Route path="/page5" element={<Page5 />} />
              <Route path="/luxury" element={<Luxury />} />
              
              {/* Car details */}
              <Route path="/cardetails" element={<CarDetails />} />
              <Route
                path="/cardetail/:vehicleId"
                element={<CarDetail bikeData={bikeVehicleData} carData={carVehicleData} />}
              />
              {/* <Route
                path="/cardetail/:vehicleId"
                element={<CarDetail bikeData={[]} carData={carVehicleData} />}
              /> */}
            </Routes>
          </AnimatePresence>

          <Footer />
        </div>
      </div>
    </>
  );
};

function App() {
  // Theme state: Load from localStorage initially
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light"; // Default to light if none
  });

  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // Update body class for dark/light mode
    document.body.className = theme;

    // Save theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <AnimatedRoutes
        theme={theme}
        toggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
        showRegister={showRegister}
        setShowRegister={setShowRegister}
      />
    </Router>
  );
}

export default App;



// App.js
// import "./App.css";
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, useLocation, Routes, Route, Navigate } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";

// // Pages
// import Login from "./component/auth/login";
// import Register from "./component/auth/register";
// import CarList from "./component/utility/carlist";
// import AddCar from "./component/utility/addcar";
// import Home from "./component/utility/home";
// import Contact from "./component/utility/contact";
// import ForgotPassword from "./component/auth/forgotpassword";
// import Modal from "./component/auth/modal";
// import Seeoffer from "./component/headerfooter/seeoffer";
// import ContactClick from "./component/utility/contactclick";

// // Car pages link
// import MarutSwiftDetail from "./component/cardetails/MarutSwiftDetail";
// import TataNexonDetail from "./component/cardetails/TataNexonDetail";
// import ToyotaInnovaDetail from "./component/cardetails/ToyotaInnovaDetail";
// import HyundaiCretaDetail from "./component/cardetails/HyundaiCretaDetail";
// import SuzukiErtigaDetail from "./component/cardetails/SuzukiErtigaDetail";
// import OmniDetail from "./component/cardetails/OminDetail";
// import Carcard from "./component/headerfooter/carcard";
// import Bikecard from "./component/headerfooter/bikecard";

// // Import vehicle data
// import bikeVehicleData from "./component/headerfooter/bikecard";
// import { vehicleData as carVehicleData } from "./component/headerfooter/carcard";

// // Layout
// import CarNavbar from "./component/navbar/navbar";
// import Footer from "./component/headerfooter/footer";
// import Header from "./component/headerfooter/header";
// import FeedBack from "./component/headerfooter/feedback";
// import ScrollToTop from "./component/utility/ScrollToTop";
// import Next from "./component/headerfooter/next";

// // Animation Wrapper
// import AnimatedPage from "./component/utility/AnimatedPage";
// import Temp from "./component/headerfooter/temp";
// import CarDetails from "./component/pages/cardetails";
// import CarDetail from "./component/headerfooter/cardetail";
// import ServiceDropdown from "./component/navbar/ServiceDropdown";
// import OverviewPage from "./component/pages/OverviewPage";

// // Debug logs
// console.log("Bike Data:", bikeVehicleData);
// console.log("Car Data:", carVehicleData);

// const AnimatedRoutes = ({ theme, toggleTheme, showRegister, setShowRegister }) => {
//   const location = useLocation();

//   return (
//     <>
//       <CarNavbar theme={theme} toggleTheme={toggleTheme} />
//       <Header />
//       <ScrollToTop />
//       <div className="app-wrapper">
//         <div className="ContentWrapper">
//           <AnimatePresence mode="wait">
//             <Routes location={location} key={location.pathname}>
//               {/* Default view home page */}
//               <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
//               <Route path="/home" element={<Navigate to="/" />} />
//               <Route path="/carlist" element={<AnimatedPage><CarList /></AnimatedPage>} />
//               <Route path="/add-car" element={<AddCar />} />
//               <Route path="/ServiceDropdown" element={<ServiceDropdown />} />

//               {/* Auth */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//               <Route
//                 path="/register-modal"
//                 element={
//                   <Modal isOpen={showRegister} onClose={() => setShowRegister(false)}>
//                     <Register closeModal={() => setShowRegister(false)} />
//                   </Modal>
//                 }
//               />

//               {/* Utility and info pages */}
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/header" element={<Seeoffer />} />
//               <Route path="/contactclick" element={<ContactClick />} />
//               <Route path="/feedback" element={<FeedBack />} />
//               <Route path="/next" element={<Next />} />

//               {/* Cars */}
//               <Route path="/swift" element={<MarutSwiftDetail />} />
//               <Route path="/creta" element={<HyundaiCretaDetail />} />
//               <Route path="/nexon" element={<TataNexonDetail />} />
//               <Route path="/ertiga" element={<SuzukiErtigaDetail />} />
//               <Route path="/omni" element={<OmniDetail />} />
//               <Route path="/innova" element={<ToyotaInnovaDetail />} />

//               {/* Offer */}
//               <Route path="/seeoffer" element={<Seeoffer />} />
//               <Route path="/carcard" element={<Carcard />} />
//               <Route path="/bikecard" element={<Bikecard />} />
//               <Route path="/temp" element={<Temp />} />
//               <Route path="/overviewpage" element={<OverviewPage />} />

//               {/* Car details */}
//               <Route path="/cardetails" element={<CarDetails />} />
//               <Route
//                 path="/cardetail/:vehicleId"
//                 element={<CarDetail bikeData={bikeVehicleData} carData={carVehicleData} />}
//               />
//             </Routes>
//           </AnimatePresence>

//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// };

// function App() {
//   // Theme state: Load from localStorage initially
//   const [theme, setTheme] = useState(() => {
//     const savedTheme = localStorage.getItem("theme");
//     return savedTheme || "light"; // Default to light if none
//   });

//   const [showRegister, setShowRegister] = useState(false);

//   useEffect(() => {
//     // Update body class for dark/light mode
//     document.body.className = theme;

//     // Save theme preference
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <Router>
//       <AnimatedRoutes
//         theme={theme}
//         toggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
//         showRegister={showRegister}
//         setShowRegister={setShowRegister}
//       />
//     </Router>
//   );
// }

// export default App;
