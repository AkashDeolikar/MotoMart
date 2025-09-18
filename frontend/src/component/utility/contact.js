import React, { useState } from "react";
import "./contact.css";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 2500);
    }, 1500);
  };

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Fill out the form below.</p>
      </section>

      {/* Form */}
      <section className="contact-card">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Your Name</label>
          </div>

          <div className="form-field">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Email Address</label>
          </div>

          <div className="form-field">
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Your Message</label>
          </div>

          <button
            className={`btn ${status}`}
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Sent ✓"
              : "Send Message"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ContactForm;
