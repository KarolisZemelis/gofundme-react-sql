import { createContext, useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { getUser } = useAuth(setUser);
  console.log("esu Auth kontekste");
  useEffect((_) => {
    getUser();
  }, []);

  return (
    <Auth.Provider value={{ user, setUser }}>
      {null === user ? <span>Authorizing...</span> : children}
    </Auth.Provider>
  );
};
export default Auth;
