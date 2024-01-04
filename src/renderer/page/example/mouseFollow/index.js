import React, { useEffect } from "react";
import cursorDot from "./cursorDot";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    cursorDot(document.querySelectorAll("." + style.item), 4);

    return () => {
      const element = document.querySelector(".cursordot");
      if (element) document.body.removeChild(element);
    };
  }, []);

  return (
    <section className={style.wrapper}>
      <div className={style.item}></div>
      <div className={style.item}></div>
      <div className={style.item}></div>
      <div className={style.item}></div>
    </section>
  );
}

export default Index;
