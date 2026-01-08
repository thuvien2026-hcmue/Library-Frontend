const API_URL = "https://library-backend-xhvu.onrender.com/api";

export const apiFetch = (url, options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(API_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
};
