import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const Orders = () => {
  let [allOrders, setAllOrders] = useState([])
  let [error,setError]=useState("")

  


  let fetchOrders=()=>{
    axios.get("http://localhost:3002/allorders",{withCredentials:true}).then((res)=>{
      setAllOrders(res.data)
    })
    .catch((err)=>{
        const errMsg=err.response?.data.message || "something went wrong"
        setError(errMsg)
      })
  }

  useEffect(()=>{
    const socket= io("http://localhost:3002",{withCredentials:true});
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


    fetchOrders()

    socket.on("ordersUpdated",()=>{
      fetchOrders()
    })

    return ()=>{
      socket.off("ordersUpdated")
      socket.disconnect()
    }

  },[])
  return (
    <>
    {error && <p style={{color:"red"}}>{error}</p>}
    <h3 className="title">Orders({allOrders.length})</h3>
    <div className="order-table">
        <table>
          <tr>
            <th>Stock Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Mode</th>
          </tr>
          {allOrders.map((stock,index)=>{
           
            return(
            <tr key={index}>
            <td>{stock.name}</td>
            <td>{stock.price}</td>
            <td>{stock.quantity}</td>
            <td>{stock.mode}</td>
          </tr>
            )
            })}
        </table>
      </div>

    </>
  );
};

export default Orders;
