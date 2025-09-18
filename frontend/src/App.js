// App.js
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import './index.css'; // For Tailwind's base
import logoDark from "./component/navbar/logo2.png";
import logoLight from "./component/navbar/logo1.png";
import { motion } from "framer-motion";

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
import SlideItem from "./component/utility/SlideItem";

// Navbar & Footer
import CarNavbar from "./component/navbar/navbar";
// import CarNavbar  from "./component/CarNavbar/CarNavbar"
// import "./component/CarNavbar/styles/_globals.scss"; // global styles
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
import NS200Detail from "./component/cardetails/NS200";

//Riding GEAR page imports
import GearCard from "./component/RidingGears/GearCard";
import GearPage from "./component/RidingGears/RidingGearPreview";
import MainPageGear from "./component/RidingGears/MainPageGear";
import RaidOffroadGear from "./component/RidingGears/Categorypages/RaidOffroadGear";
import GlovesPage from "./component/RidingGears/Categorypages/GlovesPage";
import JacketsPage from "./component/RidingGears/Categorypages/JacketsPage";
import BaseLayerPage from "./component/RidingGears/Categorypages/BaseLayerPage";
import RidingPantsPage from "./component/RidingGears/Categorypages/RidingPantsPage";
import TailBagPage from "./component/RidingGears/Categorypages/TailBagPage";
import SaddleBagPage from "./component/RidingGears/Categorypages/SaddleBagPage";
import HelmetStore from "./component/RidingGears/Categorypages/HelmetStore";
import AddMoreServiceCostCalculator from "./component/slidePage/servicepages/AddMoreServiceCostCalculator";
import Chatbot from "./component/openai/Chatbot";
import ProfileSettings from "./component/navbar/ProfileSettings";
import Settings from "./component/navbar/Settings";
import ConfirmDialog from "./component/utility/ConfirmDialog";
import HeroSection from "./component/utility/HeroSection";
import GoogleCardSlider from "./component/utility/GoogleCardSlider";
import ScrollRestoration from "./component/ScrollRestoration";

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
      <Chatbot />
      <div className="app-wrapper">
        <div className="ContentWrapper">
          <main className="main-content">
            <AnimatePresence mode="wait">
              <ScrollRestoration />
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
                <Route path="/ns" element={<NS200Detail />} />

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
                <Route path="/SlideItem" element={<SlideItem />} />

                {/* Riding gear pages */}
                <Route path="/GearCard" element={< GearCard />} />
                <Route path="/GearPage" element={<GearPage />} />
                <Route path="/MainPageGear" element={<MainPageGear />} />
                <Route path="/RaidOffroadGear" element={<RaidOffroadGear />} />
                <Route path="/Glovespage" element={<GlovesPage />} />
                <Route path="/JacketsPage" element={<JacketsPage />} />
                <Route path="/BaseLayerPage" element={<BaseLayerPage />} />
                <Route path="/RidingPantsPage" element={<RidingPantsPage />} />
                <Route path="/TailBagPage" element={<TailBagPage />} />
                <Route path="/SaddleBagPage" element={<SaddleBagPage />} />
                <Route path="/HelmetStore" element={<HelmetStore />} />

                <Route path="/AddMoreServiceCostCalculator" element={<AddMoreServiceCostCalculator />} />

                <Route path="/Chatbot" element={<Chatbot />} />

                <Route path="/ProfileSettings" element={<ProfileSettings />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/ConfirmDialog" element={<ConfirmDialog />} />

                <Route path="/HeroSection" element={<HeroSection />} />
                <Route path="/GoogleCardSlider" element={<GoogleCardSlider />} />
                {/* Catch-all for undefined routes (optional, but good practice) */}
                {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
              </Routes>
            </AnimatePresence>
          </main>
        </div>
        <Footer />
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
  if (loadingAuth) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: theme === "dark" ? "#121212" : "#ffffff",
        }}
      >
        {/* Brand Text */}
        <h1
          style={{
            fontFamily: "'Google Sans', Roboto, sans-serif",
            fontSize: "1.75rem",
            fontWeight: "600",
            marginBottom: "30px",
            color: theme === "dark" ? "#e8eaed" : "#202124",
          }}
        >
          MotoMort
        </h1>

        {/* Progress bar */}
        <div
          style={{
            width: "180px",
            height: "4px",
            borderRadius: "2px",
            overflow: "hidden",
            background: theme === "dark" ? "#2c2c2c" : "#e0e0e0",
          }}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "easeInOut",
            }}
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, #4285f4, #34a853, #fbbc05, #ea4335)",
            }}
          />
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