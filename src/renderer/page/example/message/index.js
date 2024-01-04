import React from "react";
import Message from "./message.js";
import style from "./index.module.scss";

function Index() {
  return (
    <section className={style.messageWrapper}>
      <div
        className={style.item}
        onClick={() => {
          Message.success("点击成功");
        }}
      >
        成功
      </div>
      <div
        className={style.item}
        onClick={() => {
          Message.error("点击失败");
        }}
      >
        错误
      </div>
    </section>
  );
}

export default Index;
