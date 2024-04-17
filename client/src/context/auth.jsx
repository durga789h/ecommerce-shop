import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
 
  const [auth, setAuth] = useState({
    user: null,
    token: null, // Initialize token as null
  });

  // Set default axios headers
  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common['Authorization'] = auth.token;
    }
  }, [auth.token]);

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parsedData.user,
        token: parsedData.token,
      });
    }
  }, []);

  

  return (
    <AuthContext.Provider value={{ auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
