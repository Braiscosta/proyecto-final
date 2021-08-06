import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Token = createContext();
const TokenProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", "");
  return <Token.Provider value={[token, setToken]}>{children}</Token.Provider>;
};

export { Token, TokenProvider };
