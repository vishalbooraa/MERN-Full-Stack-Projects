import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar";
import { useAuth } from "../authContext";
import "./notesPage.css";

const NotesPage = () => {
  const [groupedNotes, setGroupedNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  // Fetch notes from backend
  const fetchNotes = async (search = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:8000/notes/getall?search=${search}`,{ withCredentials: true });
      setGroupedNotes(res.data.groupedNotes || {});
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to fetch notes. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Debounce search input before API call
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      fetchNotes(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(delayTimer);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setDeleting(id);
    try {
      await axios.delete(`http://localhost:8000/notes/delete/${id}`,{ withCredentials: true });

      // Update UI locally after delete
      const newNotes = { ...groupedNotes };
      for (const subject in newNotes) {
        for (const unit in newNotes[subject]) {
          newNotes[subject][unit] = newNotes[subject][unit].filter(
            (note) => note._id !== id
          );
          if (newNotes[subject][unit].length === 0) delete newNotes[subject][unit];
        }
        if (Object.keys(newNotes[subject]).length === 0) delete newNotes[subject];
      }
      setGroupedNotes(newNotes);
    } catch (err) {
      console.error(err);
      setError("Failed to delete note. Try again.");
    } finally {
      setDeleting("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const hasNotes = Object.keys(groupedNotes).length > 0;

  return (
    <>
      <Navbar />
      <div className="study-note-page-wrapper">
        <h1>📚 Notes</h1>
        {error && <p className="error-message">{error}</p>}

        {/* ✅ Debounced Search Input */}
        <div className="study-note-search-bar-container">
          <input
            type="text"
            placeholder="Search notes by Subject, Unit, or Topic..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="study-note-search-input"
          />
        </div>

        {loading ? (
          <p>Loading notes...</p>
        ) : !hasNotes ? (
          <p>No notes found.</p>
        ) : (
          <div className="study-note-content-grid">
            {Object.keys(groupedNotes).map((subject) => (
              <div key={subject} className="study-note-subject-section">
                <h2>{subject}</h2>

                {Object.keys(groupedNotes[subject])
                  .sort()
                  .map((unit) => (
                    <div key={unit} className="study-note-unit-section">
                      <h3>{unit}</h3>
                      {groupedNotes[subject][unit].map((note) => (
                        <div key={note._id} className="study-note-item-card">
                          <p>
                            <strong>Topic:</strong> {note.topic}
                          </p>
                          <div className="study-note-item-actions">
                            <a href={note.fileUrl} download={note.topic || "notes-file"} className="study-note-download-btn">
                              ⬇ Download
                            </a>

                            {/* Delete button - only show if user is admin */}
                            {user && user.role === "admin" && (
                              <button
                                className="study-note-delete-btn"
                                onClick={() => handleDelete(note._id)}
                                disabled={deleting === note._id}
                              >
                                {deleting === note._id ? "Deleting..." : "🗑 Delete"}
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

export default NotesPage;
