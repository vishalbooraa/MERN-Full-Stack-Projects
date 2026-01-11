import React, { useState } from "react";
import "./forgotPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const navigate=useNavigate()

  const sendOtp = async () => {
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8000/user/forgot-password",
        { email },
        { withCredentials: true }
      );
      setMessage(res.data.message || "OTP sent successfully!");
      setStep(2); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    await sendOtp();
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8000/user/reset-password",
        { email, otp, newPassword:password },
        { withCredentials: true }
      );
      setMessage(res.data.message || "Password reset successfully!");
      setStep(1); 
      setEmail("");
      setOtp("");
      setPassword("");
      navigate("/")
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    await sendOtp();
    setResendLoading(false);
  };

  return (
    <div className="forgotBody">
      <h1 id="heading">Forgot Password</h1>
      <div className="forgotContainer">
        {step === 1 ? (
          <form onSubmit={handleSendOtp}>
            <label htmlFor="email">Enter your registered email</label>
            <br />
            <input
              type="email"
              placeholder="Enter email"
              id="email"
              name="email"
              className="inp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button className="inp btn" type="submit">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <label htmlFor="otp">Enter OTP</label>
            <br />
            <input
              type="text"
              placeholder="Enter OTP"
              id="otp"
              name="otp"
              className="inp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <br />

            <label htmlFor="password">New Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter new password"
              id="password"
              name="password"
              className="inp"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <button className="inp btn" type="submit">
              Reset Password
            </button>

            <p
              type="button"
              className="resendOTP"
              onClick={handleResendOtp}
              disabled={resendLoading}
            >
              {resendLoading ? "Resending..." : "Did n't received OTP? Resend OTP"}
            </p>
          </form>
        )}

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
