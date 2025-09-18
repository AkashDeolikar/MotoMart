// src/data/banks.js
// Indicative starting car/vehicle loan interest rates (floating / starting from).
// These are sample, public-facing "starting" rates — they change frequently.
// See sources in app footer/disclaimer and consider live lookup in production.
const BANKS = [
  { id: "SBI", name: "State Bank of India (SBI)", startingRate: 8.9 },
  { id: "HDFC", name: "HDFC Bank", startingRate: 9.4 },
  { id: "ICICI", name: "ICICI Bank", startingRate: 9.15 },
  { id: "AXIS", name: "Axis Bank", startingRate: 8.8 },
  { id: "KOTAK", name: "Kotak Mahindra Bank", startingRate: 9.5 },
  { id: "PNB", name: "Punjab National Bank (PNB)", startingRate: 7.85 },
  { id: "BOB", name: "Bank of Baroda", startingRate: 8.15 },
  { id: "BANKINDIA", name: "Bank of India", startingRate: 7.85 },
  { id: "IDFC", name: "IDFC FIRST Bank", startingRate: 9.99 },
  { id: "IDBI", name: "IDBI Bank", startingRate: 8.3 },
  { id: "IOB", name: "Indian Overseas Bank (IOB)", startingRate: 7.8 },
  { id: "FEDERAL", name: "Federal Bank", startingRate: 10.5 },
  { id: "BOFM", name: "Bank of Maharashtra", startingRate: 7.7 },
  // NBFCs/Auto-financers (typical vehicle finance sources)
  { id: "MAHINDRA_FIN", name: "Mahindra Finance", startingRate: 10.5 },
  { id: "TATA_CAP", name: "Tata Capital", startingRate: 10.0 },
  { id: "BAJAJ_FIN", name: "Bajaj Finance", startingRate: 11.0 },
];

export default BANKS;
