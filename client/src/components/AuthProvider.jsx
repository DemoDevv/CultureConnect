import React, { createContext, useContext, useState } from "react";

/**
    context for the authentication token
    * @type {React.Context}
*/
const AuthContext = createContext();

/**
    provider for the authentication context
    * @typedef AuthProviderProps
    * @param {Object} props
    * @param {React.ReactNode} props.children
*/
export function AuthProvider({ children }) {
  let [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
    hook to get the authentication context
    * @returns {Object}
*/
export const useAuth = () => useContext(AuthContext);
