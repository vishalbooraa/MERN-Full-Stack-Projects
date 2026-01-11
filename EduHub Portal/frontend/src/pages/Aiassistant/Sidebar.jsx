import React, { useEffect, useContext } from 'react';
import "./Sidebar.css";
import { AiContext } from './AiContext';
import axios from 'axios';
import { v1 as uuidv1 } from "uuid";

const Sidebar = () => {
    const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(AiContext);

    const getAllThreads = async () => {
        try {
            const response = await axios.get("http://localhost:8000/ai/threads", { withCredentials: true });
            const filteredData = response.data.map(thread => ({
                threadId: thread.threadId,
                title: thread.title
            }));
            // console.log(filteredData);
            setAllThreads(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    };

    const changeThread= async(newThreadId)=>{
        setCurrThreadId(newThreadId)
        try{
            const response = await axios.get(`http://localhost:8000/ai/thread/${newThreadId}`, { withCredentials: true });
            console.log(response.data)
            setPrevChats(response.data)
            setNewChat(false)
            setReply(null);
        }catch(err){
            console.log(err)
        }
    }

    const deleteThread=async(newThreadId)=>{
        try{
            const response = await axios.delete(`http://localhost:8000/ai/thread/${newThreadId}`, { withCredentials: true });
            console.log(response)
            setAllThreads((prev)=>prev.filter(thread=>thread.threadId != newThreadId))
            if(currThreadId===newThreadId){
                createNewChat();
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <section className='sidebar'>
            <button className='ai-button' onClick={createNewChat}>
                <img src='ai.jpg' className='ai-logo' alt='ai-logo' />
                <span><i className="fa-solid fa-pen-to-square ai-icon"></i></span>
            </button>

            <ul className='ai-history'>
                {allThreads?.map((thread) => (
                    <li key={thread.threadId} onClick={()=>changeThread(thread.threadId)}>
                        {thread.title}
                        <i class="fa-solid fa-trash" onClick={(e)=>{
                            e.stopPropagation();
                            deleteThread(thread.threadId)
                        }}></i>
                    </li>
                ))}
            </ul>

            <div className='sign'>
                <p>By EduHub &hearts;</p>
            </div>
        </section>
    );
};

export default Sidebar;
