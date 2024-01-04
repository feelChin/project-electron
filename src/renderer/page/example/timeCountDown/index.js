import React, { useState } from "react";
import TimeCountDown from "./timeCountDown";
import style from "./index.module.scss";

function Index() {
  const [state] = useState(new Date().getTime() + 10000);
  const [text, setText] = useState("");

  function onEnd() {
    setText("倒计时已结束");
  }

  return (
    <section className={`${style.timeCountDown} page`}>
      <TimeCountDown nowTime={new Date()} onEnd={onEnd} time={state} />
      <p>{text || "正在倒计时"}</p>
    </section>
  );
}

export default Index;
