import { getAboutUser } from '@/config/redux/action/authAction';
import { getAllPosts } from '@/config/redux/action/postAction';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Dashboard = () => {


    const router=useRouter();
    const dispatch=useDispatch();
    const authState=useSelector((state)=>state.auth)


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
            dispatch(getAboutUser({token:localStorage.getItem("token")}))
        }
    },[isTokenThere])

    return (
        <div>
            {authState.profileFetched && (
            <p>Hey {authState.user.userId.name}</p>
            )}
        </div>
    );
}

export default Dashboard;
