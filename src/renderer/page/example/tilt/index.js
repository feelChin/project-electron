import React, { useEffect } from "react";
import Tilt from "./Tilt.js";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    new Tilt({
      element: "[tilt3D-1]",
      point: 10,
    });
    new Tilt({
      element: "[tilt3D-2]",
      point: 15,
    });
    new Tilt({
      element: "[tilt3D-3]",
      point: 20,
    });
  }, []);

  return (
    <div className={style.box}>
      <div className={style.items}>
        <div className={style.item} tilt3D-1="">
          <div className={style.wrapper}>
            <div className={style.img}>
              <img
                src="https://bing.com/th?id=OHR.ChiesaBianca_ZH-CN4208333975_800x480.jpg&qlt=20"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={style.item} tilt3D-2="">
          <div className={style.wrapper}>
            <div className={style.img}>
              <img
                src="https://bing.com/th?id=OHR.WhistlerVillage_ZH-CN3451305723_800x480.jpg&qlt=20"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={style.item} tilt3D-3="">
          <div className={style.wrapper}>
            <div className={style.img}>
              <img
                src="https://bing.com/th?id=OHR.RoeTrentinoSnow_ZH-CN3122890500_800x480.jpg&qlt=20"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
