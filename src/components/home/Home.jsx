import React from 'react'
import './Home.scss';
import { SliderImg } from './SliderImg.jsx';

export const Home = () => {
  return (
    <>
    <nav className='nav'>다이닝코드
        <input className='search' type='text' placeholder='검색'></input>
    </nav>
    <div className='intro'> 당신의 맛집을 소개 합니다.</div>
    <SliderImg />
    </>
  )
}
