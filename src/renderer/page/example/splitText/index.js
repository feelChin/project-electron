import React, { useEffect } from "react";
import splitText from "./splitText";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    new splitText();
  }, []);

  return (
    <div className={style.box}>
      <div className={style.element} splitText="splitText" random="true">
        此情可待成追忆
      </div>
      <div className={style.element} splitText="splitText" delay={1000}>
        当时只道是寻常
      </div>
      <div className={style.element} splitText="splitText" delayGap={250}>
        人生若只如初见
      </div>
      <div className={style.element} splitText="splitText">
        <i>花</i>飞花谢花满天，
        <br />
        红消香断有谁<i>怜</i>
      </div>
    </div>
  );
}

export default Index;
