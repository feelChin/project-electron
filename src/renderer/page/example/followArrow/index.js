import React, { useEffect } from "react";
import FollowArrow from "./followArrow";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    new FollowArrow({
      element: `.${style.nav1} .${style.item}`,
      event: "mouseover", //  click  || mouseover   **/ default click
      openMouseout: true, //  open mouseout         **/ default true
      time: 500, //       **/ default 300
    });

    new FollowArrow({
      element: `.${style.nav2} .${style.item}`,
      event: "click", //  click  || mouseover   **/ default click
      openMouseout: true, //  open mouseout         **/ default true
      time: 500, //       **/ default 300
    });
  }, []);

  return (
    <div className={style.box}>
      <div className={style.flex}>
        <h5>mouseover:</h5>
        <nav className={style.nav1}>
          <div className={style.item}>美利坚合众国</div>
          <div className={style.item}>大韩民国</div>
          <div className={`${style.item} active`}>
            大不列颠及北爱尔兰联合王国
          </div>
          <div className={style.item}>新西兰</div>
          <div className={style.item}>澳大利亚联邦</div>
          <div className={style.item}>日本国</div>
          <i></i>
        </nav>
      </div>
      <div className={style.flex}>
        <h5>click:</h5>
        <nav className={style.nav2}>
          <div className={style.item}>美利坚合众国</div>
          <div className={style.item}>大韩民国</div>
          <div className={`${style.item} active`}>
            大不列颠及北爱尔兰联合王国
          </div>
          <div className={style.item}>新西兰</div>
          <div className={style.item}>澳大利亚联邦</div>
          <div className={style.item}>日本国</div>
          <i></i>
        </nav>
      </div>
    </div>
  );
}

export default Index;
