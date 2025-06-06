import React from "react";
// , { useState } 
import "./footer.css";
// import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";

const Footer = () => {
  // const [setFormData] = useState({
  //   message: "",
  // });
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Thank you for contacting us!");
  //   setFormData({ name: "", email: "", mobile: "", message: "" });
  // };

  return (
    <footer className="footer">
      <h2 className="ProjectName">MotoMart</h2>
      <div className="footer-container">
        <div className="footer-section">
          <h5 style={{color:'Highlight'}}>Project Links</h5>
          <ul>
            <li><a href="https://github.com/AkashDeolikar/MotoMart">GitHub <i class="bi bi-github"></i></a></li>
            <li><a href="https://motomart-ten.vercel.app">Vercel Hosting <i class="bi bi-git"></i></a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5 style={{color:'Highlight'}}>Quick Links</h5>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/cardetails">Car Detail</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@MotoMart.com</p>
          <p>Phone: +91-9876543210</p>
          <p>Location: Pune, India</p>
          <FaGoogle /> <FaFacebook /> <FaInstagram />
          <form className="contact-from" onSubmit={handleSubmit}>
            <input
              name="message"
              placeholder="Your Message"
              value={FormData.message}
              rows={4}
              required
            />
            <button className="footerbtn" type="submitfooter">Send</button>
          </form>
          </div> */}
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MotoMart TrueValue. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;
