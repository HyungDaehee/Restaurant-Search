import axios from 'axios';

export const getAccessToken = (code) => {
  return axios.get("https://express-server-olive.vercel.app/api/auth/Kakao", {
    params: { code: code },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    timeout: 30000,
  });
};

export const kakaoLogout = (token) => {
  return axios.post("https://kapi.kakao.com/v1/user/logout", {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
