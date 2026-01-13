import React, { useContext,useState,useEffect } from "react";
import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { AiContext } from "./AiContext.jsx";
import axios from "axios";
import {RingLoader} from "react-spinners";

const ChatWindow = () => {
  // ✅ Fix: removed extra closing brace that caused syntax error
  const { prompt, setPrompt, reply, setReply, currThreadId,prevChats,setPrevChats,setNewChat } = useContext(AiContext);
  const [loading,setLoading]=useState(false)
  const getReply = async () => {
    setLoading(true)
    setNewChat(false)
    try {
      const response = await axios.post(
        "http://localhost:8000/ai/chat",
        {
          message: prompt,
          threadId: currThreadId,
        },
        { withCredentials: true }
      );
      console.log(response.data.reply);
      setReply(response.data.reply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  };

  useEffect(()=>{
    if(prompt && reply){
      setPrevChats(prevChats=>{
        return [...prevChats,{
          role:"user",
          content:prompt
        },{
          role:"assistant",
          content:reply
        }]
      })
    }
    setPrompt("");
  },[reply])
  return (
    <div className="chatWindow">
      <div className="ai-navbar">
        <span>AI Assistant</span>
      </div>

      <Chat />
      <div className="loader-container">
          <RingLoader color="#2c74b3" loading={loading} />
      </div>

      <div className="chatInput">
        <div className="inputBox">
          <textarea
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); 
                getReply();
              }
            }}
          ></textarea>

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">
          AI Assistant can make mistakes. Check important info. See cookie
          preferences.
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
