import React, { useEffect } from "react";
import MouseDocumengtMove from "./mouseDocumengtMove";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    new MouseDocumengtMove({
      element: `.${style.img} img`,
      ease: "0.025",
    });
  }, []);

  return (
    <div class={style.img}>
      <img
        src="https://bing.com/th?id=OHR.Waterleidingduinen_ZH-CN1430683267_1920x1080.jpg"
        alt=""
      />
    </div>
  );
}

export default Index;
