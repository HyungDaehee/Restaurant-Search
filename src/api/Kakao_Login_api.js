import axios from 'axios';

export const getAccessToken = (code) => {
  return axios.get(`http://localhost:5000/auth/Kakao`, {
    params: { code: code },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const kakaoLogout = (token) => {
  return axios.post("https://kapi.kakao.com/v1/user/logout", {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
