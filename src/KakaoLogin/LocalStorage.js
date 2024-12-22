export const getToken = () => {
    return localStorage.getItem('kakao_token');
  };
  
  export const setToken = (token) => {
    localStorage.setItem('kakao_token', token);
  };
  
  export const removeToken = () => {
    localStorage.removeItem('kakao_token');
  };