// App.js
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages - Auth
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import ForgotPassword from "./component/auth/forgotpassword";
import Modal from "./component/auth/modal";

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
import FeedBack from "./component/headerfooter/feedback";
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
import Teslacarev from "./component/slidePage/subpages/evcarpages/teslacarev";

import Mahindrapickup from "./component/slidePage/subpages/commercialcarpages/mahindrapickup";
import Isuzupickup from "./component/slidePage/subpages/commercialcarpages/isuzupickup";
import Ashokpickup from "./component/slidePage/subpages/commercialcarpages/ashokpickup";
import Suzukipickup from "./component/slidePage/subpages/commercialcarpages/suzukipickup";

console.log("Bike Data:", bikeVehicleData);
console.log("Car Data:", carVehicleData);

const AnimatedRoutes = ({ theme, toggleTheme, showRegister, setShowRegister }) => {
  const location = useLocation();

  return (
    <>
      <CarNavbar theme={theme} toggleTheme={toggleTheme} />
      <ScrollToTop />
      <div className="app-wrapper">
        <div className="ContentWrapper">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/register-modal" element={<Modal isOpen={showRegister} onClose={() => setShowRegister(false)}><Register closeModal={() => setShowRegister(false)} /></Modal>} />
              <Route path="/carlist" element={<CarList />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/contactclick" element={<ContactClick />} />
              <Route path="/feedback" element={<FeedBack />} />
              <Route path="/next" element={<Next />} />
              <Route path="/temp" element={<Temp />} />
              <Route path="/overviewpage" element={<OverviewPage />} />

              {/* Car detail routes */}
              <Route path="/swift" element={<MarutSwiftDetail />} />
              <Route path="/creta" element={<HyundaiCretaDetail />} />
              <Route path="/nexon" element={<TataNexonDetail />} />
              <Route path="/ertiga" element={<SuzukiErtigaDetail />} />
              <Route path="/omni" element={<OmniDetail />} />
              <Route path="/innova" element={<ToyotaInnovaDetail />} />

              <Route path="/carcard" element={<Carcard />} />
              <Route path="/bikecard" element={<Bikecard />} />
              <Route path="/cardetails" element={<CarDetails />} />
              <Route path="/BikeCompareDetails" element={<BikeCompareDetails />} />
              <Route path="/cardetail/:vehicleId" element={<CarDetail bikeData={bikeVehicleData} carData={carVehicleData} />} />

              {/* Slider Pages */}
              <Route path="/page1" element={<Page1 />} />
              <Route path="/page2" element={<Page2 />} />
              <Route path="/page3" element={<Page3 />} />
              <Route path="/page4" element={<Page4 />} />
              <Route path="/page5" element={<Page5 />} />
              <Route path="/page6" element={<Page6 />} />

              {/* Brand Pages */}
              <Route path="/rover" element={<Rover />} />
              <Route path="/jaguar" element={<Jaguar />} />
              <Route path="/bmw" element={<Bmw />} />
              <Route path="/mercedes" element={<Mercedes />} />
              <Route path="/luxury" element={<Luxury />} />
              <Route path="/aboutus" element={<Aboutus />} />

              {/* Vehicle Category Pages */}
              <Route path="/luxuryvh" element={<Luxuryvh />} />
              <Route path="/passengervh" element={<Passengervh />} />
              <Route path="/commercialvh" element={<Commercialvh />} />
              <Route path="/evvh" element={<Evvh />} />

              {/* Sub Brand Pages */}
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
              <Route path="/teslacarev" element={<Teslacarev />} />
              <Route path="/bmwcarev" element={<Bmwcarev />} />
              <Route path="/kiacarev" element={<Kiacarev />} />
              <Route path="/mercedescarev" element={<Mercedescarev />} />
              <Route path="/mahindrapickup" element={<Mahindrapickup />} />
              <Route path="/isuzupickup" element={<Isuzupickup />} />
              <Route path="/ashokpickup" element={<Ashokpickup />} />
              <Route path="/suzukipickup" element={<Suzukipickup />} />

              {/* Service */}
              <Route path="/servicecostcalculator" element={<ServiceCostCalculator />} />
              <Route path="/emicalculator" element={<EMICalculator />} />
              <Route path="/partsinfo" element={<PartsInfo />} />

              {/* Misc */}
              <Route path="/viewmore" element={<Viewmore />} />
              <Route path="/statshighlightsection" element={<StatsHighlightSection />} />
              <Route path="/HeroSlider" element={<HeroSlider />} />
              <Route path="/SlideItem" element={<SlideItem />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </div>
    </>
  );
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    document.body.className = theme;
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
