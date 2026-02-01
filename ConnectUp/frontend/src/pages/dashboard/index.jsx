import { getAllPosts } from '@/config/redux/action/postAction';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
    const router=useRouter();
    const dispatch=useDispatch();
    const [isTokenThere,setIsTokenThere]=useState(false)

    useEffect(()=>{
        if(localStorage.getItem("token")===null){
            router.push("/login")
        }
        setIsTokenThere(true)
    })

    useEffect(()=>{
        if(isTokenThere){
            dispatch(getAllPosts())
        }
    },[isTokenThere])

    return (
        <div>
            <p>Dashboard</p>
        </div>
    );
}

export default Dashboard;
