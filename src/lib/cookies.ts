import Cookies from "js-cookie";

export const setToken = (token: string) => {
  Cookies.set("token", token, { expires: 7 });
};

export const getToken = () => {
  const token = Cookies.get("token");
  if (!token) return null;

  return token;
};

export const deleteToken = () => {
  Cookies.remove("token");
};
