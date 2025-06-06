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
      <section className="hero">
        <h1>HelpDesk and mails</h1>
        <p>Your ultimate destination to explore cars, compare features, and find your dream ride.</p>
      </section>

      <div className="contact-container">
        <h2>Contact Us <i class="bi bi-person-rolodex"></i></h2>

        <div className="contact-info">
          <p><strong>Email:</strong> support@motomart.com</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
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

          <button type="submit"><i class="bi bi-send-check"></i></button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
