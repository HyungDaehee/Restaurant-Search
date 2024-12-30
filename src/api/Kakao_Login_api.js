import axios from 'axios';

export const fetchUser = (accessToken) => {
  return axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
};

export const getAccessToken = (code) => {
  return axios.get(`http://localhost:5000/auth/Kakao`, {
    params: { code: code },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};
