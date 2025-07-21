import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
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
    const principal = parseFloat(loanAmount) - parseFloat(downPayment || 0);
    const monthlyRate = parseFloat(interestRate) / 12 / 100;
    const months = parseInt(tenure);

    if (isNaN(principal) || principal <= 0 || isNaN(monthlyRate) || isNaN(months) || months <= 0) {
      alert("Please enter valid input values.");
      return;
    }

    const emiVal = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const total = emiVal * months;
    const interest = total - principal;

    setEmi(emiVal.toFixed(2));
    setTotalPayment(total.toFixed(2));
    setTotalInterest(interest.toFixed(2));
  };

  const clearAll = () => {
    setLoanAmount('');
    setDownPayment('');
    setInterestRate('');
    setTenure('');
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
  };

  return (
    <>
      <Helmet>
        <title>EMI Calculator - MotoMart | Calculate Your Monthly EMI</title>
        <meta
          name="description"
          content="Use MotoMart's EMI Calculator to calculate your car, bike, or personal loan EMI instantly. Accurate, fast, and mobile-friendly."
        />
        <meta
          name="keywords"
          content="EMI calculator, loan EMI, car EMI, bike EMI, MotoMart"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://motomart-ten.vercel.app/emicalculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialProduct",
            "name": "EMI Calculator",
            "description": "MotoMart EMI Calculator for car and bike loans.",
            "url": "https://motomart-ten.vercel.app/emicalculator",
            "provider": {
              "@type": "Organization",
              "name": "MotoMart"
            }
          })}
        </script>
      </Helmet>

      <div className="emi-container">
        <h2>Loan EMI Calculator</h2>

        <div className="input-group">
          <label htmlFor="loanAmount">Loan Amount (₹)</label>
          <input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={e => setLoanAmount(e.target.value)}
            placeholder="e.g., 500000"
          />
        </div>

        <div className="input-group">
          <label htmlFor="downPayment">Down Payment (₹)</label>
          <input
            id="downPayment"
            type="number"
            value={downPayment}
            onChange={e => setDownPayment(e.target.value)}
            placeholder="e.g., 50000"
          />
        </div>

        <div className="input-group">
          <label htmlFor="interestRate">Interest Rate (%/year)</label>
          <input
            id="interestRate"
            type="number"
            value={interestRate}
            onChange={e => setInterestRate(e.target.value)}
            placeholder="e.g., 8.5"
          />
        </div>

        <div className="input-group">
          <label htmlFor="tenure">Loan Tenure (months)</label>
          <input
            id="tenure"
            type="number"
            value={tenure}
            onChange={e => setTenure(e.target.value)}
            placeholder="e.g., 60"
          />
        </div>

        <div className="buttons">
          <button onClick={calculateEMI}>Calculate</button>
          <button onClick={clearAll} className="clear-btn">Clear</button>
        </div>

        {emi && (
          <div className="result">
            <h3>EMI Summary</h3>
            <p><strong>Monthly EMI:</strong> ₹{emi}</p>
            <p><strong>Total Interest:</strong> ₹{totalInterest}</p>
            <p><strong>Total Amount Payable:</strong> ₹{totalPayment}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default EMICalculator;

// import React, { useState } from 'react';
// import './emicalculator.css';

// const EMICalculator = () => {
//   const [loanAmount, setLoanAmount] = useState('');
//   const [downPayment, setDownPayment] = useState('');
//   const [interestRate, setInterestRate] = useState('');
//   const [tenure, setTenure] = useState('');
//   const [emi, setEmi] = useState(null);
//   const [totalInterest, setTotalInterest] = useState(null);
//   const [totalPayment, setTotalPayment] = useState(null);

//   const calculateEMI = () => {
//     const principal = parseFloat(loanAmount) - parseFloat(downPayment || 0);
//     const monthlyRate = parseFloat(interestRate) / 12 / 100;
//     const months = parseInt(tenure);

//     if (isNaN(principal) || principal <= 0 || isNaN(monthlyRate) || isNaN(months) || months <= 0) {
//       alert("Please enter valid input values.");
//       return;
//     }

//     const emiVal = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
//     const total = emiVal * months;
//     const interest = total - principal;

//     setEmi(emiVal.toFixed(2));
//     setTotalPayment(total.toFixed(2));
//     setTotalInterest(interest.toFixed(2));
//   };

//   const clearAll = () => {
//     setLoanAmount('');
//     setDownPayment('');
//     setInterestRate('');
//     setTenure('');
//     setEmi(null);
//     setTotalInterest(null);
//     setTotalPayment(null);
//   };

//   return (
//     <div className="emi-container">
//       <h2>Loan EMI Calculator</h2>

//       <div className="input-group">
//         <label htmlFor="loanAmount">Loan Amount (₹)</label>
//         <input
//           id="loanAmount"
//           type="number"
//           value={loanAmount}
//           onChange={e => setLoanAmount(e.target.value)}
//           placeholder="e.g., 500000"
//         />
//       </div>

//       <div className="input-group">
//         <label htmlFor="downPayment">Down Payment (₹)</label>
//         <input
//           id="downPayment"
//           type="number"
//           value={downPayment}
//           onChange={e => setDownPayment(e.target.value)}
//           placeholder="e.g., 50000"
//         />
//       </div>

//       <div className="input-group">
//         <label htmlFor="interestRate">Interest Rate (%/year)</label>
//         <input
//           id="interestRate"
//           type="number"
//           value={interestRate}
//           onChange={e => setInterestRate(e.target.value)}
//           placeholder="e.g., 8.5"
//         />
//       </div>

//       <div className="input-group">
//         <label htmlFor="tenure">Loan Tenure (months)</label>
//         <input
//           id="tenure"
//           type="number"
//           value={tenure}
//           onChange={e => setTenure(e.target.value)}
//           placeholder="e.g., 60"
//         />
//       </div>

//       <div className="buttons">
//         <button onClick={calculateEMI}>Calculate</button>
//         <button onClick={clearAll} className="clear-btn">Clear</button>
//       </div>

//       {emi && (
//         <div className="result">
//           <h3>EMI Summary</h3>
//           <p><strong>Monthly EMI:</strong> ₹{emi}</p>
//           <p><strong>Total Interest:</strong> ₹{totalInterest}</p>
//           <p><strong>Total Amount Payable:</strong> ₹{totalPayment}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EMICalculator;
