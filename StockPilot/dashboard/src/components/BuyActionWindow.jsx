import React, { useState, useContext } from "react";
import axios from "axios";
import {GeneralContext} from "./GeneralContext";
import { useNavigate } from "react-router-dom";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const navigate=useNavigate()
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error,setError]=useState("");

  const context = useContext(GeneralContext);

  const handleBuyClick = async() => {
    try{
      await axios.post("http://localhost:3002/neworder",{
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    },{withCredentials:true});
    context.closeBuyWindow()
    }catch(err){
    const errorMsg=err.response?.data?.message
    console.log(errorMsg);
    setError(errorMsg)
  }
  }
  

  const handleCancelClick = () => {
    context.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      {error && <p style={{color:"red"}}>{error}</p>}
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min={1}
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              min={0}
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
