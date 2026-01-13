import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import "./noticeboard.css";
import { useAuth } from "../authContext";

const NoticeBoard = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");
  const {user}=useAuth()
  console.log(user)

  // Fetch notices
  const fetchNotices = async () => {
    setError("");
    try {
      const res = await axios.get("http://localhost:8000/notice/getall",{ withCredentials: true });
      setNotices(res.data.notices);
    } catch (err) {
      console.error("Error fetching notices:", err);
      setError("⚠️ Failed to fetch notices. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );
    if (!confirmDelete) return;

    setDeleting(id);
    setError("");

    try {
      await axios.delete(`http://localhost:8000/notice/delete/${id}`,{ withCredentials: true });
      setNotices((prev) => prev.filter((notice) => notice._id !== id));
    } catch (err) {
      console.error("Error deleting notice:", err);
      setError("Failed to delete the notice. Please try again.");
    } finally {
      setDeleting("");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="noticeboard-page">
        <h1 className="noticeboard-title">📢 Noticeboard</h1>

        

        {/* Error Message (Global) */}
        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Loading notices...</p>
        ) : notices.length === 0 ? (
          <p>No notices yet.</p>
        ) : (
          <div className="notice-list">
            {notices.map((notice) => (
              <div className="notice-card" key={notice._id}>
                <h2>{notice.title}</h2>
                <p>{notice.content}</p>
                <small>
                  Posted by <strong>{notice.createdBy}</strong> on{" "}
                  {new Date(
                    notice.date || notice.createdAt
                  ).toLocaleDateString()}
                </small>

                {/* Delete Button - only show if user is admin */}
                {user && user.role === "admin" && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(notice._id)}
                    disabled={deleting === notice._id}
                  >
                    {deleting === notice._id ? "Deleting..." : "🗑 Delete"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {user && user.role === "admin" && (
          <button
            className="add-notice-btn"
            onClick={() => navigate("/addnewnotice")}
          >
            + Add New Notice
          </button>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
