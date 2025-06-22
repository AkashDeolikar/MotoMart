import React, {useEffect} from "react";
import './aboutus.css';

const Aboutus = () => {
    useEffect(() => {
    // Tell parent page that Aboutus has finished loading
    localStorage.setItem("aboutusReady", "true");
  }, []);
    return (
        <section class="about-us-section">
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