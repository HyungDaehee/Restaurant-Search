import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken, setToken } from './LocalStorage';
import axios from 'axios';
import { MdLogout } from "react-icons/md";
import LoginImg from "./img/kakao_login_medium.png";
import "./Login.scss";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Kakao_API_KEY = '6116026697d7c84da46212493aef754b';
  const redirect_uri = 'http://localhost:3000/Login';

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);  
    }

    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      axios
        .get(`http://localhost:5000/auth/Kakao?code=${code}`)
        .then((response) => {
          const { token } = response.data;
          setToken(token);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.error("로그인 실패:", err);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    removeToken(); 
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button onClick={() => (window.location.href = 
          `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`)} >
          <img src={LoginImg} alt="Kakao Login" />
        </button>
      ) : (
        <button onClick={handleLogout}><MdLogout /> 로그아웃</button>
      )}
    </div>
  );
};

export default KakaoLogin;
