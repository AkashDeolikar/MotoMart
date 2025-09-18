import React from "react";
import { Link } from "react-router-dom";
import "./pages.css";

const Page4 = () => {
  return (
    <div className="page4-root">
      {/* Hero CTA */}
      <section className="page4-cta">
        <h1>Join Us in Building Smarter Mobility</h1>
        <p>
          Together, we can transform transportation with intelligent,
          sustainable, and people-first solutions.
        </p>
        <Link to="/contact" className="page4-btn">
          Contact Our Team
        </Link>
      </section>

      {/* Why Partner With Us */}
      <section className="page4-benefits">
        <h2>Why Partner With Us?</h2>
        <div className="page4-benefits-grid">
          {[
            {
              icon: "lightbulb",
              title: "Innovation",
              desc: "Cutting-edge AI and IoT technologies tailored for smarter cities.",
            },
            {
              icon: "eco",
              title: "Sustainability",
              desc: "Green mobility solutions that reduce emissions and promote clean energy.",
            },
            {
              icon: "groups",
              title: "Collaboration",
              desc: "Trusted partnerships with governments, industries, and communities.",
            },
            {
              icon: "security",
              title: "Safety & Trust",
              desc: "Reliable systems designed to protect people and infrastructure.",
            },
          ].map((item, idx) => (
            <div key={idx} className="page4-card">
              <span className="material-symbols-outlined page4-icon">
                {item.icon}
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources / Insights */}
      <section className="page4-resources">
        <h2>Explore Our Insights</h2>
        <div className="page4-resources-grid">
          {[
            {
              title: "Smart Mobility Report 2025",
              desc: "Discover trends shaping the future of transportation worldwide.",
              link: "#",
            },
            {
              title: "EV Infrastructure Guide",
              desc: "How cities can accelerate EV adoption with robust charging networks.",
              link: "#",
            },
            {
              title: "AI for Road Safety",
              desc: "A deep dive into accident prevention through predictive analytics.",
              link: "#",
            },
          ].map((item, idx) => (
            <a key={idx} href={item.link} className="page4-resource-card">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section className="page4-support">
        <h2>Need Help?</h2>
        <p>
          Our experts are here to assist you with mobility solutions, project
          partnerships, and technology insights.
        </p>
        <Link to="/contact" className="page4-btn">
          Talk to Support
        </Link>
      </section>

      {/* Final CTA */}
      <section className="page4-final-cta">
        <h2>Ready to Get Started?</h2>
        <p>
          Let’s work together to create safe, sustainable, and connected
          mobility solutions for the future.
        </p>
        <Link to="/contact" className="page4-btn">
          Get in Touch
        </Link>
      </section>
    </div>
  );
};

export default Page4;
