import React, { useState, useMemo } from 'react';
import './emicalculator.css';

// Format as Indian Rupees (₹)
const formatCurrency = (value) => {
  if (isNaN(value)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

// Format as percentage
const formatPercentage = (value) => {
  if (isNaN(value)) return '0.00%';
  return new Intl.NumberFormat('en-IN', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenureMonths, setTenureMonths] = useState('');

  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const principalAmount = useMemo(() => {
    const loan = parseFloat(loanAmount);
    const down = parseFloat(downPayment || 0);
    return isNaN(loan) ? 0 : Math.max(0, loan - down);
  }, [loanAmount, downPayment]);

  const tenureYearsDisplay = useMemo(() => {
    const months = parseInt(tenureMonths);
    if (isNaN(months) || months <= 0) return '';
    const years = Math.floor(months / 12);
    const rem = months % 12;
    return rem === 0 ? `${years} Years` : `${years} Years, ${rem} Months`;
  }, [tenureMonths]);

  const calculateEMI = () => {
    setError('');
    setIsLoading(true);
    setHasCalculated(false);

    const P = principalAmount;
    const R_annual = parseFloat(interestRate);
    const N = parseInt(tenureMonths);

    if (isNaN(parseFloat(loanAmount)) || parseFloat(loanAmount) <= 0) {
      setError('Enter a valid Loan Amount.');
      setIsLoading(false);
      return;
    }
    if (parseFloat(downPayment) > parseFloat(loanAmount)) {
      setError('Down Payment cannot exceed Loan Amount.');
      setIsLoading(false);
      return;
    }
    if (P <= 0) {
      setError('Principal amount must be greater than 0.');
      setIsLoading(false);
      return;
    }
    if (isNaN(R_annual) || R_annual <= 0) {
      setError('Enter a valid Interest Rate.');
      setIsLoading(false);
      return;
    }
    if (isNaN(N) || N <= 0) {
      setError('Enter a valid Loan Tenure in months.');
      setIsLoading(false);
      return;
    }

    const R = R_annual / 12 / 100;

    setTimeout(() => {
      try {
        const emiVal =
          R === 0 ? P / N : P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
        const total = emiVal * N;
        const interest = total - P;

        setEmi(emiVal.toFixed(2));
        setTotalPayment(total.toFixed(2));
        setTotalInterest(interest.toFixed(2));

        const schedule = [];
        let balance = P;

        for (let i = 1; i <= N; i++) {
          const interestPortion = balance * R;
          const principalPortion = emiVal - interestPortion;
          balance -= principalPortion;

          schedule.push({
            month: i,
            emi: emiVal.toFixed(2),
            principal: principalPortion.toFixed(2),
            interest: interestPortion.toFixed(2),
            balance: Math.max(0, balance).toFixed(2),
          });
        }

        setAmortizationSchedule(schedule);
        setHasCalculated(true);
      } catch (err) {
        console.error(err);
        setError('An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const clearFields = () => {
    setLoanAmount('');
    setDownPayment('');
    setInterestRate('');
    setTenureMonths('');
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
    setAmortizationSchedule([]);
    setError('');
    setIsLoading(false);
    setHasCalculated(false);
  };

  return (
    <div className="emi-container">
      <h2>EMI Calculator</h2>
      <p className="description">
        Calculate your Equated Monthly Installment (EMI) and get a full breakdown of your loan.
      </p>

      {error && <div className="error-message">{error}</div>}

      <div className="input-grid">
        <div className="input-group">
          <label>Loan Amount (₹)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="e.g., 500000"
          />
        </div>

        <div className="input-group">
          <label>Down Payment (₹)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            placeholder="e.g., 50000"
          />
        </div>

        <div className="input-group">
          <label>Interest Rate (% p.a.)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="e.g., 8.5"
          />
        </div>

        <div className="input-group">
          <label>Loan Tenure (Months)</label>
          <input
            type="number"
            value={tenureMonths}
            onChange={(e) => setTenureMonths(e.target.value)}
            placeholder="e.g., 60"
          />
        </div>
      </div>

      <div className="buttons">
        <button onClick={calculateEMI} disabled={isLoading}>
          {isLoading ? 'Calculating...' : 'Calculate EMI'}
        </button>
        <button onClick={clearFields} className="clear-btn" disabled={isLoading}>
          Clear
        </button>
      </div>

      {hasCalculated && emi && (
        <div className="result-section">
          <h3>Your EMI Details</h3>
          <div className="summary-results">
            <div className="summary-item">
              <h4>Monthly EMI</h4>
              <p className="value highlight">{formatCurrency(emi)}</p>
            </div>
            <div className="summary-item">
              <h4>Total Interest</h4>
              <p className="value">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="summary-item">
              <h4>Total Payment</h4>
              <p className="value">{formatCurrency(totalPayment)}</p>
            </div>
            <div className="summary-item">
              <h4>Principal</h4>
              <p className="value">{formatCurrency(principalAmount)}</p>
            </div>
            <div className="summary-item">
              <h4>Interest Rate</h4>
              <p className="value">{formatPercentage(interestRate)}</p>
            </div>
            <div className="summary-item">
              <h4>Tenure</h4>
              <p className="value">{tenureMonths} Months {tenureYearsDisplay && `(${tenureYearsDisplay})`}</p>
            </div>
          </div>

          {amortizationSchedule.length > 0 && (
            <div className="amortization-table-container">
              <h4>Amortization Schedule</h4>
              <div className="table-scroll">
                <table>
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
                    {amortizationSchedule.map((item, index) => (
                      <tr key={index}>
                        <td>{item.month}</td>
                        <td>{formatCurrency(item.emi)}</td>
                        <td>{formatCurrency(item.principal)}</td>
                        <td>{formatCurrency(item.interest)}</td>
                        <td>{formatCurrency(item.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="note">
                Note: Interest portion is higher in early months and reduces as principal gets paid off.
              </p>
            </div>
          )}
          <p className="disclaimer">
            Disclaimer: These values are estimates. Please consult your bank for official EMI terms.
          </p>
        </div>
      )}
    </div>
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
//     const P = parseFloat(loanAmount) - parseFloat(downPayment || 0);
//     const R = parseFloat(interestRate) / 12 / 100;
//     const N = parseInt(tenure);

//     if (isNaN(P) || P <= 0 || isNaN(R) || isNaN(N) || N <= 0) {
//       alert("Please enter all values correctly.");
//       return;
//     }


//     const emiValue = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
//     const totalPay = emiValue * N;
//     const interestPay = totalPay - P;

//     setEmi(emiValue.toFixed(2));
//     setTotalPayment(totalPay.toFixed(2));
//     setTotalInterest(interestPay.toFixed(2));
//   };

//   const clearFields = () => {
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
//       <h2>EMI Calculator</h2>

//       <div className="input-group">
//         <label>Loan Amount (₹)</label>
//         <input
//           type="number"
//           value={loanAmount}
//           onChange={e => setLoanAmount(e.target.value)}
//           placeholder="Enter total loan amount"
//         />
//       </div>

//       <div className="input-group">
//         <label>Down Payment (₹)</label>
//         <input
//           type="number"
//           value={downPayment}
//           onChange={e => setDownPayment(e.target.value)}
//           placeholder="Enter down payment"
//         />
//       </div>

//       <div className="input-group">
//         <label>Interest Rate (% per annum)</label>
//         <input
//           type="number"
//           value={interestRate}
//           onChange={e => setInterestRate(e.target.value)}
//           placeholder="Enter interest rate"
//         />
//       </div>

//       <div className="input-group">
//         <label>Loan Tenure (months)</label>
//         <input
//           type="number"
//           value={tenure}
//           onChange={e => setTenure(e.target.value)}
//           placeholder="Enter tenure in months"
//         />
//       </div>

//       <div className="buttons">
//         <button onClick={calculateEMI}>Calculate</button>
//         <button onClick={clearFields} className="clear-btn">Clear</button>
//       </div>

//       {emi && (
//         <div className="result">
//           <h3>EMI Details</h3>
//           <p><strong>Monthly EMI:</strong> ₹{emi}</p>
//           <p><strong>Total Interest:</strong> ₹{totalInterest}</p>
//           <p><strong>Total Payment:</strong> ₹{totalPayment}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EMICalculator;
