import React, { useState } from "react";
import axios from "axios";
import "./lostFoundForm.css";
import Navbar from "../navbar";

const LostFoundForm = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("lost"); // lost or found
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!itemName || !description || !location || !contact) {
      setError("⚠️ Please fill all required fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/lostfound/add", {
        itemName,
        description,
        location,
        status,
        contact,
      },{ withCredentials: true });

      setMessage("✅ Item submitted successfully!");
      setItemName("");
      setDescription("");
      setLocation("");
      setStatus("lost");
      setContact("");
    } catch (err) {
      console.error("Error submitting item:", err);
      setError(err.response?.data?.message || "❌ Failed to submit item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="lf-page-wrapper">
        <h1 className="lf-page-title">📦 Lost & Found</h1>
        <form className="lf-page-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          <input
            type="text"
            placeholder="Contact Info"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Item"}
          </button>

          {message && <p className="lf-page-success-message">{message}</p>}
          {error && <p className="lf-page-error-message">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default LostFoundForm;
