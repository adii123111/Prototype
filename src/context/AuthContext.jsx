import { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Prototype only. Real project: POST /api/auth/login, server checks the password
// (hashed) and returns a token plus the user's role ("owner" or "client").
export const OWNER = { id: "saeeda", password: "saeeda123", phone: "0123456789" };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("pb_user") || "null"));
  const login = (u) => { setUser(u); localStorage.setItem("pb_user", JSON.stringify(u)); };
  const logout = () => { setUser(null); localStorage.removeItem("pb_user"); };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
