import React from 'react';
import Navbar from '../navbar';
import Hero from './hero.jsx';
import Study from './study.jsx';
import LostFound from './lostFound.jsx';
import AiAssistant from './aiAssistant.jsx';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <Study/>
            <AiAssistant/>
            <LostFound/>
        </div>
    );
}

export default Home;
