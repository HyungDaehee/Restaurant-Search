import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import LogoImage from './LogoImage.jsx';
import Login from '../KakaoLogin/Login.jsx'
import './NavBar.scss'

const NavBar = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();  

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (keyword.trim()) {
            navigate(`/Search?query=${keyword}`);
        }
    };
  return (
    <nav className='nav' >
                <LogoImage className='logo'  />
                <div className='search-wrapper'>
                <input 
                    className='search' 
                    type='text'  
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder='지역, 가게명, 지하철역 검색'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e); 
                        }
                    }}
                />
                <div className='home-search-i' onClick={handleSubmit}><CiSearch /></div>
                </div>  
                <div className='SignIn'> <Login /></div>
                
                   
            </nav>
  )
}

export default NavBar