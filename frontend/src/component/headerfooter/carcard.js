import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './tab.css'; // Make sure this path is correct for your styles
import { SlArrowRight } from "react-icons/sl";
import { VscFeedback } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';

// Authentication checking (assuming 'auth' is properly configured in firebase.js)
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Scroll up animation
import AOS from 'aos';
import 'aos/dist/aos.css';

//store DB 
import FavoriteVehicle from './FavoriteVehicle';

// Image imports - Ensure these paths are correct and images exist
import audiA3 from './cardbox/audi-a3.jpg';
import audiA4 from './cardbox/audi-a4.jpg';
import audiA6 from './cardbox/audi-a6.jpg'; // New import for Audi Q3
import audiQ7 from './cardbox/audi-q7.jpg';
import audiQ3 from './cardbox/audi-q3.jpg';
import bmw3Series from './cardbox/bmw-3-series.jpg'; // New import for BMW 3 Series
import bmw5Series from './cardbox/bmw-5-series.jpg'; // New import for BMW 5 Series
import bmwIx from './cardbox/bmw-ix.jpg'; // New import for BMW iX
import bmwx3 from './cardbox/bmwx3.jpg'; // Explicitly imported for BMW X3
import bmwx5 from './cardbox/bmwx5.jpg';
import bmwx7 from './cardbox/bmwx7.jpg';
import fordendeavour from './cardbox/ford-endeavour.jpg';
import fordecosport from './cardbox/ford-ecosport.jpg';
import fordfreestyle from './cardbox/ford-freestyle.jpg';
import fordaspire from './cardbox/ford-aspire.jpg';
import fordfigo from './cardbox/ford-figo.jpg';
import hondacity from './cardbox/city.jpg';
import hondaelevate from './cardbox/elevate.jpg';
import hondaJazz from './cardbox/honda-jazz.jpg';
import hondaWrv from './cardbox/honda-wrv.jpg'; // New import for Honda WR-V
import hyundaiAmze from './cardbox/hyundaiAmze.jpg'; // Re-using for Amaze
import hyundaiaura from './cardbox/hyndaiaura.jpg';
import hyundaicreta from './cardbox/hyndaicreta.jpg';
import hyundaivenue from './cardbox/hyundai-venue.jpg';
import hyundaiverna from './cardbox/hyundai-verna.jpg';
import jeepcompass from './cardbox/jeep-compass.jpg'; // New import for Jeep
import jeepwrangler from './cardbox/jeep-wrangler.jpg';
import jeepmeridian from './cardbox/jeep-meridian.jpg'; // New import for Jeep
import mahindraBoleroNeo from './cardbox/mahindra-bolero-neo.jpg'; // New import for Mahindra Bolero Neo
import mahindraXuv300 from './cardbox/mahindra-xuv300.jpg'; // New import for Mahindra XUV300
import mahindrascorpio from './cardbox/mahindraScorpio.jpg';
import mahindrathar from './cardbox/mahindraThar.jpg';
import mahindraxuv from './cardbox/mahindraXUV700.jpg';
import mercdeseclass from './cardbox/mercedes-e-class.jpg';
import mercdesesclass from './cardbox/mercedes-s-class.jpg';
import mercedesCClass from './cardbox/mercedes-c-class.jpg'; // New import for Mercedes C-Class
import mercedesEqs from './cardbox/mercedes-eqs.jpg'; // New import for Mercedes EQS
import mercedesGlc from './cardbox/mercedes-glc.jpg'; // New import for Mercedes GLC
import mercedesg from './cardbox/mercedes-g-class.jpg';
import nissanariya from './cardbox/Nissan_Ariya.jpg'; // New import for Nissan
import nissanKicks from './cardbox/nissan-kicks.jpg'; // New import for Nissan Kicks
import nissanmagnite from './cardbox/nissan-magnite.jpg'; // New import for Nissan
import rangeRoverDefender from './cardbox/range-rover-evoque.jpg'; // New import for Land Rover Defender
import rangeRoverEvoque from './cardbox/range-rover-evoque.jpg';
import rangeRoverSport from './cardbox/range-rover-sport.jpg';
import rangeRoverVelar from './cardbox/range-rover-velar.jpg';
import renaultkiger from './cardbox/renaultkiger.jpg';
import renaultkwid from './cardbox/renaultkwid.jpg';
import renaulttriber from './cardbox/renaulttriber.jpg';
import renaultduster from './cardbox/renault-duster.jpg';
import rollsRoyceCullinan from './cardbox/rolls-royce-cullinan.jpg';
import rollsRoyceDawn from './cardbox/rolls-royce-dawn.jpg'; // New import for Rolls-Royce Dawn
import rollsRoyceGhost from './cardbox/rolls-royce-ghost.jpg';
import rollsRoycePhantom from './cardbox/rolls-royce-phantom.jpg';
import rollsRoyceWraith from './cardbox/rolls-royce-wraith.jpg'; // New import for Rolls-Royce Wraith
import suzukibaleno from './cardbox/suzukibaleno.jpg';
import suzukibrezza from './cardbox/suzuki-brezza.jpg';
import suzukidzire from './cardbox/suzukidzire.jpg';
import suzukiertiga from './cardbox/suzuki-ertiga.jpg';
import suzukigrandvitara from './cardbox/suzuki-grand-vitara.jpg';
import suzukiswift from './cardbox/suzukiswift.jpg';
import tataaltroz from './cardbox/tataAltroz.jpg';
import tataharrier from './cardbox/tataHarrier.jpg';
import tataNexonEv from './cardbox/tata-nexon-ev.jpg'; // New import for Tata Nexon EV
import tatanexon from './cardbox/tataPunch.jpg'; // Re-using for Punch
import tataSafari from './cardbox/tata-safari.jpg'; // New import for Tata Safari
import ToyotaFortuner from './cardbox/ToyotaFortuner.jpg';
import toyotaHyryder from './cardbox/toyota-urban-cruiser-hyryder.jpg'; // New import for Toyota Urban Cruiser Hyryder
import ToyotaInnovaHycross from './cardbox/ToyotaInnovaHycross.jpg';
import ToyotaLandCruiser from './cardbox/ToyotaLandCruiser.jpg';
import toyotaCamry from './cardbox/toyota-camry.jpg'; // New import for Toyota Camry
// import volkswagenPoloGti from './cardbox/volkswagenPoloGti.jpg'; // New import for VW Polo GTI (if needed for variety, otherwise just Polo)
import volkswagenTroc from './cardbox/volkswagen-t-roc.jpg'; // New import for VW T-Roc
import vwPolo from './cardbox/valkswagenPolo.jpg';
import vwTaigun from './cardbox/VolkswagenTiguan.jpg';
import vwTiguan from './cardbox/volkswagen-tiguan.jpg';
import vwVirtus from './cardbox/valkswagenVitrus.jpg';


// Structure for vehicle data
export const vehicleData = [
  {
    manufacturer: 'Suzuki',
    idPrefix: 'suzuki',
    vehicles: [
      {
        id: 'suzuki-swift',
        videoPoster: suzukiswift,
        videoSrc: "https://www.youtube.com/embed/QmZt-SPEqaw",
        thumbnail: "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
        title: "Suzuki Swift",
        link: "https://www.globalsuzuki.com/automobile/lineup/swift/",
        description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Swift",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["1.2L K12N DualJet Engine", "5-speed Manual/AMT", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
          price: "₹ 6.00 - 9.00 Lakh"
        }
      },
      {
        id: 'suzuki-baleno',
        videoPoster: suzukibaleno,
        videoSrc: "https://www.youtube.com/embed/aC-pxNcz8IM",
        thumbnail: "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
        title: "Suzuki Baleno",
        link: "https://www.globalsuzuki.com/automobile/lineup/baleno/",
        description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Baleno",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["1.2L DualJet Dual VVT Engine", "SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera", "ARKAMYS Surround Sense"],
          price: "₹ 6.66 - 9.88 Lakh"
        }
      },
      {
        id: 'suzuki-dzire',
        videoPoster: suzukidzire,
        videoSrc: "https://www.youtube.com/embed/Hrpwg8T3pwc",
        thumbnail: "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
        title: "Suzuki Dzire",
        link: "https://www.globalsuzuki.com/automobile/lineup/dzire/",
        description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Dzire",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["1.2L K-Series DualJet Engine", "Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps", "Wooden Finish Interiors"],
          price: "₹ 6.57 - 9.39 Lakh"
        }
      },
      {
        id: 'suzuki-ertiga',
        videoPoster: suzukiertiga,
        videoSrc: "https://www.youtube.com/embed/S2pT-e5H01M",
        thumbnail: "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
        title: "Suzuki Ertiga",
        link: "https://www.globalsuzuki.com/automobile/lineup/ertiga/",
        description: "The Maruti Suzuki Ertiga is a popular MUV (Multi Utility Vehicle) offering spacious seating for seven, fuel efficiency, and a comfortable ride for families.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Ertiga",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["1.5L K15C Smart Hybrid Engine", "7-Seater Comfort", "CNG Variant Available", "Smart Hybrid Technology", "Dual Airbags", "Ventilated Front Cup Holders"],
          price: "₹ 8.69 - 13.03 Lakh"
        }
      },
      {
        id: 'suzuki-brezza',
        videoPoster: suzukibrezza,
        videoSrc: "https://www.youtube.com/embed/Q0P_Mv1k-6I",
        thumbnail: "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
        title: "Suzuki Brezza",
        link: "https://www.globalsuzuki.com/automobile/lineup/brezza/",
        description: "The Maruti Suzuki Brezza is a compact SUV known for its bold design, robust performance, and a comprehensive suite of safety and smart features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Brezza",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["1.5L K15C Smart Hybrid Engine", "Electric Sunroof", "9-inch SmartPlay Pro+", "6 Airbags", "Head-Up Display", "Arkamys Surround Sense"],
          price: "₹ 8.34 - 14.14 Lakh"
        }
      },
      {
        id: 'suzuki-grand-vitara',
        videoPoster: suzukigrandvitara,
        videoSrc: "https://www.youtube.com/embed/Uo97t6B618s",
        thumbnail: "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
        title: "Suzuki Grand Vitara",
        link: "https://www.globalsuzuki.com/automobile/lineup/grandvitara/",
        description: "The Maruti Suzuki Grand Vitara is a premium mid-size SUV offering sophisticated design, advanced hybrid powertrains, and a comfortable, feature-rich interior.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Grand Vitara",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["Intelligent Electric Hybrid (e-CVT)", "AllGrip Select AWD (Mild Hybrid)", "Panoramic Sunroof", "Ventilated Seats", "360-degree Camera", "9-inch SmartPlay Pro+"],
          price: "₹ 10.80 - 19.99 Lakh"
        }
      }
    ]
  },
  {
    manufacturer: 'Hyundai',
    idPrefix: 'hyundai',
    vehicles: [
      {
        id: 'hyundai-creta',
        videoPoster: hyundaicreta,
        videoSrc: "https://www.youtube.com/embed/EDbTecwnlwQ?list=PLu715x0E8GkJim-Nb_XnSfK0OXEWknSt5",
        thumbnail: "https://www.carlogos.org/car-logos/hyundai-logo-2011-640.png",
        title: "Hyundai Creta",
        link: "https://www.hyundai.com/in/en/find-a-car/creta/highlights",
        description: "The Hyundai Creta is a best-selling SUV renowned for its bold styling, premium interiors, and powerful engine options. It offers a commanding road presence.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Creta",
          manufacturer: "Hyundai",
          year: 2024,
          features: ["1.5L MPi Petrol/1.5L U2 CRDi Diesel/1.5L Turbo GDi Petrol", "Panoramic Sunroof", "Ventilated Seats", "ADAS Level 2", "Bluelink Connectivity", "8-way Power Driver Seat"],
          price: "₹ 11.00 - 20.15 Lakh"
        }
      },
      {
        id: 'hyundai-aura',
        videoPoster: hyundaiaura,
        videoSrc: "https://www.youtube.com/embed/fPVmpdRXuw8",
        thumbnail: "https://www.carlogos.org/car-logos/hyundai-logo-2011-640.png",
        title: "Hyundai Aura",
        link: "https://www.hyundai.com/in/en/find-a-car/aura/highlights",
        description: "The Hyundai Aura is a stylish compact sedan offering premium features, a comfortable cabin, and multiple engine options including CNG.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Aura",
          manufacturer: "Hyundai",
          year: 2024,
          features: ["1.2L Kappa Petrol/1.2L Bi-Fuel (Petrol with CNG)", "8-inch Touchscreen Infotainment", "Wireless Charging", "Cruise Control", "Voice Recognition", "Rear AC Vents"],
          price: "₹ 6.49 - 9.05 Lakh"
        }
      },
      {
        id: 'hyundai-Amze',
        videoPoster: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/i20/9471/1749452397084/front-left-side-47.jpg",
        videoSrc: "https://www.youtube.com/embed/jB1tW5S-e2w", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/hyundai-logo-2011-640.png",
        title: "Hyundai i20",
        link: "https://www.hyundai.com/in/en/find-a-car/i20/highlights",
        description: "The Hyundai i20 is a premium hatchback known for its fluidic design, comfortable interior, and advanced features, making it a popular choice.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "i20",
          manufacturer: "Hyundai",
          year: 2024,
          features: ["1.2L Kappa Petrol", "IVT/Manual Transmission", "Bose Premium Sound System", "Electric Sunroof", "6 Airbags", "Wireless Phone Charger"],
          price: "₹ 7.00 - 11.20 Lakh"
        }
      },
      {
        id: 'hyundai-venue', // Added Venue
        videoPoster: hyundaivenue,
        videoSrc: "https://www.youtube.com/embed/jB1tW5S-e2w", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/hyundai-logo-2011-640.png",
        title: "Hyundai Venue",
        link: "https://www.hyundai.com/in/en/find-a-car/venue/highlights",
        description: "The Hyundai Venue is a sub-compact SUV that blends stylish looks with practical features, offering a comfortable and tech-savvy urban commuting experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Venue",
          manufacturer: "Hyundai",
          year: 2024,
          features: ["1.2L Kappa Petrol/1.0L Turbo GDi Petrol/1.5L CRDi Diesel", "Bluelink Connectivity", "Electric Sunroof", "Air Purifier", "Projector Fog Lamps", "Drive Modes"],
          price: "₹ 7.94 - 13.48 Lakh"
        }
      },
      {
        id: 'hyundai-verna', // Added Verna
        videoPoster: hyundaiverna,
        videoSrc: "https://www.youtube.com/embed/yT1Q02uVwWw", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/hyundai-logo-2011-640.png",
        title: "Hyundai Verna",
        link: "https://www.hyundai.com/in/en/find-a-car/verna/highlights",
        description: "The Hyundai Verna is a mid-size sedan known for its futuristic design, powerful engine options, and segment-first ADAS features, providing a dynamic driving experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Verna",
          manufacturer: "Hyundai",
          year: 2024,
          features: ["1.5L MPi Petrol/1.5L Turbo GDi Petrol", "ADAS Level 2", "Heated & Ventilated Seats", "10.25-inch Infotainment", "Electric Sunroof", "6 Airbags"],
          price: "₹ 11.00 - 17.42 Lakh"
        }
      }
    ]
  },
  {
    manufacturer: 'Honda',
    idPrefix: 'honda',
    vehicles: [
      {
        id: 'honda-amaze',
        videoPoster: hyundaiAmze, // Placeholder image - Assuming no specific Amaze image. If available, change to `hondaAmaze`.
        videoSrc: "https://www.youtube.com/embed/7bJF4SQNHfM",
        thumbnail: "https://www.carlogos.org/car-logos/honda-logo-2000-full-download.png",
        title: "Honda Amaze",
        link: "https://www.hondacarindia.com/honda-amaze",
        description: "The Honda Amaze is a compact sedan that blends comfort, performance, and fuel efficiency, making it perfect for city and long drives.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Amaze",
          manufacturer: "Honda",
          year: 2024,
          features: ["1.2L i-VTEC Petrol Engine", "5-speed Manual/CVT Transmission", "DIGIPAD 2.0 Touchscreen", "Dual Airbags", "Cruise Control", "Paddle Shifters (CVT)"],
          price: "₹ 7.20 - 9.96 Lakh"
        }
      },
      {
        id: 'honda-city',
        videoPoster: hondacity,
        videoSrc: "https://www.youtube.com/embed/NH1DLqoV_HQ",
        thumbnail: "https://www.carlogos.org/car-logos/honda-logo-2000-full-download.png",
        title: "Honda City",
        link: "https://www.hondacarindia.com/honda-city-5th-generation",
        description: "The Honda City is a premium sedan known for its sleek styling, smooth ride, and advanced safety features. It’s a symbol of elegance and performance.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "City",
          manufacturer: "Honda",
          year: 2024,
          features: ["1.5L i-VTEC Petrol Engine", "Honda Sensing (ADAS)", "LaneWatch Camera", "Electric Sunroof", "8-Speaker Sound System", "Connected Car Technology"],
          price: "₹ 11.70 - 16.30 Lakh"
        }
      },
      {
        id: 'honda-elevate',
        videoPoster: hondaelevate,
        videoSrc: "https://www.youtube.com/embed/KIvC5wsoW2Y",
        thumbnail: "https://www.carlogos.org/car-logos/honda-logo-2000-full-download.png",
        title: "Honda Elevate",
        link: "https://www.hondacarindia.com/honda-elevate",
        description: "The Honda Elevate is a bold and modern SUV offering spacious interiors, strong road presence, and the latest tech features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Elevate",
          manufacturer: "Honda",
          year: 2024,
          features: ["1.5L i-VTEC DOHC Petrol Engine", "Honda Sensing (ADAS)", "Wireless CarPlay/Android Auto", "Electric Sunroof", "6 Airbags", "LaneWatch Camera"],
          price: "₹ 11.69 - 16.51 Lakh"
        }
      },
      {
        id: 'honda-wrv', // Added WR-V
        videoPoster: hondaWrv,
        videoSrc: "https://www.youtube.com/embed/zH8zQ8B4P0w", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/honda-logo-2000-full-download.png",
        title: "Honda WR-V",
        link: "https://www.hondacarindia.com/honda-wr-v",
        description: "The Honda WR-V is a compact SUV offering a blend of bold styling and practicality, known for its spacious cabin and comfortable ride. (Discontinued in India as of 2023)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "WR-V",
          manufacturer: "Honda",
          year: 2023, // Last model year sold in India
          features: ["1.2L i-VTEC Petrol/1.5L i-DTEC Diesel", "Electric Sunroof", "Digipad 2.0", "Cruise Control", "Dual Airbags", "Multi-Utility Vehicle (SUV-like stance)"],
          price: "₹ 9.11 - 12.31 Lakh (at discontinuation)"
        }
      },
      {
        id: 'honda-jazz', // Added Jazz
        videoPoster: hondaJazz,
        videoSrc: "https://www.youtube.com/embed/hJdY1jS5N50", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/honda-logo-2000-full-download.png",
        title: "Honda Jazz",
        link: "https://www.hondacarindia.com/honda-jazz",
        description: "The Honda Jazz is a premium hatchback known for its 'Magic Seats' versatility, spacious interiors, and reliable performance, offering great utility. (Discontinued in India as of 2022)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Jazz",
          manufacturer: "Honda",
          year: 2022, // Last model year sold in India
          features: ["1.2L i-VTEC Petrol Engine", "Magic Seats (Ultra-flexible seating)", "Paddle Shift (CVT)", "Cruise Control", "LED DRLs", "Digipad 2.0 Infotainment"],
          price: "₹ 7.90 - 9.40 Lakh (at discontinuation)"
        }
      }
    ]
  },
  {
    manufacturer: 'Renault',
    idPrefix: 'renault',
    vehicles: [
      {
        id: 'renault-kwid',
        videoPoster: renaultkwid,
        videoSrc: "https://www.youtube.com/embed/PsMu5I_FdfE",
        thumbnail: "https://www.carlogos.org/logo/Renault-logo-2015-2048x2048.png",
        title: "Renault Kwid",
        link: "https://www.renault.co.in/cars/renault-kwid.html",
        description: "The Renault Kwid is a compact hatchback known for its SUV-inspired styling, spacious interiors, and affordability, making it ideal for urban commutes.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Kwid",
          manufacturer: "Renault",
          year: 2024,
          features: ["0.8L/1.0L SCe Petrol Engine", "SUV-inspired Design", "8-inch Touchscreen MediaNAV Evolution", "Reverse Parking Camera", "Dual Airbags", "LED DRLs"],
          price: "₹ 4.70 - 6.45 Lakh"
        }
      },
      {
        id: 'renault-kiger',
        videoPoster: renaultkiger,
        videoSrc: "https://www.youtube.com/embed/8uSBAhQ1sik",
        thumbnail: "https://www.carlogos.org/logo/Renault-logo-2015-2048x2048.png",
        title: "Renault Kiger",
        link: "https://www.renault.co.in/cars/renault-kiger.html",
        description: "The Renault Kiger is a compact SUV offering a sporty design, smart interiors, and turbocharged engine options, providing a dynamic driving experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Kiger",
          manufacturer: "Renault",
          year: 2024,
          features: ["1.0L Energy/1.0L Turbo Petrol Engine", "Multi-Sense Drive Modes (Normal, Eco, Sport)", "Wireless Charger", "PM2.5 Air Filter", "Four Airbags", "Floating 8-inch Touchscreen"],
          price: "₹ 6.00 - 11.23 Lakh"
        }
      },
      {
        id: 'renault-triber',
        videoPoster: renaulttriber,
        videoSrc: "https://www.youtube.com/embed/0aT4tC2OAQ0",
        thumbnail: "https://www.carlogos.org/logo/Renault-logo-2015-2048x2048.png",
        title: "Renault Triber",
        link: "https://www.renault.co.in/cars/renault-triber.html",
        description: "The Renault Triber is a versatile 7-seater MUV known for its modular seating, spacious cabin, and practical features, making it ideal for large families.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Triber",
          manufacturer: "Renault",
          year: 2024,
          features: ["1.0L Energy Petrol Engine", "EasyFix Seats (Modular Seating)", "LED Instrument Cluster", "Push-Start/Stop Button", "Four Airbags", "Cooled Storage"],
          price: "₹ 6.00 - 8.97 Lakh"
        }
      },
      {
        id: 'renault-duster', // Added Duster
        videoPoster: renaultduster,
        videoSrc: "https://www.youtube.com/embed/yT1Q02uVwWw", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Renault-logo-2015-2048x2048.png",
        title: "Renault Duster",
        link: "https://www.renault.co.in/cars/renault-duster.html",
        description: "The Renault Duster is an iconic SUV that redefined its segment with its robust build, capable off-road performance, and comfortable ride quality. (Discontinued in India as of 2022)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Duster",
          manufacturer: "Renault",
          year: 2022, // Last model year sold in India
          features: ["1.5L H4K Petrol/1.5L K9K Diesel", "All-Wheel Drive (AWD) Option", "Projector Headlamps", "Cruise Control", "Touchscreen Infotainment", "High Ground Clearance"],
          price: "₹ 10.00 - 14.50 Lakh (at discontinuation)"
        }
      }
    ]
  },
  {
    manufacturer: 'BMW',
    idPrefix: 'bmw',
    vehicles: [
      {
        id: 'bmw-x7',
        videoPoster: bmwx7,
        videoSrc: "https://www.youtube.com/embed/hxD1d-wR1Qg",
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW X7",
        link: "https://www.bmw.in/en/all-models/x-series/x7/2022/bmw-x7-overview.html",
        description: "The BMW X7 is a luxurious full-size SUV offering powerful performance, advanced technology, and a sophisticated interior with ample space.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "X7",
          manufacturer: "BMW",
          year: 2024,
          features: ["3.0L Inline 6-Cylinder Petrol/Diesel", "Panoramic Sky Lounge LED Roof", "Live Cockpit Professional", "Harman Kardon Surround Sound System", "Adaptive 2-axle Air Suspension", "Integral Active Steering"],
          price: "₹ 1.30 - 1.40 Crore"
        }
      },
      {
        id: 'bmw-x5',
        videoPoster: bmwx5,
        videoSrc: "https://www.youtube.com/embed/YA9RF1AsawI",
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW X5",
        link: "https://www.bmw.in/en/all-models/x-series/X5/2023/bmw-x5-overview.html",
        description: "The BMW X5 is a premium mid-size SUV known for its dynamic driving capabilities, refined interior, and cutting-edge infotainment system.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "X5",
          manufacturer: "BMW",
          year: 2024,
          features: ["3.0L Inline 6-Cylinder Petrol/Diesel", "BMW Laserlight", "Gesture Control", "Head-Up Display", "Adaptive M Suspension", "xDrive All-Wheel Drive"],
          price: "₹ 98.50 Lakh - 1.15 Crore"
        }
      },
      {
        id: 'bmw-x3',
        videoPoster: bmwx3,
        videoSrc: "https://www.youtube.com/embed/6AfoTwOSFxw",
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW X3",
        link: "https://www.bmw.in/en/all-models/x-series/x3/2025/bmw-x3.html",
        description: "The BMW X3 is a compact luxury SUV offering a blend of sportiness and comfort, with powerful engines and a well-appointed cabin.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "X3",
          manufacturer: "BMW",
          year: 2024,
          features: ["2.0L Petrol/Diesel Engine", "Sport Seats", "Panoramic Glass Roof", "Parking Assistant Plus", "Ambient Lighting", "iDrive Controller"],
          price: "₹ 68.50 Lakh - 87.70 Lakh"
        }
      },
      {
        id: 'bmw-3-series', // Added 3 Series Sedan
        videoPoster: bmw3Series,
        videoSrc: "https://www.youtube.com/embed/S_8qM9P4E5A", // Example relevant video ID
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW 3 Series",
        link: "https://www.bmw.in/en/all-models/3-series/sedan/2022/bmw-3-series-sedan-overview.html",
        description: "The BMW 3 Series Sedan is the quintessential sports sedan, renowned for its dynamic driving, athletic design, and premium interior.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "3 Series",
          manufacturer: "BMW",
          year: 2024,
          features: ["2.0L TwinPower Turbo Petrol/Diesel", "Sport Line/M Sport Package", "BMW Curved Display", "Parking Assistant", "Wireless Charging", "Ambient Lighting"],
          price: "₹ 46.90 Lakh - 60.00 Lakh"
        }
      },
      {
        id: 'bmw-5-series', // Added 5 Series Sedan
        videoPoster: bmw5Series,
        videoSrc: "https://www.youtube.com/embed/zH8zQ8B4P0w", // Example relevant video ID
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW 5 Series",
        link: "https://www.bmw.in/en/all-models/5-series/sedan/2024/bmw-5-series-sedan-highlights.html",
        description: "The BMW 5 Series Sedan is an executive luxury car blending refined elegance with dynamic performance and cutting-edge technology.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "5 Series",
          manufacturer: "BMW",
          year: 2024,
          features: ["2.0L TwinPower Turbo Petrol/Diesel", "Adaptive Suspension", "M Sport Brakes", "Remote Control Parking", "Harman Kardon Sound System", "BMW Live Cockpit Professional"],
          price: "₹ 68.90 Lakh - 75.90 Lakh"
        }
      },
      {
        id: 'bmw-ix', // Added iX (Electric SUV)
        videoPoster: bmwIx,
        videoSrc: "https://www.youtube.com/embed/k9DTfWxGwBg", // Example relevant video ID
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW iX",
        link: "https://www.bmw.in/en/all-models/bmw-i/ix/2024/bmw-ix-highlights.html",
        description: "The BMW iX is a visionary electric SAV (Sports Activity Vehicle) offering sustainable luxury, innovative technology, and impressive electric range.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "iX",
          manufacturer: "BMW",
          year: 2024,
          features: ["Fifth-generation eDrive technology", "Panoramic Sky Lounge LED Roof", "Integrated Heating in Seats & Armrests", "Bowers & Wilkins Diamond Surround Sound System", "xDrive Electric All-Wheel Drive"],
          price: "₹ 1.21 Crore"
        }
      }
    ]
  },
  {
    manufacturer: 'Volkswagen',
    idPrefix: 'volkswagen',
    vehicles: [
      {
        id: 'volkswagen-virtus',
        videoPoster: vwVirtus,
        videoSrc: "https://www.youtube.com/embed/mK5yPevgygM",
        thumbnail: "https://www.carlogos.org/logo/Volkswagen-logo-2019-1500x1500.png",
        title: "Volkswagen Virtus",
        link: "https://www.volkswagen.co.in/en/models/virtus-sport.html",
        description: "The Volkswagen Virtus is a stylish and feature-packed sedan offering a strong performance, robust build quality, and a comfortable ride.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Virtus",
          manufacturer: "Volkswagen",
          year: 2024,
          features: ["1.0L/1.5L TSI Petrol Engine", "10-inch Touchscreen Infotainment", "Ventilated Seats", "Electric Sunroof", "6 Airbags", "My Volkswagen Connect"],
          price: "₹ 11.56 - 19.41 Lakh"
        }
      },
      {
        id: 'volkswagen-polo',
        videoPoster: vwPolo,
        videoSrc: "https://www.youtube.com/embed/7S_MIU9_yBw",
        thumbnail: "https://www.carlogos.org/logo/Volkswagen-logo-2019-1500x1500.png",
        title: "Volkswagen Polo",
        link: "https://www.volkswagen.co.in/",
        description: "The Volkswagen Polo was a highly popular and iconic premium hatchback in India, known for its solid build quality, precise handling, and fun-to-drive nature. It was a benchmark in its segment for many years. (Discontinued in India as of 2022)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Polo",
          manufacturer: "Volkswagen",
          year: 2022, // Last model year sold in India
          features: ["1.0L MPI/1.0L TSI Petrol Engine", "German Build Quality", "Multi-function Steering Wheel", "Dual Airbags", "ABS", "Touchscreen Infotainment (later models)"],
          price: "₹ 6.45 - 10.25 Lakh (at time of discontinuation)"
        }
      },
      {
        id: 'volkswagen-tiguan',
        videoPoster: vwTiguan,
        videoSrc: "https://www.youtube.com/embed/_XzqB19vmmo",
        thumbnail: "https://www.carlogos.org/logo/Volkswagen-logo-2019-1500x1500.png",
        title: "Volkswagen Tiguan",
        link: "https://www.volkswagen.co.in/en/models/tiguan-r-line.html",
        description: "The Volkswagen Tiguan is a premium SUV offering a sophisticated design, powerful engine, and advanced features for a comfortable and safe drive.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Tiguan",
          manufacturer: "Volkswagen",
          year: 2024,
          features: ["2.0L TSI Petrol Engine", "LED Matrix Headlamps (IQ.Light)", "Panoramic Sunroof", "3-zone Climate Control", "8 Airbags", "4MOTION All-Wheel Drive"],
          price: "₹ 35.17 Lakh"
        }
      },
      {
        id: 'volkswagen-taigun', // Added Taigun
        videoPoster: vwTaigun,
        videoSrc: "https://www.youtube.com/embed/xL-5j2uVwWw", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Volkswagen-logo-2019-1500x1500.png",
        title: "Volkswagen Taigun",
        link: "https://www.volkswagen.co.in/en/models/taigun.html",
        description: "The Volkswagen Taigun is a robust compact SUV blending striking design with strong performance from its TSI engines and advanced features, built for urban adventures.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Taigun",
          manufacturer: "Volkswagen",
          year: 2024,
          features: ["1.0L/1.5L TSI Petrol Engine", "10-inch Touchscreen", "Digital Cockpit", "Electric Sunroof", "Ventilated Front Seats", "My Volkswagen Connect"],
          price: "₹ 11.70 - 19.74 Lakh"
        }
      },
      {
        id: 'volkswagen-t-roc', // Added T-Roc
        videoPoster: volkswagenTroc,
        videoSrc: "https://www.youtube.com/embed/Yp_Zf6zE0mU", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Volkswagen-logo-2019-1500x1500.png",
        title: "Volkswagen T-Roc",
        link: "https://www.volkswagen.co.in/en/models/t-roc.html",
        description: "The Volkswagen T-Roc is a stylish and sporty compact SUV known for its distinctive design, dynamic driving, and premium features. (Discontinued in India as of 2022)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "T-Roc",
          manufacturer: "Volkswagen",
          year: 2022, // Last model year sold in India
          features: ["1.5L TSI Petrol Engine", "Digital Cockpit", "Panoramic Sunroof", "Dual-tone Roof", "6 Airbags", "Leather Upholstery"],
          price: "₹ 23.84 Lakh (at discontinuation)"
        }
      }
    ]
  },
  {
    manufacturer: 'Mercedes-Benz',
    idPrefix: 'mercedes',
    vehicles: [
      {
        id: 'mercedes-e-class',
        videoPoster: mercdeseclass,
        videoSrc: "https://www.youtube.com/embed/g2J03fK-5tI",
        thumbnail: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
        title: "Mercedes-Benz E-Class",
        link: "https://www.mercedes-benz.co.in/passengercars/models/e-class/saloon/highlights.html",
        description: "The Mercedes-Benz E-Class is a benchmark executive sedan, known for its luxurious comfort, elegant design, and advanced technology, providing a sophisticated driving experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "E-Class",
          manufacturer: "Mercedes-Benz",
          year: 2024,
          features: ["2.0L Petrol/Diesel or 3.0L Diesel Engine", "Long Wheelbase (LWB)", "MBUX Infotainment System", "Burmester Surround Sound System", "Multibeam LED Headlamps", "Rear Seat Entertainment"],
          price: "₹ 76.00 Lakh - 89.00 Lakh"
        }
      },
      {
        id: 'mercedes-s-class',
        videoPoster: mercdesesclass,
        videoSrc: "https://www.youtube.com/embed/rK8v0N06a3Q",
        thumbnail: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
        title: "Mercedes-Benz S-Class",
        link: "https://www.mercedes-benz.co.in/passengercars/models/s-class/saloon/highlights.html",
        description: "The Mercedes-Benz S-Class represents the pinnacle of luxury and automotive engineering, offering unparalleled refinement, innovative technology, and commanding presence.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "S-Class",
          manufacturer: "Mercedes-Benz",
          year: 2024,
          features: ["3.0L Petrol/Diesel Engine", "Digital Light Technology", "Rear-Axle Steering", "4D Burmester Surround Sound System", "ENERGIZING COACH", "MBUX Hyperscreen (Optional)"],
          price: "₹ 1.77 Crore - 1.86 Crore"
        }
      },
      {
        id: 'mercedes-g-class',
        videoPoster: mercedesg,
        videoSrc: "https://www.youtube.com/embed/W9l6D0pWq4c",
        thumbnail: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
        title: "Mercedes-Benz G-Class",
        link: "https://www.mercedes-benz.co.in/passengercars/models/g-class/suv/highlights.html",
        description: "The Mercedes-Benz G-Class (G-Wagen) is an iconic off-road legend that combines rugged capability with supreme luxury, making it a unique statement of power and prestige.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "G-Class",
          manufacturer: "Mercedes-Benz",
          year: 2024,
          features: ["3.0L Inline 6-Cylinder Diesel/4.0L V8 Petrol", "Three Differential Locks", "Low-Range Gearbox", "Widescreen Cockpit", "Exclusive Interior Packages", "All-Wheel Drive"],
          price: "₹ 2.55 Crore"
        }
      },
      {
        id: 'mercedes-c-class', // Added C-Class
        videoPoster: mercedesCClass,
        videoSrc: "https://www.youtube.com/embed/g2J03fK-5tI", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
        title: "Mercedes-Benz C-Class",
        link: "https://www.mercedes-benz.co.in/passengercars/models/c-class/saloon/highlights.html",
        description: "The Mercedes-Benz C-Class is a stylish and sophisticated compact luxury sedan, often referred to as the 'baby S-Class' due to its premium features and refined ride.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "C-Class",
          manufacturer: "Mercedes-Benz",
          year: 2024,
          features: ["1.5L Petrol/2.0L Diesel Engine (with EQ Boost)", "MBUX Infotainment System (Portrait Screen)", "Fingerprint Scanner", "AGILITY CONTROL Suspension", "LED High-Performance Headlamps", "Connected Car Technology"],
          price: "₹ 60.00 Lakh - 66.00 Lakh"
        }
      },
      {
        id: 'mercedes-glc', // Added GLC
        videoPoster: mercedesGlc,
        videoSrc: "https://www.youtube.com/embed/rK8v0N06a3Q", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
        title: "Mercedes-Benz GLC",
        link: "https://www.mercedes-benz.co.in/passengercars/models/glc/suv/highlights.html",
        description: "The Mercedes-Benz GLC is a versatile mid-size luxury SUV combining elegant design with powerful performance and advanced technology, making it a popular choice.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "GLC",
          manufacturer: "Mercedes-Benz",
          year: 2024,
          features: ["2.0L Petrol/Diesel Engine (with EQ Boost)", "MBUX Infotainment System", "Off-Road Engineering Package", "AIRMATIC Suspension (Optional)", "360-degree Camera", "Burmester Surround Sound System (Optional)"],
          price: "₹ 74.00 Lakh - 79.00 Lakh"
        }
      },
      {
        id: 'mercedes-eqs', // Added EQS (Electric)
        videoPoster: mercedesEqs,
        videoSrc: "https://www.youtube.com/embed/W9l6D0pWq4c", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
        title: "Mercedes-Benz EQS",
        link: "https://www.mercedes-benz.co.in/passengercars/models/eqe/saloon/highlights.html", // Using EQE link as a general EV page if EQS specific isn't readily available
        description: "The Mercedes-Benz EQS is the flagship electric luxury sedan, offering groundbreaking design, innovative technology, and a truly futuristic driving experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "EQS",
          manufacturer: "Mercedes-Benz",
          year: 2024,
          features: ["Electric Powertrain", "MBUX Hyperscreen", "ENERGIZING COMFORT", "AIRMATIC Air Suspension", "Rear-Axle Steering", "Burmester 3D Surround Sound System"],
          price: "₹ 1.62 Crore - 1.95 Crore"
        }
      }
    ]
  },
  {
    manufacturer: 'Tata Motors',
    idPrefix: 'tata',
    vehicles: [
      {
        id: 'tata-harrier',
        videoPoster: tataharrier,
        videoSrc: "https://www.youtube.com/embed/FYOzVWrwLoE",
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Harrier",
        link: "https://cars.tatamotors.com/harrier/ice.html",
        description: "The Tata Harrier is a mid-size SUV known for its impactful design, robust performance, and advanced features, offering a commanding road presence.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Harrier",
          manufacturer: "Tata Motors",
          year: 2024,
          features: ["2.0L Kryotec Diesel Engine", "Panoramic Sunroof", "ADAS Features", "JBL Audio System", "Multi-Terrain Modes (Normal, Wet, Rough)", "Connected Car Technology"],
          price: "₹ 15.49 - 26.44 Lakh"
        }
      },
      {
        id: 'tata-punch',
        videoPoster: tatanexon, // Using Nexon image for Punch (assuming it matches or is a placeholder)
        videoSrc: "https://www.youtube.com/embed/smpE8K2ylPw",
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Punch",
        link: "https://cars.tatamotors.com/punch/ice.html",
        description: "The Tata Punch is a micro-SUV offering a robust stance, high ground clearance, and a 5-star GNCAP safety rating, making it a powerful and safe urban companion.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Punch",
          manufacturer: "Tata Motors",
          year: 2024,
          features: ["1.2L Revotron Petrol Engine", "5-star GNCAP Safety Rating", "Traction Pro Mode", "Automatic Headlamps", "Rain Sensing Wipers", "7-inch Touchscreen Infotainment"],
          price: "₹ 6.13 - 10.20 Lakh"
        }
      },
      {
        id: 'tata-altroz',
        videoPoster: tataaltroz,
        videoSrc: "https://www.youtube.com/embed/O8fVsTeEe-c",
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Altroz",
        link: "https://cars.tatamotors.com/altroz/ice.html",
        description: "The Tata Altroz is a premium hatchback known for its 5-star GNCAP safety rating, striking design, and comfortable cabin, offering a superior driving experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Altroz",
          manufacturer: "Tata Motors",
          year: 2024,
          features: ["1.2L Revotron Petrol/1.5L Revotorq Diesel/1.2L iTurbo Petrol", "5-star GNCAP Safety Rating", "90-degree Opening Doors", "iRA Connected Car Technology", "Voice Assist Sunroof (Optional)", "Multi-Drive Modes"],
          price: "₹ 6.65 - 10.80 Lakh"
        }
      },
      {
        id: 'tata-nexon-ev', // Added Nexon EV
        videoPoster: tataNexonEv,
        videoSrc: "https://www.youtube.com/embed/xL-5j2uVwWw", // Example relevant video ID
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Nexon EV",
        link: "https://ev.tatamotors.com/nexon-ev-max/",
        description: "The Tata Nexon EV is India's best-selling electric SUV, offering impressive range, quick acceleration, and a connected drive experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Nexon EV",
          manufacturer: "Tata Motors",
          year: 2024,
          features: ["Ziptron EV Technology", "Multi-Mode Regen", "Connected Car Tech", "Electric Sunroof", "Ventilated Seats", "DisC Brakes on All 4 Wheels"],
          price: "₹ 14.49 - 19.54 Lakh"
        }
      },
      {
        id: 'tata-safari', // Added Safari
        videoPoster: tataSafari,
        videoSrc: "https://www.youtube.com/embed/L1d_fW8H_1o", // Example relevant video ID
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Safari",
        link: "https://cars.tatamotors.com/suv/safari",
        description: "The Tata Safari is a premium 7-seater SUV known for its iconic design, luxurious interiors, and strong road presence, offering a comfortable and powerful ride.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Safari",
          manufacturer: "Tata Motors",
          year: 2024,
          features: ["2.0L Kryotec Diesel Engine", "ADAS Features (Level 2)", "Panoramic Sunroof", "Ventilated Seats (1st & 2nd row)", "JBL Audio System", "Boss Mode"],
          price: "₹ 16.19 - 27.34 Lakh"
        }
      }
    ]
  },
  {
    manufacturer: 'Ford',
    idPrefix: 'ford',
    vehicles: [
      {
        id: 'ford-endeavour',
        videoPoster: fordendeavour,
        videoSrc: "https://www.youtube.com/embed/j_8q5-M4E5I",
        thumbnail: "https://www.carlogos.org/car-logos/ford-logo-2017-640.png",
        title: "Ford Endeavour",
        link: "https://www.india.ford.com/suvs/endeavour/",
        description: "The Ford Endeavour is a robust and sophisticated SUV known for its commanding presence, powerful engine options, and off-road capabilities, perfect for adventurous families. (Discontinued in India as of 2021)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Endeavour",
          manufacturer: "Ford",
          year: 2021, // Last model year sold in India
          features: ["2.0L EcoBlue Diesel Engine", "Terrain Management System", "Active Noise Cancellation", "Panoramic Sunroof", "Semi-Auto Parallel Park Assist", "8-inch Touchscreen Infotainment"],
          price: "₹ 29.99 - 36.25 Lakh (at discontinuation)"
        }
      },
      {
        id: 'ford-ecosport',
        videoPoster: fordecosport,
        videoSrc: "https://www.youtube.com/embed/y-T0c5c5A1E",
        thumbnail: "https://www.carlogos.org/car-logos/ford-logo-2017-640.png",
        title: "Ford EcoSport",
        link: "https://www.india.ford.com/suvs/ecosport/",
        description: "The Ford EcoSport is a compact SUV credited with popularizing the segment in India, known for its agile handling, robust build, and fun-to-drive nature. (Discontinued in India as of 2021)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "EcoSport",
          manufacturer: "Ford",
          year: 2021,
          features: ["1.5L Ti-VCT Petrol/1.5L TDCi Diesel", "SYNC 3 Infotainment", "6 Airbags", "Hill Launch Assist", "Automatic Headlamps", "Rear Parking Camera"],
          price: "₹ 8.19 - 11.73 Lakh (at discontinuation)"
        }
      },
      {
        id: 'ford-freestyle',
        videoPoster: fordfreestyle,
        videoSrc: "https://www.youtube.com/embed/wXz4yqM0oKk",
        thumbnail: "https://www.carlogos.org/car-logos/ford-logo-2017-640.png",
        title: "Ford Freestyle",
        link: "https://www.india.ford.com/cars/freestyle/",
        description: "The Ford Freestyle is a CUV (Compact Utility Vehicle) offering a rugged appeal, peppy engine, and comfortable ride, ideal for adventurous urbanites. (Discontinued in India as of 2021)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Freestyle",
          manufacturer: "Ford",
          year: 2021,
          features: ["1.2L Ti-VCT Petrol/1.5L TDCi Diesel", "Figo-based Crossover Design", "Active Rollover Prevention", "Touchscreen Infotainment", "Automatic Headlamps", "Rain-Sensing Wipers"],
          price: "₹ 7.29 - 9.09 Lakh (at discontinuation)"
        }
      },
      {
        id: 'ford-figo', // Added Figo
        videoPoster: fordfigo,
        videoSrc: "https://www.youtube.com/embed/Yp_Zf6zE0mU", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/ford-logo-2017-640.png",
        title: "Ford Figo",
        link: "https://www.india.ford.com/cars/figo/",
        description: "The Ford Figo is a spirited hatchback known for its strong build quality, peppy performance, and fun-to-drive dynamics, offering excellent value. (Discontinued in India as of 2021)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Figo",
          manufacturer: "Ford",
          year: 2021, // Last model year sold in India
          features: ["1.2L Ti-VCT Petrol/1.5L TDCi Diesel", "SYNC 3 Infotainment", "6 Airbags", "Automatic Headlamps", "Rain-Sensing Wipers", "Sporty Driving Dynamics"],
          price: "₹ 5.82 - 8.37 Lakh (at discontinuation)"
        }
      },
      {
        id: 'ford-aspire', // Added Aspire
        videoPoster: fordaspire,
        videoSrc: "https://www.youtube.com/embed/xL-5j2uVwWw", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/ford-logo-2017-640.png",
        title: "Ford Aspire",
        link: "https://www.india.ford.com/cars/aspire/",
        description: "The Ford Aspire is a compact sedan based on the Figo, offering a blend of spacious interiors, efficient engines, and strong safety features. (Discontinued in India as of 2021)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Aspire",
          manufacturer: "Ford",
          year: 2021, // Last model year sold in India
          features: ["1.2L Ti-VCT Petrol/1.5L TDCi Diesel", "SYNC 3 Infotainment", "6 Airbags", "Automatic Climate Control", "Rear Parking Sensors", "MyKey Technology"],
          price: "₹ 7.28 - 9.60 Lakh (at discontinuation)"
        }
      }
    ]
  },
  {
    manufacturer: 'Audi',
    idPrefix: 'audi',
    vehicles: [
      {
        id: 'audi-a4',
        videoPoster: audiA4,
        videoSrc: "https://www.youtube.com/embed/Cj-YxY4y-4I",
        thumbnail: "https://www.carlogos.org/car-logos/audi-logo-2016-640.png",
        title: "Audi A4",
        link: "https://www.audi.in/in/web/en/models/a4/a4-limousine.html",
        description: "The Audi A4 is a luxury sedan embodying sophisticated design, advanced technology, and a dynamic driving experience, perfect for executive comfort.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "A4",
          manufacturer: "Audi",
          year: 2024,
          features: ["2.0L TFSI Petrol Engine", "Virtual Cockpit Plus", "MMI Navigation Plus with Touch Response", "Audi Drive Select", "Parking Aid Plus with Rear Camera", "Ambient Lighting Plus"],
          price: "₹ 45.34 - 53.57 Lakh"
        }
      },
      {
        id: 'audi-a6',
        videoPoster: audiA6,
        videoSrc: "https://www.youtube.com/embed/fW_n5wI9E7c",
        thumbnail: "https://www.carlogos.org/car-logos/audi-logo-2016-640.png",
        title: "Audi A6",
        link: "https://www.audi.in/in/web/en/models/a6/a6-limousine.html",
        description: "The Audi A6 is a luxurious executive sedan that combines progressive design with cutting-edge technology and refined performance, setting new standards for comfort and innovation.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "A6",
          manufacturer: "Audi",
          year: 2024,
          features: ["2.0L TFSI Petrol Engine", "Dual Touchscreen MMI System", "HD Matrix LED Headlamps", "B&O Premium Sound System", "Progressive Steering", "Lane Departure Warning"],
          price: "₹ 64.39 - 70.78 Lakh"
        }
      },
      {
        id: 'audi-q7',
        videoPoster: audiQ7,
        videoSrc: "https://www.youtube.com/embed/z0N_fQ-Fw1s",
        thumbnail: "https://www.carlogos.org/car-logos/audi-logo-2016-640.png",
        title: "Audi Q7",
        link: "https://www.audi.in/in/web/en/models/q7/q7.html",
        description: "The Audi Q7 is a luxurious and versatile SUV offering a commanding presence, spacious interiors, and advanced technology, perfect for families seeking comfort and performance.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Q7",
          manufacturer: "Audi",
          year: 2024,
          features: ["3.0L TFSI Petrol Engine", "Adaptive Air Suspension", "Quattro AWD", "Virtual Cockpit Plus", "360-degree Cameras with Park Assist", "Four-zone Climate Control"],
          price: "₹ 86.99 Lakh - 94.49 Lakh"
        }
      },
      {
        id: 'audi-q3', // Added Q3
        videoPoster: audiQ3,
        videoSrc: "https://www.youtube.com/embed/S_8qM9P4E5A", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/audi-logo-2016-640.png",
        title: "Audi Q3",
        link: "https://www.audi.in/in/web/en/models/q3/q3.html",
        description: "The Audi Q3 is a compact luxury SUV that combines a sporty design with practical utility, offering a premium experience for urban and adventurous drives.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Q3",
          manufacturer: "Audi",
          year: 2024,
          features: ["2.0L TFSI Petrol Engine", "Quattro AWD", "Panoramic Sunroof", "Audi Drive Select", "MMI Touch Display (10.1-inch)", "Audi Sound System"],
          price: "₹ 43.81 Lakh - 53.17 Lakh"
        }
      },
      {
        id: 'audi-a3', // Added A3 Sedan (if relevant for the Indian market, otherwise another Q model)
        videoPoster: audiA3,
        videoSrc: "https://www.youtube.com/embed/S_8qM9P4E5A", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/audi-logo-2016-640.png",
        title: "Audi A3 Sedan",
        link: "https://www.audi.in/in/web/en/models/a3/a3-limousine.html", // General A3 link
        description: "The Audi A3 Sedan offers a compact yet sophisticated luxury experience, combining elegant design with agile performance and advanced technology. (Discontinued in India as of 2020)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "A3 Sedan",
          manufacturer: "Audi",
          year: 2020, // Last model year sold in India
          features: ["1.4L TFSI Petrol/2.0L TDI Diesel", "Virtual Cockpit", "MMI Touch Response", "LED Headlights", "Progressive Steering", "Panoramic Sunroof"],
          price: "₹ 35.00 Lakh - 40.00 Lakh (at discontinuation)"
        }
      }
    ]
  },
  {
    manufacturer: 'Range Rover',
    idPrefix: 'range-rover',
    vehicles: [
      {
        id: 'range-rover-evoque',
        videoPoster: rangeRoverEvoque,
        videoSrc: "https://www.youtube.com/embed/R_2s2d5P9f4",
        thumbnail: "https://www.rangerover.com/content/dam/lrdx/logo/Range_Rover_Black.svg",
        title: "Range Rover Evoque",
        link: "https://www.landrover.in/range-rover-evoque",
        description: "The Range Rover Evoque is a sophisticated compact SUV known for its distinctive coupe-like silhouette, luxurious interiors, and refined performance, ideal for urban elegance.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Evoque",
          manufacturer: "Range Rover",
          year: 2024,
          features: ["2.0L Ingenium Petrol/Diesel Engine", "Pivi Pro Infotainment", "ClearSight Rear View Mirror", "Terrain Response 2", "Connected Car Tech", "Fixed Panoramic Roof"],
          price: "₹ 67.90 Lakh - 69.85 Lakh"
        }
      },
      {
        id: 'range-rover-sport',
        videoPoster: rangeRoverSport,
        videoSrc: "https://www.youtube.com/embed/mG6rFv0kS-Y",
        thumbnail: "https://www.rangerover.com/content/dam/lrdx/logo/Range_Rover_Black.svg",
        title: "Range Rover Sport",
        link: "https://www.landrover.in/range-rover-sport",
        description: "The Range Rover Sport combines dynamic driving performance with typical Range Rover luxury and capability, offering a compelling blend of athleticism and refinement.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Sport",
          manufacturer: "Range Rover",
          year: 2024,
          features: ["3.0L Ingenium Petrol/Diesel Engine", "Dynamic Air Suspension", "All-Wheel Steering", "Terrain Response 2 with Dynamic Mode", "Meridian Signature Sound System", "Soft Door Close"],
          price: "₹ 1.64 Crore - 2.80 Crore"
        }
      },
      {
        id: 'range-rover-velar',
        videoPoster: rangeRoverVelar,
        videoSrc: "https://www.youtube.com/embed/A6yV5lD5M6c",
        thumbnail: "https://www.rangerover.com/content/dam/lrdx/logo/Range_Rover_Black.svg",
        title: "Range Rover Velar",
        link: "https://www.landrover.in/range-rover-velar",
        description: "The Range Rover Velar is a mid-size luxury SUV defined by its reductive design, elegant proportions, and seamless technology, delivering a sophisticated driving experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Velar",
          manufacturer: "Range Rover",
          year: 2024,
          features: ["2.0L Ingenium Petrol/Diesel Engine", "Flush Door Handles", "Pivi Pro with Curved Glass Display", "Electronic Air Suspension", "Configurable Dynamics", "Active Road Noise Cancellation"],
          price: "₹ 89.41 Lakh"
        }
      },
      {
        id: 'land-rover-discovery-sport', // Added Discovery Sport (under Land Rover, which is part of JLR, shared brand identity)
        videoPoster: rangeRoverDefender, // Using Defender as a placeholder
        videoSrc: "https://www.youtube.com/embed/g2J03fK-5tI", // Example relevant video ID
        thumbnail: "https://www.landrover.in/content/dam/landrover/global/logos/land-rover-logo.png",
        title: "Land Rover Discovery Sport",
        link: "https://www.landrover.in/discovery-sport",
        description: "The Land Rover Discovery Sport is a versatile and compact SUV offering impressive capability, flexible seating for up to seven, and a refined driving experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Discovery Sport",
          manufacturer: "Land Rover",
          year: 2024,
          features: ["2.0L Ingenium Petrol/Diesel Engine", "Terrain Response 2", "ClearSight Ground View", "Activity Key", "7-Seater Option", "Pivi Pro Infotainment"],
          price: "₹ 67.90 Lakh - 72.85 Lakh"
        }
      },
      {
        id: 'land-rover-defender', // Added Defender
        videoPoster: rangeRoverDefender,
        videoSrc: "https://www.youtube.com/embed/rK8v0N06a3Q", // Example relevant video ID
        thumbnail: "https://www.landrover.in/content/dam/landrover/global/logos/land-rover-logo.png",
        title: "Land Rover Defender",
        link: "https://www.landrover.in/defender",
        description: "The Land Rover Defender is an icon reborn, blending legendary capability with modern technology and rugged luxury, ready for any adventure.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Defender",
          manufacturer: "Land Rover",
          year: 2024,
          features: ["2.0L/3.0L Petrol/Diesel or 5.0L V8 Petrol", "Pivi Pro Infotainment", "ClearSight Ground View", "Configurable Terrain Response", "Air Suspension (Electronic)", "Winch Accessory Kit"],
          price: "₹ 97.00 Lakh - 2.35 Crore"
        }
      }
    ]
  },
  {
    manufacturer: 'Rolls-Royce',
    idPrefix: 'rolls-royce',
    vehicles: [
      {
        id: 'rolls-royce-phantom',
        videoPoster: rollsRoycePhantom,
        videoSrc: "https://www.youtube.com/embed/W9l6D0pWq4c",
        thumbnail: "https://www.carlogos.org/logo/Rolls-Royce-RR-logo-1920x1080.png",
        title: "Rolls-Royce Phantom",
        link: "https://www.rolls-roycemotorcars.com/en_GB/bespoke/phantom-bespoke.html",
        description: "The Rolls-Royce Phantom is the epitome of luxury, representing unparalleled craftsmanship, serene comfort, and bespoke personalization, a true masterpiece of automotive artistry.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Phantom",
          manufacturer: "Rolls-Royce",
          year: 2024,
          features: ["6.75L Twin-Turbo V12 Engine", "The Gallery Dashboard (Personalized Art)", "Starlight Headliner", "Coach Doors", "Magic Carpet Ride Suspension", "Effortless Doors"],
          price: "₹ 9.50 Crore - 11.35 Crore"
        }
      },
      {
        id: 'rolls-royce-cullinan',
        videoPoster: rollsRoyceCullinan,
        videoSrc: "https://www.youtube.com/embed/yF-k_R3zV0A", // User's selected video, kept as is.
        thumbnail: "https://www.carlogos.org/logo/Rolls-Royce-RR-logo-1920x1080.png",
        title: "Rolls-Royce Cullinan",
        link: "https://www.rolls-roycemotorcars.com/en_GB/bespoke/cullinan-bespoke.html",
        description: "The Rolls-Royce Cullinan is the brand's first SUV, offering an 'Effortless Everywhere' experience with supreme luxury and exceptional off-road capability, defining new boundaries for ultra-luxury travel.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Cullinan",
          manufacturer: "Rolls-Royce",
          year: 2024,
          features: ["6.75L Twin-Turbo V12 Engine", "Recreational Module (Tailgate Seating)", "Viewing Suite (Rear Facing Seats)", "Off-Road Mode", "All-Wheel Drive and Steering", "Self-Levelling Air Suspension"],
          price: "₹ 6.95 Crore - 8.20 Crore"
        }
      },
      {
        id: 'rolls-royce-ghost',
        videoPoster: rollsRoyceGhost,
        videoSrc: "https://www.youtube.com/embed/hJdY1jS5N50",
        thumbnail: "https://www.carlogos.org/logo/Rolls-Royce-RR-logo-1920x1080.png",
        title: "Rolls-Royce Ghost",
        link: "https://www.rolls-roycemotorcars.com/en_GB/bespoke/ghost-bespoke.html",
        description: "The Rolls-Royce Ghost is a more contemporary and driver-focused Rolls-Royce, embodying 'Post Opulence' design with minimalist aesthetics and advanced technology, providing a refined and dynamic journey.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Ghost",
          manufacturer: "Rolls-Royce",
          year: 2024,
          features: ["6.75L Twin-Turbo V12 Engine", "Illuminated Grille", "Planar Suspension System", "Micro-environment Purification System", "Acoustic Tuning", "All-wheel Drive"],
          price: "₹ 6.95 Crore - 7.95 Crore"
        }
      },
      {
        id: 'rolls-royce-wraith', // Added Wraith
        videoPoster: rollsRoyceWraith,
        videoSrc: "https://www.youtube.com/embed/hJdY1jS5N50", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Rolls-Royce-RR-logo-1920x1080.png",
        title: "Rolls-Royce Wraith",
        link: "https://www.rolls-roycemotorcars.com/en_GB/bespoke/wraith-bespoke.html",
        description: "The Rolls-Royce Wraith is a powerful and dramatic grand tourer, combining athletic styling with effortless performance and uncompromised luxury. (Production ended in 2023)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Wraith",
          manufacturer: "Rolls-Royce",
          year: 2023, // Last model year for new orders
          features: ["6.6L Twin-Turbo V12 Engine", "Fastback Design", "Starlight Headliner", "Bespoke Audio System", "Spirit of Ecstasy (Electrically retractable)", "Satellite-Aided Transmission"],
          price: "₹ 7.20 Crore - 8.50 Crore (approx. at discontinuation)"
        }
      },
      {
        id: 'rolls-royce-dawn', // Added Dawn
        videoPoster: rollsRoyceDawn,
        videoSrc: "https://www.youtube.com/embed/zH8zQ8B4P0w", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Rolls-Royce-RR-logo-1920x1080.png",
        title: "Rolls-Royce Dawn",
        link: "https://www.rolls-roycemotorcars.com/en_GB/bespoke/dawn-bespoke.html",
        description: "The Rolls-Royce Dawn is a luxurious drophead coupé, offering an unparalleled open-top driving experience with a blend of elegance, comfort, and dynamic presence. (Production ended in 2023)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Dawn",
          manufacturer: "Rolls-Royce",
          year: 2023, // Last model year for new orders
          features: ["6.6L Twin-Turbo V12 Engine", "Convertible Soft-top (operates in 22 seconds)", "Effortless Power", "Four-Seat Comfort", "Silent Driving", "Aero Cowling (Optional)"],
          price: "₹ 7.50 Crore - 9.00 Crore (approx. at discontinuation)"
        }
      }
    ]
  },
  {
    manufacturer: 'Mahindra',
    idPrefix: 'mahindra',
    vehicles: [
      {
        id: 'mahindra-xuv700',
        videoPoster: mahindraxuv,
        videoSrc: "https://www.youtube.com/embed/XPXGpK31qRE",
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra XUV700",
        link: "https://auto.mahindra.com/suv/xuv700/X700.html",
        description: "The Mahindra XUV700 is a feature-packed SUV offering segment-leading technology, powerful engine options, and a high safety rating, providing a premium experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "XUV700",
          manufacturer: "Mahindra",
          year: 2024,
          features: ["2.0L mStallion Petrol/2.2L mHawk Diesel", "ADAS (Advanced Driver-Assistance Systems)", "Sony 3D Audio System", "Panoramic Skyroof", "AdrenoX Connected Car Tech", "Personalized Safety Alerts"],
          price: "₹ 13.99 - 26.99 Lakh"
        }
      },
      {
        id: 'mahindra-thar',
        videoPoster: mahindrathar,
        videoSrc: "https://www.youtube.com/embed/k9DTfWxGwBg",
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra Thar",
        link: "https://auto.mahindra.com/suv/thar/THAR.html",
        description: "The Mahindra Thar is an iconic off-road SUV, known for its rugged capabilities, distinctive design, and ability to conquer challenging terrains.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Thar",
          manufacturer: "Mahindra",
          year: 2024,
          features: ["2.0L mStallion Petrol/2.2L mHawk Diesel", "4x4 Drivetrain", "Convertible Top Option", "Washable Interiors", "Dual Airbags", "Adventure Statistics Display"],
          price: "₹ 11.35 - 17.60 Lakh"
        }
      },
      {
        id: 'mahindra-scorpio-n',
        videoPoster: mahindrascorpio,
        videoSrc: "https://www.youtube.com/embed/HvZHXclEj-Q",
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra Scorpio-N",
        link: "https://auto.mahindra.com/suv/scorpio-n/scorpio-n.html",
        description: "The Mahindra Scorpio-N is a powerful and rugged SUV known for its bold design, commanding road presence, and strong performance capabilities.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Scorpio",
          manufacturer: "Mahindra",
          year: 2024,
          features: ["2.0L mStallion Petrol/2.2L mHawk Diesel", "AdrenoX Connect", "4XPLOR Terrain Management", "Electric Sunroof", "6 Airbags", "Frequency Dependent Damping"],
          price: "₹ 13.85 - 24.54 Lakh"
        }
      },
      {
        id: 'mahindra-xuv300', // Added XUV300
        videoPoster: mahindraXuv300,
        videoSrc: "https://www.youtube.com/embed/yT1Q02uVwWw", // Example relevant video ID
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra XUV300",
        link: "https://auto.mahindra.com/suv/xuv300",
        description: "The Mahindra XUV300 is a compact SUV offering a bold design, strong safety features (5-star GNCAP), and peppy engine options.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "XUV300",
          manufacturer: "Mahindra",
          year: 2024,
          features: ["1.2L Turbo Petrol/1.5L Diesel", "5-star GNCAP Safety Rating", "Segment-first Steering Modes", "7 Airbags", "Electric Sunroof", "Connected Car Tech (BlueSense Plus)"],
          price: "₹ 7.99 - 14.76 Lakh"
        }
      },
      {
        id: 'mahindra-bolero-neo', // Added Bolero Neo
        videoPoster: mahindraBoleroNeo,
        videoSrc: "https://www.youtube.com/embed/Yp_Zf6zE0mU", // Example relevant video ID
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra Bolero Neo",
        link: "https://auto.mahindra.com/suv/bolero-neo",
        description: "The Mahindra Bolero Neo is a sub-4 meter SUV that combines the ruggedness of a Bolero with modern design and features, offering comfortable seating and efficient performance.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Bolero Neo",
          manufacturer: "Mahindra",
          year: 2024,
          features: ["1.5L mHawk100 Diesel Engine", "Micro Hybrid Technology (Engine Start-Stop)", "Multi-Terrain Technology (MTT)", "Dual Airbags", "ABS with EBD", "7-Seater (Side-facing 3rd row)"],
          price: "₹ 9.95 - 12.16 Lakh"
        }
      }
    ]
  },
  {
    manufacturer: 'Toyota',
    idPrefix: 'toyota',
    vehicles: [
      {
        id: 'toyota-fortuner',
        videoPoster: ToyotaFortuner,
        videoSrc: "https://www.youtube.com/embed/GxigvJrT-fc",
        thumbnail: "https://www.carlogos.org/car-logos/toyota-logo-2019-640.png",
        title: "Toyota Fortuner",
        link: "https://www.toyotabharat.com/showroom/fortuner/index-fortuner.html",
        description: "The Toyota Fortuner is a robust and highly capable SUV, renowned for its strong build, off-road prowess, and commanding presence.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Fortuner",
          manufacturer: "Toyota",
          year: 2024,
          features: ["2.7L Petrol/2.8L Diesel Engine", "4x4 Capability with Differential Lock", "Premium Leather Seats", "Connected Car Technology", "Power Back Door", "Ventilated Front Seats"],
          price: "₹ 33.43 - 51.44 Lakh"
        }
      },
      {
        id: 'toyota-land-cruiser',
        videoPoster: ToyotaLandCruiser,
        videoSrc: "https://www.youtube.com/embed/6AtPZrlAsu0",
        thumbnail: "https://www.carlogos.org/car-logos/toyota-logo-2019-640.png",
        title: "Toyota Land Cruiser",
        link: "https://www.toyotabharat.com/showroom/lc300/",
        description: "The Toyota Land Cruiser is an iconic off-road luxury SUV, known for its legendary reliability, go-anywhere capability, and supreme comfort.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Land Cruiser",
          manufacturer: "Toyota",
          year: 2024,
          features: ["3.3L Twin-Turbo Diesel Engine", "Multi-Terrain Monitor with Underfloor View", "Adaptive Variable Suspension", "JBL Premium Audio System", "Toyota Safety Sense (ADAS)", "Crawl Control"],
          price: "₹ 2.10 Crore"
        }
      },
      {
        id: 'toyota-innova-hycross',
        videoPoster: ToyotaInnovaHycross,
        videoSrc: "https://www.youtube.com/embed/kdwPgM2h0X0",
        thumbnail: "https://www.carlogos.org/car-logos/toyota-logo-2019-640.png",
        title: "Toyota Innova Hycross",
        link: "https://www.toyotabharat.com/showroom/innova/",
        description: "The Toyota Innova Hycross is a premium MPV offering strong hybrid technology, spacious and comfortable interiors, and a host of advanced features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Innova Hycross",
          manufacturer: "Toyota",
          year: 2024,
          features: ["2.0L Strong Hybrid Petrol Engine", "Self-Charging Strong Hybrid", "Panoramic Sunroof", "ADAS (Toyota Safety Sense)", "Powered Ottoman Seats (2nd Row)", "Ventilated Front Seats"],
          price: "₹ 19.77 - 30.98 Lakh"
        }
      },
      {
        id: 'toyota-urban-cruiser-hyryder', // Added Urban Cruiser Hyryder
        videoPoster: toyotaHyryder,
        videoSrc: "https://www.youtube.com/embed/L1d_fW8H_1o", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/toyota-logo-2019-640.png",
        title: "Toyota Urban Cruiser Hyryder",
        link: "https://www.toyotabharat.com/showroom/urban-cruiser-hyryder/",
        description: "The Toyota Urban Cruiser Hyryder is a stylish mid-size SUV available with strong and mild hybrid options, offering excellent fuel efficiency and a comfortable drive.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Urban Cruiser Hyryder",
          manufacturer: "Toyota",
          year: 2024,
          features: ["1.5L K-Series Mild Hybrid/1.5L Strong Hybrid Engine", "Self-Charging Strong Hybrid", "All-Wheel Drive (Mild Hybrid)", "Panoramic Sunroof", "Ventilated Seats", "9-inch SmartPlay Cast Infotainment"],
          price: "₹ 11.14 - 20.14 Lakh"
        }
      },
      {
        id: 'toyota-camry', // Added Camry
        videoPoster: toyotaCamry,
        videoSrc: "https://www.youtube.com/embed/xL-5j2uVwWw", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/toyota-logo-2019-640.png",
        title: "Toyota Camry",
        link: "https://www.toyotabharat.com/showroom/camry/",
        description: "The Toyota Camry is a premium hybrid sedan known for its luxurious comfort, strong fuel efficiency, and Toyota's renowned reliability.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Camry",
          manufacturer: "Toyota",
          year: 2024,
          features: ["2.5L Dynamic Force Hybrid Engine", "Self-Charging Hybrid Electric Vehicle", "Ventilated Front Seats", "Head-Up Display", "Rear Power Recline Seats", "9-inch Touchscreen Infotainment"],
          price: "₹ 46.17 Lakh"
        }
      }
    ]
  },
  {
    manufacturer: 'Jeep', // New Brand
    idPrefix: 'jeep',
    vehicles: [
      {
        id: 'jeep-compass',
        videoPoster: jeepcompass,
        videoSrc: "https://www.youtube.com/embed/S_8qM9P4E5A", // Example relevant video ID
        thumbnail: "https://www.jeep-india.com/content/dam/cross-regional/apac/jeep/en_crossregional/global/header/logo-jeep.png",
        title: "Jeep Compass",
        link: "https://www.jeep-india.com/suvs/compass.html",
        description: "The Jeep Compass is a capable and stylish SUV that combines legendary Jeep off-road prowess with premium on-road comfort and modern features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Compass",
          manufacturer: "Jeep",
          year: 2024,
          features: ["1.4L MultiAir Petrol/2.0L MultiJet Diesel", "Jeep Active Drive Low 4x4", "Panoramic Sunroof", "10.1-inch Touchscreen Infotainment", "Ventilated Front Seats", "Select-Terrain Traction Management"],
          price: "₹ 20.69 - 32.27 Lakh"
        }
      },
      {
        id: 'jeep-meridian',
        videoPoster: jeepmeridian,
        videoSrc: "https://www.youtube.com/embed/zH8zQ8B4P0w", // Example relevant video ID
        thumbnail: "https://www.jeep-india.com/content/dam/cross-regional/apac/jeep/en_crossregional/global/header/logo-jeep.png",
        title: "Jeep Meridian",
        link: "https://www.jeep-india.com/suvs/meridian.html",
        description: "The Jeep Meridian is a premium 7-seater SUV offering robust performance, sophisticated interiors, and versatile seating for large families, built for adventures.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Meridian",
          manufacturer: "Jeep",
          year: 2024,
          features: ["2.0L MultiJet Diesel Engine", "3-Row Seating", "Independent Suspension", "Ventilated Seats", "Panoramic Sunroof", "Connected Car Technology"],
          price: "₹ 33.60 - 39.50 Lakh"
        }
      },
      {
        id: 'jeep-wrangler', // Added Wrangler
        videoPoster: jeepwrangler,
        videoSrc: "https://www.youtube.com/embed/k9DTfWxGwBg", // Example relevant video ID
        thumbnail: "https://www.jeep-india.com/content/dam/cross-regional/apac/jeep/en_crossregional/global/header/logo-jeep.png",
        title: "Jeep Wrangler",
        link: "https://www.jeep-india.com/suvs/wrangler.html",
        description: "The Jeep Wrangler is the ultimate off-road icon, offering unmatched capability, a rugged design, and open-air freedom for the most adventurous spirits.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Wrangler",
          manufacturer: "Jeep",
          year: 2024,
          features: ["2.0L Turbo Petrol Engine", "Rock-Trac 4x4 System", "Removable Roof & Doors", "Washable Interior with Drain Plugs", "Off-Road Pages (UConnect)", "Heavy-Duty Dana Axles"],
          price: "₹ 67.65 Lakh - 71.65 Lakh"
        }
      }
    ]
  },
  {
    manufacturer: 'Nissan', // New Brand
    idPrefix: 'nissan',
    vehicles: [
      {
        id: 'nissan-magnite',
        videoPoster: nissanmagnite,
        videoSrc: "https://www.youtube.com/embed/g2J03fK-5tI", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/nissan-logo-2020-black-show.png",
        title: "Nissan Magnite",
        link: "https://www.nissan.in/vehicles/new-vehicles/magnite.html",
        description: "The Nissan Magnite is a sub-compact SUV that stands out with its bold styling, feature-rich cabin, and competitive pricing, offering excellent value.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Magnite",
          manufacturer: "Nissan",
          year: 2024,
          features: ["1.0L B4D Petrol/1.0L HRA0 Turbo Petrol", "Around View Monitor", "Wireless CarPlay/Android Auto", "JBL Sound System (Optional)", "Turbo Engine Option with CVT", "LED Bi-Projector Headlamps"],
          price: "₹ 6.00 - 11.02 Lakh"
        }
      },
      {
        id: 'nissan-kicks', // Added Kicks (Note: Discontinued in India, kept for variety)
        videoPoster: nissanKicks,
        videoSrc: "https://www.youtube.com/embed/rK8v0N06a3Q", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/nissan-logo-2020-black-show.png", // Using Magnite logo as general Nissan
        title: "Nissan Kicks",
        link: "https://www.nissan.in/vehicles/new-vehicles/kicks.html", // General Kicks page if available
        description: "The Nissan Kicks was a stylish mid-size SUV known for its comfortable ride, premium interiors, and powerful engine options. (Discontinued in India as of 2023)",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Kicks",
          manufacturer: "Nissan",
          year: 2023, // Last model year sold
          features: ["1.5L H4K Petrol/1.3L Turbo Petrol", "NissanConnect", "Around View Monitor", "Bose Personal Plus Sound System", "Hill Start Assist", "V-Motion Grille"],
          price: "₹ 9.50 - 14.99 Lakh (at discontinuation)"
        }
      },
      {
        id: 'nissan-ariya', // Added Ariya (Global EV, for future readiness)
        videoPoster: nissanariya,
        videoSrc: "https://www.youtube.com/embed/W9l6D0pWq4c", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/nissan-logo-2020-black-show.png", // Using Magnite logo as general Nissan
        title: "Nissan Ariya",
        link: "https://global.nissan-cdn.net/content/dam/Nissan/global/vehicles/Ariya/Ariya.html", // Global Ariya link
        description: "The Nissan Ariya is a visionary electric crossover combining futuristic design, advanced technology, and powerful electric performance for a new era of mobility.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Ariya",
          manufacturer: "Nissan",
          year: 2024,
          features: ["Electric Powertrain", "e-4ORCE All-Wheel Drive", "ProPILOT Assist 2.0", "Haptic Controls", "Zero Emission", "Dual 12.3-inch Displays"],
          price: "Price varies by market (Global Model, not officially launched in India yet)"
        }
      }
    ]
  }
];

const Carcard = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [manufacturer, setManufacturer] = useState(''); // State for manufacturer search input
  const [model, setModel] = useState(''); // State for model search input
  const navigate = useNavigate();

  // Authentication checking and redirection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login'); // Redirect to login if not authenticated
      } else {
        setAuthChecked(true); // Allow UI render if authenticated
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]); // Add navigate to dependency array

  // Initialize AOS (Animate On Scroll) library once on component mount
  useEffect(() => {
    AOS.init({
      duration: 300, // animation duration in ms
      once: false, // repeat animation every time you scroll up/down
    });
  }, []);

  // Handler functions for button clicks
  const handleFeedbackClick = () => {
    console.log('Feedback button clicked!');
    navigate('/feedback'); // Assuming '/feedback' is a valid route
  };

  const handleActionButtonClick = (vehicleId) => {
    console.log(`Action button clicked for vehicle: ${vehicleId}`);
    navigate(`/cardetail/${vehicleId}`); // Assuming '/cardetail/:id' is a valid route
  };

  // Memoize filteredData to prevent unnecessary re-calculations on every render.
  // This will only re-run when 'manufacturer' or 'model' state changes.
  const filteredData = useMemo(() => {
    // Filter by manufacturer first
    const manufacturerFiltered = manufacturer.trim()
      ? vehicleData.filter(group =>
        group.manufacturer.toLowerCase().includes(manufacturer.toLowerCase())
      )
      : vehicleData; // If manufacturer input is empty, consider all manufacturers

    // Then filter vehicles within the manufacturer groups by model
    const finalFilteredData = manufacturerFiltered
      .map(group => {
        const filteredVehicles = group.vehicles.filter(vehicle =>
          vehicle.vehicleInfo.model.toLowerCase().includes(model.toLowerCase()) ||
          vehicle.title.toLowerCase().includes(model.toLowerCase()) ||
          vehicle.description.toLowerCase().includes(model.toLowerCase())
        );
        // Only return manufacturer groups that have matching vehicles
        return filteredVehicles.length > 0 ? { ...group, vehicles: filteredVehicles } : null;
      })
      .filter(Boolean); // Remove any null entries (manufacturer groups with no matching vehicles)

    return finalFilteredData;
  }, [manufacturer, model]); // Dependencies for useMemo

  // Memoize renderVehicleCard function to prevent its re-creation on every render.
  // This helps optimize child component re-renders if VehicleCard were a separate memoized component.
  const renderVehicleCard = useCallback((vehicle) => {
    // Determine if the videoSrc is a YouTube embed URL
    const isYouTubeVideo = vehicle.videoSrc && vehicle.videoSrc.includes("youtube.com/embed/");
    const videoIdMatch = isYouTubeVideo ? vehicle.videoSrc.match(/\/embed\/([a-zA-Z0-9_-]+)/) : null;
    const youtubeVideoId = videoIdMatch ? videoIdMatch[1] : null;

    return (
      <div className="card-container" key={vehicle.id}>
        <div className="video-section">
          <section>
            <video muted playsInline disableRemotePlayback poster={vehicle.videoPoster} className="video-element">
              <source src={vehicle.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </section>
          <div className="video-overlay">
            <img src={vehicle.thumbnail} alt={`${vehicle.title} thumbnail`} className="thumbnail" />
            <div className="title">
              <a href={vehicle.link} onClick={(e) => e.preventDefault()}>{vehicle.title}</a>
              <SlArrowRight />
            </div>
          </div>
        </div>
        <div className="content">
          <p className="description">{vehicle.description}</p>
          {/* <div className="button-row">
            <button className="feedback-btn" onClick={handleFeedbackClick}>
              <VscFeedback />
              Feedback
            </button>
            <div className="main-action-group" onClick={() => handleActionButtonClick(vehicle.id)}>
              <div className="turn-on-button">{vehicle.buttonText}</div>
            </div>
          </div> */}
          <div className="button-row">
            {/* <button className="feedback-btn" onClick={handleFeedbackClick}>
              <VscFeedback />
              Feedback
            </button> */}

            <FavoriteVehicle vehicle={vehicle} />

            <div className="main-action-group" onClick={() => handleActionButtonClick(vehicle.id)}>
              <div className="turn-on-button">{vehicle.buttonText}</div>
            </div>
          </div>

        </div>
      </div>
    );
  }, [handleFeedbackClick, handleActionButtonClick]); // Add handler functions to dependency array

  // Do not render anything until Firebase authentication state has been checked.
  if (!authChecked) return null;

  return (
    <div className="seeoffer-background">
      <div className='cardbox' >
        <div className="manufacturer-filter" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by Manufacturer (e.g., Honda)"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            style={{
              padding: '10px 15px',
              width: '350px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
        </div>
        <div className="model-filter" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by Model (e.g., City, Swift)"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{
              padding: '10px 15px',
              width: '350px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
        </div>
        {filteredData.length > 0 ? (
          filteredData.map((manufacturerGroup) => (
            <React.Fragment key={manufacturerGroup.manufacturer}>
              <div data-aos="fade" className="title1" data-aos-once="true">
                <h1 className="rxk">{manufacturerGroup.manufacturer} Vehicles</h1>
              </div>
              <div data-aos="fade-up" className="card-slider" data-aos-once="true">
                <div className="card-grid-wrapper">
                  {/* Map over filtered vehicles and render using the memoized function */}
                  {manufacturerGroup.vehicles.map(renderVehicleCard)}
                </div>
              </div>
              <div className="Xp8JS"></div> {/* Placeholder div, consider its purpose */}
            </React.Fragment>
          ))) : (
          <div className="no-results">
            🚫 No vehicles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Carcard;
