import React, { useEffect } from "react";
import MyVirtualList from "./virtualLoop.js";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    new MyVirtualList({
      element: "." + style.virtualLoop,
      result: Array.from({ length: 100000 }, (_, index) => {
        return { name: index + 1 };
      }),
      barHeight: 80,
      showbar: false,
      render: (value) => {
        const { name } = value;
        return `<div>${name}</div>`;
      },
      handScroll: ({ progress }) => {
        if (progress > 80) {
          // request(api.update());
        }
      },
    });
  }, []);

  return (
    <div className={style.box}>
      <div className={style.wrapper}>
        <div className={style.virtualLoop}></div>
      </div>
    </div>
  );
}

export default Index;
