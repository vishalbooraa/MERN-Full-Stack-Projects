import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-hero">
        <h1>About EduHub</h1>
        <p>
          A unified digital platform for students and teachers to collaborate,
          share resources, and stay connected within the campus ecosystem.
        </p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>🎯 Our Vision</h2>
          <p>
            To simplify campus life by bringing everything — from study materials
            to lost-and-found items — under one smart platform. We aim to make
            student and faculty collaboration smoother, smarter, and more
            efficient.
          </p>
        </div>

        <div className="about-section">
          <h2>💡 What You Can Do</h2>
          <ul>
            <li>📚 Access and upload study notes & previous year questions</li>
            <li>🤖 Chat with our AI Assistant for instant study help</li>
            <li>🧾 Post or check lost & found items on campus</li>
            <li>📢 Stay updated with announcements and notices</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>🧑‍💻 Built With</h2>
          <div className="tech-stack">
            <span>React.js</span>
            <span>Node.js</span>
            <span>Express</span>
            <span>MongoDB</span>
          </div>
        </div>
      </div>

      <footer className="about-footer">
        <p>
          © {new Date().getFullYear()} EduHub — Made with 💙 by the
          Development Team.
        </p>
      </footer>
    </div>
  );
};

export default About;
