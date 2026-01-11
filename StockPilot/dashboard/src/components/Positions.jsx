import React, { useState,useEffect } from "react";
import axios from "axios";


const Positions = () => {

  let [allPositions , setAllPositions] =useState([]);
  let [error,setError]=useState("")

  useEffect(()=>{
    axios.get('http://localhost:3002/allpositions',{withCredentials:true}).then((res)=>{
      setAllPositions(res.data);
    })
    .catch((err)=>{
        const errMsg=err.response?.data.message || "something went wrong"
        setError(errMsg)
      })
  },[])
  return (
    <>
      {error && <p style={{color:"red"}}>{error}</p>}
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          {allPositions.map((stock, index) => {
            const currValue = stock.price * stock.qty;
            const isProfit = currValue - stock.avg * stock.qty;
            const profClass = isProfit >=0? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profClass}>
                  {(currValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
