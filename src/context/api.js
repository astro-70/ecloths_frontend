const API = import.meta.env.VITE_API_URL;

export const apiFetch = async (path, options = {}, token = "") => {
  const res = await fetch(`${API}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });
  return res.json();
};
