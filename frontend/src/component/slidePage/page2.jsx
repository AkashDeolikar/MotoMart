import React from "react";
import './page2.css';

const Page1 = () => {
  return (
    <div className="B1Page2">
      <div className="bgPaper2">
        <h5>Future of Mobility</h5>
        <h1>
          Safer<i className="bi bi-chevron-double-right"></i>Smarter<i className="bi bi-chevron-double-right"></i>Greener
        </h1>
      </div>

      <div className="ConstantBG">
        <div className="T2Page">
          <h2 className="constantBGT2page">WELCOME TO THE FUTURE</h2>
          <h3 className="constantBGT2page">HUMAN-CENTRIC, SMART & GREEN</h3>

          {/* Block 1: Image on Right */}
          <div className="drop-flex2">
            <div className="drop-text2">
              <p>
                Customers today demand more than just transportation—they want
                intelligent, efficient, and sustainable vehicles that reflect
                their lifestyle and values.
              </p>
              <p>
                We're building next-gen solutions with advanced aerodynamics,
                recyclable materials, and battery technologies that are safe,
                durable, and efficient.
              </p>
              <p>
                From hydrogen combustion to AI-integrated dashboards, our
                engineering pushes toward a carbon-neutral tomorrow with zero
                compromise on performance.
              </p>
            </div>
            <div className="drop-image2">
              <img
                src="https://www.tatamotors.com/wp-content/themes/TataMotors/images/welcome-to-1.png"
                alt="Design Illustration"
              />
            </div>
          </div>

          {/* Block 2: Image on Left */}
          <div className="drop-flex2 reverse">
            <div className="drop-text2">
              <p>
                We're reshaping the mobility ecosystem with embedded software,
                cloud-powered analytics, and real-time connected diagnostics
                across our fleet.
              </p>
              <p>
                With initiatives like predictive maintenance and driver-assist
                AI, we make mobility safer, more enjoyable, and deeply
                personalized for every user.
              </p>
              <p>
                Our roadmap to Net Zero by 2045 includes circular
                manufacturing, clean energy sourcing, and global R&D hubs
                dedicated to sustainable innovation.
              </p>
            </div>
            <div className="drop-image2">
              <img
                src="https://www.tatamotors.com/wp-content/themes/TataMotors/images/welcome-to-2.png"
                alt="Design Illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
