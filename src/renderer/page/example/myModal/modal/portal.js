import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import create_seed from "./seed";

let portal_pool = [];

function Index({ width, height, visible, children }) {
  const myPortal = useRef({
    element: document.createElement("section"),
    seed: create_seed(),
  });

  useEffect(() => {
    if (!visible) {
      myPortal.current.element.className = "portal leave";

      if (portal_pool.length > 3) {
        portal_pool.shift();
        const portalNode = document.querySelector(".portal");
        if (portalNode) document.body.removeChild(portalNode);
      }
      return;
    }

    myPortal.current.element.className = "portal";
    myPortal.current.element.setAttribute("seed", myPortal.current.seed);

    if (!portal_pool.includes(myPortal.current.seed)) {
      document.body.appendChild(myPortal.current.element);
      portal_pool.push(myPortal.current.seed);
    }
  }, [visible]);

  return (
    <>
      {createPortal(
        <div
          className="portalWrapper"
          style={{
            width,
            height,
          }}
        >
          {children}
        </div>,
        myPortal.current.element
      )}
    </>
  );
}

export default Index;
