import React, { useEffect } from "react";
import Shell from "./shell";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    new Shell(); // default ["#333", "#f3f3f3"]
  }, []);

  return (
    <div className={style.box}>
      <section className={style.items}>
        <div className={style.item} shell="true">
          <img
            src="https://bing.com/th?id=OHR.ChiesaBianca_ZH-CN4208333975_800x480.jpg&qlt=20"
            alt=""
          />
        </div>
        <div className={style.item} shell="true">
          <img
            src="https://bing.com/th?id=OHR.WhistlerVillage_ZH-CN3451305723_800x480.jpg&qlt=20"
            alt=""
          />
        </div>
        <div className={style.item} shell="true">
          <img
            src="https://bing.com/th?id=OHR.RoeTrentinoSnow_ZH-CN3122890500_800x480.jpg&qlt=20"
            alt=""
          />
        </div>
      </section>
    </div>
  );
}

export default Index;
