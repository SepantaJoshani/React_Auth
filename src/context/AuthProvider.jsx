import { createContext, useState } from "react";

const AuthContext = createContext({
  auth: false,
  setAuth() {},
  persist:Boolean(),
  setPersist(){}
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist") || false)
  );

  const value = { auth, setAuth, persist, setPersist };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
