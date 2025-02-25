// utils/loginHandlers.js
import { getToken, removeToken } from './LocalStorage';
import { kakaoLogout } from '../api/Kakao_Login_api';

export const handleLogin = (Kakao_API_KEY, redirect_uri) => {
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_API_KEY}&redirect_uri=${redirect_uri}&response_type=code&prompt=login`;
};

export const handleLogout = (isLoggedIn, setIsLoggedIn, navigate) => {
  const token = getToken();
  if (token) {
    kakaoLogout(token)
      .then(() => {
        removeToken();
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("로그아웃 실패:", error);
      });
  } else {
    console.error("토큰이 없습니다. 로그아웃 실패");
  }
};
