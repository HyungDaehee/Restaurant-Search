import React from 'react'
import Login from './Login.jsx'
import { Routes, Route, Link } from 'react-router-dom';
import './LoginText.scss'

export const LoginText = () => {
    return (
        <div>
          <Link to="/login">로그인</Link>

          <Routes>
      <Route path="/" element={<LoginText />} />
      <Route path="/login" element={<Login />} />
    </Routes>
        </div>
      );
    }
