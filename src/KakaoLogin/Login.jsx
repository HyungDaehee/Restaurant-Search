import React from 'react'

const Login = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

  const KakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`
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