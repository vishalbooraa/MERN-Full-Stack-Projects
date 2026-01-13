import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar";
import { useAuth } from "../authContext";
import "./allLostFound.css";

const AllLostFoundPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");
  const { user } = useAuth();

  const fetchItems = async () => {
    setError("");
    try {
      const res = await axios.get("http://localhost:8000/lostfound/getall",{ withCredentials: true });
      setItems(res.data.items);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("⚠️ Failed to fetch lost & found items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    setDeleting(id);
    setError("");

    try {
      await axios.delete(`http://localhost:8000/lostfound/delete/${id}`,{withCredentials:true});
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      setError("Failed to delete the item. Please try again.");
    } finally {
      setDeleting("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="lf-list-page-wrapper">
        <h1 className="lf-list-page-title">📦 Lost & Found Items</h1>
        {error && <p className="lf-list-error">{error}</p>}
        {loading ? (
          <p>Loading items...</p>
        ) : items.length === 0 ? (
          <p>No items reported yet.</p>
        ) : (
          <div className="lf-list-container">
            {items.map((item) => (
              <div className="lf-list-card" key={item._id}>
                <h2>{item.itemName}</h2>
                <p>{item.description}</p>
                <p>
                  <strong>Status:</strong> {item.status.toUpperCase()}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p>
                  <strong>Contact:</strong> {item.contact}
                </p>

                {/* Delete button - only show if user is the owner or admin */}
                {(user && (item.user === user.id || user.role === "admin")) && (
                  <button
                    className="lf-delete-btn"
                    onClick={() => handleDelete(item._id)}
                    disabled={deleting === item._id}
                  >
                    {deleting === item._id ? "Deleting..." : "🗑 Delete"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllLostFoundPage;
