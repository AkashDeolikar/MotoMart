// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef, memo } from "react";
import "./Chatbot.css";

// Gemini Aurora Logo
const GEMINI_LOGO =
  "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg";

// Memoized Logo component
const Logo = memo(({ src, size = 40, alt = "Gemini Logo" }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    style={{ display: "block", borderRadius: "50%" }}
  />
));

// Message component with expandable replies
const Message = ({ sender, text }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 350;

  return (
    <div className={`message-row ${sender}`}>
      {sender === "bot" && (
        <div className="avatar">
          <Logo src={GEMINI_LOGO} size={28} />
        </div>
      )}
      <div className={`bubble ${sender}`}>
        {isLong ? (
          <>
            <p>{expanded ? text : text.slice(0, 300) + "..."}</p>
            <button
              className="expand-btnGemini"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          </>
        ) : (
          <p>{text}</p>
        )}
      </div>
    </div>
  );
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Toggle chat open/close
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "👋 Hi, I’m Gemini. How can I help you today?",
        },
      ]);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

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
      const botReply = data.answer || "❌ No response from Gemini";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error connecting to Gemini." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`chatbot-widget ${isOpen ? "open" : ""}`}>
      <div className="chat-container">
        {/* Header */}
        <header className="chat-header">
          <div className="header-left">
            <Logo src={GEMINI_LOGO} size={28} />
            <span>Gemini</span>
          </div>
          <button className="close-btnGemini" onClick={toggleChat}>
            ✖
          </button>
        </header>

        {/* Messages */}
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, i) => (
            <Message key={i} sender={msg.sender} text={msg.text} />
          ))}

          {/* Loading typing dots */}
          {loading && (
            <div className="message-row bot">
              <div className="avatar">
                <Logo src={GEMINI_LOGO} size={28} />
              </div>
              <div className="bot-loading">
                <div className="dot"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <textarea
            rows="1"
            className="textarea"
            placeholder="Ask Gemini anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="btnGemini"
          >
            ➤
          </button>
        </div>

        {/* Quick Action Chips */}
        <div className="quick-actions">
          <button onClick={() => setInput("Summarize this")}>Summarize</button>
          <button onClick={() => setInput("Give sources")}>Give Sources</button>
          <button onClick={() => setInput("Explain simply")}>Explain Simply</button>
        </div>
      </div>

      {/* Floating FAB */}
      {!isOpen && (
        <button className="chat-toggle-button gemini-fab" onClick={toggleChat}>
          <Logo src={GEMINI_LOGO} size={48} />
        </button>
      )}
    </div>
  );
}

export default Chatbot;
