import React, { useState, useEffect } from 'react';
import './tab.css'; // Make sure this path is correct for your styles
import { SlArrowRight } from "react-icons/sl";
import { VscFeedback } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
//authentication checking
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

//images import 
import suzukiswift from './cardbox/suzukiswift.jpg';
import suzukibaleno from './cardbox/suzukibaleno.jpg';
import suzukidzire from './cardbox/suzukidzire.jpg';
import hyundaicreta from './cardbox/hyndaicreta.jpg';
import hyundaiAmze from './cardbox/hyundaiAmze.jpg';
import hyundaiaura from './cardbox/hyndaiaura.jpg';
import renaultkwid from './cardbox/renaultkwid.jpg'
import renaultkiger from './cardbox/renaultkiger.jpg'
import renaulttriber from './cardbox/renaulttriber.jpg'
import bmwx7 from './cardbox/bmwx7.jpg'
import bmwx5 from './cardbox/bmwx5.jpg'
import bmwx3 from './cardbox/bmwx3.jpg'
import valkswagenPolo from './cardbox/valkswagenPolo.jpg'
import valkswagenVitrus from './cardbox/valkswagenVitrus.jpg'
import VolkswagenTiguan from './cardbox/VolkswagenTiguan.jpg'
import tataAltroz from './cardbox/tataAltroz.jpg'
import tataPunch from './cardbox/tataPunch.jpg'
import tataHarrier from './cardbox/tataHarrier.jpg'
import ToyotaFortuner from './cardbox/ToyotaFortuner.jpg'
import ToyotaInnovaHycross from './cardbox/ToyotaInnovaHycross.jpg'
import ToyotaLandCruiser from './cardbox/ToyotaLandCruiser.jpg'
import mahindraScorpio from './cardbox/mahindraScorpio.jpg'
import mahindraXUV700 from './cardbox/mahindraXUV700.jpg'
import mahindraThar from './cardbox/mahindraThar.jpg'

// Centralized data for your vehicles, grouped by manufacturer
export const vehicleData = [
  {
    manufacturer: 'Suzuki',
    idPrefix: 'suzuki',
    vehicles: [
      {
        id: 'suzuki-swift',
        videoPoster: suzukiswift,
        videoSrc: "https://www.youtube.com/embed/QmZt-SPEqaw", // VALID YouTube embed link
        thumbnail: "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
        title: "Suzuki Swift",
        link: "https://www.globalsuzuki.com/automobile/lineup/swift/",
        description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Swift",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
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
          features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
          price: "₹ 6.66 - 9.88 Lakh"
        }
      },
      {
        id: 'suzuki-dzire',
        videoPoster: suzukidzire,
        videoSrc: "https://www.youtube.com/embed/Hrpwg8T3pwc", // VALID YouTube embed link
        thumbnail: "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
        title: "Suzuki Dzire",
        link: "https://www.globalsuzuki.com/automobile/lineup/dzire/",
        description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Dzire",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
          price: "₹ 6.57 - 9.39 Lakh"
        }
      },
    ]
  },
  {
    manufacturer: 'Hyundai',
    idPrefix: 'hyundai',
    vehicles: [
      {
        id: 'hyundai-creta',
        videoPoster: hyundaicreta,
        videoSrc: "https://www.youtube.com/embed/EDbTecwnlwQ?list=PLu715x0E8GkJim-Nb_XnSfK0OXEWknSt5", // VALID YouTube embed link
        thumbnail: "https://www.hyundai.com/etc/designs/hyundai/in/en/images/common/ico-logo-m.png",
        title: "Hyundai Creta",
        link: "https://www.hyundai.com/in/en/find-a-car/creta/highlights",
        description: "The Hyundai Creta is a best-selling SUV renowned for its bold styling, premium interiors, and powerful engine options. It offers a commanding road presence.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Creta",
          manufacturer: "Hyundai",
          year: 2024,
          features: ["Panoramic Sunroof", "Ventilated Seats", "ADAS", "Bluelink Connectivity"],
          price: "₹ 11.00 - 20.15 Lakh"
        }
      },
      {
        id: 'hyundai-Amaze',
        videoPoster: hyundaiAmze,
        videoSrc: "https://www.youtube.com/embed/7bJF4SQNHfM", // VALID YouTube embed link
        thumbnail: "https://www.hyundai.com/etc/designs/hyundai/in/en/images/common/ico-logo-m.png",
        title: "Hyundai Amaze",
        link: "https://www.hondacarindia.com/honda-amaze",
        description: "The Hyundai Xcent is a compact sedan offering a comfortable ride, efficient engines, and a practical design suitable for daily commutes.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Xcent",
          manufacturer: "Hyundai",
          year: 2020,
          features: ["Touchscreen Infotainment", "Dual Airbags", "Rear Parking Sensors"],
          price: "₹ 6.00 - 8.50 Lakh (Discontinued for private use, available as Aura)"
        }
      },
      {
        id: 'hyundai-aura',
        videoPoster: hyundaiaura,
        videoSrc: "https://www.youtube.com/embed/fPVmpdRXuw8", // VALID YouTube embed link
        thumbnail: "https://www.hyundai.com/etc/designs/hyundai/in/en/images/common/ico-logo-m.png",
        title: "Hyundai Aura",
        link: "https://www.hyundai.com/in/en/find-a-car/aura/highlights",
        description: "The Hyundai Aura is a stylish compact sedan offering premium features, a comfortable cabin, and multiple engine options including CNG.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Aura",
          manufacturer: "Hyundai",
          year: 2024,
          features: ["8-inch Touchscreen", "Wireless Charging", "Cruise Control", "Voice Recognition"],
          price: "₹ 6.49 - 9.05 Lakh"
        }
      }
    ]
  },
  {
    manufacturer: 'Renault',
    idPrefix: 'Renault',
    vehicles: [
      {
        id: 'renault-kwid',
        videoPoster:  renaultkwid,
        videoSrc: "https://www.youtube.com/embed/PsMu5I_FdfE", // VALID YouTube embed link
        thumbnail: "https://assets.renaultgroup.com/uploads/2025/01/nouveau_logo_renault_banner.jpg",
        title: "Renault-Kwid",
        link: "https://www.renault.co.in/cars/renault-kwid.html",
        description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Swift",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
          price: "₹ 6.00 - 9.00 Lakh"
        }
      },
      {
        id: 'renault-kiger',
        videoPoster:  renaultkiger,
        // For Baleno, we will open an external link directly. videoSrc isn't strictly needed for internal rendering but keep for consistency.
        videoSrc: "https://www.youtube.com/embed/8uSBAhQ1sik",
        thumbnail: "https://assets.renaultgroup.com/uploads/2025/01/nouveau_logo_renault_banner.jpg",
        title: "Renault-Kiger",
        // The link will be the external URL for Baleno
        link: "https://www.renault.co.in/cars/renault-kiger.html",
        description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Baleno",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
          price: "₹ 6.66 - 9.88 Lakh"
        }
      },
      {
        id: 'suzuki-triber',
        videoPoster:  renaulttriber,
        videoSrc: "https://www.youtube.com/embed/0aT4tC2OAQ0", // VALID YouTube embed link
        thumbnail: "https://assets.renaultgroup.com/uploads/2025/01/nouveau_logo_renault_banner.jpg",
        title: "Renault-Triber",
        link: "https://www.renault.co.in/cars/renault-triber.html",
        description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Dzire",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
          price: "₹ 6.57 - 9.39 Lakh"
        }
      },
    ]
  },
  {
    manufacturer: 'BMW',
    idPrefix: 'BMW',
    vehicles: [
      {
        id: 'BMW-X7',
        videoPoster: bmwx7,
        videoSrc: "https://www.youtube.com/embed/hxD1d-wR1Qg", // VALID YouTube embed link
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW-X7",
        link: "https://www.bmw.in/en/all-models/x-series/x7/2022/bmw-x7-overview.html",
        description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Swift",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
          price: "₹ 6.00 - 9.00 Lakh"
        }
      },
      {
        id: 'BMW-X5',
        videoPoster: bmwx5,
        // For Baleno, we will open an external link directly. videoSrc isn't strictly needed for internal rendering but keep for consistency.
        videoSrc: "https://www.youtube.com/embed/YA9RF1AsawI",
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW-X5",
        // The link will be the external URL for Baleno
        link: "https://www.bmw.in/en/all-models/x-series/X5/2023/bmw-x5-overview.html",
        description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Baleno",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
          price: "₹ 6.66 - 9.88 Lakh"
        }
      },
      {
        id: 'BMW-X3',
        videoPoster: bmwx3,
        videoSrc: "https://www.youtube.com/embed/6AfoTwOSFxw", // VALID YouTube embed link
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW-X3",
        link: "https://www.bmw.in/en/all-models/x-series/x3/2025/bmw-x3.html",
        description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Dzire",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
          price: "₹ 6.57 - 9.39 Lakh"
        }
      },
    ]
  },
  {
    manufacturer: 'Volkswagen',
    idPrefix: 'Volkswagen',
    vehicles: [
      {
        id: 'Volkswagen-Polo',
        videoPoster: valkswagenPolo,
        videoSrc: "https://www.youtube.com/embed/7S_MIU9_yBw", // VALID YouTube embed link
        thumbnail: "https://cdn.yellowmessenger.com/7ozMGtvMg8vZ1743425593440.png",
        title: "Volkswagen-Polo",
        link: "https://www.volkswagen.co.in/en/models/golf-gti.html",
        description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Swift",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
          price: "₹ 6.00 - 9.00 Lakh"
        }
      },
      {
        id: 'Volkswagen-Vitrus',
        videoPoster: valkswagenVitrus,
        // For Baleno, we will open an external link directly. videoSrc isn't strictly needed for internal rendering but keep for consistency.
        videoSrc: "https://www.youtube.com/embed/mK5yPevgygM",
        thumbnail: "https://cdn.yellowmessenger.com/7ozMGtvMg8vZ1743425593440.png",
        title: "Volkswagen-Vitrus",
        // The link will be the external URL for Baleno
        link: "https://www.volkswagen.co.in/en/models/virtus-sport.html",
        description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Baleno",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
          price: "₹ 6.66 - 9.88 Lakh"
        }
      },
      {
        id: 'Volkswagen-Tiguan',
        videoPoster: VolkswagenTiguan,
        videoSrc: "https://www.youtube.com/embed/_XzqB19vmmo", // VALID YouTube embed link
        thumbnail: "https://cdn.yellowmessenger.com/7ozMGtvMg8vZ1743425593440.png",
        title: "Volkswagen Tiguan",
        link: "https://www.volkswagen.co.in/en/models/tiguan-r-line.html",
        description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Dzire",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
          price: "₹ 6.57 - 9.39 Lakh"
        }
      },
    ]
  },
  {
    manufacturer: 'Tata',
    idPrefix: 'Tata',
    vehicles: [
      {
        id: 'Tata-Altroz',
        videoPoster: tataAltroz,
        videoSrc: "https://www.youtube.com/embed/O8fVsTeEe-c", // VALID YouTube embed link
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata-Altroz",
        link: "https://cars.tatamotors.com/altroz/ice.html",
        description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Swift",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
          price: "₹ 6.00 - 9.00 Lakh"
        }
      },
      {
        id: 'Tata-Punch',
        videoPoster: tataPunch,
        // For Baleno, we will open an external link directly. videoSrc isn't strictly needed for internal rendering but keep for consistency.
        videoSrc: "https://www.youtube.com/embed/smpE8K2ylPw",
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata-Punch",
        // The link will be the external URL for Baleno
        link: "https://cars.tatamotors.com/punch/ice.html",
        description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Baleno",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
          price: "₹ 6.66 - 9.88 Lakh"
        }
      },
      {
        id: 'Tata-Harrier',
        videoPoster: tataHarrier,
        videoSrc: "https://www.youtube.com/embed/FYOzVWrwLoE", // VALID YouTube embed link
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata-Harrier",
        link: "https://cars.tatamotors.com/harrier/ice.html",
        description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Dzire",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
          price: "₹ 6.57 - 9.39 Lakh"
        }
      },
    ]
  },
  {
    manufacturer: 'Toyota',
    idPrefix: 'Totota',
    vehicles: [
      {
        id: 'Toyota Fortuner',
        videoPoster: ToyotaFortuner,
        videoSrc: "https://www.youtube.com/embed/GxigvJrT-fc", // VALID YouTube embed link
        thumbnail: "https://1000logos.net/wp-content/uploads/2021/04/Toyota-logo.png",
        title: "Toyota Fortuner",
        link: "https://www.toyotabharat.com/showroom/fortuner/index-fortuner.html",
        description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Swift",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
          price: "₹ 6.00 - 9.00 Lakh"
        }
      },
      {
        id: 'Toyota Land Cruiser',
        videoPoster: ToyotaLandCruiser,
        // For Baleno, we will open an external link directly. videoSrc isn't strictly needed for internal rendering but keep for consistency.
        videoSrc: "https://www.youtube.com/embed/6AtPZrlAsu0",
        thumbnail: "https://1000logos.net/wp-content/uploads/2021/04/Toyota-logo.png",
        title: "Toyota Land Cruiser",
        link: "https://www.toyotabharat.com/showroom/lc300/",
        description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Baleno",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
          price: "₹ 6.66 - 9.88 Lakh"
        }
      },
      {
        id: 'Toyota Innova Hycross',
        videoPoster: ToyotaInnovaHycross,
        videoSrc: "https://www.youtube.com/embed/kdwPgM2h0X0", // VALID YouTube embed link
        thumbnail: "https://1000logos.net/wp-content/uploads/2021/04/Toyota-logo.png",
        title: "Toyota Innova Hycross",
        link: "https://www.toyotabharat.com/showroom/innova/",
        description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Dzire",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
          price: "₹ 6.57 - 9.39 Lakh"
        }
      },
    ]
  },
  {
    manufacturer: 'Mahindra',
    idPrefix: 'Mahindra',
    vehicles: [
      {
        id: 'Mahindra Scorpio',
        videoPoster: mahindraScorpio,
        videoSrc: "https://www.youtube.com/embed/HvZHXclEj-Q", // VALID YouTube embed link
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra Scorpio",
        link: "https://auto.mahindra.com/suv/scorpio-classic/SCRC.html",
        description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Swift",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
          price: "₹ 6.00 - 9.00 Lakh"
        }
      },
      {
        id: 'Mahindra XUV700',
        videoPoster: mahindraXUV700,
        videoSrc: "https://www.youtube.com/embed/XPXGpK31qRE",
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra XUV700",
        link: "https://auto.mahindra.com/suv/xuv700/X700.html",
        description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Baleno",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
          price: "₹ 6.66 - 9.88 Lakh"
        }
      },
      {
        id: 'Mahindra Thar ROXX',
        videoPoster: mahindraThar,
        videoSrc: "https://www.youtube.com/embed/k9DTfWxGwBg", // VALID YouTube embed link
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra Thar ROXX",
        link: "https://auto.mahindra.com/suv/thar-roxx/TH5D.html",
        description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Dzire",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
          price: "₹ 6.57 - 9.39 Lakh"
        }
      },
    ]
  }
];

const Carcard = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  //checking user is sign in or not
  useEffect(() => {
    // Check if the user is signed in with Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login'); // Redirect to login if not authenticated
      } else {
        setAuthChecked(true); // Allow render if authenticated
      }
    });
    return () => unsubscribe(); // Cleanup
  }, [navigate]);
  if (!authChecked) return null; // Prevent UI render while checking auth

  const handleFeedbackClick = () => {
    console.log('Feedback button clicked!');
    navigate('/feedback');
  };

  const handleActionButtonClick = (vehicleId) => {
    console.log(`Action button clicked for vehicle: ${vehicleId}`);
    navigate(`/cardetail/${vehicleId}`);
  };

  const renderVehicleCard = (vehicle) => (
    <div className="card-container" key={vehicle.id}>
      <div className="video-section">
        <section>
          {/* Note: In Seeoffer, we still use the <video> tag with a poster.
              The actual embed will happen in CardDetail.js */}
          <video
            muted
            playsInline
            disableRemotePlayback
            poster={vehicle.videoPoster}
            className="video-element"
          >
            {/* The source for the video tag here is less critical since it's just a preview/poster section.
                If you have a short video preview, use it here. Otherwise, the poster is enough. */}
            <source src={vehicle.videoSrc} type="video/mp4" /> {/* Still good to have if it's an actual video file */}
            Your browser does not support the video tag.
          </video>
        </section>
        <div className="video-overlay">
          <img
            src={vehicle.thumbnail}
            alt={`${vehicle.title} thumbnail`}
            className="thumbnail"
          />
          <div className="title">
            <a href={vehicle.link} onClick={(e) => e.preventDefault()}>{vehicle.title}</a>
            <SlArrowRight />
          </div>
        </div>
      </div>

      <div className="content">
        <p className="description">{vehicle.description}</p>
        <div className="button-row">
          <button className="feedback-btn" onClick={handleFeedbackClick}>
            <VscFeedback />
            Feedback
          </button>
          <div className="main-action-group" onClick={() => handleActionButtonClick(vehicle.id)}>
            <div className="turn-on-button">{vehicle.buttonText}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="seeoffer-background">
      <div className='cardbox'>
        {vehicleData.map((manufacturerGroup) => (
          <React.Fragment key={manufacturerGroup.manufacturer}>
            <div className='title1'>
              <h1 className='rxk'>{manufacturerGroup.manufacturer} Vehicles</h1>
            </div>
            <div className="card-slider">
              <div className="card-grid-wrapper">
                {manufacturerGroup.vehicles.map(vehicle => renderVehicleCard(vehicle))}
              </div>
            </div>
            <div className="Xp8JS"></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Carcard;

