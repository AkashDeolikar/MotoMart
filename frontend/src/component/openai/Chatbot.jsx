import React, { useState, useEffect } from "react";
import "./Chatbot.css";

// ✅ OpenAI swirl logo component
const OpenAiLogo = ({ size = 32 }) => (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 240 240"
    fill="none"
  >
    {/* Main central diamond shape */}
    <path
      d="M120 0L240 120L120 240L0 120L120 0Z"
      fill="url(#geminiGradientMain)"
    />
    <path
      d="M120 120L208.6 31.4L120 120L31.4 120L120 120Z"
      fill="url(#geminiGradientOverlay)"
    />

    {/* Text added in the middle */}
    <text
      x="120"
      y="135" 
      fontFamily="Arial, sans-serif" 
      fontSize="120" 
      // fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      AI
    </text>

    <defs>
      {/* Gradient for the main diamond */}
      <linearGradient
        id="geminiGradientMain"
        x1="120"
        y1="0"
        x2="120"
        y2="210"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#ff5858ff" /> {/* Lighter blue at the top */}
        <stop offset="1" stopColor="#731cffff" /> {/* Purple at the bottom */}
      </linearGradient>

      {/* Gradient for the overlapping diamond, creating the distinct light blue and purple segments */}
      <linearGradient
        id="geminiGradientOverlay"
        x1="120"
        y1="31.4"
        x2="120"
        y2="120"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#42f466ff" /> {/* Bright blue for the top segments */}
        <stop offset="1" stopColor="#ff0921ff" /> {/* Fading to purple */}
      </linearGradient>
    </defs>
  </svg>
);

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Toggle chatbot
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([{ sender: "bot", text: "Hello! How can I help you today?" }]);
    }
  };

  // ✅ Send message
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://motomartbackend.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.answer || "⚠️ No response from AI." },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error connecting to AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`chatbot-widget ${isOpen ? "open" : ""} ${isScrolled ? "scrolled" : ""}`}>
      <div className="chat-container">
        {/* Header */}
        <h2 className="chat-header">
          <span className="icon">
            <OpenAiLogo size={24} />
          </span>
          AI Assistant
          <button className="close-btn" onClick={toggleChat}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </h2>

        {/* Chat messages */}
        {/* <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`messageAI ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="messageAI bot-message bot-loading">
              <span className="dot dot-1"></span>
              <span className="dot dot-2"></span>
              <span className="dot dot-3"></span>
            </div>
          )}
        </div> */}
        <div className="chat-box">
  {messages.map((msg, index) => (
    <React.Fragment key={index}>
      {msg.sender === "bot" && typeof msg.text === "object" ? (
        <div className="bot-response">
          <h4>🔑 Key Points</h4>
          <ul>
            {msg.text.summary.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <h4>📋 Full Answer</h4>
          <p>{msg.text.details}</p>
        </div>
      ) : (
        <div
          className={`messageAI ${
            msg.sender === "user" ? "user-message" : "bot-message"
          }`}
        >
          {typeof msg.text === "string" ? msg.text : JSON.stringify(msg.text)}
        </div>
      )}
    </React.Fragment>
  ))}
  
  {loading && (
    <div className="messageAI bot-message bot-loading">
      <span className="dot dot-1"></span>
      <span className="dot dot-2"></span>
      <span className="dot dot-3"></span>
    </div>
  )}
</div>


        {/* Input area */}
        <div className="input-area">
          <textarea
            rows="1"
            className="textarea"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendMessage}
            disabled={loading || input.trim() === ""}
            className="btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ✅ Floating toggle button with AI logo */}
      <button className="chat-toggle-button" onClick={toggleChat}>
        <OpenAiLogo size={32} />
      </button>
    </div>
  );
}

export default Chatbot;
