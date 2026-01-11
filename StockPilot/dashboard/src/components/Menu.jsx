import React,{ useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Menu= ()=>{
  const navigate=useNavigate()
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropDownOpen,setisProfileDRopDownOpen]= useState(false)
  let [error,setError]=useState("")
  let [user, setUser] = useState({});

  const handleMenuClick= (index)=>{
    setSelectedMenu(index)
  }

  const handleProfileClick= ()=>{
    setisProfileDRopDownOpen(!isProfileDropDownOpen)
  }
  
  const handleLogout=async()=>{
    try{
    await axios.get("http://localhost:3002/logout",{withCredentials:true})
    navigate("/login")
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    axios.get("http://localhost:3002/getuser",{withCredentials:true}).then((res)=>{
      console.log(res)
      setUser(res.data.user)
    }).catch((error)=>{
      if(error){
        const errorMsg=error.response?.data?.message || "Something went wrong"
        setError(errorMsg)
      }
    })
  },[])
  const menuClass="menu";
  const activeMenuClass="menu selected";



  return (
    <div className="menu-container">
      <img src="logo.png" alt="logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          {error && <li><p style={{color:"red"}}>{error}</p></li>}
          
          <li>
          <Link
          style={{textDecoration:"none"}} to="/" onClick={()=>handleMenuClick(0)}>
            <p className={selectedMenu===0? activeMenuClass : menuClass}>Dashboard</p>
          </Link>
          </li>
          
          <li>
          <Link
          style={{textDecoration:"none"}} to="/orders" onClick={()=>handleMenuClick(1)}>
            <p className={selectedMenu===1? activeMenuClass : menuClass}>Orders</p>
          </Link>
          </li>
          <li>
          <Link
          style={{textDecoration:"none"}} to="/holdings" onClick={()=>handleMenuClick(2)}>
            <p className={selectedMenu===2? activeMenuClass : menuClass}>Holdings</p>
          </Link>
          </li>
          <li>
          <Link
          style={{textDecoration:"none"}} to="/positions" onClick={()=>handleMenuClick(3)}>
            <p className={selectedMenu===3? activeMenuClass : menuClass}>Positions</p>
          </Link>
          </li>
          <li>
          <Link
          style={{textDecoration:"none"}} to="/funds" onClick={()=>handleMenuClick(4)}>
            <p className={selectedMenu===4? activeMenuClass : menuClass}>Funds</p>
          </Link>
          </li>
          <li>
          <Link
          style={{textDecoration:"none"}} to="/apps" onClick={()=>handleMenuClick(5)}>
            <p className={selectedMenu===5? activeMenuClass : menuClass}>Apps</p>
          </Link>
          </li>
          <li onClick={handleLogout} style={{cursor:"pointer"}}><p className="menu">Log Out</p></li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">SP</div>
          <p className="username">{user?.username || "User"}</p>
        </div>
      </div>
    </div>
  );
};


export default Menu;
