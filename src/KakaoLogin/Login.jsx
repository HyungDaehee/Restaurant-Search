  import React from 'react'
  import login from './img/login.png'

  const Login = () => {
    const Kakao_API_KEY = '6116026697d7c84da46212493aef754b'
    const redirect_uri = 'http://localhost:3000/oauth/callback/kakao';

    const KakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`
    const SocialKakao = () => {
      window.location.href = KakaoURL
    }
    return (
      <>
        <button onClick={SocialKakao}>로그인</button>
      </>
    )
  }

  export default Login