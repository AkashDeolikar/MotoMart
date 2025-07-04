import React, { useState } from "react";
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Failed to send feedback. Please try again.");
    }
  };

  return (
    <div className="home-container">
      {/* Background Section */}
      <div className="contactBG">
        <div className="hero-text">
          <h2>Contact Us <i className="bi bi-person-rolodex"></i></h2>
        </div>
      </div>

      {/* Form Section */}
      <div className="contact-container">
        <div className="contact-info">
          <p><strong>Fill the details</strong></p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            pattern="[0-9]{10}"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
          />

          <button type="submit"><i className="bi bi-send-check"></i></button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
