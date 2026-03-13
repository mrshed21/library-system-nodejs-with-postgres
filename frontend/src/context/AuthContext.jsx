import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. check if user is logged in on app load
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {

          const res = await api.get("http://localhost:4000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.data);
        } catch (err) {
          localStorage.removeItem("token");
          setUser(null);
          console.log("check user err: ",err)
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  // 2. login function
  const login = async (email, password) => {
    const res = await api.post("http://localhost:4000/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    console.log(res.data.data.name);
    setUser(res.data.data);
    return res.data;
  };

  // 3. logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);