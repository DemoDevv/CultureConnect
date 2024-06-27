import React, { createContext, useContext } from "react";

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
    const getToken = () => sessionStorage.getItem("token");
    const setToken = (token) => sessionStorage.setItem("token", token);

	return (
		<AuthContext.Provider value={{ getToken, setToken }}>
			{children}
		</AuthContext.Provider>
	);
}

/**
    hook to get the authentication context
    * @returns {Object}
*/
export const useAuth = () => useContext(AuthContext);
