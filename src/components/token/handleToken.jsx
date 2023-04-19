export const setAccessToken = (accessToken) => {
  localStorage.setItem("access_token", accessToken);
};

export const getAccessToken = () => {
  const access_token = localStorage.getItem("access_token");
  return access_token;
};

export const isValidAccessToken = () => {
  const hasToken = getAccessToken();
  if (hasToken) {
    return true;
  }
};
