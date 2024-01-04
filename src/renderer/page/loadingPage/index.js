import React, { useEffect } from "react";
import { _fetchVersion } from "@http";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    window.electron.checkVersion();

    window.electron.getMessage((message) => {
      console.log(message);
    });
  }, []);

  return (
    <div className={style.loading}>
      <div className="skFadingCircle">
        <div className="skCircle"></div>
        <div className="skCircle"></div>
        <div className="skCircle"></div>
        <div className="skCircle"></div>
        <div className="skCircle"></div>
        <div className="skCircle"></div>
        <div className="skCircle"></div>
        <div className="skCircle"></div>
        <div className="skCircle"></div>
        <div className="skCircle"></div>
        <div className="skCircle"></div>
        <div className="skCircle"></div>
      </div>
    </div>
  );
}

export default Index;
