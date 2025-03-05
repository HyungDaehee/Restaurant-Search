import axios from 'axios';

export const getAccessToken = (code) => {
  return axios.get(process.env.REACT_APP_PUBLIC_URL, {
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
