import React, { useState } from "react";
import "./authentication.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

const Authentication = () => {
  const [mode, setMode] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { refreshUser } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === 0) {
        const res = await axios.post(
          "http://localhost:8000/user/signup",
          formData,
          {
            withCredentials: true,
          }
        );
        setMessage(res.data.message || "Registered successfully!");
        setMode(1);
      } else {
        const res = await axios.post(
          "http://localhost:8000/user/login",
          formData,
          {
            withCredentials: true,
          }
        );
        setMessage(res.data.message || "Logged in successfully!");
        await refreshUser();
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }

    console.log("Form submitted:", mode === 0 ? "SignUp" : "SignIn", formData);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="authBody">
      <h1 id="heading">EduHub</h1>
      <div className="authContainer">
        <div className="authToggle">
          <button
            type="button"
            className={`toggleBtn ${mode === 0 ? "active" : ""}`}
            onClick={() => {
              setMode(0);
              setError("");
              setMessage("");
            }}
          >
            SignUp
          </button>
          <button
            type="button"
            className={`toggleBtn ${mode === 1 ? "active" : ""}`}
            onClick={() => {
              setMode(1);
              setError("");
              setMessage("");
            }}
          >
            SignIn
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 0 && (
            <>
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                placeholder="enter your name"
                id="name"
                name="name"
                className="authInp"
                value={formData.name}
                onChange={handleChange}
              />
              <br />
            </>
          )}

          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            placeholder="enter e-mail"
            id="email"
            name="email"
            className="authInp"
            value={formData.email}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            placeholder="enter password"
            id="password"
            name="password"
            className="authInp"
            value={formData.password}
            onChange={handleChange}
          />
          {message && (
            <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>
          )}
          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
          {mode === 1 && (
            <p
              style={{ color: "#2c74b3", cursor: "pointer", marginTop: "0.5rem" }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>
          )}

          <br />

          <button type="submit" className="authInp authBtn">
            {mode === 0 ? "SignUp" : "SignIn"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
