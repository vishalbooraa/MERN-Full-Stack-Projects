import React from "react";
import "./study.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";

const Study = () => {
  const navigate=useNavigate();
  const { user } = useAuth();
  return (
    <div className="study-wrapper">
      <h1 className="study-title">Study Section</h1>

      <div className="study-section">
        <div className="study-card">
          <img src="/notes.png" alt="Notes" />
          <h2>Notes</h2>
          <p>Access and share study notes with your classmates.</p>
          <div className="btns">
            <button className="btn primary" onClick={()=>navigate("/notespage")}>Download Notes</button>
            {user && user.role === "admin" && (
              <button className="btn secondary" onClick={()=>navigate("/uploadnotes")}>Upload Notes</button>
            )}
          </div>
        </div>

        <div className="study-card">
          <img src="/pyq.png" alt="Previous Year Questions" />
          <h2>Previous Year Questions</h2>
          <p>Download or upload PYQs to prepare effectively for exams.</p>
          <div className="btns">
            <button className="btn primary" onClick={()=>navigate("/pyqpage")}>Download PYQ</button>
            {user && user.role === "admin" && (
              <button className="btn secondary" onClick={()=>navigate("/uploadpyq")}>Upload PYQ</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
