import React from 'react';
import SliderImg from '../components/Slider/SliderImg.jsx';
import Address from '../components/Address/Address.jsx';
import NavBar from '../components/Nav/NavBar.jsx';
import '../styles/Home.scss';

const Home = () => {
    return (
        <div className='home-container'>
            <NavBar />
            <div className='intro'>
                <Address />
            </div>
            <SliderImg />
        </div>
    );
};

export default Home;
