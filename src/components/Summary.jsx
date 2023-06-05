import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import "../styles/chat.css";
import { getPosts } from "../api/service";
import Axios from "axios";

const Summary = () => {
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
      //console.log(req.data);
      let aidata = "";
      let count = 1;
      req.data.map(({ description }) => {
        aidata = aidata + count + ") " + description + "\n";
        count++;
      });
      setNews(aidata);
      //console.log(aidata);
    });
  }, []);

  const handleSubmit = async () => {

    // Add user message to the chat history
    
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: input, sender: "user" },
    ]);

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
            message: `Summarise each news with a title : ${news} in a new line`,
          }),
        }
      );
      const data = await response.json();
      const reply = data.choices[0].message;

      //console.log(reply.content);

      // Add bot response to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: reply.content, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(()=>{
    if(news){
      handleSubmit()
    }
  },[news])

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  return (
    <>
    
      <div className=" justify-center  items-center position-relative outline-none focus:outline-none">
        <div className="  my-6 mx-auto max-w-7xl ">
          {/*content*/}
          <div className=" border-[#161b22] border-2 rounded-lg relative flex flex-col w-full bg-[#0D1117] ">
            {/*header*/}
            <div className="animate-border bg-gradient-to-r from-[#c42525]   to-[#1b4a8d] bg-[length:400%_400%] flex items-center justify-center  h-16 p-2 border-b border-solid border-[#d7dfe7] rounded-t">
              <h3 className="text-2xl uppercase text-[#d7dfe7] font-semibold">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  NEWS HEADLINES
                </div>
              </h3>
            </div>
            {/*body*/}
            <div className="relative flex-wrap">
              <div
                ref={chatBodyRef}
                className="text-white p-10 min-h-[200px] max-h-[500px] overflow-y-auto whitespace-pre-line"
              >
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender}`}>
                    {message.content}
                  </div>
                ))}
              </div>
            </div>

            {/* <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="bg-[#0D1117] border-[#d7dfe7] border-3 text-white max-w-2xl self-center"
              />
              

                {/*footer*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
