import { useEffect } from 'react';
import { getToken, setToken, removeToken } from '../utils/LocalStorage';
import { getAccessToken, kakaoLogout } from '../api/Kakao_Login_api';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/KakaoAuthStore';

const useKakaoLogin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

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
  }, [navigate, setIsLoggedIn]);

  return { isLoggedIn, setIsLoggedIn, Kakao_API_KEY, redirect_uri };
};

export default useKakaoLogin;
