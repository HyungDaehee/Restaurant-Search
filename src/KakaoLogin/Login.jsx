import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken, setToken } from './LocalStorage';
import axios from 'axios';
import { MdLogout } from "react-icons/md";
import LoginImg from './img/kakao_login_medium.png';
import './Login.scss';


const KakaoLogin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Kakao_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI_LOGIN;

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      axios.get(`http://localhost:5000/auth/Kakao?code=${code}`)
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
    const token = getToken();
    if (token) {
      axios.post("https://kapi.kakao.com/v1/user/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          removeToken();
          setIsLoggedIn(false);
          console.log("로그아웃 성공");
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
        <div
          onClick={() => (window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_API_KEY}&redirect_uri=${redirect_uri}&response_type=code&prompt=login`)}
        >
          <img src={LoginImg} alt="Kakao Login" />
        </div>
      ) : (
        <button className='Logout' onClick={handleLogout}>
          <MdLogout />
        </button>
      )}
    </div>
  );
};

export default KakaoLogin;
