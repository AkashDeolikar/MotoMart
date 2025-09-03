import React, { useState } from "react";
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); 
  // idle | sending | sent
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("sending"); // show loading effect

    try {
      const response = await fetch("https://motomartbackend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("sent"); 
        setFormData({ name: "", email: "", mobile: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000); // reset after 3s
      } else {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("idle");
      }
    } catch (err) {
      setErrorMsg("Failed to send feedback. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="home-container">
      <div className="contactBG">
        <div className="hero-text">
          <h2>Contact Us <i className="bi bi-person-rolodex"></i></h2>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <p><strong>Fill the form below to get in touch</strong></p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="mobile" placeholder="Mobile Number" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows={4} required />

          {/* <button
            type="submit"
            className={`status-btn ${status}`}
            disabled={status === "sending"} // disable while sending
          >
            {status === "sending" && (
              <span className="spinner"></span>
            )}
            {status === "idle" && (
              <>
                <i className="bi bi-send" style={{ marginRight: "8px" }}></i>
                Send Message
              </>
            )}
            {status === "sending" && " Sending..."}
            {status === "sent" && (
              <>
                <i className="bi bi-send-check" style={{ marginRight: "8px" }}></i>
                Message Sent Successfully!
              </>
            )}
          </button> */}
          <button 
  type="submit" 
  className={`contact-form-button ${status}`} 
  disabled={status === "sending"}
>
  <span>
    {status === "idle" && "Send Message"}
    {status === "sending" && "Sending..."}
    {status === "sent" && "Message Sent ✅"}
  </span>
</button>


          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
