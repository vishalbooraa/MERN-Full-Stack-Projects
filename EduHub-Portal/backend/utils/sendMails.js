import nodemailer from "nodemailer";
import ExpressError from "./ExpressError.js"; 

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new ExpressError(500, "Failed to send email. Please try again later.");
  }
};

export default sendEmail;
