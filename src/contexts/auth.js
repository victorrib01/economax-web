const { createContext, useContext, useEffect, useState } = require("react");

const AuthContext = createContext();

export default function AuthProvider({ children, loginCookie }) {
  const [cookies, setCookies] = useState(null);

  useEffect(() => {
    setCookies(loginCookie);
  }, [loginCookie]);
  return (
    <AuthContext.Provider value={{ cookies }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  const { cookies } = context;

  return { cookies };
}
