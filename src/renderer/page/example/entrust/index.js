import React, { useEffect, useState } from "react";
import entrust from "./entrust";
import style from "./index.module.scss";

function Index() {
  const [info, setInfo] = useState("");

  useEffect(() => {
    entrust("element", (target) => {
      setInfo(`${target.getAttribute("content")}`);
    });
  }, []);

  return (
    <div className={style.box}>
      <div
        className={`${style.element} ${style.element1}`}
        entrust="element"
        content="1"
      >
        <div
          className={`${style.element} ${style.element2}`}
          entrust="element"
          content="2"
        >
          <div
            className={`${style.element} ${style.element3}`}
            entrust="element"
            content="3"
          >
            <div
              className={`${style.element} ${style.element4}`}
              entrust="element"
              content="4"
            >
              <div className={style.text} entrust="element" content="内容">
                内容
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.list}>
        <h5>输出：</h5>
        <div className={style.text}>{info}</div>
      </div>
    </div>
  );
}

export default Index;
