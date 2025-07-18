// import React, { useState, useEffect } from 'react';
// import './tab.css'; // Make sure this path is correct for your styles
// import { SlArrowRight } from "react-icons/sl";
// import { VscFeedback } from "react-icons/vsc";
// import { useNavigate } from 'react-router-dom';
// //authentication checking
// import { auth } from '../../firebase';
// import { onAuthStateChanged } from 'firebase/auth';

// // Bike images import
// import royalEnfieldClassic350 from './cardbox/royalEnfieldClassic350.jpg';
// import royalEnfieldMeteor350 from './cardbox/royalEnfieldMeteor350.jpg';
// import royalEnfieldHimalayan from './cardbox/royalEnfieldHimalayan.jpg';
// import bajajPulsarNS200 from './cardbox/bajajPulsarNS200.jpg';
// import bajajDominar400 from './cardbox/bajajDominar400.jpg';
// import bajajPlatina from './cardbox/bajajPlatina.jpg';
// import tvsApacheRTR160 from './cardbox/tvsApacheRTR160.jpg';
// import tvsRaider125 from './cardbox/tvsRaider125.jpg';
// import tvsNtorq125 from './cardbox/tvsNtorq125.jpg';
// import heroSplendorPlus from './cardbox/heroSplendorPlus.jpg';
// import heroXpulse200 from './cardbox/heroXpulse200.jpg';
// import heroPassionPro from './cardbox/heroPassionPro.jpg';
// import hondaCB350RS from './cardbox/hondaCB350RS.jpg';
// import hondaActiva6G from './cardbox/hondaActiva6G.jpg';
// import hondaShine from './cardbox/hondaShine.jpg';
// import suzukiGixxerSF250 from './cardbox/suzukiGixxerSF250.jpg';
// import suzukiBurgmanStreet from './cardbox/suzukiBurgmanStreet.jpg';
// import suzukiAccess125 from './cardbox/suzukiAccess125.jpg';
// import yamahaFZSV3 from './cardbox/yamahaFZSV3.jpg';
// import yamahaR15V4 from './cardbox/yamahaR15V4.jpg';
// import yamahaMT15 from './cardbox/yamahaMT15.jpg';

// //scroll up animation 
// import AOS from 'aos';
// import 'aos/dist/aos.css';


// // Centralized data for your bikes, grouped by manufacturer
// export const vehicleData = [
//   {
//     manufacturer: 'Royal Enfield',
//     idPrefix: 'royalEnfield',
//     vehicles: [
//       {
//         id: 'royal-enfield-classic-350',
//         videoPoster: royalEnfieldClassic350,
//         videoSrc: "https://www.youtube.com/embed/6AqNLRxiWHc", // Placeholder YouTube embed link
//         thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTstpZVH2jslqgakHlsrboghb8ubPc_uQhfHawIF_U&usqp=CAE&s",
//         title: "Royal Enfield Classic 350",
//         link: "https://www.royalenfield.com/in/en/motorcycles/classic-350/",
//         description: "The Royal Enfield Classic 350 is an iconic motorcycle known for its vintage appeal, thumping exhaust note, and comfortable ride, a true cruiser.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Classic 350",
//           manufacturer: "Royal Enfield",
//           year: 2024,
//           features: ["J-Series Engine", "Dual Channel ABS", "Tripper Navigation", "Halogen Headlamp"],
//           price: "₹ 1.93 - 2.25 Lakh"
//         }
//       },
//       {
//         id: "royal-enfield-hunter-350",
//         videoPoster: "https://cdn.bikedekho.com/upload/standoutfeatures/65e6ec8173c8f.jpg",
//         videoSrc: "https://www.youtube.com/embed/z5xsjLE3Tb8",
//         thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTstpZVH2jslqgakHlsrboghb8ubPc_uQhfHawIF_U&usqp=CAE&s",
//         title: "Royal Enfield Hunter 350",
//         link: "https://www.royalenfield.com/in/en/motorcycles/hunter-350/",
//         description: "The Royal Enfield Hunter 350 is a modern classic roadster, designed for urban agility with a retro charm, offering a nimble ride and signature Royal Enfield thumping.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Hunter 350",
//           manufacturer: "Royal Enfield",
//           year: 2024,
//           features: [
//             "J-Series Engine",
//             "Single/Dual Channel ABS",
//             "Tripper Navigation (optional)",
//             "Sporty Ergonomics",
//             "Alloy Wheels"
//           ],
//           price: "₹ 1.50 - 1.75 Lakh"
//         }
//       },
//       {
//         id: 'royal-enfield-meteor-350',
//         videoPoster: royalEnfieldMeteor350,
//         videoSrc: "https://www.youtube.com/embed/SKK2Xwhwf2c",
//         thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTstpZVH2jslqgakHlsrboghb8ubPc_uQhfHawIF_U&usqp=CAE&s",
//         title: "Royal Enfield Meteor 350",
//         link: "https://www.royalenfield.com/in/en/motorcycles/meteor/",
//         description: "The Royal Enfield Meteor 350 is a modern cruiser offering a refined engine, comfortable ergonomics, and a smooth riding experience.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Meteor 350",
//           manufacturer: "Royal Enfield",
//           year: 2024,
//           features: ["J-Series Engine", "Tripper Navigation", "Alloy Wheels", "LED DRLs"],
//           price: "₹ 2.05 - 2.30 Lakh"
//         }
//       },
//       {
//         id: 'royal-enfield-himalayan',
//         videoPoster: royalEnfieldHimalayan,
//         videoSrc: "https://www.youtube.com/embed/xSe94jmw5lc",
//         thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTstpZVH2jslqgakHlsrboghb8ubPc_uQhfHawIF_U&usqp=CAE&s",
//         title: "Royal Enfield Himalayan",
//         link: "https://www.royalenfield.com/in/en/motorcycles/new-himalayan/",
//         description: "The Royal Enfield Himalayan is an adventure touring motorcycle built for challenging terrains, offering robust performance and comfortable long rides.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Himalayan",
//           manufacturer: "Royal Enfield",
//           year: 2024,
//           features: ["411cc Engine", "Switchable ABS", "Long Travel Suspension", "Digital Compass"],
//           price: "₹ 2.16 - 2.28 Lakh"
//         }
//       },
//     ]
//   },
//   {
//     manufacturer: 'Bajaj',
//     idPrefix: 'bajaj',
//     vehicles: [
//       {
//         id: 'bajaj-pulsar-125',
//         videoPoster: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/114155/pulsar-125-left-side-view.png?isig=0&q=80',
//         videoSrc: "https://www.youtube.com/embed/IjVpkMwSrqo",
//         thumbnail: "https://cdn.bajajauto.com/-/media/assets/bajajauto/global/bajaj-logo2.png",
//         title: "Bajaj Pulsar 125",
//         link: "https://www.bajajauto.com/bikes/pulsar/pulsar-125",
//         description: "The Bajaj Pulsar 125 combines muscular design with refined performance, making it a great entry-level sports commuter bike.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Pulsar 125",
//           manufacturer: "Bajaj",
//           year: 2024,
//           features: ["CBS Braking", "LED DRLs", "Digital Analog Console", "Tubeless Tyres"],
//           price: "₹ 82,000 - ₹ 95,000"
//         }
//       },
//       {
//         id: 'bajaj-pulsar-ns200',
//         videoPoster: bajajPulsarNS200,
//         videoSrc: "https://www.youtube.com/embed/nSw6pAqJ0PE",
//         thumbnail: "https://cdn.bajajauto.com/-/media/assets/bajajauto/global/bajaj-logo2.png",
//         title: "Bajaj Pulsar NS200",
//         link: "https://www.bajajauto.com/bikes/pulsar/pulsar-ns200",
//         description: "The Bajaj Pulsar NS200 is a naked sport bike known for its aggressive styling, powerful engine, and agile handling, perfect for city and highway.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Pulsar NS200",
//           manufacturer: "Bajaj",
//           year: 2024,
//           features: ["Liquid Cooled Engine", "Perimeter Frame", "ABS", "Digital Instrument Cluster"],
//           price: "₹ 1.50 - 1.65 Lakh"
//         }
//       },
//       {
//         id: 'bajaj-dominar-400',
//         videoPoster: bajajDominar400,
//         videoSrc: "https://www.youtube.com/embed/Ic1JxpXFGQA",
//         thumbnail: "https://cdn.bajajauto.com/-/media/assets/bajajauto/global/bajaj-logo2.png",
//         title: "Bajaj Dominar 400",
//         link: "https://www.bajajauto.com/bikes/dominar/dominar-400",
//         description: "The Bajaj Dominar 400 is a power cruiser designed for long-distance touring, offering a strong engine, comfortable ride, and imposing presence.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Dominar 400",
//           manufacturer: "Bajaj",
//           year: 2024,
//           features: ["DOHC Engine", "Dual Channel ABS", "USD Forks", "Twin Barrel Exhaust"],
//           price: "₹ 2.30 - 2.45 Lakh"
//         }
//       },
//       {
//         id: 'bajaj-platina',
//         videoPoster: bajajPlatina,
//         videoSrc: "https://www.youtube.com/embed/Q7FKL841xGs",
//         thumbnail: "https://cdn.bajajauto.com/-/media/assets/bajajauto/global/bajaj-logo2.png",
//         title: "Bajaj Platina",
//         link: "https://www.bajajauto.com/bikes/platina/platina-100",
//         description: "The Bajaj Platina is a commuter motorcycle renowned for its exceptional fuel efficiency, comfortable ride, and low maintenance, ideal for daily commutes.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Platina 100/110",
//           manufacturer: "Bajaj",
//           year: 2024,
//           features: ["Comfortec Suspension", "LED DRLs", "Tubeless Tyres", "Gear Indicator"],
//           price: "₹ 65,000 - 75,000"
//         }
//       }
//     ]
//   },
//   {
//     manufacturer: 'TVS',
//     idPrefix: 'tvs',
//     vehicles: [
//       {
//         id: 'tvs-apache-rtr-160',
//         videoPoster: tvsApacheRTR160,
//         videoSrc: "https://www.youtube.com/embed/xNRku1-nML0",
//         thumbnail: "https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg",
//         title: "TVS Apache RTR 160",
//         link: "https://www.tvsmotor.com/tvs-apache/apache-rtr-160-2v",
//         description: "The TVS Apache RTR 160 is a sporty commuter known for its aggressive styling, peppy performance, and race-tuned features.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Apache RTR 160",
//           manufacturer: "TVS",
//           year: 2024,
//           features: ["RT-Fi Engine", "Glyde Through Technology", "Petal Disc Brake", "SmartXonnect"],
//           price: "₹ 1.20 - 1.35 Lakh"
//         }
//       },
//       {
//         id: 'tvs-raider-125',
//         videoPoster: tvsRaider125,
//         videoSrc: "https://www.youtube.com/embed/-O04Z4c0PQo",
//         thumbnail: "https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg",
//         title: "TVS Raider 125",
//         link: "https://www.tvsmotor.com/tvs-raider",
//         description: "The TVS Raider 125 is a stylish and feature-rich 125cc commuter bike, offering a good balance of performance and fuel efficiency.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Raider 125",
//           manufacturer: "TVS",
//           year: 2024,
//           features: ["SmartXonnect", "LCD Digital Cluster", "Under-seat Storage", "Engine Kill Switch"],
//           price: "₹ 95,000 - 1.05 Lakh"
//         }
//       },
//       {
//         id: 'tvs-ntorq-125',
//         videoPoster: tvsNtorq125,
//         videoSrc: "https://www.youtube.com/embed/XhpsMF8Ifdk",
//         thumbnail: "https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg",
//         title: "TVS NTorq 125",
//         link: "https://www.tvsmotor.com/tvs-ntorq",
//         description: "The TVS NTorq 125 is a sporty scooter with impressive performance, smart features, and a distinctive design, popular among youth.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "NTorq 125",
//           manufacturer: "TVS",
//           year: 2024,
//           features: ["SmartXonnect", "LED Headlamp", "Stealth Aircraft Inspired Styling", "External Fuel Fill"],
//           price: "₹ 85,000 - 1.05 Lakh"
//         }
//       },
//     ]
//   },
//   {
//     manufacturer: 'Hero',
//     idPrefix: 'hero',
//     vehicles: [
//       {
//         id: 'hero-splendor-plus',
//         videoPoster: heroSplendorPlus,
//         videoSrc: "https://www.youtube.com/embed/jExzjFaS_VY",
//         thumbnail: "https://www.heromotocorp.com/content/dam/hero-aem-website/brand/logo/logo.svg",
//         title: "Hero Splendor Plus",
//         link: "https://www.heromotocorp.com/en-in/motorcycles/practical/splendor-plus.html",
//         description: "The Hero Splendor Plus is a highly reliable and fuel-efficient commuter bike, a household name in India for its robust build and low running costs.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Splendor Plus",
//           manufacturer: "Hero",
//           year: 2024,
//           features: ["i3S Technology", "Long Seat", "Tubeless Tyres", "Maintenance Free Battery"],
//           price: "₹ 75,000 - 80,000"
//         }
//       },
//       {
//         id: 'hero-xpulse-200',
//         videoPoster: heroXpulse200,
//         videoSrc: "https://www.youtube.com/embed/8QsLHrLmCQg",
//         thumbnail: "https://www.heromotocorp.com/content/dam/hero-aem-website/brand/logo/logo.svg",
//         title: "Hero Xpulse 200",
//         link: "https://www.heromotocorp.com/en-in/motorcycles/performance/xpulse-200-4v.html",
//         description: "The Hero Xpulse 200 is an accessible adventure bike, capable of handling rough terrains while being comfortable for daily commutes.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Xpulse 200",
//           manufacturer: "Hero",
//           year: 2024,
//           features: ["Long Travel Suspension", "Dual Purpose Tyres", "Bluetooth Connectivity", "Turn-by-Turn Navigation"],
//           price: "₹ 1.40 - 1.55 Lakh"
//         }
//       },
//       {
//         id: 'hero-hf-deluxe',
//         videoPoster: 'https://rukminid2.flixcart.com/image/850/1000/xif0q/motorcycle/b/a/t/i3s-with-self-start-self-kick-hf-deluxe-i3s-with-self-start-drum-original-imahauhk5q8daung.jpeg?q=20&crop=false',
//         videoSrc: "https://www.youtube.com/embed/BXIlcGpYKI4",
//         thumbnail: "https://www.heromotocorp.com/content/dam/hero-aem-website/brand/logo/logo.svg",
//         title: "Hero HF Deluxe",
//         link: "https://www.heromotocorp.com/en-in/motorcycles/practical/hf-deluxe.html",
//         description: "The Hero HF Deluxe is a trusted mileage bike built for rural and city commuting, known for reliability and affordability.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "HF Deluxe",
//           manufacturer: "Hero MotoCorp",
//           year: 2024,
//           features: ["i3S Technology", "Alloy Wheels", "Tubeless Tyres", "Kick & Electric Start"],
//           price: "₹ 60,000 - ₹ 67,000"
//         }
//       },
//       {
//         id: 'hero-passion-pro',
//         videoPoster: heroPassionPro,
//         videoSrc: "https://www.youtube.com/embed/NX-cosdFFV4",
//         thumbnail: "https://www.heromotocorp.com/content/dam/hero-aem-website/brand/logo/logo.svg",
//         title: "Hero Passion Pro",
//         link: "https://www.heromotocorp.com/en-in/motorcycles/executive/passion-plus.html",
//         description: "The Hero Passion Pro is a stylish and practical commuter bike, offering a comfortable ride and good fuel efficiency for urban use.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Passion Pro",
//           manufacturer: "Hero",
//           year: 2024,
//           features: ["XSens Technology", "Programmed FI", "Digital Analog Meter", "Side Stand Indicator"],
//           price: "₹ 78,000 - 85,000"
//         }
//       },
//     ]
//   },
//   {
//     manufacturer: 'Yamaha',
//     idPrefix: 'yamaha',
//     vehicles: [
//       {
//         id: 'yamaha-fz-s-v3',
//         videoPoster: yamahaFZSV3,
//         videoSrc: "https://www.youtube.com/embed/3vA2Ts79RCE",
//         thumbnail: "https://www.yamaha-motor-india.com/theme/v4/images/yamaha_logo-black.webp?v=5",
//         title: "Yamaha FZ-S V3",
//         link: "https://www.yamaha-motor-india.com/yamaha-fzs-fi.html",
//         description: "The Yamaha FZ-S V3 is a popular naked streetfighter known for its muscular design, refined engine, and comfortable ergonomics.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "FZ-S V3",
//           manufacturer: "Yamaha",
//           year: 2024,
//           features: ["Fuel Injection", "Single Channel ABS", "LED Headlight", "Multi-function LCD Instrument Cluster"],
//           price: "₹ 1.25 - 1.35 Lakh"
//         }
//       },
//       {
//         id: 'yamaha-r15-v4',
//         videoPoster: yamahaR15V4,
//         videoSrc: " https://www.youtube.com/embed/B1QWfiXEPAg",
//         thumbnail: "https://www.yamaha-motor-india.com/theme/v4/images/yamaha_logo-black.webp?v=5",
//         title: "Yamaha R15 V4",
//         link: "https://www.yamaha-motor-india.com/yamaha-r15v4.html",
//         description: "The Yamaha R15 V4 is a fully faired sport bike offering track-focused performance, aggressive styling, and advanced features.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "R15 V4",
//           manufacturer: "Yamaha",
//           year: 2024,
//           features: ["Variable Valve Actuation (VVA)", "Traction Control System", "Quick Shifter", "Upside Down Front Forks"],
//           price: "₹ 1.85 - 2.00 Lakh"
//         }
//       },
//       {
//         id: "yamaha-r15-s",
//         videoPoster: "https://img.autocarindia.com/ExtraImages/20190110113500_R15-Racing-Blue.jpg?w=700&c=1",
//         videoSrc: "https://www.youtube.com/embed/i3If7V2HgtA",
//         thumbnail: "https://www.yamaha-motor-india.com/theme/v4/images/yamaha_logo-black.webp?v=5",
//         title: "Yamaha R15S",
//         link: "https://www.yamaha-motor-india.com/yamaha-r15rs.html",
//         description: "The Yamaha R15S is a premium sport bike designed for exhilarating performance and aggressive styling, combining track-ready features with thrilling road dynamics.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "R15RS",
//           manufacturer: "Yamaha",
//           year: 2025,
//           features: [
//             "Liquid Cooled 155cc Engine",
//             "Quick Shifter (Up & Down)",
//             "Traction Control System",
//             "Dual Channel ABS",
//             "Advanced Aerodynamics",
//             "Adjustable Suspension"
//           ],
//           price: "₹ 2.10 - 2.30 Lakh"
//         }
//       },
//       {
//         id: 'yamaha-mt-15',
//         videoPoster: yamahaMT15,
//         videoSrc: "https://www.youtube.com/embe/a_woE_7t_10",
//         thumbnail: "https://www.yamaha-motor-india.com/theme/v4/images/yamaha_logo-black.webp?v=5",
//         title: "Yamaha MT-15",
//         link: "https://www.yamaha-motor-india.com/yamaha-mt-15-v2.html",
//         description: "The Yamaha MT-15 is a naked streetfighter with aggressive styling, a potent engine, and nimble handling, making it a thrilling urban machine.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "MT-15",
//           manufacturer: "Yamaha",
//           year: 2024,
//           features: ["Variable Valve Actuation (VVA)", "Upside Down Front Forks", "Assist & Slipper Clutch", "Bi-functional LED Headlight"],
//           price: "₹ 1.70 - 1.80 Lakh"
//         }
//       },
//     ]
//   },
//   {
//     manufacturer: 'Honda',
//     idPrefix: 'honda',
//     vehicles: [
//       {
//         id: 'honda-cb350rs',
//         videoPoster: hondaCB350RS,
//         videoSrc: "https://www.youtube.com/embed/9uBaWaXVqXo",
//         thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
//         title: "Honda CB350RS",
//         link: "https://www.honda2wheelersindia.com/motorcycle/CB350RS",
//         description: "The Honda CB350RS is a retro-styled roadster, offering a smooth and refined engine, comfortable riding posture, and a strong road presence.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "CB350RS",
//           manufacturer: "Honda",
//           year: 2024,
//           features: ["Selectable Torque Control", "Assist & Slipper Clutch", "Digital Analog Meter", "LED Lighting"],
//           price: "₹ 2.15 - 2.20 Lakh"
//         }
//       },
//       {
//         id: 'honda-activa-6g',
//         videoPoster: hondaActiva6G,
//         videoSrc: "https://www.youtube.com/embed/RZcki0JVASQ",
//         thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
//         title: "Honda Activa 6G",
//         link: "https://www.honda2wheelersindia.com/scooter/activa110",
//         description: "The Honda Activa 6G is India's best-selling scooter, known for its reliability, smooth engine, and practicality for daily commutes.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Activa 6G",
//           manufacturer: "Honda",
//           year: 2024,
//           features: ["eSP Technology", "Silent Start", "External Fuel Lid", "LED DC Headlamp"],
//           price: "₹ 78,000 - 85,000"
//         }
//       },
//       {
//         id: 'honda-sp125',
//         videoPoster: 'https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fmotorcycle%2Fsp-125%2Fget-to-know-your-ride%2FGet-to-know-your-ride-584x450.png%3Fh%3D450%26iar%3D0%26w%3D584&w=1200&q=75&dpl=dpl_GhRLthEc6SnttHujCmfo3AqX9GYv',
//         videoSrc: "https://www.youtube.com/embed/zUghFzvCmkg",
//         thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
//         title: "Honda SP 125",
//         link: "https://www.honda2wheelersindia.com/motorcycle/sp-125",
//         description: "The Honda SP 125 is a stylish and fuel-efficient commuter bike packed with modern features and refined performance.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "SP 125",
//           manufacturer: "Honda",
//           year: 2024,
//           features: ["Silent Start ACG", "Fully Digital Console", "eSP Technology", "Fuel Injection"],
//           price: "₹ 86,000 - ₹ 91,000"
//         }
//       },
//       {
//         id: 'honda-dio',
//         videoPoster: 'https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fscooter%2Fdio-110%2Fdio110-accessories.png%3Fh%3D810%26iar%3D0%26w%3D1920&w=1920&q=75&dpl=dpl_GhRLthEc6SnttHujCmfo3AqX9GYv',
//         videoSrc: "https://www.youtube.com/embed/OpyEvjTqabY",
//         thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
//         title: "Honda Dio",
//         link: "https://www.honda2wheelersindia.com/scooter/dio-110",
//         description: "The Honda Dio is a sporty scooter with youth-centric design, vibrant graphics, and a reliable engine for daily rides.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Dio",
//           manufacturer: "Honda",
//           year: 2024,
//           features: ["LED Headlamp", "Digital Console", "eSP Technology", "Side Stand Engine Cut-off"],
//           price: "₹ 73,000 - ₹ 78,000"
//         }
//       },
//       {
//         id: 'honda-shine',
//         videoPoster: hondaShine,
//         videoSrc: "https://www.youtube.com/embed/_86inLgEAJE",
//         thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
//         title: "Honda Shine",
//         link: "https://www.honda2wheelersindia.com/motorcycle/shine-125",
//         description: "The Honda Shine is a popular 125cc commuter bike, highly regarded for its refined engine, comfortable ride, and excellent fuel efficiency.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Shine",
//           manufacturer: "Honda",
//           year: 2024,
//           features: ["eSP Technology", "ACG Starter", "Pillion Grabrail", "Side Stand Engine Cut-off"],
//           price: "₹ 80,000 - 85,000"
//         }
//       },
//     ]
//   },
//   {
//     manufacturer: 'Suzuki',
//     idPrefix: 'suzuki',
//     vehicles: [
//       {
//         id: 'suzuki-gixxer-sf250',
//         videoPoster: suzukiGixxerSF250,
//         videoSrc: "https://www.youtube.com/embed/RerGdIdc424",
//         thumbnail: "https://cdn.suzukimotorcycle.co.in/public-live/images/website/logo.jpg",
//         title: "Suzuki Gixxer SF250",
//         link: "https://www.suzukimotorcycle.co.in/product-details/gixxer-sf-250",
//         description: "The Suzuki Gixxer SF250 is a fully faired sport bike offering a powerful and refined engine, comfortable ergonomics, and a sporty design.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Gixxer SF250",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["Oil Cooled Engine", "Dual Channel ABS", "Clip-on Handlebars", "LED Headlamp"],
//           price: "₹ 1.95 - 2.05 Lakh"
//         }
//       },
//       {
//         id: 'suzuki-burgman-street',
//         videoPoster: suzukiBurgmanStreet,
//         videoSrc: "https://www.youtube.com/embed/jE5azauqyN8",
//         thumbnail: "https://cdn.suzukimotorcycle.co.in/public-live/images/website/logo.jpg",
//         title: "Suzuki Burgman Street",
//         link: "https://www.suzukimotorcycle.co.in/product-details/burgman-street-bluetooth-enabled",
//         description: "The Suzuki Burgman Street is a maxi-scooter offering comfortable seating, spacious storage, and a premium riding experience.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Burgman Street",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["FI Engine", "LED Headlamp", "DC Charging Socket", "Long Seat"],
//           price: "₹ 95,000 - 1.10 Lakh"
//         }
//       },
//       {
//         id: 'suzuki-access-125',
//         videoPoster: suzukiAccess125,
//         videoSrc: "https://www.youtube.com/embed/xFzepRMLUG0",
//         thumbnail: "https://cdn.suzukimotorcycle.co.in/public-live/images/website/logo.jpg",
//         title: "Suzuki Access 125",
//         link: "https://www.suzukimotorcycle.co.in/product-details/all-new-access-125-bluetooth-enabled",
//         description: "The Suzuki Access 125 is a popular scooter known for its refined engine, comfortable ride, and practical features, making it a reliable daily commuter.",
//         buttonText: "View Details",
//         vehicleInfo: {
//           model: "Access 125",
//           manufacturer: "Suzuki",
//           year: 2024,
//           features: ["FI Engine", "Silent Start System", "External Fuel Fill", "Digital Meter"],
//           price: "₹ 80,000 - 90,000"
//         }
//       },
//     ]
//   },
// ];

// const Bikecard = () => {
//   const [authChecked, setAuthChecked] = useState(false);
//   const [manufacturer, setManufacturer] = useState('');//filer search
//   const [model, setModel] = useState('');//filer search
//   const [filteredData, setFilteredData] = useState(vehicleData);//filer search
//   const navigate = useNavigate();

//   //DATA_AOS animation 
//   useEffect(() => {
//     AOS.init({
//       duration: 300, // animation duration in ms
//       once: false, // repeat animation every time you scroll up/down
//     });
//   }, []);

//   //checking user is sign in or not
//   useEffect(() => {
//     // Check if the user is signed in with Firebase
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         navigate('/login'); // Redirect to login if not authenticated
//       } else {
//         setAuthChecked(true); // Allow render if authenticated
//       }
//     });
//     return () => unsubscribe(); // Cleanup
//   }, [navigate]);

//   // useEffect(() => {
//   //     if (manufacturer.trim()) {
//   //       const filtered = vehicleData.filter(group =>
//   //         group.manufacturer.toLowerCase().includes(manufacturer.toLowerCase())
//   //       );
//   //       setFilteredData(filtered);
//   //     } else {
//   //       setFilteredData(vehicleData); // reset if input is cleared
//   //     }
//   //   }, [manufacturer]);
//   useEffect(() => {
//     const filtered = vehicleData
//       .map(group => {
//         const matchManufacturer = group.manufacturer.toLowerCase().includes(manufacturer.toLowerCase());
//         // If manufacturer matches or input is empty
//         if (matchManufacturer || !manufacturer.trim()) {
//           const filteredVehicles = group.vehicles.filter(vehicle =>
//             vehicle.vehicleInfo.model.toLowerCase().includes(model.toLowerCase())
//           );
//           // Only return groups with matching vehicles
//           if (filteredVehicles.length > 0) {
//             return { ...group, vehicles: filteredVehicles };
//           }
//         }
//         return null;
//       })
//       .filter(Boolean);
//     setFilteredData(filtered.length ? filtered : []);
//   }, [manufacturer, model]);

//   if (!authChecked) return null; // Prevent UI render while checking auth


//   const handleFeedbackClick = () => {
//     console.log('Feedback button clicked!');
//     navigate('/feedback');
//   };

//   const handleActionButtonClick = (vehicleId) => {
//     console.log(`Action button clicked for vehicle: ${vehicleId}`);
//     navigate(`/cardetail/${vehicleId}`);
//   };

//   const renderVehicleCard = (vehicle) => (
//     <div className="card-container" key={vehicle.id}>
//       <div className="video-section">
//         <section>
//           <video
//             muted
//             playsInline
//             disableRemotePlayback
//             poster={vehicle.videoPoster}
//             className="video-element"
//           >
//             <source src={vehicle.videoSrc} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </section>
//         <div className="video-overlay">
//           <img
//             src={vehicle.thumbnail}
//             alt={`${vehicle.title} thumbnail`}
//             className="thumbnail"
//           />
//           <div className="title">
//             <a href={vehicle.link} onClick={(e) => e.preventDefault()}>{vehicle.title}</a>
//             <SlArrowRight />
//           </div>
//         </div>
//       </div>

//       <div className="content">
//         <p className="description">{vehicle.description}</p>
//         <div className="button-row">
//           <button className="feedback-btn" onClick={handleFeedbackClick}>
//             <VscFeedback />
//             Feedback
//           </button>
//           <div className="main-action-group" onClick={() => handleActionButtonClick(vehicle.id)}>
//             <div className="turn-on-button">{vehicle.buttonText}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="seeoffer-background">
//       <div className='cardbox'>
//         {/* Add the search input */}
//         <div className="manufacturer-filter" style={{ textAlign: 'center', marginBottom: '20px' }}>
//           <input
//             type="text"
//             placeholder="Search by Manufacturer (e.g., Yamaha)"
//             value={manufacturer}
//             onChange={(e) => setManufacturer(e.target.value)}
//             style={{
//               padding: '10px 15px',
//               width: '350px',
//               borderRadius: '8px',
//               border: '1px solid #ccc',
//               fontSize: '16px'
//             }}
//           />
//         </div>
//         <div className="model-filter" style={{ textAlign: 'center', marginBottom: '20px' }}>
//           <input
//             type="text"
//             placeholder="Search by Model (e.g., Activa, apache)"
//             value={model}
//             onChange={(e) => setModel(e.target.value)}
//             style={{
//               padding: '10px 15px',
//               width: '350px',
//               borderRadius: '8px',
//               border: '1px solid #ccc',
//               fontSize: '16px'
//             }}
//           />
//         </div>

//         {filteredData.length > 0 ? (
//           filteredData.map((manufacturerGroup) => (
//             <React.Fragment key={manufacturerGroup.manufacturer}>
//               <div data-aos="fade" className='title1' data-aos-once="true">
//                 <h1 className='rxk'>{manufacturerGroup.manufacturer} Vehicles</h1>
//               </div>
//               <div data-aos="fade-up" className="card-slider" data-aos-once="true">
//                 <div className="card-grid-wrapper">
//                   {manufacturerGroup.vehicles.map(vehicle => renderVehicleCard(vehicle))}
//                 </div>
//               </div>
//               <div className="Xp8JS"></div>
//             </React.Fragment>
//           ))) : (
//           <div className="no-results" style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px', color: '#999' }}>
//             🚫 No vehicles found matching your search.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Bikecard;

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './tab.css'; // Make sure this path is correct for your styles
import { SlArrowRight } from "react-icons/sl";
import { VscFeedback } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
//authentication checking
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
//scroll up animation
import AOS from 'aos';
import 'aos/dist/aos.css';

// Bike images import
import royalEnfieldClassic350 from './cardbox/royalEnfieldClassic350.jpg';
import royalEnfieldMeteor350 from './cardbox/royalEnfieldMeteor350.jpg';
import royalEnfieldHimalayan from './cardbox/royalEnfieldHimalayan.jpg';
import bajajPulsarNS200 from './cardbox/bajajPulsarNS200.jpg';
import bajajDominar400 from './cardbox/bajajDominar400.jpg';
import bajajPlatina from './cardbox/bajajPlatina.jpg';
import tvsApacheRTR160 from './cardbox/tvsApacheRTR160.jpg';
import tvsRaider125 from './cardbox/tvsRaider125.jpg';
import tvsNtorq125 from './cardbox/tvsNtorq125.jpg';
import heroSplendorPlus from './cardbox/heroSplendorPlus.jpg';
import heroXpulse200 from './cardbox/heroXpulse200.jpg';
import heroPassionPro from './cardbox/heroPassionPro.jpg';
import hondaCB350RS from './cardbox/hondaCB350RS.jpg';
import hondaActiva6G from './cardbox/hondaActiva6G.jpg';
import hondaShine from './cardbox/hondaShine.jpg';
import suzukiGixxerSF250 from './cardbox/suzukiGixxerSF250.jpg';
import suzukiBurgmanStreet from './cardbox/suzukiBurgmanStreet.jpg';
import suzukiAccess125 from './cardbox/suzukiAccess125.jpg';
import yamahaFZSV3 from './cardbox/yamahaFZSV3.jpg';
import yamahaR15V4 from './cardbox/yamahaR15V4.jpg';
import yamahaMT15 from './cardbox/yamahaMT15.jpg';
// New imports for additional bikes (placeholders for now if you don't have actual images)
import royalenfieldinterceptor650 from './cardbox/royal-enfield-interceptor-650.jpg';
import bajajpulsarf250 from './cardbox/bajaj-pulsar-f250.jpg';
import tvsapacherr310 from './cardbox/tvs-apache-rr310.jpg';
import heroglamour from './cardbox/hero-glamour.jpg';
import yamahafascino125fi from './cardbox/yamaha-fascino-125-fi.jpg';
import hondahornet20 from './cardbox/honda-hornet-2-0.jpg';
import suzukivstromsx from './cardbox/suzuki-v-strom-sx.jpg';
import ktmduke390 from './cardbox/ktm-duke-390.jpg';
import ktmrc390 from './cardbox/ktm-rc-390.jpg';
import ktm200duke from './cardbox/ktm-200-duke.jpg';
import bmwg310gs from './cardbox/bmw-g310gs.jpg';
import bmwg310r from './cardbox/bmw-g310r.jpg';
import harleydavidsonfatboy from './cardbox/harley-davidson-fat-boy.jpg';
import harleydavidsonx440 from './cardbox/harley-davidson-x440.jpg';
import kawasakininja300 from './cardbox/kawasaki-ninja-300.jpg';
import kawasakiz900 from './cardbox/kawasakiz900.jpg';


// Centralized data for your bikes, grouped by manufacturer
export const vehicleData = [
  {
    manufacturer: 'Royal Enfield',
    idPrefix: 'royalEnfield',
    vehicles: [
      {
        id: 'royal-enfield-classic-350',
        videoPoster: royalEnfieldClassic350,
        videoSrc: "https://www.youtube.com/embed/6AqNLRxiWHc",
        thumbnail: "https://www.royalenfield.com/content/dam/re-platform-images/pageLoader/pre-loader-04.svg",
        title: "Royal Enfield Classic 350",
        link: "https://www.royalenfield.com/in/en/motorcycles/classic-350/",
        description: "The Royal Enfield Classic 350 is an iconic motorcycle known for its vintage appeal, thumping exhaust note, and comfortable ride, a true cruiser.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Classic 350",
          manufacturer: "Royal Enfield",
          year: 2024,
          features: ["J-Series Engine", "Dual Channel ABS", "Tripper Navigation", "Halogen Headlamp"],
          price: "₹ 1.93 - 2.25 Lakh",
          mileage: "35-40 kmpl",
          engineDisplacement: "349cc",
          power: "20.2 bhp",
          torque: "27 Nm",
          fuelTankCapacity: "13 L",
          seatHeight: "805 mm",
          kerbWeight: "195 kg",
          transmission: "5-speed manual",
          topSpeed: "114 km/h",
          coolingSystem: "Air-cooled",
          fuelSystem: "Fuel Injection",
          brakes: "Disc (Front & Rear) with Dual Channel ABS",
          suspension: {
            front: "Telescopic, 41mm forks",
            rear: "Twin tube emulsion shock absorbers with 6-step adjustable preload"
          },
          tyreType: "Tubeless",
          wheelBase: "1390 mm",
          groundClearance: "170 mm",
          emissionStandard: "BS6",
          instrumentConsole: ["Analog Speedometer", "Digital Tripmeter", "Fuel Gauge", "Odometer"],
          warranty: "3 Years / 30,000 km",
          serviceInterval: "Every 5000 km or 6 months"
        }
      },
      {
        id: "royal-enfield-hunter-350",
        videoPoster: "https://cdn.bikedekho.com/upload/standoutfeatures/65e6ec8173c8f.jpg",
        videoSrc: "https://www.youtube.com/embed/z5xsjLE3Tb8",
        thumbnail: "https://www.royalenfield.com/content/dam/re-platform-images/pageLoader/pre-loader-04.svg",
        title: "Royal Enfield Hunter 350",
        link: "https://www.royalenfield.com/in/en/motorcycles/hunter-350/",
        description: "The Royal Enfield Hunter 350 is a modern classic roadster, designed for urban agility with a retro charm, offering a nimble ride and signature Royal Enfield thumping.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Hunter 350",
          manufacturer: "Royal Enfield",
          year: 2024,
          features: [
            "J-Series Engine",
            "Single/Dual Channel ABS",
            "Tripper Navigation (optional)",
            "Sporty Ergonomics",
            "Alloy Wheels"
          ],
          price: "₹ 1.50 - 1.75 Lakh",
          mileage: "36-38 kmpl",
          engineDisplacement: "349cc",
          power: "20.2 bhp",
          torque: "27 Nm",
          fuelTankCapacity: "13 L",
          seatHeight: "800 mm",
          kerbWeight: "181 kg",
          transmission: "5-speed manual"
        }
      },
      {
        id: 'royal-enfield-meteor-350',
        videoPoster: royalEnfieldMeteor350,
        videoSrc: "https://www.youtube.com/embed/SKK2Xwhwf2c",
        thumbnail: "https://www.royalenfield.com/content/dam/re-platform-images/pageLoader/pre-loader-04.svg",
        title: "Royal Enfield Meteor 350",
        link: "https://www.royalenfield.com/in/en/motorcycles/meteor/",
        description: "The Royal Enfield Meteor 350 is a modern cruiser offering a refined engine, comfortable ergonomics, and a smooth riding experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Meteor 350",
          manufacturer: "Royal Enfield",
          year: 2024,
          features: ["J-Series Engine", "Tripper Navigation", "Alloy Wheels", "LED DRLs"],
          price: "₹ 2.05 - 2.30 Lakh",
          mileage: "35-37 kmpl",
          engineDisplacement: "349cc",
          power: "20.2 bhp",
          torque: "27 Nm",
          fuelTankCapacity: "15 L",
          seatHeight: "765 mm",
          kerbWeight: "191 kg",
          transmission: "5-speed manual"
        }
      },
      {
        id: 'royal-enfield-himalayan',
        videoPoster: royalEnfieldHimalayan,
        videoSrc: "https://www.youtube.com/embed/xSe94jmw5lc",
        thumbnail: "https://www.royalenfield.com/content/dam/re-platform-images/pageLoader/pre-loader-04.svg",
        title: "Royal Enfield Himalayan",
        link: "https://www.royalenfield.com/in/en/motorcycles/new-himalayan/",
        description: "The Royal Enfield Himalayan is an adventure touring motorcycle built for challenging terrains, offering robust performance and comfortable long rides.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Himalayan",
          manufacturer: "Royal Enfield",
          year: 2024,
          features: ["411cc Engine", "Switchable ABS", "Long Travel Suspension", "Digital Compass"],
          price: "₹ 2.16 - 2.28 Lakh",
          mileage: "30-32 kmpl",
          engineDisplacement: "411cc",
          power: "24.3 bhp",
          torque: "32 Nm",
          fuelTankCapacity: "15 L",
          seatHeight: "800 mm",
          kerbWeight: "199 kg",
          transmission: "5-speed manual"
        }
      },
      {
        id: 'royal-enfield-interceptor-650', // New vehicle
        videoPoster: royalenfieldinterceptor650,
        videoSrc: "https://www.youtube.com/embed/sS5n1iK3kX0",
        thumbnail: "https://www.royalenfield.com/content/dam/re-platform-images/pageLoader/pre-loader-04.svg",
        title: "Royal Enfield Interceptor 650",
        link: "https://www.royalenfield.com/in/en/motorcycles/interceptor-650/",
        description: "The Royal Enfield Interceptor 650 is a modern classic roadster, renowned for its smooth parallel-twin engine, comfortable riding posture, and retro styling.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Interceptor 650",
          manufacturer: "Royal Enfield",
          year: 2024,
          features: ["648cc Parallel-Twin Engine", "Assist & Slipper Clutch", "Dual Channel ABS", "Comfortable Ergonomics"],
          price: "₹ 3.03 - 3.31 Lakh",
          mileage: "25-28 kmpl",
          engineDisplacement: "648cc",
          power: "47 bhp",
          torque: "52 Nm",
          fuelTankCapacity: "13.7 L",
          seatHeight: "804 mm",
          kerbWeight: "202 kg",
          transmission: "6-speed manual"
        }
      }
    ]
  },
  {
    manufacturer: 'Bajaj',
    idPrefix: 'bajaj',
    vehicles: [
      {
        id: 'bajaj-pulsar-125',
        videoPoster: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/114155/pulsar-125-left-side-view.png?isig=0&q=80',
        videoSrc: "https://www.youtube.com/embed/IjVpkMwSrqo",
        thumbnail: "https://cdn.bajajauto.com/-/media/assets/bajajauto/global/bajaj-logo2.png",
        title: "Bajaj Pulsar 125",
        link: "https://www.bajajauto.com/bikes/pulsar/pulsar-125",
        description: "The Bajaj Pulsar 125 combines muscular design with refined performance, making it a great entry-level sports commuter bike.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Pulsar 125",
          manufacturer: "Bajaj",
          year: 2024,
          features: ["CBS Braking", "LED DRLs", "Digital Analog Console", "Tubeless Tyres"],
          price: "₹ 82,000 - ₹ 95,000",
          mileage: "50-55 kmpl",
          engineDisplacement: "124.4cc",
          power: "11.64 bhp",
          torque: "10.8 Nm",
          fuelTankCapacity: "11.5 L",
          seatHeight: "790 mm",
          kerbWeight: "140 kg",
          transmission: "5-speed manual"
        }
      },
      {
        id: 'bajaj-pulsar-ns200',
        videoPoster: bajajPulsarNS200,
        videoSrc: "https://www.youtube.com/embed/nSw6pAqJ0PE",
        thumbnail: "https://cdn.bajajauto.com/-/media/assets/bajajauto/global/bajaj-logo2.png",
        title: "Bajaj Pulsar NS200",
        link: "https://www.bajajauto.com/bikes/pulsar/pulsar-ns200",
        description: "The Bajaj Pulsar NS200 is a naked sport bike known for its aggressive styling, powerful engine, and agile handling, perfect for city and highway.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Pulsar NS200",
          manufacturer: "Bajaj",
          year: 2024,
          features: ["Liquid Cooled Engine", "Perimeter Frame", "ABS", "Digital Instrument Cluster"],
          price: "₹ 1.50 - 1.65 Lakh",
          mileage: "35-40 kmpl",
          engineDisplacement: "199.5cc",
          power: "24.13 bhp",
          torque: "18.74 Nm",
          fuelTankCapacity: "12 L",
          seatHeight: "805 mm",
          kerbWeight: "159.5 kg",
          transmission: "6-speed manual"
        }
      },
      {
        id: 'bajaj-dominar-400',
        videoPoster: bajajDominar400,
        videoSrc: "https://www.youtube.com/embed/Ic1JxpXFGQA",
        thumbnail: "https://cdn.bajajauto.com/-/media/assets/bajajauto/global/bajaj-logo2.png",
        title: "Bajaj Dominar 400",
        link: "https://www.bajajauto.com/bikes/dominar/dominar-400",
        description: "The Bajaj Dominar 400 is a power cruiser designed for long-distance touring, offering a strong engine, comfortable ride, and imposing presence.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Dominar 400",
          manufacturer: "Bajaj",
          year: 2024,
          features: ["DOHC Engine", "Dual Channel ABS", "USD Forks", "Twin Barrel Exhaust"],
          price: "₹ 2.30 - 2.45 Lakh",
          mileage: "28-32 kmpl",
          engineDisplacement: "373.3cc",
          power: "39.4 bhp",
          torque: "35 Nm",
          fuelTankCapacity: "13 L",
          seatHeight: "800 mm",
          kerbWeight: "193 kg",
          transmission: "6-speed manual"
        }
      },
      {
        id: 'bajaj-platina',
        videoPoster: bajajPlatina,
        videoSrc: "https://www.youtube.com/embed/Q7FKL841xGs",
        thumbnail: "https://cdn.bajajauto.com/-/media/assets/bajajauto/global/bajaj-logo2.png",
        title: "Bajaj Platina",
        link: "https://www.bajajauto.com/bikes/platina/platina-100",
        description: "The Bajaj Platina is a commuter motorcycle renowned for its exceptional fuel efficiency, comfortable ride, and low maintenance, ideal for daily commutes.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Platina 100/110",
          manufacturer: "Bajaj",
          year: 2024,
          features: ["Comfortec Suspension", "LED DRLs", "Tubeless Tyres", "Gear Indicator"],
          price: "₹ 65,000 - 75,000",
          mileage: "70-75 kmpl",
          engineDisplacement: "102cc (Platina 100) / 115.45cc (Platina 110)",
          power: "7.9 bhp / 8.48 bhp",
          torque: "8.3 Nm / 9.81 Nm",
          fuelTankCapacity: "11 L",
          seatHeight: "807 mm",
          kerbWeight: "117 kg",
          transmission: "4-speed manual / 5-speed manual"
        }
      },
      {
        id: 'bajaj-pulsar-f250', // New vehicle
        videoPoster: bajajpulsarf250,
        videoSrc: "https://www.youtube.com/embed/S2pT-e5H01M",
        thumbnail: "https://cdn.bajajauto.com/-/media/assets/bajajauto/global/bajaj-logo2.png",
        title: "Bajaj Pulsar F250",
        link: "https://www.bajajauto.com/bikes/pulsar/pulsar-f250",
        description: "The Bajaj Pulsar F250 is a semi-faired sports tourer, offering a refined 250cc engine, comfortable ergonomics, and modern features for both city commutes and highway rides.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Pulsar F250",
          manufacturer: "Bajaj",
          year: 2024,
          features: ["Oil Cooled Engine", "Assist & Slipper Clutch", "USB Charging", "Infinity Display"],
          price: "₹ 1.40 - 1.55 Lakh",
          mileage: "38-42 kmpl",
          engineDisplacement: "249.07cc",
          power: "24.1 bhp",
          torque: "21.5 Nm",
          fuelTankCapacity: "14 L",
          seatHeight: "795 mm",
          kerbWeight: "164 kg",
          transmission: "5-speed manual"
        }
      }
    ]
  },
  {
    manufacturer: 'TVS',
    idPrefix: 'tvs',
    vehicles: [
      {
        id: 'tvs-apache-rtr-160',
        videoPoster: tvsApacheRTR160,
        videoSrc: "https://www.youtube.com/embed/xNRku1-nML0",
        thumbnail: "https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg",
        title: "TVS Apache RTR 160",
        link: "https://www.tvsmotor.com/tvs-apache/apache-rtr-160-2v",
        description: "The TVS Apache RTR 160 is a sporty commuter known for its aggressive styling, peppy performance, and race-tuned features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Apache RTR 160",
          manufacturer: "TVS",
          year: 2024,
          features: ["RT-Fi Engine", "Glyde Through Technology", "Petal Disc Brake", "SmartXonnect"],
          price: "₹ 1.20 - 1.35 Lakh",
          mileage: "45-50 kmpl",
          engineDisplacement: "159.7cc",
          power: "15.82 bhp",
          torque: "13.85 Nm",
          fuelTankCapacity: "12 L",
          seatHeight: "790 mm",
          kerbWeight: "138 kg",
          transmission: "5-speed manual"
        }
      },
      {
        id: 'tvs-raider-125',
        videoPoster: tvsRaider125,
        videoSrc: "https://www.youtube.com/embed/-O04Z4c0PQo",
        thumbnail: "https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg",
        title: "TVS Raider 125",
        link: "https://www.tvsmotor.com/tvs-raider",
        description: "The TVS Raider 125 is a stylish and feature-rich 125cc commuter bike, offering a good balance of performance and fuel efficiency.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Raider 125",
          manufacturer: "TVS",
          year: 2024,
          features: ["SmartXonnect", "LCD Digital Cluster", "Under-seat Storage", "Engine Kill Switch"],
          price: "₹ 95,000 - 1.05 Lakh",
          mileage: "55-60 kmpl",
          engineDisplacement: "124.8cc",
          power: "11.2 bhp",
          torque: "11.2 Nm",
          fuelTankCapacity: "10 L",
          seatHeight: "785 mm",
          kerbWeight: "123 kg",
          transmission: "5-speed manual"
        }
      },
      {
        id: 'tvs-ntorq-125',
        videoPoster: tvsNtorq125,
        videoSrc: "https://www.youtube.com/embed/XhpsMF8Ifdk",
        thumbnail: "https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg",
        title: "TVS NTorq 125",
        link: "https://www.tvsmotor.com/tvs-ntorq",
        description: "The TVS NTorq 125 is a sporty scooter with impressive performance, smart features, and a distinctive design, popular among youth.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "NTorq 125",
          manufacturer: "TVS",
          year: 2024,
          features: ["SmartXonnect", "LED Headlamp", "Stealth Aircraft Inspired Styling", "External Fuel Fill"],
          price: "₹ 85,000 - 1.05 Lakh",
          mileage: "45-50 kmpl",
          engineDisplacement: "124.8cc",
          power: "9.25 bhp",
          torque: "10.5 Nm",
          fuelTankCapacity: "5.8 L",
          seatHeight: "770 mm",
          kerbWeight: "118 kg",
          transmission: "Automatic (CVT)"
        }
      },
      {
        id: 'tvs-apache-rr310', // New vehicle
        videoPoster: tvsapacherr310,
        videoSrc: "https://www.youtube.com/embed/jB1tW5S-e2w",
        thumbnail: "https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg",
        title: "TVS Apache RR 310",
        link: "https://www.tvsmotor.com/tvs-apache/apache-rr-310",
        description: "The TVS Apache RR 310 is a fully faired sportbike developed in collaboration with BMW Motorrad, offering sharp dynamics, a powerful engine, and advanced electronics.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Apache RR 310",
          manufacturer: "TVS",
          year: 2024,
          features: ["Liquid Cooled Engine", "Ride Modes", "TFT Display", "SmartXonnect"],
          price: "₹ 2.72 Lakh",
          mileage: "30-33 kmpl",
          engineDisplacement: "312.2cc",
          power: "33.5 bhp",
          torque: "27.3 Nm",
          fuelTankCapacity: "11 L",
          seatHeight: "810 mm",
          kerbWeight: "174 kg",
          transmission: "6-speed manual"
        }
      }
    ]
  },
  {
    manufacturer: 'Hero',
    idPrefix: 'hero',
    vehicles: [
      {
        id: 'hero-splendor-plus',
        videoPoster: heroSplendorPlus,
        videoSrc: "https://www.youtube.com/embed/jExzjFaS_VY",
        thumbnail: "https://www.heromotocorp.com/content/dam/hero-aem-website/brand/logo/logo.svg",
        title: "Hero Splendor Plus",
        link: "https://www.heromotocorp.com/en-in/motorcycles/practical/splendor-plus.html",
        description: "The Hero Splendor Plus is a highly reliable and fuel-efficient commuter bike, a household name in India for its robust build and low running costs.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Splendor Plus",
          manufacturer: "Hero",
          year: 2024,
          features: ["i3S Technology", "Long Seat", "Tubeless Tyres", "Maintenance Free Battery"],
          price: "₹ 75,000 - 80,000",
          mileage: "65-70 kmpl",
          engineDisplacement: "97.2cc",
          power: "7.91 bhp",
          torque: "8.05 Nm",
          fuelTankCapacity: "9.8 L",
          seatHeight: "785 mm",
          kerbWeight: "112 kg",
          transmission: "4-speed manual"
        }
      },
      {
        id: 'hero-xpulse-200',
        videoPoster: heroXpulse200,
        videoSrc: "https://www.youtube.com/embed/8QsLHrLmCQg",
        thumbnail: "https://www.heromotocorp.com/content/dam/hero-aem-website/brand/logo/logo.svg",
        title: "Hero Xpulse 200",
        link: "https://www.heromotocorp.com/en-in/motorcycles/performance/xpulse-200-4v.html",
        description: "The Hero Xpulse 200 is an accessible adventure bike, capable of handling rough terrains while being comfortable for daily commutes.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Xpulse 200",
          manufacturer: "Hero",
          year: 2024,
          features: ["Long Travel Suspension", "Dual Purpose Tyres", "Bluetooth Connectivity", "Turn-by-Turn Navigation"],
          price: "₹ 1.40 - 1.55 Lakh",
          mileage: "38-42 kmpl",
          engineDisplacement: "199.6cc",
          power: "18.8 bhp",
          torque: "17.35 Nm",
          fuelTankCapacity: "13 L",
          seatHeight: "825 mm",
          kerbWeight: "158 kg",
          transmission: "5-speed manual"
        }
      },
      {
        id: 'hero-hf-deluxe',
        videoPoster: 'https://rukminid2.flixcart.com/image/850/1000/xif0q/motorcycle/b/a/t/i3s-with-self-start-self-kick-hf-deluxe-i3s-with-self-start-drum-original-imahauhk5q8daung.jpeg?q=20&crop=false',
        videoSrc: "https://www.youtube.com/embed/BXIlcGpYKI4",
        thumbnail: "https://www.heromotocorp.com/content/dam/hero-aem-website/brand/logo/logo.svg",
        title: "Hero HF Deluxe",
        link: "https://www.heromotocorp.com/en-in/motorcycles/practical/hf-deluxe.html",
        description: "The Hero HF Deluxe is a trusted mileage bike built for rural and city commuting, known for reliability and affordability.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "HF Deluxe",
          manufacturer: "Hero MotoCorp",
          year: 2024,
          features: ["i3S Technology", "Alloy Wheels", "Tubeless Tyres", "Kick & Electric Start"],
          price: "₹ 60,000 - ₹ 67,000",
          mileage: "70-75 kmpl",
          engineDisplacement: "97.2cc",
          power: "7.91 bhp",
          torque: "8.05 Nm",
          fuelTankCapacity: "9.6 L",
          seatHeight: "805 mm",
          kerbWeight: "110 kg",
          transmission: "4-speed manual"
        }
      },
      {
        id: 'hero-passion-pro',
        videoPoster: heroPassionPro,
        videoSrc: "https://www.youtube.com/embed/NX-cosdFFV4",
        thumbnail: "https://www.heromotocorp.com/content/dam/hero-aem-website/brand/logo/logo.svg",
        title: "Hero Passion Pro",
        link: "https://www.heromotocorp.com/en-in/motorcycles/executive/passion-plus.html",
        description: "The Hero Passion Pro is a stylish and practical commuter bike, offering a comfortable ride and good fuel efficiency for urban use.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Passion Pro",
          manufacturer: "Hero",
          year: 2024,
          features: ["XSens Technology", "Programmed FI", "Digital Analog Meter", "Side Stand Indicator"],
          price: "₹ 78,000 - 85,000",
          mileage: "60-65 kmpl",
          engineDisplacement: "113cc",
          power: "9.02 bhp",
          torque: "9.89 Nm",
          fuelTankCapacity: "10 L",
          seatHeight: "799 mm",
          kerbWeight: "118 kg",
          transmission: "4-speed manual"
        }
      },
      {
        id: 'hero-glamour', // New vehicle
        videoPoster: heroglamour,
        videoSrc: "https://www.youtube.com/embed/OpyEvjTqabY",
        thumbnail: "https://www.heromotocorp.com/content/dam/hero-aem-website/brand/logo/logo.svg",
        title: "Hero Glamour",
        link: "https://www.heromotocorp.com/en-in/motorcycles/executive/glamour.html",
        description: "The Hero Glamour is a stylish 125cc commuter bike known for its refined engine, comfortable ride, and smart features, making it ideal for daily commutes.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Glamour",
          manufacturer: "Hero",
          year: 2024,
          features: ["i3S Technology", "Programmed FI", "Digital Analog Meter", "Auto Sail Technology"],
          price: "₹ 83,000 - 88,000",
          mileage: "60-65 kmpl",
          engineDisplacement: "124.7cc",
          power: "10.72 bhp",
          torque: "10.6 Nm",
          fuelTankCapacity: "10 L",
          seatHeight: "790 mm",
          kerbWeight: "122 kg",
          transmission: "5-speed manual"
        }
      }
    ]
  },
  {
    manufacturer: 'Yamaha',
    idPrefix: 'yamaha',
    vehicles: [
      {
        id: 'yamaha-fz-s-v3',
        videoPoster: yamahaFZSV3,
        videoSrc: "https://www.youtube.com/embed/3vA2Ts79RCE",
        thumbnail: "https://www.yamaha-motor-india.com/theme/v4/images/yamaha_logo-black.webp?v=5",
        title: "Yamaha FZ-S V3",
        link: "https://www.yamaha-motor-india.com/yamaha-fzs-fi.html",
        description: "The Yamaha FZ-S V3 is a popular naked streetfighter known for its muscular design, refined engine, and comfortable ergonomics.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "FZ-S V3",
          manufacturer: "Yamaha",
          year: 2024,
          features: ["Fuel Injection", "Single Channel ABS", "LED Headlight", "Multi-function LCD Instrument Cluster"],
          price: "₹ 1.25 - 1.35 Lakh",
          mileage: "45-50 kmpl",
          engineDisplacement: "149cc",
          power: "12.2 bhp",
          torque: "13.6 Nm",
          fuelTankCapacity: "13 L",
          seatHeight: "790 mm",
          kerbWeight: "135 kg",
          transmission: "5-speed manual"
        }
      },
      {
        id: 'yamaha-r15-v4',
        videoPoster: yamahaR15V4,
        videoSrc: " https://www.youtube.com/embed/B1QWfiXEPAg",
        thumbnail: "https://www.yamaha-motor-india.com/theme/v4/images/yamaha_logo-black.webp?v=5",
        title: "Yamaha R15 V4",
        link: "https://www.yamaha-motor-india.com/yamaha-r15v4.html",
        description: "The Yamaha R15 V4 is a fully faired sport bike offering track-focused performance, aggressive styling, and advanced features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "R15 V4",
          manufacturer: "Yamaha",
          year: 2024,
          features: ["Variable Valve Actuation (VVA)", "Traction Control System", "Quick Shifter", "Upside Down Front Forks"],
          price: "₹ 1.85 - 2.00 Lakh",
          mileage: "40-45 kmpl",
          engineDisplacement: "155cc",
          power: "18.1 bhp",
          torque: "14.2 Nm",
          fuelTankCapacity: "11 L",
          seatHeight: "815 mm",
          kerbWeight: "142 kg",
          transmission: "6-speed manual"
        }
      },
      {
        id: "yamaha-r15-s",
        videoPoster: "https://img.autocarindia.com/ExtraImages/20190110113500_R15-Racing-Blue.jpg?w=700&c=1",
        videoSrc: "https://www.youtube.com/embed/i3If7V2HgtA",
        thumbnail: "https://www.yamaha-motor-india.com/theme/v4/images/yamaha_logo-black.webp?v=5",
        title: "Yamaha R15S",
        link: "https://www.yamaha-motor-india.com/yamaha-r15rs.html",
        description: "The Yamaha R15S is a premium sport bike designed for exhilarating performance and aggressive styling, combining track-ready features with thrilling road dynamics.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "R15RS",
          manufacturer: "Yamaha",
          year: 2025,
          features: [
            "Liquid Cooled 155cc Engine",
            "Quick Shifter (Up & Down)",
            "Traction Control System",
            "Dual Channel ABS",
            "Advanced Aerodynamics",
            "Adjustable Suspension"
          ],
          price: "₹ 2.10 - 2.30 Lakh",
          mileage: "42-45 kmpl",
          engineDisplacement: "155cc",
          power: "18.3 bhp",
          torque: "14.1 Nm",
          fuelTankCapacity: "11 L",
          seatHeight: "815 mm",
          kerbWeight: "142 kg",
          transmission: "6-speed manual"
        }
      },
      {
        id: 'yamaha-mt-15',
        videoPoster: yamahaMT15,
        videoSrc: "https://www.youtube.com/embed/a_woE_7t_10",
        thumbnail: "https://www.yamaha-motor-india.com/theme/v4/images/yamaha_logo-black.webp?v=5",
        title: "Yamaha MT-15",
        link: "https://www.yamaha-motor-india.com/yamaha-mt-15-v2.html",
        description: "The Yamaha MT-15 is a naked streetfighter with aggressive styling, a potent engine, and nimble handling, making it a thrilling urban machine.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "MT-15",
          manufacturer: "Yamaha",
          year: 2024,
          features: ["Variable Valve Actuation (VVA)", "Upside Down Front Forks", "Assist & Slipper Clutch", "Bi-functional LED Headlight"],
          price: "₹ 1.70 - 1.80 Lakh",
          mileage: "48-52 kmpl",
          engineDisplacement: "155cc",
          power: "18.1 bhp",
          torque: "14.1 Nm",
          fuelTankCapacity: "10 L",
          seatHeight: "810 mm",
          kerbWeight: "138 kg",
          transmission: "6-speed manual"
        }
      },
      {
        id: 'yamaha-fascino-125-fi', // New vehicle
        videoPoster: yamahafascino125fi,
        videoSrc: "https://www.youtube.com/embed/Ic1JxpXFGQA",
        thumbnail: "https://www.yamaha-motor-india.com/theme/v4/images/yamaha_logo-black.webp?v=5",
        title: "Yamaha Fascino 125 Fi",
        link: "https://www.yamaha-motor-india.com/yamaha-fascino-125.html",
        description: "The Yamaha Fascino 125 Fi is a stylish and fuel-efficient scooter known for its retro design, comfortable ride, and advanced features.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Fascino 125 Fi",
          manufacturer: "Yamaha",
          year: 2024,
          features: ["Hybrid Engine", "Smart Motor Generator", "Side Stand Engine Cut-off", "Digital Instrument Cluster"],
          price: "₹ 82,000 - 95,000",
          mileage: "60-65 kmpl",
          engineDisplacement: "125cc",
          power: "8.04 bhp",
          torque: "10.3 Nm",
          fuelTankCapacity: "5.2 L",
          seatHeight: "780 mm",
          kerbWeight: "99 kg",
          transmission: "Automatic (CVT)"
        }
      }
    ]
  },
  {
    manufacturer: 'Honda',
    idPrefix: 'honda',
    vehicles: [
      {
        id: 'honda-cb350rs',
        videoPoster: hondaCB350RS,
        videoSrc: "https://www.youtube.com/embed/9uBaWaXVqXo",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
        title: "Honda CB350RS",
        link: "https://www.honda2wheelersindia.com/motorcycle/CB350RS",
        description: "The Honda CB350RS is a retro-styled roadster, offering a smooth and refined engine, comfortable riding posture, and a strong road presence.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "CB350RS",
          manufacturer: "Honda",
          year: 2024,
          features: ["Selectable Torque Control", "Assist & Slipper Clutch", "Digital Analog Meter", "LED Lighting"],
          price: "₹ 2.15 - 2.20 Lakh",
          mileage: "35-40 kmpl",
          engineDisplacement: "348.36cc",
          power: "20.78 bhp",
          torque: "30 Nm",
          fuelTankCapacity: "15 L",
          seatHeight: "800 mm",
          kerbWeight: "179 kg",
          transmission: "5-speed manual"
        }
      },
      {
        id: 'honda-activa-6g',
        videoPoster: hondaActiva6G,
        videoSrc: "https://www.youtube.com/embed/RZcki0JVASQ",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
        title: "Honda Activa 6G",
        link: "https://www.honda2wheelersindia.com/scooter/activa110",
        description: "The Honda Activa 6G is India's best-selling scooter, known for its reliability, smooth engine, and practicality for daily commutes.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Activa 6G",
          manufacturer: "Honda",
          year: 2024,
          features: ["eSP Technology", "Silent Start", "External Fuel Lid", "LED DC Headlamp"],
          price: "₹ 78,000 - 85,000",
          mileage: "45-50 kmpl",
          engineDisplacement: "109.51cc",
          power: "7.73 bhp",
          torque: "8.90 Nm",
          fuelTankCapacity: "5.3 L",
          seatHeight: "765 mm",
          kerbWeight: "106 kg",
          transmission: "Automatic (CVT)"
        }
      },
      {
        id: 'honda-sp125',
        videoPoster: 'https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fmotorcycle%2Fsp-125%2Fget-to-know-your-ride%2FGet-to-know-your-ride-584x450.png%3Fh%3D450%26iar%3D0%26w%3D584&w=1200&q=75&dpl=dpl_GhRLthEc6SnttHujCmfo3AqX9GYv',
        videoSrc: "https://www.youtube.com/embed/zUghFzvCmkg",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
        title: "Honda SP 125",
        link: "https://www.honda2wheelersindia.com/motorcycle/sp-125",
        description: "The Honda SP 125 is a stylish and fuel-efficient commuter bike packed with modern features and refined performance.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "SP 125",
          manufacturer: "Honda",
          year: 2024,
          features: ["Silent Start ACG", "Fully Digital Console", "eSP Technology", "Fuel Injection"],
          price: "₹ 86,000 - ₹ 91,000",
          mileage: "60-65 kmpl",
          engineDisplacement: "124cc",
          power: "10.72 bhp",
          torque: "10.9 Nm",
          fuelTankCapacity: "11 L",
          seatHeight: "790 mm",
          kerbWeight: "117 kg",
          transmission: "5-speed manual"
        }
      },
      {
        id: 'honda-dio',
        videoPoster: 'https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fscooter%2Fdio-110%2Fdio110-accessories.png%3Fh%3D810%26iar%3D0%26w%3D1920&w=1920&q=75&dpl=dpl_GhRLthEc6SnttHujCmfo3AqX9GYv',
        videoSrc: "https://www.youtube.com/embed/OpyEvjTqabY",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
        title: "Honda Dio",
        link: "https://www.honda2wheelersindia.com/scooter/dio-110",
        description: "The Honda Dio is a sporty scooter with youth-centric design, vibrant graphics, and a reliable engine for daily rides.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Dio",
          manufacturer: "Honda",
          year: 2024,
          features: ["LED Headlamp", "Digital Console", "eSP Technology", "Side Stand Engine Cut-off"],
          price: "₹ 73,000 - ₹ 78,000",
          mileage: "48-52 kmpl",
          engineDisplacement: "109.51cc",
          power: "7.73 bhp",
          torque: "8.90 Nm",
          fuelTankCapacity: "5.3 L",
          seatHeight: "765 mm",
          kerbWeight: "106 kg",
          transmission: "Automatic (CVT)"
        }
      },
      {
        id: 'honda-shine',
        videoPoster: hondaShine,
        videoSrc: "https://www.youtube.com/embed/_86inLgEAJE",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
        title: "Honda Shine",
        link: "https://www.honda2wheelersindia.com/motorcycle/shine-125",
        description: "The Honda Shine is a popular 125cc commuter bike, highly regarded for its refined engine, comfortable ride, and excellent fuel efficiency.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Shine",
          manufacturer: "Honda",
          year: 2024,
          features: ["eSP Technology", "ACG Starter", "Pillion Grabrail", "Side Stand Engine Cut-off"],
          price: "₹ 80,000 - 85,000",
          mileage: "60-65 kmpl",
          engineDisplacement: "124cc",
          power: "10.72 bhp",
          torque: "11 Nm",
          fuelTankCapacity: "10.5 L",
          seatHeight: "791 mm",
          kerbWeight: "114 kg",
          transmission: "5-speed manual"
        }
      },
      {
        id: 'honda-hornet-2-0', // New vehicle
        videoPoster: hondahornet20,
        videoSrc: "https://www.youtube.com/embed/nSw6pAqJ0PE",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
        title: "Honda Hornet 2.0",
        link: "https://www.honda2wheelersindia.com/motorcycle/hornet-20",
        description: "The Honda Hornet 2.0 is a streetfighter motorcycle with aggressive styling, a refined engine, and premium features, offering a sporty and agile ride.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Hornet 2.0",
          manufacturer: "Honda",
          year: 2024,
          features: ["USD Front Forks", "Dual Petal Disc Brakes", "LED Lighting", "Digital Instrument Cluster"],
          price: "₹ 1.40 Lakh",
          mileage: "40-45 kmpl",
          engineDisplacement: "184.4cc",
          power: "17.03 bhp",
          torque: "16.1 Nm",
          fuelTankCapacity: "12 L",
          seatHeight: "795 mm",
          kerbWeight: "142 kg",
          transmission: "5-speed manual"
        }
      }
    ]
  },
  {
    manufacturer: 'Suzuki',
    idPrefix: 'suzuki',
    vehicles: [
      {
        id: 'suzuki-gixxer-sf250',
        videoPoster: suzukiGixxerSF250,
        videoSrc: "https://www.youtube.com/embed/RerGdIdc424",
        thumbnail: "https://cdn.suzukimotorcycle.co.in/public-live/images/website/logo.jpg",
        title: "Suzuki Gixxer SF250",
        link: "https://www.suzukimotorcycle.co.in/product-details/gixxer-sf-250",
        description: "The Suzuki Gixxer SF250 is a fully faired sport bike offering a powerful and refined engine, comfortable ergonomics, and a sporty design.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Gixxer SF250",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["Oil Cooled Engine", "Dual Channel ABS", "Clip-on Handlebars", "LED Headlamp"],
          price: "₹ 1.95 - 2.05 Lakh",
          mileage: "35-38 kmpl",
          engineDisplacement: "249cc",
          power: "26.1 bhp",
          torque: "22.2 Nm",
          fuelTankCapacity: "12 L",
          seatHeight: "795 mm",
          kerbWeight: "161 kg",
          transmission: "6-speed manual"
        }
      },
      {
        id: 'suzuki-burgman-street',
        videoPoster: suzukiBurgmanStreet,
        videoSrc: "https://www.youtube.com/embed/jE5azauqyN8",
        thumbnail: "https://cdn.suzukimotorcycle.co.in/public-live/images/website/logo.jpg",
        title: "Suzuki Burgman Street",
        link: "https://www.suzukimotorcycle.co.in/product-details/burgman-street-bluetooth-enabled",
        description: "The Suzuki Burgman Street is a maxi-scooter offering comfortable seating, spacious storage, and a premium riding experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Burgman Street",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["FI Engine", "LED Headlamp", "DC Charging Socket", "Long Seat"],
          price: "₹ 95,000 - 1.10 Lakh",
          mileage: "45-50 kmpl",
          engineDisplacement: "124cc",
          power: "8.58 bhp",
          torque: "10 Nm",
          fuelTankCapacity: "5.5 L",
          seatHeight: "780 mm",
          kerbWeight: "110 kg",
          transmission: "Automatic (CVT)"
        }
      },
      {
        id: 'suzuki-access-125',
        videoPoster: suzukiAccess125,
        videoSrc: "https://www.youtube.com/embed/xFzepRMLUG0",
        thumbnail: "https://cdn.suzukimotorcycle.co.in/public-live/images/website/logo.jpg",
        title: "Suzuki Access 125",
        link: "https://www.suzukimotorcycle.co.in/product-details/all-new-access-125-bluetooth-enabled",
        description: "The Suzuki Access 125 is a popular scooter known for its refined engine, comfortable ride, and practical features, making it a reliable daily commuter.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Access 125",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["FI Engine", "Silent Start System", "External Fuel Fill", "Digital Meter"],
          price: "₹ 80,000 - 90,000",
          mileage: "50-55 kmpl",
          engineDisplacement: "124cc",
          power: "8.58 bhp",
          torque: "10 Nm",
          fuelTankCapacity: "5 L",
          seatHeight: "773 mm",
          kerbWeight: "103 kg",
          transmission: "Automatic (CVT)"
        }
      },
      {
        id: 'suzuki-v-strom-sx', // New vehicle
        videoPoster: suzukivstromsx,
        videoSrc: "https://www.youtube.com/embed/z5xsjLE3Tb8",
        thumbnail: "https://cdn.suzukimotorcycle.co.in/public-live/images/website/logo.jpg",
        title: "Suzuki V-Strom SX",
        link: "https://www.suzukimotorcycle.co.in/product-details/v-strom-sx",
        description: "The Suzuki V-Strom SX is an adventure tourer based on the Gixxer 250 platform, offering comfortable ergonomics, long-travel suspension, and robust performance for varied terrains.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "V-Strom SX",
          manufacturer: "Suzuki",
          year: 2024,
          features: ["Oil Cooled Engine", "Dual Channel ABS", "USB Charger", "Bluetooth Connectivity"],
          price: "₹ 2.12 Lakh",
          mileage: "32-35 kmpl",
          engineDisplacement: "249cc",
          power: "26.1 bhp",
          torque: "22.2 Nm",
          fuelTankCapacity: "12 L",
          seatHeight: "835 mm",
          kerbWeight: "167 kg",
          transmission: "6-speed manual"
        }
      }
    ]
  },
  {
    manufacturer: 'KTM', // New Brand
    idPrefix: 'ktm',
    vehicles: [
      {
        id: 'ktm-duke-390',
        videoPoster: ktmduke390,
        videoSrc: ktmduke390,
        thumbnail: "https://images.seeklogo.com/logo-png/8/1/ktm-racing-logo-png_seeklogo-80603.png",
        title: "KTM 390 Duke",
        link: "https://www.ktm.com/en-in/models/naked-bike/ktm-390-duke-2024.html",
        description: "The KTM 390 Duke is a performance naked bike known for its aggressive styling, powerful engine, and sharp handling, offering an exhilarating riding experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "390 Duke",
          manufacturer: "KTM",
          year: 2024,
          features: ["Liquid Cooled Engine", "Ride-by-Wire", "Cornering ABS", "Quickshifter+"],
          price: "₹ 3.10 - 3.30 Lakh",
          mileage: "28-32 kmpl",
          engineDisplacement: "398.63cc",
          power: "44.25 bhp",
          torque: "39 Nm",
          fuelTankCapacity: "15 L",
          seatHeight: "820 mm",
          kerbWeight: "165 kg",
          transmission: "6-speed manual"
        }
      },
      {
        id: 'ktm-rc-390',
        videoPoster: ktmrc390,
        videoSrc: ktmrc390,
        thumbnail: "https://images.seeklogo.com/logo-png/8/1/ktm-racing-logo-png_seeklogo-80603.png",
        title: "KTM RC 390",
        link: "https://www.ktm.com/en-in/models/supersport/ktm-rc-390-2024.html",
        description: "The KTM RC 390 is a track-focused supersport bike, offering sharp handling, a powerful engine, and aerodynamic design for thrilling performance on road and track.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "RC 390",
          manufacturer: "KTM",
          year: 2024,
          features: ["Liquid Cooled Engine", "Traction Control", "Quickshifter+", "Supermoto ABS"],
          price: "₹ 3.18 Lakh",
          mileage: "28-32 kmpl",
          engineDisplacement: "373.27cc",
          power: "42.9 bhp",
          torque: "37 Nm",
          fuelTankCapacity: "13.7 L",
          seatHeight: "824 mm",
          kerbWeight: "172 kg",
          transmission: "6-speed manual"
        }
      },
      {
        id: 'ktm-200-duke', // New vehicle
        videoPoster: ktm200duke, // Placeholder
        videoSrc: "https://www.youtube.com/embed/Ic1JxpXFGQA",
        thumbnail: "https://images.seeklogo.com/logo-png/8/1/ktm-racing-logo-png_seeklogo-80603.png",
        title: "KTM 200 Duke",
        link: "https://www.ktm.com/en-in/models/naked-bike/ktm-200-duke-2024.html",
        description: "The KTM 200 Duke is a popular entry-level naked bike known for its aggressive styling, peppy engine, and agile handling, perfect for urban commuting and spirited rides.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "200 Duke",
          manufacturer: "KTM",
          year: 2024,
          features: ["Liquid Cooled Engine", "Supermoto ABS", "LED Headlight", "Digital Instrument Cluster"],
          price: "₹ 1.96 Lakh",
          mileage: "35-40 kmpl",
          engineDisplacement: "199.5cc",
          power: "25.4 bhp",
          torque: "19.5 Nm",
          fuelTankCapacity: "13.4 L",
          seatHeight: "822 mm",
          kerbWeight: "159 kg",
          transmission: "6-speed manual"
        }
      }
    ]
  },
  {
    manufacturer: 'BMW Motorrad', // New Brand
    idPrefix: 'bmw-motorrad',
    vehicles: [
      {
        id: 'bmw-g310gs',
        videoPoster: bmwg310gs,
        videoSrc: bmwg310gs,
        thumbnail: "https://www.carlogos.org/car-logos/bmw-logo-2020-gray.png",
        title: "BMW G 310 GS",
        link: "https://www.bmw-motorrad.in/en/models/roadster/g310gs.html",
        description: "The BMW G 310 GS is an entry-level adventure bike from BMW Motorrad, offering comfortable ergonomics, good off-road capability, and a refined engine for diverse riding conditions.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "G 310 GS",
          manufacturer: "BMW Motorrad",
          year: 2024,
          features: ["Liquid Cooled Engine", "Ride-by-Wire", "ABS", "LED Headlight"],
          price: "₹ 3.30 Lakh",
          mileage: "30-32 kmpl",
          engineDisplacement: "313cc",
          power: "33.5 bhp",
          torque: "28 Nm",
          fuelTankCapacity: "11 L",
          seatHeight: "835 mm",
          kerbWeight: "175 kg",
          transmission: "6-speed manual"
        }
      },
      {
        id: 'bmw-g310r', // New vehicle
        videoPoster: bmwg310r, // Placeholder
        videoSrc: "https://www.youtube.com/embed/sS5n1iK3kX0",
        thumbnail: "https://www.carlogos.org/car-logos/bmw-logo-2020-gray.png",
        title: "BMW G 310 R",
        link: "https://www.bmw-motorrad.in/en/models/roadster/g310r.html",
        description: "The BMW G 310 R is a compact and agile roadster from BMW Motorrad, designed for urban environments and spirited rides, offering premium features and a dynamic riding experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "G 310 R",
          manufacturer: "BMW Motorrad",
          year: 2024,
          features: ["Liquid Cooled Engine", "Ride-by-Wire", "ABS", "LED Headlight"],
          price: "₹ 2.90 Lakh",
          mileage: "30-32 kmpl",
          engineDisplacement: "313cc",
          power: "33.5 bhp",
          torque: "28 Nm",
          fuelTankCapacity: "11 L",
          seatHeight: "785 mm",
          kerbWeight: "164 kg",
          transmission: "6-speed manual"
        }
      }
    ]
  },
  {
    manufacturer: 'Harley-Davidson', // New Brand
    idPrefix: 'harley-davidson',
    vehicles: [
      {
        id: 'harley-davidson-fat-boy',
        videoPoster: harleydavidsonfatboy,
        videoSrc: harleydavidsonfatboy,
        thumbnail: "https://w7.pngwing.com/pngs/784/1011/png-transparent-harley-davidson-logo-dallas-harley-davidson-motorcycle-harley-davidson-of-manila-appalachian-harley-davidson-motorcycle-text-orange-logo.png",
        title: "Harley-Davidson Fat Boy",
        link: "https://www.harley-davidson.com/in/en/motorcycles/fat-boy.html",
        description: "The Harley-Davidson Fat Boy is an iconic cruiser known for its muscular styling, solid-disc wheels, and powerful Milwaukee-Eight engine, offering a classic American touring experience.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Fat Boy",
          manufacturer: "Harley-Davidson",
          year: 2024,
          features: ["Milwaukee-Eight 114 Engine", "Lakester Disc Wheels", "Signature LED Lighting", "Comfortable Seating"],
          price: "₹ 24.49 - 25.00 Lakh",
          mileage: "18-20 kmpl",
          engineDisplacement: "1868cc",
          power: "93 bhp (est)",
          torque: "155 Nm",
          fuelTankCapacity: "16.7 L",
          seatHeight: "675 mm",
          kerbWeight: "317 kg",
          transmission: "6-speed manual"
        }
      },
      {
        id: 'harleydavidsonx440', // New vehicle (Indian market specific)
        videoPoster: harleydavidsonx440,
        videoSrc: "https://www.youtube.com/embed/RZcki0JVASQ",
        thumbnail: "https://w7.pngwing.com/pngs/784/1011/png-transparent-harley-davidson-logo-dallas-harley-davidson-motorcycle-harley-davidson-of-manila-appalachian-harley-davidson-motorcycle-text-orange-logo.png",
        title: "Harley-Davidson X440",
        link: "https://www.harley-davidson.com/in/en/motorcycles/x440.html",
        description: "The Harley-Davidson X440 is a modern-classic roadster developed for the Indian market, offering a peppy 440cc engine, retro styling, and comfortable ergonomics for daily commutes and weekend rides.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "X440",
          manufacturer: "Harley-Davidson",
          year: 2024,
          features: ["440cc Single-Cylinder Engine", "USD Front Forks", "Dual Channel ABS", "Bluetooth Connectivity"],
          price: "₹ 2.40 - 2.80 Lakh",
          mileage: "30-35 kmpl",
          engineDisplacement: "440cc",
          power: "27 bhp",
          torque: "38 Nm",
          fuelTankCapacity: "13.5 L",
          seatHeight: "805 mm",
          kerbWeight: "190.5 kg",
          transmission: "6-speed manual"
        }
      }
    ]
  },
  {
    manufacturer: 'Kawasaki', // New Brand
    idPrefix: 'kawasaki',
    vehicles: [
      {
        id: 'ninja300',
        videoPoster: kawasakininja300,
        videoSrc: kawasakininja300,
        thumbnail: "https://www.kawasaki-india.com/en/_jcr_content/root/header/logo.coreimg.png/1721042064437/new-vi-logo.png",
        title: "Kawasaki Ninja 300",
        link: "https://www.kawasaki-india.com/products/motorcycles/ninja-300/",
        description: "The Kawasaki Ninja 300 is a popular entry-level sportbike known for its refined parallel-twin engine, nimble handling, and aggressive Ninja styling, making it a great choice for aspiring riders.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Ninja 300",
          manufacturer: "Kawasaki",
          year: 2024,
          features: ["Liquid Cooled Parallel-Twin Engine", "Assist & Slipper Clutch", "Dual Channel ABS", "Race-inspired Instrument Cluster"],
          price: "₹ 3.43 Lakh",
          mileage: "30-32 kmpl",
          engineDisplacement: "296cc",
          power: "38.8 bhp",
          torque: "27 Nm",
          fuelTankCapacity: "17 L",
          seatHeight: "785 mm",
          kerbWeight: "179 kg",
          transmission: "6-speed manual"
        }
      },
      {
        id: 'kawasakiz900', // New vehicle
        videoPoster: kawasakiz900,
        videoSrc: "https://www.youtube.com/embed/9uBaWaXVqXo",
        thumbnail: "https://www.kawasaki-india.com/en/_jcr_content/root/header/logo.coreimg.png/1721042064437/new-vi-logo.png",
        title: "Kawasaki Z900",
        link: "https://www.kawasaki-india.com/products/motorcycles/z900/",
        description: "The Kawasaki Z900 is a naked streetfighter known for its powerful inline-four engine, aggressive 'Sugomi' styling, and balanced performance, offering an exhilarating and comfortable ride.",
        buttonText: "View Details",
        vehicleInfo: {
          model: "Z900",
          manufacturer: "Kawasaki",
          year: 2024,
          features: ["948cc Inline-Four Engine", "TFT Color Instrument Panel", "Traction Control", "Power Modes", "Smartphone Connectivity"],
          price: "₹ 9.38 Lakh",
          mileage: "18-20 kmpl",
          engineDisplacement: "948cc",
          power: "123.6 bhp",
          torque: "98.6 Nm",
          fuelTankCapacity: "17 L",
          seatHeight: "820 mm",
          kerbWeight: "212 kg",
          transmission: "6-speed manual"
        }
      }
    ]
  }
];

const Bikecard = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 300, once: false });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        setAuthChecked(true);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const filteredData = useMemo(() => {
    const manufacturerFiltered = manufacturer.trim()
      ? vehicleData.filter(group =>
        group.manufacturer.toLowerCase().includes(manufacturer.toLowerCase())
      )
      : vehicleData;

    return manufacturerFiltered
      .map(group => {
        const filteredVehicles = group.vehicles.filter(vehicle =>
          vehicle.vehicleInfo.model.toLowerCase().includes(model.toLowerCase()) ||
          vehicle.title.toLowerCase().includes(model.toLowerCase()) ||
          vehicle.description.toLowerCase().includes(model.toLowerCase())
        );
        return filteredVehicles.length > 0 ? { ...group, vehicles: filteredVehicles } : null;
      })
      .filter(Boolean);
  }, [manufacturer, model]);

  const handleFeedbackClick = () => {
    console.log('Feedback button clicked!');
    navigate('/feedback');
  };

  const handleActionButtonClick = (vehicleId) => {
    console.log(`Action button clicked for vehicle: ${vehicleId}`);
    navigate(`/cardetail/${vehicleId}`);
  };

  const renderVehicleCard = useCallback((vehicle) => {
    const isYouTubeVideo = vehicle.videoSrc?.includes("youtube.com/embed/");
    const videoIdMatch = isYouTubeVideo ? vehicle.videoSrc.match(/\/embed\/([a-zA-Z0-9_-]+)/) : null;
    const youtubeVideoId = videoIdMatch ? videoIdMatch[1] : null;

    return (
      <div className="card-container" key={vehicle.id}>
        <div className="video-section">
          <img
            src={vehicle.videoPoster}
            alt={`${vehicle.title} video poster`}
            className="video-element"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/480x270/cccccc/333333?text=No+Video";
            }}
          />

          <div className="video-overlay">
            <img
              src={vehicle.thumbnail}
              alt={`${vehicle.title} thumbnail`}
              className="thumbnail"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/100x60/cccccc/333333?text=Logo";
              }}
            />
            <div className="title">
              <a href={vehicle.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
                {vehicle.title}
              </a>
              <SlArrowRight />
            </div>
          </div>
        </div>


        <div className="content">
          <p className="description">{vehicle.description}</p>
          {/* <p className="mileage-info">Mileage: {vehicle.vehicleInfo?.mileage || 'N/A'}</p> */}
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
  }, [handleFeedbackClick, handleActionButtonClick]);

  if (!authChecked) return null;

  return (
    <div className="seeoffer-background">
      <div className="cardbox">
        <div className="manufacturer-filter" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by Manufacturer (e.g. Yamaha)"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            style={{
              padding: '10px 15px',
              width: '350px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
        </div>

        <div className="model-filter" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by Model (e.g. Activa, Apache)"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{
              padding: '10px 15px',
              width: '350px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
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
                  {manufacturerGroup.vehicles.map(vehicle => renderVehicleCard(vehicle))}
                </div>
              </div>
              <div className="Xp8JS"></div>
            </React.Fragment>
          ))
        ) : (
          <div className="no-results" style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px', color: '#999' }}>
            🚫 No vehicles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Bikecard;