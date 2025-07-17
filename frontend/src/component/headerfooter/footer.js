import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="ProjectName">MotoMart</h2>
      <div className="Xp8JS"></div>

      <div className="footer-container">
        <div className="footer-section">
          <h5 style={{ color: 'Highlight' }}>Project Links</h5>
          <ul>
            <li><a href="https://github.com/AkashDeolikar/MotoMart" target="_blank">GitHub <i className="bi bi-github"></i></a></li>
            <li><a href="https://motomart-ten.vercel.app" target="_blank">Vercel Hosting <i className="bi bi-git"></i></a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5 style={{ color: 'Highlight' }}>Quick Links</h5>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/cardetails">Car Detail</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MotoMart TrueValue. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
