import React, { useEffect, useRef, useState } from "react";
import { getParam } from "@util";
import style from "./index.module.scss";

function Index() {
  const isPart = getParam("isPart");

  const progressRef = useRef(0);
  const prevProgressRef = useRef(0);

  const [state, setState] = useState(true);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.electron.listenMessageDownload(({ percent }) => {
      progressRef.current = percent.toFixed(2);
      setProgress(progressRef.current);
    });

    window.electron.getMessage((message) => {
      console.log(message);
      if (message === "更新错误") {
        setState(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!state) return;

    setProgress(0);

    isPart
      ? window.electron.windowDownloadPart()
      : window.electron.windowDownload();

    let timer = setInterval(() => {
      if (progressRef.current === prevProgressRef.current) {
        setState(false);
        isPart && window.electron.windowDownloadPartDestroy();
      } else {
        prevProgressRef.current = progressRef.current;
      }
    }, 6000);

    return () => {
      clearInterval(timer);
    };
  }, [state]);

  return (
    <div className={style.update}>
      {state ? (
        <div
          className={style.updatePool}
          style={{
            "--top": progress + "%",
          }}
        >
          <div className={style.text}>
            {isPart ? "增量  " : "全量  "}
            {progress}%
          </div>
        </div>
      ) : (
        <div className={style.updateErr}>
          <h5>更新失败</h5>
          <button
            onClick={() => {
              setState(true);
            }}
          >
            <span>请重试</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Index;
