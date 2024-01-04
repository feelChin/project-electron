import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import create_seed from "./seed";
import "./index.scss";

let remove;
let element;

function CreateModal(props) {
  const { width, height, content, resolve } = props;

  function removeFn(next) {
    document.body.removeChild(element);
    if (next) {
      resolve();
    }
  }

  useEffect(() => {
    remove = (next) => {
      element.className = "portal leave";
      element.addEventListener("animationend", () => {
        removeFn(next);
      });
    };

    return () => {
      element.removeEventListener("animationend", () => {
        removeFn();
      });
    };
  }, []);

  return (
    <div
      className={"portalWrapper"}
      style={{
        width,
        height,
      }}
    >
      {content}
    </div>
  );
}

export default {
  create: (data) => {
    return new Promise((resolve) => {
      const seed = create_seed();

      const init = () => {
        element = document.createElement("section");
        element.className = "portal";
        element.setAttribute("seed", seed);
        document.body.appendChild(element);
        return createRoot(element);
      };

      init().render(<CreateModal resolve={resolve} seed={seed} {...data} />);
    });
  },
  next: () => {
    remove(true);
  },
  cancel: () => {
    remove();
  },
};
