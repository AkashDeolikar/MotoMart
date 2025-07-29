// App.js
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import './index.css'; // For Tailwind's base

// Pages - Auth
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import ForgotPassword from "./component/auth/forgotpassword";
import Modal from "./component/auth/modal";
// IMPORTANT: useInactivityLogout is now imported but NOT called directly in App.js
import useInactivityLogout from './component/auth/useInactivityLogout'; // Keep import for AnimatedRoutes
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // IMPORTANT: Adjust this path if your firebase.js is located differently

// Pages - Utility
import CarList from "./component/utility/carlist";
import Home from "./component/utility/home";
import Contact from "./component/utility/contact";
import ContactClick from "./component/utility/contactclick";
import Aboutus from "./component/utility/aboutus";
import StatsHighlightSection from "./component/utility/statshighlightsection";
import ScrollToTop from "./component/utility/ScrollToTop";
import Viewmore from "./component/cardetails/viewmore";
import HeroSlider from "./component/utility/HeroSlider";
import SlideItem from "./component/utility/SlideItem";

// Navbar & Footer
import CarNavbar from "./component/navbar/navbar";
import Footer from "./component/headerfooter/footer";
// import FeedBack from "./component/headerfooter/feedback"; // Commented out as per your original code
import Next from "./component/headerfooter/next";
import Temp from "./component/headerfooter/temp";

// Car Pages
import MarutSwiftDetail from "./component/cardetails/MarutSwiftDetail";
import TataNexonDetail from "./component/cardetails/TataNexonDetail";
import ToyotaInnovaDetail from "./component/cardetails/ToyotaInnovaDetail";
import HyundaiCretaDetail from "./component/cardetails/HyundaiCretaDetail";
import SuzukiErtigaDetail from "./component/cardetails/SuzukiErtigaDetail";
import OmniDetail from "./component/cardetails/OminDetail";
import CarDetails from "./component/pages/cardetails";
import CarDetail from "./component/headerfooter/cardetail";

// Vehicle Cards
import Carcard from "./component/headerfooter/carcard";
import Bikecard from "./component/headerfooter/bikecard";
import BikeCompareDetails from "./component/pages/BikeCompareDetails";

// Vehicle Data
import { vehicleData as bikeVehicleData } from "./component/headerfooter/bikecard";
import { vehicleData as carVehicleData } from "./component/headerfooter/carcard";

// Service Pages
import ServiceCostCalculator from "./component/slidePage/servicepages/servicecostcalculator";
import EMICalculator from "./component/slidePage/servicepages/emicalculator";
import PartsInfo from "./component/slidePage/servicepages/partsinfo";

// Navigation Pages
import OverviewPage from "./component/pages/OverviewPage";
import Page1 from "./component/slidePage/page1";
import Page2 from "./component/slidePage/page2";
import Page3 from "./component/slidePage/page3";
import Page4 from "./component/slidePage/page4";
import Page5 from "./component/slidePage/page5";
import Page6 from "./component/slidePage/Page6";
import Luxury from "./component/slidePage/luxury";
import Rover from "./component/slidePage/roverpages/rover";
import Jaguar from "./component/slidePage/roverpages/jaguar";
import Bmw from "./component/slidePage/roverpages/bmw";
import Mercedes from "./component/slidePage/roverpages/mercedes";

// Category Pages
import Luxuryvh from "./component/slidePage/ziczacpages/luxuryvh";
import Passengervh from "./component/slidePage/ziczacpages/passengervh";
import Commercialvh from "./component/slidePage/ziczacpages/commercialvh";
import Evvh from "./component/slidePage/ziczacpages/evvh";

// Subcategory Pages
import Audicar from "./component/slidePage/subpages/luxurycarpages/audicar";
import Jaguarcar from "./component/slidePage/subpages/luxurycarpages/jaguarcar";
import Mercedescar from "./component/slidePage/subpages/luxurycarpages/mercedescar";
import Fordcar from "./component/slidePage/subpages/luxurycarpages/fordcar";
import Bmwcar from "./component/slidePage/subpages/luxurycarpages/bmwcar";
import Rangerovercar from "./component/slidePage/subpages/luxurycarpages/rangerovercar";
import Rollsroylscar from "./component/slidePage/subpages/luxurycarpages/rollsroylscar";

import Hondacar from "./component/slidePage/subpages/passengercappages/hondacar";
import Hyundaicar from "./component/slidePage/subpages/passengercappages/hyundaicar";
import Jeepcar from "./component/slidePage/subpages/passengercappages/jeepcar";
import Nissancar from "./component/slidePage/subpages/passengercappages/nissancar";
import Renaultcar from "./component/slidePage/subpages/passengercappages/renaultcar";
import Suzukicar from "./component/slidePage/subpages/passengercappages/suzukicar";

import Teslacar from "./component/slidePage/subpages/evcarpages/teslacarev";
import Bmwcarev from "./component/slidePage/subpages/evcarpages/bmwcarev";
import Kiacarev from "./component/slidePage/subpages/evcarpages/kiacarev";
import Mercedescarev from "./component/slidePage/subpages/evcarpages/mercedescarev";
// import Teslacarev from "./component/slidePage/subpages/evcarpages/teslacarev"; // Duplicate import, removed this line

import Mahindrapickup from "./component/slidePage/subpages/commercialcarpages/mahindrapickup";
import Isuzupickup from "./component/slidePage/subpages/commercialcarpages/isuzupickup";
import Ashokpickup from "./component/slidePage/subpages/commercialcarpages/ashokpickup";
import Suzukipickup from "./component/slidePage/subpages/commercialcarpages/suzukipickup";
import FavoriteVehicle from "./component/headerfooter/FavoriteVehicle";
import MyFavorites from "./component/headerfooter/MyFavorites";
import HondaActivaDetail from "./component/cardetails/HondaActiva";

//DB pages


console.log("Bike Data:", bikeVehicleData);
console.log("Car Data:", carVehicleData);

/**
 * ProtectedRoute Component:
 * Wraps routes that require user authentication.
 * Redirects to login if user is not authenticated.
 */
const ProtectedRoute = ({ children, user, loadingAuth }) => {
  if (loadingAuth) {
    // Show a loading indicator while Firebase is determining auth state
    return <div>Loading authentication...</div>;
  }
  if (!user) {
    // If no user, redirect to the login page
    return <Navigate to="/login" replace />;
  }
  // If authenticated, render the children (the protected component)
  return children;
};

/**
 * AnimatedRoutes Component:
 * Handles all routing logic and applies Framer Motion animations.
 * IMPORTANT: This component is a direct child of <Router> in App.js,
 * so it's a valid place to call hooks like useLocation and useInactivityLogout.
 */
const AnimatedRoutes = ({ theme, toggleTheme, showRegister, setShowRegister, user, loadingAuth }) => {
  const location = useLocation();

  // IMPORTANT: Call useInactivityLogout here, within the Router's context.
  // The hook's internal logic will handle when to start/stop the timer
  // based on the 'user' prop and 'loadingAuth'.
  useInactivityLogout(user);

  return (
    <>
      <CarNavbar theme={theme} toggleTheme={toggleTheme} />
      <ScrollToTop />
      <div className="app-wrapper">
        <div className="ContentWrapper">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Routes - accessible to all */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to="/" replace />} /> {/* Redirect old /home to / */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/* Modal route (if used as a separate route, otherwise handle with state) */}
              <Route path="/register-modal" element={<Modal isOpen={showRegister} onClose={() => setShowRegister(false)}><Register closeModal={() => setShowRegister(false)} /></Modal>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/contactclick" element={<ContactClick />} />
              {/* <Route path="/feedback" element={<FeedBack />} /> */}
              <Route path="/next" element={<Next />} />
              <Route path="/temp" element={<Temp />} />
              <Route path="/overviewpage" element={<OverviewPage />} />
              <Route path="/aboutus" element={<Aboutus />} /> {/* Assuming About Us is public */}

              {/* Protected Routes - wrapped with ProtectedRoute */}
              <Route path="/carlist" element={<ProtectedRoute user={user} loadingAuth={loadingAuth}><CarList /></ProtectedRoute>} />
              <Route path="/cardetails" element={<ProtectedRoute user={user} loadingAuth={loadingAuth}><CarDetails /></ProtectedRoute>} />
              <Route path="/BikeCompareDetails" element={<ProtectedRoute user={user} loadingAuth={loadingAuth}><BikeCompareDetails /></ProtectedRoute>} />
              <Route path="/cardetail/:vehicleId" element={<ProtectedRoute user={user} loadingAuth={loadingAuth}><CarDetail bikeData={bikeVehicleData} carData={carVehicleData} /></ProtectedRoute>} />
              <Route path="/FavoriteVehicle" element={<ProtectedRoute user={user} loadingAuth={loadingAuth}><FavoriteVehicle /></ProtectedRoute>} />
              <Route path="/MyFavorites" element={<ProtectedRoute user={user} loadingAuth={loadingAuth}><MyFavorites /></ProtectedRoute>} />

              {/* Other Specific Car/Bike Details (assuming some might be public for viewing, but for actual interaction like adding to cart, would be protected) */}
              <Route path="/swift" element={<MarutSwiftDetail />} />
              <Route path="/creta" element={<HyundaiCretaDetail />} />
              <Route path="/nexon" element={<TataNexonDetail />} />
              <Route path="/ertiga" element={<SuzukiErtigaDetail />} />
              <Route path="/omni" element={<OmniDetail />} />
              <Route path="/innova" element={<ToyotaInnovaDetail />} />
              <Route path="/activa" element={<HondaActivaDetail />} />

              {/* Vehicle Cards (assuming public access to browse) */}
              <Route path="/carcard" element={<Carcard />} />
              <Route path="/bikecard" element={<Bikecard />} />

              {/* Slider/Navigation Pages (assuming public for showcasing) */}
              <Route path="/page1" element={<Page1 />} />
              <Route path="/page2" element={<Page2 />} />
              <Route path="/page3" element={<Page3 />} />
              <Route path="/page4" element={<Page4 />} />
              <Route path="/page5" element={<Page5 />} />
              <Route path="/page6" element={<Page6 />} />

              {/* Brand Pages (assuming public for Browse) */}
              <Route path="/rover" element={<Rover />} />
              <Route path="/jaguar" element={<Jaguar />} />
              <Route path="/bmw" element={<Bmw />} />
              <Route path="/mercedes" element={<Mercedes />} />
              <Route path="/luxury" element={<Luxury />} />

              {/* Vehicle Category Pages (assuming public for Browse) */}
              <Route path="/luxuryvh" element={<Luxuryvh />} />
              <Route path="/passengervh" element={<Passengervh />} />
              <Route path="/commercialvh" element={<Commercialvh />} />
              <Route path="/evvh" element={<Evvh />} />

              {/* Sub Brand Pages (assuming public for Browse) */}
              <Route path="/audicar" element={<Audicar />} />
              <Route path="/jaguarcar" element={<Jaguarcar />} />
              <Route path="/mercedescar" element={<Mercedescar />} />
              <Route path="/fordcar" element={<Fordcar />} />
              <Route path="/bmwcar" element={<Bmwcar />} />
              <Route path="/rangerovercar" element={<Rangerovercar />} />
              <Route path="/rollsroylscar" element={<Rollsroylscar />} />
              <Route path="/hondacar" element={<Hondacar />} />
              <Route path="/hyundaicar" element={<Hyundaicar />} />
              <Route path="/jeepcar" element={<Jeepcar />} />
              <Route path="/nissancar" element={<Nissancar />} />
              <Route path="/renaultcar" element={<Renaultcar />} />
              <Route path="/suzukicar" element={<Suzukicar />} />
              <Route path="/teslacarev" element={<Teslacar />} />
              <Route path="/bmwcarev" element={<Bmwcarev />} />
              <Route path="/kiacarev" element={<Kiacarev />} />
              <Route path="/mercedescarev" element={<Mercedescarev />} />
              <Route path="/mahindrapickup" element={<Mahindrapickup />} />
              <Route path="/isuzupickup" element={<Isuzupickup />} />
              <Route path="/ashokpickup" element={<Ashokpickup />} />
              <Route path="/suzukipickup" element={<Suzukipickup />} />

              {/* Service Pages (assuming public or can be protected if needed) */}
              <Route path="/servicecostcalculator" element={<ServiceCostCalculator />} />
              <Route path="/emicalculator" element={<EMICalculator />} />
              <Route path="/partsinfo" element={<PartsInfo />} />

              {/* Miscellaneous Components (assuming public) */}
              <Route path="/viewmore" element={<Viewmore />} />
              <Route path="/statshighlightsection" element={<StatsHighlightSection />} />
              <Route path="/HeroSlider" element={<HeroSlider />} />
              <Route path="/SlideItem" element={<SlideItem />} />

              {/* Catch-all for undefined routes (optional, but good practice) */}
              {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </div>
    </>
  );
};

/**
 * App Component:
 * The main component of the application.
 * Manages theme state and Firebase authentication state.
 * Renders the BrowserRouter and AnimatedRoutes.
 */
function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [showRegister, setShowRegister] = useState(false); // For modal control
  const [user, setUser] = useState(null); // Firebase authenticated user
  const [loadingAuth, setLoadingAuth] = useState(true); // Tracks Firebase auth loading state

  // Effect to listen for Firebase authentication state changes
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state
      setLoadingAuth(false); // Auth state is now known
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs only once on mount

  // Effect to apply theme to the document body and persist in localStorage
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]); // Re-run when 'theme' changes

  // IMPORTANT: No direct call to useInactivityLogout here.
  // It is now managed within AnimatedRoutes.

  // // Show a loading indicator while Firebase is determining the initial auth state
  // if (loadingAuth) {
  //   return (
  //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
  //       Loading web application...
  //     </div>
  //   );
  // }
  if (loadingAuth) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <div className="text-center bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <p className="text-white text-lg font-semibold mb-4">Starting the engine...</p>

          <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-yellow-500 animate-loading-bar rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <Router>
      <AnimatedRoutes
        theme={theme}
        toggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        user={user} // Pass user state to AnimatedRoutes
        loadingAuth={loadingAuth} // Pass loadingAuth state to AnimatedRoutes
      />
    </Router>
  );
}

export default App;