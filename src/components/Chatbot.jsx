import React, { useState } from "react";
import "../assets/css/chatbot.css";
import { useChatSession, useChatMessages, useFAQ, useChatVisibility } from "../hooks/useChatHook";

const RENDER_URL = "https://chatbot-app-uxs8.onrender.com";

function Chatbot() {
  const { getSessionId } = useChatSession();
  const { messages, appendMessage, sendMessage, loading, chatWindowRef } = useChatMessages();
  const { faqs, faqContainerRef, handleFAQWheel } = useFAQ(RENDER_URL);
  const { chatVisible, openChat, closeChat } = useChatVisibility();
  const [userInput, setUserInput] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(userInput, getSessionId, RENDER_URL);
    setUserInput("");
  };

  const handleFAQClick = (question) => {
    setUserInput(question);
    setTimeout(() => sendMessage(question, getSessionId, RENDER_URL), 100);
    setTimeout(() => setUserInput(""), 200);
  };

  return (
    <>
      <div id="chat-bubble" onClick={() => openChat(appendMessage)}>💬</div>

      <div id="chatbot" className={chatVisible ? "show" : "hidden"}>
        <div id="chat-header">
          <h3>Library Assistant</h3>
          <button id="close-btn" onClick={closeChat}>&times;</button>
        </div>

        <div id="chat-window" ref={chatWindowRef} className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
          ))}
        </div>

        <div className="faq">
          <div
            id="faq-buttons"
            ref={faqContainerRef}
            onWheel={handleFAQWheel}
            className="faq-container"
          >
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-button" onClick={() => handleFAQClick(faq.question)}>
                {faq.question}
              </div>
            ))}
          </div>
        </div>

        <form id="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="user-input"
            placeholder="Ask me about books..."
            autoComplete="off"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" id="send-btn" disabled={loading}>Send</button>
        </form>
      </div>
    </>
  );
}

export default Chatbot;
