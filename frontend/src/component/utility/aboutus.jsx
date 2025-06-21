import React from "react";
import './aboutus.css';

// const Pulumi = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
//     <path
//       fill="#fff300"
//       d="M6.073 12.597c.704-.407.705-1.723.003-2.94C5.373 8.44 4.233 7.784 3.529 8.19c-.704.406-.705 1.722-.003 2.94.703 1.216 1.843 1.873 2.547 1.467zM6.077 15.202c.703 1.217.702 2.533-.002 2.94-.704.406-1.845-.25-2.547-1.468-.703-1.217-.702-2.533.002-2.94.704-.405 1.845.251 2.547 1.468zM10.875 17.976c.703 1.217.701 2.533-.003 2.94-.704.406-1.844-.251-2.547-1.468-.702-1.217-.7-2.533.003-2.94.704-.406 1.844.251 2.547 1.468zM10.873 12.431c.703 1.217.702 2.533-.002 2.94-.704.406-1.845-.251-2.547-1.468-.703-1.217-.702-2.533.002-2.94.705-.406 1.845.251 2.547 1.468z"
//     />
//     <path
//       fill="#00ff0c"
//       d="M20.471 11.132c.703-1.217.701-2.533-.003-2.94-.704-.406-1.844.251-2.546 1.468-.703 1.217-.702 2.533.002 2.94.704.406 1.845-.25 2.547-1.468zM20.471 13.737c.704.406.705 1.722.003 2.939-.703 1.217-1.843 1.874-2.547 1.467-.704-.406-.705-1.722-.003-2.94.703-1.216 1.843-1.873 2.547-1.466zM15.675 16.506c.703.406.705 1.722.002 2.94-.702 1.216-1.843 1.873-2.547 1.466-.704-.406-.705-1.722-.002-2.939.702-1.217 1.842-1.874 2.546-1.467zM15.672 10.962c.704.407.705 1.723.002 2.94-.702 1.216-1.842 1.873-2.546 1.467-.704-.407-.706-1.723-.003-2.94.703-1.216 1.843-1.873 2.547-1.467z"
//     />
//     <path
//       fill="#ff2d00"
//       d="M14.542 3.472c0 .813-1.14 1.472-2.544 1.472-1.405 0-2.545-.66-2.545-1.472 0-.813 1.14-1.472 2.545-1.472s2.544.659 2.544 1.472zM9.745 6.238c0 .813-1.139 1.472-2.544 1.472s-2.544-.659-2.544-1.472S5.796 4.766 7.2 4.766s2.544.66 2.544 1.472zM16.801 7.71c1.405 0 2.544-.659 2.544-1.472s-1.14-1.472-2.544-1.472c-1.405 0-2.545.66-2.545 1.472 0 .813 1.14 1.472 2.545 1.472zM14.542 9.01c0 .814-1.14 1.473-2.544 1.473-1.405 0-2.545-.66-2.545-1.472 0-.813 1.14-1.472 2.545-1.472s2.544.659 2.544 1.472z"
//     />
//   </svg>
// );

const Aboutus = () => {
    return (
        <section class="about-us-section">
            {/* <Pulumi width={40} height={40} /> */}
            <div class="container">
                <h1>About MotoMart</h1>
                <p>
                    <strong>MotoMart</strong> is your one-stop automotive companion platform, offering a seamless experience for exploring, comparing, and evaluating both <strong>cars and bikes</strong> across all segments—luxury, electric, commercial, budget, and performance.
                </p>

                <h2>What We Offer</h2>
                <ul>
                    <li>🔍 <strong>Quick Vehicle View</strong>: Instantly preview vehicle images, specs, and highlights for cars and bikes in a responsive, user-friendly layout.</li>
                    <li>💰 <strong>Price Information</strong>: Get accurate on-road and showroom prices with regular updates, including EMI and fuel cost breakdowns.</li>
                    <li>🧮 <strong>EMI Calculator</strong>: Plan your finances with our built-in EMI calculator, customized by interest rate, tenure, and down payment.</li>
                    <li>🛠️ <strong>Service Cost Estimator</strong>: Calculate periodic service costs based on model, usage, and service intervals.</li>
                    <li>🧪 <strong>Parts & Fluid Information</strong>: Access categorized details on essential fluids (engine oil, brake fluid, coolant, etc.) and spare parts—OEM and aftermarket options included.</li>
                    <li>⚡ <strong>EV Section</strong>: Dedicated electric segment showcasing range, charge time, and cost comparison to petrol/diesel variants.</li>
                </ul>

                <h2>🎯 Our Goal</h2>
                <p>
                    MotoMart is built to simplify vehicle exploration and ownership decisions. Whether you're a first-time buyer, enthusiast, or professional, MotoMart saves you time by bringing everything under one virtual roof.
                </p>

                <h2>🌐 Visit the Original Manufacturers</h2>
                <p>
                    We believe in transparency. All vehicle data links directly to the official manufacturer's site for more detailed brochures, configurations, and booking options.
                </p>

                <p>
                    MotoMart is your trusted digital pit stop—get informed, compare wisely, and drive confidently.
                </p>

                <a href="/" class="cta-button">Explore MotoMart</a>

                <p style={{padding:"20px"}}>
                    <strong>Creator</strong>: Akash Deolikar
                    <br/>
                    <strong>Github</strong>:  <a href="https://github.com/AkashDeolikar/MotoMart"><i class="bi bi-github"></i></a>
                </p>
            </div>
        </section>
    );
}

export default Aboutus;