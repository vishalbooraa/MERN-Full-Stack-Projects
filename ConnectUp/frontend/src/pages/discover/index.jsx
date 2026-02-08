import React, { useEffect } from 'react';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '@/config/redux/action/authAction';


const DiscoverPage = () => {
    const authState=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    useEffect(()=>{
        if(!authState.all_profiles_fetched){
            dispatch(getAllUsers())
        }
    },[authState.all_profiles_fetched])

    return (
         <UserLayout>
            <DashboardLayout>
                <h1>Discover Page</h1>
            </DashboardLayout>
        </UserLayout>
    );
}

export default DiscoverPage;
