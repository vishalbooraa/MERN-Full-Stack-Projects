import React, { useContext, useState, useEffect } from "react";
import "./Chat.css";
import { AiContext } from "./AiContext.jsx";
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"

const Chat = () => {
    const { newChat, prevChats, reply } = useContext(AiContext);
    const [latestReply,setLatestReply]=useState(null);

    // Effect for the typing animation on the latest reply
    useEffect(()=>{
        // Reset latestReply whenever the main reply changes
        if (!reply) {
            setLatestReply(null);
            return;
        }

        const content=reply.split(" ");
        let idx=0;
        
        // Use a timeout to ensure the state is clear before starting the new typing effect
        const startTyping = () => {
            const interval=setInterval(()=>{
                setLatestReply(content.slice(0,idx+1).join(" "));
                idx++;
                if(idx>=content.length) clearInterval(interval);
            },40);
            return interval;
        };

        const intervalId = startTyping();

        // Cleanup function to clear the interval when the component unmounts or dependencies change
        return () => clearInterval(intervalId);
        
    },[reply]) // Depend only on 'reply' to trigger the animation

    return (
        <>
            {newChat && <h1 className="ai-heading">Start a new chat</h1>}

            <div className="chats">
                {/* Render all messages except the very last one, which is handled by the typing effect */}
                {prevChats?.slice(0,-1).map((chat, index) => (
                    <div
                        className={chat.role === "user" ? "userDiv" : "gptDiv"}
                        key={index}
                    >
                        {chat.role === "user" ? (
                            <p className="userMessage">{chat.content}</p>
                        ) : <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                    }
                    </div>
                ))}

                {
                    // Render the typing response for the last entry in prevChats
                    prevChats.length > 0 && latestReply != null &&
                    <div className="gptDiv" key={"typing"}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                    </div>
                }
                {
                    prevChats.length > 0 && latestReply == null &&
                    <div className="gptDiv" key={"non-typing"}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                    </div>
                }
            </div>
        </>
    );
};

export default Chat;