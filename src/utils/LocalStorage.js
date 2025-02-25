export const setToken = (accessToken) => {
  localStorage.setItem("token", accessToken);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
