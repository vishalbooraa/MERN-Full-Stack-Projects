import { getAboutUser } from '@/config/redux/action/authAction';
import { getAllPosts } from '@/config/redux/action/postAction';
import UserLayout from '@/layout/UserLayout';
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
        <UserLayout>
            <div className="container">
                <div className="homeContainer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>

                </div>
                <div className="feedContainer">

                </div>
                <div className="extraContainer">

                </div>
            </div>
        </UserLayout>
    );
}

export default Dashboard;
