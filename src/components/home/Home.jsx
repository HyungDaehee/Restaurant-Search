import React from 'react';
import './Home.scss';
import { SliderImg } from './SliderImg.jsx';
import Address from '../Address/Address.jsx';
import NavBar from './NavBar.jsx';
export const Home = () => {
    return (
        <div className='home-container'>
            <NavBar/>
            <div className='intro'>
                <Address />
            </div>
            <SliderImg />
        </div>
    );
};
