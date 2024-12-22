import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser, getAccessToken } from './Kakao_Login_api';
import { getToken, removeToken, setToken, } from './LocalStorage';
import { MdLogout } from "react-icons/md";
import LoginImg from "./img/kakao_login_medium.png";
import "./Login.scss"

const KakaoLogin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Kakao_API_KEY = '6116026697d7c84da46212493aef754b';
  const redirect_uri = 'http://localhost:3000/Login';
  const KakaoURL =
    `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`;

  const SocialKakao = () => {
    window.location.href = KakaoURL;
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    }

    let code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      getAccessToken(code)
        .then((response) => {
          let accessToken = response.data.access_token;
          setToken(accessToken);

          fetchUser(accessToken)
            .then(userInfo => {
              const { id, kakao_account } = userInfo.data;

              const Id = id;
              const email = kakao_account.email;
              const nickname = kakao_account.profile.nickname;
              const name = kakao_account.profile.name;

              console.log("ID:", Id);
              console.log("Email:", email);
              console.log("Nickname:", nickname);
              console.log("Name:", name);

              setIsLoggedIn(true);
              navigate('/');
            })
            .catch(err => {
              console.error("사용자 정보 요청 실패:", err);
            });
        })
        .catch(err => {
          console.error("서버 요청 중 에러 발생:", err);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div onClick={SocialKakao}><img src={LoginImg} /></div>
      ) : (
        <div onClick={handleLogout} className='Logout'><MdLogout /></div>
      )}
    </div>
  );
};

export default KakaoLogin;
