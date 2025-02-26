import React from 'react';
import useKakaoLogin from '../../hooks/useKakaoLogin.jsx';

const KakaoLogin = () => {
  const { isLoggedIn, handleLogin, handleLogout } = useKakaoLogin();

  return (
    <div className='Login-container'>
      {!isLoggedIn ? (
        <div className='login' onClick={handleLogin}>
          Login
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
