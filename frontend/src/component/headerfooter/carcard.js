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
// export const vehicleData = [
//   {
//     manufacturer: 'Suzuki',
//     idPrefix: 'suzuki',
//     vehicles: [
//       {
//         id: 'suzuki-swift',
//         videoPoster: suzukiswift,
//         videoSrc: "https://www.youtube.com/embed/QmZt-SPEqaw", // VALID YouTube embed link
//         thumbnail: "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
//         title: "Suzuki Swift",
//         link: "https://www.globalsuzuki.com/automobile/lineup/swift/",
//         description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Swift",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
//           price: "₹ 6.00 - 9.00 Lakh"
//         }
//       },
//       {
//         id: 'suzuki-baleno',
//         videoPoster: suzukibaleno,
//         videoSrc: "https://www.youtube.com/embed/aC-pxNcz8IM",
//         thumbnail: "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
//         title: "Suzuki Baleno",
//         link: "https://www.globalsuzuki.com/automobile/lineup/baleno/",
//         description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Baleno",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
//           price: "₹ 6.66 - 9.88 Lakh"
//         }
//       },
//       {
//         id: 'suzuki-dzire',
//         videoPoster: suzukidzire,
//         videoSrc: "https://www.youtube.com/embed/Hrpwg8T3pwc", // VALID YouTube embed link
//         thumbnail: "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
//         title: "Suzuki Dzire",
//         link: "https://www.globalsuzuki.com/automobile/lineup/dzire/",
//         description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Dzire",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
//           price: "₹ 6.57 - 9.39 Lakh"
//         }
//       },
//     ]
//   },
//   {
//     manufacturer: 'Hyundai',
//     idPrefix: 'hyundai',
//     vehicles: [
//       {
//         id: 'hyundai-creta',
//         videoPoster: hyundaicreta,
//         videoSrc: "https://www.youtube.com/embed/EDbTecwnlwQ?list=PLu715x0E8GkJim-Nb_XnSfK0OXEWknSt5", // VALID YouTube embed link
//         thumbnail: "https://www.hyundai.com/etc/designs/hyundai/in/en/images/common/ico-logo-m.png",
//         title: "Hyundai Creta",
//         link: "https://www.hyundai.com/in/en/find-a-car/creta/highlights",
//         description: "The Hyundai Creta is a best-selling SUV renowned for its bold styling, premium interiors, and powerful engine options. It offers a commanding road presence.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Creta",
//           manufacturer: "Hyundai",
//           year: 2024,
//           features: ["Panoramic Sunroof", "Ventilated Seats", "ADAS", "Bluelink Connectivity"],
//           price: "₹ 11.00 - 20.15 Lakh"
//         }
//       },
//       {
//         id: 'hyundai-Amaze',
//         videoPoster: hyundaiAmze,
//         videoSrc: "https://www.youtube.com/embed/7bJF4SQNHfM", // VALID YouTube embed link
//         thumbnail: "https://www.hyundai.com/etc/designs/hyundai/in/en/images/common/ico-logo-m.png",
//         title: "Hyundai Amaze",
//         link: "https://www.hondacarindia.com/honda-amaze",
//         description: "The Hyundai Xcent is a compact sedan offering a comfortable ride, efficient engines, and a practical design suitable for daily commutes.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Xcent",
//           manufacturer: "Hyundai",
//           year: 2020,
//           features: ["Touchscreen Infotainment", "Dual Airbags", "Rear Parking Sensors"],
//           price: "₹ 6.00 - 8.50 Lakh (Discontinued for private use, available as Aura)"
//         }
//       },
//       {
//         id: 'hyundai-aura',
//         videoPoster: hyundaiaura,
//         videoSrc: "https://www.youtube.com/embed/fPVmpdRXuw8", // VALID YouTube embed link
//         thumbnail: "https://www.hyundai.com/etc/designs/hyundai/in/en/images/common/ico-logo-m.png",
//         title: "Hyundai Aura",
//         link: "https://www.hyundai.com/in/en/find-a-car/aura/highlights",
//         description: "The Hyundai Aura is a stylish compact sedan offering premium features, a comfortable cabin, and multiple engine options including CNG.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Aura",
//           manufacturer: "Hyundai",
//           year: 2024,
//           features: ["8-inch Touchscreen", "Wireless Charging", "Cruise Control", "Voice Recognition"],
//           price: "₹ 6.49 - 9.05 Lakh"
//         }
//       }
//     ]
//   },
//   {
//     manufacturer: 'Renault',
//     idPrefix: 'Renault',
//     vehicles: [
//       {
//         id: 'renault-kwid',
//         videoPoster:  renaultkwid,
//         videoSrc: "https://www.youtube.com/embed/PsMu5I_FdfE", // VALID YouTube embed link
//         thumbnail: "https://assets.renaultgroup.com/uploads/2025/01/nouveau_logo_renault_banner.jpg",
//         title: "Renault-Kwid",
//         link: "https://www.renault.co.in/cars/renault-kwid.html",
//         description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Swift",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
//           price: "₹ 6.00 - 9.00 Lakh"
//         }
//       },
//       {
//         id: 'renault-kiger',
//         videoPoster:  renaultkiger,
//         // For Baleno, we will open an external link directly. videoSrc isn't strictly needed for internal rendering but keep for consistency.
//         videoSrc: "https://www.youtube.com/embed/8uSBAhQ1sik",
//         thumbnail: "https://assets.renaultgroup.com/uploads/2025/01/nouveau_logo_renault_banner.jpg",
//         title: "Renault-Kiger",
//         // The link will be the external URL for Baleno
//         link: "https://www.renault.co.in/cars/renault-kiger.html",
//         description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Baleno",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
//           price: "₹ 6.66 - 9.88 Lakh"
//         }
//       },
//       {
//         id: 'suzuki-triber',
//         videoPoster:  renaulttriber,
//         videoSrc: "https://www.youtube.com/embed/0aT4tC2OAQ0", // VALID YouTube embed link
//         thumbnail: "https://assets.renaultgroup.com/uploads/2025/01/nouveau_logo_renault_banner.jpg",
//         title: "Renault-Triber",
//         link: "https://www.renault.co.in/cars/renault-triber.html",
//         description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Dzire",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
//           price: "₹ 6.57 - 9.39 Lakh"
//         }
//       },
//     ]
//   },
//   {
//     manufacturer: 'BMW',
//     idPrefix: 'BMW',
//     vehicles: [
//       {
//         id: 'BMW-X7',
//         videoPoster: bmwx7,
//         videoSrc: "https://www.youtube.com/embed/hxD1d-wR1Qg", // VALID YouTube embed link
//         thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
//         title: "BMW-X7",
//         link: "https://www.bmw.in/en/all-models/x-series/x7/2022/bmw-x7-overview.html",
//         description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Swift",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
//           price: "₹ 6.00 - 9.00 Lakh"
//         }
//       },
//       {
//         id: 'BMW-X5',
//         videoPoster: bmwx5,
//         // For Baleno, we will open an external link directly. videoSrc isn't strictly needed for internal rendering but keep for consistency.
//         videoSrc: "https://www.youtube.com/embed/YA9RF1AsawI",
//         thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
//         title: "BMW-X5",
//         // The link will be the external URL for Baleno
//         link: "https://www.bmw.in/en/all-models/x-series/X5/2023/bmw-x5-overview.html",
//         description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Baleno",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
//           price: "₹ 6.66 - 9.88 Lakh"
//         }
//       },
//       {
//         id: 'BMW-X3',
//         videoPoster: bmwx3,
//         videoSrc: "https://www.youtube.com/embed/6AfoTwOSFxw", // VALID YouTube embed link
//         thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
//         title: "BMW-X3",
//         link: "https://www.bmw.in/en/all-models/x-series/x3/2025/bmw-x3.html",
//         description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Dzire",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
//           price: "₹ 6.57 - 9.39 Lakh"
//         }
//       },
//     ]
//   },
//   {
//     manufacturer: 'Volkswagen',
//     idPrefix: 'Volkswagen',
//     vehicles: [
//       {
//         id: 'Volkswagen-Polo',
//         videoPoster: valkswagenPolo,
//         videoSrc: "https://www.youtube.com/embed/7S_MIU9_yBw", // VALID YouTube embed link
//         thumbnail: "https://cdn.yellowmessenger.com/7ozMGtvMg8vZ1743425593440.png",
//         title: "Volkswagen-Polo",
//         link: "https://www.volkswagen.co.in/en/models/golf-gti.html",
//         description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Swift",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
//           price: "₹ 6.00 - 9.00 Lakh"
//         }
//       },
//       {
//         id: 'Volkswagen-Vitrus',
//         videoPoster: valkswagenVitrus,
//         // For Baleno, we will open an external link directly. videoSrc isn't strictly needed for internal rendering but keep for consistency.
//         videoSrc: "https://www.youtube.com/embed/mK5yPevgygM",
//         thumbnail: "https://cdn.yellowmessenger.com/7ozMGtvMg8vZ1743425593440.png",
//         title: "Volkswagen-Vitrus",
//         // The link will be the external URL for Baleno
//         link: "https://www.volkswagen.co.in/en/models/virtus-sport.html",
//         description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Baleno",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
//           price: "₹ 6.66 - 9.88 Lakh"
//         }
//       },
//       {
//         id: 'Volkswagen-Tiguan',
//         videoPoster: VolkswagenTiguan,
//         videoSrc: "https://www.youtube.com/embed/_XzqB19vmmo", // VALID YouTube embed link
//         thumbnail: "https://cdn.yellowmessenger.com/7ozMGtvMg8vZ1743425593440.png",
//         title: "Volkswagen Tiguan",
//         link: "https://www.volkswagen.co.in/en/models/tiguan-r-line.html",
//         description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Dzire",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
//           price: "₹ 6.57 - 9.39 Lakh"
//         }
//       },
//     ]
//   },
//   {
//     manufacturer: 'Tata',
//     idPrefix: 'Tata',
//     vehicles: [
//       {
//         id: 'Tata-Altroz',
//         videoPoster: tataAltroz,
//         videoSrc: "https://www.youtube.com/embed/O8fVsTeEe-c", // VALID YouTube embed link
//         thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
//         title: "Tata-Altroz",
//         link: "https://cars.tatamotors.com/altroz/ice.html",
//         description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Swift",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
//           price: "₹ 6.00 - 9.00 Lakh"
//         }
//       },
//       {
//         id: 'Tata-Punch',
//         videoPoster: tataPunch,
//         // For Baleno, we will open an external link directly. videoSrc isn't strictly needed for internal rendering but keep for consistency.
//         videoSrc: "https://www.youtube.com/embed/smpE8K2ylPw",
//         thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
//         title: "Tata-Punch",
//         // The link will be the external URL for Baleno
//         link: "https://cars.tatamotors.com/punch/ice.html",
//         description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Baleno",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
//           price: "₹ 6.66 - 9.88 Lakh"
//         }
//       },
//       {
//         id: 'Tata-Harrier',
//         videoPoster: tataHarrier,
//         videoSrc: "https://www.youtube.com/embed/FYOzVWrwLoE", // VALID YouTube embed link
//         thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
//         title: "Tata-Harrier",
//         link: "https://cars.tatamotors.com/harrier/ice.html",
//         description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Dzire",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
//           price: "₹ 6.57 - 9.39 Lakh"
//         }
//       },
//     ]
//   },
//   {
//     manufacturer: 'Toyota',
//     idPrefix: 'Totota',
//     vehicles: [
//       {
//         id: 'Toyota Fortuner',
//         videoPoster: ToyotaFortuner,
//         videoSrc: "https://www.youtube.com/embed/GxigvJrT-fc", // VALID YouTube embed link
//         thumbnail: "https://1000logos.net/wp-content/uploads/2021/04/Toyota-logo.png",
//         title: "Toyota Fortuner",
//         link: "https://www.toyotabharat.com/showroom/fortuner/index-fortuner.html",
//         description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Swift",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
//           price: "₹ 6.00 - 9.00 Lakh"
//         }
//       },
//       {
//         id: 'Toyota Land Cruiser',
//         videoPoster: ToyotaLandCruiser,
//         // For Baleno, we will open an external link directly. videoSrc isn't strictly needed for internal rendering but keep for consistency.
//         videoSrc: "https://www.youtube.com/embed/6AtPZrlAsu0",
//         thumbnail: "https://1000logos.net/wp-content/uploads/2021/04/Toyota-logo.png",
//         title: "Toyota Land Cruiser",
//         link: "https://www.toyotabharat.com/showroom/lc300/",
//         description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Baleno",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
//           price: "₹ 6.66 - 9.88 Lakh"
//         }
//       },
//       {
//         id: 'Toyota Innova Hycross',
//         videoPoster: ToyotaInnovaHycross,
//         videoSrc: "https://www.youtube.com/embed/kdwPgM2h0X0", // VALID YouTube embed link
//         thumbnail: "https://1000logos.net/wp-content/uploads/2021/04/Toyota-logo.png",
//         title: "Toyota Innova Hycross",
//         link: "https://www.toyotabharat.com/showroom/innova/",
//         description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Dzire",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
//           price: "₹ 6.57 - 9.39 Lakh"
//         }
//       },
//     ]
//   },
//   {
//     manufacturer: 'Mahindra',
//     idPrefix: 'Mahindra',
//     vehicles: [
//       {
//         id: 'Mahindra Scorpio',
//         videoPoster: mahindraScorpio,
//         videoSrc: "https://www.youtube.com/embed/HvZHXclEj-Q", // VALID YouTube embed link
//         thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
//         title: "Mahindra Scorpio",
//         link: "https://auto.mahindra.com/suv/scorpio-classic/SCRC.html",
//         description: "The Maruti Suzuki Swift is a popular hatchback known for its peppy engine, agile handling, and stylish design. It's a great choice for city driving.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Swift",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["K-Series Engine", "Heartect Platform", "Dual Airbags", "ABS with EBD"],
//           price: "₹ 6.00 - 9.00 Lakh"
//         }
//       },
//       {
//         id: 'Mahindra XUV700',
//         videoPoster: mahindraXUV700,
//         videoSrc: "https://www.youtube.com/embed/XPXGpK31qRE",
//         thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
//         title: "Mahindra XUV700",
//         link: "https://auto.mahindra.com/suv/xuv700/X700.html",
//         description: "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Baleno",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["SmartPlay Pro+", "6 Airbags", "Head-Up Display", "360-degree Camera"],
//           price: "₹ 6.66 - 9.88 Lakh"
//         }
//       },
//       {
//         id: 'Mahindra Thar ROXX',
//         videoPoster: mahindraThar,
//         videoSrc: "https://www.youtube.com/embed/k9DTfWxGwBg", // VALID YouTube embed link
//         thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
//         title: "Mahindra Thar ROXX",
//         link: "https://auto.mahindra.com/suv/thar-roxx/TH5D.html",
//         description: "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Dzire",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["Auto Gear Shift (AGS)", "Cruise Control", "Rear AC Vents", "LED Projector Headlamps"],
//           price: "₹ 6.57 - 9.39 Lakh"
//         }
//       },
//     ]
//   }
// ];


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
        id: 'hyundai-aura', // Corrected ID from hyundai-Amaze
        videoPoster: hyundaiaura, // Assumed hyundaiaura is the correct poster for Aura
        videoSrc: "https://www.youtube.com/embed/fPVmpdRXuw8", // Used the correct videoSrc for Aura
        thumbnail: "https://www.hyundai.com/etc/designs/hyundai/in/en/images/common/ico-logo-m.png",
        title: "Hyundai Aura", // Corrected title
        link: "https://www.hyundai.com/in/en/find-a-car/aura/highlights", // Corrected link
        description: "The Hyundai Aura is a stylish compact sedan offering premium features, a comfortable cabin, and multiple engine options including CNG.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Aura", // Corrected model
          manufacturer: "Hyundai", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["8-inch Touchscreen", "Wireless Charging", "Cruise Control", "Voice Recognition"], // Updated features
          price: "₹ 6.49 - 9.05 Lakh" // Updated price range
        }
      },
      {
        id: 'hyundai-i20', // Added i20 as a common Hyundai model, removed duplicate Aura/Xcent
        videoPoster: hyundaiAmze, // Placeholder, replace with actual image import
        videoSrc: "https://www.youtube.com/embed/7bJF4SQNHfM", // Re-purposed an unused videoSrc for this new entry
        thumbnail: "https://www.hyundai.com/etc/designs/hyundai/in/en/images/common/ico-logo-m.png",
        title: "Hyundai i20",
        link: "https://www.hyundai.com/in/en/find-a-car/i20/highlights",
        description: "The Hyundai i20 is a premium hatchback known for its fluidic design, comfortable interior, and advanced features, making it a popular choice.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "i20",
          manufacturer: "Hyundai",
          year: 2024,
          features: ["Bose Premium Sound System", "Sunroof", "6 Airbags", "Wireless Phone Charger"],
          price: "₹ 7.00 - 11.20 Lakh"
        }
      }
    ]
  },
  {
    manufacturer: 'Renault',
    idPrefix: 'renault', // Corrected to lowercase for consistency
    vehicles: [
      {
        id: 'renault-kwid',
        videoPoster: renaultkwid,
        videoSrc: "https://www.youtube.com/embed/PsMu5I_FdfE", // VALID YouTube embed link
        thumbnail: "https://assets.renaultgroup.com/uploads/2025/01/nouveau_logo_renault_banner.jpg",
        title: "Renault Kwid", // Corrected title formatting
        link: "https://www.renault.co.in/cars/renault-kwid.html",
        description: "The Renault Kwid is a compact hatchback known for its SUV-inspired styling, spacious interiors, and affordability, making it ideal for urban commutes.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Kwid", // Corrected model
          manufacturer: "Renault", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["SUV-inspired Design", "8-inch Touchscreen", "Reverse Parking Camera", "Dual Airbags"], // Updated features
          price: "₹ 4.70 - 6.45 Lakh" // Updated price range
        }
      },
      {
        id: 'renault-kiger',
        videoPoster: renaultkiger,
        videoSrc: "https://www.youtube.com/embed/8uSBAhQ1sik",
        thumbnail: "https://assets.renaultgroup.com/uploads/2025/01/nouveau_logo_renault_banner.jpg",
        title: "Renault Kiger", // Corrected title formatting
        link: "https://www.renault.co.in/cars/renault-kiger.html",
        description: "The Renault Kiger is a compact SUV offering a sporty design, smart interiors, and turbocharged engine options, providing a dynamic driving experience.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Kiger", // Corrected model
          manufacturer: "Renault", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["Multi-Sense Drive Modes", "Wireless Charger", "PM2.5 Air Filter", "Four Airbags"], // Updated features
          price: "₹ 6.00 - 11.23 Lakh" // Updated price range
        }
      },
      {
        id: 'renault-triber', // Corrected ID from suzuki-triber
        videoPoster: renaulttriber,
        videoSrc: "https://www.youtube.com/embed/0aT4tC2OAQ0", // VALID YouTube embed link
        thumbnail: "https://assets.renaultgroup.com/uploads/2025/01/nouveau_logo_renault_banner.jpg",
        title: "Renault Triber", // Corrected title formatting
        link: "https://www.renault.co.in/cars/renault-triber.html",
        description: "The Renault Triber is a versatile 7-seater MUV known for its modular seating, spacious cabin, and practical features, making it ideal for large families.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Triber", // Corrected model
          manufacturer: "Renault", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["EasyFix Seats", "LED Instrument Cluster", "Push-Start/Stop Button", "Four Airbags"], // Updated features
          price: "₹ 6.00 - 8.97 Lakh" // Updated price range
        }
      },
    ]
  },
  {
    manufacturer: 'BMW',
    idPrefix: 'bmw', // Corrected to lowercase for consistency
    vehicles: [
      {
        id: 'bmw-x7', // Corrected ID from BMW-X7
        videoPoster: bmwx7,
        videoSrc: "https://www.youtube.com/embed/hxD1d-wR1Qg", // VALID YouTube embed link
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW X7", // Corrected title formatting
        link: "https://www.bmw.in/en/all-models/x-series/x7/2022/bmw-x7-overview.html",
        description: "The BMW X7 is a luxurious full-size SUV offering powerful performance, advanced technology, and a sophisticated interior with ample space.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "X7", // Corrected model
          manufacturer: "BMW", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["Panoramic Sky Lounge LED Roof", "Live Cockpit Professional", "Harman Kardon Surround Sound", "Adaptive 2-axle Air Suspension"], // Updated features
          price: "₹ 1.30 - 1.40 Crore" // Updated price range
        }
      },
      {
        id: 'bmw-x5', // Corrected ID from BMW-X5
        videoPoster: bmwx5,
        videoSrc: "https://www.youtube.com/embed/YA9RF1AsawI",
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW X5", // Corrected title formatting
        link: "https://www.bmw.in/en/all-models/x-series/X5/2023/bmw-x5-overview.html",
        description: "The BMW X5 is a premium mid-size SUV known for its dynamic driving capabilities, refined interior, and cutting-edge infotainment system.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "X5", // Corrected model
          manufacturer: "BMW", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["BMW Laserlight", "Gesture Control", "Head-Up Display", "Adaptive M Suspension"], // Updated features
          price: "₹ 98.50 Lakh - 1.15 Crore" // Updated price range
        }
      },
      {
        id: 'bmw-x3', // Corrected ID from BMW-X3
        videoPoster: bmwx3,
        videoSrc: "https://www.youtube.com/embed/6AfoTwOSFxw", // VALID YouTube embed link
        thumbnail: "https://www.bmw.in/content/dam/bmw/common/images/logo-icons/BMW/BMW_White_Logo.svg.asset.1670245093434.svg",
        title: "BMW X3", // Corrected title formatting
        link: "https://www.bmw.in/en/all-models/x-series/x3/2025/bmw-x3.html",
        description: "The BMW X3 is a compact luxury SUV offering a blend of sportiness and comfort, with powerful engines and a well-appointed cabin.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "X3", // Corrected model
          manufacturer: "BMW", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["Sport Seats", "Panoramic Glass Roof", "Parking Assistant Plus", "Ambient Lighting"], // Updated features
          price: "₹ 68.50 Lakh - 87.70 Lakh" // Updated price range
        }
      },
    ]
  },
  {
    manufacturer: 'Volkswagen',
    idPrefix: 'volkswagen', // Corrected to lowercase for consistency
    vehicles: [
      {
        id: 'volkswagen-virtus', // Corrected ID from Volkswagen-Polo and used Virtus as a more current model in India
        videoPoster: valkswagenVitrus, // Assumed this poster is for Virtus
        videoSrc: "https://www.youtube.com/embed/mK5yPevgygM", // Used the appropriate videoSrc
        thumbnail: "https://cdn.yellowmessenger.com/7ozMGtvMg8vZ1743425593440.png",
        title: "Volkswagen Virtus", // Corrected title
        link: "https://www.volkswagen.co.in/en/models/virtus-sport.html", // Corrected link
        description: "The Volkswagen Virtus is a stylish and feature-packed sedan offering a strong performance, robust build quality, and a comfortable ride.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Virtus", // Corrected model
          manufacturer: "Volkswagen", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["10-inch Touchscreen Infotainment", "Ventilated Seats", "Electric Sunroof", "6 Airbags"], // Updated features
          price: "₹ 11.56 - 19.41 Lakh" // Updated price range
        }
      },
      {
    id: 'volkswagen-polo',
    videoPoster: valkswagenPolo, // Assumed to be an imported asset
    videoSrc: "https://www.youtube.com/embed/7S_MIU9_yBw",
    thumbnail: "https://cdn.yellowmessenger.com/7ozMGtvMg8vZ1743425593440.png", // Volkswagen logo
    title: "Volkswagen Polo",
    link: "https://www.volkswagen.co.in/", // General VW India link, as Polo is discontinued
    description: "The Volkswagen Polo was a highly popular and iconic premium hatchback in India, known for its solid build quality, precise handling, and fun-to-drive nature. It was a benchmark in its segment for many years. (Discontinued in India as of 2022)",
    buttonText: "View Details",
    vehicleInfo: {
        model: "Polo",
        manufacturer: "Volkswagen",
        year: 2022, // Last year of production/sale in India
        features: ["German Build Quality", "Multi-function Steering Wheel", "Dual Airbags", "ABS", "Touchscreen Infotainment (later models)"],
        price: "₹ 6.45 - 10.25 Lakh (at time of discontinuation)" // Price at discontinuation
    }
 },
      {
        id: 'volkswagen-tiguan', // Corrected ID from Volkswagen-Tiguan
        videoPoster: VolkswagenTiguan,
        videoSrc: "https://www.youtube.com/embed/_XzqB19vmmo", // VALID YouTube embed link
        thumbnail: "https://cdn.yellowmessenger.com/7ozMGtvMg8vZ1743425593440.png",
        title: "Volkswagen Tiguan", // Corrected title formatting
        link: "https://www.volkswagen.co.in/en/models/tiguan-r-line.html",
        description: "The Volkswagen Tiguan is a premium SUV offering a sophisticated design, powerful engine, and advanced features for a comfortable and safe drive.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Tiguan", // Corrected model
          manufacturer: "Volkswagen", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["LED Matrix Headlamps", "Panoramic Sunroof", "3-zone Climate Control", "8 Airbags"], // Updated features
          price: "₹ 35.17 Lakh" // Updated price (single variant likely)
        }
      },
    ]
  },
  {
    manufacturer: 'Tata',
    idPrefix: 'tata', // Corrected to lowercase for consistency
    vehicles: [
      {
        id: 'tata-altroz', // Corrected ID from Tata-Altroz
        videoPoster: tataAltroz,
        videoSrc: "https://www.youtube.com/embed/O8fVsTeEe-c", // VALID YouTube embed link
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Altroz", // Corrected title formatting
        link: "https://cars.tatamotors.com/altroz/ice.html",
        description: "The Tata Altroz is a premium hatchback known for its 5-star GNCAP safety rating, striking design, and comfortable cabin, offering a superior driving experience.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Altroz", // Corrected model
          manufacturer: "Tata", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["90-degree Opening Doors", "iRA Connected Car Technology", "Voice Assist Sunroof", "Multi-Drive Modes"], // Updated features
          price: "₹ 6.65 - 10.80 Lakh" // Updated price range
        }
      },
      {
        id: 'tata-punch', // Corrected ID from Tata-Punch
        videoPoster: tataPunch,
        videoSrc: "https://www.youtube.com/embed/smpE8K2ylPw",
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Punch", // Corrected title formatting
        link: "https://cars.tatamotors.com/punch/ice.html",
        description: "The Tata Punch is a micro-SUV offering a robust stance, high ground clearance, and a 5-star GNCAP safety rating, making it a powerful and safe urban companion.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Punch", // Corrected model
          manufacturer: "Tata", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["Traction Pro Mode", "Automatic Headlamps", "Rain Sensing Wipers", "7-inch Touchscreen"], // Updated features
          price: "₹ 6.13 - 10.20 Lakh" // Updated price range
        }
      },
      {
        id: 'tata-harrier', // Corrected ID from Tata-Harrier
        videoPoster: tataHarrier,
        videoSrc: "https://www.youtube.com/embed/FYOzVWrwLoE", // VALID YouTube embed link
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Harrier", // Corrected title formatting
        link: "https://cars.tatamotors.com/harrier/ice.html",
        description: "The Tata Harrier is a mid-size SUV known for its impactful design, robust performance, and advanced features, offering a commanding road presence.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Harrier", // Corrected model
          manufacturer: "Tata", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["Panoramic Sunroof", "ADAS Features", "JBL Audio System", "Multi-Terrain Modes"], // Updated features
          price: "₹ 15.49 - 26.44 Lakh" // Updated price range
        }
      },
    ]
  },
  {
    manufacturer: 'Toyota',
    idPrefix: 'toyota', // Corrected to lowercase for consistency
    vehicles: [
      {
        id: 'toyota-fortuner', // Corrected ID from Toyota Fortuner
        videoPoster: ToyotaFortuner,
        videoSrc: "https://www.youtube.com/embed/GxigvJrT-fc", // VALID YouTube embed link
        thumbnail: "https://1000logos.net/wp-content/uploads/2021/04/Toyota-logo.png",
        title: "Toyota Fortuner", // Corrected title formatting
        link: "https://www.toyotabharat.com/showroom/fortuner/index-fortuner.html",
        description: "The Toyota Fortuner is a robust and highly capable SUV, renowned for its strong build, off-road prowess, and commanding presence.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Fortuner", // Corrected model
          manufacturer: "Toyota", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["4x4 Capability", "Premium Leather Seats", "Connected Car Technology", "Power Back Door"], // Updated features
          price: "₹ 33.43 - 51.44 Lakh" // Updated price range
        }
      },
      {
        id: 'toyota-land-cruiser', // Corrected ID from Toyota Land Cruiser
        videoPoster: ToyotaLandCruiser,
        videoSrc: "https://www.youtube.com/embed/6AtPZrlAsu0",
        thumbnail: "https://1000logos.net/wp-content/uploads/2021/04/Toyota-logo.png",
        title: "Toyota Land Cruiser", // Corrected title formatting
        link: "https://www.toyotabharat.com/showroom/lc300/",
        description: "The Toyota Land Cruiser is an iconic off-road luxury SUV, known for its legendary reliability, go-anywhere capability, and supreme comfort.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Land Cruiser", // Corrected model
          manufacturer: "Toyota", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["Multi-Terrain Monitor", "Adaptive Variable Suspension", "JBL Premium Audio", "Toyota Safety Sense"], // Updated features
          price: "₹ 2.10 Crore" // Updated price
        }
      },
      {
        id: 'toyota-innova-hycross', // Corrected ID from Toyota Innova Hycross
        videoPoster: ToyotaInnovaHycross,
        videoSrc: "https://www.youtube.com/embed/kdwPgM2h0X0", // VALID YouTube embed link
        thumbnail: "https://1000logos.net/wp-content/uploads/2021/04/Toyota-logo.png",
        title: "Toyota Innova Hycross", // Corrected title formatting
        link: "https://www.toyotabharat.com/showroom/innova/",
        description: "The Toyota Innova Hycross is a premium MPV offering strong hybrid technology, spacious and comfortable interiors, and a host of advanced features.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Innova Hycross", // Corrected model
          manufacturer: "Toyota", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["Self-Charging Strong Hybrid", "Panoramic Sunroof", "ADAS (Toyota Safety Sense)", "Powered Ottoman Seats"], // Updated features
          price: "₹ 19.77 - 30.98 Lakh" // Updated price range
        }
      },
    ]
  },
  {
    manufacturer: 'Mahindra',
    idPrefix: 'mahindra', // Corrected to lowercase for consistency
    vehicles: [
      {
        id: 'mahindra-scorpio-n', // Changed to Scorpio-N as it's the more current offering
        videoPoster: mahindraScorpio, // Placeholder, replace with actual image import
        videoSrc: "https://www.youtube.com/embed/HvZHXclEj-Q", // VALID YouTube embed link
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra Scorpio-N", // Corrected title
        link: "https://auto.mahindra.com/suv/scorpio-n/scorpio-n.html",
        description: "The Mahindra Scorpio-N is a powerful and rugged SUV known for its bold design, commanding road presence, and strong performance capabilities.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Scorpio", // Corrected model
          manufacturer: "Mahindra", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["AdrenoX Connect", "4XPLOR Terrain Management", "Electric Sunroof", "6 Airbags"], // Updated features
          price: "₹ 13.85 - 24.54 Lakh" // Updated price range
        }
      },
      {
        id: 'mahindra-xuv700', // Corrected ID from Mahindra XUV700
        videoPoster: mahindraXUV700,
        videoSrc: "https://www.youtube.com/embed/XPXGpK31qRE",
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra XUV700", // Corrected title formatting
        link: "https://auto.mahindra.com/suv/xuv700/X700.html",
        description: "The Mahindra XUV700 is a feature-rich SUV offering segment-leading technology, powerful engine options, and a high safety rating, providing a premium experience.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "XUV700", // Corrected model
          manufacturer: "Mahindra", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["ADAS (Advanced Driver-Assistance Systems)", "Sony 3D Audio", "Panoramic Sunroof", "AdrenoX"], // Updated features
          price: "₹ 13.99 - 26.99 Lakh" // Updated price range
        }
      },
      {
        id: 'mahindra-thar', // Corrected ID from Mahindra Thar ROXX to just Thar, as ROXX is a variant
        videoPoster: mahindraThar,
        videoSrc: "https://www.youtube.com/embed/k9DTfWxGwBg", // VALID YouTube embed link
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra Thar", // Corrected title formatting
        link: "https://auto.mahindra.com/suv/thar/THAR.html", // Updated link to general Thar page
        description: "The Mahindra Thar is an iconic off-road SUV, known for its rugged capabilities, distinctive design, and ability to conquer challenging terrains.", // Corrected description
        buttonText: "View Details",
        vehicleInfo: {
          model: "Thar", // Corrected model
          manufacturer: "Mahindra", // Corrected manufacturer
          year: 2024, // Updated year
          features: ["4x4 Drivetrain", "Convertible Top Option", "Washable Interiors", "Dual Airbags"], // Updated features
          price: "₹ 11.35 - 17.60 Lakh" // Updated price range
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

