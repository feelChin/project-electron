import React, { useEffect } from "react";
import LoadingImg from "./loadingImg";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    new LoadingImg();
  }, []);

  return (
    <div className={style.box}>
      <img
        data-src="https://bing.com/th?id=OHR.ChiesaBianca_ZH-CN4208333975_800x480.jpg&qlt=20"
        alt=""
      />
      <div></div>
      <img
        data-src="https://bing.com/th?id=OHR.WhistlerVillage_ZH-CN3451305723_800x480.jpg&qlt=20"
        alt=""
      />
      <div></div>
      <img
        data-src="https://bing.com/th?id=OHR.RoeTrentinoSnow_ZH-CN3122890500_800x480.jpg&qlt=20"
        alt=""
      />
    </div>
  );
}

export default Index;
