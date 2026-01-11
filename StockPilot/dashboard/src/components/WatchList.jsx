import React,{ useState, useContext,useEffect} from "react";
import { Tooltip, Grow } from "@mui/material";
import {BarChartOutlined, KeyboardArrowDown,KeyboardArrowUp, MoreHoriz} from "@mui/icons-material"
import {GeneralContext} from "./GeneralContext";
import axios from 'axios';
import { DoughnutChart } from "./DoughnutChart";
import { io } from "socket.io-client";



const WatchList = () => {

   let [allWatchLists,setALLWatchLists]=useState([])
   let [error,setError]=useState("")


   let fetchWatchList=()=>{
        axios.get("http://localhost:3002/allwatchlists",{withCredentials:true}).then((res)=>{
        setALLWatchLists(res.data)
      })
      .catch((err)=>{
        const errMsg=err.response?.data.message || "something went wrong"
        setError(errMsg)
      })
   }
    useEffect(()=>{
      const socket=io("http://localhost:3002",{withCredentials:true});
      axios.get("http://localhost:3002/getuser",{withCredentials:true}).then((res)=>{
      console.log(res)
      const userId=res.data.user._id;
      socket.emit("join-room",userId);
      
      }).catch((error)=>{
      if(error){
        const errorMsg=error.response?.data?.message || "Something went wrong"
        setError(errorMsg)
        }
      })

      fetchWatchList()
      socket.on("watchlistUpdated",()=>{
        fetchWatchList()
      })

      return ()=>{
        socket.off("watchlistUpdated")
        socket.disconnect()
      }
      
    },[])


  const data = {
  labels: allWatchLists.map((item)=>item.name),
  datasets: [
    {
      label: 'Price',
      data: allWatchLists.map((stock)=>stock.price),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

  return (
    <div className="watchlist-container">
      {error && <p style={{color:"red"}}>{error}</p>}
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {allWatchLists.length}/ 50</span>
      </div>

      <ul className="list">
        {allWatchLists.map((stock,index)=>{
          return(
            <WatchListItem stock={stock} key={index} />
          )
        })}
      </ul>
      <DoughnutChart data={data}/>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) =>{
  const [showWatchListAction, setShowWatchListItem]= useState(false)

  const handleMouseEnter=()=>{
    setShowWatchListItem(true)
  }
  const handleMouseLeave=()=>{
    setShowWatchListItem(false)
 }
 return(
  <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
            <p className={stock.isDown? "down" : "up"}>{stock.name}</p>
            <div className="itemInfo">
                <span className="percent">{stock.percent}</span>
                {stock.isDown ? (
                  <KeyboardArrowDown className="down"/>) : (<KeyboardArrowUp className="up"/>)}
                <span className="price">{stock.price}</span>
            </div>
      </div>
      {showWatchListAction && <WatchListAction uuid={stock.name} />}
  </li>
 )
}


const WatchListAction=({uuid})=>{
  const context = useContext(GeneralContext);
  let [error,setError]=useState("")
  const handleBuyClick = () => {
    context.openBuyWindow(uuid);
  };

  const handleSellClick=async()=>{
    try{
    axios.delete("http://localhost:3002/sellorder",{withCredentials:true,
      data:{  name:uuid,
              mode:"SELL"
      }
    })
      }
catch(error){
      if(error){
        const errMsg=error.response?.data?.message || "Something went Wrong";
        setError(errMsg)      
      }
  }
}


  return(
    <span className="actions">
      {error && <p className="error">{error}</p>}
      <span>
        <Tooltip
         title="Buy(B)"
         placement="top"
         arrow
         TransitionComponent={Grow}
         >
        <button className="buy" onClick={handleBuyClick}>Buy</button>
        </Tooltip>
        <Tooltip
         title="Sell(S)"
         placement="top"
         arrow
         TransitionComponent={Grow}
         >
        <button className="sell" onClick={handleSellClick}>Sell</button>
        </Tooltip>
        <Tooltip
         title="Analytic(A)"
         placement="top"
         arrow
         TransitionComponent={Grow}
         >
        <button className="action">
            <BarChartOutlined className="icon"/>
        </button>
        </Tooltip>
        <Tooltip
         title="More(M)"
         placement="top"
         arrow
         TransitionComponent={Grow}
         >
        <button className="action">
            <MoreHoriz className="icon"/>
        </button>
        </Tooltip>
      </span>
    </span>
  )
}
