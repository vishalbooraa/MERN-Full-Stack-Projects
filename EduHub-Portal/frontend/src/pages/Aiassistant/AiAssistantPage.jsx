import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import Navbar from '../navbar';
import { AiContext } from './AiContext';
import "./AiAssistantPage.css"
import { v1 as uuidv1 } from "uuid";


const AiAssistantPage = () => {
    const [prompt,setPrompt]=useState("")
    const [reply,setReply]=useState(null);
    const [currThreadId,setCurrThreadId]=useState(uuidv1())
    const [prevChats,setPrevChats]=useState([])
    const [newChat,setNewChat]=useState(true)
    const [allThreads,setAllThreads]=useState([]);

    const providerValues={
        prompt,setPrompt,
        reply,setReply,
        currThreadId,setCurrThreadId,
        prevChats,setPrevChats,
        newChat,setNewChat,
        allThreads,setAllThreads
    };
    return (
        <>
        <Navbar/>
        <div className='ai-main'>
            <AiContext.Provider value={providerValues}>
            <Sidebar/>
            <ChatWindow/>
            </AiContext.Provider>
        </div>
        </>
    );
}

export default AiAssistantPage;
