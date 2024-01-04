import React from "react";
import Portal from "./portal.js";
import modal_static from "./static.js";
import "./index.scss";

function Modal(props) {
  return <Portal {...props} />;
}

for (let key in modal_static) {
  Modal[key] = modal_static[key];
}

export default Modal;
