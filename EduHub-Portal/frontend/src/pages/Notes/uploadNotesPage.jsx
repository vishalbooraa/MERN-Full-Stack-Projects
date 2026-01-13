import React, { useState } from "react";
import axios from "axios";
import Navbar from "../navbar";
import "./uploadNotesPage.css";
import { useNavigate } from "react-router-dom";

const UploadNotes = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({ subject: "", year: "", unit: "", topic: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!note.subject || !note.year || !note.unit || !note.topic || !file) {
      setError("⚠️ All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("subject", note.subject);
    formData.append("year", note.year);
    formData.append("unit", note.unit);
    formData.append("topic", note.topic);
    formData.append("file", file);

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/notes/upload", formData,{ withCredentials: true });
      setMessage("✅ Note uploaded successfully");
      setNote({ subject: "", year: "", unit: "", topic: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("Failed to upload note. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="notes-page-wrapper">
        <h1>📄 Upload Notes</h1>
        <form className="notes-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={note.subject}
            onChange={handleChange}
          />
          <select name="unit" value={note.unit} onChange={handleChange}>
            <option value="">Select Unit</option>
            <option value="Unit 1">Unit 1</option>
            <option value="Unit 2">Unit 2</option>
            <option value="Unit 3">Unit 3</option>
            <option value="Unit 4">Unit 4</option>
          </select>
          <input
            type="text"
            name="topic"
            placeholder="Topic Name"
            value={note.topic}
            onChange={handleChange}
          />
          <select name="year" value={note.year} onChange={handleChange}>
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Note"}
          </button>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default UploadNotes;
