import React, { useEffect, useState } from "react";
import exampleList from "../../example.json";

export const RootContext = React.createContext(null);

export const RootProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    token: JSON.parse(sessionStorage.getItem("token")),
    example: exampleList,
    theme: true,
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      userInfo.theme ? "light" : "dark"
    );
  }, [userInfo.theme]);

  const value = { userInfo, setUserInfo };

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};
