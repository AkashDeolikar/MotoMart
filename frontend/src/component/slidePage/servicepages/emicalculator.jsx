import React, { useState } from 'react';
import './emicalculator.css';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount) - parseFloat(downPayment || 0);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseInt(tenure);

    if (isNaN(P) || P <= 0 || isNaN(R) || isNaN(N) || N <= 0) {
      alert("Please enter all values correctly.");
      return;
    }


    const emiValue = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalPay = emiValue * N;
    const interestPay = totalPay - P;

    setEmi(emiValue.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
    setTotalInterest(interestPay.toFixed(2));
  };

  const clearFields = () => {
    setLoanAmount('');
    setDownPayment('');
    setInterestRate('');
    setTenure('');
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
  };

  return (
    <div className="emi-container">
      <h2>EMI Calculator</h2>

      <div className="input-group">
        <label>Loan Amount (₹)</label>
        <input
          type="number"
          value={loanAmount}
          onChange={e => setLoanAmount(e.target.value)}
          placeholder="Enter total loan amount"
        />
      </div>

      <div className="input-group">
        <label>Down Payment (₹)</label>
        <input
          type="number"
          value={downPayment}
          onChange={e => setDownPayment(e.target.value)}
          placeholder="Enter down payment"
        />
      </div>

      <div className="input-group">
        <label>Interest Rate (% per annum)</label>
        <input
          type="number"
          value={interestRate}
          onChange={e => setInterestRate(e.target.value)}
          placeholder="Enter interest rate"
        />
      </div>

      <div className="input-group">
        <label>Loan Tenure (months)</label>
        <input
          type="number"
          value={tenure}
          onChange={e => setTenure(e.target.value)}
          placeholder="Enter tenure in months"
        />
      </div>

      <div className="buttons">
        <button onClick={calculateEMI}>Calculate</button>
        <button onClick={clearFields} className="clear-btn">Clear</button>
      </div>

      {emi && (
        <div className="result">
          <h3>EMI Details</h3>
          <p><strong>Monthly EMI:</strong> ₹{emi}</p>
          <p><strong>Total Interest:</strong> ₹{totalInterest}</p>
          <p><strong>Total Payment:</strong> ₹{totalPayment}</p>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;
