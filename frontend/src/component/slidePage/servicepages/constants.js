// =======================
// 1. Service Type Constants
// =======================
export const SERVICE_TYPES = {
  FIXED: 'fixed',
  BRAND_BASED: 'brand-based',
  WASH_BASED: 'wash-based',
  SIZE_BASED: 'size-based',
  ESTIMATE_BASED: 'estimate-based', 
};

// =======================
// 2. Vehicle Types
// =======================
export const VEHICLE_TYPES = {
  TWO_WHEELER: '2-wheeler',
  FOUR_WHEELER: '4-wheeler',
};

// =======================
// 3. Vehicle Segment Constants
// =======================
export const VEHICLE_SEGMENTS = {
  HATCHBACK: 'Hatchback',
  SEDAN: 'Sedan',
  SUV_MPV: 'SUV/MPV',
  LUXURY: 'Luxury',
};

// =======================
// 4. Wash Type Constants (for better control)
// =======================
export const WASH_TYPES = {
  TWO_WHEELER_BASIC: 'Two-wheeler Basic',
  TWO_WHEELER_PREMIUM: 'Two-wheeler Premium',
  FOUR_WHEELER_STANDARD: 'Four-wheeler Standard',
  FOUR_WHEELER_PREMIUM: 'Four-wheeler Premium',
};

// =======================
// 5. Services List
// =======================
export const initialServices = [
  // --- Essential Services ---
  {
    id: 'oil-change',
    name: 'Engine Oil Change',
    type: SERVICE_TYPES.BRAND_BASED,
    applicableTo: [VEHICLE_TYPES.TWO_WHEELER, VEHICLE_TYPES.FOUR_WHEELER],
    brands: {
      Castrol: {
        [VEHICLE_TYPES.TWO_WHEELER]: 500,
        [VEHICLE_TYPES.FOUR_WHEELER]: 900,
      },
      Motul: {
        [VEHICLE_TYPES.TWO_WHEELER]: 650,
        [VEHICLE_TYPES.FOUR_WHEELER]: 1000,
      },
      Shell: {
        [VEHICLE_TYPES.TWO_WHEELER]: 600,
        [VEHICLE_TYPES.FOUR_WHEELER]: 950,
      },
    },
    defaultBrand: 'Castrol',
    description: 'Replacement of old engine oil with new grade oil. (Price varies by type/brand)',
    timeEstimate: '30 mins',
  },

  {
    id: 'basic-service',
    name: 'Basic Service (Inspection & Fluid Check)',
    type: SERVICE_TYPES.FIXED,
    price: 450,
    applicableTo: [VEHICLE_TYPES.TWO_WHEELER, VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Multi-point check + fluid top-up. Excludes replacement/parts.',
    timeEstimate: '45 mins',
  },

  {
    id: 'car-wash-full',
    name: 'Full Body Wash & Vacuum',
    type: SERVICE_TYPES.WASH_BASED,
    applicableTo: [VEHICLE_TYPES.TWO_WHEELER, VEHICLE_TYPES.FOUR_WHEELER],
    washTypes: {
      [WASH_TYPES.TWO_WHEELER_BASIC]: 150,
      [WASH_TYPES.TWO_WHEELER_PREMIUM]: 250,
      [WASH_TYPES.FOUR_WHEELER_STANDARD]: 350,
      [WASH_TYPES.FOUR_WHEELER_PREMIUM]: 500,
    },
    defaultWashType: WASH_TYPES.FOUR_WHEELER_STANDARD,
    description: 'Exterior foam wash + interior vacuum cleaning.',
    timeEstimate: '30–45 mins',
  },

  {
    id: 'brake-inspection-replacement',
    name: 'Brake Inspection & Pad Replacement',
    type: SERVICE_TYPES.FIXED,
    price: 700,
    applicableTo: [VEHICLE_TYPES.TWO_WHEELER, VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Includes brake inspection, pad removal/install. (Pads extra)',
    timeEstimate: '60 mins',
  },

  {
    id: 'wheel-alignment-balancing',
    name: 'Wheel Alignment & Balancing',
    type: SERVICE_TYPES.FIXED,
    price: 800,
    applicableTo: [VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Corrects wheel angles for better handling & tire life.',
    timeEstimate: '60 mins',
  },

  {
    id: 'tyre-rotation',
    name: 'Tyre Rotation',
    type: SERVICE_TYPES.FIXED,
    price: 400,
    applicableTo: [VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Rotates tires to equalize wear.',
    timeEstimate: '30 mins',
  },

  {
    id: 'battery-check-replacement',
    name: 'Battery Check & Charging',
    type: SERVICE_TYPES.FIXED,
    price: 350,
    applicableTo: [VEHICLE_TYPES.TWO_WHEELER, VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Includes health test, terminal clean-up, and recharge.',
    timeEstimate: '20 mins',
  },

  // --- Common Maintenance Services ---
  {
    id: 'spark-plug-replacement',
    name: 'Spark Plug Replacement',
    type: SERVICE_TYPES.FIXED,
    price: 300,
    applicableTo: [VEHICLE_TYPES.TWO_WHEELER, VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Labor for spark plug replacement. (Plugs extra)',
    timeEstimate: '30 mins',
  },

  {
    id: 'air-filter-replacement',
    name: 'Air Filter Replacement',
    type: SERVICE_TYPES.FIXED,
    price: 250,
    applicableTo: [VEHICLE_TYPES.TWO_WHEELER, VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Replace air filter to improve engine efficiency.',
    timeEstimate: '20 mins',
  },

  {
    id: 'coolant-flush',
    name: 'Coolant Flush & Replacement',
    type: SERVICE_TYPES.FIXED,
    price: 800,
    applicableTo: [VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Flush old coolant and refill. (Coolant extra)',
    timeEstimate: '45 mins',
  },

  {
    id: 'ac-service-recharge',
    name: 'AC Service & Gas Recharge',
    type: SERVICE_TYPES.FIXED,
    price: 1500,
    applicableTo: [VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Check AC system and recharge refrigerant. (Gas extra)',
    timeEstimate: '60 mins',
  },

  {
    id: 'transmission-fluid-change',
    name: 'Transmission Fluid Change',
    type: SERVICE_TYPES.FIXED,
    price: 1000,
    applicableTo: [VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Replace old transmission fluid. (Fluid extra)',
    timeEstimate: '60 mins',
  },

  {
    id: 'headlight-restoration',
    name: 'Headlight Restoration (Pair)',
    type: SERVICE_TYPES.FIXED,
    price: 750,
    applicableTo: [VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Polish & restore foggy headlights.',
    timeEstimate: '45 mins',
  },

  {
    id: 'dent-paint-small',
    name: 'Small Dent & Paint Repair',
    type: SERVICE_TYPES.ESTIMATE_BASED,
    startingFrom: 1500,
    applicableTo: [VEHICLE_TYPES.TWO_WHEELER, VEHICLE_TYPES.FOUR_WHEELER],
    description: 'Minor dent/scratch removal + touch-up paint. (Quoted after inspection)',
    timeEstimate: 'Depends on damage',
  },

  // --- Detailing & Premium Services ---
  {
    id: 'interior-detailing',
    name: 'Interior Car Detailing',
    type: SERVICE_TYPES.SIZE_BASED,
    applicableTo: [VEHICLE_TYPES.FOUR_WHEELER],
    pricesBySegment: {
      [VEHICLE_SEGMENTS.HATCHBACK]: 2500,
      [VEHICLE_SEGMENTS.SEDAN]: 3000,
      [VEHICLE_SEGMENTS.SUV_MPV]: 3800,
      [VEHICLE_SEGMENTS.LUXURY]: 5000,
    },
    defaultSegment: VEHICLE_SEGMENTS.SEDAN,
    description: 'Deep cleaning of seats, carpets, and cabin interiors.',
    timeEstimate: '2–3 hrs',
  },

  {
    id: 'exterior-polishing',
    name: 'Exterior Car Polishing',
    type: SERVICE_TYPES.SIZE_BASED,
    applicableTo: [VEHICLE_TYPES.FOUR_WHEELER],
    pricesBySegment: {
      [VEHICLE_SEGMENTS.HATCHBACK]: 2000,
      [VEHICLE_SEGMENTS.SEDAN]: 2500,
      [VEHICLE_SEGMENTS.SUV_MPV]: 3200,
      [VEHICLE_SEGMENTS.LUXURY]: 4500,
    },
    defaultSegment: VEHICLE_SEGMENTS.SEDAN,
    description: 'Machine polish to restore paint shine and remove minor swirls.',
    timeEstimate: '1.5–2 hrs',
  },
];
