import React, { useEffect } from "react";
import pointer from "./pointer";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    setTimeout(() => {
      pointer({
        target: `.${style.textWrapper} .${style.item}`,
        element: `.${style.list} .${style.item}`,
      });
    }, 1000);
  }, []);

  return (
    <div className={style.box}>
      <div className={style.textWrapper}>
        <div className={style.item}></div>
        <div className={style.item}></div>
        <div className={style.item}></div>
        <div className={style.item}></div>
      </div>
      <div className={style.list}>
        <div className={style.item}>此</div>
        <div className={style.item}>情</div>
        <div className={style.item}>天</div>
        <div className={style.item}>待</div>
        <div className={style.item}>道</div>
        <div className={style.item}>追</div>
        <div className={style.item}>在</div>
        <div className={style.item}>可</div>
        <div className={style.item}>筹</div>
        <div className={style.item}>琴</div>
      </div>
    </div>
  );
}

export default Index;
