import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken, setToken } from './LocalStorage.js';
import { getAccessToken, kakaoLogout } from '../api/Kakao_Login_api.js';
import { MdLogout } from "react-icons/md";
import LoginImg from './img/kakao_login_medium.png';
import './Login.scss';

const KakaoLogin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Kakao_API_KEY = '6116026697d7c84da46212493aef754b';
  const redirect_uri = 'http://localhost:3000/Login';

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    } else {  
      setIsLoggedIn(false);
    }

    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      getAccessToken(code)
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

  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_API_KEY}&redirect_uri=${redirect_uri}&response_type=code&prompt=login`;
  };

  const handleLogout = () => {
    const token = getToken();
    if (token) {
      kakaoLogout(token)
        .then((response) => {
          removeToken();
          setIsLoggedIn(false);
          console.log("로그아웃 성공");
          window.location.reload();
          navigate("/");
        })
        .catch((error) => {
          console.error("로그아웃 실패:", error);
        });
    } else {
      console.error("토큰이 없습니다. 로그아웃 실패");
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div onClick={handleLogin}>
          <img src={LoginImg} alt="Kakao Login" />
        </div>
      ) : (
        <div className='Logout' onClick={handleLogout}>
          LogOut
        </div>
      )}
    </div>
  );
};

export default KakaoLogin;
