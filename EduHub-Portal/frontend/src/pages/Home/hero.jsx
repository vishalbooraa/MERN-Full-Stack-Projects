import React from 'react';
import "./hero.css";
import { useAuth } from '../authContext';

const Hero = () => {
  const {user}=useAuth()
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className='hero-h'>Welcome {user.name}</h1>
        <p className='hero-p'>To EduHub</p>
        <h2 className='hero-h2'>A unified campus platform for student-teacher collaboration</h2>
      </div>
    </div>
  );
};

export default Hero;
