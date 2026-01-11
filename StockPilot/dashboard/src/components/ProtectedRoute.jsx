import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ProtectedRoute=({children})=>{
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:3002/verify",{withCredentials:true}).then((res)=>{
            if(!res.data.success){
                navigate('/login')
            }
        })
        .catch((err)=>{
            navigate('/login')
        })
    },[navigate])
    return children
}

export default ProtectedRoute;