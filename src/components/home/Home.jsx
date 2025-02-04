import React, { useState } from 'react';
import './Home.scss';
import { SliderImg } from './SliderImg.jsx';
import { useNavigate } from 'react-router-dom';
import Login from '../KakaoLogin/Login.jsx'
import Address from '../Address/Address.jsx';

export const Home = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();  

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (keyword.trim()) {
            navigate(`/Search?query=${keyword}`);
        }
    };

    return (
        <>
            <nav className='nav' onSubmit={handleSubmit}>
                다이닝코드
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
                <div className='SignIn'><Login/></div>
            </nav>
            <div className='intro'>
                {/* 당신의 주변 맛집인<br/>[현재 주소]추천 맛집을 <br/>찾아보세요!! */}
                <Address/>
            </div>
            
            <SliderImg />
        </>
    );
};
