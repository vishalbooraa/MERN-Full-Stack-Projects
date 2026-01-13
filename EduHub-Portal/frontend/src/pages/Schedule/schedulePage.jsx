import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import "./SchedulePage.css";

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch schedules
  const fetchSchedules = async () => {
    setError("");
    try {
      const res = await axios.get("http://localhost:8000/schedule/getall",{withCredentials:true});
      setSchedules(res.data.schedules);
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to fetch schedules. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Delete schedule
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule?"
    );
    if (!confirmDelete) return;

    setDeleting(id);
    try {
      await axios.delete(`http://localhost:8000/schedule/delete/${id}`,{withCredentials:true});
      setSchedules((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete schedule. Please try again.");
    } finally {
      setDeleting("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="schedule-page-wrapper">
        <h1 className="schedule-page-title">📅 Class Schedules</h1>

        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Loading schedules...</p>
        ) : schedules.length === 0 ? (
          <p>No schedules uploaded yet.</p>
        ) : (
          <div className="schedule-list">
            {schedules.map((schedule) => (
              <div className="schedule-card" key={schedule._id}>
                <h2>{schedule.year} Year</h2>
                <img
                  src={schedule.imageUrl}
                  alt={`${schedule.year} Year Schedule`}
                />
                <div className="schedule-actions">
                  {/* Delete button - only show if user is admin */}
                  {user && user.role === "admin" && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(schedule._id)}
                      disabled={deleting === schedule._id}
                    >
                      {deleting === schedule._id ? "Deleting..." : "🗑 Delete"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload schedule button at bottom */}
        {user && user.role === "admin" && (
          <button
            className="upload-schedule-btn"
            onClick={() => navigate("/uploadschedule")}
          >
            + Upload Schedule
          </button>
        )}
      </div>
    </>
  );
};

export default SchedulePage;
