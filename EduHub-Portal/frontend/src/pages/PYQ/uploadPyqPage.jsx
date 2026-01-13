import React, { useState } from "react";
import axios from "axios";
import Navbar from "../navbar";
import "./uploadPyqPage.css";

const UploadPyqPage = () => {
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !year || !file) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("year", year);
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post("http://localhost:8000/pyqs/upload",formData,{ withCredentials: true });
      setMessage(res.data.message);
      setSubject("");
      setYear("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to upload PYQ. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="upload-pyq-wrapper">
        <h1>📤 Upload Previous Year Question</h1>

        {message && <p className="upload-message">{message}</p>}

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label>Subject:</label>
            <input
              type="text"
              placeholder="Enter subject name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Year:</label>
            <input
              type="number"
              placeholder="Enter year (e.g. 2020)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="2000"
              max={new Date().getFullYear() + 1}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload File:</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="upload-btn" disabled={loading}>
            {loading ? "Uploading..." : "Upload PYQ"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadPyqPage;
