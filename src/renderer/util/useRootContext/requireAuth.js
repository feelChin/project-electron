import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useContext from "./useContext";

function RequireAuth({ children }) {
  const { userInfo } = useContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.token) {
      navigate("/login");
    }
  }, []);

  return children;
}

export default RequireAuth;
