import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate()
    let [formData,setFormData]=useState({
        username:"",
        password:""
    })
    let [error,setError]=useState("")
    let handleInputChange=(event)=>{
        let name=event.target.name;
        let value=event.target.value;

        setFormData((currData)=>{
            currData[name]=value
            return {...currData}
        })
        }
    let handleFormSubmit=async(event)=>{
        event.preventDefault();
        try{
            await axios.post("http://localhost:3002/login",formData,{withCredentials:true})
            setFormData({
            username:"",
            password:""
            })
            navigate("/")
        }
        catch(error){
            const errMsg=error.response?.data?.message || "something went wrong";
            setError(errMsg)
        }
        }
    
    return (
        <div className='log-in-container'>
            <h1>Login</h1>
            {error && <p style={{color:"red"}}>{error}</p>}
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username:</label><br/>
                <input className='login-input' placeholder='enter username' type="text" name="username" id='username' onChange={handleInputChange} value={formData.username} />
                <br/>
                <label htmlFor='pass'>Password:</label><br/>
                <input className='login-input' placeholder='enter password' id="pass" type="password" name="password" onChange={handleInputChange} value={formData.password} />
                <br/>
                <button className='login-btn' type='submit'>Submit</button>
                <p className='login-para'>Don't have an account? <Link to="/signup" className='login-link'>Ctreate Account</Link></p>
            </form>
        </div>
    );
}

export default Login;
