import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
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
    <>
      {/* --- SEO and Metadata (Helmet) - See next section for details --- */}
      <Helmet>
        <title>EMI Calculator - Calculate Car, Home & Personal Loan EMIs Instantly | MotoMart</title>
        <meta name="description" content="Calculate your monthly Equated Monthly Installment (EMI) for car, home, and personal loans with MotoMart's accurate and easy-to-use EMI calculator. Get detailed amortization schedules and repayment breakdowns." />
        <meta name="keywords" content="EMI Calculator, Loan EMI, Car Loan EMI, Home Loan EMI, Personal Loan EMI, Interest Rate Calculator, Loan Repayment Schedule, Financial Planning Tool, MotoMart Finance" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://motomart-ten.vercel.app/emicalculator" />

        {/* Open Graph Tags for Social Sharing */}
        <meta property="og:title" content="EMI Calculator - Calculate Your Loan EMIs with MotoMart" />
        <meta property="og:description" content="Get instant and accurate EMI calculations for car, home, and personal loans. Plan your finances with MotoMart's comprehensive EMI tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://motomart-ten.vercel.app/emicalculator" />
        <meta property="og:image" content="https://motomart-ten.vercel.app/images/motomart-emi-calculator-social.jpg" /> {/* Ensure this image exists and is optimized */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="MotoMart Online EMI Calculator" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MotoMartOfficial" /> {/* Replace with your actual Twitter handle */}
        <meta name="twitter:title" content="EMI Calculator - MotoMart" />
        <meta name="twitter:description" content="Calculate your loan EMIs instantly for car, home & personal loans with MotoMart's easy-to-use tool. Plan your repayment confidently." />
        <meta name="twitter:image" content="https://motomart-ten.vercel.app/images/motomart-emi-calculator-social.jpg" />

        {/* Structured Data (JSON-LD) for enhanced SEO and rich snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["WebPage", "FinancialProduct", "Calculator"],
            "name": "EMI Calculator by MotoMart",
            "url": "https://motomart-ten.vercel.app/emicalculator",
            "description": "MotoMart's comprehensive online EMI calculator for estimating monthly payments on car loans, home loans, and personal loans. Includes full amortization schedule and detailed repayment breakdown.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://motomart-ten.vercel.app/emicalculator"
            },
            "author": {
              "@type": "Organization",
              "name": "MotoMart",
              "url": "https://motomart-ten.vercel.app/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://motomart-ten.vercel.app/images/motomart-logo.png"
              }
            },
            "publisher": {
              "@type": "Organization",
              "name": "MotoMart",
              "url": "https://motomart-ten.vercel.app/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://motomart-ten.vercel.app/images/motomart-logo.png"
              },
              "sameAs": [
                "https://facebook.com/MotoMartOfficial",
                "https://twitter.com/MotoMartOfficial",
                "https://linkedin.com/company/motomart"
              ]
            },
            "offers": {
              "@type": "Offer",
              "name": "Free Online EMI Calculator",
              "price": "0",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            },
            "applicationCategory": "https://schema.org/FinanceApplication",
            "operatingSystem": "All",
            "featureList": [
              "Instant EMI calculation for various loan types",
              "Generates detailed month-wise amortization schedule",
              "Estimates total interest payable and total payment",
              "User-friendly and responsive interface",
              "Supports custom loan amounts, interest rates, and tenures"
            ],
            "tool": {
              "@type": "SoftwareApplication",
              "name": "MotoMart EMI Calculator",
              "operatingSystem": "All",
              "url": "https://motomart-ten.vercel.app/emicalculator",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "reviewCount": "250"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="emi-container">
        <h1 className='EMI'>EMI Calculator</h1>
        <h2 className="description">
          Easily calculate car, home or personal loan EMIs with accurate breakdowns.
        </h2>
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
            <h2>Your EMI Summary & Loan Breakdown</h2>
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
    </>
  );
};

export default EMICalculator;
