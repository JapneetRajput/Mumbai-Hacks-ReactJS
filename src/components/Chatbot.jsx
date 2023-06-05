import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
// import "../styles/chat.css";
import { BsFillChatLeftDotsFill, BsRobot } from "react-icons/bs";
import { TbConfetti } from "react-icons/tb";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
            message: `You are a chatbot made to help with queries of the people of Mumbai. ${input}`,
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

  // const openChat = () => {
  //   setIsChatOpen(true);
  // };

  // const closeChat = () => {
  //   setIsChatOpen(false);
  // };

  return (
    <div className="chatbot" style={{ "background-color": "rgb(0 0 0 / 75%)" }}>
      <button
        className="fixed right-6 bottom-0  shadow-none text-[#d7dfe7] bg-[#1f7e30] text-lg  font-bold py-2 px-2 hover:bg-[#2ea043] rounded-xl h-16 my-4 w-24"
        onClick={() => setShowModal(true)}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BsRobot size={35} /> &nbsp;
        </div>
      </button>
      {/* <Modal
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
      </Modal> */}
      {showModal ? (
        <>
          <div className=" justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" md:w-96 my-6 mx-auto max-w-3xl fixed">
              {/*content*/}
              <div className="border-[#161b22] border-2 rounded-lg relative flex flex-col w-full bg-[#0D1117] ">
                {/*header*/}
                <div className="flex items-center justify-center  h-16 p-2 border-b border-solid border-[#d7dfe7] rounded-t">
                  <h3 className="text-xl uppercase text-[#d7dfe7] font-semibold">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <BsRobot size={25} /> &nbsp; Chat With Dhruv
                    </div>
                  </h3>
                </div>
                {/*body*/}
                <div className="relative flex-wrap">
                  <div
                    ref={chatBodyRef}
                    className="text-white p-10 min-h-[200px] max-h-[500px] overflow-y-auto"
                  >
                    {messages.map((message, index) => (
                      <div key={index} className={`message ${message.sender}`}>
                        {message.content}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chat-footer">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="bg-[#0D1117] border-[#d7dfe7] border-3 text-white"
                    />
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 ">
                  <button
                    className="shadow-none text-[#d7dfe7] bg-[#1f7e30] hover:bg-[#2ea043] font-bold py-2 px-2 m-2 rounded-md h-10 w-28  ease-linear transition-all duration-500"
                    type="submit"
                  >
                    Send
                  </button>

                  <button
                    className="shadow-none text-[#d7dfe7] bg-[#7e1f1f] hover:bg-[#a02e2e] font-bold py-2 px-2  rounded-md h-10 w-28  ease-linear transition-all duration-500"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-90 fixed inset-0 z-40 bg-gray-700"></div>
        </>
      ) : null}
    </div>
  );
};

export default Chatbot;
