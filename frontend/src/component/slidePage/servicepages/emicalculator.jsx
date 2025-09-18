// src/components/EMIServiceTool/EMIServiceTool.jsx
import React, { useMemo, useState } from "react";
import BANKS from "../../data/banks";
import "./emiserivetool.css";

/*
  Features:
  - Select bank (pre-fills interest)
  - Select vehicle type (applies GST)
  - Loan inputs (loan amount, down payment, tenure)
  - Calculate EMI + totals + amortization
  - Compare EMI across selected banks
  - GST breakdown card
  - Disclaimer about rates sources
*/

// GST reference (indicative)
const GST_RATES = {
  "Two-wheeler (moped/scooter)": 18,
  "Motorcycle (>125cc)": 28,
  "Passenger Car (up to 4m length)": 28,
  "Electric Vehicle (EV)": 5,
  "Luxury / High CC": 50, // illustrative (luxury cess + GST)
};

// format helpers
const formatINR = (v) => {
  if (v === null || v === undefined || Number.isNaN(Number(v))) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(v));
};

const toNumber = (v) => {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
};

function calcEMI(P, annualRate, months) {
  const r = annualRate / 12 / 100;
  const N = Math.max(1, Math.floor(months));
  if (r === 0) return P / N;
  const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
  return emi;
}

export default function EMIServiceTool() {
  // Inputs
  const [bankId, setBankId] = useState("");
  const [interest, setInterest] = useState(""); // % p.a. editable
  const [vehicleType, setVehicleType] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [tenureMonths, setTenureMonths] = useState("60"); // default 60 months
  const [showCompareBanks, setShowCompareBanks] = useState(true);

  // fill interest when bank selected
  const onChangeBank = (id) => {
    setBankId(id);
    const bank = BANKS.find((b) => b.id === id);
    if (bank) setInterest(bank.startingRate.toString());
  };

  // Derived values
  const principal = useMemo(() => {
    const loan = toNumber(loanAmount);
    const down = toNumber(downPayment);
    return Math.max(loan - down, 0);
  }, [loanAmount, downPayment]);

  const gstRate = useMemo(() => {
    return GST_RATES[vehicleType] || 0;
  }, [vehicleType]);

  const gstAmount = useMemo(() => {
    const loan = toNumber(loanAmount);
    return (loan * gstRate) / 100;
  }, [loanAmount, gstRate]);

  const emiValue = useMemo(() => {
    const P = principal;
    const r = toNumber(interest);
    const N = Number(tenureMonths) || 0;
    if (P <= 0 || N <= 0 || r < 0) return 0;
    return calcEMI(P, r, N);
  }, [principal, interest, tenureMonths]);

  const totalPayment = useMemo(() => {
    const emi = emiValue;
    const N = Number(tenureMonths) || 0;
    return emi * N;
  }, [emiValue, tenureMonths]);

  const totalInterest = useMemo(() => {
    return Math.max(0, totalPayment - principal);
  }, [totalPayment, principal]);

  // amortization schedule (simple)
  const amortization = useMemo(() => {
    const P = principal;
    const r = toNumber(interest) / 12 / 100;
    const N = Number(tenureMonths) || 0;
    if (N <= 0 || P <= 0) return [];
    const emi = calcEMI(P, toNumber(interest), N);
    let bal = P;
    const rows = [];
    for (let i = 1; i <= N; i++) {
      const interestPortion = bal * r;
      const principalPortion = Math.max(0, emi - interestPortion);
      bal = Math.max(0, bal - principalPortion);
      rows.push({
        month: i,
        emi: emi,
        principal: principalPortion,
        interest: interestPortion,
        balance: bal,
      });
    }
    return rows;
  }, [principal, interest, tenureMonths]);

  // Compare: top banks (a subset or all)
  const compareBanks = useMemo(() => {
    const loan = principal;
    const N = Number(tenureMonths) || 0;
    if (loan <= 0 || N <= 0) return [];
    return BANKS.map((b) => {
      const emi = calcEMI(loan, b.startingRate, N);
      return { id: b.id, name: b.name, rate: b.startingRate, emi };
    }).sort((a, b) => a.emi - b.emi).slice(0, 8); // show top 8 cheapest by EMI
  }, [principal, tenureMonths]);

  // small validation messages
  const validation = () => {
    const msgs = [];
    if (toNumber(loanAmount) <= 0) msgs.push("Enter a valid Loan Amount.");
    if (toNumber(downPayment) < 0) msgs.push("Down payment must be 0 or more.");
    if (toNumber(interest) < 0) msgs.push("Interest rate must be >= 0.");
    if ((Number(tenureMonths) || 0) <= 0) msgs.push("Enter loan tenure (months).");
    return msgs;
  };

  const validationMsgs = validation();

  return (
    <main className="emi-tool-root">
      <section className="hero">
        <h1>Service Cost & EMI — MotoMart</h1>
        <p className="muted">
          Pick a bank, vehicle type and loan details. Rates are indicative — verify with bank.
        </p>
      </section>

      <section className="controls-grid">
        <div className="card">
          <h3>Bank & Interest</h3>
          <label className="label">
            Select Bank
            <select value={bankId} onChange={(e) => onChangeBank(e.target.value)}>
              <option value="">— Select —</option>
              {BANKS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — from {b.startingRate}%
                </option>
              ))}
            </select>
          </label>

          <label className="label">
            Interest Rate (% p.a.)
            <input
              type="number"
              min="0"
              step="0.01"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              aria-label="Interest rate percent per annum"
            />
          </label>
        </div>

        <div className="card">
          <h3>Vehicle & GST</h3>
          <label className="label">
            Vehicle Type
            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
              <option value="">— Select —</option>
              {Object.keys(GST_RATES).map((k) => (
                <option key={k} value={k}>
                  {k} — GST {GST_RATES[k]}%
                </option>
              ))}
            </select>
          </label>

          <div className="label">
            <div className="small">GST Rate</div>
            <div className="value">{gstRate}%</div>
          </div>
        </div>

        <div className="card">
          <h3>Loan Details</h3>
          <label className="label">
            Loan Amount (on-road / on-paper)
            <input
              type="number"
              placeholder="e.g. 500000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </label>

          <label className="label">
            Down Payment
            <input
              type="number"
              placeholder="e.g. 50000"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
          </label>

          <label className="label">
            Tenure (months)
            <input
              type="number"
              min="1"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(e.target.value)}
            />
          </label>
        </div>

        <div className="card actions-card">
          <h3>Summary</h3>

          {validationMsgs.length > 0 ? (
            <div className="warning">
              {validationMsgs.map((m, i) => <div key={i}>• {m}</div>)}
            </div>
          ) : (
            <>
              <div className="summary-row">
                <div>Principal</div>
                <div>{formatINR(principal)}</div>
              </div>
              <div className="summary-row">
                <div>Monthly EMI</div>
                <div className="big">{formatINR(emiValue)}</div>
              </div>
              <div className="summary-row">
                <div>Total Interest</div>
                <div>{formatINR(totalInterest)}</div>
              </div>
              <div className="summary-row">
                <div>Total Payment</div>
                <div>{formatINR(totalPayment)}</div>
              </div>
              <div className="summary-row">
                <div>GST on vehicle (est.)</div>
                <div>{formatINR(gstAmount)}</div>
              </div>

              <div className="cta-row">
                <button
                  onClick={() => setShowCompareBanks((s) => !s)}
                  className="btn ghost"
                >
                  {showCompareBanks ? "Hide" : "Compare Banks"}
                </button>
                <button
                  onClick={() => {
                    // simple "copy summary" UX
                    const text = `EMI ${formatINR(emiValue)}, Total ₹${formatINR(totalPayment)} (${tenureMonths} months)`;
                    navigator.clipboard?.writeText(text);
                    alert("Summary copied to clipboard");
                  }}
                  className="btn primary"
                >
                  Copy Summary
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {showCompareBanks && validationMsgs.length === 0 && principal > 0 && (
        <section className="card compare-card">
          <h3>Compare Banks (sample)</h3>
          <table className="compare-table" aria-label="Compare bank EMI table">
            <thead>
              <tr>
                <th>Bank</th>
                <th>Rate (%)</th>
                <th>EMI (₹)</th>
              </tr>
            </thead>
            <tbody>
              {compareBanks.map((b) => (
                <tr key={b.id} className={b.id === bankId ? "selected" : ""}>
                  <td>{b.name}</td>
                  <td>{b.rate}%</td>
                  <td>{formatINR(b.emi)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted small">
            Rates shown are indicative starting rates. Actual deal depends on credit profile, tenure and special offers.
            Sources: public bank rate pages and rate aggregators.
          </p>
        </section>
      )}

      {/* Amortization (collapsible) */}
      {amortization.length > 0 && validationMsgs.length === 0 && (
        <section className="card amort-card">
          <h3>Amortization Schedule (first 12 months)</h3>
          <div className="table-scroll">
            <table className="amort-table" aria-label="Amortization schedule">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>EMI</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {amortization.slice(0, 12).map((r) => (
                  <tr key={r.month}>
                    <td>{r.month}</td>
                    <td>{formatINR(r.emi)}</td>
                    <td>{formatINR(r.principal)}</td>
                    <td>{formatINR(r.interest)}</td>
                    <td>{formatINR(r.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted small">Showing first 12 months. Full schedule available for download (future improvement).</p>
        </section>
      )}

      <section className="card disclaimer">
  <h4>Disclaimer & Sources</h4>
  <p className="muted small">
    Interest rates are illustrative starting rates from bank public pages and aggregator sources (e.g. BankBazaar, NDTV, bank websites).
    These values change frequently; always confirm with the bank before applying. Example sources: BankBazaar, HDFC/ICICI/SBI official pages.
  </p>
</section>

    </main>
  );
}
