import React from 'react';
import { useNavigate } from 'react-router-dom';
import useKakaoLogin from '../../hooks/useKakaoLogin.jsx';
import { handleLogin, handleLogout } from '../../utils/loginHandlers.jsx';

const KakaoLogin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, Kakao_API_KEY, redirect_uri } = useKakaoLogin();

  return (
    <div className='Login-container'>
      {!isLoggedIn ? (
        <div className='login' onClick={() => handleLogin(Kakao_API_KEY, redirect_uri)}>
          Login
        </div>
      ) : (
        <div className='Logout' onClick={() => handleLogout(isLoggedIn, setIsLoggedIn, navigate)}>
          LogOut
        </div>
      )}
    </div>
  );
};

export default KakaoLogin;
