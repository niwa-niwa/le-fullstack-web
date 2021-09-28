import { createContext, useState, useContext } from "react";

export const AuthContext = createContext("");

// the function is not using now
export function AuthWrapper({ children }) {
  const [authState, setAuthState] = useState(false);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
