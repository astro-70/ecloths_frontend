import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("trendify_user") || "null"));
  const [token, setToken] = useState(() => localStorage.getItem("trendify_token") || "");

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("trendify_user", JSON.stringify(userData));
    localStorage.setItem("trendify_token", userToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("trendify_user");
    localStorage.removeItem("trendify_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
