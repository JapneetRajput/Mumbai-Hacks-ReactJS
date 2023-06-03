import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import "../styles/chat.css";
import { getPosts } from "../api/service";
import Axios from "axios";

const Summary = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);
  const [news, setNews] = useState("");

  let token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: token,
    },
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const arr = new Array();

  useEffect(() => {
    getPosts().then((req, res) => {
      console.log(req.data);
      let aidata = "";
      let count = 1;
      req.data.map(({ description }) => {
        aidata = aidata + count + ". " + description + "\n";
        count++;
      });
      setNews(aidata);
      console.log(aidata);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add user message to the chat history
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: input, sender: "user" },
    ]);
    setInput("");

    try {
      // Send user message to the API to generate a response
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Summarise each news description in single line with a title : ${news}`,
          }),
        }
      );
      const data = await response.json();
      const reply = data.choices[0].message;

      console.log(reply.content);

      // Add bot response to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: reply.content, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="chatbot">
      <button className="chat-button" onClick={openChat}>
        <img src="chat-icon.png" alt="Chat" className="chat-icon" />
      </button>
      <Modal
        isOpen={isChatOpen}
        onRequestClose={closeChat}
        className="chat-modal"
      >
        <div className="chat-container">
          <div className="chat-header">
            <button className="close-button" onClick={closeChat}>
              X
            </button>
            Chatbot
          </div>
          <div ref={chatBodyRef} className="chat-body">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.content}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Summary;
