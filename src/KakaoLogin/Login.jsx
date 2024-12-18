import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoLogin = () => {
  const navigate = useNavigate();

  const Kakao_API_KEY = '6116026697d7c84da46212493aef754b';
  const redirect_uri = 'http://localhost:3000/Login';
  const KakaoURL = 
    `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`;

  const SocialKakao = () => {
    window.location.href = KakaoURL;
  };

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      axios.get(`http://localhost:5000/auth/Kakao`, {
        params: { code: code },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((response) => {
          let accessToken = response.data.access_token;

          axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(userInfo => {
            const { id, kakao_account } = userInfo.data;

            const userId = id;
            const email = kakao_account.email;
            const nickname = kakao_account.profile.nickname;
            const name = kakao_account.profile.name;

            console.log("User ID:", userId);
            console.log("Email:", email);
            console.log("Nickname:", nickname);
            console.log("Name:", name);

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

  return (
    <div>
      <button onClick={SocialKakao}>로그인</button>
    </div>
  );
};

export default KakaoLogin;
