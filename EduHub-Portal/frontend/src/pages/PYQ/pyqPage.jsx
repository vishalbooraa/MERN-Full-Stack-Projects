import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar";
import { useAuth } from "../authContext";
import "./pyqPage.css";

const PyqPage = () => {
  const [pyqs, setPyqs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  // Fetch PYQs from backend with search
  const fetchPyqs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:8000/pyqs/getall", {
        params: { search: searchTerm },
         withCredentials: true 
      });
      setPyqs(res.data.groupedPyqs || {});
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to fetch PYQs. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Debounce Search Input
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPyqs();
    }, 500); // Wait 500ms before API call

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Delete a PYQ
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PYQ?")) return;

    setDeleting(id);
    try {
      await axios.delete(`http://localhost:8000/pyqs/delete/${id}`,{ withCredentials: true });

      // Remove from local state
      const newPyqs = { ...pyqs };
      for (const subject in newPyqs) {
        for (const year in newPyqs[subject]) {
          newPyqs[subject][year] = newPyqs[subject][year].filter(
            (p) => p._id !== id
          );
          if (newPyqs[subject][year].length === 0) delete newPyqs[subject][year];
        }
        if (Object.keys(newPyqs[subject]).length === 0) delete newPyqs[subject];
      }
      setPyqs(newPyqs);
    } catch (err) {
      console.error(err);
      setError("Failed to delete PYQ. Try again.");
    } finally {
      setDeleting("");
    }
  };

  return (
    <>
      <Navbar />

      <div className="pyq-page-wrapper">
        <h1>📄 Previous Year Questions</h1>
        {error && <p className="error-message">{error}</p>}

        {/* Debounced Search Input */}
        <div className="pyq-search-bar-container">
          <input
            type="text"
            placeholder="Search by Subject or Year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pyq-search-input-field"
          />
        </div>

        {loading ? (
          <p>Loading PYQs...</p>
        ) : Object.keys(pyqs).length === 0 ? (
          <p>No PYQs found.</p>
        ) : (
          <div className="pyq-content-grid">
            {Object.keys(pyqs).map((subject) => (
              <div key={subject} className="pyq-subject-section">
                <h2>{subject}</h2>

                {Object.keys(pyqs[subject])
                  .sort((a, b) => a - b)
                  .map((year) => (
                    <div key={year} className="pyq-year-section">
                      <h3>{year}</h3>

                      {pyqs[subject][year].map((pyq) => (
                        <div key={pyq._id} className="pyq-item-card">
                          <p>
                            <strong>Uploaded At:</strong>{" "}
                            {new Date(pyq.uploadedAt).toLocaleDateString()}
                          </p>

                          <div className="pyq-item-actions">
                            <a
                              href={pyq.fileUrl}
                              className="pyq-download-btn"
                              download
                            >
                              ⬇ Download
                            </a>

                            {/* Delete button - only show if user is admin */}
                            {user && user.role === "admin" && (
                              <button
                                className="pyq-delete-btn"
                                onClick={() => handleDelete(pyq._id)}
                                disabled={deleting === pyq._id}
                              >
                                {deleting === pyq._id ? "Deleting..." : "🗑 Delete"}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PyqPage;
