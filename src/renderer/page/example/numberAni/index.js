import React, { useEffect, useRef, useState } from "react";
import NumberAni from "./numberAni";
import style from "./index.module.scss";

function Index() {
  const the = useRef({
    start: 123456,
    end: 756842,
    fn: null,
  });

  function start() {
    the.current.fn?.unload();
    if (the.current.fn) {
      the.current.fn = null;
    }

    the.current.fn = new NumberAni({
      element: ".num_ani",
      start: the.current.start,
      end: the.current.end,
      delay: 0.5,
    });
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <div className={style.box}>
      <div className={style.render}>
        <div className="num_ani">{the.current.start}</div>
      </div>
      <div className={style.flex}>
        <div className={style.text}>
          开始：
          <input
            onChange={(e) => {
              the.current.start = e.target.value;
            }}
            type="number"
            defaultValue={the.current.start}
            min={0}
            max={999999}
          />
        </div>
        <div className={style.text}>
          结束：
          <input
            onChange={(e) => {
              the.current.end = e.target.value;
            }}
            type="number"
            defaultValue={the.current.end}
            min={0}
            max={999999}
          />
        </div>
        <button
          onClick={() => {
            start();
          }}
        >
          开始
        </button>
      </div>
    </div>
  );
}

export default Index;
