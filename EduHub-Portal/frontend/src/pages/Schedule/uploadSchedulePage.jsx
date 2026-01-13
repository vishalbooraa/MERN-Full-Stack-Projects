import React, { useState } from "react";
import Navbar from "../navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UploadSchedulePage.css";

const UploadSchedulePage = () => {
  const [year, setYear] = useState("1st");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!year || !file) {
      setError("⚠️ Please select year and choose a schedule image!");
      return;
    }

    const formData = new FormData();
    formData.append("year", year);
    formData.append("schedule", file);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/schedule/upload",
        formData,
        {withCredentials:true}
      );
      setMessage(res.data.message);
      setYear("1st");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Failed to upload schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="upload-page-wrapper">
        <h1 className="upload-page-title">📤 Upload Class Schedule</h1>

        <form className="upload-form" onSubmit={handleSubmit}>
          <label>Select Year:</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>

          <label>Choose Schedule Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Schedule"}
          </button>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>

        <button className="back-btn" onClick={() => navigate("/schedule")}>
          🔙 Back to Schedules
        </button>
      </div>
    </>
  );
};

export default UploadSchedulePage;
