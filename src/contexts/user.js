const { createContext, useContext, useState } = require("react");

const UserContext = createContext();

export default function UserProvider({ children, loginCookie }) {
  const [tab, setTab] = useState("expense");
  const toggleType = () => {
    setTab(tab === "earn" ? "expense" : "earn");
  };
  return (
    <UserContext.Provider value={{ tab, toggleType }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  const { tab, toggleType } = context;

  return { tab, toggleType };
}
