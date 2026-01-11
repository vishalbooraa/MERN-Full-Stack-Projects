import React, {useState,useEffect} from "react";
// import { holdings} from "../data/data"

import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { io } from "socket.io-client";




const Holdings = () => {
  let [allHoldings,setAllHoldings]=useState([])
  let [error,setError]=useState("")

  let fetchHoldings=()=>{
    axios.get("http://localhost:3002/allholdings",{withCredentials:true}).then((res)=>{
      setAllHoldings(res.data)
    })
    .catch((err)=>{
      const errMsg=err.response?.data?.message || "Something Went Wrong"
      setError(errMsg)
    })
  }

  useEffect(()=>{
    const socket=io("http://localhost:3002",{withCredentials:true})
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

    fetchHoldings();

    socket.on("holdingsUpdated",()=>{
      fetchHoldings();
    })

    return ()=>{
      socket.off("holdingsUpdated")
      socket.disconnect()
    }


    
  },[])

  const labels= allHoldings.map((holding)=>holding.name)

  const data={
    labels,
    datasets:[
      {
      label:'Stock Price',
      data:allHoldings.map((holding)=>holding.price),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }


  return (
    <>
      {error && <p style={{color:"red"}}>{error}</p>}
      <h3 className="title">Holdings ({allHoldings.length})</h3>
      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>Curr. Price</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
          {allHoldings.map((stock,index)=>{
            const currValue= stock.price*stock.qty;
            const isProfit= currValue-stock.avg*stock.qty;
            const profClass= isProfit >=0 ? "profit" : "loss";
            const dayClass= stock.isLoss ? "loss" : "profit"

            return(
          <tr key={index}>
            <td>{stock.name}</td>
            <td>{stock.qty}</td>
            <td>{stock.avg.toFixed(2)}</td>
            <td>{stock.price.toFixed(2)}</td>
            <td>{currValue.toFixed(2)}</td>
            <td className={profClass}>{(currValue-stock.avg*stock.qty).toFixed(2)}</td>
            <td className={profClass}>{stock.net}</td>
            <td className={dayClass}>{stock.day}</td>
          </tr>
            )
            })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data}/>
    </>
  );
};

export default Holdings;
