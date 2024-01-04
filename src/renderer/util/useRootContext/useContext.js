import { useContext } from "react";
import { RootContext } from "./rootProvider";

function UserContext() {
  return useContext(RootContext);
}

export default UserContext;
