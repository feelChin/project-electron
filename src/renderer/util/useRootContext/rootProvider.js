import React, { useEffect, useState } from "react";
import exampleList from "../../example.json";

export const RootContext = React.createContext(null);

export const RootProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState({
		token: JSON.parse(sessionStorage.getItem("token")),
		example: exampleList,
		theme: localStorage.getItem("theme") === "light" ? true : false,
	});

	useEffect(() => {
		const myTheme = userInfo.theme ? "light" : "dark";

		document.documentElement.setAttribute("data-theme", myTheme);
		localStorage.setItem("theme", myTheme);
	}, [userInfo.theme]);

	const value = { userInfo, setUserInfo };

	return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};
