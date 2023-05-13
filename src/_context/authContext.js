import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isContextLoaded, setIsContextLoaded] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);
  // console.log('Cookies.get(123)', Cookies.get());

  async function getUserData() {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
      setIsContextLoaded(true);
    } else {
      setIsLoggedIn(false);
      setIsContextLoaded(true);
    }
  }

  return <AuthContext.Provider value={{ getUserData, isContextLoaded, isLoggedIn }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
