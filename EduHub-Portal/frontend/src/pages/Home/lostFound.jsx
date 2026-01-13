import React from "react";
import "./lostFound.css";
import { useNavigate } from "react-router-dom";

const LostFound = () => {
  const navigate = useNavigate();
  return (
    <div className="lf-wrapper">
      <h1 className="lf-title">Lost & Found Section</h1>

      <div className="lf-container">
        <div className="lf-left">
          <img src="/lost.jpg" alt="Lost and Found" className="lf-image" />
        </div>

        <div className="lf-right">
          <p className="lf-desc">
            Misplaced something? Or found an item that belongs to someone else?
            Upload the details here or explore all submitted items to help others reconnect with their belongings.
          </p>

          <div className="lf-buttons">
            <button className="lf-btn upload-button" onClick={()=>navigate('/addlostfound')}>Upload Lost / Found Item</button>
            <button className="lf-btn view-btn" onClick={()=>navigate('/alllostfound')}>See All Lost & Found</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostFound;
