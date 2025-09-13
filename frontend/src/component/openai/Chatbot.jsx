import React, { useState, useEffect, useRef, memo } from "react";
import "./Chatbot.css";

// Memoized logo component to prevent unnecessary re-renders.
const Logo = memo(({ src, size = 40, alt = "AI Logo" }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    style={{ display: "block" , borderRadius: "50px"}}
  />
));

// A dedicated component for rendering a single message.
const Message = ({ sender, text }) => (
  <div className={`messageAI ${sender === "user" ? "user-message" : "bot-message"}`}>
    {text}
  </div>
);

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const chatBoxRef = useRef(null);

  const logos = [
    { src: "https://storage.googleapis.com/ai-prod-wagtail/images/ai_google__models__icon__gemini.original.svg", alt: "Gemini Logo" },
    { src: "https://storage.googleapis.com/ai-prod-wagtail/images/ai_google__models__icon__gemma.original.svg", alt: "Gemma Logo" },
    { src: "https://storage.googleapis.com/ai-prod-wagtail/images/ai_google__models__icon__lyria.original.svg", alt: "Lyria Logo" },
    { src: "https://storage.googleapis.com/ai-prod-wagtail/images/ai_google__models__icon__veo.original.svg", alt: "Veo Logo" }
  ];

  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  // Rotate logos every 2 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex(prevIndex => (prevIndex + 1) % logos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [logos.length]);

  // Auto-scrolls the chat box to the bottom whenever messages or loading state changes.
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Tracks window scroll to apply styling to the chatbot widget.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggles the chatbot's open/close state.
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([{ sender: "bot", text: "Hello! How can I help you today?" }]);
    }
  };

  // Handles sending a new message to the backend API.
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://motomartbackend.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.answer || "⚠️ No response from AI." },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "❌ Error connecting to AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handles 'Enter' key press to send the message.
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentLogo = logos[currentLogoIndex];

  return (
    <div className={`chatbot-widget ${isOpen ? "open" : ""} ${isScrolled ? "scrolled" : ""}`}>
      <div className="chat-container">
        {/* Header Section */}
        <h2 className="chat-header">
          <span className="icon" role="img" aria-label="AI Logo">
            <Logo src={currentLogo.src} size={30} alt={currentLogo.alt} />
          </span>
          AI Assistant
          <button className="close-btn" onClick={toggleChat} aria-label="Close Chatbot">
            ✖
          </button>
        </h2>

        {/* Chat Messages Section */}
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender} text={msg.text} />
          ))}
          {loading && (
            <div className="messageAI bot-message bot-loading">
              <span className="dot dot-1"></span>
              <span className="dot dot-2"></span>
              <span className="dot dot-3"></span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <textarea
            rows="1"
            className="textarea"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || input.trim() === ""}
            className="btn"
            aria-label="Send Message"
          >
            ➤
          </button>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button className="chat-toggle-button" onClick={toggleChat} aria-label="Open Chatbot">
        <Logo src={currentLogo.src} size={32} alt={currentLogo.alt} />
      </button>
    </div>
  );
}

export default Chatbot;