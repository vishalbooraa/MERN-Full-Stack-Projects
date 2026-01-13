import React, { useState } from "react";
import axios from "axios";
import "./addnewnotice.css";
import Navbar from "../navbar";


const AddNewNotice = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!title || !content || !createdBy) {
      setError("⚠️ All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/notice/add", {
        title,
        content,
        createdBy,
      },{ withCredentials: true });
      setMessage("✅ Notice added successfully!");
      setTitle("");
      setContent("");
      setCreatedBy("");
    } catch (err) {
      console.error("Error adding notice:", err);
      setError(err.response?.data?.message || "❌ Failed to add notice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="noticeboard-wrapper">
      <h1 className="notice-title">📢 Digital Noticeboard</h1>

      {/* Notice Form */}
      <form className="notice-form" onSubmit={handleSubmit}>
        <h2>Create New Notice</h2>

        <input
          type="text"
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Notice Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="text"
          placeholder="Posted By (e.g. Admin Name)"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Notice"}
        </button>

        {/* Message Section */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
    </>
  );
};

export default AddNewNotice;
