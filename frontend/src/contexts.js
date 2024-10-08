"use client";
import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userContext, setUserContext] = useState({
    loggedIn: false,
    username: null
  });
  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {" "}
      {children}
    </UserContext.Provider>
  );
};
