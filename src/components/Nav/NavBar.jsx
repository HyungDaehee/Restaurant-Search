import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/Logo/LogoImage.png';
import Login from '../KakaoLogin/Login.jsx';
import '../../styles/NavBar.scss';

const NavBar = () => {

    return (
        <header className='nav' >
            <div className='nav-container'>
                <nav className='nav-links'>
                    <ul>
                        <li><a href="/board">board</a></li>
                        <li className='SignIn'> <Login /></li>
                    </ul>
                </nav>
                <img className='logo' src={LogoImage}/>
            </div>
        </header>
    );
};

export default NavBar;
