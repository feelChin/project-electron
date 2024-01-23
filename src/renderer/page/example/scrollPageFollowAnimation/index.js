import React, { useEffect } from "react";
import VisItemAni from "./visItemAni";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    new VisItemAni("." + style.box);
  }, []);

  return (
    <div className={style.box}>
      <div className={style.place}></div>
      <div className={style.item} visitem="true">
        <div className={`${style.img} ${style.img1}`}>
          <img
            src="https://bing.com/th?id=OHR.ChiesaBianca_ZH-CN4208333975_800x480.jpg&qlt=20"
            alt=""
          />
        </div>
      </div>
      <div className={style.place}></div>
      <div className={style.item} visitem="true" speed="1">
        <div className={`${style.img} ${style.img2}`}>
          <img
            src="https://bing.com/th?id=OHR.WhistlerVillage_ZH-CN3451305723_800x480.jpg&qlt=20"
            alt=""
          />
        </div>
      </div>
      <div className={style.place}></div>
      <div className={style.item} visitem="true">
        <div className={`${style.img} ${style.img3}`}>
          <img
            src="https://bing.com/th?id=OHR.RoeTrentinoSnow_ZH-CN3122890500_800x480.jpg&qlt=20"
            alt=""
          />
        </div>
      </div>
      <div className={style.place}></div>
    </div>
  );
}

export default Index;
