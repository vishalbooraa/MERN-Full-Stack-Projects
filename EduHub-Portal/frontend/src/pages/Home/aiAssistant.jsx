import React from "react";
import "./aiAssistant.css";
import { useNavigate } from "react-router-dom";

const AiAssistant = () => {
  const navigate=useNavigate()
  return (
    <div className="ai-wrapper">
      <h1 className="ai-title">Chat with AI Assistant</h1>

      <div className="ai-container">
        <div className="ai-left">
          <img src="/ai.jpg" alt="AI Assistant" className="ai-image" />
        </div>

        <div className="ai-right">
          <p className="ai-desc">
            Have questions or need instant help? Chat with our AI Assistant to
            get study tips, campus info, and more — anytime, anywhere.
          </p>

          <div className="ai-buttons">
            <button className="ai-btn chat-btn" onClick={()=>navigate("/aiassistant")}>Start Chat</button>
            <button className="ai-btn guide-btn">AI Study Guide</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
