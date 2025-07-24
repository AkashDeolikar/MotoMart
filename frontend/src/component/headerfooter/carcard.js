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
        "vehicleInfo": {
          "model": "Swift",
          "manufacturer": "Maruti Suzuki",
          "year": 2024,
          "price": "₹ 7.84 - 8.34 Lakh (ex-showroom)",
          "engineAndTransmission": {
            "engineType": "1.2L DualJet (K12N)",
            "displacement": "1197 cc",
            "maxPower": "88.50 bhp @ 6000 rpm",
            "maxTorque": "113 Nm @ 4400 rpm",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (AMT)",
            "gearbox": "5-Speed",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG",
            "mileage": "22.38 - 22.56 kmpl (Petrol, ARAI) / 30.90 km/kg (CNG)",
            "fuelTankCapacity": "37 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Torsion Beam",
            "steeringType": "Electric",
            "steeringColumn": "Tilt",
            "turningRadius": "4.8 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3845 mm",
            "width": "1735 mm",
            "height": "1530 mm",
            "seatingCapacity": 5,
            "groundClearance": "163 mm",
            "wheelBase": "2450 mm",
            "numberOfDoors": 5,
            "bootSpace": "268 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front)", "60:40 Split Rear Seat",
              "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Central Console Armrest"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "Flat-bottom steering wheel", "Digital Cluster"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Wheel Covers", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "LED High Mounted Stop Lamp",
              "Body Coloured Bumpers", "Body Coloured Door Handles"
            ],
            "tyre": {
              "size": "185/65 R15",
              "type": "Radial Tubeless",
              "wheelSize": "15 Inch"
            },
            "bootOpening": "Electronic"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "Hill Assist", "2 Airbags (Dual Front)", "ISOFIX Mounts",
              "Anti-Theft Alarm", "Rear Camera (with guidlines)", "Seat Belt Warning",
              "Door Ajar Warning", "Engine Immobilizer", "Speed Sensing Auto Door Lock",
              "Pretensioners & Load Limiters"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "7-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4 Speakers",
              "USB Ports", "Inbuilt Apps"
            ]
          },
          "adasFeatures": {
            "features": [
              "N/A (Generally not available in this segment)"
            ]
          },
          "internetFeatures": {
            "features": [
              "N/A (SmartPlay Studio App Connectivity on higher variants)"
            ]
          }
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
        "vehicleInfo": {
          "model": "Baleno",
          "manufacturer": "Maruti Suzuki",
          "year": 2024,
          "price": "₹ 8.38 - 8.93 Lakh (ex-showroom)",
          "engineAndTransmission": {
            "engineType": "1.2L K Series Dualjet, Dual VVT",
            "displacement": "1197 cc",
            "maxPower": "88.50 bhp @ 6000 rpm",
            "maxTorque": "113 Nm @ 4400 rpm",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (AMT)",
            "gearbox": "5-Speed",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG",
            "mileage": "22.35 - 22.94 kmpl (Petrol, ARAI) / 30.61 km/kg (CNG)",
            "fuelTankCapacity": "37 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Rear Twist Beam",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "4.85 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3990 mm",
            "width": "1745 mm",
            "height": "1500 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2520 mm",
            "numberOfDoors": 5,
            "bootSpace": "318 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
              "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Voice Commands", "Automatic Headlamps", "Hands-Free Tailgate (Manual boot opening)",
              "Central Console Armrest (With Storage)", "Push Button Start/Stop"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "D-Cut steering wheel", "Digital Cluster",
              "Dual tone gray interiors", "Adjustable Headrests"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
              "LED High Mounted Stop Lamp", "Chrome Grille", "Body Coloured ORVMs"
            ],
            "tyre": {
              "size": "195/55 R16",
              "type": "Radial Tubeless",
              "wheelSize": "16 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags", "ISOFIX Mounts",
              "Anti-Theft Alarm", "Rear Camera (with guided lines)", "TPMS",
              "Day & Night Rear View Mirror", "Pretensioners & Load Limiters",
              "Speed Sensing Auto Door Lock", "Door Ajar Warning", "Seat Belt Warning",
              "Anti-Pinch Power Windows (Driver)", "Speed Alert", "Engine Immobilizer"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "9-inch Touchscreen SmartPlay Pro+ Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4 Speakers + 2 Tweeters",
              "USB Ports", "Onboard Voice Assistant", "Wireless Phone Charging"
            ]
          },
          "adasFeatures": {
            "features": [
              "360 Degree Camera", "Heads-Up Display"
            ]
          },
          "internetFeatures": {
            "features": [
              "NEXT GENERATION SUZUKI CONNECT (40+ connected car features)",
              "Remote Control (through Smartplay Studio App)", "Live Traffic Update (Through Smartplay Studio App)",
              "Live Location", "Over the Air Updates", "Smartwatch App"
            ]
          }
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
        "vehicleInfo": {
          "model": "Dzire ZXi",
          "manufacturer": "Maruti Suzuki",
          "year": 2024,
          "price": "₹ 8.94 - 9.44 Lakh (ex-showroom)",
          "engineAndTransmission": {
            "engineType": "1.2L DualJet (Z Series)",
            "displacement": "1197 cc",
            "maxPower": "80 bhp @ 5700 rpm",
            "maxTorque": "112 Nm @ 4300 rpm",
            "cylinders": 3,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (AMT)",
            "gearbox": "5-Speed",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG",
            "mileage": "24.79 - 25.71 kmpl (Petrol, ARAI) / 33.73 km/kg (CNG)",
            "fuelTankCapacity": "37 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Torsion Beam",
            "steeringType": "Electric",
            "steeringColumn": "Tilt",
            "turningRadius": "4.8 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3995 mm",
            "width": "1735 mm",
            "height": "1515 mm",
            "seatingCapacity": 5,
            "groundClearance": "163 mm",
            "wheelBase": "2450 mm",
            "numberOfDoors": 4,
            "bootSpace": "378 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front)", "Rear Seat Centre Arm Rest",
              "Cooled Glovebox", "Vanity Mirror", "Trunk Light", "Map Lamps",
              "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Rear Accessory Socket with Mobile Pocket"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "Dual tone beige-black interiors", "D-Cut steering wheel",
              "Digital Cluster"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Defogger", "Alloy Wheels", "Power Antenna",
              "Outside Mirror Turn Indicators", "LED High Mounted Stop Lamp",
              "Body Coloured Door Handles", "Chrome Finish Front Fog Lamp Garnish"
            ],
            "tyre": {
              "size": "185/65 R15",
              "type": "Radial Tubeless",
              "wheelSize": "15 Inch"
            },
            "bootOpening": "Electromagnetic"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags", "ISOFIX Mounts",
              "Anti-Theft Alarm", "Rear Camera (with guidlines)", "Seat Belt Warning",
              "Door Ajar Warning", "Engine Immobilizer", "Speed Sensing Auto Door Lock",
              "Pretensioners & Load Limiters", "Bharat NCAP 5-Star Safety Rating"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "9-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "4 Speakers",
              "USB Ports", "Inbuilt Apps", "Wireless Phone Charging"
            ]
          },
          "adasFeatures": {
            "features": [
              "N/A (Generally not available in this segment)"
            ]
          },
          "internetFeatures": {
            "features": [
              "N/A (SmartPlay Pro+ Connectivity on higher variants)"
            ]
          }
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
        "vehicleInfo": {
          "model": "Ertiga ZXi",
          "manufacturer": "Maruti Suzuki",
          "year": 2024,
          "price": "₹ 11.15 - 12.55 Lakh (ex-showroom)",
          "engineAndTransmission": {
            "engineType": "1.5L K15C Smart Hybrid",
            "displacement": "1462 cc",
            "maxPower": "101.64 bhp @ 6000 rpm",
            "maxTorque": "139 Nm @ 4300 rpm",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (Torque Converter)",
            "gearbox": "5-Speed (MT) / 6-Speed (AT)",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG",
            "mileage": "20.3 - 20.51 kmpl (Petrol, ARAI) / 26.11 km/kg (CNG)",
            "fuelTankCapacity": "45 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Torsion Beam",
            "steeringType": "Electric",
            "steeringColumn": "Tilt",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "4395 mm",
            "width": "1735 mm",
            "height": "1690 mm",
            "seatingCapacity": 7,
            "groundClearance": "180 mm",
            "wheelBase": "2740 mm",
            "numberOfDoors": 5,
            "bootSpace": "209 Litres (all seats up)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (2nd & 3rd Row)", "60:40 Split 2nd Row Seat",
              "50:50 Split 3rd Row Seat", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
              "Paddle Shifters (AT)", "Air Cooled Twin Cup Holders"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Plush Dual-Tone Seat Fabric", "Metallic Teak-Wooden Finish on Door Trims",
              "3rd Row 50:50 Split Seats with Recline function", "D-Cut steering wheel"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
              "LED High Mounted Stop Lamp", "Dynamic Chrome Winged Front Grille",
              "New Back Door Garnish with Chrome Insert", "Chrome Plated Door Handles"
            ],
            "tyre": {
              "size": "185/65 R15",
              "type": "Radial Tubeless",
              "wheelSize": "15 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags", "ISOFIX Mounts",
              "Anti-Theft Alarm", "Rear Camera (with guided lines)", "Seat Belt Warning",
              "Door Ajar Warning", "Engine Immobilizer", "Speed Alert", "Speed Sensing Auto Door Lock",
              "Pretensioners & Force Limiters", "Global NCAP 3-Star Safety Rating"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "7-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4 Speakers",
              "USB Ports", "Inbuilt Apps", "ARKAMYS Sound System"
            ]
          },
          "adasFeatures": {
            "features": [
              "N/A (Generally not available in this segment)"
            ]
          },
          "internetFeatures": {
            "features": [
              "SUZUKI CONNECT (40+ connected car features)", "Overspeed Alert", "Live Location",
              "Stolen Vehicle Notification and Tracking", "SOS Button"
            ]
          }
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
        "vehicleInfo": {
          "model": "Brezza ZXi+",
          "manufacturer": "Maruti Suzuki",
          "year": 2024,
          "price": "₹ 12.48 - 14.14 Lakh (ex-showroom)",
          "engineAndTransmission": {
            "engineType": "1.5L K15C Smart Hybrid",
            "displacement": "1462 cc",
            "maxPower": "101.64 bhp @ 6000 rpm",
            "maxTorque": "136.8 Nm @ 4400 rpm",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (Torque Converter)",
            "gearbox": "5-Speed (MT) / 6-Speed (AT)",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG",
            "mileage": "17.38 - 19.89 kmpl (Petrol, ARAI) / 25.51 km/kg (CNG)",
            "fuelTankCapacity": "48 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut & Coil",
            "rearSuspension": "Torsion Beam & Coil Spring",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "5.3 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3995 mm",
            "width": "1790 mm",
            "height": "1685 mm",
            "seatingCapacity": 5,
            "groundClearance": "198 mm",
            "wheelBase": "2500 mm",
            "numberOfDoors": 5,
            "bootSpace": "328 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
              "Cooled Glovebox", "Vanity Mirror", "Trunk Light", "Map Lamps",
              "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Hands-Free Tailgate (Manual boot opening)",
              "Central Console Armrest (With Storage)", "Paddle Shifters (AT)",
              "Rear Center Armrest with Cupholder", "Front Footwell Illumination"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "Flat Bottom Steering Wheel", "Rear Parcel Tray",
              "Dual Tone Interior Theme", "Chrome Plated Inside Door Handles", "Door Armrest With Fabric"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
              "LED High Mounted Stop Lamp", "Precision Cut Alloy Wheels", "Chrome Accentuated Front Grille",
              "Wheel Arch Cladding", "Side Under Body Cladding", "Front & Rear Silver Skid Plate"
            ],
            "tyre": {
              "size": "215/60 R16",
              "type": "Radial Tubeless",
              "wheelSize": "16 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags", "ISOFIX Mounts",
              "Anti-Theft Alarm", "Rear Camera", "TPMS", "Day & Night Rear View Mirror",
              "Pretensioners & Load Limiters", "Speed Sensing Auto Door Lock",
              "Door Ajar Warning", "Seat Belt Warning", "Engine Immobilizer",
              "Impact Sensing Auto Door Unlock", "Anti-Pinch Power Windows (Driver)"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "9-inch Touchscreen SmartPlay Pro+ Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "4 Speakers + 2 Tweeters",
              "USB Ports", "Inbuilt Apps", "Wireless Phone Charging", "ARKAMYS Surround Sense Sound System"
            ]
          },
          "adasFeatures": {
            "features": [
              "360 View Camera", "Heads-Up Display"
            ]
          },
          "internetFeatures": {
            "features": [
              "SUZUKI CONNECT (Breakdown notification, Stolen Vehicle Notification and Tracking, Safe Time Alert, Headlight Off, Hazard Lights On/Off, Alarm On/Off, Low Fuel & Low Range Alert, AC Idling, Door & Lock Status)"
            ]
          }
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
        "vehicleInfo": {
          "model": "Grand Vitara Zeta+ Hybrid",
          "manufacturer": "Maruti Suzuki",
          "year": 2024,
          "price": "₹ 18.60 - 19.36 Lakh (ex-showroom)",
          "engineAndTransmission": {
            "engineType": "1.5L M15D Strong Hybrid",
            "displacement": "1490 cc",
            "maxPower": "91.18 bhp @ 5500 rpm (Engine) + Electric Motor",
            "maxTorque": "122 Nm @ 3800-4800 rpm (Engine) + Electric Motor",
            "cylinders": 3,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Automatic (e-CVT)",
            "gearbox": "E-CVT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Hybrid (Petrol + Electric)",
            "mileage": "27.97 kmpl (ARAI)",
            "fuelTankCapacity": "45 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Rear Twist Beam",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "5.4 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4345 mm",
            "width": "1795 mm",
            "height": "1645 mm",
            "seatingCapacity": 5,
            "groundClearance": "210 mm",
            "wheelBase": "2600 mm",
            "numberOfDoors": 5,
            "bootSpace": "373 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
              "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
              "Front Ventilated Seats", "Puddle Lamps", "Soft Touch IP with Premium Stitch"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "All Black Interior with Champagne Gold Accents",
              "Chrome Inside Door Handle", "Ambient Lighting Door Spot & IP Line"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
              "LED High Mounted Stop Lamp", "Panoramic Sunroof", "Chrome Finish on Grille"
            ],
            "tyre": {
              "size": "215/60 R17",
              "type": "Radial Tubeless",
              "wheelSize": "17 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags", "ISOFIX Mounts",
              "Anti-Theft Alarm", "Rear Camera (with guided lines)", "TPMS",
              "Day & Night Rear View Mirror", "Pretensioners & Load Limiters",
              "Speed Sensing Auto Door Lock", "Door Ajar Warning", "Seat Belt Warning",
              "Engine Immobilizer", "Impact Sensing Auto Door Unlock", "360-degree camera"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "9-inch Touchscreen SmartPlay Pro+ Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "4 Speakers + 2 Tweeters",
              "USB Ports", "Inbuilt Apps", "Wireless Phone Charging", "ARKAMYS Sound Tuning"
            ]
          },
          "adasFeatures": {
            "features": [
              "360 Degree Camera", "Heads-Up Display"
            ]
          },
          "internetFeatures": {
            "features": [
              "SUZUKI CONNECT (Overspeed, Seatbelt, Geofence, Time Fence, Valet, Tow Away, Live Location, Stolen Vehicle Tracking, Remote Immobiliation, Vehicle Health Status, Breakdown Notification, E-Call & I-Call, Over the Air Updates)"
            ]
          }
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
        "vehicleInfo": {
          "model": "Creta",
          "manufacturer": "Hyundai",
          "year": 2024,
          "price": "₹ 11.00 - 20.50 Lakh (ex-showroom, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.5L MPi Petrol / 1.5L Turbo GDi Petrol / 1.5L CRDi Diesel",
            "displacement": "1497 cc (MPi Petrol) / 1482 cc (Turbo Petrol) / 1493 cc (Diesel)",
            "maxPower": "113.45 bhp @ 6300 rpm (MPi Petrol) / 157.8 bhp @ 5500 rpm (Turbo Petrol) / 113.98 bhp @ 4000 rpm (Diesel)",
            "maxTorque": "143.8 Nm @ 4500 rpm (MPi Petrol) / 253 Nm @ 1500-3500 rpm (Turbo Petrol) / 250 Nm @ 1500-2750 rpm (Diesel)",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi / GDi / CRDi",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (IVT/DCT/Torque Converter)",
            "gearbox": "6-speed MT / IVT / 7-speed DCT / 6-speed AT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "17.4 - 21.8 kmpl (ARAI, varies by engine/transmission)",
            "fuelTankCapacity": "50 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with Coil Spring",
            "rearSuspension": "Coupled Torsion Beam Axle (CTBA) with Coil Spring",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "5.2 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4330 mm",
            "width": "1790 mm",
            "height": "1635 mm",
            "seatingCapacity": 5,
            "groundClearance": "190 mm",
            "wheelBase": "2610 mm",
            "numberOfDoors": 5,
            "bootSpace": "433 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
              "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
              "Front Ventilated Seats", "Puddle Lamps", "8-Way Power Driver Seat",
              "Electronic Parking Brake with Auto Hold", "Air Purifier", "Connected Car Tech (Bluelink)"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Leatherette Upholstery", "Ambient Lighting", "Metal Finish Inside Door Handle"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "LED Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
              "LED High Mounted Stop Lamp", "Panoramic Sunroof", "Chrome Finish on Grille",
              "Twin-tip Exhaust (Turbo)"
            ],
            "tyre": {
              "size": "215/60 R17",
              "type": "Radial Tubeless",
              "wheelSize": "17 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "VSM", "Hill-Start Assist Control (HAC)", "6 Airbags (Standard)",
              "ISOFIX Mounts", "Anti-Theft Alarm", "Rear Camera (with dynamic guidelines)", "TPMS",
              "Day & Night Rear View Mirror", "Pretensioners & Load Limiters",
              "Speed Sensing Auto Door Lock", "Door Ajar Warning", "Seat Belt Warning (All Seats)",
              "Engine Immobilizer", "Impact Sensing Auto Door Unlock", "All 4 Disc Brakes"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.25-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "Bose Premium Sound System (8 Speakers)",
              "USB Ports", "Inbuilt Navigation", "Wireless Phone Charging", "Voice Recognition",
              "Connected Car Tech (Bluelink)"
            ]
          },
          "adasFeatures": {
            "features": [
              "Forward Collision-Avoidance Assist (FCA) - Car, Pedestrian, Cycle, Junction Turning",
              "Blind-Spot Collision-Avoidance Assist (BCA) & Blind-spot Collision Warning (BCW)",
              "Lane Keeping Assist (LKA)", "Lane Departure Warning (LDW)", "High Beam Assist (HBA)",
              "Driver Attention Warning (DAW)", "Safe Exit Warning (SEW)",
              "Smart Cruise Control with Stop & Go (SCC with S&G)", "Lane Following Assist (LFA)",
              "Leading Vehicle Departure Alert (LVDA)",
              "Rear Cross-Traffic Collision-Avoidance Assist (RCCA) & Rear Cross-Traffic Collision Warning (RCCW)",
              "Surround View Monitor (SVM)", "Blind-spot View Monitor (BVM)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Bluelink Connected Features (60+ features)",
              "Over-the-Air (OTA) Updates", "Remote Engine Start/Stop", "Remote Climate Control",
              "Geo-Fence Alert", "Time Fence Alert", "Stolen Vehicle Tracking", "Valet Mode"
            ]
          }
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
        "vehicleInfo": {
          "model": "Aura",
          "manufacturer": "Hyundai",
          "year": 2024,
          "price": "₹ 6.70 - 9.30 Lakh (ex-showroom, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.2L Kappa Petrol / 1.2L Bi-Fuel (Petrol + CNG)",
            "displacement": "1197 cc",
            "maxPower": "82 bhp @ 6000 rpm (Petrol) / 68 bhp @ 6000 rpm (CNG)",
            "maxTorque": "113.8 Nm @ 4000 rpm (Petrol) / 95.2 Nm @ 4000 rpm (CNG)",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (AMT)",
            "gearbox": "5-speed MT / 5-speed AMT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG",
            "mileage": "20.30 kmpl (Petrol, ARAI) / 28.00 km/kg (CNG, ARAI)",
            "fuelTankCapacity": "37 Litres (Petrol) / 65 Litres (CNG)",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Coupled Torsion Beam Axle",
            "steeringType": "Electric",
            "steeringColumn": "Tilt",
            "turningRadius": "4.9 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3995 mm",
            "width": "1680 mm",
            "height": "1520 mm",
            "seatingCapacity": 5,
            "groundClearance": "165 mm",
            "wheelBase": "2450 mm",
            "numberOfDoors": 4,
            "bootSpace": "402 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front & Rear)", "Bench Folding Rear Seat",
              "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Central Console Armrest (With Storage)", "Wireless Phone Charger"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "Premium Glossy Black Inserts", "Footwell Lighting",
              "Chrome Finish (Gear Knob, Parking Lever Tip)", "Metal Finish Inside Door Handles"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Defogger", "Alloy Wheels", "Body Colored Bumpers & ORVMs",
              "Chrome Outside Door Handles", "B-Pillar Blackout", "Rear Chrome Garnish"
            ],
            "tyre": {
              "size": "175/60 R15",
              "type": "Radial Tubeless",
              "wheelSize": "15 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags (Standard)", "ISOFIX Child Seat Mounts",
              "Anti-Theft Engine Immobilizer", "Rear Parking Sensors", "Rear Camera", "TPMS (Higher Variants)",
              "Day/Night Rearview Mirror", "Seat Belt Warning", "Child Lock", "Overspeed Warning",
              "Speed Sensing Door Lock", "Middle Rear Three-Point Seatbelt", "Central Locking",
              "Impact Sensing Auto Door Unlock"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "8-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Voice Recognition"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": []
          }
        }
      },
      {
        "id": "hyundai-i20",
        "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/i20-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
        "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hyundai_logo.svg/1200px-Hyundai_logo.svg.png",
        "title": "Hyundai i20",
        "link": "https://www.cardekho.com/hyundai/i20/specifications.htm",
        "description": "The Hyundai i20 is a premium hatchback known for its stylish design, feature-rich cabin, and comfortable ride quality. The N Line variant offers a sportier experience.",
        "buttonText": "View Details",
        "vehicleInfo": {
          "model": "i20 (Standard)",
          "manufacturer": "Hyundai",
          "year": 2024,
          "price": "₹ 7.70 - 11.50 Lakh (ex-showroom, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.2L Kappa Petrol",
            "displacement": "1197 cc",
            "maxPower": "82 bhp @ 6000 rpm",
            "maxTorque": "114.7 Nm @ 4200 rpm",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (IVT)",
            "gearbox": "5-speed MT / IVT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "19.65 - 20.35 kmpl (ARAI)",
            "fuelTankCapacity": "37 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Coupled Torsion Beam Axle",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "5.2 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3995 mm",
            "width": "1775 mm",
            "height": "1505 mm",
            "seatingCapacity": 5,
            "groundClearance": "170 mm",
            "wheelBase": "2580 mm",
            "numberOfDoors": 5,
            "bootSpace": "311 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
              "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
              "Wireless Phone Charger", "Electric Sunroof (top variants)"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Leatherette Upholstery (Higher Variants)", "Ambient Lighting",
              "Chrome Inside Door Handle", "Metal Finish on Interior Elements"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
              "LED High Mounted Stop Lamp", "Chrome Beltline", "Parametric Jewel Pattern Grille"
            ],
            "tyre": {
              "size": "195/55 R16",
              "type": "Radial Tubeless",
              "wheelSize": "16 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "Hill Start Assist Control (HAC)", "6 Airbags (Standard on higher trims)",
              "ISOFIX Mounts", "Rear Parking Sensors", "Rear Camera", "TPMS",
              "Day & Night Rear View Mirror", "Speed Sensing Auto Door Lock",
              "Door Ajar Warning", "Seat Belt Warning", "Engine Immobilizer", "Impact Sensing Auto Door Unlock"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.25-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "Bose Premium Sound System",
              "USB Ports", "Inbuilt Navigation", "Wireless Phone Charging", "Voice Recognition",
              "Connected Car Tech (Bluelink)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": [
              "Bluelink Connected Car Technology",
              "Remote Vehicle Control", "Live Location Tracking", "Geo-fence Alert"
            ]
          }
        }
      },
      {
        "id": "hyundai-i20-n-line",
        "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/i20-n-line-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
        "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hyundai_logo.svg/1200px-Hyundai_logo.svg.png",
        "title": "Hyundai i20 N Line",
        "link": "https://www.cardekho.com/hyundai/i20-n-line/specifications.htm",
        "description": "The Hyundai i20 N Line is the sportier variant of the i20 hatchback, offering a more powerful turbo-petrol engine, revised suspension, and distinctive N Line styling.",
        "buttonText": "View Details",
        "vehicleInfo": {
          "model": "i20 N Line",
          "manufacturer": "Hyundai",
          "year": 2024,
          "price": "₹ 10.20 - 12.50 Lakh (ex-showroom, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.0L Turbo GDi Petrol",
            "displacement": "998 cc",
            "maxPower": "118 bhp @ 6000 rpm",
            "maxTorque": "172 Nm @ 1500-4000 rpm",
            "cylinders": 3,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "GDi",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (DCT)",
            "gearbox": "6-speed MT / 7-speed DCT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "20.0 - 20.25 kmpl (ARAI)",
            "fuelTankCapacity": "37 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut (Sportier Tuning)",
            "rearSuspension": "Coupled Torsion Beam Axle (Sportier Tuning)",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "5.2 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc (All-Wheel Disc Brakes)"
          },
          "dimensionsAndCapacity": {
            "length": "3995 mm",
            "width": "1775 mm",
            "height": "1505 mm",
            "seatingCapacity": 5,
            "groundClearance": "170 mm",
            "wheelBase": "2580 mm",
            "numberOfDoors": 5,
            "bootSpace": "311 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
              "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
              "Wireless Phone Charger", "Electric Sunroof (top variants)", "Metal Pedals"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "All Black Interior with Red Accents", "Glove Box",
              "Leatherette Upholstery with Red Stitching", "N Line Specific Gear Knob",
              "Leatherette Wrapped Steering Wheel with Red Stitching", "Ambient Lighting",
              "Chrome Inside Door Handle"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler (N Line Specific)", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Alloy Wheels (N Line Specific)", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
              "LED High Mounted Stop Lamp", "N Line Specific Front & Rear Bumpers",
              "Dark Chrome Front Grille", "Twin-Tip Exhaust"
            ],
            "tyre": {
              "size": "195/55 R16",
              "type": "Radial Tubeless",
              "wheelSize": "16 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "Hill Start Assist Control (HAC)", "6 Airbags (Standard on higher trims)",
              "ISOFIX Mounts", "Rear Parking Sensors", "Rear Camera", "TPMS",
              "Day & Night Rear View Mirror", "Speed Sensing Auto Door Lock",
              "Door Ajar Warning", "Seat Belt Warning", "Engine Immobilizer", "Impact Sensing Auto Door Unlock",
              "All-Wheel Disc Brakes"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.25-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "Bose Premium Sound System",
              "USB Ports", "Inbuilt Navigation", "Wireless Phone Charging", "Voice Recognition",
              "Connected Car Tech (Bluelink)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": [
              "Bluelink Connected Car Technology",
              "Remote Vehicle Control", "Live Location Tracking", "Geo-fence Alert"
            ]
          }
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
        "vehicleInfo": {
          "model": "Venue",
          "manufacturer": "Hyundai",
          "year": 2024,
          "price": "₹ 8.10 - 13.70 Lakh (ex-showroom, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.2L Kappa Petrol / 1.0L Turbo GDi Petrol / 1.5L CRDi Diesel",
            "displacement": "1197 cc (1.2L Petrol) / 998 cc (1.0L Turbo Petrol) / 1493 cc (Diesel)",
            "maxPower": "82 bhp @ 6000 rpm (1.2L Petrol) / 118 bhp @ 6000 rpm (1.0L Turbo Petrol) / 114 bhp @ 4000 rpm (Diesel)",
            "maxTorque": "114 Nm @ 4000 rpm (1.2L Petrol) / 172 Nm @ 1500-4000 rpm (1.0L Turbo Petrol) / 250 Nm @ 1500-2750 rpm (Diesel)",
            "cylinders": "4(1.2L, 1.5L) / 3(1.0L)",
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi / GDi / CRDi",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (iMT/DCT)",
            "gearbox": "5-speed MT / 6-speed MT / 6-speed iMT / 7-speed DCT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "17.5 - 23.4 kmpl (ARAI, varies by engine/transmission)",
            "fuelTankCapacity": "45 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with Coil Spring",
            "rearSuspension": "Coupled Torsion Beam Axle with Coil Spring",
            "steeringType": "Electric",
            "steeringColumn": "Tilt",
            "turningRadius": "5.0 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3995 mm",
            "width": "1770 mm",
            "height": "1617 mm",
            "seatingCapacity": 5,
            "groundClearance": "195 mm",
            "wheelBase": "2500 mm",
            "numberOfDoors": 5,
            "bootSpace": "350 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
              "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
              "Electric Sunroof", "Wireless Phone Charger", "Air Purifier", "Drive Modes"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "Leatherette Wrapped Gear Knob", "Metal Finish Inside Door Handles",
              "Digital Instrument Cluster"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "LED Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
              "LED High Mounted Stop Lamp", "Dark Chrome Front Grille", "Cornering Lamps"
            ],
            "tyre": {
              "size": "215/60 R16",
              "type": "Radial Tubeless",
              "wheelSize": "16 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "VSM", "Hill Start Assist Control (HAC)", "6 Airbags (Standard)",
              "ISOFIX Mounts", "Rear Parking Sensors", "Rear Camera", "TPMS (Highline)",
              "Day & Night Rear View Mirror", "Speed Sensing Auto Door Lock",
              "Door Ajar Warning", "Seat Belt Warning (All Seats)", "Engine Immobilizer", "Impact Sensing Auto Door Unlock"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "8-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Inbuilt Navigation",
              "Wireless Phone Charging", "Voice Recognition", "Connected Car Tech (Bluelink)",
              "Dashcam with Dual Camera (top variants)"
            ]
          },
          "adasFeatures": {
            "features": [
              "Forward Collision Warning (FCW)", "Forward Collision-Avoidance Assist (FCA) - Car, Pedestrian, Cycle",
              "Lane Keeping Assist (LKA)", "Lane Departure Warning (LDW)", "High Beam Assist (HBA)",
              "Driver Attention Warning (DAW)", "Leading Vehicle Departure Alert (LVDA)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Bluelink Connected Features (60+ features)",
              "Over-the-Air (OTA) Updates", "Remote Engine Start/Stop", "Remote Climate Control",
              "Geo-Fence Alert", "Time Fence Alert", "Stolen Vehicle Tracking", "Valet Mode"
            ]
          }
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
        "vehicleInfo": {
          "model": "Verna",
          "manufacturer": "Hyundai",
          "year": 2024,
          "price": "₹ 11.20 - 17.50 Lakh (ex-showroom, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.5L MPi Petrol / 1.5L Turbo GDi Petrol",
            "displacement": "1497 cc (MPi Petrol) / 1482 cc (Turbo Petrol)",
            "maxPower": "113.45 bhp @ 6300 rpm (MPi Petrol) / 157.8 bhp @ 5500 rpm (Turbo Petrol)",
            "maxTorque": "144 Nm @ 4500 rpm (MPi Petrol) / 253 Nm @ 1500-3500 rpm (Turbo Petrol)",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi / GDi",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (IVT/DCT)",
            "gearbox": "6-speed MT / IVT / 7-speed DCT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "18.6 - 20.6 kmpl (ARAI, varies by engine/transmission)",
            "fuelTankCapacity": "45 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with Coil Spring",
            "rearSuspension": "Coupled Torsion Beam Axle",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "5.2 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc (All 4 disc brakes)"
          },
          "dimensionsAndCapacity": {
            "length": "4535 mm",
            "width": "1765 mm",
            "height": "1475 mm",
            "seatingCapacity": 5,
            "groundClearance": "170 mm",
            "wheelBase": "2670 mm",
            "numberOfDoors": 4,
            "bootSpace": "528 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control (Dual-zone)", "Rear AC Vents",
              "Cruise Control", "Front & Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front & Rear - C-Type)", "Bench Seat (Rear)",
              "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
              "Front Ventilated & Heated Seats", "Puddle Lamps", "Power Driver Seat",
              "Smart Trunk Feature", "Rear Manual Curtain", "Wireless Phone Charger"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Beige & Black Interiors (Standard) / Sporty Black with Red Accents (Turbo)",
              "Glove Box", "Leatherette Upholstery", "Leather Wrapped Steering Wheel & Gear Knob",
              "Ambient Lighting (Dashboard & Door Trims)", "Premium Layered Dashboard Design with Soft Touch Finish",
              "Digital Instrument Cluster"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "LED Headlamps", "Horizon LED Positioning Lamp & DRLs", "Parametric Connected LED Tail Lamps",
              "Rear Window Defogger", "Alloy Wheels", "Power Antenna", "Shark Fin Antenna",
              "Outside Mirror Turn Indicators", "Chrome Window Beltline", "Satin Chrome Outside Door Handles",
              "Black Chrome Parametric Radiator Grille", "LED High Mounted Stop Lamp"
            ],
            "tyre": {
              "size": "195/65 R15 (Lower Variants) / 205/55 R16 (Higher Variants)",
              "type": "Radial Tubeless",
              "wheelSize": "15 / 16 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "ESC", "VSM", "Hill-Start Assist Control (HAC)", "6 Airbags (Standard across all variants)",
              "ISOFIX Child Seat Mounts", "Anti-Theft Alarm", "Rear Camera (with dynamic guidelines)", "TPMS (Highline)",
              "Day & Night Rear View Mirror", "Pretensioners & Load Limiters",
              "Speed Sensing Auto Door Lock", "Door Ajar Warning", "Seat Belt Reminder (All Seats)",
              "Engine Immobilizer", "Impact Sensing Auto Door Unlock", "All 4 Disc Brakes"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.25-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "Bose Premium Sound System",
              "USB Ports (C-Type)", "Inbuilt Navigation", "Wireless Phone Charging", "Voice Recognition",
              "Connected Car Tech (Bluelink)", "Switchable Type Infotainment & Climate Controller"
            ]
          },
          "adasFeatures": {
            "features": [
              "Forward Collision-Avoidance Assist (FCA) - Car, Pedestrian, Cycle",
              "Blind-spot Collision-Avoidance Assist (BCA) & Blind-spot Collision Warning (BCW)",
              "Lane Keeping Assist (LKA)", "Lane Departure Warning (LDW)", "Driver Attention Warning (DAW)",
              "Smart Cruise Control With Stop & Go (SCC with S&G)", "Lane Following Assist (LFA)",
              "Leading Vehicle Departure Alert (LVDA)", "Rear Cross-Traffic Collision-Avoidance Assist (RCCA) & Rear Cross-Traffic Collision Warning (RCCW)",
              "High Beam Assist (HBA)", "Safe Exit Warning (SEW)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Bluelink Connected Features (65+ features)",
              "Over-the-Air (OTA) Map Updates", "Remote Engine Start/Stop", "Remote Climate Control",
              "Geo-Fence Alert", "Time Fence Alert", "Stolen Vehicle Tracking", "Valet Mode",
              "Vehicle Health Status", "E-Call & I-Call"
            ]
          }
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
        "vehicleInfo": {
          "model": "Amaze",
          "manufacturer": "Honda",
          "year": 2024,
          "price": "₹ 9.38 - 13.13 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.2L i-VTEC Petrol",
            "displacement": "1199 cc",
            "maxPower": "89.30 bhp @ 6000 rpm",
            "maxTorque": "110 Nm @ 4800 rpm",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "SOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (CVT)",
            "gearbox": "5-Speed MT / CVT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "18.6 - 19.46 kmpl (ARAI)",
            "fuelTankCapacity": "35 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Torsion Beam",
            "steeringType": "Electric",
            "steeringColumn": "Tilt",
            "turningRadius": "4.7 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3995 mm",
            "width": "1695 mm",
            "height": "1498 mm",
            "seatingCapacity": 5,
            "groundClearance": "165 mm",
            "wheelBase": "2470 mm",
            "numberOfDoors": 4,
            "bootSpace": "416 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front)", "Rear Seat Centre Arm Rest",
              "Cooled Glovebox", "Vanity Mirror", "Trunk Light",
              "Voice Commands", "Paddle Shifters (CVT)", "Rear Power Outlet"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "Piano Black / Silver Inserts", "Front & Rear Power Windows"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Defogger", "Alloy Wheels", "Power Antenna",
              "Outside Mirror Turn Indicators", "Chrome Finish on Grille & Door Handles",
              "Body Coloured Bumpers & ORVMs"
            ],
            "tyre": {
              "size": "175/65 R15",
              "type": "Radial Tubeless",
              "wheelSize": "15 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "Brake Assist", "Dual Airbags", "ISOFIX Mounts",
              "Rear Camera (with guidelines)", "Seat Belt Warning", "Door Ajar Warning",
              "Engine Immobilizer", "Speed Sensing Auto Door Lock", "Impact Sensing Auto Door Unlock",
              "Rear Parking Camera", "Rear Defogger"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "7-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Voice Recognition"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": []
          }
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
        "vehicleInfo": {
          "model": "City",
          "manufacturer": "Honda",
          "year": 2024,
          "price": "₹ 14.44 - 19.73 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.5L i-VTEC DOHC Petrol",
            "displacement": "1498 cc",
            "maxPower": "119.34 bhp @ 6600 rpm",
            "maxTorque": "145 Nm @ 4300 rpm",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (CVT)",
            "gearbox": "6-Speed MT / CVT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "17.8 - 18.4 kmpl (ARAI)",
            "fuelTankCapacity": "40 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with Coil Spring",
            "rearSuspension": "Torsion Beam with Coil Spring",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "5.3 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "4574 mm",
            "width": "1748 mm",
            "height": "1489 mm",
            "seatingCapacity": 5,
            "groundClearance": "165 mm",
            "wheelBase": "2600 mm",
            "numberOfDoors": 4,
            "bootSpace": "506 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front & Rear)", "Rear Seat Centre Arm Rest",
              "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
              "One-Touch Electric Sunroof", "Paddle Shifters (CVT)", "Rear Sunshade"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Beige & Black Dashboard", "Glove Box",
              "Leatherette Upholstery", "Ambient Lighting", "Soft-Touch Dashboard with Stitching"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "LED Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Defogger", "Alloy Wheels", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Chrome Grille",
              "Body Coloured Door Handles", "Chrome Window Line Garnish"
            ],
            "tyre": {
              "size": "185/55 R16",
              "type": "Radial Tubeless",
              "wheelSize": "16 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "Brake Assist", "ESC", "Hill Start Assist", "6 Airbags", "ISOFIX Mounts",
              "Rear Parking Sensors", "Rear Camera (Multi-angle)", "TPMS",
              "Day & Night Rear View Mirror", "Speed Sensing Auto Door Lock",
              "Door Ajar Warning", "Seat Belt Warning", "Engine Immobilizer", "Impact Sensing Auto Door Unlock",
              "Lane Watch Camera (Right ORVM)"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "8-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "8 Speakers", "USB Ports", "Voice Recognition",
              "Weblink (Connected Car Technology)"
            ]
          },
          "adasFeatures": {
            "features": [
              "Collision Mitigation Braking System (CMBS)", "Road Departure Mitigation System (RDM)",
              "Lane Keeping Assist System (LKAS)", "Adaptive Cruise Control (ACC)",
              "Auto High-Beam (AHB)", "Lead Car Departure Notification System (LCDN)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Honda Connect (Connected Car Technology)", "Remote Functions", "Live Car Location",
              "Geo-Fence Alert", "Stolen Vehicle Tracking", "Emergency Call (e-Call)"
            ]
          }
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
        "vehicleInfo": {
          "model": "Elevate",
          "manufacturer": "Honda",
          "year": 2024,
          "price": "₹ 14.04 - 20.04 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.5L i-VTEC DOHC Petrol",
            "displacement": "1498 cc",
            "maxPower": "119.35 bhp @ 6600 rpm",
            "maxTorque": "145 Nm @ 4300 rpm",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (CVT)",
            "gearbox": "6-Speed MT / CVT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "15.31 - 16.92 kmpl (ARAI)",
            "fuelTankCapacity": "40 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Torsion Beam Axle",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "5.2 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "4312 mm",
            "width": "1790 mm",
            "height": "1650 mm",
            "seatingCapacity": 5,
            "groundClearance": "220 mm",
            "wheelBase": "2650 mm",
            "numberOfDoors": 5,
            "bootSpace": "458 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
              "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
              "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
              "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
              "One-Touch Electric Sunroof", "Wireless Phone Charger", "LaneWatch Camera"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Leatherette Upholstery", "Soft-Touch Dashboard", "Chrome Inside Door Handles",
              "Digital Instrument Cluster"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "LED Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
              "LED High Mounted Stop Lamp", "Bold Front Grille", "Body Cladding"
            ],
            "tyre": {
              "size": "215/55 R17",
              "type": "Radial Tubeless",
              "wheelSize": "17 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "Brake Assist", "ESC", "Hill Start Assist", "6 Airbags", "ISOFIX Mounts",
              "Rear Parking Sensors", "Rear Camera (Multi-angle)", "TPMS",
              "Day & Night Rear View Mirror", "Speed Sensing Auto Door Lock",
              "Door Ajar Warning", "Seat Belt Warning", "Engine Immobilizer", "Impact Sensing Auto Door Unlock"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.25-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4 Speakers + 2 Tweeters", "USB Ports", "Voice Recognition",
              "Honda Connect"
            ]
          },
          "adasFeatures": {
            "features": [
              "Collision Mitigation Braking System (CMBS)", "Road Departure Mitigation System (RDM)",
              "Lane Keeping Assist System (LKAS)", "Adaptive Cruise Control (ACC)",
              "Auto High-Beam (AHB)", "Lead Car Departure Notification System (LCDN)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Honda Connect (Connected Car Technology)", "Remote Engine Start/Stop", "Live Location Tracking",
              "Geo-Fence Alert", "Stolen Vehicle Tracking", "Emergency Call (e-Call)"
            ]
          }
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
        "vehicleInfo": {
          "model": "WR-V",
          "manufacturer": "Honda",
          "year": 2023,
          "price": "₹ 8.16 - 10.56 Lakh (ex-showroom, last recorded)",
          "engineAndTransmission": {
            "engineType": "1.2L i-VTEC Petrol / 1.5L i-DTEC Diesel",
            "displacement": "1199 cc (Petrol) / 1498 cc (Diesel)",
            "maxPower": "89 bhp @ 6000 rpm (Petrol) / 99 bhp @ 3600 rpm (Diesel)",
            "maxTorque": "110 Nm @ 4800 rpm (Petrol) / 200 Nm @ 1750 rpm (Diesel)",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "SOHC (Petrol) / DOHC (Diesel)",
            "fuelSupplySystem": "MPi (Petrol) / CRDi (Diesel)",
            "turboCharger": false,
            "transmissionType": "Manual",
            "gearbox": "5-Speed MT (Petrol) / 6-Speed MT (Diesel)",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "16.5 - 23.7 kmpl (ARAI)",
            "fuelTankCapacity": "40 Litres",
            "emissionNorm": "BS VI"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Twist Beam Axle",
            "steeringType": "Electric",
            "steeringColumn": "Tilt",
            "turningRadius": "5.3 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3999 mm",
            "width": "1734 mm",
            "height": "1601 mm",
            "seatingCapacity": 5,
            "groundClearance": "188 mm",
            "wheelBase": "2555 mm",
            "numberOfDoors": 5,
            "bootSpace": "363 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front)", "Rear Seat Centre Arm Rest",
              "Cooled Glovebox", "Vanity Mirror", "Trunk Light",
              "Voice Commands", "One-Touch Electric Sunroof", "Rear Power Outlet"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "Chrome Inside Door Handles"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
              "Chrome Grille", "Body Cladding"
            ],
            "tyre": {
              "size": "195/60 R16",
              "type": "Radial Tubeless",
              "wheelSize": "16 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "Dual Airbags", "Rear Parking Sensors", "Rear Camera",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Speed Sensing Auto Door Lock", "Impact Sensing Auto Door Unlock"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "7-inch Touchscreen Infotainment System (Digipad 2.0)", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Voice Recognition",
              "HDMI Port"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": []
          }
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
        "vehicleInfo": {
          "model": "Jazz",
          "manufacturer": "Honda",
          "year": 2023,
          "price": "₹ 8.01 - 10.32 Lakh (ex-showroom, last recorded)",
          "engineAndTransmission": {
            "engineType": "1.2L i-VTEC Petrol",
            "displacement": "1199 cc",
            "maxPower": "89 bhp @ 6000 rpm",
            "maxTorque": "110 Nm @ 4800 rpm",
            "cylinders": 4,
            "valvesPerCylinder": 4,
            "valveConfiguration": "SOHC",
            "fuelSupplySystem": "MPi",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (CVT)",
            "gearbox": "5-Speed MT / CVT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "17.1 kmpl (ARAI)",
            "fuelTankCapacity": "40 Litres",
            "emissionNorm": "BS VI"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Torsion Beam Axle",
            "steeringType": "Electric",
            "steeringColumn": "Tilt",
            "turningRadius": "5.1 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3989 mm",
            "width": "1694 mm",
            "height": "1544 mm",
            "seatingCapacity": 5,
            "groundClearance": "165 mm",
            "wheelBase": "2530 mm",
            "numberOfDoors": 5,
            "bootSpace": "354 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "USB Charger (Front)", "Rear Seat Centre Arm Rest",
              "Cooled Glovebox", "Vanity Mirror", "Trunk Light",
              "Voice Commands", "Magic Seats (Versatile Seating)", "Paddle Shifters (CVT)"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "Chrome Finish on Interior Elements"
            ]
          },
          "exterior": {
            "features": [
              "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Chrome Grille",
              "Body Coloured Bumpers & ORVMs"
            ],
            "tyre": {
              "size": "175/65 R15",
              "type": "Radial Tubeless",
              "wheelSize": "15 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS", "EBD", "Dual Airbags", "Rear Parking Sensors", "Rear Camera",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Speed Sensing Auto Door Lock", "Impact Sensing Auto Door Unlock"
            ]
          },
          "entertainmentAndCommunication": {
            "features": [
              "7-inch Touchscreen Infotainment System (Digipad 2.0)", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Voice Recognition",
              "HDMI Port"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": []
          }
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
        "vehicleInfo": {
          "model": "Kwid",
          "manufacturer": "Renault",
          "year": 2024,
          "price": "₹ 5.53 - 7.65 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.0L SCe Petrol / 1.0L SCe CNG",
            "displacement": "999 cc",
            "maxPower": "67 bhp @ 5500 rpm (Petrol) / 56 bhp @ 5000 rpm (CNG)",
            "maxTorque": "91 Nm @ 4250 rpm (Petrol) / 78 Nm @ 4250 rpm (CNG)",
            "cylinders": 3,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-Point Fuel Injection",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (AMT)",
            "gearbox": "5-Speed MT / 5-Speed AMT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG",
            "mileage": "21.7 - 22 kmpl (Petrol, ARAI) / ~22 km/kg (CNG, ARAI)",
            "fuelTankCapacity": "28 Litres (Petrol)",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with Lower Transverse Link",
            "rearSuspension": "Twist Beam Suspension with Coil Spring",
            "steeringType": "Electric",
            "steeringColumn": "Tilt",
            "turningRadius": "4.9 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3731 mm",
            "width": "1579 mm",
            "height": "1490 mm (without roof rails) / 1513 mm (with roof rails)",
            "seatingCapacity": 5,
            "groundClearance": "184 mm",
            "wheelBase": "2422 mm",
            "numberOfDoors": 5,
            "bootSpace": "279 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Headrests (Front & Rear)",
              "Rear Parking Sensors", "Keyless Entry", "Rear Power Outlet",
              "Digital Instrument Cluster", "Front & Rear Power Windows", "Rear Parcel Shelf"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "Chrome / Silver Accents"
            ]
          },
          "exterior": {
            "features": [
              "Integrated LED DRLs", "LED Taillights (select variants)", "Rear Window Defogger",
              "Steel Wheels with Wheel Covers / Alloy Wheels (Climber)", "Roof Rails",
              "Body Coloured Bumpers", "Wheel Arch Cladding"
            ],
            "tyre": {
              "size": "165/70 R14",
              "type": "Radial Tubeless",
              "wheelSize": "14 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Dual Front Airbags", "Reverse Parking Camera (with guidelines, higher variants)",
              "Seat Belt Reminder (Driver & Co-driver)", "High-Speed Alert System",
              "Child Safety Locks", "Engine Immobilizer", "Electronic Stability Program (ESP - from 2023 models)",
              "Hill Start Assist (HSA - from 2023 models)", "Traction Control System (TCS - from 2023 models)",
              "Tyre Pressure Monitoring System (TPMS - from 2023 models)"
            ],
            "ncapRating": {
              "adultOccupant": "1-star (Global NCAP)",
              "childOccupant": "1-star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "8-inch Touchscreen MediaNAV Evolution Infotainment System", "Radio", "Bluetooth Connectivity",
              "USB Port", "AUX-in", "Android Auto", "Apple CarPlay", "4 Speakers"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": []
          }
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
        "vehicleInfo": {
          "model": "Kiger",
          "manufacturer": "Renault",
          "year": 2024,
          "price": "₹ 7.19 - 13.26 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.0L Energy Petrol / 1.0L Turbo Petrol / 1.0L Energy CNG",
            "displacement": "999 cc",
            "maxPower": "71 bhp @ 6250 rpm (Energy) / 99 bhp @ 5000 rpm (Turbo) / 71 bhp @ 6250 rpm (CNG)",
            "maxTorque": "96 Nm @ 3500 rpm (Energy) / 160 Nm @ 2800-3600 rpm (Turbo MT) / 152 Nm @ 2200-4400 rpm (Turbo CVT) / 96 Nm @ 3500 rpm (CNG)",
            "cylinders": 3,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-Point Fuel Injection",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (AMT) / Automatic (CVT)",
            "gearbox": "5-Speed MT / 5-Speed AMT / CVT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG",
            "mileage": "17.63 - 21.08 kmpl (Petrol, ARAI) / ~19.28 km/kg (CNG, User Reported)",
            "fuelTankCapacity": "40 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with Lower Transverse Link",
            "rearSuspension": "Twist Beam Suspension with Coil Spring",
            "steeringType": "Electric",
            "steeringColumn": "Tilt",
            "turningRadius": "5.0 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3991 mm",
            "width": "1750 mm",
            "height": "1605 mm",
            "seatingCapacity": 5,
            "groundClearance": "205 mm",
            "wheelBase": "2500 mm",
            "numberOfDoors": 5,
            "bootSpace": "405 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Headrests (Front & Rear)",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
              "Keyless Entry", "Wireless Phone Charger", "Rear Wiper & Washer",
              "Rear Defogger", "60:40 Split Rear Seat", "Cooled Glovebox",
              "Puddle Lamps", "Power Foldable ORVMs", "Drive Modes (Sport, Normal, Eco - Turbo)"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric / Leatherette Upholstery", "7-inch Digital Instrument Cluster",
              "Ambient Lighting", "Chrome Inside Door Handles"
            ]
          },
          "exterior": {
            "features": [
              "Split LED Headlamp Design", "LED DRLs", "LED Taillights",
              "Alloy Wheels", "Roof Rails", "Shark Fin Antenna",
              "Outside Mirror Turn Indicators", "Chrome Front Grille", "Body Cladding",
              "Dual Tone Exterior Option"
            ],
            "tyre": {
              "size": "195/60 R16",
              "type": "Radial Tubeless",
              "wheelSize": "16 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "4 Airbags (Dual Front, Dual Side)",
              "Electronic Stability Program (ESP)", "Hill Start Assist (HSA)",
              "Traction Control System (TCS)", "Rear Parking Camera (with guidelines)",
              "Tyre Pressure Monitoring System (TPMS)", "Seat Belt Reminder",
              "High-Speed Alert System", "Child Safety Locks", "Engine Immobilizer"
            ],
            "ncapRating": {
              "adultOccupant": "4-star (Global NCAP)",
              "childOccupant": "2-star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "8-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Arkamys 3D Sound System (6 Speakers)",
              "USB Ports", "Voice Recognition"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": [
              "Connected Car Technology (limited features)"
            ]
          }
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
        "vehicleInfo": {
          "model": "Triber",
          "manufacturer": "Renault",
          "year": 2024,
          "price": "₹ 7.19 - 10.45 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.0L Energy Petrol / 1.0L Energy CNG",
            "displacement": "999 cc",
            "maxPower": "71 bhp @ 6250 rpm (Petrol) / 71 bhp @ 6250 rpm (CNG)",
            "maxTorque": "96 Nm @ 3500 rpm (Petrol) / 96 Nm @ 3500 rpm (CNG)",
            "cylinders": 3,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-Point Fuel Injection",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (AMT)",
            "gearbox": "5-Speed MT / 5-Speed AMT",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG",
            "mileage": "18.2 - 19 kmpl (Petrol, ARAI) / ~18.12 km/kg (CNG, User Reported)",
            "fuelTankCapacity": "40 Litres (Petrol)",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with Lower Transverse Link",
            "rearSuspension": "Torsion Beam Axle",
            "steeringType": "Electric",
            "steeringColumn": "Tilt",
            "turningRadius": "5.2 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3990 mm",
            "width": "1739 mm",
            "height": "1643 mm",
            "seatingCapacity": 7,
            "groundClearance": "182 mm",
            "wheelBase": "2755 mm",
            "numberOfDoors": 5,
            "bootSpace": "84 Litres (7-seater) / 625 Litres (5-seater)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Headrests (All Rows)",
              "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents (2nd & 3rd Row)",
              "Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "USB Charger (Front & Rear)", "60:40 Split 2nd Row Seat", "50:50 Split 3rd Row Seat (removable)",
              "Cooled Storage in Centre Console", "Power Windows (Front & Rear)",
              "Rear Wiper & Washer", "Rear Defogger"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric Upholstery", "Digital Instrument Cluster (semi-digital)", "Chrome Inside Door Handles"
            ]
          },
          "exterior": {
            "features": [
              "Projector Headlamps", "LED DRLs", "LED Taillights",
              "Steel Wheels with Wheel Covers / Alloy Wheels", "Roof Rails (with 50kg load capacity)",
              "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Chrome Front Grille",
              "SUV Skid Plates (Front & Rear)", "Body Coloured Bumpers", "Dual Tone Exterior Option"
            ],
            "tyre": {
              "size": "185/65 R15",
              "type": "Radial Tubeless",
              "wheelSize": "15 Inch"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Dual Front Airbags", "Side Airbags (Front - select variants)",
              "Rear Parking Sensors", "Rear Camera (with guidelines)", "Electronic Stability Program (ESP - from 2023 models)",
              "Hill Start Assist (HSA - from 2023 models)", "Traction Control System (TCS - from 2023 models)",
              "Tyre Pressure Monitoring System (TPMS - from 2023 models)", "Seat Belt Reminder",
              "High-Speed Alert System", "Child Safety Locks", "Engine Immobilizer"
            ],
            "ncapRating": {
              "adultOccupant": "4-star (Global NCAP)",
              "childOccupant": "3-star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "8-inch Touchscreen MediaNAV Evolution Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Voice Recognition"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": []
          }
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
        "vehicleInfo": {
          "model": "Duster",
          "manufacturer": "Renault",
          "year": 2025,
          "price": "₹ 11.7 - 17.5 Lakh (expected on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "1.2L Turbo Petrol Mild-Hybrid / 1.6L Strong Hybrid Petrol",
            "displacement": "1199 cc (Turbo Petrol) / 1598 cc (Strong Hybrid)",
            "maxPower": "130 PS (Turbo Petrol) / 140 PS (Strong Hybrid) (expected)",
            "maxTorque": "N/A",
            "cylinders": 3,
            "valvesPerCylinder": 4,
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection (Turbo Petrol)",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (CVT)",
            "gearbox": "6-Speed MT / CVT (expected)",
            "driveType": "FWD / AWD (expected for some variants)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Petrol-Hybrid",
            "mileage": "N/A (expected to be competitive)",
            "fuelTankCapacity": "50 Litres (expected)",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Torsion Beam (FWD) / Multi-link (AWD)",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic (expected)",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4343 mm",
            "width": "1813 mm",
            "height": "1656 mm",
            "seatingCapacity": 5,
            "groundClearance": "209 mm",
            "wheelBase": "2657 mm",
            "numberOfDoors": 5,
            "bootSpace": "472 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Air Conditioner", "Heater", "Adjustable Headrests (Front & Rear)",
              "Height Adjustable Driver & Front Passenger Seat", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera",
              "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
              "Rear Wiper & Washer", "Rear Defogger", "Powered ORVMs (Foldable)",
              "Panoramic Sunroof (expected for top variants)"
            ]
          },
          "interior": {
            "features": [
              "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
              "Fabric / Leatherette Upholstery", "7-inch Digital Instrument Cluster",
              "Ambient Lighting", "Premium Interior Finishes"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Roof Rails", "Shark Fin Antenna", "Outside Mirror Turn Indicators",
              "Robust SUV Styling", "Body Cladding", "Integrated Spoiler"
            ],
            "tyre": {
              "size": "N/A (expected 17/18-inch alloys)",
              "type": "Radial Tubeless",
              "wheelSize": "N/A"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Program (ESP)",
              "Hill Start Assist (HSA)", "Hill Descent Control (HDC - AWD variants)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Reminder", "High-Speed Alert System", "Child Safety Locks",
              "Engine Immobilizer"
            ],
            "ncapRating": {
              "adultOccupant": "Expected 5-star (Euro NCAP/Global NCAP based on Dacia Duster)",
              "childOccupant": "Expected 5-star (Euro NCAP/Global NCAP based on Dacia Duster)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.1-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "6-speaker Arkamys 3D Sound System",
              "USB-C Ports", "Voice Recognition"
            ]
          },
          "adasFeatures": {
            "features": [
              "Automatic Emergency Braking (AEB)", "Traffic Sign Recognition", "Lane Keep Assist",
              "Blind Spot Monitoring", "Adaptive Cruise Control", "Rear Cross Traffic Alert",
              "Driver Attention Alert"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Car Technology", "Remote Vehicle Control", "Live Location Tracking",
              "Geo-Fencing", "Over-the-Air (OTA) Updates"
            ]
          }
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
        "vehicleInfo": {
          "model": "X7",
          "manufacturer": "BMW",
          "year": 2025,
          "price": "₹ 1.56 - 1.63 Crore (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "3.0L 6-cyl Petrol Mild-Hybrid / 3.0L 6-cyl Diesel Mild-Hybrid",
            "displacement": "2998 cc (Petrol) / 2993 cc (Diesel)",
            "maxPower": "375 bhp (Petrol) / 347 bhp (Diesel)",
            "maxTorque": "520 Nm (Petrol) / 700 Nm (Diesel)",
            "cylinders": 6,
            "valvesPerCylinder": "N/A",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic (Torque Converter)",
            "gearbox": "8-Speed Steptronic",
            "driveType": "xDrive (All-Wheel Drive)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol-Hybrid / Diesel-Hybrid",
            "mileage": "11.29 kmpl (Petrol) / 14.31 kmpl (Diesel) (ARAI)",
            "fuelTankCapacity": "N/A",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Adaptive 2-axle Air Suspension",
            "rearSuspension": "Adaptive 2-axle Air Suspension",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "5181 mm",
            "width": "2000 mm",
            "height": "1835 mm",
            "seatingCapacity": 6,
            "groundClearance": "N/A",
            "wheelBase": "3105 mm",
            "numberOfDoors": 5,
            "bootSpace": "300 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (multi-zone)", "Rear AC Vents",
              "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera",
              "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
              "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
              "Panoramic Sunroof (Sky Lounge)", "Heated & Ventilated Front Seats", "Power Seats with Memory"
            ]
          },
          "interior": {
            "features": [
              "Curved Display (14.9-inch infotainment, 12.3-inch instrument cluster)",
              "Digital Instrument Cluster", "Leather Upholstery", "Ambient Lighting",
              "Harman Kardon Surround Sound System", "Head-Up Display (optional)"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Roof Rails", "Shark Fin Antenna", "Chrome Accents", "Illuminated Kidney Grille"
            ],
            "tyre": {
              "size": "N/A",
              "type": "Radial Tubeless",
              "wheelSize": "N/A"
            },
            "bootOpening": "Power Tailgate"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "8 Airbags", "Electronic Stability Program (ESP)",
              "Hill Start Assist (HSA)", "Tyre Pressure Monitoring System (TPMS)",
              "ISOFIX Child Seat Mounts", "Seat Belt Reminder", "High-Speed Alert System",
              "Child Safety Locks", "Engine Immobilizer"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "14.9-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Surround Sound System",
              "USB Ports", "Voice Recognition", "Gesture Control (optional)"
            ]
          },
          "adasFeatures": {
            "features": [
              "Automatic Emergency Braking (AEB)", "Traffic Sign Recognition", "Lane Keep Assist",
              "Blind Spot Monitoring", "Adaptive Cruise Control", "Rear Cross Traffic Alert",
              "Driver Attention Alert"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Car Technology", "Remote Vehicle Control", "Live Location Tracking",
              "Geo-Fencing", "Over-the-Air (OTA) Updates"
            ]
          }
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
        "vehicleInfo": {
          "model": "X3",
          "manufacturer": "BMW",
          "year": 2025,
          "price": "₹ 90.04 - 93.99 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "2.0L 4-cyl Petrol / 2.0L 4-cyl Diesel",
            "displacement": "1998 cc (Petrol) / 1995 cc (Diesel)",
            "maxPower": "188 bhp (Petrol) / 194 bhp (Diesel)",
            "maxTorque": "310 Nm (Petrol) / 400 Nm (Diesel)",
            "cylinders": 4,
            "valvesPerCylinder": "N/A",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic (Torque Converter)",
            "gearbox": "8-Speed Steptronic",
            "driveType": "xDrive (All-Wheel Drive)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "13.38 kmpl (Petrol) / 17.86 kmpl (Diesel) (ARAI)",
            "fuelTankCapacity": "68 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Multi-link",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "6.0 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4755 mm",
            "width": "1920 mm",
            "height": "1660 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2865 mm",
            "numberOfDoors": 5,
            "bootSpace": "570 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (3-zone)", "Rear AC Vents",
              "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera (optional)",
              "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
              "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
              "Panoramic Glass Roof", "Power Seats with Memory"
            ]
          },
          "interior": {
            "features": [
              "12.3-inch Touchscreen Infotainment System", "Digital Instrument Cluster",
              "Leather Upholstery", "Ambient Lighting", "Harman Kardon Sound System (variant dependent)"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Roof Rails", "Shark Fin Antenna", "Sporty Exterior Styling"
            ],
            "tyre": {
              "size": "N/A",
              "type": "Radial Tubeless",
              "wheelSize": "N/A"
            },
            "bootOpening": "Power Tailgate"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Program (ESP)",
              "Hill Start Assist (HSA)", "Tyre Pressure Monitoring System (TPMS)",
              "ISOFIX Child Seat Mounts", "Seat Belt Reminder", "High-Speed Alert System",
              "Child Safety Locks", "Engine Immobilizer"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "12.3-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Sound System",
              "USB Ports", "Voice Recognition"
            ]
          },
          "adasFeatures": {
            "features": [
              "Level 2 ADAS (Traffic Jam Assist, Lane Departure Warning, etc. - variant dependent)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Car Technology", "Remote Services"
            ]
          }
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
        "vehicleInfo": {
          "model": "X5",
          "manufacturer": "BMW",
          "year": 2025,
          "price": "₹ 1.16 - 1.36 Crore (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "3.0L 6-cyl Turbo Petrol Mild-Hybrid / 3.0L 6-cyl Turbo Diesel Mild-Hybrid",
            "displacement": "2998 cc (Petrol) / 2993 cc (Diesel)",
            "maxPower": "375 bhp (Petrol) / 282 bhp (Diesel)",
            "maxTorque": "520 Nm (Petrol) / 650 Nm (Diesel)",
            "cylinders": 6,
            "valvesPerCylinder": "N/A",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic (Torque Converter)",
            "gearbox": "8-Speed Steptronic",
            "driveType": "xDrive (All-Wheel Drive)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol-Hybrid / Diesel-Hybrid",
            "mileage": "12 kmpl (Petrol) / 12 kmpl (Diesel) (ARAI)",
            "fuelTankCapacity": "N/A",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Adaptive Suspension",
            "rearSuspension": "Adaptive Suspension",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "6.3 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4922 mm",
            "width": "2004 mm",
            "height": "1745 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2975 mm",
            "numberOfDoors": 5,
            "bootSpace": "645 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-zone)", "Rear AC Vents",
              "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera",
              "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
              "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
              "Panoramic Sunroof", "Ventilated & Heated Front Seats", "Power Seats with Memory",
              "Digital Key"
            ]
          },
          "interior": {
            "features": [
              "Curved Display (14.9-inch infotainment, 12.3-inch instrument cluster)",
              "Digital Instrument Cluster", "Leather Upholstery", "Ambient Lighting",
              "Harman Kardon Surround Sound System"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Roof Rails", "Shark Fin Antenna", "Sporty/Elegant Exterior Styling"
            ],
            "tyre": {
              "size": "N/A",
              "type": "Radial Tubeless",
              "wheelSize": "N/A"
            },
            "bootOpening": "Power Tailgate"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Program (ESP)",
              "Hill Start Assist (HSA)", "Tyre Pressure Monitoring System (TPMS)",
              "ISOFIX Child Seat Mounts", "Seat Belt Reminder", "High-Speed Alert System",
              "Child Safety Locks", "Engine Immobilizer"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "14.9-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Surround Sound System",
              "USB Ports", "Voice Recognition", "Gesture Control"
            ]
          },
          "adasFeatures": {
            "features": [
              "Automatic Emergency Braking (AEB)", "Traffic Sign Recognition", "Lane Keep Assist",
              "Blind Spot Monitoring", "Adaptive Cruise Control", "Rear Cross Traffic Alert",
              "Driver Attention Alert"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Car Technology", "Remote Vehicle Control", "Live Location Tracking",
              "Geo-Fencing", "Over-the-Air (OTA) Updates"
            ]
          }
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
        "vehicleInfo": {
          "model": "3 Series",
          "manufacturer": "BMW",
          "year": 2025,
          "price": "₹ 72.67 - 78.59 Lakh (on-road, Nagpur, for Gran Limousine); M340i higher",
          "engineAndTransmission": {
            "engineType": "2.0L 4-cyl Turbo Petrol / 2.0L 4-cyl Diesel (Gran Limousine) / 3.0L 6-cyl Turbo Petrol Mild-Hybrid (M340i)",
            "displacement": "1998 cc (Petrol) / 1995 cc (Diesel) / 2998 cc (M340i)",
            "maxPower": "255 bhp (330Li), 190 bhp (320Ld), 386 bhp (M340i)",
            "maxTorque": "400 Nm (330Li), 400 Nm (320Ld), 500 Nm (M340i)",
            "cylinders": "4 (Gran Limousine) / 6 (M340i)",
            "valvesPerCylinder": "N/A",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic (Torque Converter)",
            "gearbox": "8-Speed Steptronic",
            "driveType": "RWD (Gran Limousine), xDrive AWD (M340i)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel / Petrol-Hybrid (M340i)",
            "mileage": "15.4 kmpl (330Li), 19.6 kmpl (320Ld), 13.02 kmpl (M340i) (ARAI)",
            "fuelTankCapacity": "N/A",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Multi-link",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4819 mm (Gran Limousine)",
            "width": "1827 mm (Gran Limousine)",
            "height": "1442 mm (Gran Limousine)",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2961 mm (Gran Limousine)",
            "numberOfDoors": 4,
            "bootSpace": "480 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (3-zone)", "Rear AC Vents",
              "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera (optional)",
              "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
              "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
              "Panoramic Sunroof (Gran Limousine)", "Power Seats"
            ]
          },
          "interior": {
            "features": [
              "Curved display (12.3-inch instrumentation, 14.9-inch infotainment)",
              "Digital Instrument Cluster", "Leatherette/Leather Upholstery",
              "Ambient Lighting", "Harman Kardon Sound System (variant dependent)"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Sporty Sedan Design", "Chrome/Black Accents"
            ],
            "tyre": {
              "size": "N/A",
              "type": "Radial Tubeless",
              "wheelSize": "N/A"
            },
            "bootOpening": "Manual/Power Tailgate (variant dependent)"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Program (ESP)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Reminder", "High-Speed Alert System", "Child Safety Locks",
              "Engine Immobilizer"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "14.9-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Sound System",
              "USB Ports", "Voice Recognition"
            ]
          },
          "adasFeatures": {
            "features": [
              "Driving Assistant (Lane Departure Warning, Front Collision Warning - variant dependent)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Car Technology", "Remote Services"
            ]
          }
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
        "vehicleInfo": {
          "model": "5 Series",
          "manufacturer": "BMW",
          "year": 2025,
          "price": "₹ 84.85 Lakh (on-road, Nagpur, for 530Li M Sport)",
          "engineAndTransmission": {
            "engineType": "2.0L 4-cyl Petrol",
            "displacement": "1998 cc",
            "maxPower": "255 bhp",
            "maxTorque": "400 Nm",
            "cylinders": 4,
            "valvesPerCylinder": "N/A",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic (Torque Converter)",
            "gearbox": "8-Speed Steptronic",
            "driveType": "RWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "15.7 kmpl (ARAI)",
            "fuelTankCapacity": "60 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double-wishbone axle",
            "rearSuspension": "Five-link axle",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "5165 mm",
            "width": "2156 mm",
            "height": "1518 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "3105 mm",
            "numberOfDoors": 4,
            "bootSpace": "500 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-zone)", "Rear AC Vents",
              "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera (optional)",
              "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
              "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
              "Electric Glass Sunroof", "Heated & Ventilated Front Seats (variant dependent)",
              "Power Seats"
            ]
          },
          "interior": {
            "features": [
              "12.3-inch Touchscreen Infotainment System", "Digital Instrument Cluster",
              "Leather Upholstery", "Ambient Lighting", "Harman Kardon Audio System (16 speakers)",
              "Gesture Control"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Chrome Accents", "Sleek Sedan Design"
            ],
            "tyre": {
              "size": "N/A",
              "type": "Radial Tubeless",
              "wheelSize": "N/A"
            },
            "bootOpening": "Power Tailgate"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "8 Airbags", "Electronic Stability Program (ESP)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Reminder", "High-Speed Alert System", "Child Safety Locks",
              "Engine Immobilizer"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "12.3-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Audio System",
              "USB Ports", "Voice Recognition", "Gesture Control"
            ]
          },
          "adasFeatures": {
            "features": [
              "Driving Assistant (Lane Departure Warning, Front Collision Warning - variant dependent)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Car Technology", "Remote Services"
            ]
          }
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
        "vehicleInfo": {
          "model": "iX",
          "manufacturer": "BMW",
          "year": 2025,
          "price": "₹ 1.47 - 1.52 Crore (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Electric Motors",
            "displacement": "N/A",
            "maxPower": "326 PS (iX xDrive40) / 503 PS (iX xDrive50)",
            "maxTorque": "630 Nm",
            "cylinders": "N/A",
            "valvesPerCylinder": "N/A",
            "valveConfiguration": "N/A",
            "fuelSupplySystem": "Electric",
            "turboCharger": false,
            "transmissionType": "Automatic (Single Speed)",
            "gearbox": "Single-Speed Fixed Gear",
            "driveType": "All-Wheel Drive (AWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Electric",
            "mileage": "425 km (iX xDrive40) / 635 km (iX xDrive50) (WLTP)",
            "fuelTankCapacity": "N/A",
            "emissionNorm": "Zero Emission"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double-wishbone axle",
            "rearSuspension": "Five-link axle",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4953 mm",
            "width": "1967 mm",
            "height": "1695 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "3000 mm",
            "numberOfDoors": 5,
            "bootSpace": "500 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-zone)", "Rear AC Vents",
              "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera",
              "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
              "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
              "Panorama Glass Roof with Electrochromic Shading", "Heated & Ventilated Seats (optional)"
            ]
          },
          "interior": {
            "features": [
              "Curved Display", "Digital Instrument Cluster", "Sustainable Materials Upholstery",
              "Ambient Lighting", "Harman Kardon Surround Sound System", "Head-Up Display"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Aerodynamic Alloy Wheels",
              "Blue Accents (electric specific)", "Unique Kidney Grille (sensor panel)"
            ],
            "tyre": {
              "size": "N/A",
              "type": "Radial Tubeless",
              "wheelSize": "N/A"
            },
            "bootOpening": "Power Tailgate"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "8 Airbags", "Electronic Stability Program (ESP)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Reminder", "High-Speed Alert System", "Child Safety Locks",
              "Engine Immobilizer"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "14.9-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Surround Sound System",
              "USB Ports", "Voice Recognition"
            ]
          },
          "adasFeatures": {
            "features": [
              "Automatic Emergency Braking (AEB)", "Traffic Sign Recognition", "Lane Keep Assist",
              "Blind Spot Monitoring", "Adaptive Cruise Control", "Rear Cross Traffic Alert",
              "Driver Attention Alert", "Parking Assistant Plus"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Car Technology", "Remote Vehicle Control", "Live Location Tracking",
              "Geo-Fencing", "Over-the-Air (OTA) Updates", "BMW Digital Key Plus"
            ]
          }
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
        "vehicleInfo": {
          "model": "Virtus",
          "manufacturer": "Volkswagen",
          "year": 2025,
          "price": "₹ 13.75 - 23.06 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "999 cc / 1498 cc",
            "maxPower": "114 bhp (1.0L TSI) / 148 bhp (1.5L TSI EVO)",
            "maxTorque": "175 Nm (1.0L TSI) / 250 Nm (1.5L TSI EVO)",
            "cylinders": "3 (1.0L TSI) / 4 (1.5L TSI EVO)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "TSI (Turbo Stratified Injection)",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (TC/DCT)",
            "gearbox": "6-Speed Manual / 6-Speed Automatic (Torque Converter) / 7-Speed DSG",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "18.12 - 20.8 kmpl (ARAI)",
            "fuelTankCapacity": "45 Litres",
            "emissionNorm": "BS VI 2.0 (E20 compliant, RDE norms)"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut suspension with Stabiliser Bar",
            "rearSuspension": "Twist Beam Axle",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "5.05 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "4561 mm",
            "width": "1752 mm",
            "height": "1507 mm",
            "seatingCapacity": 5,
            "groundClearance": "179 mm (unladen)",
            "wheelBase": "2651 mm",
            "numberOfDoors": 4,
            "bootSpace": "521 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Front & Rear Parking Sensors", "Rear Camera with Guidedlines",
              "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
              "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
              "Single Pane Sunroof", "Ventilated Front Seats (Top variants)", "Paddle Shifters"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster", "Touchscreen Infotainment System", "Premium Dual Tone Interiors",
              "Ambient Lighting", "Leather + Leatherette Seat Upholstery", "Leather-wrapped Steering Wheel",
              "Central Console Armrest with Storage"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Chrome Garnish", "Integrated Antenna", "Rear Spoiler (GT variants)",
              "Body-coloured Bumpers", "Outside Rear View Mirror Turn Indicators"
            ],
            "tyre": {
              "size": "N/A (Varies by variant)",
              "type": "Radial Tubeless",
              "wheelSize": "N/A (Varies by variant)"
            },
            "bootOpening": "Electric Tailgate Release"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Reminder", "High-Speed Alert System", "Child Safety Locks",
              "Engine Immobilizer", "Hill Hold Control", "Impact Sensing Auto Door Unlock"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Global NCAP)",
              "childOccupant": "5 Star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "10-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Speakers (Varies by variant)",
              "USB Ports", "Voice Recognition", "Steering-mounted controls"
            ]
          },
          "adasFeatures": {
            "features": [
              "No ADAS features specifically listed as standard (check variant details for any advanced driver assistance systems)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Real-Time Vehicle Tracking", "Smart Access Card Entry"
            ]
          }
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
        "vehicleInfo": {
          "model": "Polo",
          "manufacturer": "Volkswagen",
          "year": 2025,
          "price": "₹ 8.24 - 12.88 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "999 cc",
            "maxPower": "109 bhp @ 5000 rpm (1.0L TSI)",
            "maxTorque": "175 Nm @ 1750 rpm (1.0L TSI)",
            "cylinders": "3",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "TSI (Turbo Stratified Injection)",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (Torque Converter)",
            "gearbox": "6-Speed Manual / 6-Speed Automatic",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "18.2 - 18.4 kmpl (ARAI)",
            "fuelTankCapacity": "45 Litres",
            "emissionNorm": "BS VI"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "McPherson Strut with Stabiliser Bar",
            "rearSuspension": "Semi-independent Trailing Arm",
            "steeringType": "Electric (Power assisted)",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "4.9 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3971 mm",
            "width": "1682 mm",
            "height": "1469 mm",
            "seatingCapacity": 5,
            "groundClearance": "168 mm (unladen)",
            "wheelBase": "2470 mm",
            "numberOfDoors": 5,
            "bootSpace": "280 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control", "Rear AC Blower/Vents (behind front armrest)",
              "Cruise Control", "Rear Parking Sensors", "Steering Adjustment (Tilt & Telescopic)",
              "Keyless Entry (Select variants)", "Engine Start/Stop Button (Select variants)", "Rain-sensing Wipers",
              "Automatic Headlamps", "Electrically Adjustable & Retractable ORVMs", "Rear Defogger"
            ]
          },
          "interior": {
            "features": [
              "Integrated (in-dash) Music System", "Digital Tachometer", "Dual Tone Interiors",
              "Leather-wrapped Steering Wheel", "Leather-wrapped Gear Knob", "Ambient Interior Lighting (Footwell Lamps - select variants)"
            ]
          },
          "exterior": {
            "features": [
              "Halogen/LED Headlamps (variant dependent)", "LED DRLs (variant dependent)", "LED Taillights (variant dependent)", "Alloy Wheels",
              "Body-coloured Bumpers", "Outside Rear View Mirror Turn Indicators", "Integrated Antenna", "Rear Wiper"
            ],
            "tyre": {
              "size": "195 / 55 R16 (Higher variants), 185 / 60 R15 (Lower variants)",
              "type": "Radial Tubeless",
              "wheelSize": "R16 / R15"
            },
            "bootOpening": "Electric Tailgate Release"
          },
          "safety": {
            "features": [
              "ABS with EBD", "2 Airbags (Driver, Passenger)", "Electronic Stability Program (ESP) (Select variants)",
              "Tyre Pressure Monitoring System (TPMS) (Select variants)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Overspeed Warning", "Child Safety Locks", "Engine Immobilizer",
              "Hill Hold Control (Select variants)"
            ],
            "ncapRating": {
              "adultOccupant": "4 Star (Global NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wired Android Auto", "Wired Apple CarPlay", "4 Speakers", "USB Compatibility",
              "Voice Command", "Steering-mounted controls"
            ]
          },
          "adasFeatures": {
            "features": [
              "No ADAS features specifically listed as standard."
            ]
          },
          "internetFeatures": {
            "features": [
              "No specific internet-connected features broadly listed for Polo in India."
            ]
          }
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
        "vehicleInfo": {
          "model": "Tiguan",
          "manufacturer": "Volkswagen",
          "year": 2025,
          "price": "₹ 56.59 - 61.83 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "1984 cc",
            "maxPower": "187.74 bhp @ 4200-6000 rpm",
            "maxTorque": "320 Nm @ 1500-4100 rpm",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "N/A",
            "fuelSupplySystem": "TSI",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "7-Speed DSG",
            "driveType": "All-Wheel Drive (AWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "12.65 kmpl (ARAI)",
            "fuelTankCapacity": "60 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Multi-link suspension",
            "rearSuspension": "Multi-link suspension",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "5.39 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4509 mm",
            "width": "1839 mm",
            "height": "1665 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2679 mm",
            "numberOfDoors": 5,
            "bootSpace": "615 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (3-zone)", "Rear AC Vents",
              "Cruise Control", "Front & Rear Parking Sensors", "Rear Parking Camera with Guidedlines",
              "Engine Start/Stop Button", "Keyless Entry", "Electrically Adjustable Driver's Seat (8-way) with Memory",
              "Heated Front Seats", "Panoramic Sunroof", "Automatic Headlights & Wipers",
              "Powered Tailgate"
            ]
          },
          "interior": {
            "features": [
              "10-inch Digital Driver's Display", "8-inch Touchscreen Infotainment System", "Leather Upholstery",
              "Ambient Lighting (30 colours)", "Soft Touch Dashboard", "Chrome elements"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "18-inch Alloy Wheels",
              "Roof Rails", "Shark Fin Antenna", "Heated Outside Rear View Mirror",
              "Front & Rear Fog Lamps"
            ],
            "tyre": {
              "size": "235/55 R18",
              "type": "Tubeless, Radial",
              "wheelSize": "18 Inch"
            },
            "bootOpening": "Electronic"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Start Assist", "Hill Descent Control", "Electronic Parking Brake with Auto Hold"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP - previous generation)",
              "childOccupant": "N/A (Current India-spec model not tested by Bharat NCAP or Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "8-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "8 Speakers", "USB Ports",
              "Voice Command", "Car information display"
            ]
          },
          "adasFeatures": {
            "features": [
              "No specific ADAS features like AEB or ACC are broadly listed for the India-spec Tiguan, primarily focusing on active safety features."
            ]
          },
          "internetFeatures": {
            "features": [
              "No specific internet features beyond smartphone integration are broadly listed."
            ]
          }
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
        "vehicleInfo": {
          "model": "Taigun",
          "manufacturer": "Volkswagen",
          "year": 2025,
          "price": "₹ 14.07 - 23.59 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "999 cc / 1498 cc",
            "maxPower": "114 bhp @ 5000-5500 rpm (1.0L TSI) / 148 bhp @ 5000-6000 rpm (1.5L TSI EVO)",
            "maxTorque": "178 Nm @ 1750-4500 rpm (1.0L TSI) / 250 Nm @ 1600-3500 rpm (1.5L TSI EVO)",
            "cylinders": "3 (1.0L TSI) / 4 (1.5L TSI EVO)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "TSI",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (TC/DCT)",
            "gearbox": "6-Speed Manual / 6-Speed Automatic (Torque Converter) / 7-Speed DSG",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "17.23 - 19.89 kmpl (ARAI)",
            "fuelTankCapacity": "50 Litres",
            "emissionNorm": "BS VI 2.0 (E20 compliant, RDE norms)"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut suspension and Stabiliser Bar",
            "rearSuspension": "Rear Twist Beam",
            "steeringType": "Electric",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "5.05 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "4221 mm",
            "width": "1760 mm",
            "height": "1612 mm",
            "seatingCapacity": 5,
            "groundClearance": "188 mm (unladen)",
            "wheelBase": "2651 mm",
            "numberOfDoors": 5,
            "bootSpace": "385 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control", "Rear AC Vents",
              "Cruise Control", "Front & Rear Parking Sensors", "Rear Camera with Guidedlines",
              "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
              "Electric Sunroof", "Automatic Headlamps", "Powered & Folding ORVMs",
              "Ventilated Front Seats (Top variants)"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster", "Touchscreen Infotainment System", "Dual Tone Interiors",
              "Ambient Lighting", "Leatherette Seat Upholstery", "Leather-wrapped Steering Wheel",
              "Alu Pedals (GT variants)"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Roof Rails", "Shark Fin Antenna", "Black Glossy Front Grille (GT variants)",
              "Red Painted Brake Calipers (GT variants)"
            ],
            "tyre": {
              "size": "205/55 R17 (Higher variants), 205/60 R16 (Lower variants)",
              "type": "Radial Tubeless",
              "wheelSize": "R17 / R16"
            },
            "bootOpening": "Electric Tailgate Release"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Control (ESC)",
              "Traction Control", "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Control", "Anti-Theft Alarm", "Speed Sensing Auto Door Lock"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Global NCAP)",
              "childOccupant": "5 Star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "10-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
              "Wired Android Auto", "Wired Apple CarPlay", "6 Speakers", "USB Ports",
              "Voice Command", "Steering-mounted controls", "GPS Navigation System"
            ]
          },
          "adasFeatures": {
            "features": [
              "No ADAS features specifically listed as standard (check variant details for any advanced driver assistance systems)"
            ]
          },
          "internetFeatures": {
            "features": [
              "No specific internet-connected features broadly listed."
            ]
          }
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
        "vehicleInfo": {
          "model": "T-Roc",
          "manufacturer": "Volkswagen",
          "year": 2025,
          "price": "₹ 25.37 Lakh (on-road, Nagpur) - Note: This model has been discontinued, price is for reference.",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "1498 cc",
            "maxPower": "147.94 bhp @ 5000-6000 rpm",
            "maxTorque": "250 Nm @ 1500-3500 rpm",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "TSI",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "7-Speed DSG",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "17.85 - 18.4 kmpl (ARAI)",
            "fuelTankCapacity": "59 Litres",
            "emissionNorm": "BS VI"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Independent with coil spring",
            "rearSuspension": "Twist beam axle with separate spring and shock absorber",
            "steeringType": "Electric (Power assisted)",
            "steeringColumn": "Adjustable",
            "turningRadius": "5.5 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4234 mm",
            "width": "1819 mm",
            "height": "1573 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2590 mm",
            "numberOfDoors": 5,
            "bootSpace": "445 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual Zone)", "Cruise Control",
              "Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Heated ORVMs",
              "Panoramic Sunroof"
            ]
          },
          "interior": {
            "features": [
              "Digital Tachometer", "Touchscreen Infotainment System", "Leather Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Leather-wrapped Gear Knob",
              "Cooled Glovebox"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Roof Rails", "Body-coloured Bumpers", "Integrated Antenna",
              "Front & Rear Fog Lamps"
            ],
            "tyre": {
              "size": "215 / 55 R17",
              "type": "Radial Tubeless",
              "wheelSize": "R17"
            },
            "bootOpening": "N/A"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Program (ESP)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Control"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wired Android Auto", "Wired Apple CarPlay", "Speakers (N/A number provided)", "USB Compatibility",
              "Voice Command", "Steering-mounted controls"
            ]
          },
          "adasFeatures": {
            "features": [
              "Lane Keep Assist", "Blind Spot Detection (mentioned as a feature, check variant specifics)"
            ]
          },
          "internetFeatures": {
            "features": [
              "No specific internet-connected features broadly listed."
            ]
          }
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
        "vehicleInfo": {
          "model": "E-Class",
          "manufacturer": "Mercedes-Benz",
          "year": 2025,
          "price": "₹ 90.00 - 1.05 Cr (on-road, Nagpur) - estimated for current models",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel",
            "displacement": "1993 cc (Diesel), 1999 cc / 2999 cc (Petrol)",
            "maxPower": "194.44 bhp (E 220d) - 375 bhp (E 450 4MATIC)",
            "maxTorque": "400 Nm (E 200) - 700 Nm (E 350d)",
            "cylinders": "4 / 6",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "CRDI (Diesel), Turbocharged (Petrol)",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "9-Speed 9G-TRONIC",
            "driveType": "Rear-Wheel Drive (RWD) / All-Wheel Drive (AWD - 4MATIC)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "12 - 15 kmpl (Petrol), 13 - 18 kmpl (Diesel) (ARAI)",
            "fuelTankCapacity": "66 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Multi-link suspension",
            "rearSuspension": "Multi-link suspension, Air Springs (on higher variants)",
            "steeringType": "Electric (Power assisted)",
            "steeringColumn": "Tilt & Telescopic (Electric)",
            "turningRadius": "5.3 m - 5.5 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4949 mm - 5075 mm (LWB versions for India)",
            "width": "1880 mm - 1860 mm",
            "height": "1468 mm - 1494 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2961 mm - 3079 mm",
            "numberOfDoors": 4,
            "bootSpace": "540 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Multi-Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Heated ORVMs",
              "Panoramic Sunroof", "Electrically Adjustable Front Seats with Memory",
              "Rear AC Vents", "Cooled Glovebox", "Paddle Shifters", "Wireless Phone Charging"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster", "Touchscreen Infotainment System (MBUX)", "Leather Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Leather-wrapped Gear Knob",
              "Ambient Lighting (64 colors)", "Burmester Sound System (Optional/Higher Variants)"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Integrated Antenna", "Chrome Grille", "Body-coloured Bumpers",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "245/45 R18 (Common)",
              "type": "Radial Tubeless",
              "wheelSize": "R18"
            },
            "bootOpening": "Electronic"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "7-8 Airbags", "Electronic Stability Program (ESP)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Control", "360-degree Camera"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wired/Wireless Android Auto", "Wired/Wireless Apple CarPlay", "Speakers (Multiple)", "USB Compatibility",
              "Voice Command (MBUX)", "Steering-mounted controls", "Navigation with Live Traffic"
            ]
          },
          "adasFeatures": {
            "features": [
              "Active Brake Assist", "Lane Keep Assist (on some variants)", "Blind Spot Detection",
              "Adaptive Cruise Control (on higher variants)", "Parking Assist (Active Parking Assist)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Mercedes Me Connect (Connected Car Tech)", "Live Location", "Remote Vehicle Status Check",
              "OTA Updates", "Google / Alexa Connectivity", "SOS Button"
            ]
          }
        }
      },
      {
        id: 'mercedes-s-class',
        videoPoster: mercdesesclass,
        videoSrc: "https://www.youtube.com/embed/rK8v0N06a3Q",
        thumbnail: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
        title: "Mercedes-Benz S-Class",
        "link": "https://www.mercedes-benz.co.in/passengercars/models/s-class/saloon-v223/explore.html",
        description: "The Mercedes-Benz S-Class represents the pinnacle of luxury and automotive engineering, offering unparalleled refinement, innovative technology, and commanding presence.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "S-Class",
          "manufacturer": "Mercedes-Benz",
          "year": 2025,
          "price": "₹ 1.95 - 2.20 Cr (on-road, Nagpur) - estimated for current models",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel (Mild-Hybrid)",
            "displacement": "2925 cc (Diesel), 2999 cc (Petrol)",
            "maxPower": "281.61 bhp (S 350d) - 362.07 bhp (S 450 4MATIC)",
            "maxTorque": "600 Nm (S 350d) - 500 Nm (S 450 4MATIC)",
            "cylinders": "6",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "CRDI (Diesel), Turbocharged (Petrol)",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "9-Speed 9G-TRONIC",
            "driveType": "All-Wheel Drive (AWD - 4MATIC)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "12.82 kmpl (Petrol), 13.00 kmpl (Diesel) (ARAI)",
            "fuelTankCapacity": "76 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "AIRMATIC (Air Suspension)",
            "rearSuspension": "AIRMATIC (Air Suspension)",
            "steeringType": "Electric (Power assisted) with Rear-Axle Steering",
            "steeringColumn": "Electric Tilt & Telescopic",
            "turningRadius": "5.6 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "5289 mm",
            "width": "1954 mm - 2109 mm (with mirrors)",
            "height": "1503 mm",
            "seatingCapacity": 5,
            "groundClearance": "96 mm (Adjustable)",
            "wheelBase": "3216 mm",
            "numberOfDoors": 4,
            "bootSpace": "550 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (THERMOTRONIC - 4 Zone)", "Cruise Control (Adaptive)",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "KEYLESS-GO",
              "Rain Sensing Wipers", "Automatic Headlamps", "Heated & Ventilated Front Seats with Massage Function",
              "Panoramic Sliding Sunroof", "Electrically Adjustable Rear Seats with Memory and Legrests",
              "Wireless Charging (Front & Rear)", "Rear AC Vents", "Paddle Shifters",
              "Soft Close Doors", "Head-Up Display"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster (12.3-inch)", "Touchscreen Infotainment System (12.8-inch MBUX)", "Nappa Leather Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Ambient Lighting (64 colors)",
              "Burmester 3D Surround Sound System", "Rear Seat Entertainment (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "DIGITAL LIGHT LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels (up to 20-inch)",
              "Integrated Antenna", "Chrome Grille", "Flush-mounted Door Handles",
              "Power Adjustable & Foldable ORVMs", "Electronic Boot Opening"
            ],
            "tyre": {
              "size": "255/45 R19 (Common)",
              "type": "Radial Tubeless",
              "wheelSize": "R19"
            },
            "bootOpening": "Electronic"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "10 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Assist", "360-degree Camera"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Global NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Burmester 3D Surround Sound System",
              "USB-C Ports (Fast Charging)", "Voice Command (MBUX AI)", "Steering-mounted controls",
              "Navigation with Live Traffic", "In-built Assistant"
            ]
          },
          "adasFeatures": {
            "features": [
              "Active Distance Assist DISTRONIC", "Active Steering Assist", "Active Lane Keeping Assist",
              "Active Blind Spot Assist", "Active Brake Assist with Cross-Traffic Function", "ATTENTION ASSIST",
              "PRE-SAFE® Impulse Side"
            ]
          },
          "internetFeatures": {
            "features": [
              "Mercedes Me Connect", "Live Location Tracking", "Remote Immobilizer",
              "Unauthorised Vehicle Entry Alert", "Engine Start Alarm", "Remote Vehicle Status Check",
              "Navigation with Live Traffic", "Send POI to Vehicle From App", "Live Weather",
              "E-Call & I-Call", "OTA Updates", "Google / Alexa Connectivity", "SOS Button",
              "RSA (Roadside Assistance)", "Over Speeding Alert", "Tow Away Alert", "Smartwatch App",
              "Valet Mode", "Remote AC On/Off", "Remote Door Lock/Unlock", "Remote Vehicle Ignition Start/Stop",
              "Remote Boot Open", "Geo-fence Alert"
            ]
          }
        }
      },
      {
        id: 'mercedes-g-class',
        videoPoster: mercedesg,
        videoSrc: "https://www.youtube.com/embed/W9l6D0pWq4c",
        thumbnail: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
        title: "Mercedes-Benz G-Class",
        "link": "https://www.mercedes-benz.co.in/passengercars/models/g-class/suv-w463/explore.html",
        description: "The Mercedes-Benz G-Class (G-Wagen) is an iconic off-road legend that combines rugged capability with supreme luxury, making it a unique statement of power and prestige.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "G-Wagen (G-Class)",
          "manufacturer": "Mercedes-Benz",
          "year": 2025,
          "price": "₹ 2.90 - 4.80 Cr (on-road, Nagpur) - estimated for current models",
          "engineAndTransmission": {
            "engineType": "Diesel / Petrol",
            "displacement": "2925 cc (Diesel), 3982 cc (Petrol - AMG G 63)",
            "maxPower": "325.86 bhp (G 400d) - 576.63 bhp (AMG G 63)",
            "maxTorque": "700 Nm (G 400d) - 850 Nm (AMG G 63)",
            "cylinders": "6 (Diesel), 8 (Petrol)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "CRDI (Diesel), Bi-Turbo (Petrol)",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "9-Speed 9G-TRONIC (G 400d), AMG SPEEDSHIFT TCT 9G (AMG G 63)",
            "driveType": "All-Wheel Drive (AWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Diesel / Petrol",
            "mileage": "6.1 kmpl (Diesel - City), 8.47 kmpl (Petrol) (ARAI)",
            "fuelTankCapacity": "100 Litres",
            "emissionNorm": "BS VI"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double-wishbone independent suspension",
            "rearSuspension": "Rigid axle with coil springs",
            "steeringType": "Electric (Power assisted)",
            "steeringColumn": "Adjustable",
            "turningRadius": "N/A",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Ventilated Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4817 mm - 4866 mm",
            "width": "1931 mm - 1984 mm",
            "height": "1969 mm",
            "seatingCapacity": 5,
            "groundClearance": "241 mm",
            "wheelBase": "2890 mm",
            "numberOfDoors": 5,
            "bootSpace": "667 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (3-Zone)", "Cruise Control (Adaptive)",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Heated & Ventilated Front Seats with Massage Function",
              "Single Pane Sunroof", "Wireless Phone Charger", "Cooled & Heated Cupholders"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster (12.3-inch)", "Touchscreen Infotainment System (12.3-inch MBUX)", "Leather Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "Burmester 3D Sound System (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Roof Rails", "Side Steps", "Spare Wheel on Tailgate",
              "Power Adjustable & Foldable ORVMs", "Front & Rear Fog Lamps"
            ],
            "tyre": {
              "size": "265/60 R18 (Common), 275/50 R20 (AMG)",
              "type": "Radial Tubeless",
              "wheelSize": "R18 / R20"
            },
            "bootOpening": "Side-hinged"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "Multiple Airbags (9+)", "Electronic Stability Program (ESP)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Control", "Hill Descent Control", "360-degree Camera"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "Burmester 3D Sound System (Optional)",
              "USB Compatibility", "Voice Command (MBUX)", "Steering-mounted controls",
              "GPS Navigation System"
            ]
          },
          "adasFeatures": {
            "features": [
              "Lane Keep Assist", "Adaptive Cruise Control", "Autonomous Emergency Braking",
              "Blind Spot Detection"
            ]
          },
          "internetFeatures": {
            "features": [
              "Mercedes Me Connect"
            ]
          }
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
        "vehicleInfo": {
          "model": "C-Class",
          "manufacturer": "Mercedes-Benz",
          "year": 2025,
          "price": "₹ 68.00 - 75.00 Lakh (on-road, Nagpur) - estimated for current models",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel (Mild-Hybrid)",
            "displacement": "1496 cc (C 200 Petrol), 1993 cc (C 220d Diesel), 1999 cc (C 300 Petrol)",
            "maxPower": "197.13 bhp (C 200) - 254.79 bhp (C 300)",
            "maxTorque": "300 Nm (C 200) - 440 Nm (C 220d)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Turbocharged",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "9-Speed 9G-TRONIC",
            "driveType": "Rear-Wheel Drive (RWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "16.9 kmpl (Petrol), 23 kmpl (Diesel) (ARAI)",
            "fuelTankCapacity": "66 Litres",
            "emissionNorm": "BS VI 2.0"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Multi-link suspension",
            "rearSuspension": "Multi-link suspension",
            "steeringType": "Electric (Power assisted)",
            "steeringColumn": "Electric Tilt & Telescopic",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4751 mm",
            "width": "1820 mm - 2033 mm (with mirrors)",
            "height": "1437 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2865 mm",
            "numberOfDoors": 4,
            "bootSpace": "455 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Power Adjustable Front Seats with Memory",
              "Panoramic Sunroof", "Rear AC Vents", "Paddle Shifters", "Cooled Glovebox",
              "Heated & Ventilated Front Seats (on higher variants)"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster (12.3-inch)", "Touchscreen Infotainment System (11.9-inch MBUX)", "Leather Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "Burmester Sound System (Optional/Higher Variants)"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Integrated Antenna", "Chrome Grille", "Body-coloured Bumpers",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "205/55 R17 (Common)",
              "type": "Radial Tubeless",
              "wheelSize": "R17"
            },
            "bootOpening": "Smart/Electronic"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "7 Airbags", "Electronic Stability Program (ESP)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Assist", "Rear Camera", "360-degree Camera (on higher variants)"
            ],
            "ncapRating": {
              "adultOccupant": "Not Tested (for India specific model), 5 Star (Euro NCAP for global model)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Speakers (Multiple)", "USB Compatibility",
              "Voice Command (MBUX)", "Steering-mounted controls", "GPS Navigation System"
            ]
          },
          "adasFeatures": {
            "features": [
              "Active Braking Assist", "Lane Departure Warning (on some variants)", "High-beam Assist"
            ]
          },
          "internetFeatures": {
            "features": [
              "Mercedes Me Connect", "Remote Car Light Flashing & Honking Via app", "Remote Sunroof Open/Close Via app",
              "Alexa Compatibility", "Telematics"
            ]
          }
        }
      },
      {
        id: 'mercedes-glc', // Added GLC
        videoPoster: mercedesGlc,
        videoSrc: "https://www.youtube.com/embed/rK8v0N06a3Q", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
        title: "Mercedes-Benz GLC",
        "link": "https://www.mercedes-benz.co.in/passengercars/models/glc/suv-x254/explore.html",
        description: "The Mercedes-Benz GLC is a versatile mid-size luxury SUV combining elegant design with powerful performance and advanced technology, making it a popular choice.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "GLC",
          "manufacturer": "Mercedes-Benz",
          "year": 2025,
          "price": "₹ 88.00 - 92.00 Lakh (on-road, Nagpur) - estimated for current models",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel (Mild-Hybrid)",
            "displacement": "1999 cc (Petrol), 1993 cc (Diesel)",
            "maxPower": "255 bhp (GLC 300) - 194.44 bhp (GLC 220d)",
            "maxTorque": "400 Nm (GLC 300) - 440 Nm (GLC 220d)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Turbocharged",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "9-Speed 9G-TRONIC",
            "driveType": "All-Wheel Drive (AWD - 4MATIC)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "14.72 kmpl (Petrol), 19.4 kmpl (Diesel) (ARAI)",
            "fuelTankCapacity": "62 Litres",
            "emissionNorm": "BS VI"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Multi-link suspension",
            "rearSuspension": "Multi-link suspension",
            "steeringType": "Electric (Power assisted)",
            "steeringColumn": "Tilt and Telescopic",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4716 mm",
            "width": "1890 mm",
            "height": "1640 mm",
            "seatingCapacity": 5,
            "groundClearance": "201 mm",
            "wheelBase": "2888 mm",
            "numberOfDoors": 5,
            "bootSpace": "620 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Heated ORVMs",
              "Panoramic Sunroof", "Electrically Adjustable Front Seats", "Rear AC Vents",
              "Cooled Glovebox", "Paddle Shifters", "Hands-Free Tailgate", "Wireless Phone Charging"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster (12.3-inch)", "Touchscreen Infotainment System (11.9-inch MBUX)", "Leather Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "Burmester Sound System (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Roof Rails", "Body-coloured Bumpers", "Integrated Antenna",
              "Power Adjustable & Foldable ORVMs", "Front & Rear Fog Lamps"
            ],
            "tyre": {
              "size": "235/55 R19",
              "type": "Radial Tubeless",
              "wheelSize": "R19"
            },
            "bootOpening": "Electronic / Hands-Free"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "7 Airbags", "Electronic Stability Program (ESP)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Control", "Hill Descent Control", "360-degree Camera", "PRE-SAFE System"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "Speakers (Multiple)", "USB Compatibility",
              "Voice Command (MBUX)", "Steering-mounted controls", "GPS Navigation"
            ]
          },
          "adasFeatures": {
            "features": [
              "Active Parking Assist with Parktronic", "Blind Spot Camera", "Lane Departure Warning (on some variants)",
              "Forward Collision Warning", "Auto Emergency Braking", "Driver Drowsiness Detection"
            ]
          },
          "internetFeatures": {
            "features": [
              "Mercedes Me Connect", "Remote Climate Control", "Remote Trunk Opener",
              "Real-Time Vehicle Tracking"
            ]
          }
        }
      },
      {
        id: 'mercedes-eqs', // Added EQS (Electric)
        videoPoster: mercedesEqs,
        videoSrc: "https://www.youtube.com/embed/W9l6D0pWq4c", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
        title: "Mercedes-Benz EQS",
        "link": "https://www.mercedes-benz.co.in/passengercars/models/eqs/saloon-v297/explore.html",
        description: "The Mercedes-Benz EQS is the flagship electric luxury sedan, offering groundbreaking design, innovative technology, and a truly futuristic driving experience.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "EQS",
          "manufacturer": "Mercedes-Benz",
          "year": 2025,
          "price": "₹ 1.50 - 2.80 Cr (on-road, Nagpur) - estimated for current models",
          "engineAndTransmission": {
            "engineType": "Electric",
            "displacement": "N/A (Electric Motors)",
            "maxPower": "536 bhp (EQS 580 4MATIC) - 750.97 bhp (AMG EQS 53 4MATIC+)",
            "maxTorque": "855 Nm (EQS 580 4MATIC) - 1020 Nm (AMG EQS 53 4MATIC+)",
            "cylinders": "N/A",
            "valvesPerCylinder": "N/A",
            "valveConfiguration": "N/A",
            "fuelSupplySystem": "Electric Battery",
            "turboCharger": false,
            "transmissionType": "Automatic (Single-speed for EVs)",
            "gearbox": "N/A (Direct Drive)",
            "driveType": "All-Wheel Drive (AWD - 4MATIC)"
          },
          "fuelAndPerformance": {
            "fuelType": "Electric",
            "mileage": "813 - 857 km (ARAI Range - EQS 580), 526-580 km (ARAI Range - AMG EQS 53)",
            "fuelTankCapacity": "N/A (Battery Capacity: 107.8 kWh)",
            "emissionNorm": "Zero Emissions",
            "chargingTimeAC": "Approx. 5.5 hours (22 kW AC)",
            "chargingTimeDC": "Approx. 31 minutes (0-80% with 200 kW DC)"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Multi-Link with Air Suspension (AIRMATIC)",
            "rearSuspension": "Multi-Link with Air Suspension (AIRMATIC)",
            "steeringType": "Electric (Power assisted) with Rear-Axle Steering",
            "steeringColumn": "Electric Adjustable",
            "turningRadius": "5.75 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "5223 mm",
            "width": "1926 mm - 2125 mm (with mirrors)",
            "height": "1518 mm",
            "seatingCapacity": 5,
            "groundClearance": "110 mm",
            "wheelBase": "3210 mm",
            "numberOfDoors": 4,
            "bootSpace": "610 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-Zone THERMOTRONIC)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Heated, Ventilated & Massaging Front Seats",
              "Panoramic Sunroof", "Electrically Adjustable Rear Seats", "Wireless Phone Charging (Front & Rear)",
              "Paddle Shifters (for regenerative braking)", "Soft Close Doors", "Heated ORVMs"
            ]
          },
          "interior": {
            "features": [
              "MBUX Hyperscreen (56-inch curved display)", "Digital Instrument Cluster", "Leather Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Ambient Lighting (Active)",
              "Burmester 3D Surround Sound System", "Rear Seat Tablet (MBUX Rear Tablet)"
            ]
          },
          "exterior": {
            "features": [
              "DIGITAL LIGHT LED Headlamps", "LED DRLs", "LED Taillights", "Aerodynamic Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Flush Door Handles",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "275/40 R21",
              "type": "Radial Tubeless",
              "wheelSize": "R21"
            },
            "bootOpening": "Electronic"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "9 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Assist", "360-degree Camera", "PRE-SAFE System"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Burmester 3D Surround Sound System",
              "USB-C Ports", "Voice Command (MBUX AI)", "Steering-mounted controls",
              "GPS Navigation", "Head-Up Display"
            ]
          },
          "adasFeatures": {
            "features": [
              "Active Distance Assist DISTRONIC", "Active Steering Assist", "Active Lane Keeping Assist",
              "Active Blind Spot Assist", "Braking Aid with Cross-Traffic Function", "ATTENTION ASSIST",
              "PRE-SAFE® Impulse Side", "Active Parking Assist"
            ]
          },
          "internetFeatures": {
            "features": [
              "Mercedes Me Connect", "OTA Updates", "AI Voice Assistance", "Digital Key",
              "Geofencing", "SOS Button"
            ]
          }
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
        "link": "https://cars.tatamotors.com/suv/harrier",
        description: "The Tata Harrier is a mid-size SUV known for its impactful design, robust performance, and advanced features, offering a commanding road presence.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Harrier",
          "manufacturer": "Tata Motors",
          "year": 2025,
          "price": "₹ 18.26 - 32.25 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Diesel",
            "displacement": "1956 cc",
            "maxPower": "167.62 bhp @ 3750 rpm",
            "maxTorque": "350 Nm @ 1750-2500 rpm",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Common Rail Direct Injection",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (Torque Converter)",
            "gearbox": "6-speed Manual / 6-speed Automatic",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Diesel",
            "mileage": "16.8 kmpl (Manual), 14.6 kmpl (Automatic)",
            "fuelTankCapacity": "50 Litres",
            "emissionNorm": "BS VI 2.0",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Independent, Lower Wishbone, McPherson Strut with coil spring & Anti Roll Bar",
            "rearSuspension": "Semi Independent Twist Blade with Panhard Rod & Coil Spring",
            "steeringType": "Power assisted (Electric)",
            "steeringColumn": "Tilt & Telescopic",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "4605 mm",
            "width": "1922 mm",
            "height": "1718 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2741 mm",
            "numberOfDoors": 5,
            "bootSpace": "445 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual-zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Ventilated Front Seats",
              "Panoramic Sunroof", "Electrically Adjustable Driver Seat (6-way with memory)",
              "Wireless Phone Charging", "Paddle Shifters (on AT variants)", "Cooled Glove Box"
            ]
          },
          "interior": {
            "features": [
              "10.25-inch Digital Instrument Cluster with navigation", "Leather Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "JBL sound system (10 speakers)", "Rear AC Vents", "Rear Armrest with Cupholders"
            ]
          },
          "exterior": {
            "features": [
              "Connected LED DRLs", "Vertically-stacked LED Headlamps", "LED Taillights (Connected)",
              "17-inch / 18-inch / 19-inch Alloy Wheels", "Shark Fin Antenna", "Body-coloured Bumpers",
              "Gesture-controlled Powered Tailgate"
            ],
            "tyre": {
              "size": "235/65 R17 (varies by variant)",
              "type": "Radial Tubeless",
              "wheelSize": "R17 / R18 / R19"
            },
            "bootOpening": "Electric (gesture-controlled)"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "7 Airbags (top variants)", "Electronic Stability Program (ESP)",
              "Traction Control System (TCS)", "Hill Hold Control", "Tyre Pressure Monitoring System (TPMS)",
              "ISOFIX Child Seat Mounts", "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "360-degree Camera", "Emergency Brake Light Flashing", "Impact Sensing Auto Door Unlock",
              "Child Safety Lock", "Skid Plate (Front)"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star",
              "childOccupant": "5 Star"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "12.3-inch touchscreen infotainment system", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "JBL Sound System",
              "USB Ports", "Voice Command", "Steering-mounted controls",
              "GPS Navigation (on digital cluster)"
            ]
          },
          "adasFeatures": {
            "features": [
              "Adaptive Cruise Control with Stop-n-Go", "Lane Keep Assist", "Autonomous Emergency Braking",
              "Forward Collision Warning", "Rear Cross-Traffic Alert", "Blind Spot Detection",
              "High Beam Assist", "Traffic Sign Recognition"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Car Technology (iRA)", "OTA Updates", "Voice Alerts", "Arcade App Store (on some variants)"
            ]
          }
        }
      },
      {
        id: 'tata-punch',
        videoPoster: tatanexon, // Using Nexon image for Punch (assuming it matches or is a placeholder)
        videoSrc: "https://www.youtube.com/embed/smpE8K2ylPw",
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Punch",
        "link": "https://cars.tatamotors.com/suv/punch",
        description: "The Tata Punch is a micro-SUV offering a robust stance, high ground clearance, and a 5-star GNCAP safety rating, making it a powerful and safe urban companion.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Punch",
          "manufacturer": "Tata Motors",
          "year": 2025,
          "price": "₹ 7.31 - 12.28 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / CNG",
            "displacement": "1199 cc",
            "maxPower": "87 bhp @ 6000 rpm (Petrol), 72 bhp (CNG)",
            "maxTorque": "115 Nm @ 3250-3350 rpm (Petrol), 103 Nm (CNG)",
            "cylinders": "3",
            "valvesPerCylinder": "4",
            "valveConfiguration": "N/A",
            "fuelSupplySystem": "N/A",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (AMT)",
            "gearbox": "5-speed Manual / 5-speed Automatic (AMT)",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG",
            "mileage": "18.8 - 20.09 kmpl (Petrol), 26.99 km/kg (CNG)",
            "fuelTankCapacity": "37 Litres (Petrol)",
            "emissionNorm": "BS VI 2.0",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut suspension",
            "rearSuspension": "N/A",
            "steeringType": "Electric (Power assisted)",
            "steeringColumn": "Tilt",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3827 mm",
            "width": "1742 mm",
            "height": "1615 mm",
            "seatingCapacity": 5,
            "groundClearance": "187 mm",
            "wheelBase": "2445 mm",
            "numberOfDoors": 5,
            "bootSpace": "366 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control", "Cruise Control",
              "Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Height Adjustable Driver Seat",
              "Single-pane Sunroof", "Cooled Glove Box"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster", "Dual Tone Interiors", "Leather Wrapped Steering Wheel",
              "Rear Flat Floor", "Parcel Tray"
            ]
          },
          "exterior": {
            "features": [
              "Projector Headlamps", "LED Taillights", "LED DRLs", "16-inch Alloy Wheels",
              "Shark-fin antenna", "Roof Rails", "Puddle Lamps", "Power Adjustable & Folding ORVMs"
            ],
            "tyre": {
              "size": "195/60 R16",
              "type": "Radial Tubeless",
              "wheelSize": "R16"
            },
            "bootOpening": "Electromagnetic"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Dual Airbags", "ISOFIX Child Seat Mounts", "Child Safety Locks",
              "Rear Parking Camera with guidelines", "Anti-Pinch Power Windows (Driver's Window)",
              "Speed Alert", "Tyre Pressure Monitoring System (TPMS)"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star",
              "childOccupant": "4 Star"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.25-inch touchscreen infotainment system", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "6-speaker Harman sound system",
              "USB Ports", "Steering-mounted controls"
            ]
          },
          "adasFeatures": {
            "features": [
              "N/A"
            ]
          },
          "internetFeatures": {
            "features": [
              "N/A"
            ]
          }
        }
      },
      {
        id: 'tata-altroz',
        videoPoster: tataaltroz,
        videoSrc: "https://www.youtube.com/embed/O8fVsTeEe-c",
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Altroz",
        "link": "https://cars.tatamotors.com/hatchback/altroz",
        description: "The Tata Altroz is a premium hatchback known for its 5-star GNCAP safety rating, striking design, and comfortable cabin, offering a superior driving experience.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Altroz",
          "manufacturer": "Tata Motors",
          "year": 2025,
          "price": "₹ 8.02 - 13.52 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / CNG / Diesel",
            "displacement": "1199 cc (Petrol/CNG), 1497 cc (Diesel)",
            "maxPower": "86.79 bhp (Petrol), 72.49 bhp (CNG), 88.76 bhp (Diesel)",
            "maxTorque": "115 Nm (Petrol), 103 Nm (CNG), 200 Nm (Diesel)",
            "cylinders": "3 (Petrol/CNG), 4 (Diesel)",
            "valvesPerCylinder": "N/A",
            "valveConfiguration": "N/A",
            "fuelSupplySystem": "N/A",
            "turboCharger": "true(Diesel only)",
            "transmissionType": "Manual / Automatic (DCA)",
            "gearbox": "5-speed Manual / 6-speed DCA (Petrol)",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG / Diesel",
            "mileage": "18.5 - 26.20 kmpl (Petrol), 26.20 km/kg (CNG), 19.33 kmpl (Diesel)",
            "fuelTankCapacity": "37 Litres",
            "emissionNorm": "BS VI 2.0",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "N/A",
            "rearSuspension": "N/A",
            "steeringType": "Hydraulic (Power Assisted)",
            "steeringColumn": "Adjustable",
            "turningRadius": "5 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3990 mm",
            "width": "1755 mm",
            "height": "1523 mm",
            "seatingCapacity": 5,
            "groundClearance": "165 mm",
            "wheelBase": "2501 mm",
            "numberOfDoors": 5,
            "bootSpace": "345 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control with Rear AC Vents", "Cruise Control",
              "Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Wireless Phone Charging",
              "Voice-Assisted Electric Sunroof"
            ]
          },
          "interior": {
            "features": [
              "10.25-inch Ultra HD Touchscreen Infotainment", "Digital Instrument Cluster", "Dual Tone Interiors",
              "Leatherette Steering Wheel & Gear Knob (on higher variants)", "Ambient Lighting",
              "Cooled Glove Box"
            ]
          },
          "exterior": {
            "features": [
              "Slim LED DRLs", "Sleeker LED Headlamps", "Connected LED Taillamps", "16-inch Alloy Wheels",
              "Power Adjustable & Foldable ORVMs", "Shark Fin Antenna"
            ],
            "tyre": {
              "size": "N/A",
              "type": "Radial Tubeless",
              "wheelSize": "R16"
            },
            "bootOpening": "Electromagnetic"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Electronic Stability Program (ESP)", "6 Airbags (on higher variants)",
              "Tyre Pressure Monitoring System (TPMS)", "Child Safety Locks", "Rear View Camera (360-degree on top variants)",
              "ISOFIX Child Seat Mounts", "Blind Spot Monitor (on top variants)"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star",
              "childOccupant": "5 Star"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.25-inch touchscreen infotainment system", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Sound System",
              "USB Ports", "Voice Command", "Steering-mounted controls", "GPS Navigation"
            ]
          },
          "adasFeatures": {
            "features": [
              "N/A"
            ]
          },
          "internetFeatures": {
            "features": [
              "N/A"
            ]
          }
        }
      },
      {
        id: 'tata-nexon-ev', // Added Nexon EV
        videoPoster: tataNexonEv,
        videoSrc: "https://www.youtube.com/embed/xL-5j2uVwWw", // Example relevant video ID
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Nexon EV",
        "link": "https://ev.tatamotors.com/nexon-ev",
        description: "The Tata Nexon EV is India's best-selling electric SUV, offering impressive range, quick acceleration, and a connected drive experience.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Nexon EV",
          "manufacturer": "Tata Motors",
          "year": 2025,
          "price": "₹ 13.17 - 18.54 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Electric",
            "displacement": "N/A (Electric Motor)",
            "maxPower": "127 bhp (Medium Range), 142 bhp (Long Range)",
            "maxTorque": "215 Nm",
            "cylinders": "N/A",
            "valvesPerCylinder": "N/A",
            "valveConfiguration": "N/A",
            "fuelSupplySystem": "Electric Battery",
            "turboCharger": false,
            "transmissionType": "Automatic (Single-speed)",
            "gearbox": "N/A (Direct Drive)",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Electric",
            "mileage": "275 km (Medium Range), 489 km (Long Range) - ARAI Certified",
            "fuelTankCapacity": "N/A (Battery Capacity: 30 kWh / 40.5 kWh / 46.08 kWh)",
            "emissionNorm": "Zero Emissions",
            "chargingTimeAC": "Approx. 4 hrs 18 mins (7.2 kW charger, 10-100%)",
            "chargingTimeDC": "Approx. 40-56 mins (10-80% with 50-60 kW charger)"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Independent MacPherson strut with coil spring",
            "rearSuspension": "Twist beam with dual path Strut",
            "steeringType": "Power assisted (Electric)",
            "steeringColumn": "Tilt",
            "turningRadius": "5.3 metres",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3994 mm",
            "width": "1811 mm",
            "height": "1616 mm",
            "seatingCapacity": 5,
            "groundClearance": "205 mm",
            "wheelBase": "2498 mm",
            "numberOfDoors": 5,
            "bootSpace": "350 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control", "Cruise Control",
              "Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Automatic Headlamps", "Electric Sunroof (with tilt-function)", "Fast USB Charging Ports",
              "Regenerative Braking (with paddle shifters)", "IP67 Rated Battery Pack and Motor"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster", "Dual Tone Interiors (Purple & Black)", "Leather-wrapped Steering Wheel",
              "Voice Alerts"
            ]
          },
          "exterior": {
            "features": [
              "Projector Headlamps with Tri-Arrow DRLs", "Tri-arrow signature LED Tail lamps", "16-inch Alloy Wheels",
              "Shark Fin Antenna", "Roof Rails", "Body-coloured Bumpers", "Power Adjustable & Auto Folding ORVMs"
            ],
            "tyre": {
              "size": "215/60 R16",
              "type": "Radial Tubeless",
              "wheelSize": "R16"
            },
            "bootOpening": "Electric Tailgate Release"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Electronic Stability Program (ESP)", "6 Airbags",
              "Tyre Pressure Monitoring System (TPMS)", "Hill Hold Control", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer", "Rear Parking Camera",
              "Auto Battery Cut-off on Impact/Accident", "Emergency Brake Light Flashing"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star",
              "childOccupant": "5 Star"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.24-inch infotainment screen", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "USB Compatibility",
              "Voice Command (Google Assistant)", "Steering-mounted controls", "GPS Navigation System"
            ]
          },
          "adasFeatures": {
            "features": [
              "N/A"
            ]
          },
          "internetFeatures": {
            "features": [
              "Remote Vehicle Diagnostics", "Connected Car Technology"
            ]
          }
        }
      },
      {
        id: 'tata-safari', // Added Safari
        videoPoster: tataSafari,
        videoSrc: "https://www.youtube.com/embed/L1d_fW8H_1o", // Example relevant video ID
        thumbnail: "https://s7ap1.scene7.com/is/image/tatamotors/logo-new-black?$HL-50-33-D$&fit=fit&fmt=webp-alpha",
        title: "Tata Safari",
        "link": "https://cars.tatamotors.com/suv/safari",
        description: "The Tata Safari is a premium 7-seater SUV known for its iconic design, luxurious interiors, and strong road presence, offering a comfortable and powerful ride.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Safari",
          "manufacturer": "Tata Motors",
          "year": 2025,
          "price": "₹ 18.94 - 33.15 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Diesel",
            "displacement": "1956 cc",
            "maxPower": "167.62 bhp @ 3750 rpm",
            "maxTorque": "350 Nm @ 1750-2500 rpm",
            "cylinders": "4",
            "valvesPerCylinder": "N/A",
            "valveConfiguration": "N/A",
            "fuelSupplySystem": "Common Rail Direct Injection",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (Torque Converter)",
            "gearbox": "6-speed Manual / 6-speed Automatic",
            "driveType": "FWD"
          },
          "fuelAndPerformance": {
            "fuelType": "Diesel",
            "mileage": "16.3 kmpl (Manual), 14.5 kmpl (Automatic)",
            "fuelTankCapacity": "50 Litres",
            "emissionNorm": "BS VI 2.0",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Independent, Lower Wishbone, McPherson Strut with Coil Spring & Anti Roll Bar",
            "rearSuspension": "Semi Independent Twist Blade with Panhard Road & Coil Spring",
            "steeringType": "Power Assisted (Hydraulic)",
            "steeringColumn": "Tilt",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4668 mm",
            "width": "1922 mm",
            "height": "1786 mm",
            "seatingCapacity": 6,
            "groundClearance": "N/A",
            "wheelBase": "2741 mm",
            "numberOfDoors": 5,
            "bootSpace": "N/A"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual-zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Heated & Ventilated Front Seats",
              "Panoramic Sunroof (Voice Assisted)", "Electrically Adjustable Rear Seats", "Wireless Phone Charging",
              "Paddle Shifters", "Electronic Parking Brake with Auto Hold", "3rd Row AC Vents with 3-step blower adjustment"
            ]
          },
          "interior": {
            "features": [
              "12.29-inch Touchscreen Infotainment System", "10.25-inch Digital Instrument Cluster", "Leather Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "JBL Audio Modes (Harman AudioworX Advanced with 13 modes)", "Luxurious 3rd Row Seats"
            ]
          },
          "exterior": {
            "features": [
              "Bi-LED Projector Headlamps", "Sequential LED DRLs & Centre Position Lamp", "LED Taillights",
              "Iconic Roof Rails", "19-inch Alloy Wheels", "Integrated Antenna", "Body-coloured Bumpers",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "235/65 R17 (varies by variant)",
              "type": "Tubeless, Radial",
              "wheelSize": "R17 / R19"
            },
            "bootOpening": "N/A"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "7 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts", "Seat Belt Warning",
              "Child Safety Locks", "Engine Immobilizer", "Hill Hold Control", "360-degree Surround View System",
              "3-Point ELR Seat Belt for all Passengers with Reminder", "PRE-SAFE System (likely part of ADAS)"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star",
              "childOccupant": "5 Star"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "12.29-inch touchscreen infotainment system", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Harman AudioworX with JBL Audio Modes",
              "USB Ports", "Voice Command (250+ Native Voice Commands including Alexa Car2Home)",
              "Steering-mounted controls", "GPS Navigation"
            ]
          },
          "adasFeatures": {
            "features": [
              "Adaptive Cruise Control", "Lane Keeping Assist", "Autonomous Emergency Braking",
              "Forward Collision Warning", "Rear Cross-Traffic Alert", "Blind Spot Detection",
              "High Beam Assist", "Traffic Sign Recognition", "Door Open Alert", "Driver Attention Alert"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Vehicle Technology with iRA 2.0", "OTA Updates", "AI Voice Assistance", "Geofencing"
            ]
          }
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
        "link": "https://www.ford.in/suvs/endeavour/",
        description: "The Ford Endeavour is a robust and sophisticated SUV known for its commanding presence, powerful engine options, and off-road capabilities, perfect for adventurous families. (Discontinued in India as of 2021)",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Endeavour (Everest)",
          "manufacturer": "Ford",
          "year": 2025,
          "price": "₹ 41.5 - 59.1 Lakh (on-road, Nagpur) - estimated for 2025 models",
          "engineAndTransmission": {
            "engineType": "Diesel",
            "displacement": "1998 cc (Expected, possibly 3.0L V6 diesel in higher trims)",
            "maxPower": "Approx. 170 PS (2.0L Turbo Diesel), Approx. 250 hp (3.0L V6 Diesel)",
            "maxTorque": "Approx. 420 Nm (2.0L Turbo Diesel), N/A (3.0L V6 Diesel)",
            "cylinders": "4 (Expected for 2.0L), 6 (Expected for 3.0L)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Common Rail Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "10-speed Automatic",
            "driveType": "2WD/4WD"
          },
          "fuelAndPerformance": {
            "fuelType": "Diesel",
            "mileage": "N/A (Expected 12-14 kmpl)",
            "fuelTankCapacity": "80 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Independent Coil Spring with Anti-Roll Bar",
            "rearSuspension": "Watt's Linkage with Coil Spring and Anti-Roll Bar",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt and Telescopic Adjustable",
            "turningRadius": "5.8 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4914 mm",
            "width": "1923 mm",
            "height": "1842 mm",
            "seatingCapacity": 7,
            "groundClearance": "225 mm",
            "wheelBase": "2900 mm",
            "numberOfDoors": 5,
            "bootSpace": "N/A (Large with 3rd row folded)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "Powered Driver Seat (10-way adjustable)",
              "Panoramic Sunroof", "Electrically Foldable 3rd Row Seats", "Wireless Phone Charging",
              "Powered Tailgate (Gesture controlled)", "Heated and Ventilated Front Seats"
            ]
          },
          "interior": {
            "features": [
              "12-inch Touchscreen Infotainment", "12.4-inch Digital Instrument Cluster", "Leather Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "Premium Sound System", "Rear AC Vents"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Power Adjustable & Foldable ORVMs with Puddle Lamps"
            ],
            "tyre": {
              "size": "255/60 R18 or 265/50 R20",
              "type": "Radial Tubeless",
              "wheelSize": "R18/R20"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "7 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Launch Assist", "Hill Descent Control", "360-degree Camera",
              "Roll Stability Control", "Traction Control"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (ANCAP)",
              "childOccupant": "5 Star (ANCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Premium Sound System",
              "USB Ports", "Voice Command (SYNC system)", "Steering-mounted controls",
              "GPS Navigation", "FordPass Connected Car Tech"
            ]
          },
          "adasFeatures": {
            "features": [
              "Adaptive Cruise Control with Stop & Go", "Lane Keeping System", "Blind Spot Information System (BLIS)",
              "Pre-Collision Assist with Autonomous Emergency Braking", "Rear Cross-Traffic Alert",
              "Active Park Assist"
            ]
          },
          "internetFeatures": {
            "features": [
              "FordPass Connect", "OTA Updates", "Remote Start/Stop", "Vehicle Location",
              "Vehicle Health Alerts"
            ]
          }
        }
      },
      {
        id: 'ford-ecosport',
        videoPoster: fordecosport,
        videoSrc: "https://www.youtube.com/embed/y-T0c5c5A1E",
        thumbnail: "https://www.carlogos.org/car-logos/ford-logo-2017-640.png",
        title: "Ford EcoSport",
        "link": "https://www.india.ford.com/lp-ecosport/",
        description: "The Ford EcoSport is a compact SUV credited with popularizing the segment in India, known for its agile handling, robust build, and fun-to-drive nature. (Discontinued in India as of 2021)",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "EcoSport",
          "manufacturer": "Ford",
          "year": "Last available: 2021",
          "price": "₹ 9.57 - 14.06 Lakh (on-road, Nagpur) - last known prices",
          "engineAndTransmission": {
            "engineType": "Petrol/Diesel",
            "displacement": "1496 cc (Petrol), 1498 cc (Diesel)",
            "maxPower": "123 PS (Petrol), 100 PS (Diesel)",
            "maxTorque": "150 Nm (Petrol), 215 Nm (Diesel)",
            "cylinders": "3 (Petrol), 4 (Diesel)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-Point Fuel Injection (Petrol), Common Rail Direct Injection (Diesel)",
            "turboCharger": false,
            "transmissionType": "Manual/Automatic",
            "gearbox": "5-speed Manual, 6-speed Automatic (Petrol)",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol/Diesel",
            "mileage": "15.9 kmpl (Petrol AT), 18.88 kmpl (Petrol MT), 23 kmpl (Diesel) - ARAI",
            "fuelTankCapacity": "52 Litres",
            "emissionNorm": "BS6",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Independent MacPherson Strut with Coil Spring and Anti-Roll Bar",
            "rearSuspension": "Semi-Independent Twist Beam with Coil Spring and Twin Gas-and-Oil Filled Shock Absorbers",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt and Telescopic Adjustable",
            "turningRadius": "5.3 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3998 mm",
            "width": "1765 mm",
            "height": "1647 mm",
            "seatingCapacity": 5,
            "groundClearance": "200 mm",
            "wheelBase": "2519 mm",
            "numberOfDoors": 5,
            "bootSpace": "352 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control", "Rear Parking Sensors",
              "Engine Start/Stop Button", "Keyless Entry", "Rain Sensing Wipers",
              "Automatic Headlamps", "Rear Defogger", "Power Windows", "Steering Mounted Controls"
            ]
          },
          "interior": {
            "features": [
              "Touchscreen Infotainment System (8-inch)", "Digital Instrument Cluster (partial)", "Fabric/Leatherette Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Ambient Lighting (select variants)"
            ]
          },
          "exterior": {
            "features": [
              "Halogen/Projector Headlamps", "LED DRLs", "LED Tail Lamps", "Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "205/60 R16",
              "type": "Radial Tubeless",
              "wheelSize": "R16"
            },
            "bootOpening": "Manual (Side-hinged)"
          },
          "safety": {
            "features": [
              "ABS with EBD", "6 Airbags (Top Variants)", "Electronic Stability Control (ESC)",
              "Traction Control System (TCS)", "Hill Launch Assist (HLA)", "Tyre Pressure Monitoring System (TPMS)",
              "ISOFIX Child Seat Mounts", "Seat Belt Warning", "Door Ajar Warning",
              "Engine Immobilizer", "Rear View Camera"
            ],
            "ncapRating": {
              "adultOccupant": "4 Star (Global NCAP)",
              "childOccupant": "4 Star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "USB Ports", "Voice Command", "Steering-mounted controls",
              "GPS Navigation (via smartphone integration)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": ["FordPass Connect (Select variants)"]
          }
        }
      },
      {
        id: 'ford-freestyle',
        videoPoster: fordfreestyle,
        videoSrc: "https://www.youtube.com/embed/wXz4yqM0oKk",
        thumbnail: "https://www.carlogos.org/car-logos/ford-logo-2017-640.png",
        title: "Ford Freestyle",
        "link": "https://www.india.ford.com/cars/freestyle/",
        description: "The Ford Freestyle is a CUV (Compact Utility Vehicle) offering a rugged appeal, peppy engine, and comfortable ride, ideal for adventurous urbanites. (Discontinued in India as of 2021)",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Freestyle",
          "manufacturer": "Ford",
          "year": "Last available: 2021",
          "price": "₹ 6.96 - 10.75 Lakh (on-road, Nagpur) - last known prices",
          "engineAndTransmission": {
            "engineType": "Petrol/Diesel",
            "displacement": "1194 cc (Petrol), 1498 cc (Diesel)",
            "maxPower": "96 PS (Petrol), 100 PS (Diesel)",
            "maxTorque": "120 Nm (Petrol), 215 Nm (Diesel)",
            "cylinders": "3 (Petrol), 4 (Diesel)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-Point Fuel Injection (Petrol), Common Rail Direct Injection (Diesel)",
            "turboCharger": false,
            "transmissionType": "Manual",
            "gearbox": "5-speed Manual",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol/Diesel",
            "mileage": "18.5 - 19 kmpl (Petrol), 23 - 24.4 kmpl (Diesel) - ARAI",
            "fuelTankCapacity": "42 Litres",
            "emissionNorm": "BS6",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Independent MacPherson Strut",
            "rearSuspension": "Semi-Independent Twist Beam",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt Adjustable",
            "turningRadius": "5.05 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3954 mm",
            "width": "1737 mm",
            "height": "1570 mm",
            "seatingCapacity": 5,
            "groundClearance": "190 mm",
            "wheelBase": "2490 mm",
            "numberOfDoors": 5,
            "bootSpace": "257 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control", "Rear Parking Sensors",
              "Engine Start/Stop Button", "Keyless Entry", "Rain Sensing Wipers",
              "Automatic Headlamps", "Rear Defogger", "Power Windows", "Steering Mounted Controls"
            ]
          },
          "interior": {
            "features": [
              "Touchscreen Infotainment System (6.5-inch)", "Digital Instrument Cluster (partial)", "Fabric Upholstery",
              "Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Integrated Music System"
            ]
          },
          "exterior": {
            "features": [
              "Halogen Headlamps", "DRLs", "Tail Lamps", "Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "185/60 R15",
              "type": "Radial Tubeless",
              "wheelSize": "R15"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "6 Airbags (Top Variants)", "Electronic Stability Control (ESC)",
              "Traction Control System (TCS)", "Hill Launch Assist (HLA)", "Tyre Pressure Monitoring System (TPMS - not on all variants)",
              "ISOFIX Child Seat Mounts", "Seat Belt Warning", "Door Ajar Warning",
              "Engine Immobilizer", "Rear View Camera"
            ],
            "ncapRating": {
              "adultOccupant": "4 Star (Global NCAP)",
              "childOccupant": "4 Star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "USB Ports", "Voice Command", "Steering-mounted controls",
              "GPS Navigation (via smartphone integration)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": ["FordPass Connect (Select variants)"]
          }
        }
      },
      {
        id: 'ford-figo', // Added Figo
        videoPoster: fordfigo,
        videoSrc: "https://www.youtube.com/embed/Yp_Zf6zE0mU", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/ford-logo-2017-640.png",
        title: "Ford Figo",
        "link": "https://www.india.ford.com/cars/figo/",
        description: "The Ford Figo is a spirited hatchback known for its strong build quality, peppy performance, and fun-to-drive dynamics, offering excellent value. (Discontinued in India as of 2021)",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Figo",
          "manufacturer": "Ford",
          "year": "Last available: 2021",
          "price": "₹ 6.17 - 9.98 Lakh (on-road, Nagpur) - last known prices",
          "engineAndTransmission": {
            "engineType": "Petrol/Diesel",
            "displacement": "1194 cc (Petrol), 1498 cc (Diesel)",
            "maxPower": "96 PS (Petrol), 100 PS (Diesel)",
            "maxTorque": "120 Nm (Petrol), 215 Nm (Diesel)",
            "cylinders": "3 (Petrol), 4 (Diesel)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-Point Fuel Injection (Petrol), Common Rail Direct Injection (Diesel)",
            "turboCharger": false,
            "transmissionType": "Manual/Automatic",
            "gearbox": "5-speed Manual, 6-speed Automatic (Petrol)",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol/Diesel",
            "mileage": "18.5 - 20.4 kmpl (Petrol), 24.4 - 25.5 kmpl (Diesel) - ARAI",
            "fuelTankCapacity": "42 Litres",
            "emissionNorm": "BS6",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Independent MacPherson Strut",
            "rearSuspension": "Semi-Independent Twist Beam",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt Adjustable",
            "turningRadius": "4.9 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3941 mm",
            "width": "1704 mm",
            "height": "1525 mm",
            "seatingCapacity": 5,
            "groundClearance": "174 mm",
            "wheelBase": "2490 mm",
            "numberOfDoors": 5,
            "bootSpace": "257 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control", "Rear Parking Sensors",
              "Engine Start/Stop Button", "Keyless Entry", "Rear Defogger",
              "Power Windows", "Steering Mounted Controls"
            ]
          },
          "interior": {
            "features": [
              "Touchscreen Infotainment System (6.5-inch)", "Digital Instrument Cluster (partial)", "Fabric Upholstery",
              "Single Tone/Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Integrated Music System"
            ]
          },
          "exterior": {
            "features": [
              "Halogen Headlamps", "DRLs", "Tail Lamps", "Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "175/65 R14 or 195/55 R15",
              "type": "Radial Tubeless",
              "wheelSize": "R14/R15"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "6 Airbags (Top Variants)", "Electronic Stability Control (ESC - AT only)",
              "Traction Control System (TCS - AT only)", "Hill Launch Assist (HLA - AT only)",
              "ISOFIX Child Seat Mounts", "Seat Belt Warning", "Door Ajar Warning",
              "Engine Immobilizer", "Rear View Camera"
            ],
            "ncapRating": {
              "adultOccupant": "4 Star (Global NCAP)",
              "childOccupant": "4 Star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "USB Ports", "Voice Command", "Steering-mounted controls",
              "GPS Navigation (via smartphone integration)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": ["FordPass Connect (Select variants)"]
          }
        }
      },
      {
        id: 'ford-aspire', // Added Aspire
        videoPoster: fordaspire,
        videoSrc: "https://www.youtube.com/embed/xL-5j2uVwWw", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/ford-logo-2017-640.png",
        title: "Ford Aspire",
        "link": "https://www.india.ford.com/cars/aspire/",
        description: "The Ford Aspire is a compact sedan based on the Figo, offering a blend of spacious interiors, efficient engines, and strong safety features. (Discontinued in India as of 2021)",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Aspire",
          "manufacturer": "Ford",
          "year": "Last available: 2021",
          "price": "₹ 8.53 - 10.39 Lakh (on-road, Nagpur) - last known prices",
          "engineAndTransmission": {
            "engineType": "Petrol/Diesel",
            "displacement": "1194 cc (Petrol), 1498 cc (Diesel)",
            "maxPower": "96 PS (Petrol), 100 PS (Diesel)",
            "maxTorque": "120 Nm (Petrol), 215 Nm (Diesel)",
            "cylinders": "3 (Petrol), 4 (Diesel)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-Point Fuel Injection (Petrol), Common Rail Direct Injection (Diesel)",
            "turboCharger": false,
            "transmissionType": "Manual/Automatic",
            "gearbox": "5-speed Manual, 6-speed Automatic (Petrol)",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol/Diesel",
            "mileage": "18.16 - 20.4 kmpl (Petrol), 24.4 - 26.1 kmpl (Diesel) - ARAI",
            "fuelTankCapacity": "42 Litres",
            "emissionNorm": "BS6",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Independent MacPherson Strut",
            "rearSuspension": "Semi-Independent Twist Beam",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt Adjustable",
            "turningRadius": "4.9 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3995 mm",
            "width": "1704 mm",
            "height": "1525 mm",
            "seatingCapacity": 5,
            "groundClearance": "174 mm",
            "wheelBase": "2490 mm",
            "numberOfDoors": 4,
            "bootSpace": "359 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control", "Rear Parking Sensors",
              "Engine Start/Stop Button", "Keyless Entry", "Rear Defogger",
              "Power Windows", "Steering Mounted Controls"
            ]
          },
          "interior": {
            "features": [
              "Touchscreen Infotainment System (6.5-inch)", "Digital Instrument Cluster (partial)", "Fabric Upholstery",
              "Single Tone/Dual Tone Interiors", "Leather-wrapped Steering Wheel", "Integrated Music System"
            ]
          },
          "exterior": {
            "features": [
              "Halogen Headlamps", "DRLs", "Tail Lamps", "Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "175/65 R14 or 195/55 R15",
              "type": "Radial Tubeless",
              "wheelSize": "R14/R15"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "6 Airbags (Top Variants)", "Electronic Stability Control (ESC - AT only)",
              "Traction Control System (TCS - AT only)", "Hill Launch Assist (HLA - AT only)",
              "ISOFIX Child Seat Mounts", "Seat Belt Warning", "Door Ajar Warning",
              "Engine Immobilizer", "Rear View Camera"
            ],
            "ncapRating": {
              "adultOccupant": "3 Star (Global NCAP)",
              "childOccupant": "3 Star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "USB Ports", "Voice Command", "Steering-mounted controls",
              "GPS Navigation (via smartphone integration)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": ["FordPass Connect (Select variants)"]
          }
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
        "link": "https://www.audi.in/in/web/en/models/a4/a4-sedan.html",
        description: "The Audi A4 is a luxury sedan embodying sophisticated design, advanced technology, and a dynamic driving experience, perfect for executive comfort.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "A4",
          "manufacturer": "Audi",
          "year": 2024,
          "price": "₹ 55.53 - 67.42 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol (Mild Hybrid)",
            "displacement": "1984 cc",
            "maxPower": "201 bhp @ 4475-6000 rpm",
            "maxTorque": "320 Nm @ 1450-4475 rpm",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "7-Speed S tronic (DCT)",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "17.4 kmpl (ARAI)",
            "fuelTankCapacity": "54 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "5-link Suspension with Tubular Anti-roll Bar",
            "rearSuspension": "5-link Suspension with Tubular Anti-roll Bar",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt & Telescopic Adjustable",
            "turningRadius": "5.8 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4762 mm",
            "width": "1847 mm",
            "height": "1433 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2819 mm",
            "numberOfDoors": 4,
            "bootSpace": "460 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (3-Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Powered Front Seats",
              "Sunroof", "Rear AC Vents", "Wireless Phone Charging", "Paddle Shifters", "Power Windows"
            ]
          },
          "interior": {
            "features": [
              "Audi Virtual Cockpit Plus", "10.1-inch MMI Touchscreen Infotainment", "Leather Upholstery",
              "Dual Tone Interiors (Optional)", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "Audi Sound System", "Rear Seat Armrest"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps with DRLs", "LED Taillights", "Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "225/50 R17",
              "type": "Radial Tubeless",
              "wheelSize": "R17"
            },
            "bootOpening": "Electromagnetic"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "8 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Assist", "Rear View Camera", "Overspeed Warning"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Audi Sound System",
              "USB Ports", "Voice Command", "Steering-mounted controls",
              "MMI Navigation plus", "Audi Phone Box"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": ["Audi Connect (Functions may vary by region/subscription)"]
          }
        }
      },
      {
        id: 'audi-a6',
        videoPoster: audiA6,
        videoSrc: "https://www.youtube.com/embed/fW_n5wI9E7c",
        thumbnail: "https://www.carlogos.org/car-logos/audi-logo-2016-640.png",
        title: "Audi A6",
        "link": "https://www.audi.in/in/web/en/models/a6/a6-sedan.html",
        description: "The Audi A6 is a luxurious executive sedan that combines progressive design with cutting-edge technology and refined performance, setting new standards for comfort and innovation.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "A6",
          "manufacturer": "Audi",
          "year": 2024,
          "price": "₹ 76.28 - 83.60 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol (Mild Hybrid)",
            "displacement": "1984 cc",
            "maxPower": "261 bhp @ 5250-6500 rpm",
            "maxTorque": "370 Nm @ 1600-4500 rpm",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "7-Speed S tronic (DCT)",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "14 kmpl (ARAI)",
            "fuelTankCapacity": "73 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "5-link Suspension",
            "rearSuspension": "5-link Suspension",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Height & Reach Adjustable",
            "turningRadius": "5.5 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Ventilated Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4939 mm",
            "width": "1886 mm",
            "height": "1470 mm",
            "seatingCapacity": 5,
            "groundClearance": "165 mm",
            "wheelBase": "2924 mm",
            "numberOfDoors": 4,
            "bootSpace": "530 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Powered Front Seats with Memory",
              "Panoramic Sunroof", "Rear AC Vents", "Wireless Phone Charging", "Paddle Shifters", "Soft Close Doors"
            ]
          },
          "interior": {
            "features": [
              "Dual Touchscreens (10.1-inch & 8.6-inch)", "Audi Virtual Cockpit", "Leather Upholstery",
              "Wood/Aluminium Inlays", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "Bang & Olufsen Premium Sound System (Optional)", "Rear Seat Tablet (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "Matrix LED Headlamps with DRLs", "LED Taillights with Dynamic Indicators", "Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "225/55 R19",
              "type": "Radial Tubeless",
              "wheelSize": "R19"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Assist", "360-degree Camera (Optional)", "Lane Departure Warning",
              "High-beam Assist"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Premium Sound System",
              "USB Ports", "Voice Command (MMI Touch Response)", "Steering-mounted controls",
              "MMI Navigation plus", "Audi Connect"
            ]
          },
          "adasFeatures": {
            "features": [
              "Adaptive Cruise Assist (Optional)", "Park Assist Plus (Optional)", "Lane Keeping Assist (Optional)",
              "Blind Spot Information System (Optional)"
            ]
          },
          "internetFeatures": {
            "features": ["Audi Connect (Functions may vary by region/subscription)"]
          }
        }
      },
      {
        id: 'audi-q7',
        videoPoster: audiQ7,
        videoSrc: "https://www.youtube.com/embed/z0N_fQ-Fw1s",
        thumbnail: "https://www.carlogos.org/car-logos/audi-logo-2016-640.png",
        title: "Audi Q7",
        "link": "https://www.audi.in/in/web/en/models/q7/q7-teaser.html",
        description: "The Audi Q7 is a luxurious and versatile SUV offering a commanding presence, spacious interiors, and advanced technology, perfect for families seeking comfort and performance.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Q7",
          "manufacturer": "Audi",
          "year": 2024,
          "price": "₹ 1.06 - 1.16 Crore (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol (Mild Hybrid)",
            "displacement": "2995 cc",
            "maxPower": "335 bhp @ 5200-6400 rpm",
            "maxTorque": "500 Nm @ 1370-4500 rpm",
            "cylinders": "6",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "8-speed Tiptronic (Torque Converter)",
            "driveType": "All-Wheel Drive (AWD - quattro)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "11.2 kmpl (ARAI)",
            "fuelTankCapacity": "85 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Adaptive Air Suspension",
            "rearSuspension": "Adaptive Air Suspension",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt & Telescopic Adjustable",
            "turningRadius": "N/A",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "5063 mm",
            "width": "1970 mm",
            "height": "1741 mm",
            "seatingCapacity": 7,
            "groundClearance": "N/A (Adjustable with air suspension)",
            "wheelBase": "2995 mm",
            "numberOfDoors": 5,
            "bootSpace": "295 Litres (all 7 seats up), 865 Litres (3rd row folded), 2050 Litres (2nd & 3rd row folded)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Heated & Ventilated Front Seats (Optional)",
              "Panoramic Sunroof", "Electrically Foldable 3rd Row Seats", "Wireless Phone Charging",
              "Powered Tailgate", "Soft Close Doors", "Rear AC Vents"
            ]
          },
          "interior": {
            "features": [
              "Dual Touchscreens (10.1-inch & 8.6-inch)", "Audi Virtual Cockpit", "Leather Upholstery",
              "Wood/Aluminium Inlays", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "Bang & Olufsen Premium 3D Sound System (Optional)", "Rear Seat Entertainment (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "Matrix LED Headlamps with DRLs", "LED Taillights with Dynamic Indicators", "Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "285/45 R20 or 285/40 R21",
              "type": "Radial Tubeless",
              "wheelSize": "R20/R21"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "8 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Assist", "Hill Descent Control", "360-degree Camera", "PRE-SENSE Basic"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Premium Sound System",
              "USB Ports", "Voice Command (MMI Touch Response)", "Steering-mounted controls",
              "MMI Navigation plus", "Audi Connect"
            ]
          },
          "adasFeatures": {
            "features": [
              "Park Assist", "Lane Departure Warning", "Adaptive Cruise Assist (Optional)",
              "Blind Spot Information System (Optional)"
            ]
          },
          "internetFeatures": {
            "features": ["Audi Connect (Functions may vary by region/subscription)"]
          }
        }
      },
      {
        id: 'audi-q3', // Added Q3
        videoPoster: audiQ3,
        videoSrc: "https://www.youtube.com/embed/S_8qM9P4E5A", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/audi-logo-2016-640.png",
        title: "Audi Q3",
        "link": "https://www.audi.in/in/web/en/models/q3/q3.html",
        description: "The Audi Q3 is a compact luxury SUV that combines a sporty design with practical utility, offering a premium experience for urban and adventurous drives.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Q3",
          "manufacturer": "Audi",
          "year": 2024,
          "price": "₹ 53.67 - 66.23 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "1984 cc",
            "maxPower": "187.74 bhp @ 4200-6000 rpm",
            "maxTorque": "320 Nm @ 1500-4100 rpm",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "7-Speed S tronic (DCT)",
            "driveType": "All-Wheel Drive (AWD - quattro)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "14.93 kmpl (ARAI)",
            "fuelTankCapacity": "62 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with Lower Wishbones",
            "rearSuspension": "Four-link Axle",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt & Telescopic Adjustable",
            "turningRadius": "5.95 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4485 mm",
            "width": "1849 mm",
            "height": "1607 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2680 mm",
            "numberOfDoors": 5,
            "bootSpace": "460 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual-Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "Powered Front Seats",
              "Panoramic Sunroof", "Rear AC Vents", "Wireless Phone Charging", "Powered Tailgate"
            ]
          },
          "interior": {
            "features": [
              "10.25-inch Digital Instrument Cluster (Audi Virtual Cockpit)", "10.1-inch MMI Touchscreen Infotainment", "Leatherette Upholstery",
              "Aluminium Inlays", "Leather-wrapped Steering Wheel", "Ambient Lighting (30 Colors)",
              "Audi Sound System (10 Speakers)", "Rear Seat Armrest"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps with DRLs", "LED Taillights with Dynamic Indicators", "Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "235/55 R18",
              "type": "Radial Tubeless",
              "wheelSize": "R18"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Assist", "Rear View Camera"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Audi Sound System",
              "USB Ports", "Voice Command", "Steering-mounted controls",
              "MMI Navigation plus"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": ["Audi Connect (Functions may vary by region/subscription)"]
          }
        }
      },
      {
        id: 'audi-a3', // Added A3 Sedan (if relevant for the Indian market, otherwise another Q model)
        videoPoster: audiA3,
        videoSrc: "https://www.youtube.com/embed/S_8qM9P4E5A", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/audi-logo-2016-640.png",
        title: "Audi A3 Sedan",
        "link": "https://www.audi.in/in/web/en/models/a3/a3-sedan.html",
        description: "The Audi A3 Sedan offers a compact yet sophisticated luxury experience, combining elegant design with agile performance and advanced technology. (Discontinued in India as of 2020)",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "A3 Sedan",
          "manufacturer": "Audi",
          "year": "Last available: 2020",
          "price": "₹ 31.21 - 35.00 Lakh (on-road, Nagpur) - last known prices for New A3",
          "engineAndTransmission": {
            "engineType": "Petrol/Diesel",
            "displacement": "1395 cc (Petrol), 1968 cc (Diesel)",
            "maxPower": "148 bhp (Petrol), 141 bhp (Diesel)",
            "maxTorque": "250 Nm (Petrol), 320 Nm (Diesel)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection (Petrol), CRDi (Diesel)",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "7-Speed S tronic (DCT - Petrol), 6-Speed S tronic (DCT - Diesel)",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol/Diesel",
            "mileage": "19.2 kmpl (Petrol), 20.38 kmpl (Diesel) - ARAI",
            "fuelTankCapacity": "50 Litres",
            "emissionNorm": "BS4",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Four-link Axle",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt & Telescopic Adjustable",
            "turningRadius": "5.3 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4458 mm",
            "width": "1796 mm",
            "height": "1416 mm",
            "seatingCapacity": 5,
            "groundClearance": "165 mm",
            "wheelBase": "2637 mm",
            "numberOfDoors": 4,
            "bootSpace": "425 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual Zone)", "Cruise Control",
              "Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Powered Driver Seat",
              "Sunroof (Optional)", "Rear AC Vents", "Power Windows", "Steering Mounted Controls"
            ]
          },
          "interior": {
            "features": [
              "Pop-up MMI Display", "Digital Instrument Cluster (partial)", "Leather Upholstery",
              "Aluminium Inlays", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "Audi Sound System"
            ]
          },
          "exterior": {
            "features": [
              "Xenon Plus Headlamps with LED DRLs", "LED Taillights", "Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "205/55 R16",
              "type": "Radial Tubeless",
              "wheelSize": "R16"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "7 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Assist", "Rear View Camera (Optional)"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Integrated (in-dash) Music System", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "Audi Sound System",
              "USB Ports", "Voice Command", "Steering-mounted controls",
              "MMI Navigation"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": []
          }
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
        "link": "https://www.landrover.in/range-rover/range-rover-evoque/index.html",
        description: "The Range Rover Evoque is a sophisticated compact SUV known for its distinctive coupe-like silhouette, luxurious interiors, and refined performance, ideal for urban elegance.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Evoque",
          "manufacturer": "Land Rover",
          "year": 2025,
          "price": "₹ 79.43 - 81.35 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel",
            "displacement": "1997 cc (Petrol), 1998 cc (Diesel)",
            "maxPower": "247 bhp (Petrol), 201 bhp (Diesel)",
            "maxTorque": "365 Nm (Petrol), 430 Nm (Diesel)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "9-speed Automatic",
            "driveType": "All-Wheel Drive (AWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "N/A (Expected 10-12 kmpl for Petrol, 13-15 kmpl for Diesel)",
            "fuelTankCapacity": "67 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Integral Multi-Link",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Manual/Electric Adjustable",
            "turningRadius": "N/A",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4371 mm",
            "width": "1996 mm (with mirrors folded)",
            "height": "1649 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "2681 mm",
            "numberOfDoors": 5,
            "bootSpace": "472 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual-Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "Powered Front Seats",
              "Panoramic Glass Roof", "Rear AC Vents", "Wireless Phone Charging", "Powered Tailgate"
            ]
          },
          "interior": {
            "features": [
              "11.4-inch Curved Touchscreen (Pivi Pro)", "Digital Instrument Cluster", "Leather Upholstery",
              "Configurable Cabin Lighting", "Meridian Sound System (Optional)", "Rear Armrest"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps with Signature DRLs", "LED Taillights", "18-inch to 21-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Flush Deployable Door Handles",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "N/A (Varies with wheel size)",
              "type": "Radial Tubeless",
              "wheelSize": "R18-R21"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Launch Assist", "Hill Descent Control", "360-degree Surround Camera (Optional)",
              "Terrain Response 2 (Optional)", "Wade Sensing (Optional)"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Pivi Pro Infotainment System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Meridian Sound System (Optional)",
              "USB-C Ports", "Voice Control", "Steering-mounted controls",
              "GPS Navigation", "Wi-Fi Hotspot"
            ]
          },
          "adasFeatures": {
            "features": [
              "Lane Keep Assist", "Driver Condition Monitor", "Emergency Braking",
              "Rear Traffic Monitor", "Blind Spot Assist (Optional)", "Adaptive Cruise Control (Optional)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Navigation", "Software Over The Air (SOTA)", "Remote App"
            ]
          }
        }
      },
      {
        id: 'range-rover-sport',
        videoPoster: rangeRoverSport,
        videoSrc: "https://www.youtube.com/embed/mG6rFv0kS-Y",
        thumbnail: "https://www.rangerover.com/content/dam/lrdx/logo/Range_Rover_Black.svg",
        title: "Range Rover Sport",
        "link": "https://www.landrover.in/range-rover/range-rover-sport/index.html",
        description: "The Range Rover Sport combines dynamic driving performance with typical Range Rover luxury and capability, offering a compelling blend of athleticism and refinement.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Range Rover Sport",
          "manufacturer": "Land Rover",
          "year": 2025,
          "price": "₹ 1.83 - 2.80 Crore (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel (Mild Hybrid)",
            "displacement": "2997 cc (Petrol), 2997 cc (Diesel)",
            "maxPower": "394 bhp (Petrol), 346 bhp (Diesel)",
            "maxTorque": "550 Nm (Petrol), 700 Nm (Diesel)",
            "cylinders": "6",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "8-speed Automatic",
            "driveType": "All-Wheel Drive (AWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "N/A (Expected 10-12 kmpl for Petrol, 12-14 kmpl for Diesel)",
            "fuelTankCapacity": "80 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Dynamic Air Suspension",
            "rearSuspension": "Dynamic Air Suspension",
            "steeringType": "Electric Power Assisted with All-Wheel Steering (Optional)",
            "steeringColumn": "Electric Adjustable",
            "turningRadius": "N/A",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Ventilated Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4946 mm",
            "width": "2047 mm (with mirrors folded)",
            "height": "1820 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A (Adjustable Air Suspension)",
            "wheelBase": "2997 mm",
            "numberOfDoors": 5,
            "bootSpace": "835 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Digital LED Headlamps", "Heated, Ventilated & Massaging Front and Rear Seats",
              "Panoramic Sunroof", "Wireless Phone Charging", "Soft Close Doors", "Heated Steering Wheel",
              "Powered Tailgate (Gesture controlled)", "Cabin Air Purification Pro", "Configurable Programs (driving modes)"
            ]
          },
          "interior": {
            "features": [
              "13.1-inch Curved Floating Touchscreen", "13.7-inch Interactive Driver Display", "Meridian Sound System (Up to 29 speakers)",
              "Semi-Aniline Leather Seats", "Configurable Cabin Lighting", "Head-Up Display (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "Digital LED Headlamps with Signature DRLs", "LED Taillights", "21-inch to 23-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Flush Deployable Door Handles",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "N/A (Varies with wheel size)",
              "type": "Radial Tubeless",
              "wheelSize": "R21-R23"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "Multiple Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Launch Assist", "Hill Descent Control", "360-degree Surround Camera",
              "Terrain Response 2", "Wade Sensing", "ClearSight Ground View"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Pivi Pro Infotainment System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Meridian Sound System",
              "USB-C Ports", "Voice Control", "Steering-mounted controls",
              "GPS Navigation", "Wi-Fi Hotspot"
            ]
          },
          "adasFeatures": {
            "features": [
              "Adaptive Cruise Control with Steering Assist", "Lane Keep Assist", "Blind Spot Assist",
              "Rear Collision Monitor", "Front and Rear Parking Aid", "Traffic Sign Recognition with Adaptive Speed Limiter",
              "Driver Condition Monitor", "Emergency Braking"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Navigation Pro", "Software Over The Air (SOTA)", "Remote App"
            ]
          }
        }
      },
      {
        id: 'range-rover-velar',
        videoPoster: rangeRoverVelar,
        videoSrc: "https://www.youtube.com/embed/A6yV5lD5M6c",
        thumbnail: "https://www.rangerover.com/content/dam/lrdx/logo/Range_Rover_Black.svg",
        title: "Range Rover Velar",
        "link": "https://www.landrover.in/range-rover/range-rover-velar/index.html",
        description: "The Range Rover Velar is a mid-size luxury SUV defined by its reductive design, elegant proportions, and seamless technology, delivering a sophisticated driving experience.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Velar",
          "manufacturer": "Land Rover",
          "year": 2025,
          "price": "₹ 99.88 Lakh - 1.01 Crore (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel",
            "displacement": "1997 cc (Petrol), 1998 cc (Diesel)",
            "maxPower": "247 bhp (Petrol), 201 bhp (Diesel)",
            "maxTorque": "365 Nm (Petrol), 430 Nm (Diesel)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "8-speed Automatic",
            "driveType": "All-Wheel Drive (AWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "N/A (Expected 11-13 kmpl for Petrol, 14-16 kmpl for Diesel)",
            "fuelTankCapacity": "67 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Electronic Air Suspension (Optional)",
            "rearSuspension": "Electronic Air Suspension (Optional)",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Electric Adjustable",
            "turningRadius": "N/A",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4797 mm",
            "width": "2041 mm (with mirrors folded)",
            "height": "1683 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A (Adjustable Air Suspension)",
            "wheelBase": "2874 mm",
            "numberOfDoors": 5,
            "bootSpace": "552 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual-Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Pixel LED Headlamps", "Heated & Ventilated Front Seats",
              "Panoramic Sunroof", "Wireless Phone Charging", "Powered Tailgate (Gesture controlled)",
              "Cabin Air Purification Plus"
            ]
          },
          "interior": {
            "features": [
              "11.4-inch Curved Floating Touchscreen (Pivi Pro)", "Digital Instrument Cluster", "Leather Upholstery",
              "Kvadrat Wool Blend Upholstery (Optional)", "Configurable Cabin Lighting", "Meridian Sound System (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "Pixel LED Headlamps with Signature DRLs", "LED Taillights", "19-inch to 22-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Flush Deployable Door Handles",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "N/A (Varies with wheel size)",
              "type": "Radial Tubeless",
              "wheelSize": "R19-R22"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Launch Assist", "Hill Descent Control", "360-degree Surround Camera (Optional)",
              "Terrain Response 2", "Wade Sensing", "ClearSight Ground View"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Pivi Pro Infotainment System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Meridian Sound System (Optional)",
              "USB-C Ports", "Voice Control", "Steering-mounted controls",
              "GPS Navigation", "Wi-Fi Hotspot"
            ]
          },
          "adasFeatures": {
            "features": [
              "Adaptive Cruise Control", "Lane Keep Assist", "Blind Spot Assist",
              "Rear Collision Monitor", "Front and Rear Parking Aid", "Traffic Sign Recognition with Adaptive Speed Limiter",
              "Driver Condition Monitor", "Emergency Braking"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Navigation Pro", "Software Over The Air (SOTA)", "Remote App"
            ]
          }
        }
      },
      {
        id: 'land-rover-discovery-sport', // Added Discovery Sport (under Land Rover, which is part of JLR, shared brand identity)
        videoPoster: rangeRoverDefender, // Using Defender as a placeholder
        videoSrc: "https://www.youtube.com/embed/g2J03fK-5tI", // Example relevant video ID
        thumbnail: "https://www.landrover.in/content/dam/landrover/global/logos/land-rover-logo.png",
        title: "Land Rover Discovery Sport",
        "link": "https://www.landrover.in/vehicles/discovery-sport/index.html",
        description: "The Land Rover Discovery Sport is a versatile and compact SUV offering impressive capability, flexible seating for up to seven, and a refined driving experience.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Discovery Sport",
          "manufacturer": "Land Rover",
          "year": 2025,
          "price": "₹ 79.43 - 81.35 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel",
            "displacement": "1997 cc (Petrol), 1998 cc (Diesel)",
            "maxPower": "247 bhp (Petrol), 201 bhp (Diesel)",
            "maxTorque": "365 Nm (Petrol), 430 Nm (Diesel)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "9-speed Automatic",
            "driveType": "All-Wheel Drive (AWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "N/A (Expected 10-12 kmpl for Petrol, 13-15 kmpl for Diesel)",
            "fuelTankCapacity": "65 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Integral Multi-Link",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Manual Adjustable",
            "turningRadius": "N/A",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4597 mm",
            "width": "2069 mm (with mirrors folded)",
            "height": "1727 mm",
            "seatingCapacity": "5 or 7",
            "groundClearance": "N/A",
            "wheelBase": "2741 mm",
            "numberOfDoors": 5,
            "bootSpace": "115 Litres (7-seater with all seats up), 754 Litres (5-seater)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual-Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "Powered Front Seats",
              "Panoramic Sunroof", "Rear AC Vents", "Wireless Phone Charging", "Powered Tailgate"
            ]
          },
          "interior": {
            "features": [
              "11.4-inch Curved Floating Touchscreen (Pivi Pro)", "Digital Instrument Cluster", "Leatherette Upholstery",
              "Configurable Cabin Lighting", "Meridian Sound System (Optional)", "Sliding & Reclining 2nd Row Seats"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps with Signature DRLs", "LED Taillights", "18-inch to 20-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Power Adjustable & Foldable ORVMs",
              "Roof Rails"
            ],
            "tyre": {
              "size": "N/A (Varies with wheel size)",
              "type": "Radial Tubeless",
              "wheelSize": "R18-R20"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Launch Assist", "Hill Descent Control", "360-degree Surround Camera (Optional)",
              "Terrain Response 2", "Wade Sensing", "ClearSight Ground View"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Pivi Pro Infotainment System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Meridian Sound System (Optional)",
              "USB-C Ports", "Voice Control", "Steering-mounted controls",
              "GPS Navigation", "Wi-Fi Hotspot"
            ]
          },
          "adasFeatures": {
            "features": [
              "Lane Keep Assist", "Driver Condition Monitor", "Emergency Braking",
              "Rear Traffic Monitor", "Blind Spot Assist (Optional)", "Adaptive Cruise Control (Optional)"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Navigation", "Software Over The Air (SOTA)", "Remote App"
            ]
          }
        }
      },
      {
        id: 'land-rover-defender', // Added Defender
        videoPoster: rangeRoverDefender,
        videoSrc: "https://www.youtube.com/embed/rK8v0N06a3Q", // Example relevant video ID
        thumbnail: "https://www.landrover.in/content/dam/landrover/global/logos/land-rover-logo.png",
        title: "Land Rover Defender",
        "link": "https://www.landrover.in/vehicles/defender/index.html",
        description: "The Land Rover Defender is an icon reborn, blending legendary capability with modern technology and rugged luxury, ready for any adventure.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Defender (90, 110, 130)",
          "manufacturer": "Land Rover",
          "year": 2025,
          "price": "₹ 1.05 - 2.85 Crore (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel (Mild Hybrid)",
            "displacement": "1997 cc (P300), 2997 cc (P400 & D300)",
            "maxPower": "296 bhp (P300), 394 bhp (P400), 296 bhp (D300)",
            "maxTorque": "400 Nm (P300), 550 Nm (P400), 650 Nm (D300)",
            "cylinders": "4 (P300), 6 (P400 & D300)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "8-speed Automatic",
            "driveType": "All-Wheel Drive (AWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "N/A (Varies greatly by engine and variant)",
            "fuelTankCapacity": "90 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Electronic Air Suspension (Coil springs on base 90)",
            "rearSuspension": "Electronic Air Suspension (Coil springs on base 90)",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Manual/Electric Adjustable",
            "turningRadius": "5.62 m (90), 6.4 m (110), 6.9 m (130)",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Ventilated Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4583 mm (90), 5018 mm (110), 5358 mm (130)",
            "width": "2105 mm (with mirrors folded)",
            "height": "1969 mm",
            "seatingCapacity": "5 or 6 (90), 5, 6 or 7 (110), 8 (130)",
            "groundClearance": "291 mm (Adjustable Air Suspension)",
            "wheelBase": "2587 mm (90), 3022 mm (110), 3022 mm (130)",
            "numberOfDoors": "3 (90), 5 (110, 130)",
            "bootSpace": "397 Litres (90), 786 Litres (110 - 5-seater), 389 Litres (110 - 7-seater, all seats up), 290 Litres (130 - all 8 seats up)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (2/3-Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Matrix LED Headlamps", "Heated & Ventilated Front Seats (Optional)",
              "Sliding Panoramic Roof (Optional)", "Rear AC Vents", "Wireless Phone Charging", "Powered Tailgate"
            ]
          },
          "interior": {
            "features": [
              "11.4-inch Pivi Pro Touchscreen", "12.3-inch Interactive Driver Display", "Leather/Robust Woven Textile Upholstery",
              "Wood/Open-Pore Veneers", "Configurable Cabin Lighting", "Meridian Sound System (Optional)",
              "ClearSight Interior Rear View Mirror (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "Matrix LED Headlamps with Signature DRLs", "LED Taillights", "18-inch to 22-inch Steel/Alloy Wheels",
              "External Side-mounted Gear Carrier (Accessory)", "Deployable Roof Ladder (Accessory)",
              "Integrated Antenna", "Body-coloured/Contrast Roof Options", "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "N/A (Varies with wheel size)",
              "type": "Radial Tubeless",
              "wheelSize": "R18-R22"
            },
            "bootOpening": "Side-hinged (Swing Gate)"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Terrain Response 2", "All Terrain Progress Control (ATPC)", "Wade Sensing",
              "ClearSight Ground View", "360-degree Surround Camera", "Emergency Braking"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Pivi Pro Infotainment System", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Meridian Sound System (Optional)",
              "USB-C Ports", "Voice Control", "Steering-mounted controls",
              "GPS Navigation", "Wi-Fi Hotspot"
            ]
          },
          "adasFeatures": {
            "features": [
              "Adaptive Cruise Control", "Lane Keep Assist", "Blind Spot Assist",
              "Rear Traffic Monitor", "Traffic Sign Recognition with Adaptive Speed Limiter",
              "Driver Condition Monitor", "Park Assist"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Navigation Pro", "Software Over The Air (SOTA)", "Remote App"
            ]
          }
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
        "link": "https://www.rolls-roycemotorcars.com/en_GB/bespoke/phantom-family/phantom.html",
        description: "The Rolls-Royce Phantom is the epitome of luxury, representing unparalleled craftsmanship, serene comfort, and bespoke personalization, a true masterpiece of automotive artistry.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Phantom VIII",
          "manufacturer": "Rolls-Royce",
          "year": 2025,
          "price": "₹ 10.50 - 12.00 Crore (Ex-showroom, India; on-road highly bespoke)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "6749 cc",
            "maxPower": "563 bhp @ 5000 rpm",
            "maxTorque": "900 Nm @ 1700 rpm",
            "cylinders": "12",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "8-speed ZF Automatic",
            "driveType": "Rear-Wheel Drive (RWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "N/A (Approx. 6-7 kmpl)",
            "fuelTankCapacity": "100 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double Wishbone Front Axle with Self-levelling Air Suspension",
            "rearSuspension": "5-link Rear Axle with Self-levelling Air Suspension",
            "steeringType": "Electric Power Assisted with Rear-wheel Steering",
            "steeringColumn": "Electric Adjustable",
            "turningRadius": "N/A",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Ventilated Disc"
          },
          "dimensionsAndCapacity": {
            "length": "5762 mm (SWB), 5982 mm (EWB)",
            "width": "2018 mm",
            "height": "1646 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "3552 mm (SWB), 3772 mm (EWB)",
            "numberOfDoors": 4,
            "bootSpace": "548 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Laser Headlamps", "Heated, Ventilated & Massaging Front and Rear Seats",
              "Starlight Headliner", "Electrically Operated Rear Coach Doors", "Wireless Phone Charging",
              "Soft Close Doors", "Heated Steering Wheel", "Powered Tailgate", "Cool Box"
            ]
          },
          "interior": {
            "features": [
              "The Gallery (Customisable Dashboard Art Piece)", "Digital Instrument Cluster", "Finest Hand-stitched Leather Upholstery",
              "Extensive Wood and Metal Veneers", "Deep Pile Lambswool Floor Mats", "Ambient Lighting",
              "Bespoke Audio System", "Rear Picnic Tables", "Rear Theatre Configuration"
            ]
          },
          "exterior": {
            "features": [
              "Laser Headlamps with LED DRLs", "LED Taillights", "21-inch to 22-inch Forged Alloy Wheels",
              "Integrated Antenna", "Unique Spirit of Ecstasy Ornament", "Power Adjustable & Foldable ORVMs",
              "Coach Doors"
            ],
            "tyre": {
              "size": "N/A (Varies by bespoke choice)",
              "type": "Run-flat Tyres",
              "wheelSize": "R21-R22"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "Multiple Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Assist", "360-degree Surround View Camera", "Night Vision Assist", "Active Lane Departure Warning"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Bespoke Infotainment System", "AM/FM Radio", "Bluetooth Connectivity",
              "Apple CarPlay", "Bespoke Audio System", "USB Ports", "Voice Control",
              "Steering-mounted controls", "GPS Navigation", "Wi-Fi Hotspot"
            ]
          },
          "adasFeatures": {
            "features": [
              "Active Cruise Control", "Lane Departure Warning", "Collision Warning",
              "Pedestrian Recognition", "Rear Cross Traffic Alert", "Park Assist"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Services (Bespoke)", "Real-time Traffic Information"
            ]
          }
        }
      },
      {
        id: 'rolls-royce-cullinan',
        videoPoster: rollsRoyceCullinan,
        videoSrc: "https://www.youtube.com/embed/yF-k_R3zV0A", // User's selected video, kept as is.
        thumbnail: "https://www.carlogos.org/logo/Rolls-Royce-RR-logo-1920x1080.png",
        title: "Rolls-Royce Cullinan",
        "link": "https://www.rolls-roycemotorcars.com/en_GB/bespoke/cullinan-family/cullinan.html",
        description: "The Rolls-Royce Cullinan is the brand's first SUV, offering an 'Effortless Everywhere' experience with supreme luxury and exceptional off-road capability, defining new boundaries for ultra-luxury travel.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Cullinan",
          "manufacturer": "Rolls-Royce",
          "year": 2025,
          "price": "₹ 8.00 - 9.50 Crore (Ex-showroom, India; on-road highly bespoke)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "6749 cc",
            "maxPower": "563 bhp @ 5000 rpm",
            "maxTorque": "850 Nm @ 1600 rpm",
            "cylinders": "12",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "8-speed ZF Automatic",
            "driveType": "All-Wheel Drive (AWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "N/A (Approx. 5-7 kmpl)",
            "fuelTankCapacity": "100 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double Wishbone Front Axle with Self-levelling Air Suspension",
            "rearSuspension": "5-link Rear Axle with Self-levelling Air Suspension",
            "steeringType": "Electric Power Assisted with Rear-wheel Steering",
            "steeringColumn": "Electric Adjustable",
            "turningRadius": "N/A",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Ventilated Disc"
          },
          "dimensionsAndCapacity": {
            "length": "5341 mm",
            "width": "2164 mm",
            "height": "1835 mm",
            "seatingCapacity": "4 or 5",
            "groundClearance": "N/A (Adjustable Air Suspension)",
            "wheelBase": "3295 mm",
            "numberOfDoors": 5,
            "bootSpace": "560 Litres (600 Litres with parcel shelf removed)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Laser Headlamps", "Heated, Ventilated & Massaging Front and Rear Seats",
              "Panoramic Glass Roof", "Electrically Operated Rear Coach Doors", "Wireless Phone Charging",
              "Soft Close Doors", "Heated Steering Wheel", "Powered Tailgate (Clamshell Design)", "Cool Box",
              "Viewing Suite (Optional)"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster", "Finest Hand-stitched Leather Upholstery", "Extensive Wood and Metal Veneers",
              "Deep Pile Lambswool Floor Mats", "Ambient Lighting", "Bespoke Audio System",
              "Rear Picnic Tables", "Rear Theatre Configuration"
            ]
          },
          "exterior": {
            "features": [
              "Laser Headlamps with LED DRLs", "LED Taillights", "21-inch to 22-inch Forged Alloy Wheels",
              "Integrated Antenna", "Unique Spirit of Ecstasy Ornament", "Power Adjustable & Foldable ORVMs",
              "Coach Doors", "Off-Road Mode"
            ],
            "tyre": {
              "size": "N/A (Varies by bespoke choice)",
              "type": "Run-flat Tyres",
              "wheelSize": "R21-R22"
            },
            "bootOpening": "Powered (Clamshell)"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "Multiple Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Assist", "Hill Descent Control", "360-degree Surround View Camera",
              "Night Vision Assist", "Active Lane Departure Warning", "Off-Road Driving Aids"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Bespoke Infotainment System", "AM/FM Radio", "Bluetooth Connectivity",
              "Apple CarPlay", "Bespoke Audio System", "USB Ports", "Voice Control",
              "Steering-mounted controls", "GPS Navigation", "Wi-Fi Hotspot"
            ]
          },
          "adasFeatures": {
            "features": [
              "Active Cruise Control", "Lane Departure Warning", "Collision Warning",
              "Pedestrian Recognition", "Rear Cross Traffic Alert", "Park Assist"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Services (Bespoke)", "Real-time Traffic Information"
            ]
          }
        }
      },
      {
        id: 'rolls-royce-ghost',
        videoPoster: rollsRoyceGhost,
        videoSrc: "https://www.youtube.com/embed/hJdY1jS5N50",
        thumbnail: "https://www.carlogos.org/logo/Rolls-Royce-RR-logo-1920x1080.png",
        title: "Rolls-Royce Ghost",
        "link": "https://www.rolls-roycemotorcars.com/en_GB/bespoke/ghost-family/ghost.html",
        description: "The Rolls-Royce Ghost is a more contemporary and driver-focused Rolls-Royce, embodying 'Post Opulence' design with minimalist aesthetics and advanced technology, providing a refined and dynamic journey.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Ghost (Series II)",
          "manufacturer": "Rolls-Royce",
          "year": 2025,
          "price": "₹ 7.00 - 8.50 Crore (Ex-showroom, India; on-road highly bespoke)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "6749 cc",
            "maxPower": "563 bhp @ 5000 rpm",
            "maxTorque": "850 Nm @ 1600 rpm",
            "cylinders": "12",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "8-speed ZF Automatic",
            "driveType": "All-Wheel Drive (AWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "N/A (Approx. 6-8 kmpl)",
            "fuelTankCapacity": "82.5 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double Wishbone Front Axle with Planar Suspension System and Self-levelling Air Suspension",
            "rearSuspension": "5-link Rear Axle with Self-levelling Air Suspension",
            "steeringType": "Electric Power Assisted with Rear-wheel Steering",
            "steeringColumn": "Electric Adjustable",
            "turningRadius": "N/A",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Ventilated Disc"
          },
          "dimensionsAndCapacity": {
            "length": "5546 mm (SWB), 5716 mm (EWB)",
            "width": "1978 mm",
            "height": "1571 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A",
            "wheelBase": "3295 mm (SWB), 3465 mm (EWB)",
            "numberOfDoors": 4,
            "bootSpace": "507 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Laser Headlamps", "Heated, Ventilated & Massaging Front and Rear Seats",
              "Starlight Headliner (Optional)", "Electrically Operated Rear Coach Doors", "Wireless Phone Charging",
              "Soft Close Doors", "Heated Steering Wheel", "Powered Tailgate", "Micro-environment Purification System"
            ]
          },
          "interior": {
            "features": [
              "Illuminated Fascia (Ghost specific)", "Digital Instrument Cluster", "Finest Hand-stitched Leather Upholstery",
              "Extensive Wood and Metal Veneers", "Lambswool Floor Mats (Optional)", "Ambient Lighting",
              "Bespoke Audio System", "Rear Picnic Tables"
            ]
          },
          "exterior": {
            "features": [
              "Laser Headlamps with LED DRLs", "LED Taillights", "20-inch to 21-inch Alloy Wheels",
              "Integrated Antenna", "Unique Spirit of Ecstasy Ornament", "Power Adjustable & Foldable ORVMs",
              "Coach Doors"
            ],
            "tyre": {
              "size": "N/A (Varies by bespoke choice)",
              "type": "Run-flat Tyres",
              "wheelSize": "R20-R21"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "Multiple Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Assist", "360-degree Surround View Camera", "Night Vision Assist", "Active Lane Departure Warning"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Bespoke Infotainment System", "AM/FM Radio", "Bluetooth Connectivity",
              "Apple CarPlay", "Bespoke Audio System", "USB Ports", "Voice Control",
              "Steering-mounted controls", "GPS Navigation", "Wi-Fi Hotspot"
            ]
          },
          "adasFeatures": {
            "features": [
              "Active Cruise Control", "Lane Departure Warning", "Collision Warning",
              "Pedestrian Recognition", "Rear Cross Traffic Alert", "Park Assist"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Services (Bespoke)", "Real-time Traffic Information"
            ]
          }
        }
      },
      {
        id: 'rolls-royce-wraith', // Added Wraith
        videoPoster: rollsRoyceWraith,
        videoSrc: "https://www.youtube.com/embed/hJdY1jS5N50", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Rolls-Royce-RR-logo-1920x1080.png",
        title: "Rolls-Royce Wraith",
        "link": "https://www.rolls-roycemotorcars.com/en_GB/bespoke/wraith-family/wraith.html",
        description: "The Rolls-Royce Wraith is a powerful and dramatic grand tourer, combining athletic styling with effortless performance and uncompromised luxury. (Production ended in 2023)",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Wraith",
          "manufacturer": "Rolls-Royce",
          "year": 2025,
          "price": "₹ 6.20 - 7.50 Crore (Ex-showroom, India; on-road highly bespoke)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "6592 cc",
            "maxPower": "624 bhp @ 5600 rpm",
            "maxTorque": "820 Nm @ 1500-5500 rpm",
            "cylinders": "12",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "8-speed ZF Automatic (Satellite-Aided Transmission)",
            "driveType": "Rear-Wheel Drive (RWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "N/A (Approx. 6-8 kmpl)",
            "fuelTankCapacity": "83 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double Wishbone Front Axle with Self-levelling Air Suspension",
            "rearSuspension": "Multi-link Rear Axle with Self-levelling Air Suspension",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Electric Adjustable",
            "turningRadius": "N/A",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Ventilated Disc"
          },
          "dimensionsAndCapacity": {
            "length": "5285 mm",
            "width": "1947 mm",
            "height": "1507 mm",
            "seatingCapacity": 4,
            "groundClearance": "N/A",
            "wheelBase": "3112 mm",
            "numberOfDoors": 2,
            "bootSpace": "470 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "Heated & Massaging Front Seats",
              "Starlight Headliner (Optional)", "Electrically Operated Rear Coach Doors", "Wireless Phone Charging",
              "Soft Close Doors", "Heated Steering Wheel", "Powered Tailgate"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster", "Finest Hand-stitched Leather Upholstery", "Extensive Wood and Metal Veneers",
              "Deep Pile Lambswool Floor Mats", "Ambient Lighting", "Bespoke Audio System",
              "Rear Picnic Tables"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps with DRLs", "LED Taillights", "20-inch to 21-inch Alloy Wheels",
              "Integrated Antenna", "Unique Spirit of Ecstasy Ornament", "Power Adjustable & Foldable ORVMs",
              "Coach Doors"
            ],
            "tyre": {
              "size": "N/A (Varies by bespoke choice)",
              "type": "Run-flat Tyres",
              "wheelSize": "R20-R21"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "Multiple Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Assist", "360-degree Surround View Camera", "Night Vision Assist", "Active Lane Departure Warning"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Bespoke Infotainment System", "AM/FM Radio", "Bluetooth Connectivity",
              "Apple CarPlay", "Bespoke Audio System", "USB Ports", "Voice Control",
              "Steering-mounted controls", "GPS Navigation", "Wi-Fi Hotspot"
            ]
          },
          "adasFeatures": {
            "features": [
              "Active Cruise Control", "Lane Departure Warning", "Collision Warning",
              "Pedestrian Recognition", "Rear Cross Traffic Alert", "Park Assist"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Services (Bespoke)", "Real-time Traffic Information"
            ]
          }
        }
      },
      {
        id: 'rolls-royce-dawn', // Added Dawn
        videoPoster: rollsRoyceDawn,
        videoSrc: "https://www.youtube.com/embed/zH8zQ8B4P0w", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/logo/Rolls-Royce-RR-logo-1920x1080.png",
        title: "Rolls-Royce Dawn",
        "link": "https://www.rolls-roycemotorcars.com/en_GB/bespoke/dawn-family/dawn.html",
        description: "The Rolls-Royce Dawn is a luxurious drophead coupé, offering an unparalleled open-top driving experience with a blend of elegance, comfort, and dynamic presence. (Production ended in 2023)",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Dawn",
          "manufacturer": "Rolls-Royce",
          "year": 2025,
          "price": "₹ 6.00 - 7.20 Crore (Ex-showroom, India; on-road highly bespoke)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "6592 cc",
            "maxPower": "563 bhp @ 5250 rpm",
            "maxTorque": "820 Nm @ 1500 rpm",
            "cylinders": "12",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "8-speed ZF Automatic (Satellite-Aided Transmission)",
            "driveType": "Rear-Wheel Drive (RWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "N/A (Approx. 6-8 kmpl)",
            "fuelTankCapacity": "82.5 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double Wishbone Front Axle with Self-levelling Air Suspension",
            "rearSuspension": "Multi-link Rear Axle with Self-levelling Air Suspension",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Electric Adjustable",
            "turningRadius": "N/A",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Ventilated Disc"
          },
          "dimensionsAndCapacity": {
            "length": "5285 mm",
            "width": "1947 mm",
            "height": "1502 mm",
            "seatingCapacity": 4,
            "groundClearance": "N/A",
            "wheelBase": "3112 mm",
            "numberOfDoors": 2,
            "bootSpace": "244 Litres (Roof down), 295 Litres (Roof up)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "Heated & Massaging Front Seats",
              "Power-operated Fabric Roof (operates in 22 seconds up to 50 km/h)", "Electrically Operated Rear Coach Doors",
              "Wireless Phone Charging", "Soft Close Doors", "Heated Steering Wheel", "Powered Tailgate",
              "Neck Warmers"
            ]
          },
          "interior": {
            "features": [
              "Digital Instrument Cluster", "Finest Hand-stitched Leather Upholstery", "Extensive Wood and Metal Veneers",
              "Deep Pile Lambswool Floor Mats", "Ambient Lighting", "Bespoke Audio System",
              "Rear Picnic Tables"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps with DRLs", "LED Taillights", "20-inch to 21-inch Alloy Wheels",
              "Integrated Antenna", "Unique Spirit of Ecstasy Ornament", "Power Adjustable & Foldable ORVMs",
              "Coach Doors"
            ],
            "tyre": {
              "size": "N/A (Varies by bespoke choice)",
              "type": "Run-flat Tyres",
              "wheelSize": "R20-R21"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "Multiple Airbags", "Electronic Stability Control (ESC)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Assist", "360-degree Surround View Camera", "Night Vision Assist", "Active Lane Departure Warning"
            ],
            "ncapRating": {
              "adultOccupant": "N/A",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "Bespoke Infotainment System", "AM/FM Radio", "Bluetooth Connectivity",
              "Apple CarPlay", "Bespoke Audio System", "USB Ports", "Voice Control",
              "Steering-mounted controls", "GPS Navigation", "Wi-Fi Hotspot"
            ]
          },
          "adasFeatures": {
            "features": [
              "Active Cruise Control", "Lane Departure Warning", "Collision Warning",
              "Pedestrian Recognition", "Rear Cross Traffic Alert", "Park Assist"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Services (Bespoke)", "Real-time Traffic Information"
            ]
          }
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
        link: "https://auto.mahindra.com/suv/xuv700",
        description: "The Mahindra XUV700 is a feature-packed SUV offering segment-leading technology, powerful engine options, and a high safety rating, providing a premium experience.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "XUV700",
          "manufacturer": "Mahindra",
          "year": 2025,
          "price": "₹ 15.65 - 31.86 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel",
            "displacement": "1997 cc (Petrol), 2184 cc (Diesel)",
            "maxPower": "197 bhp @ 5000 rpm (Petrol), 182 bhp @ 3500 rpm (Diesel)",
            "maxTorque": "380 Nm @ 1750-3000 rpm (Petrol MT), 380 Nm @ 1750-3000 rpm (Petrol AT), 420 Nm @ 1600-2800 rpm (Diesel MT), 450 Nm @ 1750-2800 rpm (Diesel AT)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic",
            "gearbox": "6-speed Manual / 6-speed Automatic",
            "driveType": "Front-Wheel Drive (FWD) / All-Wheel Drive (AWD - Diesel AT only)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "N/A (Expected 13-16 kmpl for Petrol, 15-18 kmpl for Diesel)",
            "fuelTankCapacity": "60 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with FSD (Frequency Selective Damping) and Stabilizer bar",
            "rearSuspension": "Multi-link Independent Suspension with FSD and Stabilizer bar",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt & Telescopic Adjustable",
            "turningRadius": "5.5 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4695 mm",
            "width": "1890 mm",
            "height": "1755 mm",
            "seatingCapacity": "5 or 7",
            "groundClearance": "N/A",
            "wheelBase": "2750 mm",
            "numberOfDoors": 5,
            "bootSpace": "N/A (Approx. 400 Litres for 5-seater, 170 Litres for 7-seater with all seats up)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "Powered Driver Seat with Memory",
              "Panoramic Sunroof (Skyroof)", "Rear AC Vents", "Wireless Phone Charging", "Push Button Start/Stop",
              "Electrically Adjustable & Foldable ORVMs", "AdrenoX Connect"
            ]
          },
          "interior": {
            "features": [
              "Dual 10.25-inch Screens (Infotainment & Instrument Cluster)", "Leatherette Upholstery", "Dual Tone Dashboard",
              "Leather-wrapped Steering Wheel", "Ambient Lighting", "Sony 3D Sound System",
              "Rear Seat Armrest", "Electronic Park Brake"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps with C-shaped DRLs", "LED Taillamps", "17-inch to 18-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Flush Door Handles"
            ],
            "tyre": {
              "size": "235/65 R17 or 235/60 R18",
              "type": "Radial Tubeless",
              "wheelSize": "R17/R18"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "Up to 7 Airbags", "Electronic Stability Program (ESP)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Control", "Hill Descent Control", "360-degree Camera", "Driver Drowsiness Detection"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Global NCAP)",
              "childOccupant": "5 Star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.25-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Sony 3D Sound System (12 Speakers)",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "Built-in Navigation", "Dual HD Screens"
            ]
          },
          "adasFeatures": {
            "features": [
              "Adaptive Cruise Control", "Forward Collision Warning", "Automatic Emergency Braking",
              "Lane Keep Assist", "Lane Departure Warning", "Traffic Sign Recognition",
              "High Beam Assist"
            ]
          },
          "internetFeatures": {
            "features": [
              "AdrenoX Connect (Connected Car Tech)", "Voice AI (Alexa integration)", "Remote Start/Stop",
              "Geo-fencing", "Live Vehicle Tracking"
            ]
          }
        }
      },
      {
        id: 'mahindra-thar',
        videoPoster: mahindrathar,
        videoSrc: "https://www.youtube.com/embed/k9DTfWxGwBg",
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra Thar",
        link: "https://auto.mahindra.com/suv/thar",
        description: "The Mahindra Thar is an iconic off-road SUV, known for its rugged capabilities, distinctive design, and ability to conquer challenging terrains.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Thar (AX Opt / LX)",
          "manufacturer": "Mahindra",
          "year": 2025,
          "price": "₹ 12.38 - 20.30 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel",
            "displacement": "1997 cc (Petrol), 2184 cc (Diesel), 1497 cc (Diesel - RWD)",
            "maxPower": "150 bhp @ 5000 rpm (2.0L Petrol), 130 bhp @ 3750 rpm (2.2L Diesel), 117 bhp @ 3500 rpm (1.5L Diesel)",
            "maxTorque": "300 Nm @ 1250-3000 rpm (2.0L Petrol MT), 320 Nm @ 1500-3000 rpm (2.0L Petrol AT), 300 Nm @ 1600-2800 rpm (2.2L Diesel), 300 Nm @ 1750-2500 rpm (1.5L Diesel)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection (Petrol), Common Rail (Diesel)",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic",
            "gearbox": "6-speed Manual / 6-speed Automatic",
            "driveType": "Rear-Wheel Drive (RWD) / Four-Wheel Drive (4WD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "N/A (Expected 10-12 kmpl for Petrol, 12-15 kmpl for Diesel)",
            "fuelTankCapacity": "57 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Independent Double Wishbone with Coil Over Damper",
            "rearSuspension": "Multi-Link Coil Spring Suspension",
            "steeringType": "Hydraulic Power Assisted",
            "steeringColumn": "Tilt Adjustable",
            "turningRadius": "5.75 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3985 mm",
            "width": "1820 mm (Hard Top), 1855 mm (Soft Top)",
            "height": "1844 mm (Hard Top), 1920 mm (Soft Top)",
            "seatingCapacity": "4",
            "groundClearance": "226 mm",
            "wheelBase": "2450 mm",
            "numberOfDoors": 3,
            "bootSpace": "N/A (Small, mainly for luggage behind rear seats)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Manual AC", "Cruise Control",
              "Rear Parking Sensors", "Manual Key Start", "Remote Central Locking",
              "Power Windows", "Electrically Adjustable ORVMs", "Removable Roof (Hard Top / Soft Top options)"
            ]
          },
          "interior": {
            "features": [
              "7-inch Touchscreen Infotainment", "Washable Interior Floor", "Fabric/Vinyl Upholstery",
              "Water Resistant Interior", "Analogue Instrument Cluster with MID", "Steering Mounted Controls"
            ]
          },
          "exterior": {
            "features": [
              "Halogen Headlamps (LED DRLs on LX)", "LED Taillamps", "16-inch to 18-inch Steel/Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers (Partial)", "Side-hinged Tailgate",
              "Fender-mounted Indicators"
            ],
            "tyre": {
              "size": "245/75 R16 (AX Opt), 255/65 R18 (LX)",
              "type": "Radial Tubeless",
              "wheelSize": "R16/R18"
            },
            "bootOpening": "Side-hinged"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Dual Front Airbags", "Electronic Stability Program (ESP - LX variants)",
              "Tyre Pressure Monitoring System (TPMS - LX variants)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Control", "Hill Descent Control"
            ],
            "ncapRating": {
              "adultOccupant": "4 Star (Global NCAP)",
              "childOccupant": "4 Star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "7-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4 Speakers",
              "USB Ports", "Voice Commands", "Steering-mounted controls"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": ["BlueSense App Connectivity (Limited features)"]
          }
        }
      },
      {
        id: 'mahindra-scorpio-n',
        videoPoster: mahindrascorpio,
        videoSrc: "https://www.youtube.com/embed/HvZHXclEj-Q",
        thumbnail: "https://auto.mahindra.com/on/demandware.static/Sites-amc-Site/-/default/dw8e65285b/images/logoPeakDark.png",
        title: "Mahindra Scorpio-N",
        link: "https://auto.mahindra.com/suv/scorpio-n",
        description: "The Mahindra Scorpio-N is a powerful and rugged SUV known for its bold design, commanding road presence, and strong performance capabilities.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Scorpio-N",
          "manufacturer": "Mahindra",
          "year": 2025,
          "price": "₹ 15.68 - 28.60 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel",
            "displacement": "1997 cc (Petrol), 2184 cc (Diesel)",
            "maxPower": "197 bhp @ 5000 rpm (Petrol), 130 bhp @ 3750 rpm (2.2L Diesel Z2/Z4), 172 bhp @ 3500 rpm (2.2L Diesel Z6/Z8/Z8L)",
            "maxTorque": "370 Nm @ 1750-3000 rpm (Petrol MT), 380 Nm @ 1750-3000 rpm (Petrol AT), 300 Nm @ 1600-2800 rpm (2.2L Diesel Z2/Z4 MT), 370 Nm @ 1500-3000 rpm (2.2L Diesel Z6/Z8/Z8L MT), 400 Nm @ 1750-2750 rpm (2.2L Diesel Z6/Z8/Z8L AT)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection (Petrol), Common Rail (Diesel)",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic",
            "gearbox": "6-speed Manual / 6-speed Automatic",
            "driveType": "Rear-Wheel Drive (RWD) / Four-Wheel Drive (4XPLOR - Diesel only)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "N/A (Expected 13-15 kmpl for Petrol, 15-18 kmpl for Diesel)",
            "fuelTankCapacity": "57 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double Wishbone Suspension with Coil over shocks",
            "rearSuspension": "Penta-link with WATT's Linkage and Coil over shocks",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt Adjustable",
            "turningRadius": "5.6 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4662 mm",
            "width": "1917 mm",
            "height": "1857 mm",
            "seatingCapacity": "6 or 7",
            "groundClearance": "N/A",
            "wheelBase": "2750 mm",
            "numberOfDoors": 5,
            "bootSpace": "N/A (Approx. 200 Litres with all 7 seats up)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "Powered Driver Seat",
              "Electric Sunroof", "Rear AC Vents", "Wireless Phone Charging", "AdrenoX Connect"
            ]
          },
          "interior": {
            "features": [
              "8-inch Touchscreen Infotainment", "Digital Instrument Cluster (partial)", "Leatherette Upholstery",
              "Dual Tone Interior", "Leather-wrapped Steering Wheel", "Ambient Lighting (Z8L)",
              "Sony 3D Sound System (Z8L)", "Rear Seat Armrest"
            ]
          },
          "exterior": {
            "features": [
              "LED Projector Headlamps with LED DRLs", "LED Taillamps", "17-inch to 18-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Side-opening Tailgate"
            ],
            "tyre": {
              "size": "245/65 R17 or 255/60 R18",
              "type": "Radial Tubeless",
              "wheelSize": "R17/R18"
            },
            "bootOpening": "Side-hinged"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "Up to 6 Airbags", "Electronic Stability Program (ESP)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Control", "Hill Descent Control", "Rear View Camera", "Driver Drowsiness Detection (Z8L)"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Global NCAP)",
              "childOccupant": "3 Star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "8-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "Sony 3D Sound System (12 Speakers)",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "Built-in Navigation", "AdrenoX Connect"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": [
              "AdrenoX Connect (Connected Car Tech)", "Voice AI (Alexa integration)", "Remote Start/Stop",
              "Geo-fencing", "Live Vehicle Tracking"
            ]
          }
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
        "vehicleInfo": {
          "model": "XUV300",
          "manufacturer": "Mahindra",
          "year": 2025,
          "price": "₹ 9.17 - 17.58 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel",
            "displacement": "1197 cc (Petrol), 1497 cc (Diesel)",
            "maxPower": "109 bhp @ 5000 rpm (Petrol), 115 bhp @ 3750 rpm (Diesel)",
            "maxTorque": "200 Nm @ 2000-3500 rpm (Petrol), 300 Nm @ 1500-2500 rpm (Diesel)",
            "cylinders": "3 (Petrol), 4 (Diesel)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-point Injection (Petrol), Common Rail (Diesel)",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic (AMT)",
            "gearbox": "6-speed Manual / 6-speed AMT",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "N/A (Expected 17-19 kmpl for Petrol, 20-22 kmpl for Diesel)",
            "fuelTankCapacity": "42 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with Anti-roll Bar",
            "rearSuspension": "Twist Beam with Coil Spring",
            "steeringType": "Electric Power Assisted (with 3 modes)",
            "steeringColumn": "Tilt Adjustable",
            "turningRadius": "5.3 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "3995 mm",
            "width": "1821 mm",
            "height": "1627 mm",
            "seatingCapacity": 5,
            "groundClearance": "180 mm",
            "wheelBase": "2600 mm",
            "numberOfDoors": 5,
            "bootSpace": "257 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Single Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Projector Headlamps", "Heated ORVMs",
              "Electric Sunroof (Optional)", "Rear AC Vents", "Push Button Start/Stop",
              "Steering Modes (Comfort, Normal, Sport)"
            ]
          },
          "interior": {
            "features": [
              "7-inch Touchscreen Infotainment", "Fabric/Leatherette Upholstery", "Dual Tone Interior",
              "Leather-wrapped Steering Wheel", "Ambient Lighting", "Analogue Instrument Cluster with MID"
            ]
          },
          "exterior": {
            "features": [
              "Projector Headlamps with LED DRLs", "LED Taillamps", "16-inch to 17-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Chrome Grille"
            ],
            "tyre": {
              "size": "215/60 R16 or 215/55 R17",
              "type": "Radial Tubeless",
              "wheelSize": "R16/R17"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "7 Airbags", "Electronic Stability Program (ESP)",
              "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Hold Control", "Cornering Brake Control", "Front Parking Sensors"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Global NCAP)",
              "childOccupant": "4 Star (Global NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "7-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4/6 Speakers",
              "USB Ports", "Voice Commands", "Steering-mounted controls"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": ["BlueSense Plus App Connectivity (Limited features)"]
          }
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
        "vehicleInfo": {
          "model": "Bolero Neo",
          "manufacturer": "Mahindra",
          "year": 2025,
          "price": "₹ 11.00 - 13.00 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Diesel",
            "displacement": "1493 cc",
            "maxPower": "100 bhp @ 3750 rpm",
            "maxTorque": "260 Nm @ 1750-2250 rpm",
            "cylinders": "3",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Common Rail",
            "turboCharger": true,
            "transmissionType": "Manual",
            "gearbox": "5-speed Manual",
            "driveType": "Rear-Wheel Drive (RWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Diesel",
            "mileage": "N/A (Expected 17-19 kmpl)",
            "fuelTankCapacity": "50 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double Wishbone, Independent Front Coil Spring",
            "rearSuspension": "Multi-link Coil Spring with Anti-Roll Bar",
            "steeringType": "Hydraulic Power Assisted",
            "steeringColumn": "Tilt Adjustable",
            "turningRadius": "5.5 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3995 mm",
            "width": "1795 mm",
            "height": "1812 mm",
            "seatingCapacity": "7 (5+2 jump seats)",
            "groundClearance": "160 mm",
            "wheelBase": "2680 mm",
            "numberOfDoors": 5,
            "bootSpace": "N/A (Limited with jump seats up)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Manual AC", "Engine Start/Stop (Micro Hybrid)",
              "Rear Parking Sensors", "Manual Key Start", "Central Locking",
              "Power Windows", "Electrically Adjustable ORVMs"
            ]
          },
          "interior": {
            "features": [
              "7-inch Touchscreen Infotainment (Top Variant)", "Fabric Upholstery", "Dual Tone Interior",
              "Analogue Instrument Cluster with MID", "Steering Mounted Controls (Top Variant)"
            ]
          },
          "exterior": {
            "features": [
              "Halogen Headlamps with DRLs", "LED DRLs (Top Variant)", "Static Bending Headlamps",
              "Alloy Wheels (Top Variant)", "Integrated Antenna", "Body-coloured Bumpers (Partial)",
              "Roof Rails", "Rear Door Mounted Spare Wheel"
            ],
            "tyre": {
              "size": "215/75 R15",
              "type": "Radial Tubeless",
              "wheelSize": "R15"
            },
            "bootOpening": "Side-hinged"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Dual Front Airbags", "ISOFIX Child Seat Mounts (N10 (O) variant)",
              "Seat Belt Reminder", "Engine Immobilizer", "Rear Parking Sensors"
            ],
            "ncapRating": {
              "adultOccupant": "N/A (Based on TUV300 3 star)",
              "childOccupant": "N/A (Based on TUV300 1 star)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "7-inch Touchscreen Infotainment (Top Variant)", "AM/FM Radio", "Bluetooth Connectivity",
              "USB Ports", "AUX-in"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": []
          }
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
        link: "https://www.toyotabharat.com/showroom/fortuner/",
        description: "The Toyota Fortuner is a robust and highly capable SUV, renowned for its strong build, off-road prowess, and commanding presence.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Fortuner",
          "manufacturer": "Toyota",
          "year": 2025,
          "price": "₹ 38.83 - 61.18 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel",
            "displacement": "2694 cc (Petrol), 2755 cc (Diesel)",
            "maxPower": "164 bhp @ 5200 rpm (Petrol), 201 bhp @ 3000-3400 rpm (Diesel)",
            "maxTorque": "245 Nm @ 4000 rpm (Petrol), 420 Nm @ 1400-3400 rpm (Diesel MT), 500 Nm @ 1600-2800 rpm (Diesel AT)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "EFI (Petrol), Common Rail (Diesel)",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic",
            "gearbox": "5-speed Manual (Petrol), 6-speed Manual (Diesel), 6-speed Automatic (Petrol/Diesel)",
            "driveType": "Rear-Wheel Drive (RWD) / Four-Wheel Drive (4x4)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "10.0 kmpl (Petrol-ARAI), 14.2 kmpl (Diesel MT-ARAI), 14.4 kmpl (Diesel AT-ARAI)",
            "fuelTankCapacity": "80 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double Wishbone",
            "rearSuspension": "4-Link with Coil Spring",
            "steeringType": "Hydraulic Power Assisted",
            "steeringColumn": "Tilt & Telescopic Adjustable",
            "turningRadius": "5.8 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "4795 mm",
            "width": "1855 mm",
            "height": "1835 mm",
            "seatingCapacity": 7,
            "groundClearance": "225 mm",
            "wheelBase": "2745 mm",
            "numberOfDoors": 5,
            "bootSpace": "296 Litres (all 7 seats up)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "Powered Driver & Passenger Seats",
              "One-Touch Tumble & Fold 2nd Row Seats", "Rear AC Vents", "Powered Tailgate"
            ]
          },
          "interior": {
            "features": [
              "8-inch Smart Playcast Touchscreen Infotainment", "Leather Upholstery", "Soft-touch materials",
              "Analog Instrument Cluster with MID", "Leather-wrapped Steering Wheel", "Ambient Lighting (Legender)",
              "JBL Premium Sound System (Legender)"
            ]
          },
          "exterior": {
            "features": [
              "Bi-Beam LED Projector Headlamps with LED DRLs", "LED Taillamps", "17-inch to 18-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Chrome Door Handles"
            ],
            "tyre": {
              "size": "265/65 R17 or 265/60 R18",
              "type": "Radial Tubeless",
              "wheelSize": "R17/R18"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "7 Airbags", "Vehicle Stability Control (VSC)",
              "Traction Control System (TRC)", "Tyre Pressure Monitoring System (TPMS - Legender)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Assist Control", "Downhill Assist Control (4x4)", "Front Clearance Sonar"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (ASEAN NCAP - 2016)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "8-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "6 Speakers (Standard), 11 JBL Speakers (Legender)",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "Navigation (Built-in)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": ["Connected Car Technology (Limited features)"]
          }
        }
      },
      {
        id: 'toyota-land-cruiser',
        videoPoster: ToyotaLandCruiser,
        videoSrc: "https://www.youtube.com/embed/6AtPZrlAsu0",
        thumbnail: "https://www.carlogos.org/car-logos/toyota-logo-2019-640.png",
        title: "Toyota Land Cruiser",
        link: "https://www.toyotabharat.com/showroom/land-cruiser-300/",
        description: "The Toyota Land Cruiser is an iconic off-road luxury SUV, known for its legendary reliability, go-anywhere capability, and supreme comfort.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Land Cruiser 300 (LC300)",
          "manufacturer": "Toyota",
          "year": 2025,
          "price": "₹ 2.20 Crore (Ex-showroom, India; on-road highly varies)",
          "engineAndTransmission": {
            "engineType": "Diesel",
            "displacement": "3346 cc",
            "maxPower": "305 bhp @ 4000 rpm",
            "maxTorque": "700 Nm @ 1600-2600 rpm",
            "cylinders": "6 (V6)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Common Rail",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "10-speed Direct Shift Automatic",
            "driveType": "Full-time Four-Wheel Drive (4WD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Diesel",
            "mileage": "N/A (Expected 8-10 kmpl)",
            "fuelTankCapacity": "110 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Double Wishbone (Independent)",
            "rearSuspension": "4-link Coil Spring (Rigid Axle)",
            "steeringType": "Electric Power Assisted (with VGRS)",
            "steeringColumn": "Electric Adjustable (Tilt & Telescopic)",
            "turningRadius": "5.9 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Ventilated Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4950 mm",
            "width": "1980 mm",
            "height": "1945 mm",
            "seatingCapacity": 7,
            "groundClearance": "230 mm",
            "wheelBase": "2850 mm",
            "numberOfDoors": 5,
            "bootSpace": "N/A (Significant, especially with 3rd row folded)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (4-Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "Heated & Ventilated Front and Rear Seats",
              "Power Foldable 3rd Row Seats", "Rear AC Vents", "Wireless Phone Charging", "Powered Tailgate",
              "Cool Box", "Head-Up Display"
            ]
          },
          "interior": {
            "features": [
              "12.3-inch Touchscreen Infotainment", "Digital Instrument Cluster", "Leather Upholstery",
              "Wood Grain & Aluminium Accents", "Ambient Lighting", "JBL Premium Sound System (14 speakers)",
              "Rear Seat Entertainment System (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps with DRLs", "LED Taillamps", "20-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "265/55 R20",
              "type": "Radial Tubeless",
              "wheelSize": "R20"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "10 Airbags", "Vehicle Stability Control (VSC)",
              "Traction Control System (TRC)", "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Engine Immobilizer", "Hill Assist Control",
              "Downhill Assist Control", "Multi-Terrain Monitor with Underfloor View", "Crawl Control",
              "Multi-Terrain Select", "Front & Rear Differential Lock (GR Sport)"
            ],
            "ncapRating": {
              "adultOccupant": "N/A (Expected 5-star equivalent)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "12.3-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "JBL Premium Sound System",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "GPS Navigation", "Wi-Fi Hotspot"
            ]
          },
          "adasFeatures": {
            "features": [
              "Toyota Safety Sense (Pre-Collision System, Dynamic Radar Cruise Control, Lane Departure Alert, Automatic High Beam)",
              "Blind Spot Monitor", "Rear Cross Traffic Alert", "360-degree Panoramic View Monitor"
            ]
          },
          "internetFeatures": {
            "features": [
              "Connected Car Technology (Limited features)", "Remote Connectivity"
            ]
          }
        }
      },
      {
        id: 'toyota-innova-hycross',
        videoPoster: ToyotaInnovaHycross,
        videoSrc: "https://www.youtube.com/embed/kdwPgM2h0X0",
        thumbnail: "https://www.carlogos.org/car-logos/toyota-logo-2019-640.png",
        title: "Toyota Innova Hycross",
        link: "https://www.toyotabharat.com/showroom/innova-hycross/",
        description: "The Toyota Innova Hycross is a premium MPV offering strong hybrid technology, spacious and comfortable interiors, and a host of advanced features.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Innova Hycross",
          "manufacturer": "Toyota",
          "year": 2025,
          "price": "₹ 20.93 - 33.72 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Strong Hybrid",
            "displacement": "1987 cc (Petrol), 1987 cc (Strong Hybrid)",
            "maxPower": "172 bhp @ 6600 rpm (Petrol), 184 bhp (Combined Hybrid System Power)",
            "maxTorque": "205 Nm @ 4400-5200 rpm (Petrol), 188 Nm @ 4400-5200 rpm (Hybrid Engine)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection (Petrol), Multi-point Injection (Hybrid)",
            "turboCharger": false,
            "transmissionType": "Automatic (CVT)",
            "gearbox": "Direct Shift CVT (Petrol), e-Drive with Synchronous Motor (Hybrid)",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Hybrid",
            "mileage": "16.1 kmpl (Petrol-ARAI), 23.24 kmpl (Hybrid-ARAI)",
            "fuelTankCapacity": "52 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Torsion Beam",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt & Telescopic Adjustable",
            "turningRadius": "5.7 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4755 mm",
            "width": "1845 mm",
            "height": "1785 mm",
            "seatingCapacity": "7 or 8",
            "groundClearance": "185 mm",
            "wheelBase": "2850 mm",
            "numberOfDoors": 5,
            "bootSpace": "300 Litres (all 7 seats up)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual Zone)", "Adaptive Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "Powered Driver & Co-Passenger Seats (Ottoman function for 2nd row captain seats)",
              "Panoramic Sunroof", "Rear AC Vents", "Wireless Phone Charging", "Powered Tailgate"
            ]
          },
          "interior": {
            "features": [
              "10.1-inch Floating Touchscreen Infotainment", "7-inch TFT MID", "Leather Upholstery",
              "Dual Tone Interior", "Ambient Lighting", "JBL Premium Sound System (9 speakers)"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps with DRLs", "LED Taillamps", "17-inch to 18-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Chrome Elements"
            ],
            "tyre": {
              "size": "215/60 R17 or 225/50 R18",
              "type": "Radial Tubeless",
              "wheelSize": "R17/R18"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Vehicle Stability Control (VSC)",
              "Traction Control System (TRC)", "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Assist Control", "360-degree Camera"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (ASEAN NCAP - 2022)",
              "childOccupant": "5 Star (ASEAN NCAP - 2022)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.1-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "JBL Premium Sound System",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "Navigation (Built-in)"
            ]
          },
          "adasFeatures": {
            "features": [
              "Toyota Safety Sense 3.0 (Pre-Collision System, Dynamic Radar Cruise Control, Lane Trace Assist, Auto High Beam, Blind Spot Monitor, Rear Cross Traffic Alert)"
            ]
          },
          "internetFeatures": {
            "features": [
              "i-Connect (Connected Car Technology)", "Remote Functions", "Geo-fencing",
              "Vehicle Tracking"
            ]
          }
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
        "vehicleInfo": {
          "model": "Urban Cruiser Hyryder",
          "manufacturer": "Toyota",
          "year": 2025,
          "price": "₹ 12.00 - 23.58 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol (Mild-Hybrid) / Strong Hybrid",
            "displacement": "1462 cc (Mild-Hybrid), 1490 cc (Strong Hybrid)",
            "maxPower": "101 bhp @ 6000 rpm (Mild-Hybrid), 114 bhp (Combined Hybrid System Power)",
            "maxTorque": "136.8 Nm @ 4400 rpm (Mild-Hybrid), 122 Nm @ 4400-4800 rpm (Hybrid Engine)",
            "cylinders": "4 (Mild-Hybrid), 3 (Strong Hybrid)",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-point Injection",
            "turboCharger": false,
            "transmissionType": "Manual / Automatic (CVT / e-CVT)",
            "gearbox": "5-speed Manual (Mild-Hybrid), 6-speed Automatic (Mild-Hybrid), e-CVT (Strong Hybrid)",
            "driveType": "Front-Wheel Drive (FWD) / All-Wheel Drive (AWD - Mild Hybrid MT only)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Hybrid",
            "mileage": "21.12 kmpl (Mild-Hybrid MT), 20.58 kmpl (Mild-Hybrid AT), 19.39 kmpl (Mild-Hybrid AWD MT), 27.97 kmpl (Strong Hybrid-ARAI)",
            "fuelTankCapacity": "45 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Torsion Beam",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt & Telescopic Adjustable",
            "turningRadius": "5.4 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4365 mm",
            "width": "1795 mm",
            "height": "1645 mm",
            "seatingCapacity": 5,
            "groundClearance": "210 mm",
            "wheelBase": "2600 mm",
            "numberOfDoors": 5,
            "bootSpace": "373 Litres (Mild Hybrid), 255 Litres (Strong Hybrid)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Single Zone)", "Cruise Control",
              "Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Projector Headlamps", "Ventilated Front Seats",
              "Panoramic Sunroof", "Rear AC Vents", "Wireless Phone Charging", "Paddleshifters (AT)"
            ]
          },
          "interior": {
            "features": [
              "9-inch SmartPlay Pro+ Touchscreen Infotainment", "7-inch TFT MID", "Leatherette Upholstery",
              "Dual Tone Interior", "Ambient Lighting (Strong Hybrid)", "Arkamys Sound System (Strong Hybrid)"
            ]
          },
          "exterior": {
            "features": [
              "LED Projector Headlamps with Twin LED DRLs", "LED Taillamps", "17-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Dual Tone Exterior Options"
            ],
            "tyre": {
              "size": "215/60 R17",
              "type": "Radial Tubeless",
              "wheelSize": "R17"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "6 Airbags", "Electronic Stability Program (ESP)",
              "Hill Hold Control", "Hill Descent Control (AWD)", "Tyre Pressure Monitoring System (TPMS)",
              "ISOFIX Child Seat Mounts", "Seat Belt Warning", "Door Ajar Warning",
              "Engine Immobilizer", "360-degree Camera"
            ],
            "ncapRating": {
              "adultOccupant": "N/A (Expected high rating)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "9-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Arkamys Sound System",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "Built-in Navigation"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": [
              "Toyota i-Connect (Connected Car Technology)", "Remote Functions", "Geo-fencing",
              "Live Vehicle Tracking"
            ]
          }
        }
      },
      {
        id: 'toyota-camry', // Added Camry
        videoPoster: toyotaCamry,
        videoSrc: "https://www.youtube.com/embed/xL-5j2uVwWw", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/toyota-logo-2019-640.png",
        title: "Toyota Camry",
        link: "https://www.toyotabharat.com/showroom/camry-hybrid/",
        description: "The Toyota Camry is a premium hybrid sedan known for its luxurious comfort, strong fuel efficiency, and Toyota's renowned reliability.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Camry Hybrid",
          "manufacturer": "Toyota",
          "year": 2025,
          "price": "₹ 52.89 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol (Strong Hybrid)",
            "displacement": "2487 cc",
            "maxPower": "176 bhp @ 5700 rpm (Engine), 215 bhp (Combined Hybrid System Power)",
            "maxTorque": "221 Nm @ 3600-5200 rpm (Engine)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-point Injection",
            "turboCharger": false,
            "transmissionType": "Automatic (e-CVT)",
            "gearbox": "e-CVT with Sequential Shift",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol (Hybrid)",
            "mileage": "23.27 kmpl (ARAI)",
            "fuelTankCapacity": "50 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Double Wishbone",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Electric Adjustable (Tilt & Telescopic)",
            "turningRadius": "5.8 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4880 mm",
            "width": "1840 mm",
            "height": "1455 mm",
            "seatingCapacity": 5,
            "groundClearance": "160 mm",
            "wheelBase": "2825 mm",
            "numberOfDoors": 4,
            "bootSpace": "524 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (3-Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Projector Headlamps", "Powered Front Seats with Memory (Driver)",
              "Electrically Reclining Rear Seats", "Electric Sunroof", "Rear AC Vents",
              "Wireless Phone Charging", "Powered Rear Sunshade"
            ]
          },
          "interior": {
            "features": [
              "9-inch Touchscreen Infotainment", "Digital Instrument Cluster (partial)", "Leather Upholstery",
              "Wood Grain & Chrome Accents", "Ambient Lighting", "JBL Premium Sound System (9 speakers)",
              "Rear Armrest with Controls"
            ]
          },
          "exterior": {
            "features": [
              "LED Projector Headlamps with DRLs", "LED Taillamps", "18-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Chrome Window Trim",
              "Power Adjustable & Foldable ORVMs"
            ],
            "tyre": {
              "size": "235/45 R18",
              "type": "Radial Tubeless",
              "wheelSize": "R18"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "9 Airbags", "Vehicle Stability Control (VSC)",
              "Traction Control System (TRC)", "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Start Assist", "Rear View Camera"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (ASEAN NCAP - 2018)",
              "childOccupant": "5 Star (ASEAN NCAP - 2018)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "9-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "JBL Premium Sound System",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "Navigation (Built-in)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": ["Connected Car Technology (Limited features)"]
          }
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
        "vehicleInfo": {
          "model": "Compass (Latest Facelift)",
          "manufacturer": "Jeep",
          "year": 2025,
          "price": "₹ 21.00 - 36.50 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / Diesel",
            "displacement": "1368 cc (Petrol), 1956 cc (Diesel)",
            "maxPower": "161 bhp @ 5500 rpm (Petrol), 168 bhp @ 3750 rpm (Diesel)",
            "maxTorque": "250 Nm @ 2500-4000 rpm (Petrol), 350 Nm @ 1750-2500 rpm (Diesel)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-point Injection (Petrol), Common Rail (Diesel)",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic",
            "gearbox": "6-speed Manual (Petrol/Diesel), 7-speed DCT (Petrol), 9-speed Automatic (Diesel)",
            "driveType": "Front-Wheel Drive (FWD) / All-Wheel Drive (AWD - Diesel only)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / Diesel",
            "mileage": "N/A (Expected 14-16 kmpl for Petrol, 17-19 kmpl for Diesel)",
            "fuelTankCapacity": "60 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Frequency Selective Damping (FSD) with MacPherson Strut",
            "rearSuspension": "Frequency Selective Damping (FSD) with Multi-Link Suspension",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt & Telescopic Adjustable",
            "turningRadius": "5.7 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4405 mm",
            "width": "1818 mm",
            "height": "1640 mm",
            "seatingCapacity": 5,
            "groundClearance": "178 mm",
            "wheelBase": "2636 mm",
            "numberOfDoors": 5,
            "bootSpace": "438 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Projector Headlamps", "8-Way Power Adjustable Driver Seat",
              "Panoramic Sunroof", "Rear AC Vents", "Wireless Phone Charging", "Ventilated Front Seats"
            ]
          },
          "interior": {
            "features": [
              "10.1-inch Touchscreen Infotainment", "10.25-inch Digital Instrument Cluster", "Leather Upholstery",
              "Soft-touch Dashboard", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "Alpine Premium Sound System (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "LED Projector Headlamps with DRLs", "LED Taillamps", "17-inch to 18-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Iconic 7-slot Grille with Chrome Accents"
            ],
            "tyre": {
              "size": "225/60 R17 or 225/55 R18",
              "type": "Radial Tubeless",
              "wheelSize": "R17/R18"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Control (ESC)",
              "Traction Control System (TCS)", "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Start Assist", "Electronic Park Brake with Auto Hold", "360-degree Camera",
              "Select-Terrain System (AWD variants)"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.1-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "6/9 Speakers",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "Navigation (Built-in)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": [
              "UConnect Connected Car Technology", "Remote Vehicle Control", "Geo-fencing",
              "Vehicle Health Report"
            ]
          }
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
        "vehicleInfo": {
          "model": "Meridian",
          "manufacturer": "Jeep",
          "year": 2025,
          "price": "₹ 35.00 - 43.50 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Diesel",
            "displacement": "1956 cc",
            "maxPower": "168 bhp @ 3750 rpm",
            "maxTorque": "350 Nm @ 1750-2500 rpm",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Common Rail",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic",
            "gearbox": "6-speed Manual, 9-speed Automatic",
            "driveType": "Front-Wheel Drive (FWD) / All-Wheel Drive (AWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Diesel",
            "mileage": "N/A (Expected 15-17 kmpl)",
            "fuelTankCapacity": "60 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Frequency Selective Damping (FSD) with MacPherson Strut",
            "rearSuspension": "Frequency Selective Damping (FSD) with Multi-Link Suspension",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt & Telescopic Adjustable",
            "turningRadius": "5.7 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4769 mm",
            "width": "1859 mm",
            "height": "1698 mm",
            "seatingCapacity": 7,
            "groundClearance": "N/A (Approx. 190mm)",
            "wheelBase": "2782 mm",
            "numberOfDoors": 5,
            "bootSpace": "N/A (Small with all 7 seats up)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (3-Zone)", "Cruise Control",
              "Front & Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic LED Headlamps", "8-Way Power Adjustable Driver & Passenger Seats",
              "Panoramic Sunroof", "Rear AC Vents (Roof-mounted)", "Wireless Phone Charging", "Powered Tailgate",
              "Ventilated Front Seats"
            ]
          },
          "interior": {
            "features": [
              "10.1-inch Touchscreen Infotainment", "10.25-inch Digital Instrument Cluster", "Leather Upholstery",
              "Soft-touch Dashboard", "Leather-wrapped Steering Wheel", "Ambient Lighting",
              "Alpine Premium Sound System (Optional)", "Second Row Tumble Function"
            ]
          },
          "exterior": {
            "features": [
              "LED Projector Headlamps with DRLs", "LED Taillamps", "18-inch Alloy Wheels",
              "Integrated Antenna", "Body-coloured Bumpers", "Roof Rails",
              "Iconic 7-slot Grille"
            ],
            "tyre": {
              "size": "235/55 R18",
              "type": "Radial Tubeless",
              "wheelSize": "R18"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Control (ESC)",
              "Traction Control System (TCS)", "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Start Assist", "Electronic Park Brake with Auto Hold", "360-degree Camera",
              "Select-Terrain System (AWD variants)"
            ],
            "ncapRating": {
              "adultOccupant": "N/A (Expected high rating)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "10.1-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "9 Speakers",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "Navigation (Built-in)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": [
              "UConnect Connected Car Technology", "Remote Vehicle Control", "Geo-fencing",
              "Vehicle Health Report"
            ]
          }
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
        "vehicleInfo": {
          "model": "Wrangler Rubicon (4-Door)",
          "manufacturer": "Jeep",
          "year": 2025,
          "price": "₹ 75.00 - 80.00 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "1995 cc",
            "maxPower": "268 bhp @ 5250 rpm",
            "maxTorque": "400 Nm @ 3000 rpm",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Direct Injection",
            "turboCharger": true,
            "transmissionType": "Automatic",
            "gearbox": "8-speed Automatic",
            "driveType": "4x4 (Selectable Full-Time 4x4, Rock-Trac Full-Time 4x4)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "N/A (Expected 9-10 kmpl)",
            "fuelTankCapacity": "81 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "Heavy-Duty Coil Spring with Gas Shocks",
            "rearSuspension": "Heavy-Duty Coil Spring with Gas Shocks",
            "steeringType": "Hydraulic Power Assisted",
            "steeringColumn": "Tilt Adjustable",
            "turningRadius": "6.1 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4882 mm",
            "width": "1894 mm",
            "height": "1848 mm",
            "seatingCapacity": 5,
            "groundClearance": "252 mm (Rubicon)",
            "wheelBase": "3008 mm",
            "numberOfDoors": 5,
            "bootSpace": "897 Litres (Rear seats up)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Single Zone)", "Cruise Control",
              "Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Removable Roof (Hard Top/Soft Top options)", "Removable Doors",
              "Heated Front Seats", "Heated Steering Wheel", "Rear AC Vents",
              "Washable Interior with Drain Plugs"
            ]
          },
          "interior": {
            "features": [
              "12.3-inch Touchscreen Infotainment", "7-inch TFT Cluster Display", "Fabric/Leather Upholstery",
              "Leather-wrapped Steering Wheel", "Alpine Premium Audio System (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps with DRLs", "LED Taillamps", "17-inch Alloy Wheels (Rubicon)",
              "Integrated Antenna", "Body-coloured Fender Flares (Sahara)", "Black Fender Flares (Rubicon)",
              "Iconic 7-slot Grille", "Exposed Hood Latches", "Full-size Spare Wheel on Tailgate"
            ],
            "tyre": {
              "size": "255/75 R17 (Rubicon off-road tires)",
              "type": "All-Terrain / Mud-Terrain Radial Tubeless",
              "wheelSize": "R17"
            },
            "bootOpening": "Side-hinged"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Dual Front Airbags", "Electronic Stability Control (ESC)",
              "Traction Control System (TCS)", "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Engine Immobilizer", "Hill Start Assist",
              "Hill Descent Control", "Electronic Front Sway Bar Disconnect (Rubicon)", "Front & Rear Axle Lockers (Rubicon)",
              "Off-Road Camera"
            ],
            "ncapRating": {
              "adultOccupant": "1 Star (Euro NCAP - 2018; specific to 2-door version without some ADAS)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "12.3-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "8/9 Speakers (Alpine optional)",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "Off-Road Pages"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": [
              "UConnect Connected Services", "Wi-Fi Hotspot"
            ]
          }
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
        link: "https://www.nissan.in/vehicles/new/magnite.html",
        description: "The Nissan Magnite is a sub-compact SUV that stands out with its bold styling, feature-rich cabin, and competitive pricing, offering excellent value.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Magnite (Latest Facelift)",
          "manufacturer": "Nissan",
          "year": 2025,
          "price": "₹ 7.20 - 14.10 Lakh (on-road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol / CNG",
            "displacement": "999 cc (Petrol)",
            "maxPower": "71 bhp @ 6250 rpm (NA Petrol), 99 bhp @ 5000 rpm (Turbo Petrol)",
            "maxTorque": "96 Nm @ 3500 rpm (NA Petrol), 160 Nm @ 2200-4400 rpm (Turbo Petrol)",
            "cylinders": "3",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-point Injection (NA Petrol), Direct Injection (Turbo Petrol)",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic",
            "gearbox": "5-speed Manual, 5-speed AMT (NA Petrol), X-TRONIC CVT (Turbo Petrol)",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol / CNG",
            "mileage": "19.35 kmpl (NA MT), 19.70 kmpl (NA AMT), 19.90 kmpl (Turbo MT), 17.90 kmpl (Turbo CVT) (ARAI)",
            "fuelTankCapacity": "40 Litres",
            "emissionNorm": "BS6 Phase 2",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with Lower Transverse Link",
            "rearSuspension": "Twin-tube Telescopic Shock Absorber",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt Adjustable",
            "turningRadius": "5.0 m",
            "frontBrakeType": "Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "3994 mm",
            "width": "1758 mm",
            "height": "1572 mm",
            "seatingCapacity": 5,
            "groundClearance": "205 mm",
            "wheelBase": "2500 mm",
            "numberOfDoors": 5,
            "bootSpace": "336 Litres (690 Litres with rear seats folded)"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control", "Cruise Control",
              "Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Automatic Headlamps", "Rear AC Vents", "Cooled Glovebox", "Push Button Start/Stop"
            ]
          },
          "interior": {
            "features": [
              "8-inch Touchscreen Infotainment", "7-inch Digital Instrument Cluster", "Fabric Upholstery",
              "Leather-wrapped Steering Wheel (Top variants)", "60:40 Split Rear Seat",
              "Rear Center Armrest with Cup Holders"
            ]
          },
          "exterior": {
            "features": [
              "LED Headlamps with L-shaped LED DRLs", "LED Taillamps (New elements)", "16-inch Alloy Wheels",
              "Integrated Antenna (Shark Fin)", "Roof Rails", "Body-coloured Bumpers",
              "Chrome Front Grille"
            ],
            "tyre": {
              "size": "195/60 R16",
              "type": "Radial Tubeless",
              "wheelSize": "R16"
            },
            "bootOpening": "Internal"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Program (ESP)",
              "Traction Control System (TCS)", "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Start Assist", "Rear View Camera with Guidelines", "360-degree Camera (Top variants)",
              "Speed Alert"
            ],
            "ncapRating": {
              "adultOccupant": "4 Star (ASEAN NCAP)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "8-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "6 Speakers",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "Navigation (Built-in)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": [
              "NissanConnect Connected Car Technology (Optional)"
            ]
          }
        }
      },
      {
        id: 'nissan-kicks', // Added Kicks (Note: Discontinued in India, kept for variety)
        videoPoster: nissanKicks,
        videoSrc: "https://www.youtube.com/embed/rK8v0N06a3Q", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/nissan-logo-2020-black-show.png", // Using Magnite logo as general Nissan
        title: "Nissan Kicks",
        link: "https://www.nissan.in/vehicles/new/kicks.html", // General Kicks page if available
        description: "The Nissan Kicks was a stylish mid-size SUV known for its comfortable ride, premium interiors, and powerful engine options. (Discontinued in India as of 2023)",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Kicks (Discontinued Model - Last Version)",
          "manufacturer": "Nissan",
          "year": 2023,
          "price": "₹ 10.50 - 16.00 Lakh (Last Recorded On-Road, Nagpur)",
          "engineAndTransmission": {
            "engineType": "Petrol",
            "displacement": "1498 cc (NA Petrol), 1330 cc (Turbo Petrol)",
            "maxPower": "104.55 bhp @ 5600 rpm (NA Petrol), 153.87 bhp @ 5500 rpm (Turbo Petrol)",
            "maxTorque": "142 Nm @ 4000 rpm (NA Petrol), 254 Nm @ 1600-3200 rpm (Turbo Petrol)",
            "cylinders": "4",
            "valvesPerCylinder": "4",
            "valveConfiguration": "DOHC",
            "fuelSupplySystem": "Multi-point Injection (NA Petrol), Direct Injection (Turbo Petrol)",
            "turboCharger": true,
            "transmissionType": "Manual / Automatic",
            "gearbox": "5-speed Manual (NA Petrol), 6-speed Manual (Turbo Petrol), CVT (Turbo Petrol)",
            "driveType": "Front-Wheel Drive (FWD)"
          },
          "fuelAndPerformance": {
            "fuelType": "Petrol",
            "mileage": "13.90 kmpl (NA MT), 15.80 kmpl (Turbo MT/CVT) (ARAI)",
            "fuelTankCapacity": "50 Litres",
            "emissionNorm": "BS6",
            "chargingTimeAC": "N/A",
            "chargingTimeDC": "N/A"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut with Coil Spring",
            "rearSuspension": "Torsion Beam with Coil Springs",
            "steeringType": "Power Assisted",
            "steeringColumn": "Tilt Adjustable",
            "turningRadius": "5.2 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Drum"
          },
          "dimensionsAndCapacity": {
            "length": "4384 mm",
            "width": "1813 mm",
            "height": "1651 mm",
            "seatingCapacity": 5,
            "groundClearance": "210 mm",
            "wheelBase": "2673 mm",
            "numberOfDoors": 5,
            "bootSpace": "400 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control", "Cruise Control",
              "Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
              "Rain Sensing Wipers", "Automatic Headlamps", "Cooled Glovebox",
              "Rear AC Vents"
            ]
          },
          "interior": {
            "features": [
              "8-inch Floating Touchscreen Infotainment", "Analog-Digital Instrument Cluster", "Leather Upholstery (Optional)",
              "Dual Tone Interior Theme", "Leather-wrapped Steering Wheel", "Front Armrest with Storage"
            ]
          },
          "exterior": {
            "features": [
              "LED Projector Headlamps with LED DRLs", "LED Taillamps", "17-inch Alloy Wheels",
              "Roof Rails", "Body-coloured Bumpers", "Chrome Door Handles",
              "Dual Tone Exterior Options"
            ],
            "tyre": {
              "size": "215/60 R17",
              "type": "Radial Tubeless",
              "wheelSize": "R17"
            },
            "bootOpening": "Manual"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "Dual Front Airbags", "Electronic Stability Control (ESC)",
              "Traction Control System (TCS)", "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
              "Hill Start Assist", "Rear View Camera"
            ],
            "ncapRating": {
              "adultOccupant": "3 Star (Euro NCAP - Older test)",
              "childOccupant": "N/A"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "8-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Android Auto", "Apple CarPlay", "4/6 Speakers",
              "USB Ports", "Voice Commands", "Steering-mounted controls",
              "Navigation (Built-in)"
            ]
          },
          "adasFeatures": {
            "features": []
          },
          "internetFeatures": {
            "features": [
              "NissanConnect Connected Car Technology"
            ]
          }
        }
      },
      {
        id: 'nissan-ariya', // Added Ariya (Global EV, for future readiness)
        videoPoster: nissanariya,
        videoSrc: "https://www.youtube.com/embed/W9l6D0pWq4c", // Example relevant video ID
        thumbnail: "https://www.carlogos.org/car-logos/nissan-logo-2020-black-show.png", // Using Magnite logo as general Nissan
        title: "Nissan Ariya",
        link: "https://global.nissannews.com/en/releases/release-fd664e1c94473dfd71e2efd727041f02-2021-nissan-ariya-all-electric-suv", // Global Ariya link
        description: "The Nissan Ariya is a visionary electric crossover combining futuristic design, advanced technology, and powerful electric performance for a new era of mobility.",
        buttonText: "View Details",
        "vehicleInfo": {
          "model": "Ariya (Global Specifications - Expected for India)",
          "manufacturer": "Nissan",
          "year": 2026,
          "price": "₹ 40.00 - 60.00 Lakh (Expected Ex-showroom, India)",
          "engineAndTransmission": {
            "engineType": "Electric (EV)",
            "displacement": "N/A",
            "maxPower": "238 hp (FWD, 63 kWh battery) to 389 hp (e-4ORCE AWD, 87 kWh battery)",
            "maxTorque": "300 Nm (FWD) to 600 Nm (e-4ORCE AWD)",
            "cylinders": "N/A",
            "valvesPerCylinder": "N/A",
            "valveConfiguration": "N/A",
            "fuelSupplySystem": "N/A",
            "turboCharger": "N/A",
            "transmissionType": "Automatic (Single-speed direct drive)",
            "gearbox": "N/A",
            "driveType": "Front-Wheel Drive (FWD) / All-Wheel Drive (AWD - e-4ORCE)"
          },
          "fuelAndPerformance": {
            "fuelType": "Electric",
            "mileage": "Approx. 400 - 530 km (WLTP/EPA Range, depending on variant)",
            "fuelTankCapacity": "N/A (Battery: 63 kWh or 87 kWh usable)",
            "emissionNorm": "Zero Emission",
            "chargingTimeAC": "Approx. 10 hours (7.4 kW AC, 87 kWh battery) to 4 hours 45 mins (22 kW AC, 87 kWh battery)",
            "chargingTimeDC": "Approx. 35 mins (10-80% on 130 kW DC fast charger)"
          },
          "suspensionSteeringBrakes": {
            "frontSuspension": "MacPherson Strut",
            "rearSuspension": "Multi-Link",
            "steeringType": "Electric Power Assisted",
            "steeringColumn": "Tilt & Telescopic Adjustable",
            "turningRadius": "10.8 m",
            "frontBrakeType": "Ventilated Disc",
            "rearBrakeType": "Ventilated Disc"
          },
          "dimensionsAndCapacity": {
            "length": "4595 mm",
            "width": "1850 mm",
            "height": "1660 mm",
            "seatingCapacity": 5,
            "groundClearance": "N/A (Approx. 170-180 mm)",
            "wheelBase": "2775 mm",
            "numberOfDoors": 5,
            "bootSpace": "468 Litres"
          },
          "comfortAndConvenience": {
            "features": [
              "Power Steering", "Automatic Climate Control (Dual Zone)", "Cruise Control (Intelligent Cruise Control)",
              "Parking Sensors (Front & Rear)", "Keyless Entry", "Push Button Start/Stop",
              "Heated Front & Rear Seats", "Heated Steering Wheel", "Ventilated Front Seats",
              "Powered Tailgate", "Panoramic Sunroof", "Head-Up Display (HUD)"
            ]
          },
          "interior": {
            "features": [
              "12.3-inch Dual Touchscreen Displays (Infotainment & Instrument Cluster)", "Leatherette/Leather Upholstery",
              "Minimalist Dashboard Design", "Haptic Feedback Controls", "Sliding Centre Console",
              "Ambient Lighting", "Bose Premium Audio System (Optional)"
            ]
          },
          "exterior": {
            "features": [
              "Sleek LED Headlamps with DRLs", "LED Blade Taillamps", "19-inch / 20-inch Alloy Wheels",
              "Illuminated Nissan Logo", "Coupe-like Roofline", "Aerodynamic Design",
              "Flush Door Handles"
            ],
            "tyre": {
              "size": "235/55 R19 or 235/50 R20",
              "type": "Radial Tubeless",
              "wheelSize": "R19/R20"
            },
            "bootOpening": "Powered"
          },
          "safety": {
            "features": [
              "ABS with EBD", "Brake Assist", "Multiple Airbags (Front, Side, Curtain)", "Electronic Stability Control (ESC)",
              "Traction Control System (TCS)", "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
              "360-degree Camera (Intelligent Around View Monitor)", "Driver Attention Warning",
              "Hill Start Assist", "Vehicle Sound for Pedestrians (VSP)"
            ],
            "ncapRating": {
              "adultOccupant": "5 Star (Euro NCAP)",
              "childOccupant": "5 Star (Euro NCAP)"
            }
          },
          "entertainmentAndCommunication": {
            "features": [
              "12.3-inch Touchscreen Infotainment", "AM/FM Radio", "Bluetooth Connectivity",
              "Wireless Android Auto", "Wireless Apple CarPlay", "Bose Premium Sound System",
              "USB-A & USB-C Ports", "Voice Commands (Built-in Assistant)", "Steering-mounted controls",
              "Built-in Navigation", "Amazon Alexa Integration"
            ]
          },
          "adasFeatures": {
            "features": [
              "ProPILOT Assist 2.0 (Hands-on, single-lane highway driving assist)",
              "Automated Emergency Braking with Pedestrian Detection",
              "Lane Departure Warning with Lane Keeping Assist",
              "Blind Spot Warning", "Rear Cross Traffic Alert",
              "High Beam Assist", "Adaptive Cruise Control"
            ]
          },
          "internetFeatures": {
            "features": [
              "NissanConnect Services", "Over-the-Air (OTA) Updates", "Wi-Fi Hotspot",
              "Remote Vehicle Control via App (Charging, Climate Control)"
            ]
          }
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

/* */


// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import './tab.css'; // Make sure this path is correct for your styles
// import { SlArrowRight } from "react-icons/sl";
// import { VscFeedback } from "react-icons/vsc";
// import { Link, useNavigate } from 'react-router-dom';

// // Authentication checking (assuming 'auth' is properly configured in firebase.js)
// import { auth } from '../../firebase';
// import { onAuthStateChanged } from 'firebase/auth';

// // Scroll up animation
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// //store DB
// import FavoriteVehicle from './FavoriteVehicle';

// // Image imports - Ensure these paths are correct and images exist
// import audiA3 from './cardbox/audi-a3.jpg';
// import audiA4 from './cardbox/audi-a4.jpg';
// import audiA6 from './cardbox/audi-a6.jpg'; // New import for Audi Q3
// import audiQ7 from './cardbox/audi-q7.jpg';
// import audiQ3 from './cardbox/audi-q3.jpg';
// import bmw3Series from './cardbox/bmw-3-series.jpg'; // New import for BMW 3 Series
// import bmw5Series from './cardbox/bmw-5-series.jpg'; // New import for BMW 5 Series
// import bmwIx from './cardbox/bmw-ix.jpg'; // New import for BMW iX
// import bmwx3 from './cardbox/bmwx3.jpg'; // Explicitly imported for BMW X3
// import bmwx5 from './cardbox/bmwx5.jpg';
// import bmwx7 from './cardbox/bmwx7.jpg';
// import fordendeavour from './cardbox/ford-endeavour.jpg';
// import fordecosport from './cardbox/ford-ecosport.jpg';
// import fordfreestyle from './cardbox/ford-freestyle.jpg';
// import fordaspire from './cardbox/ford-aspire.jpg';
// import fordfigo from './cardbox/ford-figo.jpg';
// import hondacity from './cardbox/city.jpg';
// import hondaelevate from './cardbox/elevate.jpg';
// import hondaJazz from './cardbox/honda-jazz.jpg';
// import hondaWrv from './cardbox/honda-wrv.jpg'; // New import for Honda WR-V
// import hyundaiAmze from './cardbox/hyundaiAmze.jpg'; // Re-using for Amaze
// import hyundaiaura from './cardbox/hyndaiaura.jpg';
// import hyundaicreta from './cardbox/hyndaicreta.jpg';
// import hyundaivenue from './cardbox/hyundai-venue.jpg';
// import hyundaiverna from './cardbox/hyundai-verna.jpg';
// import jeepcompass from './cardbox/jeep-compass.jpg'; // New import for Jeep
// import jeepwrangler from './cardbox/jeep-wrangler.jpg';
// import jeepmeridian from './cardbox/jeep-meridian.jpg'; // New import for Jeep
// import mahindraBoleroNeo from './cardbox/mahindra-bolero-neo.jpg'; // New import for Mahindra Bolero Neo
// import mahindraXuv300 from './cardbox/mahindra-xuv300.jpg'; // New import for Mahindra XUV300
// import mahindrascorpio from './cardbox/mahindraScorpio.jpg';
// import mahindrathar from './cardbox/mahindraThar.jpg';
// import mahindraxuv from './cardbox/mahindraXUV700.jpg';
// import mercdeseclass from './cardbox/mercedes-e-class.jpg';
// import mercdesesclass from './cardbox/mercedes-s-class.jpg';
// import mercedesCClass from './cardbox/mercedes-c-class.jpg'; // New import for Mercedes C-Class
// import mercedesEqs from './cardbox/mercedes-eqs.jpg'; // New import for Mercedes EQS
// import mercedesGlc from './cardbox/mercedes-glc.jpg'; // New import for Mercedes GLC
// import mercedesg from './cardbox/mercedes-g-class.jpg';
// import nissanariya from './cardbox/Nissan_Ariya.jpg'; // New import for Nissan
// import nissanKicks from './cardbox/nissan-kicks.jpg'; // New import for Nissan Kicks
// import nissanmagnite from './cardbox/nissan-magnite.jpg'; // New import for Nissan
// import rangeRoverDefender from './cardbox/range-rover-evoque.jpg'; // New import for Land Rover Defender
// import rangeRoverEvoque from './cardbox/range-rover-evoque.jpg';
// import rangeRoverSport from './cardbox/range-rover-sport.jpg';
// import rangeRoverVelar from './cardbox/range-rover-velar.jpg';
// import renaultkiger from './cardbox/renaultkiger.jpg';
// import renaultkwid from './cardbox/renaultkwid.jpg';
// import renaulttriber from './cardbox/renaulttriber.jpg';
// import renaultduster from './cardbox/renault-duster.jpg';
// import rollsRoyceCullinan from './cardbox/rolls-royce-cullinan.jpg';
// import rollsRoyceDawn from './cardbox/rolls-royce-dawn.jpg'; // New import for Rolls-Royce Dawn
// import rollsRoyceGhost from './cardbox/rolls-royce-ghost.jpg';
// import rollsRoycePhantom from './cardbox/rolls-royce-phantom.jpg';
// import rollsRoyceWraith from './cardbox/rolls-royce-wraith.jpg'; // New import for Rolls-Royce Wraith
// import suzukibaleno from './cardbox/suzukibaleno.jpg';
// import suzukibrezza from './cardbox/suzuki-brezza.jpg';
// import suzukidzire from './cardbox/suzukidzire.jpg';
// import suzukiertiga from './cardbox/suzuki-ertiga.jpg';
// import suzukigrandvitara from './cardbox/suzuki-grand-vitara.jpg';
// import suzukiswift from './cardbox/suzukiswift.jpg';
// import tataaltroz from './cardbox/tataAltroz.jpg';
// import tataharrier from './cardbox/tataHarrier.jpg';
// import tataNexonEv from './cardbox/tata-nexon-ev.jpg'; // New import for Tata Nexon EV
// import tatanexon from './cardbox/tataPunch.jpg'; // Re-using for Punch
// import tataSafari from './cardbox/tata-safari.jpg'; // New import for Tata Safari
// import ToyotaFortuner from './cardbox/ToyotaFortuner.jpg';
// import toyotaHyryder from './cardbox/toyota-urban-cruiser-hyryder.jpg'; // New import for Toyota Urban Cruiser Hyryder
// import ToyotaInnovaHycross from './cardbox/ToyotaInnovaHycross.jpg';
// import ToyotaLandCruiser from './cardbox/ToyotaLandCruiser.jpg';
// import toyotaCamry from './cardbox/toyota-camry.jpg'; // New import for Toyota Camry
// // import volkswagenPoloGti from './cardbox/volkswagenPoloGti.jpg'; // New import for VW Polo GTI (if needed for variety, otherwise just Polo)
// import volkswagenTroc from './cardbox/volkswagen-t-roc.jpg'; // New import for VW T-Roc
// import vwPolo from './cardbox/valkswagenPolo.jpg';
// import vwTaigun from './cardbox/VolkswagenTiguan.jpg';
// import vwTiguan from './cardbox/volkswagen-tiguan.jpg';
// import vwVirtus from './cardbox/valkswagenVitrus.jpg';


// // // Structure for vehicle data
// export const vehicleData = [
//   {
//     manufacturer: "Suzuki",
//     idPrefix: "Suzuki",
//     vehicles: [
//       {
//         "id": "suzuki-swift",
//         "videoPoster": suzukiswift,
//         "videoSrc": "https://www.youtube.com/embed/QmZt-SPEqaw",
//         "thumbnail": "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
//         "title": "Suzuki Swift",
//         "link": "https://www.globalsuzuki.com/automobile/lineup/swift/",
//         "description": "The Maruti Suzuki Swift VXi offers a peppy 1.2L K Series engine, compact design, and features like a touchscreen infotainment system, cruise control, and dual airbags. Perfect for urban commutes.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Swift",
//           "manufacturer": "Maruti Suzuki",
//           "year": 2024,
//           "price": "₹ 7.84 - 8.34 Lakh (ex-showroom)",
//           "engineAndTransmission": {
//             "engineType": "1.2L DualJet (K12N)",
//             "displacement": "1197 cc",
//             "maxPower": "88.50 bhp @ 6000 rpm",
//             "maxTorque": "113 Nm @ 4400 rpm",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (AMT)",
//             "gearbox": "5-Speed",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / CNG",
//             "mileage": "22.38 - 22.56 kmpl (Petrol, ARAI) / 30.90 km/kg (CNG)",
//             "fuelTankCapacity": "37 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Torsion Beam",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt",
//             "turningRadius": "4.8 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3845 mm",
//             "width": "1735 mm",
//             "height": "1530 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "163 mm",
//             "wheelBase": "2450 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "268 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front)", "60:40 Split Rear Seat",
//               "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Central Console Armrest"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "Flat-bottom steering wheel", "Digital Cluster"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Wheel Covers", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "LED High Mounted Stop Lamp",
//               "Body Coloured Bumpers", "Body Coloured Door Handles"
//             ],
//             "tyre": {
//               "size": "185/65 R15",
//               "type": "Radial Tubeless",
//               "wheelSize": "15 Inch"
//             },
//             "bootOpening": "Electronic"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "Hill Assist", "2 Airbags (Dual Front)", "ISOFIX Mounts",
//               "Anti-Theft Alarm", "Rear Camera (with guidlines)", "Seat Belt Warning",
//               "Door Ajar Warning", "Engine Immobilizer", "Speed Sensing Auto Door Lock",
//               "Pretensioners & Load Limiters"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "7-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto", "Apple CarPlay", "4 Speakers",
//               "USB Ports", "Inbuilt Apps"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "N/A (Generally not available in this segment)"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "N/A (SmartPlay Studio App Connectivity on higher variants)"
//             ]
//           }
//         }
//       },
//       {
//         "id": "suzuki-baleno",
//         "videoPoster": suzukibaleno,
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
//         "title": "Suzuki Baleno",
//         "link": "https://www.globalsuzuki.com/automobile/lineup/baleno/",
//         "description":  "The Maruti Suzuki Baleno is a premium hatchback offering spacious interiors, a comfortable ride, and a host of modern features.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Baleno",
//           "manufacturer": "Maruti Suzuki",
//           "year": 2024,
//           "price": "₹ 8.38 - 8.93 Lakh (ex-showroom)",
//           "engineAndTransmission": {
//             "engineType": "1.2L K Series Dualjet, Dual VVT",
//             "displacement": "1197 cc",
//             "maxPower": "88.50 bhp @ 6000 rpm",
//             "maxTorque": "113 Nm @ 4400 rpm",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (AMT)",
//             "gearbox": "5-Speed",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / CNG",
//             "mileage": "22.35 - 22.94 kmpl (Petrol, ARAI) / 30.61 km/kg (CNG)",
//             "fuelTankCapacity": "37 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Rear Twist Beam",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "4.85 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3990 mm",
//             "width": "1745 mm",
//             "height": "1500 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "N/A",
//             "wheelBase": "2520 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "318 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
//               "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Voice Commands", "Automatic Headlamps", "Hands-Free Tailgate (Manual boot opening)",
//               "Central Console Armrest (With Storage)", "Push Button Start/Stop"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "D-Cut steering wheel", "Digital Cluster",
//               "Dual tone gray interiors", "Adjustable Headrests"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
//               "LED High Mounted Stop Lamp", "Chrome Grille", "Body Coloured ORVMs"
//             ],
//             "tyre": {
//               "size": "195/55 R16",
//               "type": "Radial Tubeless",
//               "wheelSize": "16 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags", "ISOFIX Mounts",
//               "Anti-Theft Alarm", "Rear Camera (with guided lines)", "TPMS",
//               "Day & Night Rear View Mirror", "Pretensioners & Load Limiters",
//               "Speed Sensing Auto Door Lock", "Door Ajar Warning", "Seat Belt Warning",
//               "Anti-Pinch Power Windows (Driver)", "Speed Alert", "Engine Immobilizer"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "9-inch Touchscreen SmartPlay Pro+ Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto", "Apple CarPlay", "4 Speakers + 2 Tweeters",
//               "USB Ports", "Onboard Voice Assistant", "Wireless Phone Charging"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "360 Degree Camera", "Heads-Up Display"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "NEXT GENERATION SUZUKI CONNECT (40+ connected car features)",
//               "Remote Control (through Smartplay Studio App)", "Live Traffic Update (Through Smartplay Studio App)",
//               "Live Location", "Over the Air Updates", "Smartwatch App"
//             ]
//           }
//         }
//       },
//       {
//         "id": 'suzuki-dzire',
//         "videoPoster": suzukidzire,
//         "videoSrc": "https://www.youtube.com/embed/Hrpwg8T3pwc",
//         "thumbnail": "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
//         "title": "Suzuki Dzire",
//         "link": "https://www.globalsuzuki.com/automobile/lineup/dzire/",
//         "description": "The Maruti Suzuki Dzire is a compact sedan known for its fuel efficiency, comfortable cabin, and reliable performance, making it a popular family car.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Dzire ZXi",
//           "manufacturer": "Maruti Suzuki",
//           "year": 2024,
//           "price": "₹ 8.94 - 9.44 Lakh (ex-showroom)",
//           "engineAndTransmission": {
//             "engineType": "1.2L DualJet (Z Series)",
//             "displacement": "1197 cc",
//             "maxPower": "80 bhp @ 5700 rpm",
//             "maxTorque": "112 Nm @ 4300 rpm",
//             "cylinders": 3,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (AMT)",
//             "gearbox": "5-Speed",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / CNG",
//             "mileage": "24.79 - 25.71 kmpl (Petrol, ARAI) / 33.73 km/kg (CNG)",
//             "fuelTankCapacity": "37 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Torsion Beam",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt",
//             "turningRadius": "4.8 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3995 mm",
//             "width": "1735 mm",
//             "height": "1515 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "163 mm",
//             "wheelBase": "2450 mm",
//             "numberOfDoors": 4,
//             "bootSpace": "378 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front)", "Rear Seat Centre Arm Rest",
//               "Cooled Glovebox", "Vanity Mirror", "Trunk Light", "Map Lamps",
//               "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Rear Accessory Socket with Mobile Pocket"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "Dual tone beige-black interiors", "D-Cut steering wheel",
//               "Digital Cluster"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Defogger", "Alloy Wheels", "Power Antenna",
//               "Outside Mirror Turn Indicators", "LED High Mounted Stop Lamp",
//               "Body Coloured Door Handles", "Chrome Finish Front Fog Lamp Garnish"
//             ],
//             "tyre": {
//               "size": "185/65 R15",
//               "type": "Radial Tubeless",
//               "wheelSize": "15 Inch"
//             },
//             "bootOpening": "Electromagnetic"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags", "ISOFIX Mounts",
//               "Anti-Theft Alarm", "Rear Camera (with guidlines)", "Seat Belt Warning",
//               "Door Ajar Warning", "Engine Immobilizer", "Speed Sensing Auto Door Lock",
//               "Pretensioners & Load Limiters", "Bharat NCAP 5-Star Safety Rating"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "9-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "4 Speakers",
//               "USB Ports", "Inbuilt Apps", "Wireless Phone Charging"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "N/A (Generally not available in this segment)"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "N/A (SmartPlay Pro+ Connectivity on higher variants)"
//             ]
//           }
//         }
//       },
//       {
//         "id": 'suzuki-ertiga',
//         "videoPoster": suzukiertiga,
//         "videoSrc": "https://www.youtube.com/embed/S2pT-e5H01M",
//         "thumbnail": "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
//         "title": "Suzuki Ertiga",
//         "link": "https://www.globalsuzuki.com/automobile/lineup/ertiga/",
//         "description": "The Maruti Suzuki Ertiga is a popular MUV (Multi Utility Vehicle) offering spacious seating for seven, fuel efficiency, and a comfortable ride for families.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Ertiga ZXi",
//           "manufacturer": "Maruti Suzuki",
//           "year": 2024,
//           "price": "₹ 11.15 - 12.55 Lakh (ex-showroom)",
//           "engineAndTransmission": {
//             "engineType": "1.5L K15C Smart Hybrid",
//             "displacement": "1462 cc",
//             "maxPower": "101.64 bhp @ 6000 rpm",
//             "maxTorque": "139 Nm @ 4300 rpm",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (Torque Converter)",
//             "gearbox": "5-Speed (MT) / 6-Speed (AT)",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / CNG",
//             "mileage": "20.3 - 20.51 kmpl (Petrol, ARAI) / 26.11 km/kg (CNG)",
//             "fuelTankCapacity": "45 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Torsion Beam",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt",
//             "turningRadius": "N/A",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "4395 mm",
//             "width": "1735 mm",
//             "height": "1690 mm",
//             "seatingCapacity": 7,
//             "groundClearance": "180 mm",
//             "wheelBase": "2740 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "209 Litres (all seats up)"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (2nd & 3rd Row)", "60:40 Split 2nd Row Seat",
//               "50:50 Split 3rd Row Seat", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
//               "Paddle Shifters (AT)", "Air Cooled Twin Cup Holders"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Plush Dual-Tone Seat Fabric", "Metallic Teak-Wooden Finish on Door Trims",
//               "3rd Row 50:50 Split Seats with Recline function", "D-Cut steering wheel"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
//               "LED High Mounted Stop Lamp", "Dynamic Chrome Winged Front Grille",
//               "New Back Door Garnish with Chrome Insert", "Chrome Plated Door Handles"
//             ],
//             "tyre": {
//               "size": "185/65 R15",
//               "type": "Radial Tubeless",
//               "wheelSize": "15 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags", "ISOFIX Mounts",
//               "Anti-Theft Alarm", "Rear Camera (with guided lines)", "Seat Belt Warning",
//               "Door Ajar Warning", "Engine Immobilizer", "Speed Alert", "Speed Sensing Auto Door Lock",
//               "Pretensioners & Force Limiters", "Global NCAP 3-Star Safety Rating"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "7-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto", "Apple CarPlay", "4 Speakers",
//               "USB Ports", "Inbuilt Apps", "ARKAMYS Sound System"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "N/A (Generally not available in this segment)"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "SUZUKI CONNECT (40+ connected car features)", "Overspeed Alert", "Live Location",
//               "Stolen Vehicle Notification and Tracking", "SOS Button"
//             ]
//           }
//         }
//       },
//       {
//         "id": 'suzuki-brezza',
//         "videoPoster": suzukibrezza,
//         "videoSrc": "https://www.youtube.com/embed/Q0P_Mv1k-6I",
//         "thumbnail": "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
//         "title": "Suzuki Brezza",
//         "link": "https://www.globalsuzuki.com/automobile/lineup/brezza/",
//         "description": "The Maruti Suzuki Brezza is a compact SUV known for its bold design, robust performance, and a comprehensive suite of safety and smart features.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Brezza ZXi+",
//           "manufacturer": "Maruti Suzuki",
//           "year": 2024,
//           "price": "₹ 12.48 - 14.14 Lakh (ex-showroom)",
//           "engineAndTransmission": {
//             "engineType": "1.5L K15C Smart Hybrid",
//             "displacement": "1462 cc",
//             "maxPower": "101.64 bhp @ 6000 rpm",
//             "maxTorque": "136.8 Nm @ 4400 rpm",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (Torque Converter)",
//             "gearbox": "5-Speed (MT) / 6-Speed (AT)",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / CNG",
//             "mileage": "17.38 - 19.89 kmpl (Petrol, ARAI) / 25.51 km/kg (CNG)",
//             "fuelTankCapacity": "48 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut & Coil",
//             "rearSuspension": "Torsion Beam & Coil Spring",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "5.3 m",
//             "frontBrakeType": "Ventilated Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3995 mm",
//             "width": "1790 mm",
//             "height": "1685 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "198 mm",
//             "wheelBase": "2500 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "328 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
//               "Cooled Glovebox", "Vanity Mirror", "Trunk Light", "Map Lamps",
//               "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Hands-Free Tailgate (Manual boot opening)",
//               "Central Console Armrest (With Storage)", "Paddle Shifters (AT)",
//               "Rear Center Armrest with Cupholder", "Front Footwell Illumination"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "Flat Bottom Steering Wheel", "Rear Parcel Tray",
//               "Dual Tone Interior Theme", "Chrome Plated Inside Door Handles", "Door Armrest With Fabric"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
//               "LED High Mounted Stop Lamp", "Precision Cut Alloy Wheels", "Chrome Accentuated Front Grille",
//               "Wheel Arch Cladding", "Side Under Body Cladding", "Front & Rear Silver Skid Plate"
//             ],
//             "tyre": {
//               "size": "215/60 R16",
//               "type": "Radial Tubeless",
//               "wheelSize": "16 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags", "ISOFIX Mounts",
//               "Anti-Theft Alarm", "Rear Camera", "TPMS", "Day & Night Rear View Mirror",
//               "Pretensioners & Load Limiters", "Speed Sensing Auto Door Lock",
//               "Door Ajar Warning", "Seat Belt Warning", "Engine Immobilizer",
//               "Impact Sensing Auto Door Unlock", "Anti-Pinch Power Windows (Driver)"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "9-inch Touchscreen SmartPlay Pro+ Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "4 Speakers + 2 Tweeters",
//               "USB Ports", "Inbuilt Apps", "Wireless Phone Charging", "ARKAMYS Surround Sense Sound System"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "360 View Camera", "Heads-Up Display"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "SUZUKI CONNECT (Breakdown notification, Stolen Vehicle Notification and Tracking, Safe Time Alert, Headlight Off, Hazard Lights On/Off, Alarm On/Off, Low Fuel & Low Range Alert, AC Idling, Door & Lock Status)"
//             ]
//           }
//         }
//       },
//       {
//         "id": 'suzuki-grand-vitara',
//         "videoPoster": suzukigrandvitara,
//         "videoSrc": "https://www.youtube.com/embed/Uo97t6B618s",
//         "thumbnail": "https://www.globalsuzuki.com/img/common/suzukiLogo.svg",
//         "title": "Suzuki Grand Vitara",
//         "link": "https://www.globalsuzuki.com/automobile/lineup/grandvitara/",
//         "description": "The Maruti Suzuki Grand Vitara is a premium mid-size SUV offering sophisticated design, advanced hybrid powertrains, and a comfortable, feature-rich interior.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Grand Vitara Zeta+ Hybrid",
//           "manufacturer": "Maruti Suzuki",
//           "year": 2024,
//           "price": "₹ 18.60 - 19.36 Lakh (ex-showroom)",
//           "engineAndTransmission": {
//             "engineType": "1.5L M15D Strong Hybrid",
//             "displacement": "1490 cc",
//             "maxPower": "91.18 bhp @ 5500 rpm (Engine) + Electric Motor",
//             "maxTorque": "122 Nm @ 3800-4800 rpm (Engine) + Electric Motor",
//             "cylinders": 3,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Automatic (e-CVT)",
//             "gearbox": "E-CVT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Hybrid (Petrol + Electric)",
//             "mileage": "27.97 kmpl (ARAI)",
//             "fuelTankCapacity": "45 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Rear Twist Beam",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "5.4 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Disc"
//           },
//           "dimensionsAndCapacity": {
//             "length": "4345 mm",
//             "width": "1795 mm",
//             "height": "1645 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "210 mm",
//             "wheelBase": "2600 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "373 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
//               "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
//               "Front Ventilated Seats", "Puddle Lamps", "Soft Touch IP with Premium Stitch"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "All Black Interior with Champagne Gold Accents",
//               "Chrome Inside Door Handle", "Ambient Lighting Door Spot & IP Line"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
//               "LED High Mounted Stop Lamp", "Panoramic Sunroof", "Chrome Finish on Grille"
//             ],
//             "tyre": {
//               "size": "215/60 R17",
//               "type": "Radial Tubeless",
//               "wheelSize": "17 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags", "ISOFIX Mounts",
//               "Anti-Theft Alarm", "Rear Camera (with guided lines)", "TPMS",
//               "Day & Night Rear View Mirror", "Pretensioners & Load Limiters",
//               "Speed Sensing Auto Door Lock", "Door Ajar Warning", "Seat Belt Warning",
//               "Engine Immobilizer", "Impact Sensing Auto Door Unlock", "360-degree camera"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "9-inch Touchscreen SmartPlay Pro+ Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "4 Speakers + 2 Tweeters",
//               "USB Ports", "Inbuilt Apps", "Wireless Phone Charging", "ARKAMYS Sound Tuning"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "360 Degree Camera", "Heads-Up Display"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "SUZUKI CONNECT (Overspeed, Seatbelt, Geofence, Time Fence, Valet, Tow Away, Live Location, Stolen Vehicle Tracking, Remote Immobiliation, Vehicle Health Status, Breakdown Notification, E-Call & I-Call, Over the Air Updates)"
//             ]
//           }
//         }
//       }
//     ]
//   },

//   {
//     manufacturer: "Hyundai",
//     idPrefix: "hyundai",
//     vehicles: [
//       {
//         "id": "hyundai-creta",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/144049/creta-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hyundai_logo.svg/1200px-Hyundai_logo.svg.png",
//         "title": "Hyundai Creta",
//         "link": "https://www.cardekho.com/hyundai/creta/specifications.htm",
//         "description": "The Hyundai Creta is a segment-leading compact SUV known for its bold design, premium features, multiple engine options, and advanced safety, including ADAS.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Creta",
//           "manufacturer": "Hyundai",
//           "year": 2024,
//           "price": "₹ 11.00 - 20.50 Lakh (ex-showroom, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.5L MPi Petrol / 1.5L Turbo GDi Petrol / 1.5L CRDi Diesel",
//             "displacement": "1497 cc (MPi Petrol) / 1482 cc (Turbo Petrol) / 1493 cc (Diesel)",
//             "maxPower": "113.45 bhp @ 6300 rpm (MPi Petrol) / 157.8 bhp @ 5500 rpm (Turbo Petrol) / 113.98 bhp @ 4000 rpm (Diesel)",
//             "maxTorque": "143.8 Nm @ 4500 rpm (MPi Petrol) / 253 Nm @ 1500-3500 rpm (Turbo Petrol) / 250 Nm @ 1500-2750 rpm (Diesel)",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi / GDi / CRDi",
//             "turboCharger": true,
//             "transmissionType": "Manual / Automatic (IVT/DCT/Torque Converter)",
//             "gearbox": "6-speed MT / IVT / 7-speed DCT / 6-speed AT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / Diesel",
//             "mileage": "17.4 - 21.8 kmpl (ARAI, varies by engine/transmission)",
//             "fuelTankCapacity": "50 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut with Coil Spring",
//             "rearSuspension": "Coupled Torsion Beam Axle (CTBA) with Coil Spring",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "5.2 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Disc"
//           },
//           "dimensionsAndCapacity": {
//             "length": "4330 mm",
//             "width": "1790 mm",
//             "height": "1635 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "190 mm",
//             "wheelBase": "2610 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "433 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
//               "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
//               "Front Ventilated Seats", "Puddle Lamps", "8-Way Power Driver Seat",
//               "Electronic Parking Brake with Auto Hold", "Air Purifier", "Connected Car Tech (Bluelink)"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Leatherette Upholstery", "Ambient Lighting", "Metal Finish Inside Door Handle"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "LED Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
//               "LED High Mounted Stop Lamp", "Panoramic Sunroof", "Chrome Finish on Grille",
//               "Twin-tip Exhaust (Turbo)"
//             ],
//             "tyre": {
//               "size": "215/60 R17",
//               "type": "Radial Tubeless",
//               "wheelSize": "17 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "VSM", "Hill-Start Assist Control (HAC)", "6 Airbags (Standard)",
//               "ISOFIX Mounts", "Anti-Theft Alarm", "Rear Camera (with dynamic guidelines)", "TPMS",
//               "Day & Night Rear View Mirror", "Pretensioners & Load Limiters",
//               "Speed Sensing Auto Door Lock", "Door Ajar Warning", "Seat Belt Warning (All Seats)",
//               "Engine Immobilizer", "Impact Sensing Auto Door Unlock", "All 4 Disc Brakes"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "10.25-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "Bose Premium Sound System (8 Speakers)",
//               "USB Ports", "Inbuilt Navigation", "Wireless Phone Charging", "Voice Recognition",
//               "Connected Car Tech (Bluelink)"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Forward Collision-Avoidance Assist (FCA) - Car, Pedestrian, Cycle, Junction Turning",
//               "Blind-Spot Collision-Avoidance Assist (BCA) & Blind-spot Collision Warning (BCW)",
//               "Lane Keeping Assist (LKA)", "Lane Departure Warning (LDW)", "High Beam Assist (HBA)",
//               "Driver Attention Warning (DAW)", "Safe Exit Warning (SEW)",
//               "Smart Cruise Control with Stop & Go (SCC with S&G)", "Lane Following Assist (LFA)",
//               "Leading Vehicle Departure Alert (LVDA)",
//               "Rear Cross-Traffic Collision-Avoidance Assist (RCCA) & Rear Cross-Traffic Collision Warning (RCCW)",
//               "Surround View Monitor (SVM)", "Blind-spot View Monitor (BVM)"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Bluelink Connected Features (60+ features)",
//               "Over-the-Air (OTA) Updates", "Remote Engine Start/Stop", "Remote Climate Control",
//               "Geo-Fence Alert", "Time Fence Alert", "Stolen Vehicle Tracking", "Valet Mode"
//             ]
//           }
//         }
//       },
//       {
//         "id": "hyundai-aura",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/aura-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hyundai_logo.svg/1200px-Hyundai_logo.svg.png",
//         "title": "Hyundai Aura",
//         "link": "https://www.cardekho.com/hyundai/aura/specifications.htm",
//         "description": "The Hyundai Aura is a stylish and practical compact sedan, offering strong fuel efficiency, comfortable interiors, and 6 standard airbags.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Aura",
//           "manufacturer": "Hyundai",
//           "year": 2024,
//           "price": "₹ 6.70 - 9.30 Lakh (ex-showroom, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.2L Kappa Petrol / 1.2L Bi-Fuel (Petrol + CNG)",
//             "displacement": "1197 cc",
//             "maxPower": "82 bhp @ 6000 rpm (Petrol) / 68 bhp @ 6000 rpm (CNG)",
//             "maxTorque": "113.8 Nm @ 4000 rpm (Petrol) / 95.2 Nm @ 4000 rpm (CNG)",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (AMT)",
//             "gearbox": "5-speed MT / 5-speed AMT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / CNG",
//             "mileage": "20.30 kmpl (Petrol, ARAI) / 28.00 km/kg (CNG, ARAI)",
//             "fuelTankCapacity": "37 Litres (Petrol) / 65 Litres (CNG)",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Coupled Torsion Beam Axle",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt",
//             "turningRadius": "4.9 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3995 mm",
//             "width": "1680 mm",
//             "height": "1520 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "165 mm",
//             "wheelBase": "2450 mm",
//             "numberOfDoors": 4,
//             "bootSpace": "402 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front & Rear)", "Bench Folding Rear Seat",
//               "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Central Console Armrest (With Storage)", "Wireless Phone Charger"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "Premium Glossy Black Inserts", "Footwell Lighting",
//               "Chrome Finish (Gear Knob, Parking Lever Tip)", "Metal Finish Inside Door Handles"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Defogger", "Alloy Wheels", "Body Colored Bumpers & ORVMs",
//               "Chrome Outside Door Handles", "B-Pillar Blackout", "Rear Chrome Garnish"
//             ],
//             "tyre": {
//               "size": "175/60 R15",
//               "type": "Radial Tubeless",
//               "wheelSize": "15 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "Hill Assist", "6 Airbags (Standard)", "ISOFIX Child Seat Mounts",
//               "Anti-Theft Engine Immobilizer", "Rear Parking Sensors", "Rear Camera", "TPMS (Higher Variants)",
//               "Day/Night Rearview Mirror", "Seat Belt Warning", "Child Lock", "Overspeed Warning",
//               "Speed Sensing Door Lock", "Middle Rear Three-Point Seatbelt", "Central Locking",
//               "Impact Sensing Auto Door Unlock"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "8-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Voice Recognition"
//             ]
//           },
//           "adasFeatures": {
//             "features": []
//           },
//           "internetFeatures": {
//             "features": []
//           }
//         }
//       },
//       {
//         "id": "hyundai-i20",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/i20-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hyundai_logo.svg/1200px-Hyundai_logo.svg.png",
//         "title": "Hyundai i20",
//         "link": "https://www.cardekho.com/hyundai/i20/specifications.htm",
//         "description": "The Hyundai i20 is a premium hatchback known for its stylish design, feature-rich cabin, and comfortable ride quality. The N Line variant offers a sportier experience.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "i20 (Standard)",
//           "manufacturer": "Hyundai",
//           "year": 2024,
//           "price": "₹ 7.70 - 11.50 Lakh (ex-showroom, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.2L Kappa Petrol",
//             "displacement": "1197 cc",
//             "maxPower": "82 bhp @ 6000 rpm",
//             "maxTorque": "114.7 Nm @ 4200 rpm",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (IVT)",
//             "gearbox": "5-speed MT / IVT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol",
//             "mileage": "19.65 - 20.35 kmpl (ARAI)",
//             "fuelTankCapacity": "37 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Coupled Torsion Beam Axle",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "5.2 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3995 mm",
//             "width": "1775 mm",
//             "height": "1505 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "170 mm",
//             "wheelBase": "2580 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "311 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
//               "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
//               "Wireless Phone Charger", "Electric Sunroof (top variants)"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Leatherette Upholstery (Higher Variants)", "Ambient Lighting",
//               "Chrome Inside Door Handle", "Metal Finish on Interior Elements"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
//               "LED High Mounted Stop Lamp", "Chrome Beltline", "Parametric Jewel Pattern Grille"
//             ],
//             "tyre": {
//               "size": "195/55 R16",
//               "type": "Radial Tubeless",
//               "wheelSize": "16 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "Hill Start Assist Control (HAC)", "6 Airbags (Standard on higher trims)",
//               "ISOFIX Mounts", "Rear Parking Sensors", "Rear Camera", "TPMS",
//               "Day & Night Rear View Mirror", "Speed Sensing Auto Door Lock",
//               "Door Ajar Warning", "Seat Belt Warning", "Engine Immobilizer", "Impact Sensing Auto Door Unlock"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "10.25-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "Bose Premium Sound System",
//               "USB Ports", "Inbuilt Navigation", "Wireless Phone Charging", "Voice Recognition",
//               "Connected Car Tech (Bluelink)"
//             ]
//           },
//           "adasFeatures": {
//             "features": []
//           },
//           "internetFeatures": {
//             "features": [
//               "Bluelink Connected Car Technology",
//               "Remote Vehicle Control", "Live Location Tracking", "Geo-fence Alert"
//             ]
//           }
//         }
//       },
//       {
//         "id": "hyundai-i20-n-line",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/i20-n-line-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hyundai_logo.svg/1200px-Hyundai_logo.svg.png",
//         "title": "Hyundai i20 N Line",
//         "link": "https://www.cardekho.com/hyundai/i20-n-line/specifications.htm",
//         "description": "The Hyundai i20 N Line is the sportier variant of the i20 hatchback, offering a more powerful turbo-petrol engine, revised suspension, and distinctive N Line styling.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "i20 N Line",
//           "manufacturer": "Hyundai",
//           "year": 2024,
//           "price": "₹ 10.20 - 12.50 Lakh (ex-showroom, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.0L Turbo GDi Petrol",
//             "displacement": "998 cc",
//             "maxPower": "118 bhp @ 6000 rpm",
//             "maxTorque": "172 Nm @ 1500-4000 rpm",
//             "cylinders": 3,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "GDi",
//             "turboCharger": true,
//             "transmissionType": "Manual / Automatic (DCT)",
//             "gearbox": "6-speed MT / 7-speed DCT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol",
//             "mileage": "20.0 - 20.25 kmpl (ARAI)",
//             "fuelTankCapacity": "37 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut (Sportier Tuning)",
//             "rearSuspension": "Coupled Torsion Beam Axle (Sportier Tuning)",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "5.2 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Disc (All-Wheel Disc Brakes)"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3995 mm",
//             "width": "1775 mm",
//             "height": "1505 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "170 mm",
//             "wheelBase": "2580 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "311 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
//               "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
//               "Wireless Phone Charger", "Electric Sunroof (top variants)", "Metal Pedals"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "All Black Interior with Red Accents", "Glove Box",
//               "Leatherette Upholstery with Red Stitching", "N Line Specific Gear Knob",
//               "Leatherette Wrapped Steering Wheel with Red Stitching", "Ambient Lighting",
//               "Chrome Inside Door Handle"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler (N Line Specific)", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Alloy Wheels (N Line Specific)", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
//               "LED High Mounted Stop Lamp", "N Line Specific Front & Rear Bumpers",
//               "Dark Chrome Front Grille", "Twin-Tip Exhaust"
//             ],
//             "tyre": {
//               "size": "195/55 R16",
//               "type": "Radial Tubeless",
//               "wheelSize": "16 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "Hill Start Assist Control (HAC)", "6 Airbags (Standard on higher trims)",
//               "ISOFIX Mounts", "Rear Parking Sensors", "Rear Camera", "TPMS",
//               "Day & Night Rear View Mirror", "Speed Sensing Auto Door Lock",
//               "Door Ajar Warning", "Seat Belt Warning", "Engine Immobilizer", "Impact Sensing Auto Door Unlock",
//               "All-Wheel Disc Brakes"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "10.25-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "Bose Premium Sound System",
//               "USB Ports", "Inbuilt Navigation", "Wireless Phone Charging", "Voice Recognition",
//               "Connected Car Tech (Bluelink)"
//             ]
//           },
//           "adasFeatures": {
//             "features": []
//           },
//           "internetFeatures": {
//             "features": [
//               "Bluelink Connected Car Technology",
//               "Remote Vehicle Control", "Live Location Tracking", "Geo-fence Alert"
//             ]
//           }
//         }
//       },
//       {
//         "id": "hyundai-venue",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/venue-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hyundai_logo.svg/1200px-Hyundai_logo.svg.png",
//         "title": "Hyundai Venue",
//         "link": "https://www.cardekho.com/hyundai/venue/specifications.htm",
//         "description": "The Hyundai Venue is a popular compact SUV known for its youthful design, feature-rich cabin, and versatile powertrain options, including a turbo-petrol engine and ADAS.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Venue",
//           "manufacturer": "Hyundai",
//           "year": 2024,
//           "price": "₹ 8.10 - 13.70 Lakh (ex-showroom, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.2L Kappa Petrol / 1.0L Turbo GDi Petrol / 1.5L CRDi Diesel",
//             "displacement": "1197 cc (1.2L Petrol) / 998 cc (1.0L Turbo Petrol) / 1493 cc (Diesel)",
//             "maxPower": "82 bhp @ 6000 rpm (1.2L Petrol) / 118 bhp @ 6000 rpm (1.0L Turbo Petrol) / 114 bhp @ 4000 rpm (Diesel)",
//             "maxTorque": "114 Nm @ 4000 rpm (1.2L Petrol) / 172 Nm @ 1500-4000 rpm (1.0L Turbo Petrol) / 250 Nm @ 1500-2750 rpm (Diesel)",
//             "cylinders": "4(1.2L, 1.5L) / 3(1.0L)",
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi / GDi / CRDi",
//             "turboCharger": true,
//             "transmissionType": "Manual / Automatic (iMT/DCT)",
//             "gearbox": "5-speed MT / 6-speed MT / 6-speed iMT / 7-speed DCT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / Diesel",
//             "mileage": "17.5 - 23.4 kmpl (ARAI, varies by engine/transmission)",
//             "fuelTankCapacity": "45 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut with Coil Spring",
//             "rearSuspension": "Coupled Torsion Beam Axle with Coil Spring",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt",
//             "turningRadius": "5.0 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3995 mm",
//             "width": "1770 mm",
//             "height": "1617 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "195 mm",
//             "wheelBase": "2500 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "350 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
//               "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
//               "Electric Sunroof", "Wireless Phone Charger", "Air Purifier", "Drive Modes"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "Leatherette Wrapped Gear Knob", "Metal Finish Inside Door Handles",
//               "Digital Instrument Cluster"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "LED Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
//               "LED High Mounted Stop Lamp", "Dark Chrome Front Grille", "Cornering Lamps"
//             ],
//             "tyre": {
//               "size": "215/60 R16",
//               "type": "Radial Tubeless",
//               "wheelSize": "16 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "VSM", "Hill Start Assist Control (HAC)", "6 Airbags (Standard)",
//               "ISOFIX Mounts", "Rear Parking Sensors", "Rear Camera", "TPMS (Highline)",
//               "Day & Night Rear View Mirror", "Speed Sensing Auto Door Lock",
//               "Door Ajar Warning", "Seat Belt Warning (All Seats)", "Engine Immobilizer", "Impact Sensing Auto Door Unlock"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "8-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Inbuilt Navigation",
//               "Wireless Phone Charging", "Voice Recognition", "Connected Car Tech (Bluelink)",
//               "Dashcam with Dual Camera (top variants)"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Forward Collision Warning (FCW)", "Forward Collision-Avoidance Assist (FCA) - Car, Pedestrian, Cycle",
//               "Lane Keeping Assist (LKA)", "Lane Departure Warning (LDW)", "High Beam Assist (HBA)",
//               "Driver Attention Warning (DAW)", "Leading Vehicle Departure Alert (LVDA)"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Bluelink Connected Features (60+ features)",
//               "Over-the-Air (OTA) Updates", "Remote Engine Start/Stop", "Remote Climate Control",
//               "Geo-Fence Alert", "Time Fence Alert", "Stolen Vehicle Tracking", "Valet Mode"
//             ]
//           }
//         }
//       },
//       {
//         "id": "hyundai-verna",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/verna-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hyundai_logo.svg/1200px-Hyundai_logo.svg.png",
//         "title": "Hyundai Verna",
//         "link": "https://www.cardekho.com/hyundai/verna/specifications.htm",
//         "description": "The Hyundai Verna is a sophisticated mid-size sedan known for its futuristic design, spacious and premium interior, powerful engine options, and standard 6 airbags with ADAS.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Verna",
//           "manufacturer": "Hyundai",
//           "year": 2024,
//           "price": "₹ 11.20 - 17.50 Lakh (ex-showroom, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.5L MPi Petrol / 1.5L Turbo GDi Petrol",
//             "displacement": "1497 cc (MPi Petrol) / 1482 cc (Turbo Petrol)",
//             "maxPower": "113.45 bhp @ 6300 rpm (MPi Petrol) / 157.8 bhp @ 5500 rpm (Turbo Petrol)",
//             "maxTorque": "144 Nm @ 4500 rpm (MPi Petrol) / 253 Nm @ 1500-3500 rpm (Turbo Petrol)",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi / GDi",
//             "turboCharger": true,
//             "transmissionType": "Manual / Automatic (IVT/DCT)",
//             "gearbox": "6-speed MT / IVT / 7-speed DCT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol",
//             "mileage": "18.6 - 20.6 kmpl (ARAI, varies by engine/transmission)",
//             "fuelTankCapacity": "45 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut with Coil Spring",
//             "rearSuspension": "Coupled Torsion Beam Axle",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "5.2 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Disc (All 4 disc brakes)"
//           },
//           "dimensionsAndCapacity": {
//             "length": "4535 mm",
//             "width": "1765 mm",
//             "height": "1475 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "170 mm",
//             "wheelBase": "2670 mm",
//             "numberOfDoors": 4,
//             "bootSpace": "528 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control (Dual-zone)", "Rear AC Vents",
//               "Cruise Control", "Front & Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front & Rear - C-Type)", "Bench Seat (Rear)",
//               "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
//               "Front Ventilated & Heated Seats", "Puddle Lamps", "Power Driver Seat",
//               "Smart Trunk Feature", "Rear Manual Curtain", "Wireless Phone Charger"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Beige & Black Interiors (Standard) / Sporty Black with Red Accents (Turbo)",
//               "Glove Box", "Leatherette Upholstery", "Leather Wrapped Steering Wheel & Gear Knob",
//               "Ambient Lighting (Dashboard & Door Trims)", "Premium Layered Dashboard Design with Soft Touch Finish",
//               "Digital Instrument Cluster"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "LED Headlamps", "Horizon LED Positioning Lamp & DRLs", "Parametric Connected LED Tail Lamps",
//               "Rear Window Defogger", "Alloy Wheels", "Power Antenna", "Shark Fin Antenna",
//               "Outside Mirror Turn Indicators", "Chrome Window Beltline", "Satin Chrome Outside Door Handles",
//               "Black Chrome Parametric Radiator Grille", "LED High Mounted Stop Lamp"
//             ],
//             "tyre": {
//               "size": "195/65 R15 (Lower Variants) / 205/55 R16 (Higher Variants)",
//               "type": "Radial Tubeless",
//               "wheelSize": "15 / 16 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "ESC", "VSM", "Hill-Start Assist Control (HAC)", "6 Airbags (Standard across all variants)",
//               "ISOFIX Child Seat Mounts", "Anti-Theft Alarm", "Rear Camera (with dynamic guidelines)", "TPMS (Highline)",
//               "Day & Night Rear View Mirror", "Pretensioners & Load Limiters",
//               "Speed Sensing Auto Door Lock", "Door Ajar Warning", "Seat Belt Reminder (All Seats)",
//               "Engine Immobilizer", "Impact Sensing Auto Door Unlock", "All 4 Disc Brakes"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "10.25-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto (Wireless)", "Apple CarPlay (Wireless)", "Bose Premium Sound System",
//               "USB Ports (C-Type)", "Inbuilt Navigation", "Wireless Phone Charging", "Voice Recognition",
//               "Connected Car Tech (Bluelink)", "Switchable Type Infotainment & Climate Controller"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Forward Collision-Avoidance Assist (FCA) - Car, Pedestrian, Cycle",
//               "Blind-spot Collision-Avoidance Assist (BCA) & Blind-spot Collision Warning (BCW)",
//               "Lane Keeping Assist (LKA)", "Lane Departure Warning (LDW)", "Driver Attention Warning (DAW)",
//               "Smart Cruise Control With Stop & Go (SCC with S&G)", "Lane Following Assist (LFA)",
//               "Leading Vehicle Departure Alert (LVDA)", "Rear Cross-Traffic Collision-Avoidance Assist (RCCA) & Rear Cross-Traffic Collision Warning (RCCW)",
//               "High Beam Assist (HBA)", "Safe Exit Warning (SEW)"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Bluelink Connected Features (65+ features)",
//               "Over-the-Air (OTA) Map Updates", "Remote Engine Start/Stop", "Remote Climate Control",
//               "Geo-Fence Alert", "Time Fence Alert", "Stolen Vehicle Tracking", "Valet Mode",
//               "Vehicle Health Status", "E-Call & I-Call"
//             ]
//           }
//         }
//       }
//     ]
//   },
//   {
//     manufacturer: "Honda",
//     idPrefix: "honda",
//     vehicles: [
//       {
//         "id": "honda-amaze",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/amaze-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honda_logo.svg/1200px-Honda_logo.svg.png",
//         "title": "Honda Amaze",
//         "link": "https://www.cardekho.com/honda/amaze/specifications.htm",
//         "description": "The Honda Amaze is a stylish and practical compact sedan, now in its new 2024 avatar, offering a comfortable ride, efficient i-VTEC engine, and essential features for urban commuting.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Amaze",
//           "manufacturer": "Honda",
//           "year": 2024,
//           "price": "₹ 9.38 - 13.13 Lakh (on-road, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.2L i-VTEC Petrol",
//             "displacement": "1199 cc",
//             "maxPower": "89.30 bhp @ 6000 rpm",
//             "maxTorque": "110 Nm @ 4800 rpm",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "SOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (CVT)",
//             "gearbox": "5-Speed MT / CVT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol",
//             "mileage": "18.6 - 19.46 kmpl (ARAI)",
//             "fuelTankCapacity": "35 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Torsion Beam",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt",
//             "turningRadius": "4.7 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3995 mm",
//             "width": "1695 mm",
//             "height": "1498 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "165 mm",
//             "wheelBase": "2470 mm",
//             "numberOfDoors": 4,
//             "bootSpace": "416 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front)", "Rear Seat Centre Arm Rest",
//               "Cooled Glovebox", "Vanity Mirror", "Trunk Light",
//               "Voice Commands", "Paddle Shifters (CVT)", "Rear Power Outlet"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "Piano Black / Silver Inserts", "Front & Rear Power Windows"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Defogger", "Alloy Wheels", "Power Antenna",
//               "Outside Mirror Turn Indicators", "Chrome Finish on Grille & Door Handles",
//               "Body Coloured Bumpers & ORVMs"
//             ],
//             "tyre": {
//               "size": "175/65 R15",
//               "type": "Radial Tubeless",
//               "wheelSize": "15 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "Brake Assist", "Dual Airbags", "ISOFIX Mounts",
//               "Rear Camera (with guidelines)", "Seat Belt Warning", "Door Ajar Warning",
//               "Engine Immobilizer", "Speed Sensing Auto Door Lock", "Impact Sensing Auto Door Unlock",
//               "Rear Parking Camera", "Rear Defogger"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "7-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Voice Recognition"
//             ]
//           },
//           "adasFeatures": {
//             "features": []
//           },
//           "internetFeatures": {
//             "features": []
//           }
//         }
//       },
//       {
//         "id": "honda-city",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/city-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honda_logo.svg/1200px-Honda_logo.svg.png",
//         "title": "Honda City",
//         "link": "https://www.cardekho.com/honda/city/specifications.htm",
//         "description": "The Honda City is a sophisticated sedan known for its spacious and premium cabin, refined i-VTEC engine, impressive safety features including 6 airbags, and advanced Honda SENSING ADAS technology.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "City",
//           "manufacturer": "Honda",
//           "year": 2024,
//           "price": "₹ 14.44 - 19.73 Lakh (on-road, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.5L i-VTEC DOHC Petrol",
//             "displacement": "1498 cc",
//             "maxPower": "119.34 bhp @ 6600 rpm",
//             "maxTorque": "145 Nm @ 4300 rpm",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (CVT)",
//             "gearbox": "6-Speed MT / CVT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol",
//             "mileage": "17.8 - 18.4 kmpl (ARAI)",
//             "fuelTankCapacity": "40 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut with Coil Spring",
//             "rearSuspension": "Torsion Beam with Coil Spring",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "5.3 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "4574 mm",
//             "width": "1748 mm",
//             "height": "1489 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "165 mm",
//             "wheelBase": "2600 mm",
//             "numberOfDoors": 4,
//             "bootSpace": "506 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front & Rear)", "Rear Seat Centre Arm Rest",
//               "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
//               "One-Touch Electric Sunroof", "Paddle Shifters (CVT)", "Rear Sunshade"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Beige & Black Dashboard", "Glove Box",
//               "Leatherette Upholstery", "Ambient Lighting", "Soft-Touch Dashboard with Stitching"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "LED Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Defogger", "Alloy Wheels", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Chrome Grille",
//               "Body Coloured Door Handles", "Chrome Window Line Garnish"
//             ],
//             "tyre": {
//               "size": "185/55 R16",
//               "type": "Radial Tubeless",
//               "wheelSize": "16 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "Brake Assist", "ESC", "Hill Start Assist", "6 Airbags", "ISOFIX Mounts",
//               "Rear Parking Sensors", "Rear Camera (Multi-angle)", "TPMS",
//               "Day & Night Rear View Mirror", "Speed Sensing Auto Door Lock",
//               "Door Ajar Warning", "Seat Belt Warning", "Engine Immobilizer", "Impact Sensing Auto Door Unlock",
//               "Lane Watch Camera (Right ORVM)"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "8-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto", "Apple CarPlay", "8 Speakers", "USB Ports", "Voice Recognition",
//               "Weblink (Connected Car Technology)"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Collision Mitigation Braking System (CMBS)", "Road Departure Mitigation System (RDM)",
//               "Lane Keeping Assist System (LKAS)", "Adaptive Cruise Control (ACC)",
//               "Auto High-Beam (AHB)", "Lead Car Departure Notification System (LCDN)"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Honda Connect (Connected Car Technology)", "Remote Functions", "Live Car Location",
//               "Geo-Fence Alert", "Stolen Vehicle Tracking", "Emergency Call (e-Call)"
//             ]
//           }
//         }
//       },
//       {
//         "id": "honda-elevate",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/elevate-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honda_logo.svg/1200px-Honda_logo.svg.png",
//         "title": "Honda Elevate",
//         "link": "https://www.cardekho.com/honda/elevate/specifications.htm",
//         "description": "The Honda Elevate is Honda's entry into the popular SUV segment, combining robust styling, a reliable 1.5L i-VTEC engine, spacious interiors, and comprehensive safety features including 6 airbags and Honda SENSING ADAS.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Elevate",
//           "manufacturer": "Honda",
//           "year": 2024,
//           "price": "₹ 14.04 - 20.04 Lakh (on-road, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.5L i-VTEC DOHC Petrol",
//             "displacement": "1498 cc",
//             "maxPower": "119.35 bhp @ 6600 rpm",
//             "maxTorque": "145 Nm @ 4300 rpm",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (CVT)",
//             "gearbox": "6-Speed MT / CVT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol",
//             "mileage": "15.31 - 16.92 kmpl (ARAI)",
//             "fuelTankCapacity": "40 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Torsion Beam Axle",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "5.2 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "4312 mm",
//             "width": "1790 mm",
//             "height": "1650 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "220 mm",
//             "wheelBase": "2650 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "458 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front & Rear)", "60:40 Split Rear Seat",
//               "Cooled Glovebox", "Vanity Mirror", "Rear Reading Lamp", "Trunk Light",
//               "Map Lamps", "Voice Commands", "Idle Start-Stop System", "Automatic Headlamps",
//               "Follow Me Home Headlamps", "Central Console Armrest (With Storage)",
//               "One-Touch Electric Sunroof", "Wireless Phone Charger", "LaneWatch Camera"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Leatherette Upholstery", "Soft-Touch Dashboard", "Chrome Inside Door Handles",
//               "Digital Instrument Cluster"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "LED Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
//               "LED High Mounted Stop Lamp", "Bold Front Grille", "Body Cladding"
//             ],
//             "tyre": {
//               "size": "215/55 R17",
//               "type": "Radial Tubeless",
//               "wheelSize": "17 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "Brake Assist", "ESC", "Hill Start Assist", "6 Airbags", "ISOFIX Mounts",
//               "Rear Parking Sensors", "Rear Camera (Multi-angle)", "TPMS",
//               "Day & Night Rear View Mirror", "Speed Sensing Auto Door Lock",
//               "Door Ajar Warning", "Seat Belt Warning", "Engine Immobilizer", "Impact Sensing Auto Door Unlock"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "10.25-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto", "Apple CarPlay", "4 Speakers + 2 Tweeters", "USB Ports", "Voice Recognition",
//               "Honda Connect"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Collision Mitigation Braking System (CMBS)", "Road Departure Mitigation System (RDM)",
//               "Lane Keeping Assist System (LKAS)", "Adaptive Cruise Control (ACC)",
//               "Auto High-Beam (AHB)", "Lead Car Departure Notification System (LCDN)"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Honda Connect (Connected Car Technology)", "Remote Engine Start/Stop", "Live Location Tracking",
//               "Geo-Fence Alert", "Stolen Vehicle Tracking", "Emergency Call (e-Call)"
//             ]
//           }
//         }
//       },
//       {
//         "id": "honda-wr-v",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/wr-v-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honda_logo.svg/1200px-Honda_logo.svg.png",
//         "title": "Honda WR-V",
//         "link": "https://www.cardekho.com/honda/wr-v/specifications.htm",
//         "description": "The Honda WR-V was a compact SUV/crossover known for its practical cabin, spacious boot, and efficient petrol and diesel engine options. (Note: Discontinued in India as of 2023)",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "WR-V",
//           "manufacturer": "Honda",
//           "year": 2023,
//           "price": "₹ 8.16 - 10.56 Lakh (ex-showroom, last recorded)",
//           "engineAndTransmission": {
//             "engineType": "1.2L i-VTEC Petrol / 1.5L i-DTEC Diesel",
//             "displacement": "1199 cc (Petrol) / 1498 cc (Diesel)",
//             "maxPower": "89 bhp @ 6000 rpm (Petrol) / 99 bhp @ 3600 rpm (Diesel)",
//             "maxTorque": "110 Nm @ 4800 rpm (Petrol) / 200 Nm @ 1750 rpm (Diesel)",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "SOHC (Petrol) / DOHC (Diesel)",
//             "fuelSupplySystem": "MPi (Petrol) / CRDi (Diesel)",
//             "turboCharger": false,
//             "transmissionType": "Manual",
//             "gearbox": "5-Speed MT (Petrol) / 6-Speed MT (Diesel)",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / Diesel",
//             "mileage": "16.5 - 23.7 kmpl (ARAI)",
//             "fuelTankCapacity": "40 Litres",
//             "emissionNorm": "BS VI"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Twist Beam Axle",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt",
//             "turningRadius": "5.3 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3999 mm",
//             "width": "1734 mm",
//             "height": "1601 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "188 mm",
//             "wheelBase": "2555 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "363 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front)", "Rear Seat Centre Arm Rest",
//               "Cooled Glovebox", "Vanity Mirror", "Trunk Light",
//               "Voice Commands", "One-Touch Electric Sunroof", "Rear Power Outlet"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "Chrome Inside Door Handles"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Roof Rails",
//               "Chrome Grille", "Body Cladding"
//             ],
//             "tyre": {
//               "size": "195/60 R16",
//               "type": "Radial Tubeless",
//               "wheelSize": "16 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "Dual Airbags", "Rear Parking Sensors", "Rear Camera",
//               "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
//               "Speed Sensing Auto Door Lock", "Impact Sensing Auto Door Unlock"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "7-inch Touchscreen Infotainment System (Digipad 2.0)", "Radio", "Bluetooth Connectivity",
//               "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Voice Recognition",
//               "HDMI Port"
//             ]
//           },
//           "adasFeatures": {
//             "features": []
//           },
//           "internetFeatures": {
//             "features": []
//           }
//         }
//       },
//       {
//         "id": "honda-jazz",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/jazz-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honda_logo.svg/1200px-Honda_logo.svg.png",
//         "title": "Honda Jazz",
//         "link": "https://www.cardekho.com/honda/jazz/specifications.htm",
//         "description": "The Honda Jazz was a versatile premium hatchback, highly praised for its spacious and flexible 'Magic Seats' interior, comfortable ride, and reliable engine. (Note: Discontinued in India as of 2023)",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Jazz",
//           "manufacturer": "Honda",
//           "year": 2023,
//           "price": "₹ 8.01 - 10.32 Lakh (ex-showroom, last recorded)",
//           "engineAndTransmission": {
//             "engineType": "1.2L i-VTEC Petrol",
//             "displacement": "1199 cc",
//             "maxPower": "89 bhp @ 6000 rpm",
//             "maxTorque": "110 Nm @ 4800 rpm",
//             "cylinders": 4,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "SOHC",
//             "fuelSupplySystem": "MPi",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (CVT)",
//             "gearbox": "5-Speed MT / CVT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol",
//             "mileage": "17.1 kmpl (ARAI)",
//             "fuelTankCapacity": "40 Litres",
//             "emissionNorm": "BS VI"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Torsion Beam Axle",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt",
//             "turningRadius": "5.1 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3989 mm",
//             "width": "1694 mm",
//             "height": "1544 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "165 mm",
//             "wheelBase": "2530 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "354 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Steering",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "USB Charger (Front)", "Rear Seat Centre Arm Rest",
//               "Cooled Glovebox", "Vanity Mirror", "Trunk Light",
//               "Voice Commands", "Magic Seats (Versatile Seating)", "Paddle Shifters (CVT)"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "Chrome Finish on Interior Elements"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Rear Spoiler", "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Rear Window Wiper/Washer/Defogger", "Alloy Wheels", "Power Antenna",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Chrome Grille",
//               "Body Coloured Bumpers & ORVMs"
//             ],
//             "tyre": {
//               "size": "175/65 R15",
//               "type": "Radial Tubeless",
//               "wheelSize": "15 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS", "EBD", "Dual Airbags", "Rear Parking Sensors", "Rear Camera",
//               "Seat Belt Warning", "Door Ajar Warning", "Engine Immobilizer",
//               "Speed Sensing Auto Door Lock", "Impact Sensing Auto Door Unlock"
//             ]
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "7-inch Touchscreen Infotainment System (Digipad 2.0)", "Radio", "Bluetooth Connectivity",
//               "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Voice Recognition",
//               "HDMI Port"
//             ]
//           },
//           "adasFeatures": {
//             "features": []
//           },
//           "internetFeatures": {
//             "features": []
//           }
//         }
//       }
//     ]
//   },
//   {
//     manufacturer: 'Renault',
//     idPrefix: 'renault',
//     vehicles: [
//       {
//         "id": "renault-kwid",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/kwid-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Renault_logo.svg/1200px-Renault_logo.svg.png",
//         "title": "Renault Kwid",
//         "link": "https://www.cardekho.com/renault/kwid/specifications.htm",
//         "description": "The Renault Kwid is an entry-level hatchback known for its SUV-inspired design, competitive pricing, and a choice of manual and AMT transmissions.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Kwid",
//           "manufacturer": "Renault",
//           "year": 2024,
//           "price": "₹ 5.53 - 7.65 Lakh (on-road, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.0L SCe Petrol / 1.0L SCe CNG",
//             "displacement": "999 cc",
//             "maxPower": "67 bhp @ 5500 rpm (Petrol) / 56 bhp @ 5000 rpm (CNG)",
//             "maxTorque": "91 Nm @ 4250 rpm (Petrol) / 78 Nm @ 4250 rpm (CNG)",
//             "cylinders": 3,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "Multi-Point Fuel Injection",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (AMT)",
//             "gearbox": "5-Speed MT / 5-Speed AMT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / CNG",
//             "mileage": "21.7 - 22 kmpl (Petrol, ARAI) / ~22 km/kg (CNG, ARAI)",
//             "fuelTankCapacity": "28 Litres (Petrol)",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut with Lower Transverse Link",
//             "rearSuspension": "Twist Beam Suspension with Coil Spring",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt",
//             "turningRadius": "4.9 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3731 mm",
//             "width": "1579 mm",
//             "height": "1490 mm (without roof rails) / 1513 mm (with roof rails)",
//             "seatingCapacity": 5,
//             "groundClearance": "184 mm",
//             "wheelBase": "2422 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "279 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Headrests (Front & Rear)",
//               "Rear Parking Sensors", "Keyless Entry", "Rear Power Outlet",
//               "Digital Instrument Cluster", "Front & Rear Power Windows", "Rear Parcel Shelf"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "Chrome / Silver Accents"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Integrated LED DRLs", "LED Taillights (select variants)", "Rear Window Defogger",
//               "Steel Wheels with Wheel Covers / Alloy Wheels (Climber)", "Roof Rails",
//               "Body Coloured Bumpers", "Wheel Arch Cladding"
//             ],
//             "tyre": {
//               "size": "165/70 R14",
//               "type": "Radial Tubeless",
//               "wheelSize": "14 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS with EBD", "Dual Front Airbags", "Reverse Parking Camera (with guidelines, higher variants)",
//               "Seat Belt Reminder (Driver & Co-driver)", "High-Speed Alert System",
//               "Child Safety Locks", "Engine Immobilizer", "Electronic Stability Program (ESP - from 2023 models)",
//               "Hill Start Assist (HSA - from 2023 models)", "Traction Control System (TCS - from 2023 models)",
//               "Tyre Pressure Monitoring System (TPMS - from 2023 models)"
//             ],
//             "ncapRating": {
//               "adultOccupant": "1-star (Global NCAP)",
//               "childOccupant": "1-star (Global NCAP)"
//             }
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "8-inch Touchscreen MediaNAV Evolution Infotainment System", "Radio", "Bluetooth Connectivity",
//               "USB Port", "AUX-in", "Android Auto", "Apple CarPlay", "4 Speakers"
//             ]
//           },
//           "adasFeatures": {
//             "features": []
//           },
//           "internetFeatures": {
//             "features": []
//           }
//         }
//       },
//       {
//         "id": "renault-kiger",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/kiger-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Renault_logo.svg/1200px-Renault_logo.svg.png",
//         "title": "Renault Kiger",
//         "link": "https://www.cardekho.com/renault/kiger/specifications.htm",
//         "description": "The Renault Kiger is a stylish and feature-rich compact SUV, offering a choice of naturally aspirated and turbo-petrol engines with various transmission options, along with a decent safety package.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Kiger",
//           "manufacturer": "Renault",
//           "year": 2024,
//           "price": "₹ 7.19 - 13.26 Lakh (on-road, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.0L Energy Petrol / 1.0L Turbo Petrol / 1.0L Energy CNG",
//             "displacement": "999 cc",
//             "maxPower": "71 bhp @ 6250 rpm (Energy) / 99 bhp @ 5000 rpm (Turbo) / 71 bhp @ 6250 rpm (CNG)",
//             "maxTorque": "96 Nm @ 3500 rpm (Energy) / 160 Nm @ 2800-3600 rpm (Turbo MT) / 152 Nm @ 2200-4400 rpm (Turbo CVT) / 96 Nm @ 3500 rpm (CNG)",
//             "cylinders": 3,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "Multi-Point Fuel Injection",
//             "turboCharger": true,
//             "transmissionType": "Manual / Automatic (AMT) / Automatic (CVT)",
//             "gearbox": "5-Speed MT / 5-Speed AMT / CVT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / CNG",
//             "mileage": "17.63 - 21.08 kmpl (Petrol, ARAI) / ~19.28 km/kg (CNG, User Reported)",
//             "fuelTankCapacity": "40 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut with Lower Transverse Link",
//             "rearSuspension": "Twist Beam Suspension with Coil Spring",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt",
//             "turningRadius": "5.0 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3991 mm",
//             "width": "1750 mm",
//             "height": "1605 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "205 mm",
//             "wheelBase": "2500 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "405 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Headrests (Front & Rear)",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Rear Parking Sensors", "Engine Start/Stop Button",
//               "Keyless Entry", "Wireless Phone Charger", "Rear Wiper & Washer",
//               "Rear Defogger", "60:40 Split Rear Seat", "Cooled Glovebox",
//               "Puddle Lamps", "Power Foldable ORVMs", "Drive Modes (Sport, Normal, Eco - Turbo)"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric / Leatherette Upholstery", "7-inch Digital Instrument Cluster",
//               "Ambient Lighting", "Chrome Inside Door Handles"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Split LED Headlamp Design", "LED DRLs", "LED Taillights",
//               "Alloy Wheels", "Roof Rails", "Shark Fin Antenna",
//               "Outside Mirror Turn Indicators", "Chrome Front Grille", "Body Cladding",
//               "Dual Tone Exterior Option"
//             ],
//             "tyre": {
//               "size": "195/60 R16",
//               "type": "Radial Tubeless",
//               "wheelSize": "16 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS with EBD", "Brake Assist", "4 Airbags (Dual Front, Dual Side)",
//               "Electronic Stability Program (ESP)", "Hill Start Assist (HSA)",
//               "Traction Control System (TCS)", "Rear Parking Camera (with guidelines)",
//               "Tyre Pressure Monitoring System (TPMS)", "Seat Belt Reminder",
//               "High-Speed Alert System", "Child Safety Locks", "Engine Immobilizer"
//             ],
//             "ncapRating": {
//               "adultOccupant": "4-star (Global NCAP)",
//               "childOccupant": "2-star (Global NCAP)"
//             }
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "8-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Wireless Android Auto", "Wireless Apple CarPlay", "Arkamys 3D Sound System (6 Speakers)",
//               "USB Ports", "Voice Recognition"
//             ]
//           },
//           "adasFeatures": {
//             "features": []
//           },
//           "internetFeatures": {
//             "features": [
//               "Connected Car Technology (limited features)"
//             ]
//           }
//         }
//       },
//       {
//         "id": "renault-triber",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/triber-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Renault_logo.svg/1200px-Renault_logo.svg.png",
//         "title": "Renault Triber",
//         "link": "https://www.cardekho.com/renault/triber/specifications.htm",
//         "description": "The Renault Triber is a highly versatile 7-seater MUV, offering a unique modular seating arrangement, spacious interiors, and a practical design, making it ideal for large families.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Triber",
//           "manufacturer": "Renault",
//           "year": 2024,
//           "price": "₹ 7.19 - 10.45 Lakh (on-road, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.0L Energy Petrol / 1.0L Energy CNG",
//             "displacement": "999 cc",
//             "maxPower": "71 bhp @ 6250 rpm (Petrol) / 71 bhp @ 6250 rpm (CNG)",
//             "maxTorque": "96 Nm @ 3500 rpm (Petrol) / 96 Nm @ 3500 rpm (CNG)",
//             "cylinders": 3,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "Multi-Point Fuel Injection",
//             "turboCharger": false,
//             "transmissionType": "Manual / Automatic (AMT)",
//             "gearbox": "5-Speed MT / 5-Speed AMT",
//             "driveType": "FWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / CNG",
//             "mileage": "18.2 - 19 kmpl (Petrol, ARAI) / ~18.12 km/kg (CNG, User Reported)",
//             "fuelTankCapacity": "40 Litres (Petrol)",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut with Lower Transverse Link",
//             "rearSuspension": "Torsion Beam Axle",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt",
//             "turningRadius": "5.2 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Drum"
//           },
//           "dimensionsAndCapacity": {
//             "length": "3990 mm",
//             "width": "1739 mm",
//             "height": "1643 mm",
//             "seatingCapacity": 7,
//             "groundClearance": "182 mm",
//             "wheelBase": "2755 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "84 Litres (7-seater) / 625 Litres (5-seater)"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Headrests (All Rows)",
//               "Height Adjustable Driver Seat", "Automatic Climate Control", "Rear AC Vents (2nd & 3rd Row)",
//               "Rear Parking Sensors", "Engine Start/Stop Button", "Keyless Entry",
//               "USB Charger (Front & Rear)", "60:40 Split 2nd Row Seat", "50:50 Split 3rd Row Seat (removable)",
//               "Cooled Storage in Centre Console", "Power Windows (Front & Rear)",
//               "Rear Wiper & Washer", "Rear Defogger"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric Upholstery", "Digital Instrument Cluster (semi-digital)", "Chrome Inside Door Handles"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "Projector Headlamps", "LED DRLs", "LED Taillights",
//               "Steel Wheels with Wheel Covers / Alloy Wheels", "Roof Rails (with 50kg load capacity)",
//               "Shark Fin Antenna", "Outside Mirror Turn Indicators", "Chrome Front Grille",
//               "SUV Skid Plates (Front & Rear)", "Body Coloured Bumpers", "Dual Tone Exterior Option"
//             ],
//             "tyre": {
//               "size": "185/65 R15",
//               "type": "Radial Tubeless",
//               "wheelSize": "15 Inch"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS with EBD", "Dual Front Airbags", "Side Airbags (Front - select variants)",
//               "Rear Parking Sensors", "Rear Camera (with guidelines)", "Electronic Stability Program (ESP - from 2023 models)",
//               "Hill Start Assist (HSA - from 2023 models)", "Traction Control System (TCS - from 2023 models)",
//               "Tyre Pressure Monitoring System (TPMS - from 2023 models)", "Seat Belt Reminder",
//               "High-Speed Alert System", "Child Safety Locks", "Engine Immobilizer"
//             ],
//             "ncapRating": {
//               "adultOccupant": "4-star (Global NCAP)",
//               "childOccupant": "3-star (Global NCAP)"
//             }
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "8-inch Touchscreen MediaNAV Evolution Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Android Auto", "Apple CarPlay", "4 Speakers", "USB Ports", "Voice Recognition"
//             ]
//           },
//           "adasFeatures": {
//             "features": []
//           },
//           "internetFeatures": {
//             "features": []
//           }
//         }
//       },
//       {
//         "id": "renault-duster-new-gen",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/duster-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Renault_logo.svg/1200px-Renault_logo.svg.png",
//         "title": "Renault Duster (New Generation)",
//         "link": "https://www.cardekho.com/renault/duster-2025/specifications.htm",
//         "description": "The highly anticipated third-generation Renault Duster is set to make its comeback in India, promising a modern design, advanced features, and a range of efficient powertrain options, including hybrids.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "Duster",
//           "manufacturer": "Renault",
//           "year": 2025,
//           "price": "₹ 11.7 - 17.5 Lakh (expected on-road, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "1.2L Turbo Petrol Mild-Hybrid / 1.6L Strong Hybrid Petrol",
//             "displacement": "1199 cc (Turbo Petrol) / 1598 cc (Strong Hybrid)",
//             "maxPower": "130 PS (Turbo Petrol) / 140 PS (Strong Hybrid) (expected)",
//             "maxTorque": "N/A",
//             "cylinders": 3,
//             "valvesPerCylinder": 4,
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "Direct Injection (Turbo Petrol)",
//             "turboCharger": true,
//             "transmissionType": "Manual / Automatic (CVT)",
//             "gearbox": "6-Speed MT / CVT (expected)",
//             "driveType": "FWD / AWD (expected for some variants)"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / Petrol-Hybrid",
//             "mileage": "N/A (expected to be competitive)",
//             "fuelTankCapacity": "50 Litres (expected)",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Torsion Beam (FWD) / Multi-link (AWD)",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic (expected)",
//             "turningRadius": "N/A",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Disc"
//           },
//           "dimensionsAndCapacity": {
//             "length": "4343 mm",
//             "width": "1813 mm",
//             "height": "1656 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "209 mm",
//             "wheelBase": "2657 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "472 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Air Conditioner", "Heater", "Adjustable Headrests (Front & Rear)",
//               "Height Adjustable Driver & Front Passenger Seat", "Automatic Climate Control", "Rear AC Vents",
//               "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera",
//               "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
//               "Rear Wiper & Washer", "Rear Defogger", "Powered ORVMs (Foldable)",
//               "Panoramic Sunroof (expected for top variants)"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Tachometer", "Digital Odometer", "Dual Tone Dashboard", "Glove Box",
//               "Fabric / Leatherette Upholstery", "7-inch Digital Instrument Cluster",
//               "Ambient Lighting", "Premium Interior Finishes"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
//               "Roof Rails", "Shark Fin Antenna", "Outside Mirror Turn Indicators",
//               "Robust SUV Styling", "Body Cladding", "Integrated Spoiler"
//             ],
//             "tyre": {
//               "size": "N/A (expected 17/18-inch alloys)",
//               "type": "Radial Tubeless",
//               "wheelSize": "N/A"
//             },
//             "bootOpening": "Manual"
//           },
//           "safety": {
//             "features": [
//               "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Program (ESP)",
//               "Hill Start Assist (HSA)", "Hill Descent Control (HDC - AWD variants)",
//               "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
//               "Seat Belt Reminder", "High-Speed Alert System", "Child Safety Locks",
//               "Engine Immobilizer"
//             ],
//             "ncapRating": {
//               "adultOccupant": "Expected 5-star (Euro NCAP/Global NCAP based on Dacia Duster)",
//               "childOccupant": "Expected 5-star (Euro NCAP/Global NCAP based on Dacia Duster)"
//             }
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "10.1-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Wireless Android Auto", "Wireless Apple CarPlay", "6-speaker Arkamys 3D Sound System",
//               "USB-C Ports", "Voice Recognition"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Automatic Emergency Braking (AEB)", "Traffic Sign Recognition", "Lane Keep Assist",
//               "Blind Spot Monitoring", "Adaptive Cruise Control", "Rear Cross Traffic Alert",
//               "Driver Attention Alert"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Connected Car Technology", "Remote Vehicle Control", "Live Location Tracking",
//               "Geo-Fencing", "Over-the-Air (OTA) Updates"
//             ]
//           }
//         }
//       }
//     ]
//   },
//   {
//     manufacturer: 'BMW',
//     idPrefix: 'bmw',
//     vehicles: [
//       {
//         "id": "bmw-x7-2025",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/duster-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW_X7_M60i_%28G07_Facelift%29_IMG_6047.jpg/1280px-BMW_X7_M60i_%28G07_Facelift%29_IMG_6047.jpg",
//         "title": "BMW X7 (2025 Model)",
//         "link": "https://www.carwale.com/bmw-cars/x7/price-in-nagpur/",
//         "description": "The BMW X7 is a luxurious full-size SUV offering a blend of performance, comfort, and advanced technology. The 2025 model continues this tradition with refined powertrains and cutting-edge features.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "X7",
//           "manufacturer": "BMW",
//           "year": 2025,
//           "price": "₹ 1.56 - 1.63 Crore (on-road, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "3.0L 6-cyl Petrol Mild-Hybrid / 3.0L 6-cyl Diesel Mild-Hybrid",
//             "displacement": "2998 cc (Petrol) / 2993 cc (Diesel)",
//             "maxPower": "375 bhp (Petrol) / 347 bhp (Diesel)",
//             "maxTorque": "520 Nm (Petrol) / 700 Nm (Diesel)",
//             "cylinders": 6,
//             "valvesPerCylinder": "N/A",
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "Direct Injection",
//             "turboCharger": true,
//             "transmissionType": "Automatic (Torque Converter)",
//             "gearbox": "8-Speed Steptronic",
//             "driveType": "xDrive (All-Wheel Drive)"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol-Hybrid / Diesel-Hybrid",
//             "mileage": "11.29 kmpl (Petrol) / 14.31 kmpl (Diesel) (ARAI)",
//             "fuelTankCapacity": "N/A",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "Adaptive 2-axle Air Suspension",
//             "rearSuspension": "Adaptive 2-axle Air Suspension",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "N/A",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Disc"
//           },
//           "dimensionsAndCapacity": {
//             "length": "5181 mm",
//             "width": "2000 mm",
//             "height": "1835 mm",
//             "seatingCapacity": 6,
//             "groundClearance": "N/A",
//             "wheelBase": "3105 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "300 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Automatic Climate Control (multi-zone)", "Rear AC Vents",
//               "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera",
//               "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
//               "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
//               "Panoramic Sunroof (Sky Lounge)", "Heated & Ventilated Front Seats", "Power Seats with Memory"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Curved Display (14.9-inch infotainment, 12.3-inch instrument cluster)",
//               "Digital Instrument Cluster", "Leather Upholstery", "Ambient Lighting",
//               "Harman Kardon Surround Sound System", "Head-Up Display (optional)"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
//               "Roof Rails", "Shark Fin Antenna", "Chrome Accents", "Illuminated Kidney Grille"
//             ],
//             "tyre": {
//               "size": "N/A",
//               "type": "Radial Tubeless",
//               "wheelSize": "N/A"
//             },
//             "bootOpening": "Power Tailgate"
//           },
//           "safety": {
//             "features": [
//               "ABS with EBD", "Brake Assist", "8 Airbags", "Electronic Stability Program (ESP)",
//               "Hill Start Assist (HSA)", "Tyre Pressure Monitoring System (TPMS)",
//               "ISOFIX Child Seat Mounts", "Seat Belt Reminder", "High-Speed Alert System",
//               "Child Safety Locks", "Engine Immobilizer"
//             ],
//             "ncapRating": {
//               "adultOccupant": "N/A",
//               "childOccupant": "N/A"
//             }
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "14.9-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Surround Sound System",
//               "USB Ports", "Voice Recognition", "Gesture Control (optional)"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Automatic Emergency Braking (AEB)", "Traffic Sign Recognition", "Lane Keep Assist",
//               "Blind Spot Monitoring", "Adaptive Cruise Control", "Rear Cross Traffic Alert",
//               "Driver Attention Alert"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Connected Car Technology", "Remote Vehicle Control", "Live Location Tracking",
//               "Geo-Fencing", "Over-the-Air (OTA) Updates"
//             ]
//           }
//         }
//       },
//       {
//         "id": "bmw-x3-2025",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/duster-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/2022_BMW_X3_xDrive30e_G01_facelift_front.jpg/1280px-2022_BMW_X3_xDrive30e_G01_facelift_front.jpg",
//         "title": "BMW X3 (2025 Model)",
//         "link": "https://www.carwale.com/bmw-cars/x3/price-in-nagpur/",
//         "description": "The BMW X3 is a compact luxury SUV known for its dynamic handling and premium interior. The 2025 model launched at Bharat Mobility Global Expo 2025, features updated styling and enhanced technology.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "X3",
//           "manufacturer": "BMW",
//           "year": 2025,
//           "price": "₹ 90.04 - 93.99 Lakh (on-road, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "2.0L 4-cyl Petrol / 2.0L 4-cyl Diesel",
//             "displacement": "1998 cc (Petrol) / 1995 cc (Diesel)",
//             "maxPower": "188 bhp (Petrol) / 194 bhp (Diesel)",
//             "maxTorque": "310 Nm (Petrol) / 400 Nm (Diesel)",
//             "cylinders": 4,
//             "valvesPerCylinder": "N/A",
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "Direct Injection",
//             "turboCharger": true,
//             "transmissionType": "Automatic (Torque Converter)",
//             "gearbox": "8-Speed Steptronic",
//             "driveType": "xDrive (All-Wheel Drive)"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / Diesel",
//             "mileage": "13.38 kmpl (Petrol) / 17.86 kmpl (Diesel) (ARAI)",
//             "fuelTankCapacity": "68 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Multi-link",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "6.0 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Disc"
//           },
//           "dimensionsAndCapacity": {
//             "length": "4755 mm",
//             "width": "1920 mm",
//             "height": "1660 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "N/A",
//             "wheelBase": "2865 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "570 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Automatic Climate Control (3-zone)", "Rear AC Vents",
//               "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera (optional)",
//               "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
//               "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
//               "Panoramic Glass Roof", "Power Seats with Memory"
//             ]
//           },
//           "interior": {
//             "features": [
//               "12.3-inch Touchscreen Infotainment System", "Digital Instrument Cluster",
//               "Leather Upholstery", "Ambient Lighting", "Harman Kardon Sound System (variant dependent)"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
//               "Roof Rails", "Shark Fin Antenna", "Sporty Exterior Styling"
//             ],
//             "tyre": {
//               "size": "N/A",
//               "type": "Radial Tubeless",
//               "wheelSize": "N/A"
//             },
//             "bootOpening": "Power Tailgate"
//           },
//           "safety": {
//             "features": [
//               "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Program (ESP)",
//               "Hill Start Assist (HSA)", "Tyre Pressure Monitoring System (TPMS)",
//               "ISOFIX Child Seat Mounts", "Seat Belt Reminder", "High-Speed Alert System",
//               "Child Safety Locks", "Engine Immobilizer"
//             ],
//             "ncapRating": {
//               "adultOccupant": "N/A",
//               "childOccupant": "N/A"
//             }
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "12.3-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Sound System",
//               "USB Ports", "Voice Recognition"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Level 2 ADAS (Traffic Jam Assist, Lane Departure Warning, etc. - variant dependent)"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Connected Car Technology", "Remote Services"
//             ]
//           }
//         }
//       },
//       {
//         "id": "bmw-x5-2025",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/duster-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/BMW_X5_xDrive45e_G05_IMG_0099.jpg/1280px-BMW_X5_xDrive45e_G05_IMG_0099.jpg",
//         "title": "BMW X5 (2025 Model)",
//         "link": "https://www.carwale.com/bmw-cars/x5/price-in-nagpur/",
//         "description": "The BMW X5 is a mid-size luxury SUV that combines robust performance with sophisticated design and comfort. The 2025 model is a continuation of its successful lineage with updated features.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "X5",
//           "manufacturer": "BMW",
//           "year": 2025,
//           "price": "₹ 1.16 - 1.36 Crore (on-road, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "3.0L 6-cyl Turbo Petrol Mild-Hybrid / 3.0L 6-cyl Turbo Diesel Mild-Hybrid",
//             "displacement": "2998 cc (Petrol) / 2993 cc (Diesel)",
//             "maxPower": "375 bhp (Petrol) / 282 bhp (Diesel)",
//             "maxTorque": "520 Nm (Petrol) / 650 Nm (Diesel)",
//             "cylinders": 6,
//             "valvesPerCylinder": "N/A",
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "Direct Injection",
//             "turboCharger": true,
//             "transmissionType": "Automatic (Torque Converter)",
//             "gearbox": "8-Speed Steptronic",
//             "driveType": "xDrive (All-Wheel Drive)"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol-Hybrid / Diesel-Hybrid",
//             "mileage": "12 kmpl (Petrol) / 12 kmpl (Diesel) (ARAI)",
//             "fuelTankCapacity": "N/A",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "Adaptive Suspension",
//             "rearSuspension": "Adaptive Suspension",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "6.3 m",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Disc"
//           },
//           "dimensionsAndCapacity": {
//             "length": "4922 mm",
//             "width": "2004 mm",
//             "height": "1745 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "N/A",
//             "wheelBase": "2975 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "645 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Automatic Climate Control (4-zone)", "Rear AC Vents",
//               "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera",
//               "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
//               "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
//               "Panoramic Sunroof", "Ventilated & Heated Front Seats", "Power Seats with Memory",
//               "Digital Key"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Curved Display (14.9-inch infotainment, 12.3-inch instrument cluster)",
//               "Digital Instrument Cluster", "Leather Upholstery", "Ambient Lighting",
//               "Harman Kardon Surround Sound System"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
//               "Roof Rails", "Shark Fin Antenna", "Sporty/Elegant Exterior Styling"
//             ],
//             "tyre": {
//               "size": "N/A",
//               "type": "Radial Tubeless",
//               "wheelSize": "N/A"
//             },
//             "bootOpening": "Power Tailgate"
//           },
//           "safety": {
//             "features": [
//               "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Program (ESP)",
//               "Hill Start Assist (HSA)", "Tyre Pressure Monitoring System (TPMS)",
//               "ISOFIX Child Seat Mounts", "Seat Belt Reminder", "High-Speed Alert System",
//               "Child Safety Locks", "Engine Immobilizer"
//             ],
//             "ncapRating": {
//               "adultOccupant": "N/A",
//               "childOccupant": "N/A"
//             }
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "14.9-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Surround Sound System",
//               "USB Ports", "Voice Recognition", "Gesture Control"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Automatic Emergency Braking (AEB)", "Traffic Sign Recognition", "Lane Keep Assist",
//               "Blind Spot Monitoring", "Adaptive Cruise Control", "Rear Cross Traffic Alert",
//               "Driver Attention Alert"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Connected Car Technology", "Remote Vehicle Control", "Live Location Tracking",
//               "Geo-Fencing", "Over-the-Air (OTA) Updates"
//             ]
//           }
//         }
//       },
//       {
//         "id": "bmw-3-series-2025",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/duster-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/BMW_330i_G20_%282020%29.jpg/1280px-BMW_330i_G20_%282020%29.jpg",
//         "title": "BMW 3 Series (2025 Model)",
//         "link": "https://www.carwale.com/bmw-cars/3-series-lwb/price-in-nagpur/",
//         "description": "The BMW 3 Series is a popular luxury sports sedan, offering agile handling and a dynamic driving experience. The 2025 Gran Limousine version emphasizes rear-seat comfort, while the M340i offers exhilarating performance.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "3 Series",
//           "manufacturer": "BMW",
//           "year": 2025,
//           "price": "₹ 72.67 - 78.59 Lakh (on-road, Nagpur, for Gran Limousine); M340i higher",
//           "engineAndTransmission": {
//             "engineType": "2.0L 4-cyl Turbo Petrol / 2.0L 4-cyl Diesel (Gran Limousine) / 3.0L 6-cyl Turbo Petrol Mild-Hybrid (M340i)",
//             "displacement": "1998 cc (Petrol) / 1995 cc (Diesel) / 2998 cc (M340i)",
//             "maxPower": "255 bhp (330Li), 190 bhp (320Ld), 386 bhp (M340i)",
//             "maxTorque": "400 Nm (330Li), 400 Nm (320Ld), 500 Nm (M340i)",
//             "cylinders": "4 (Gran Limousine) / 6 (M340i)",
//             "valvesPerCylinder": "N/A",
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "Direct Injection",
//             "turboCharger": true,
//             "transmissionType": "Automatic (Torque Converter)",
//             "gearbox": "8-Speed Steptronic",
//             "driveType": "RWD (Gran Limousine), xDrive AWD (M340i)"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol / Diesel / Petrol-Hybrid (M340i)",
//             "mileage": "15.4 kmpl (330Li), 19.6 kmpl (320Ld), 13.02 kmpl (M340i) (ARAI)",
//             "fuelTankCapacity": "N/A",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "MacPherson Strut",
//             "rearSuspension": "Multi-link",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "N/A",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Disc"
//           },
//           "dimensionsAndCapacity": {
//             "length": "4819 mm (Gran Limousine)",
//             "width": "1827 mm (Gran Limousine)",
//             "height": "1442 mm (Gran Limousine)",
//             "seatingCapacity": 5,
//             "groundClearance": "N/A",
//             "wheelBase": "2961 mm (Gran Limousine)",
//             "numberOfDoors": 4,
//             "bootSpace": "480 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Automatic Climate Control (3-zone)", "Rear AC Vents",
//               "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera (optional)",
//               "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
//               "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
//               "Panoramic Sunroof (Gran Limousine)", "Power Seats"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Curved display (12.3-inch instrumentation, 14.9-inch infotainment)",
//               "Digital Instrument Cluster", "Leatherette/Leather Upholstery",
//               "Ambient Lighting", "Harman Kardon Sound System (variant dependent)"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
//               "Sporty Sedan Design", "Chrome/Black Accents"
//             ],
//             "tyre": {
//               "size": "N/A",
//               "type": "Radial Tubeless",
//               "wheelSize": "N/A"
//             },
//             "bootOpening": "Manual/Power Tailgate (variant dependent)"
//           },
//           "safety": {
//             "features": [
//               "ABS with EBD", "Brake Assist", "6 Airbags", "Electronic Stability Program (ESP)",
//               "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
//               "Seat Belt Reminder", "High-Speed Alert System", "Child Safety Locks",
//               "Engine Immobilizer"
//             ],
//             "ncapRating": {
//               "adultOccupant": "N/A",
//               "childOccupant": "N/A"
//             }
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "14.9-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Sound System",
//               "USB Ports", "Voice Recognition"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Driving Assistant (Lane Departure Warning, Front Collision Warning - variant dependent)"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Connected Car Technology", "Remote Services"
//             ]
//           }
//         }
//       },
//       {
//         "id": "bmw-5-series-2025",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/duster-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BMW_G60_IMG_0083.jpg/1280px-BMW_G60_IMG_0083.jpg",
//         "title": "BMW 5 Series (2025 Model)",
//         "link": "https://www.carwale.com/bmw-cars/5-series/price-in-nagpur/",
//         "description": "The BMW 5 Series is a mid-size luxury sedan renowned for its executive comfort and engaging driving dynamics. The 2025 model brings a refreshed design and updated technology.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "5 Series",
//           "manufacturer": "BMW",
//           "year": 2025,
//           "price": "₹ 84.85 Lakh (on-road, Nagpur, for 530Li M Sport)",
//           "engineAndTransmission": {
//             "engineType": "2.0L 4-cyl Petrol",
//             "displacement": "1998 cc",
//             "maxPower": "255 bhp",
//             "maxTorque": "400 Nm",
//             "cylinders": 4,
//             "valvesPerCylinder": "N/A",
//             "valveConfiguration": "DOHC",
//             "fuelSupplySystem": "Direct Injection",
//             "turboCharger": true,
//             "transmissionType": "Automatic (Torque Converter)",
//             "gearbox": "8-Speed Steptronic",
//             "driveType": "RWD"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Petrol",
//             "mileage": "15.7 kmpl (ARAI)",
//             "fuelTankCapacity": "60 Litres",
//             "emissionNorm": "BS VI 2.0"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "Double-wishbone axle",
//             "rearSuspension": "Five-link axle",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "N/A",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Disc"
//           },
//           "dimensionsAndCapacity": {
//             "length": "5165 mm",
//             "width": "2156 mm",
//             "height": "1518 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "N/A",
//             "wheelBase": "3105 mm",
//             "numberOfDoors": 4,
//             "bootSpace": "500 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Automatic Climate Control (4-zone)", "Rear AC Vents",
//               "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera (optional)",
//               "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
//               "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
//               "Electric Glass Sunroof", "Heated & Ventilated Front Seats (variant dependent)",
//               "Power Seats"
//             ]
//           },
//           "interior": {
//             "features": [
//               "12.3-inch Touchscreen Infotainment System", "Digital Instrument Cluster",
//               "Leather Upholstery", "Ambient Lighting", "Harman Kardon Audio System (16 speakers)",
//               "Gesture Control"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "LED Headlamps", "LED DRLs", "LED Taillights", "Alloy Wheels",
//               "Chrome Accents", "Sleek Sedan Design"
//             ],
//             "tyre": {
//               "size": "N/A",
//               "type": "Radial Tubeless",
//               "wheelSize": "N/A"
//             },
//             "bootOpening": "Power Tailgate"
//           },
//           "safety": {
//             "features": [
//               "ABS with EBD", "Brake Assist", "8 Airbags", "Electronic Stability Program (ESP)",
//               "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
//               "Seat Belt Reminder", "High-Speed Alert System", "Child Safety Locks",
//               "Engine Immobilizer"
//             ],
//             "ncapRating": {
//               "adultOccupant": "N/A",
//               "childOccupant": "N/A"
//             }
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "12.3-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Audio System",
//               "USB Ports", "Voice Recognition", "Gesture Control"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Driving Assistant (Lane Departure Warning, Front Collision Warning - variant dependent)"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Connected Car Technology", "Remote Services"
//             ]
//           }
//         }
//       },
//       {
//         "id": "bmw-ix-2025",
//         "videoPoster": "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103131/duster-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//         "videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//         "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/BMW_iX_xDrive50_%28I20%29_IMG_4070.jpg/1280px-BMW_iX_xDrive50_%28I20%29_IMG_4070.jpg",
//         "title": "BMW iX (2025 Model)",
//         "link": "https://www.carwale.com/bmw-cars/ix/price-in-nagpur/",
//         "description": "The BMW iX is an all-electric SUV that leads BMW's push into sustainable mobility, offering significant range, advanced technology, and a striking design. Expected launch by August 2025.",
//         "buttonText": "View Details",
//         "vehicleInfo": {
//           "model": "iX",
//           "manufacturer": "BMW",
//           "year": 2025,
//           "price": "₹ 1.47 - 1.52 Crore (on-road, Nagpur)",
//           "engineAndTransmission": {
//             "engineType": "Electric Motors",
//             "displacement": "N/A",
//             "maxPower": "326 PS (iX xDrive40) / 503 PS (iX xDrive50)",
//             "maxTorque": "630 Nm",
//             "cylinders": "N/A",
//             "valvesPerCylinder": "N/A",
//             "valveConfiguration": "N/A",
//             "fuelSupplySystem": "Electric",
//             "turboCharger": false,
//             "transmissionType": "Automatic (Single Speed)",
//             "gearbox": "Single-Speed Fixed Gear",
//             "driveType": "All-Wheel Drive (AWD)"
//           },
//           "fuelAndPerformance": {
//             "fuelType": "Electric",
//             "mileage": "425 km (iX xDrive40) / 635 km (iX xDrive50) (WLTP)",
//             "fuelTankCapacity": "N/A",
//             "emissionNorm": "Zero Emission"
//           },
//           "suspensionSteeringBrakes": {
//             "frontSuspension": "Double-wishbone axle",
//             "rearSuspension": "Five-link axle",
//             "steeringType": "Electric",
//             "steeringColumn": "Tilt & Telescopic",
//             "turningRadius": "N/A",
//             "frontBrakeType": "Disc",
//             "rearBrakeType": "Disc"
//           },
//           "dimensionsAndCapacity": {
//             "length": "4953 mm",
//             "width": "1967 mm",
//             "height": "1695 mm",
//             "seatingCapacity": 5,
//             "groundClearance": "N/A",
//             "wheelBase": "3000 mm",
//             "numberOfDoors": 5,
//             "bootSpace": "500 Litres"
//           },
//           "comfortAndConvenience": {
//             "features": [
//               "Power Steering", "Automatic Climate Control (4-zone)", "Rear AC Vents",
//               "Cruise Control", "Front & Rear Parking Sensors", "360-degree Camera",
//               "Engine Start/Stop Button", "Keyless Entry", "Wireless Phone Charger",
//               "Rain Sensing Wipers", "Automatic Headlamps", "Powered ORVMs (Foldable)",
//               "Panorama Glass Roof with Electrochromic Shading", "Heated & Ventilated Seats (optional)"
//             ]
//           },
//           "interior": {
//             "features": [
//               "Curved Display", "Digital Instrument Cluster", "Sustainable Materials Upholstery",
//               "Ambient Lighting", "Harman Kardon Surround Sound System", "Head-Up Display"
//             ]
//           },
//           "exterior": {
//             "features": [
//               "LED Headlamps", "LED DRLs", "LED Taillights", "Aerodynamic Alloy Wheels",
//               "Blue Accents (electric specific)", "Unique Kidney Grille (sensor panel)"
//             ],
//             "tyre": {
//               "size": "N/A",
//               "type": "Radial Tubeless",
//               "wheelSize": "N/A"
//             },
//             "bootOpening": "Power Tailgate"
//           },
//           "safety": {
//             "features": [
//               "ABS with EBD", "Brake Assist", "8 Airbags", "Electronic Stability Program (ESP)",
//               "Tyre Pressure Monitoring System (TPMS)", "ISOFIX Child Seat Mounts",
//               "Seat Belt Reminder", "High-Speed Alert System", "Child Safety Locks",
//               "Engine Immobilizer"
//             ],
//             "ncapRating": {
//               "adultOccupant": "N/A",
//               "childOccupant": "N/A"
//             }
//           },
//           "entertainmentAndCommunication": {
//             "features": [
//               "14.9-inch Touchscreen Infotainment System", "Radio", "Bluetooth Connectivity",
//               "Wireless Android Auto", "Wireless Apple CarPlay", "Harman Kardon Surround Sound System",
//               "USB Ports", "Voice Recognition"
//             ]
//           },
//           "adasFeatures": {
//             "features": [
//               "Automatic Emergency Braking (AEB)", "Traffic Sign Recognition", "Lane Keep Assist",
//               "Blind Spot Monitoring", "Adaptive Cruise Control", "Rear Cross Traffic Alert",
//               "Driver Attention Alert", "Parking Assistant Plus"
//             ]
//           },
//           "internetFeatures": {
//             "features": [
//               "Connected Car Technology", "Remote Vehicle Control", "Live Location Tracking",
//               "Geo-Fencing", "Over-the-Air (OTA) Updates", "BMW Digital Key Plus"
//             ]
//           }
//         }
//       }
//     ]
//   }
// ];

// const Carcard = () => {
//   const [authChecked, setAuthChecked] = useState(false);
//   const [manufacturer, setManufacturer] = useState('');
//   const [model, setModel] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         navigate('/login');
//       } else {
//         setAuthChecked(true);
//       }
//     });
//     return () => unsubscribe();
//   }, [navigate]);

//   useEffect(() => {
//     AOS.init({ duration: 300, once: false });
//   }, []);

//   const handleFeedbackClick = () => {
//     navigate('/feedback');
//   };

//   const handleActionButtonClick = (vehicleId) => {
//     navigate(`/cardetail/${vehicleId}`);
//   };

//   const filteredData = useMemo(() => {
//     const manufacturerFiltered = manufacturer.trim()
//       ? vehicleData.filter(group =>
//           group.manufacturer.toLowerCase().includes(manufacturer.toLowerCase())
//         )
//       : vehicleData;

//     return manufacturerFiltered
//       .map(group => {
//         const filteredVehicles = group.vehicles.filter(vehicle =>
//           vehicle.vehicleInfo.model.toLowerCase().includes(model.toLowerCase()) ||
//           vehicle.title.toLowerCase().includes(model.toLowerCase()) ||
//           vehicle.description.toLowerCase().includes(model.toLowerCase())
//         );
//         return filteredVehicles.length > 0 ? { ...group, vehicles: filteredVehicles } : null;
//       })
//       .filter(Boolean);
//   }, [manufacturer, model]);

//   const renderVehicleCard = useCallback((vehicle) => {
//     const isYouTubeVideo = vehicle.videoSrc && vehicle.videoSrc.includes("youtube.com/embed/");
//     const videoIdMatch = isYouTubeVideo ? vehicle.videoSrc.match(/\/embed\/([a-zA-Z0-9_-]+)/) : null;
//     const youtubeVideoId = videoIdMatch ? videoIdMatch[1] : null;

//     return (
//       <div className="card-container" key={vehicle.id}>
//         <div className="video-section">
//           <section>
//             <video muted playsInline disableRemotePlayback poster={vehicle.videoPoster} className="video-element">
//               <source src={vehicle.videoSrc} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </section>
//           <div className="video-overlay">
//             <img src={vehicle.thumbnail} alt={`${vehicle.title} thumbnail`} className="thumbnail" />
//             <div className="title">
//               <a href={vehicle.link} onClick={(e) => e.preventDefault()}>{vehicle.title}</a>
//               <SlArrowRight />
//             </div>
//           </div>
//         </div>
//         <div className="content">
//           <p className="description">{vehicle.description}</p>
//           <div className="button-row">
//             <FavoriteVehicle vehicle={vehicle} />
//             <div className="main-action-group" onClick={() => handleActionButtonClick(vehicle.id)}>
//               <div className="turn-on-button">{vehicle.buttonText}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }, [handleActionButtonClick]);

//   if (!authChecked) return null;

//   return (
//     <div className="seeoffer-background">
//       <div className="cardbox">
//         <div className="manufacturer-filter" style={{ textAlign: 'center', marginBottom: '20px' }}>
//           <input
//             type="text"
//             placeholder="Search by Manufacturer (e.g., Honda)"
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
//             placeholder="Search by Model (e.g., City, Swift)"
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
//               <div data-aos="fade" className="title1" data-aos-once="true">
//                 <h1 className="rxk">{manufacturerGroup.manufacturer} Vehicles</h1>
//               </div>
//               <div data-aos="fade-up" className="card-slider" data-aos-once="true">
//                 <div className="card-grid-wrapper">
//                   {manufacturerGroup.vehicles.map(renderVehicleCard)}
//                 </div>
//               </div>
//               <div className="Xp8JS"></div>
//             </React.Fragment>
//           ))
//         ) : (
//           <div className="no-results">
//             🚫 No vehicles found matching your search.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Carcard;


