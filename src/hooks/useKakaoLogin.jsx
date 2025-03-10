import { useEffect } from 'react';
import { getToken, setToken, removeToken } from '../utils/SessionStorage.js';
import { getAccessToken, kakaoLogout } from '../api/Kakao_Login_api';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/KakaoAuthStore';

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = 'https://restaurant-search-git-master-hyungs-projects-40d7cee3.vercel.app/Login';

const useKakaoLogin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
  };

  const handleLogout = async () => {
    const token = getToken();
    if (token) {
      await kakaoLogout(token);
      removeToken();
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);

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

  return { isLoggedIn, handleLogin, handleLogout };
};

export default useKakaoLogin;
