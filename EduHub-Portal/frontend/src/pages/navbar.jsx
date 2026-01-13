import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user,setUser }=useAuth()

  const handleLogout = async() => {
    try{
      await axios.get("http://localhost:8000/user/logout",{withCredentials:true})
      setUser(null)
      navigate("/auth");
    }catch(err){
      console.log(err)
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">📘EduHub</h2>
      </div>

      {/* Hamburger icon (only mobile) */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navbar links */}
      <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
        <p className="nav-link" onClick={() => navigate("/home")}>Home</p>
        <p className="nav-link" onClick={() => navigate("/noticeboard")}>Noticeboard</p>
        <p className="nav-link" onClick={() => navigate("/schedule")}>Schedule</p>
        <p className="nav-link" onClick={() => navigate("/about")}>About</p>
        <p className="nav-link" onClick={handleLogout}>Logout</p>
        <p className="nav-link">👤 Hii {user.name}!!</p>
      </div>
    </nav>
  );
};

export default Navbar;
